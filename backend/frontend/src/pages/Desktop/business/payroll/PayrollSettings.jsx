import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import {
  IoArrowBack,
  IoCheckmarkSharp,
} from "react-icons/io5"

import { HiOutlineSparkles } from "react-icons/hi2"

import {
  LuChevronDown,
  LuPlus,
  LuShieldCheck,
  LuEye,
  LuShieldAlert,
  LuPlay,
  LuFileText,
  LuLoaderCircle,
} from "react-icons/lu"

import {
  FiActivity,
  FiTrendingUp,
  FiAlertTriangle,
  FiDollarSign,
  FiUserCheck,
  FiFileText,
} from "react-icons/fi"

import { TbHandClick } from "react-icons/tb"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import Typewriter from "@/components/Typewriter"

import axios from "axios"

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const modes = [
  {
    id: "manual",
    label: "Manual Mode",
    icon: TbHandClick,
    desc: "You review and manually run each payroll.",
    bullets: [
      "AI provides analysis and insights",
      "You initiate payments",
    ],
    badge: null,
  },
  {
    id: "approval",
    label: "Approval Mode",
    icon: IoCheckmarkSharp,
    desc: "AI prepares everything and you approve before payments.",
    bullets: [
      "AI prepares payroll and payouts",
      "You approve before execution",
      "Recommended for most businesses",
    ],
    badge: "RECOMMENDED",
  },
  {
    id: "autopay",
    label: "AutoPay Mode",
    icon: LuPlay,
    desc: "AI automatically executes payroll when all conditions are met.",
    bullets: [
      "Fully automated execution",
      "Smart safety checks",
      "Ideal for mature operations",
    ],
    badge: "MOST AUTONOMOUS",
  },
]

const safetyRules = [
  {
    id: "wallet",
    icon: FiDollarSign,
    label: "Sufficient Wallet Balance",
    desc: "Available balance must cover total payroll amount.",
    type: "toggle",
  },
  {
    id: "variance",
    icon: FiTrendingUp,
    label: "Payroll Variance Threshold",
    desc: "Payroll amount variance must be within threshold.",
    type: "select",
    value: "10%",
  },
  {
    id: "anomalies",
    icon: FiAlertTriangle,
    label: "No Anomalies Detected",
    desc: "No high-risk anomalies or alerts detected by AI.",
    type: "toggle",
  },
  {
    id: "fx",
    icon: FiActivity,
    label: "FX Volatility Threshold",
    desc: "FX volatility must be below the defined threshold.",
    type: "select",
    value: "5%",
  },
  {
    id: "hr",
    icon: FiUserCheck,
    label: "HR Approval Required",
    desc: "Payroll must be approved in QuickBooks.",
    type: "toggle",
  },
  {
    id: "compliance",
    icon: FiFileText,
    label: "Compliance & Documentation",
    desc: "All compliance documents must be valid.",
    type: "toggle",
  },
]

const howItWorks = [
  {
    step: "1. Monitor",
    icon: LuEye,
    body: "Swift continuously monitors payroll conditions, balances, and data from QuickBooks & Rapyd.",
  },
  {
    step: "2. Validate",
    icon: LuShieldCheck,
    body: "AI validates safety rules and detects any risks or anomalies.",
  },
  {
    step: "3. Decide",
    icon: LuShieldAlert,
    body: "If all conditions are met, Swift prepares the payout execution.",
  },
  {
    step: "4. Execute",
    icon: LuPlay,
    body: "Payroll is automatically executed and employees are paid.",
  },
  {
    step: "5. Report",
    icon: LuFileText,
    body: "You receive a summary and audit trail for complete transparency.",
  },
]

/* -------------------------------------------------------------------------- */
/*  Components                                                                 */
/* -------------------------------------------------------------------------- */

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${enabled ? "bg-emerald-600" : "bg-zinc-200"
      }`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-6" : "translate-x-1"
        }`}
    />
  </button>
)

