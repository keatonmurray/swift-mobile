import { useState, useEffect, useRef } from "react"
import {
  RefreshCw,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  CreditCard,
  ShieldCheck,
  Lightbulb,
  Download,
  CheckCircle2,
  FileText,
  Loader2,
  CircleAlert,
} from "lucide-react"
import axios from "axios"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import RevealSection from "@/components/RevealSection"
import Typewriter from "@/components/Typewriter"

/* -------------------------------------------------------------------------- */
/*  Icon map — all icons now use the same neutral circular style               */
/* -------------------------------------------------------------------------- */

const insightIconMap = {
  growth:   { icon: TrendingUp  },
  spending: { icon: CreditCard  },
  security: { icon: ShieldCheck },
  pattern:  { icon: Lightbulb   },
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Reports = () => {
  const [generated,  setGenerated]  = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error,      setError]      = useState(false)

  const [walletTransactions, setWalletTransactions] = useState([])
  const [txLoading,          setTxLoading]          = useState(true)
  const [report,             setReport]             = useState(null)

  const [stats, setStats] = useState({
    totalIncoming: 0,
    totalOutgoing: 0,
    netCashFlow: 0,
    incomingCount: 0,
    outgoingCount: 0,
  })

  const reportRef = useRef(null)

  /* ── Fetch transactions ────────────────────────────────────────────── */
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("api_token")
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        const txns = response.data.transactions || []
        setWalletTransactions(txns)

        const incoming = txns.filter((t) => Number(t.amount || 0) > 0)
        const outgoing = txns.filter((t) => Number(t.amount || 0) < 0)
        const totalIn  = incoming.reduce((s, t) => s + Math.abs(Number(t.amount)), 0)
        const totalOut = outgoing.reduce((s, t) => s + Math.abs(Number(t.amount)), 0)

        setStats({
          totalIncoming: totalIn,
          totalOutgoing: totalOut,
          netCashFlow: totalIn - totalOut,
          incomingCount: incoming.length,
          outgoingCount: outgoing.length,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setTxLoading(false)
      }
    }
    fetchTransactions()
  }, [])

  /* ── Generate ─────────────────────────────────────────────────────── */
  const handleGenerate = async () => {
    setGenerating(true)
    setError(false)
    try {
      const token     = localStorage.getItem("api_token")
      const currencies = [...new Set(
        walletTransactions.map((t) => t.currency?.toUpperCase()).filter(Boolean)
      )]
      const transactions = walletTransactions.slice(0, 30).map((t) => ({
        type: t.type?.replaceAll("_", " ") || "transaction",
        amount: Number(t.amount || 0),
        currency: t.currency?.toUpperCase() || "USD",
        date: new Date(t.created_at * 1000).toLocaleDateString(),
        status: Number(t.amount || 0) > 0 ? "Received" : "Sent",
      }))
      const payload = {
        totalIncoming: stats.totalIncoming,
        totalOutgoing: stats.totalOutgoing,
        netCashFlow: stats.netCashFlow,
        incomingCount: stats.incomingCount,
        outgoingCount: stats.outgoingCount,
        totalTransactions: walletTransactions.length,
        currencies,
        transactions,
      }
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/gemini/generate-report`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data?.success && response.data?.data) {
        setReport(response.data.data)
        setGenerated(true)
      } else {
        setError(true)
      }
    } catch (err) {
      console.error("Report generation failed:", err)
      setError(true)
    } finally {
      setGenerating(false)
    }
  }

  const handleDownloadPDF = () => window.print()

  const fmt = (v) =>
    `$${Math.abs(v).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`

  /* ── Stat cards — FIX: all white, no tinted backgrounds ──────────── */
  const summaryStats = [
    {
      label: "Total Incoming",
      value: fmt(stats.totalIncoming),
      sub:   `${stats.incomingCount} transactions`,
      icon:  TrendingUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Outgoing",
      value: fmt(stats.totalOutgoing),
      sub:   `${stats.outgoingCount} transactions`,
      icon:  TrendingDown,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
    {
      label: "Net Cash Flow",
      value: fmt(stats.netCashFlow),
      sub:   report?.periodComparison || `${stats.incomingCount + stats.outgoingCount} total`,
      icon:  ArrowUpRight,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
  ]

  const reportTransactions = walletTransactions.slice(0, 5).map((t) => {
    const amt        = Number(t.amount || 0)
    const isIncoming = amt > 0
    return {
      date: new Date(t.created_at * 1000).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      }),
      description: t.type?.replaceAll("_", " ")?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Transaction",
      type: isIncoming ? "Incoming" : "Outgoing",
      amount: `${isIncoming ? "+" : "-"}${fmt(amt)}`,
      status: "Completed",
    }
  })

  /* ── Empty state ───────────────────────────────────────────────────── */
  if (!generated) {
    return (
      <DashboardShell title="Reports" subtitle="AI-powered financial reports and insights.">
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-6">
            <FileText size={28} className="text-gray-400" />
          </div>

          <h2 className="text-[18px] font-semibold text-gray-900 tracking-tight mb-2">
            Generate your financial report
          </h2>
          <p className="text-[13px] text-gray-400 max-w-sm mb-8 leading-relaxed">
            Click the button below to let Gemini analyze your transactions and generate
            a full AI-powered financial report with insights.
          </p>

          {error && (
            <div className="flex items-center gap-2 text-[12px] text-red-600 bg-red-50 border border-red-100 rounded-full px-4 py-2 mb-5">
              <CircleAlert size={13} />
              Failed to generate report. Please try again.
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating || txLoading}
            className="inline-flex items-center gap-2 h-11 text-[13px] font-semibold text-white bg-black hover:bg-gray-900 rounded-full px-7 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating
              ? <Loader2 size={14} className="animate-spin" />
              : <Sparkles size={14} />
            }
            {generating ? "Generating report..." : "Generate with Gemini"}
          </button>

          <p className="text-[11px] text-gray-400 mt-4">
            {txLoading
              ? "Loading your transactions..."
              : `${walletTransactions.length} transactions ready for analysis.`}
          </p>
        </div>
      </DashboardShell>
    )
  }

  /* ── AI insights ───────────────────────────────────────────────────── */
  const aiInsights  = (report?.insights || []).map((ins) => {
    const cfg = insightIconMap[ins.category] || insightIconMap.pattern
    return { ...cfg, text: ins.text }
  })
  const keyFindings = report?.keyFindings || []

  /* ── Full report ───────────────────────────────────────────────────── */
  return (
    <DashboardShell
      title="Reports"
      subtitle="AI-powered financial reports and insights."
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-1.5 h-9 text-[12px] font-medium text-gray-600 bg-white border border-gray-200 rounded-full px-4 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {generating
              ? <Loader2 size={13} className="animate-spin" />
              : <RefreshCw size={13} />
            }
            {generating ? "Regenerating..." : "Refresh Data"}
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-1.5 h-9 text-[12px] font-semibold text-white bg-black hover:bg-gray-900 rounded-full px-4 transition-colors disabled:opacity-50"
          >
            <Sparkles size={13} />
            Generate with Gemini
          </button>
        </div>
      }
    >
      <section ref={reportRef} className="grid grid-cols-12 gap-4">

        {/* ── LEFT ────────────────────────────────────────────────────── */}
        <div className="col-span-12 lg:col-span-8 space-y-4">

          {/* AI Report Preview card */}
          <RevealSection show={generated} delay={0}>
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">

            {/* Card header */}
            <div className="flex items-center justify-between mb-1">
              <h2 className="flex items-center gap-1.5 text-[14px] font-semibold text-gray-900">
                <Sparkles size={14} className="text-violet-500" />
                AI Report Preview
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 border border-violet-100 px-2.5 py-0.5 text-[10px] font-semibold text-violet-600">
                <Sparkles size={9} />
                Generated by Gemini
              </span>
            </div>

            {/* Summary — typewriter reveal */}
            <p className="text-[12px] text-gray-400 mb-5 leading-relaxed">
              <Typewriter
                text={report?.reportSummary || "Preview of the insights Gemini included in your report."}
                speed={15}
                delay={200}
              />
            </p>

            {/* FIX: stat tiles — white bg, gray border, no tinted backgrounds */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {summaryStats.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="bg-white border border-gray-100 rounded-[14px] p-4"
                  >
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center mb-3 ${s.iconBg}`}>
                      <Icon size={15} className={s.iconColor} />
                    </div>
                    <p className="text-[11px] text-gray-400 leading-none mb-1.5">{s.label}</p>
                    <p className="text-[18px] font-semibold text-gray-900 tracking-tight leading-none mb-1 truncate">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">{s.sub}</p>
                  </div>
                )
              })}
            </div>

            {/* Key findings */}
            <h3 className="text-[13px] font-semibold text-gray-900 mb-3">Key findings</h3>
            <ul className="space-y-2 mb-5 list-none m-0 p-0">
              {keyFindings.map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-gray-600 leading-relaxed">
                    <Typewriter text={line} speed={12} delay={600 + i * 400} />
                  </span>
                </li>
              ))}
            </ul>

            {/* FIX: recommendation — subtle gray instead of violet gradient */}
            {report?.recommendation && (
              <div className="rounded-[12px] border border-gray-100 bg-gray-50 px-4 py-3 flex items-start gap-2.5">
                <Sparkles size={13} className="text-violet-500 flex-shrink-0 mt-0.5" />
                <p className="text-[12px] text-gray-600 leading-relaxed m-0">
                  <Typewriter
                    text={report.recommendation}
                    speed={14}
                    delay={600 + keyFindings.length * 400 + 300}
                  />
                </p>
              </div>
            )}
          </div>
          </RevealSection>

          {/* Transactions in this report */}
          <RevealSection show={generated} delay={300}>
          <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-gray-50">
              <div>
                <h3 className="text-[14px] font-semibold text-gray-900">
                  Transactions in this report
                </h3>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  Showing {reportTransactions.length} of {walletTransactions.length} transactions
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="text-left border-b border-gray-50">
                    {["Date", "Description", "Type", "Amount", "Status"].map((h) => (
                      <th key={h} className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-[13px] text-gray-400">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    reportTransactions.map((t, i) => {
                      const isIncoming = t.type === "Incoming"
                      return (
                        <tr key={i} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/60 transition-colors">
                          <td className="px-5 py-3.5 text-[13px] text-gray-400 tabular-nums">{t.date}</td>
                          <td className="px-5 py-3.5 text-[13px] text-gray-800 font-medium">{t.description}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              isIncoming
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-rose-50 text-rose-600 border border-rose-100"
                            }`}>
                              {isIncoming ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                              {t.type}
                            </span>
                          </td>
                          <td className={`px-5 py-3.5 text-[13px] font-semibold tabular-nums ${
                            isIncoming ? "text-emerald-600" : "text-rose-600"
                          }`}>
                            {t.amount}
                          </td>
                          <td className="px-5 py-3.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                              <CheckCircle2 size={10} />
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </RevealSection>
        </div>

        {/* ── RIGHT SIDEBAR ────────────────────────────────────────────── */}
        <RevealSection show={generated} delay={500} className="col-span-12 lg:col-span-4 space-y-4">
        <aside className="space-y-4">

          {/* AI Insights */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="flex items-center gap-1.5 text-[14px] font-semibold text-gray-900">
                <Sparkles size={14} className="text-violet-500" />
                AI Insights
              </h3>
              {/* FIX: simple text badge, no flashy color */}
              <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">
                {report?.is_fallback ? "Fallback" : "Live"}
              </span>
            </div>
            <p className="text-[12px] text-gray-400 mb-4">
              {report?.is_fallback
                ? "Showing default insights."
                : "Gemini-generated insights from your data."}
            </p>

            {/* FIX: circular icon containers matching the established AI sidebar style */}
            <div>
              {aiInsights.map((insight, i) => {
                const Icon = insight.icon
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 py-3 ${
                      i !== aiInsights.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <span className="h-7 w-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 flex-shrink-0 mt-0.5">
                      <Icon size={12} />
                    </span>
                    <p className="text-[12px] text-gray-600 leading-relaxed m-0">
                      <Typewriter text={insight.text} speed={14} delay={300 + i * 500} />
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-gray-100 mt-3 pt-3">
              <p className="flex items-start gap-1.5 text-[11px] text-gray-400 m-0">
                <ShieldCheck size={12} className="text-gray-300 flex-shrink-0 mt-0.5" />
                All data is securely analyzed and never shared with third parties.
              </p>
            </div>
          </div>

          {/* Your Report — Download */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                <FileText size={15} />
              </span>
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold text-gray-900">Your Report</h3>
                <p className="text-[12px] text-gray-400 mt-0.5">Ready to download as a PDF.</p>
              </div>
            </div>

            {/* PDF mockup — toned down */}
            <div className="rounded-[12px] border border-gray-100 bg-gray-50 p-3 mb-4">
              <div className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src="/img/logo.png"
                    alt=""
                    className="h-4 w-auto opacity-80"
                    onError={(e) => { e.currentTarget.style.display = "none" }}
                  />
                  <span className="text-[12px] font-semibold text-gray-800">Swift</span>
                </div>
                <p className="text-[13px] font-semibold text-gray-900 leading-tight">Financial Report</p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </p>
                {/* Skeleton lines */}
                <div className="space-y-1.5 my-3">
                  <div className="h-1.5 w-full rounded-full bg-gray-100" />
                  <div className="h-1.5 w-5/6 rounded-full bg-gray-100" />
                  <div className="h-1.5 w-4/6 rounded-full bg-gray-100" />
                </div>
                {/* Mini chart preview */}
                <div className="flex items-end gap-1 h-10">
                  {[6, 9, 4, 12, 7, 10, 5].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm bg-gray-200"
                      style={{ height: `${h * 4}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="inline-flex w-full items-center justify-center gap-2 h-10 text-[13px] font-semibold text-white bg-black hover:bg-gray-900 rounded-full transition-colors"
            >
              <Download size={13} />
              Download PDF
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-2">Your report is ready</p>
          </div>
        </aside>
        </RevealSection>

      </section>
    </DashboardShell>
  )
}

export default Reports