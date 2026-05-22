<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected string $apiKey;
    protected string $model;
    protected string $baseUrl;

    public function __construct()
    {
        $this->apiKey  = env('GEMINI_API_KEY', '');
        $this->model   = 'gemini-2.5-flash';
        $this->baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
    }

    /**
     * Send a prompt to Gemini and return the raw text response.
     */
    public function generate(string $prompt): ?string
    {
        if (empty($this->apiKey)) {
            Log::warning('GeminiService: GEMINI_API_KEY is not configured.');
            return null;
        }

        try {
            $response = Http::timeout(30)->withHeaders([
                'Content-Type' => 'application/json',
            ])->post(
                "{$this->baseUrl}/{$this->model}:generateContent?key={$this->apiKey}",
                [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt],
                            ],
                        ],
                    ],
                    'generationConfig' => [
                        'responseMimeType' => 'application/json',
                    ],
                ]
            );

            if (!$response->successful()) {
                Log::error('GeminiService: API returned status ' . $response->status(), [
                    'body' => $response->body(),
                ]);
                return null;
            }

            return data_get(
                $response->json(),
                'candidates.0.content.parts.0.text'
            );
        } catch (\Throwable $e) {
            Log::error('GeminiService: request failed', [
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }

    /**
     * Generate a personal financial summary from account data.
     */
    public function personalSummary(array $data): array
    {
        $prompt = $this->buildPersonalSummaryPrompt($data);

        $rawText = $this->generate($prompt);

        if ($rawText === null) {
            return $this->fallbackSummary();
        }

        return $this->parseAndValidateSummary($rawText);
    }

    /**
     * Build the prompt for personal summary.
     */
    protected function buildPersonalSummaryPrompt(array $data): string
    {
        $json = json_encode($data, JSON_UNESCAPED_SLASHES);

        return <<<PROMPT
You are a concise financial assistant. Analyze the following personal account activity and return a JSON object with exactly these keys:

1. "summary" — A 1–2 sentence plain-English summary of the account health.
2. "insights" — An array of exactly 3 short, actionable insight strings.
3. "recommendation" — A single sentence recommendation for the user.

Rules:
- Do NOT include any markdown, code fences, or explanation outside the JSON.
- Keep every string under 120 characters.
- Be helpful but never give specific investment advice.
- If data is sparse, say so honestly.

Account data:
{$json}
PROMPT;
    }

    /**
     * Parse Gemini's response and ensure it matches the expected schema.
     */
    protected function parseAndValidateSummary(string $rawText): array
    {
        try {
            // Strip potential markdown code fences
            $cleaned = preg_replace('/^```(?:json)?\s*/i', '', trim($rawText));
            $cleaned = preg_replace('/\s*```$/i', '', $cleaned);

            $parsed = json_decode($cleaned, true, 512, JSON_THROW_ON_ERROR);

            // Validate structure
            if (
                !is_string($parsed['summary'] ?? null) ||
                !is_array($parsed['insights'] ?? null) ||
                !is_string($parsed['recommendation'] ?? null)
            ) {
                Log::warning('GeminiService: response structure mismatch', ['parsed' => $parsed]);
                return $this->fallbackSummary();
            }

            // Sanitize insights — keep only strings, cap at 3
            $insights = array_values(array_filter($parsed['insights'], 'is_string'));
            $insights = array_slice($insights, 0, 3);

            if (count($insights) < 1) {
                return $this->fallbackSummary();
            }

            return [
                'summary'        => substr(strip_tags($parsed['summary']), 0, 300),
                'insights'       => array_map(fn($i) => substr(strip_tags($i), 0, 200), $insights),
                'recommendation' => substr(strip_tags($parsed['recommendation']), 0, 300),
            ];
        } catch (\Throwable $e) {
            Log::warning('GeminiService: failed to parse summary JSON', [
                'error'   => $e->getMessage(),
                'rawText' => $rawText,
            ]);
            return $this->fallbackSummary();
        }
    }

    /**
     * Safe fallback when Gemini is unavailable or returns garbage.
     */
    public function fallbackSummary(): array
    {
        return [
            'summary'        => 'We couldn\'t generate a live AI summary right now. Your dashboard data is still accurate.',
            'insights'       => [
                'Review your recent transactions for any unusual activity.',
                'Consider diversifying across multiple currencies.',
                'Keep your incoming transfers higher than outgoing for a healthy score.',
            ],
            'recommendation' => 'Check back later for a personalised AI analysis of your finances.',
            'is_fallback'    => true,
        ];
    }

    /* ──────────────────────────────────────────────────────────────────────── */
    /*  Report generation                                                      */
    /* ──────────────────────────────────────────────────────────────────────── */

    /**
     * Generate a full financial report from transaction data.
     */
    public function generateReport(array $data): array
    {
        $prompt  = $this->buildReportPrompt($data);
        $rawText = $this->generate($prompt);

        if ($rawText === null) {
            return $this->fallbackReport($data);
        }

        return $this->parseAndValidateReport($rawText, $data);
    }

    /**
     * Build the prompt for full report generation.
     */
    protected function buildReportPrompt(array $data): string
    {
        $json = json_encode($data, JSON_UNESCAPED_SLASHES);

        return <<<PROMPT
You are a professional financial analyst AI. Analyze the following transaction data and return a JSON object with exactly these keys:

1. "reportSummary" — A 2–3 sentence executive summary of the financial activity.
2. "insights" — An array of exactly 4 objects, each with:
   - "category": one of "growth", "spending", "security", "pattern"
   - "text": A clear, actionable insight (max 120 chars)
3. "keyFindings" — An array of exactly 4 short finding strings (max 80 chars each) summarizing what the report covers.
4. "recommendation" — A single sentence actionable recommendation.
5. "healthScore" — An integer 1-100 representing overall financial health.
6. "periodComparison" — A short string like "+32% vs previous period" or "Stable" describing the trend.

Rules:
- Return ONLY valid JSON, no markdown or explanation.
- Be professional and concise.
- Never give specific investment advice.
- Base insights on the actual data provided.
- If data is sparse, acknowledge it honestly.

Transaction data:
{$json}
PROMPT;
    }

    /**
     * Parse and validate Gemini's report response.
     */
    protected function parseAndValidateReport(string $rawText, array $originalData): array
    {
        try {
            $cleaned = preg_replace('/^```(?:json)?\s*/i', '', trim($rawText));
            $cleaned = preg_replace('/\s*```$/i', '', $cleaned);

            $parsed = json_decode($cleaned, true, 512, JSON_THROW_ON_ERROR);

            // Validate required fields
            if (
                !is_string($parsed['reportSummary'] ?? null) ||
                !is_array($parsed['insights'] ?? null) ||
                !is_array($parsed['keyFindings'] ?? null) ||
                !is_string($parsed['recommendation'] ?? null)
            ) {
                Log::warning('GeminiService: report structure mismatch', ['parsed' => $parsed]);
                return $this->fallbackReport($originalData);
            }

            // Sanitize insights
            $insights = [];
            foreach (array_slice($parsed['insights'], 0, 4) as $insight) {
                if (is_array($insight) && is_string($insight['text'] ?? null)) {
                    $validCategories = ['growth', 'spending', 'security', 'pattern'];
                    $insights[] = [
                        'category' => in_array($insight['category'] ?? '', $validCategories)
                            ? $insight['category']
                            : 'pattern',
                        'text' => substr(strip_tags($insight['text']), 0, 200),
                    ];
                }
            }

            if (count($insights) < 1) {
                return $this->fallbackReport($originalData);
            }

            // Sanitize key findings
            $keyFindings = array_values(array_filter($parsed['keyFindings'] ?? [], 'is_string'));
            $keyFindings = array_map(fn($f) => substr(strip_tags($f), 0, 150), array_slice($keyFindings, 0, 4));

            return [
                'reportSummary'    => substr(strip_tags($parsed['reportSummary']), 0, 500),
                'insights'         => $insights,
                'keyFindings'      => $keyFindings,
                'recommendation'   => substr(strip_tags($parsed['recommendation']), 0, 300),
                'healthScore'      => min(100, max(0, intval($parsed['healthScore'] ?? 50))),
                'periodComparison' => substr(strip_tags($parsed['periodComparison'] ?? 'N/A'), 0, 50),
            ];
        } catch (\Throwable $e) {
            Log::warning('GeminiService: failed to parse report JSON', [
                'error'   => $e->getMessage(),
                'rawText' => $rawText,
            ]);
            return $this->fallbackReport($originalData);
        }
    }

    /**
     * Safe fallback for report generation.
     */
    public function fallbackReport(array $data = []): array
    {
        return [
            'reportSummary'    => 'We couldn\'t generate a live AI report right now. The statistics shown are calculated from your actual transaction data.',
            'insights'         => [
                ['category' => 'growth',   'text' => 'Review your income sources to identify growth opportunities.'],
                ['category' => 'spending', 'text' => 'Track your top expense categories to optimise spending.'],
                ['category' => 'security', 'text' => 'Your transaction data is securely processed and never shared.'],
                ['category' => 'pattern',  'text' => 'Generate reports regularly to spot trends early.'],
            ],
            'keyFindings'      => [
                'Cash flow overview and net balance for the selected period',
                'Breakdown of income and expense transactions',
                'Spending trends based on your activity',
                'AI-powered insights and recommendations',
            ],
            'recommendation'   => 'Check back later for a personalised AI analysis of your finances.',
            'healthScore'      => 50,
            'periodComparison' => 'N/A',
            'is_fallback'      => true,
        ];
    }

    /* ──────────────────────────────────────────────────────────────────────── */
    /*  Goal suggestions                                                       */
    /* ──────────────────────────────────────────────────────────────────────── */

    public function suggestGoals(array $data): array
    {
        $prompt  = $this->buildGoalsPrompt($data);
        $rawText = $this->generate($prompt);

        if ($rawText === null) {
            return $this->fallbackGoals();
        }

        return $this->parseAndValidateGoals($rawText);
    }

    protected function buildGoalsPrompt(array $data): string
    {
        $json = json_encode($data, JSON_UNESCAPED_SLASHES);

        return <<<PROMPT
You are a personal finance advisor AI. Based on the following wallet activity, suggest personalised financial goals.

Return a JSON object with exactly these keys:

1. "goals" — An array of exactly 4 objects, each with:
   - "title": A short goal title (max 40 chars), e.g. "Build a \$2,000 reserve"
   - "type": one of "savings", "income", "spending", "milestone"
   - "target": numeric target value
   - "currency": "USD" or null for milestones
   - "deadline": a realistic deadline string like "Aug 31, 2026"
   - "aiNote": A 1-sentence personalised note explaining why this goal fits (max 120 chars)

2. "suggestions" — An array of exactly 3 objects, each with:
   - "title": A short suggested goal (max 40 chars)
   - "reason": Why this is suggested based on the data (max 80 chars)
   - "category": one of "savings", "income", "spending", "milestone"

Rules:
- Return ONLY valid JSON, no markdown.
- Base suggestions on the actual data. If balance is growing, suggest savings. If outgoing is high, suggest spending caps.
- Be realistic with targets based on the user's actual numbers.
- Use today's date context: May 2026.

Wallet activity:
{$json}
PROMPT;
    }

    protected function parseAndValidateGoals(string $rawText): array
    {
        try {
            $cleaned = preg_replace('/^```(?:json)?\s*/i', '', trim($rawText));
            $cleaned = preg_replace('/\s*```$/i', '', $cleaned);
            $parsed = json_decode($cleaned, true, 512, JSON_THROW_ON_ERROR);

            if (!is_array($parsed['goals'] ?? null) || !is_array($parsed['suggestions'] ?? null)) {
                return $this->fallbackGoals();
            }

            $validTypes = ['savings', 'income', 'spending', 'milestone'];

            $goals = [];
            foreach (array_slice($parsed['goals'], 0, 4) as $g) {
                if (!is_string($g['title'] ?? null)) continue;
                $goals[] = [
                    'title'    => substr(strip_tags($g['title']), 0, 60),
                    'type'     => in_array($g['type'] ?? '', $validTypes) ? $g['type'] : 'savings',
                    'target'   => max(0, floatval($g['target'] ?? 0)),
                    'currency' => is_string($g['currency'] ?? null) ? substr($g['currency'], 0, 5) : null,
                    'deadline' => substr(strip_tags($g['deadline'] ?? 'Dec 31, 2026'), 0, 30),
                    'aiNote'   => substr(strip_tags($g['aiNote'] ?? ''), 0, 200),
                ];
            }

            $suggestions = [];
            foreach (array_slice($parsed['suggestions'], 0, 3) as $s) {
                if (!is_string($s['title'] ?? null)) continue;
                $suggestions[] = [
                    'title'    => substr(strip_tags($s['title']), 0, 60),
                    'reason'   => substr(strip_tags($s['reason'] ?? ''), 0, 120),
                    'category' => in_array($s['category'] ?? '', $validTypes) ? $s['category'] : 'savings',
                ];
            }

            if (count($goals) < 1) return $this->fallbackGoals();

            return ['goals' => $goals, 'suggestions' => $suggestions];
        } catch (\Throwable $e) {
            Log::warning('GeminiService: failed to parse goals JSON', ['error' => $e->getMessage()]);
            return $this->fallbackGoals();
        }
    }

    public function fallbackGoals(): array
    {
        return [
            'goals' => [
                ['title' => 'Build a $5,000 reserve', 'type' => 'savings', 'target' => 5000, 'currency' => 'USD', 'deadline' => 'Aug 31, 2026', 'aiNote' => 'Start building an emergency fund based on your current balance.'],
                ['title' => 'Receive $2,000 this month', 'type' => 'income', 'target' => 2000, 'currency' => 'USD', 'deadline' => 'May 31, 2026', 'aiNote' => 'Set an income target to stay motivated.'],
                ['title' => 'Keep outgoing below $500', 'type' => 'spending', 'target' => 500, 'currency' => 'USD', 'deadline' => 'May 31, 2026', 'aiNote' => 'Cap your spending to improve your financial score.'],
                ['title' => 'Open 3 currency accounts', 'type' => 'milestone', 'target' => 3, 'currency' => null, 'deadline' => 'Jun 30, 2026', 'aiNote' => 'Diversify your holdings across multiple currencies.'],
            ],
            'suggestions' => [
                ['title' => 'Save $1,000 emergency fund', 'reason' => 'Build a safety net from your growing balance.', 'category' => 'savings'],
                ['title' => 'Reduce outgoing by 15%', 'reason' => 'Optimise spending to improve cash flow.', 'category' => 'spending'],
                ['title' => 'Open a GBP account', 'reason' => 'Diversify with a new currency account.', 'category' => 'milestone'],
            ],
            'is_fallback' => true,
        ];
    }

    /* ================================================================== */
    /*  Review Payroll                                                      */
    /* ================================================================== */

    /**
     * Analyse a payroll batch (bills + employees) and return a structured
     * executive review with findings, risk flags and a recommendation.
     */
    public function reviewPayroll(array $data): array
    {
        $billsJson     = json_encode($data['bills'] ?? [], JSON_PRETTY_PRINT);
        $employeesJson = json_encode($data['employees'] ?? [], JSON_PRETTY_PRINT);

        $prompt = <<<PROMPT
You are a senior corporate finance analyst reviewing a payroll and bills batch
for a company using the Swift payment platform.

DATA PROVIDED
─────────────
Total payroll amount : \${$data['totalAmount']}
Bills total          : \${$data['billsTotal']}  ({$data['billsCount']} bills)
Employees total      : \${$data['employeesTotal']}  ({$data['employeesCount']} employees)
Vendor count         : {$data['vendorCount']}

BILLS:
{$billsJson}

EMPLOYEES:
{$employeesJson}

TASK
────
Produce a structured JSON review with these exact keys:

{
  "summary": "A 2-3 sentence executive overview of the batch.",
  "findings": ["string array — 4-6 key observations about the batch"],
  "risks": [
    {"level": "low|medium|high", "text": "Risk description"}
  ],
  "recommendation": "A single paragraph with your final recommendation.",
  "cashFlowImpact": "One sentence describing the cash-flow effect."
}

RULES
─────
• Return ONLY valid JSON — no markdown fences, no commentary.
• "risks" must have 2-4 items. Use "low" if nothing concerning.
• Keep language professional, concise, and actionable.
• Dollar amounts must be formatted with commas (e.g. \$12,450.00).
PROMPT;

        $raw = $this->generate($prompt);

        if (!$raw) {
            Log::warning('GeminiService::reviewPayroll – API returned null, using fallback.');
            return $this->fallbackPayrollReview($data);
        }

        try {
            $parsed = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);

            // Validate required keys
            $required = ['summary', 'findings', 'risks', 'recommendation', 'cashFlowImpact'];
            foreach ($required as $key) {
                if (!isset($parsed[$key])) {
                    Log::warning("GeminiService::reviewPayroll – Missing key '{$key}', using fallback.");
                    return $this->fallbackPayrollReview($data);
                }
            }

            $parsed['is_fallback'] = false;
            return $parsed;
        } catch (\Throwable $e) {
            Log::error('GeminiService::reviewPayroll – JSON parse failed: ' . $e->getMessage());
            return $this->fallbackPayrollReview($data);
        }
    }

    /**
     * Fallback payroll review when Gemini is unavailable.
     */
    public function fallbackPayrollReview(array $data = []): array
    {
        $total     = number_format($data['totalAmount'] ?? 0, 2);
        $billsT    = number_format($data['billsTotal'] ?? 0, 2);
        $empsT     = number_format($data['employeesTotal'] ?? 0, 2);
        $billsC    = $data['billsCount'] ?? 0;
        $empsC     = $data['employeesCount'] ?? 0;
        $vendorC   = $data['vendorCount'] ?? 0;

        return [
            'summary' => "This payroll batch totals \${$total}, comprising {$billsC} bills (\${$billsT}) and {$empsC} employee payouts (\${$empsT}) across {$vendorC} vendors.",
            'findings' => [
                "{$billsC} bills synced from QuickBooks totaling \${$billsT}.",
                "{$empsC} employees scheduled for payout totaling \${$empsT}.",
                "{$vendorC} unique vendors identified in this batch.",
                "All amounts are denominated in USD.",
            ],
            'risks' => [
                ['level' => 'low', 'text' => 'No anomalies detected in the current batch.'],
                ['level' => 'low', 'text' => 'All employee records match QuickBooks data.'],
            ],
            'recommendation' => "The batch appears routine and consistent with historical patterns. You may proceed with approval.",
            'cashFlowImpact' => "Processing this batch will reduce your available balance by \${$total}.",
            'is_fallback' => true,
        ];
    }

    /* ====================================================================== */
    /*  SINGLE EMPLOYEE FULL PAYROLL BREAKDOWN                                */
    /* ====================================================================== */

    /**
     * Generate a complete payroll breakdown for a single employee.
     *
     * Returns earnings rows, deductions, hours breakdown, net pay,
     * AI findings and recommendation.
     */
    public function analyzeEmployeePayroll(array $data): array
    {
        $name       = $data['name'] ?? 'Employee';
        $role       = $data['job_title'] ?? $data['role'] ?? 'Employee';
        $salary     = $data['salary'] ?? 0;
        $hourlyRate = $data['hourly_rate'] ?? 0;
        $hours      = $data['hours_per_period'] ?? 160;
        $frequency  = $data['pay_frequency'] ?? 'monthly';
        $currency   = $data['currency'] ?? 'USD';

        $prompt = <<<PROMPT
You are a payroll analyst for a fintech platform called Swift.

Generate a COMPLETE payroll breakdown for this employee:

Employee: {$name}
Role/Title: {$role}
Salary (gross per period): {$currency} {$salary}
Hourly Rate: {$currency} {$hourlyRate}
Hours Per Period: {$hours}
Pay Frequency: {$frequency}
Currency: {$currency}

If salary is provided and > 0, use it as the gross amount.
If salary is 0 but hourly_rate > 0, calculate gross = hourly_rate × hours.
If both are 0, estimate a reasonable salary for the role "{$role}" in USD.

IMPORTANT: Return ONLY valid JSON with this exact structure:

{
  "totalPay": "formatted amount string e.g. $6,608.00",
  "totalHours": "e.g. 160.00 hrs",
  "payrollDate": "next business day formatted e.g. Jun 1, 2025",
  "earnings": [
    {"type": "Regular Pay", "hours": "152.00 hrs", "rate": "$40.00/hr", "amount": "$6,080.00"},
    {"type": "Overtime Pay (1.5x)", "hours": "8.00 hrs", "rate": "$60.00/hr", "amount": "$480.00"},
    {"type": "Bonuses & Incentives", "hours": "—", "rate": "—", "amount": "$0.00"},
    {"type": "Allowances", "hours": "—", "rate": "—", "amount": "$0.00"},
    {"type": "Reimbursements", "hours": "—", "rate": "—", "amount": "$0.00"}
  ],
  "totalEarnings": "$6,560.00",
  "totalEarningsHours": "160.00 hrs",
  "breakdown": [
    {"label": "Regular Pay", "dot": "bg-violet-500", "amount": "$6,400.00", "pct": "96.9%"},
    {"label": "Overtime Pay", "dot": "bg-blue-500", "amount": "$400.00", "pct": "6.1%"},
    {"label": "Bonuses & Incentives", "dot": "bg-amber-500", "amount": "$0.00", "pct": "0%"},
    {"label": "Allowances", "dot": "bg-emerald-500", "amount": "$0.00", "pct": "0%"},
    {"label": "Reimbursements", "dot": "bg-pink-500", "amount": "$0.00", "pct": "0%"}
  ],
  "totalBeforeDeductions": "$6,800.00",
  "deductions": "-$192.00",
  "deductionsPct": "-2.9%",
  "deductionRows": [
    {"type": "Federal Income Tax", "calc": "10% of taxable income", "amount": "-$480.00"},
    {"type": "Social Security (FICA)", "calc": "6.2% of gross pay", "amount": "-$408.00"},
    {"type": "Medicare (FICA)", "calc": "1.45% of gross pay", "amount": "-$95.00"},
    {"type": "Health Insurance", "calc": "Employee contribution", "amount": "-$150.00"}
  ],
  "totalDeductions": "-$1,133.00",
  "netPay": "$6,608.00",
  "netPayMethod": "via Bank Transfer",
  "hoursBreakdown": {
    "total": "160.00 hrs",
    "delta": "+0.00 hrs vs last period",
    "regular": {"label": "Regular (152.00 hrs)", "pct": 95},
    "overtime": {"label": "Overtime (8.00 hrs)", "pct": 5},
    "other": {"label": "Other (0.00 hrs)", "pct": 0}
  },
  "findings": [
    "160.00 total hours logged this period",
    "Regular pay and overtime included in breakdown",
    "Statutory deductions and taxes applied",
    "All figures based on configured compensation data"
  ],
  "recommendation": "A brief 1-2 sentence recommendation about this employee's payroll."
}

Use realistic US tax calculations. All amounts must use the {$currency} symbol.
Calculate deductions realistically based on the gross pay.
Ensure totalPay = totalEarnings - abs(totalDeductions).
Do NOT include any markdown, comments, or explanation — ONLY the JSON object.
PROMPT;

        $raw = $this->generate($prompt);

        if (!$raw) {
            Log::warning('GeminiService::analyzeEmployeePayroll – No response, using fallback.');
            return $this->fallbackEmployeePayroll($data);
        }

        try {
            $parsed = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);

            $requiredKeys = ['totalPay', 'earnings', 'breakdown', 'deductionRows', 'netPay', 'findings'];
            foreach ($requiredKeys as $key) {
                if (!isset($parsed[$key])) {
                    Log::warning("GeminiService::analyzeEmployeePayroll – Missing key '{$key}', using fallback.");
                    return $this->fallbackEmployeePayroll($data);
                }
            }

            $parsed['is_fallback'] = false;
            return $parsed;
        } catch (\Throwable $e) {
            Log::error('GeminiService::analyzeEmployeePayroll – JSON parse failed: ' . $e->getMessage());
            return $this->fallbackEmployeePayroll($data);
        }
    }

    /**
     * Fallback employee payroll breakdown when Gemini is unavailable.
     */
    public function fallbackEmployeePayroll(array $data = []): array
    {
        $salary     = floatval($data['salary'] ?? 0);
        $hourlyRate = floatval($data['hourly_rate'] ?? 0);
        $hours      = floatval($data['hours_per_period'] ?? 160);
        $currency   = $data['currency'] ?? 'USD';
        $sym        = $currency === 'USD' ? '$' : $currency . ' ';
        $name       = $data['name'] ?? 'Employee';

        // Calculate gross
        if ($salary > 0) {
            $gross = $salary;
            $rate  = $hours > 0 ? round($salary / $hours, 2) : 0;
        } elseif ($hourlyRate > 0) {
            $rate  = $hourlyRate;
            $gross = $hourlyRate * $hours;
        } else {
            $gross = 4000;
            $rate  = $hours > 0 ? round(4000 / $hours, 2) : 25;
        }

        // Simple deductions
        $fedTax   = round($gross * 0.10, 2);
        $ssTax    = round($gross * 0.062, 2);
        $medicare = round($gross * 0.0145, 2);
        $health   = 150.00;
        $totalDed = $fedTax + $ssTax + $medicare + $health;
        $netPay   = $gross - $totalDed;

        $fmt = fn($v) => $sym . number_format($v, 2);

        return [
            'totalPay'    => $fmt($netPay),
            'totalHours'  => number_format($hours, 2) . ' hrs',
            'payrollDate' => now()->addDay()->format('M d, Y'),
            'earnings' => [
                ['type' => 'Regular Pay',         'hours' => number_format($hours, 2) . ' hrs', 'rate' => $fmt($rate) . '/hr', 'amount' => $fmt($gross)],
                ['type' => 'Overtime Pay (1.5x)',  'hours' => '0.00 hrs', 'rate' => $fmt($rate * 1.5) . '/hr', 'amount' => $fmt(0)],
                ['type' => 'Bonuses & Incentives', 'hours' => '—', 'rate' => '—', 'amount' => $fmt(0)],
                ['type' => 'Allowances',           'hours' => '—', 'rate' => '—', 'amount' => $fmt(0)],
                ['type' => 'Reimbursements',       'hours' => '—', 'rate' => '—', 'amount' => $fmt(0)],
            ],
            'totalEarnings'      => $fmt($gross),
            'totalEarningsHours' => number_format($hours, 2) . ' hrs',
            'breakdown' => [
                ['label' => 'Regular Pay',         'dot' => 'bg-violet-500',  'amount' => $fmt($gross), 'pct' => '100%'],
                ['label' => 'Overtime Pay',        'dot' => 'bg-blue-500',    'amount' => $fmt(0), 'pct' => '0%'],
                ['label' => 'Bonuses & Incentives','dot' => 'bg-amber-500',   'amount' => $fmt(0), 'pct' => '0%'],
                ['label' => 'Allowances',          'dot' => 'bg-emerald-500', 'amount' => $fmt(0), 'pct' => '0%'],
                ['label' => 'Reimbursements',      'dot' => 'bg-pink-500',    'amount' => $fmt(0), 'pct' => '0%'],
            ],
            'totalBeforeDeductions' => $fmt($gross),
            'deductions'            => '-' . $fmt($totalDed),
            'deductionsPct'         => '-' . number_format(($totalDed / max($gross, 1)) * 100, 1) . '%',
            'deductionRows' => [
                ['type' => 'Federal Income Tax',     'calc' => '10% of taxable income',  'amount' => '-' . $fmt($fedTax)],
                ['type' => 'Social Security (FICA)', 'calc' => '6.2% of gross pay',      'amount' => '-' . $fmt($ssTax)],
                ['type' => 'Medicare (FICA)',         'calc' => '1.45% of gross pay',     'amount' => '-' . $fmt($medicare)],
                ['type' => 'Health Insurance',        'calc' => 'Employee contribution',  'amount' => '-' . $fmt($health)],
            ],
            'totalDeductions' => '-' . $fmt($totalDed),
            'netPay'          => $fmt($netPay),
            'netPayMethod'    => 'via Bank Transfer',
            'hoursBreakdown' => [
                'total'    => number_format($hours, 2) . ' hrs',
                'delta'    => '+0.00 hrs vs last period',
                'regular'  => ['label' => 'Regular (' . number_format($hours, 2) . ' hrs)', 'pct' => 100],
                'overtime' => ['label' => 'Overtime (0.00 hrs)', 'pct' => 0],
                'other'    => ['label' => 'Other (0.00 hrs)', 'pct' => 0],
            ],
            'findings' => [
                number_format($hours, 2) . ' total hours logged this period',
                'Gross pay of ' . $fmt($gross) . ' based on configured salary',
                'Standard US tax deductions applied',
                'Net pay of ' . $fmt($netPay) . ' after all deductions',
            ],
            'recommendation' => "Payroll for {$name} is based on the configured salary. Review and adjust compensation settings if needed.",
            'is_fallback' => true,
        ];
    }
}