const ModeCard = ({
  mode,
  selected,
  onSelect,
}) => {
  const isSelected = selected === mode.id

  return (
    <button
      onClick={() => onSelect(mode.id)}
      className={`relative rounded-3xl border p-8 text-left transition-all ${isSelected
          ? "border-emerald-300 bg-emerald-50/40 ring-1 ring-emerald-200"
          : "border-zinc-200 bg-white hover:border-zinc-300"
        }`}
    >
      {/* Radio */}
      <span className="absolute right-6 top-6">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${isSelected
              ? "border-emerald-500 bg-emerald-500"
              : "border-zinc-300"
            }`}
        >
          {isSelected && (
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
          )}
        </span>
      </span>

      {/* Icon */}
      <span
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${isSelected
            ? "bg-emerald-100 text-emerald-700"
            : "bg-zinc-100 text-zinc-600"
          }`}
      >
        <mode.icon size={22} />
      </span>

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-zinc-900">
        {mode.label}
      </h3>

      <p className="mb-5 text-sm leading-relaxed text-zinc-500">
        {mode.desc}
      </p>

      <ul className="space-y-3">
        {mode.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-3 text-sm text-zinc-700"
          >
            <IoCheckmarkSharp
              size={16}
              className="mt-0.5 flex-shrink-0 text-emerald-600"
            />

            {b}
          </li>
        ))}
      </ul>

      {mode.badge && (
        <span
          className={`mt-5 inline-flex rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wide ${mode.badge === "RECOMMENDED"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-zinc-100 text-zinc-700"
            }`}
        >
          {mode.badge}
        </span>
      )}
    </button>
  )
}

