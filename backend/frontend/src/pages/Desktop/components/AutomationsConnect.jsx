import { useState } from "react"
import {
  LuRefreshCw,
  LuFolderOpen,
  LuClock,
  LuShield,
  LuChevronRight,
  LuCircleCheck,
  LuExternalLink,
} from "react-icons/lu"
import { TbArrowsExchange } from "react-icons/tb"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"

/* -----------------------------------------------------------
   Shared Automations connect page (QuickBooks integration)
   Used by both Personal and Business contexts via `variant`.
----------------------------------------------------------- */

const QbLogo = ({ size = 28 }) => (
  <span
    className="inline-flex items-center justify-center rounded-full bg-emerald-500 font-bold text-white"
    style={{ width: size, height: size, fontSize: size * 0.5, letterSpacing: "-0.02em" }}
    aria-label="QuickBooks"
  >
    qb
  </span>
)

const benefits = [
  {
    icon: LuRefreshCw,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Automatically sync transactions",
    desc: "Keep your books up to date in real time.",
  },
  {
    icon: LuFolderOpen,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "Categorize with confidence",
    desc: "Match payments and payouts to the right accounts.",
  },
  {
    icon: LuClock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Save time, reduce errors",
    desc: "Automate repetitive tasks and focus on growth.",
  },
]

const AutomationsConnect = ({ variant = "business" }) => {
  const [companyId, setCompanyId] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const isPersonal = variant === "personal"
  const subtitle = isPersonal
    ? "Connect QuickBooks to automate your personal accounting workflows."
    : "Connect QuickBooks to automate your accounting workflows."

  const steps = [
    {
      n: 1,
      icon: <QbLogo size={28} />,
      iconBg: "bg-emerald-50",
      title: "Connect QuickBooks",
      desc: "Enter your Company ID and Access Token to connect.",
    },
    {
      n: 2,
      icon: <TbArrowsExchange size={20} className="text-violet-600" />,
      iconBg: "bg-violet-50",
      title: "Map accounts",
      desc: "Choose how your accounts and data sync.",
    },
    {
      n: 3,
      icon: <LuRefreshCw size={20} className="text-amber-600" />,
      iconBg: "bg-amber-50",
      title: "Sync data",
      desc: "We'll securely sync your transactions and contacts.",
    },
    {
      n: 4,
      icon: <LuCircleCheck size={20} className="text-emerald-600" />,
      iconBg: "bg-emerald-50",
      title: "You're all set",
      desc: "Automation is active and your books stay updated.",
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting || !companyId || !accessToken) return
    setSubmitting(true)
    // TODO: wire to backend
    setTimeout(() => setSubmitting(false), 1200)
  }

  return (
    <DashboardShell title="Automations" subtitle={subtitle}>
      {/* ── Connect panel ─────────────────────────────────── */}
      <section className="mb-6 rounded-3xl border border-zinc-200 bg-white p-7">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — pitch */}
          <div>
            <div className="mb-5 flex items-start gap-4">
              <QbLogo size={40} />
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                  Connect QuickBooks
                </h2>
                <p className="mt-1 max-w-[42ch] text-sm leading-relaxed text-zinc-500">
                  Securely connect your QuickBooks account to automate
                  transactions, sync data, and save time.
                </p>
              </div>
            </div>

            <ul className="m-0 flex flex-col gap-4 p-0">
              {benefits.map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${b.iconBg} ${b.iconColor}`}
                  >
                    <b.icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="m-0 text-sm font-semibold text-zinc-900">
                      {b.title}
                    </p>
                    <p className="m-0 mt-0.5 text-sm text-zinc-500">
                      {b.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — connection form */}
          <div className="lg:border-l lg:border-zinc-200 lg:pl-10">
            <h3 className="text-base font-semibold tracking-tight text-zinc-900">
              QuickBooks Connection
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              Enter your QuickBooks credentials to connect your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="qb-company-id"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Company ID
                </label>
                <input
                  id="qb-company-id"
                  type="text"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  placeholder="Enter your Company ID"
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="qb-access-token"
                  className="text-sm font-semibold text-zinc-900"
                >
                  Access Token
                </label>
                <input
                  id="qb-access-token"
                  type="password"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Enter your Access Token"
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-zinc-400"
                />
              </div>

              <p className="flex items-center gap-2 text-xs text-zinc-500">
                <LuShield size={14} className="text-zinc-400" />
                Your credentials are encrypted and securely stored.
              </p>

              <button
                type="submit"
                disabled={submitting || !companyId || !accessToken}
                className="mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black text-sm font-semibold text-white transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <QbLogo size={18} />
                {submitting ? "Connecting..." : "Connect QuickBooks"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="mb-6 rounded-3xl border border-zinc-200 bg-white p-7">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
          How it works
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Get started in just a few simple steps.
        </p>

        <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li key={step.n} className="relative flex items-start gap-4">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.iconBg}`}
              >
                {step.icon}
              </span>

              <div className="min-w-0 pt-0.5">
                <p className="m-0 text-xs font-semibold text-zinc-400">
                  {step.n}
                </p>
                <p className="mt-1 text-sm font-semibold text-zinc-900">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-zinc-500">{step.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <LuChevronRight
                  size={18}
                  aria-hidden
                  className="absolute right-0 top-3 hidden text-zinc-300 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* ── Footer note ───────────────────────────────────── */}
      <section className="flex items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
            <LuShield size={18} />
          </span>
          <div className="min-w-0">
            <p className="m-0 text-sm font-semibold text-zinc-900">
              Secure & private
            </p>
            <p className="m-0 mt-0.5 text-sm text-zinc-500">
              We never store your QuickBooks password. Your data is encrypted
              and protected.
            </p>
          </div>
        </div>

        <a
          href="#"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:underline underline-offset-4"
        >
          Learn more about security
          <LuExternalLink size={14} />
        </a>
      </section>
    </DashboardShell>
  )
}

export default AutomationsConnect