const SafetyRuleRow = ({
  rule,
  enabled,
  onToggle,
}) => (
  <div className="flex items-center gap-4 border-b border-zinc-100 py-5 last:border-0">
    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
      <rule.icon size={18} />
    </span>

    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold text-zinc-900">
        {rule.label}
      </p>

      <p className="mt-1 text-sm leading-relaxed text-zinc-500">
        {rule.desc}
      </p>
    </div>

    {rule.type === "toggle" ? (
      <Toggle
        enabled={enabled}
        onChange={onToggle}
      />
    ) : (
      <button className="inline-flex h-11 items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
        {rule.value}

        <LuChevronDown
          size={16}
          className="text-zinc-400"
        />
      </button>
    )}
  </div>
)

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const PayrollSettings = () => {
  const [selectedMode, setSelectedMode] =
    useState("approval")

  const [toggles, setToggles] = useState({
    wallet: true,
    variance: true,
    anomalies: true,
    fx: true,
    hr: true,
    compliance: true,
  })

  const handleToggle = (id) =>
    setToggles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))

  /* ── Gemini AI Advisory ─────────────────────────────────────── */
  const [aiAdvice, setAiAdvice] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("api_token")
    if (!token) return

    const fetchAdvice = async () => {
      setAiLoading(true)
      try {
        const payload = {
          totalAmount: 0,
          billsTotal: 0,
          employeesTotal: 0,
          billsCount: 0,
          employeesCount: 18,
          vendorCount: 3,
          bills: [],
          employees: [{ name: "Payroll Settings Context", role: "Configuration Review", amount: 0 }],
        }

        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/gemini/review-payroll`,
          payload,
          { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
        )

        if (response.data?.success && response.data?.data) {
          setAiAdvice(response.data.data)
        }
      } catch (err) {
        console.error("Settings AI advisory failed:", err)
      } finally {
        setAiLoading(false)
      }
    }

    fetchAdvice()
  }, [])

  return (
    <DashboardShell
      title="Payroll Automation"
      subtitle="Choose how Swift should handle payroll execution."
    >
      {/* Back */}
      <Link
        to="/business/payroll"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900"
      >
        <IoArrowBack size={16} />
        Back to Payroll Analysis
      </Link>

      {/* Modes */}
      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold text-zinc-900">
          Automation Mode
        </h2>

        <p className="mb-6 text-sm text-zinc-500">
          Select how you want Swift to handle payroll execution.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {modes.map((m) => (
            <ModeCard
              key={m.id}
              mode={m}
              selected={selectedMode}
              onSelect={setSelectedMode}
            />
          ))}
        </div>
      </section>

      {/* ─── Gemini AI Advisory ────────────────────────────────── */}
      <section className="mb-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
              <HiOutlineSparkles size={18} className="text-violet-600" />
              AI Configuration Advisory
            </h3>

            <span className={`rounded-full px-3 py-1 text-xs font-medium ${aiAdvice && !aiAdvice.is_fallback
                ? "bg-violet-100 text-violet-700"
                : "bg-zinc-100 text-zinc-500"
              }`}>
              {aiAdvice ? (aiAdvice.is_fallback ? "Fallback" : "Gemini") : "Beta"}
            </span>
          </div>

          <p className="mb-6 text-sm text-zinc-500">
            Gemini analyzed your payroll patterns to recommend optimal settings.
          </p>

          {/* Loading */}
          {aiLoading && (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-zinc-400">
              <LuLoaderCircle size={16} className="animate-spin" />
              Analyzing your payroll configuration...
            </div>
          )}

          {/* Live AI advice */}
          {!aiLoading && aiAdvice && (
            <div className="space-y-5">
              {/* Summary */}
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <p className="text-sm leading-relaxed text-zinc-600">
                  <Typewriter text={aiAdvice.summary || "Your payroll configuration appears well-balanced."} speed={14} delay={100} />
                </p>
              </div>

              {/* Findings as tips */}
              {(aiAdvice.findings || []).slice(0, 3).map((finding, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-zinc-100 pb-4 last:border-none last:pb-0">
                  <IoCheckmarkSharp size={16} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                  <p className="text-sm leading-relaxed text-zinc-600">
                    <Typewriter text={finding} speed={12} delay={400 + i * 400} />
                  </p>
                </div>
              ))}

              {/* Recommendation */}
              {aiAdvice.recommendation && (
                <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                  <div className="flex items-start gap-2">
                    <HiOutlineSparkles size={14} className="mt-0.5 flex-shrink-0 text-violet-600" />
                    <p className="text-sm leading-relaxed text-violet-700">
                      <Typewriter text={aiAdvice.recommendation} speed={14} delay={1600} />
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Static fallback */}
          {!aiLoading && !aiAdvice && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm leading-relaxed text-zinc-500">
                Connect your payroll data to receive AI-powered configuration recommendations.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Main */}
      <section className="mb-6 grid grid-cols-12 gap-6">
        {/* Safety */}
        <div className="col-span-12 rounded-3xl border border-zinc-200 bg-white p-8 lg:col-span-7">
          <h3 className="mb-2 text-xl font-semibold text-zinc-900">
            AutoPay Safety Rules
          </h3>

          <p className="mb-6 text-sm text-zinc-500">
            Define the conditions that must be met for AutoPay to execute.
          </p>

          <div>
            {safetyRules.map((rule) => (
              <SafetyRuleRow
                key={rule.id}
                rule={rule}
                enabled={toggles[rule.id]}
                onToggle={() =>
                  handleToggle(rule.id)
                }
              />
            ))}
          </div>

          {/* <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900">
            <LuPlus size={16} />
            Add Custom Rule
          </button> */}
        </div>

        {/* How it works */}
        <div className="col-span-12 rounded-3xl border border-zinc-200 bg-white p-8 lg:col-span-5">
          <h3 className="mb-6 text-xl font-semibold text-zinc-900">
            How AutoPay Works
          </h3>

          <ul className="mb-6 space-y-5">
            {howItWorks.map((item) => (
              <li
                key={item.step}
                className="flex items-start gap-4"
              >
                <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <item.icon size={16} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-900">
                    {item.step}
                  </p>

                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Callout */}
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <p className="mb-2 text-sm font-semibold text-zinc-900">
              Security First
            </p>

            <p className="text-sm leading-relaxed text-zinc-600">
              AutoPay actions are logged, encrypted,
              and fully auditable. You can pause or
              override anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
        <p className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-zinc-300 text-zinc-400">
            <IoCheckmarkSharp size={10} />
          </span>

          Your changes are saved automatically.
        </p>

        <div className="flex items-center gap-4">
          <Link
            to="/business/payroll"
            className="inline-flex h-12 items-center rounded-2xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            Cancel
          </Link>

          {/* <button className="inline-flex h-12 items-center rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-zinc-900">
            Save Settings
          </button> */}
        </div>
      </div>
    </DashboardShell>
  )
}

export default PayrollSettings