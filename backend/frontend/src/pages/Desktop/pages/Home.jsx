import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ReactCountryFlag from "react-country-flag"
import {
  TbCheck,
  TbPlugConnected,
  TbBrain,
  TbRobot,
  TbBolt,
  TbReportAnalytics,
  TbShieldLock,
  TbLockSquare,
  TbBadge,
  TbCertificate,
  TbPlus,
  TbMinus,
  TbArrowUpRight,
  TbSparkles,
  TbCircleDotFilled,
  TbBook,
  TbReceipt,
  TbAlertTriangle,
  TbSend,
} from "react-icons/tb"
import CountUp from "@/components/CountUp"
import { useScrollAnimations } from "@/hooks/useScrollAnimations"
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"

const Home = () => {
  // Smooth-scroll + scroll-triggered animations
  useScrollAnimations()

  const [openFaq, setOpenFaq] = useState(0)

  // ----- Live Agent Activity Feed -----
  const ALL_EVENTS = [
    { type: "reconcile", icon: TbCheck, color: "#00FF8C", label: "Reconciled", detail: "47 transactions across 3 bank feeds" },
    { type: "payout",    icon: TbSend,  color: "#D9FF43", label: "Payout sent", detail: "$2,400 USD → Lagos · Adaeze O." },
    { type: "journal",   icon: TbBook,  color: "#9DFF00", label: "Journal posted", detail: "Q1 contractor expenses · QuickBooks" },
    { type: "report",    icon: TbReportAnalytics, color: "#D9FF43", label: "Report generated", detail: "Weekly P&L by region · ready for review" },
    { type: "flag",      icon: TbAlertTriangle, color: "#ff7676", label: "Anomaly flagged", detail: "Vendor invoice 3.2x above baseline" },
    { type: "payout",    icon: TbSend,  color: "#D9FF43", label: "Payout sent", detail: "₹68,200 INR → Bangalore · Rohan K." },
    { type: "reconcile", icon: TbCheck, color: "#00FF8C", label: "Reconciled", detail: "Stripe payouts matched to QuickBooks" },
    { type: "invoice",   icon: TbReceipt, color: "#9DFF00", label: "Invoice approved", detail: "$8,500 · Tier 1 vendor · auto-paid" },
    { type: "payout",    icon: TbSend,  color: "#D9FF43", label: "Payout sent", detail: "£1,950 GBP → London · James W." },
    { type: "report",    icon: TbReportAnalytics, color: "#D9FF43", label: "Report generated", detail: "Cash runway by currency · 14 mo." },
    { type: "journal",   icon: TbBook,  color: "#9DFF00", label: "Journal posted", detail: "FX gain on USD/EUR conversion" },
    { type: "reconcile", icon: TbCheck, color: "#00FF8C", label: "Reconciled", detail: "Mercury → QuickBooks · 0 variances" },
  ]

  const [events, setEvents] = useState(() =>
    ALL_EVENTS.slice(0, 6).map((e, i) => ({ ...e, id: i, age: i }))
  )

  useEffect(() => {
    let counter = events.length
    const interval = setInterval(() => {
      setEvents((prev) => {
        const next = ALL_EVENTS[counter % ALL_EVENTS.length]
        counter += 1
        return [
          { ...next, id: counter, age: 0 },
          ...prev.slice(0, 5).map((e) => ({ ...e, age: e.age + 1 })),
        ]
      })
    }, 2800)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatAge = (age) => {
    if (age === 0) return "just now"
    const seconds = age * 3
    if (seconds < 60) return `${seconds}s ago`
    const mins = Math.floor(seconds / 60)
    return `${mins}m ago`
  }
  // ------------------------------------

  return (
    <div className="font-sans">

      {/* ============================================================
          HERO BAND
          ============================================================ */}
      <div className="bg-main-palette min-h-screen flex flex-col relative overflow-hidden">

        {/* Navbar */}
        <nav
          className="page-x relative z-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px] relative">
            <div className="flex-shrink-0">
              <img src="/img/logo-inverted.png" alt="Swift Logo" className="h-8 w-auto" />
            </div>

            <ul className="absolute left-1/2 -translate-x-1/2 flex items-center gap-9 list-none m-0 p-0">
              {["Business", "Personal", "Integrations"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-white/80 no-underline hover:text-white transition-colors duration-200"
                    style={{ fontSize: "0.9rem", fontWeight: 500, letterSpacing: "0.01em" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-5">
              <Link
                to="/login"
                className="no-underline text-white/80 hover:text-white transition-colors duration-200"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                Log in
              </Link>
              <Link
                to="/select-account-type"
                className="no-underline inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-[#e8e8e8] active:bg-[#d4d4d4] transition-colors duration-200"
                style={{ fontSize: "0.875rem", letterSpacing: "0.01em" }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero — three column layout */}
        <section className="page-x flex-1 flex items-center pb-16 pt-4 relative z-10">
          <div className="max-w-[1200px] mx-auto w-full grid grid-cols-12 items-center gap-8">

            {/* Left column — hero text */}
            <div className="col-span-5 flex flex-col">
              <p
                style={{ animation: "fadeInUp 0.65s ease 0.1s forwards", opacity: 0, letterSpacing: "0.22em", fontSize: "0.7rem" }}
                className="text-[#D9FF43] font-semibold uppercase mb-6"
              >
                The next-generation global payment gateway
              </p>

              <h1
                style={{
                  animation: "fadeInUp 0.65s ease 0.2s forwards",
                  opacity: 0,
                  fontSize: "clamp(2rem, 3vw, 3.25rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  maxWidth: "18ch",
                }}
                className="font-display text-white mb-6"
              >
                A gateway that operates accounting for you
              </h1>

              <p
                style={{ animation: "fadeInUp 0.65s ease 0.3s forwards", opacity: 0, lineHeight: 1.65 }}
                className="text-white/60 text-[1rem] max-w-[440px] mb-10"
              >
                Swift automates payroll, reconciliation, accounting, and financial operations directly inside your payment flow. 
              </p>

              <div
                style={{ animation: "fadeInUp 0.65s ease 0.4s forwards", opacity: 0 }}
                className="flex items-center gap-3 mb-12"
              >
                <Link
                  to="/select-account-type"
                  className="no-underline inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#e8e8e8] transition-colors duration-200"
                  style={{ fontSize: "0.875rem" }}
                >
                  Start free trial
                </Link>
                <Link
                  to="#"
                  className="no-underline inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors duration-200"
                  style={{ fontSize: "0.875rem" }}
                >
                  Watch demo
                </Link>
              </div>
            </div>

            {/* Center column — phone mockup */}
            <div className="col-span-4 flex items-end justify-center h-full">
              <div data-parallax="0.15">
                <div style={{ transform: "rotate(-8deg)", transformOrigin: "center bottom" }}>
                  <img
                    src="/img/phone2.png"
                    alt="Swift App"
                    style={{ animation: "fadeInUp 0.9s ease 0.2s forwards", opacity: 0 }}
                    className="w-full max-w-[460px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Right column — stats panel */}
            <div
              className="col-span-3 pl-8 flex flex-col justify-center"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div style={{ animation: "fadeInRight 0.65s ease 0.3s forwards", opacity: 0 }}>
                <p className="text-white/50 text-sm leading-relaxed mb-7" style={{ lineHeight: 1.6 }}>
                  Trusted by digital teams running globally distributed operations across the world.
                </p>
              </div>

              {/* Rating row */}
              <div
                style={{ animation: "fadeInRight 0.65s ease 0.4s forwards", opacity: 0 }}
                className="flex items-center gap-2 mb-10"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#D9FF43">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-[#D9FF43] font-semibold text-sm">4.9</span>
                <span className="text-white/40 text-xs">G2 reviews</span>
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D9FF43]/20 ml-1 flex-shrink-0">
                  <img src="/img/person1.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-7">
                <div style={{ animation: "fadeInRight 0.65s ease 0.5s forwards", opacity: 0 }}>
                  <p
                    className="font-display text-[#D9FF43]"
                    style={{ fontSize: "clamp(2.4rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    <CountUp value={98} suffix="%" duration={1800} />
                  </p>
                  <p className="text-white/35 text-xs mt-2 tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>
                    Manual work eliminated
                  </p>
                </div>
                <div style={{ animation: "fadeInRight 0.65s ease 0.6s forwards", opacity: 0 }}>
                  <p
                    className="font-display text-[#D9FF43]"
                    style={{ fontSize: "clamp(2.4rem, 3.5vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1 }}
                  >
                    <CountUp value={150} suffix="+" duration={1800} />
                  </p>
                  <p className="text-white/35 text-xs mt-2 tracking-wide uppercase" style={{ letterSpacing: "0.08em" }}>
                    Countries supported
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D9FF43]/20 to-transparent" />
      </div>

      {/* ============================================================
          HOW IT WORKS — 3 simple steps
          ============================================================ */}
      <section className="bg-[#080808] py-28 page-x">
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-2xl mb-16" data-reveal="up">
            <p
              className="text-[#D9FF43] font-semibold uppercase mb-5"
              style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
            >
              How it works
            </p>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Set it up once. Swift handles the rest.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative" data-reveal-stagger>
            {[
              {
                step: "01",
                icon: TbPlugConnected,
                title: "Connect QuickBooks",
                copy: "One-click sync to pull in your chart of accounts, vendors, and team. No CSV imports, no manual mapping.",
              },
              {
                step: "02",
                icon: TbBrain,
                title: "Define your guardrails",
                copy: "Tell us who gets paid, when, and how much. Set approval thresholds and let Swift handle the rest.",
              },
              {
                step: "03",
                icon: TbRobot,
                title: "Watch it run",
                copy: "Let Swift execute payouts, reconciliations, and report generation autonomously — with a full audit trail and no prompts required.",
              },
            ].map(({ step, icon: Icon, title, copy }) => (
              <div
                key={step}
                className="rounded-2xl p-8"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-center justify-between mb-7">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(217,255,67,0.1)" }}
                  >
                    <Icon size={22} className="text-[#D9FF43]" />
                  </div>
                  <span
                    className="font-display text-white/15"
                    style={{ fontSize: "2.5rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {step}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-3" style={{ fontSize: "1.05rem" }}>
                  {title}
                </h3>
                <p className="text-white/50 text-sm" style={{ lineHeight: 1.65 }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURES BAND
          ============================================================ */}
      <section
        className="bg-[#080808] py-28 page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-2xl mb-20" data-reveal="up">
            <p
              className="text-[#D9FF43] font-semibold uppercase mb-5"
              style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
            >
              Why Swift
            </p>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              A payment gateway with embedded bookkeeping.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-reveal-stagger>
            {[
              {
                icon: TbSparkles,
                title: "Payments + accounting, unified",
                copy: "Payment gateways stop at moving money. Swift embeds accounting automation directly into the payment infrastructure — reducing added software costs and maintenance overhead.",
              },
              {
                icon: TbBolt,
                title: "Autonomous financial operations",
                copy: "Swift executes payouts, reconciliations, and reporting autonomously — within your company’s approval logic and accounting controls.",
              },
              {
                icon: TbReportAnalytics,
                title: "Always audit-ready",
                copy: "Every action is logged with reasoning and a complete audit trail, keeping books reconciled, compliant, and continuously up to date.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="group rounded-2xl p-8 transition-all duration-300 cursor-default"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = "1px solid rgba(217,255,67,0.2)"
                  e.currentTarget.style.background = "#141414"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"
                  e.currentTarget.style.background = "#111111"
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-7"
                  style={{ background: "rgba(217,255,67,0.1)" }}
                >
                  <Icon size={22} className="text-[#D9FF43]" />
                </div>
                <h3
                  className="text-white font-semibold mb-3"
                  style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed" style={{ lineHeight: 1.65 }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECURITY & COMPLIANCE STRIP
          ============================================================ */}
      <section
        className="bg-[#080808] py-12 page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5" data-reveal="up">
            {[
              { icon: TbLockSquare, label: "SOC 2 Type II" },
              { icon: TbCertificate, label: "PCI DSS Level 1" },
              { icon: TbBadge, label: "Licensed & regulated" },
              { icon: TbShieldLock, label: "End-to-end encryption" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon size={18} className="text-[#D9FF43]" />
                <span className="text-white/60 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          LIVE RATES TICKER (marquee) — payout corridors
          ============================================================ */}
      <section
        className="bg-black py-7 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
          {[
            ...[
              { pair: "USD → NGN", rate: "1,560.42", delta: "+0.34%" },
              { pair: "USD → EUR", rate: "0.9180", delta: "-0.08%" },
              { pair: "USD → JPY", rate: "157.21", delta: "+0.21%" },
              { pair: "USD → GBP", rate: "0.7758", delta: "+0.12%" },
              { pair: "USD → KES", rate: "129.05", delta: "-0.05%" },
              { pair: "USD → INR", rate: "83.72", delta: "+0.19%" },
              { pair: "USD → GHS", rate: "15.32", delta: "+0.42%" },
              { pair: "USD → PHP", rate: "58.10", delta: "+0.28%" },
            ],
            ...[
              { pair: "USD → NGN", rate: "1,560.42", delta: "+0.34%" },
              { pair: "USD → EUR", rate: "0.9180", delta: "-0.08%" },
              { pair: "USD → JPY", rate: "157.21", delta: "+0.21%" },
              { pair: "USD → GBP", rate: "0.7758", delta: "+0.12%" },
              { pair: "USD → KES", rate: "129.05", delta: "-0.05%" },
              { pair: "USD → INR", rate: "83.72", delta: "+0.19%" },
              { pair: "USD → GHS", rate: "15.32", delta: "+0.42%" },
              { pair: "USD → PHP", rate: "58.10", delta: "+0.28%" },
            ],
          ].map((p, i) => {
            const positive = p.delta.startsWith("+")
            return (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span className="text-white/50 text-sm font-medium">{p.pair}</span>
                <span className="text-white text-sm font-semibold">{p.rate}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: positive ? "#D9FF43" : "#ff7676" }}
                >
                  {p.delta}
                </span>
                <span className="text-white/15">·</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ============================================================
          APP FEATURE HIGHLIGHT — Sticky stack (pure CSS)
          ============================================================ */}
      <section className="bg-[#080808] page-x">
        <div className="max-w-[1200px] mx-auto pt-28 pb-20">
          <div className="max-w-2xl mb-4" data-reveal="up">
            <p
              className="text-[#D9FF43] font-semibold uppercase mb-5"
              style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
            >
              Inside the platform
            </p>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Open multi-currency accounts for free.
            </h2>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto pb-32">
          {[
            {
              tag: "Multicurrency Accounts",
              title: "Never visit a bank again.",
              copy:
                "Hold, convert, and move money globally from a single account — with real-time FX rates and zero banking friction.",
              bullets: [
                "Real-time exchange rates",
                "Get paid in any currency",
                "Lower FX conversion costs",
              ],
              accent: "#D9FF43",
            },
            {
              tag: "Autonomous payouts",
              title: "Swift pays your team for you.",
              copy: "Before your team starts the day, Swift has already handled FX, executed payroll payouts, reconciled transactions, and written the journal entries — all within your company’s predefined controls.",
              bullets: ["Threshold-based approvals", "Multi-currency in one batch", "Full reasoning logged per action"],
              accent: "#9DFF00",
            },
            {
              tag: "Self-driving reconciliation",
              title: "Books that close themselves.",
              copy: "Bank feeds, Swift transactions, and QuickBooks ledgers stay in lockstep. When something doesn't match, Swift flags it with a proposed fix.",
              bullets: ["Real-time bank reconciliation", "Auto-categorized transactions", "Variance alerts with context"],
              accent: "#00FF8C",
            },
            {
              tag: "Reports on demand",
              title: "Ask, and the report is written.",
              copy: "P&L by region. Burn by team. Cash runway by currency. Gemini writes the report, formats the export, and drops it in your inbox.",
              bullets: ["Natural-language queries", "Scheduled or on-demand", "Board-ready PDF or live dashboard"],
              accent: "#D9FF43",
            },
          ].map((card, idx, arr) => (
            <div
              key={card.title}
              className="sticky"
              style={{
                top: `${100 + idx * 24}px`,
                marginBottom: idx === arr.length - 1 ? 0 : "24px",
                zIndex: idx + 1,
              }}
            >
              <div
                className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
                style={{
                  background: "#0F0F0F",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minHeight: "440px",
                  boxShadow: "0 -20px 40px -20px rgba(0,0,0,0.5)",
                }}
              >
                {/* Left — content */}
                <div className="p-12 md:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="font-display text-white/15"
                      style={{ fontSize: "1.5rem", letterSpacing: "-0.02em", lineHeight: 1 }}
                    >
                      0{idx + 1}
                    </span>
                    <span className="h-px w-8" style={{ background: "rgba(255,255,255,0.15)" }} />
                    <p
                      className="font-semibold uppercase"
                      style={{ color: card.accent, fontSize: "0.7rem", letterSpacing: "0.22em" }}
                    >
                      {card.tag}
                    </p>
                  </div>

                  <h3
                    className="font-display text-white mb-5"
                    style={{ fontSize: "clamp(1.5rem, 2.2vw, 2.25rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
                  >
                    {card.title}
                  </h3>

                  <p className="text-white/60 text-base mb-7" style={{ lineHeight: 1.7 }}>
                    {card.copy}
                  </p>

                  <ul className="space-y-3">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${card.accent}1f` }}
                        >
                          <TbCheck size={12} style={{ color: card.accent }} />
                        </div>
                        <span className="text-white/70 text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — visual */}
                <div
                  className="relative flex items-center justify-center p-12 overflow-hidden"
                  style={{
                    background:
                      `radial-gradient(circle at 30% 30%, ${card.accent}26 0%, transparent 55%),` +
                      "radial-gradient(circle at 75% 80%, rgba(0,255,140,0.12) 0%, transparent 50%)," +
                      "#0a0a0a",
                  }}
                >
                  <div style={{ transform: idx % 2 === 0 ? "rotate(-6deg)" : "rotate(6deg)" }}>
                    <img
                      src="/img/phone2.png"
                      alt={card.tag}
                      className="w-full max-w-[260px] object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          LIVE AGENT ACTIVITY FEED
          ============================================================ */}
      <section
        className="bg-[#080808] py-28 page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

            {/* Left — copy */}
            <div className="md:col-span-5" data-reveal="left">
              <p
                className="text-[#D9FF43] font-semibold uppercase mb-5"
                style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
              >
                Agent activity
              </p>
              <h2
                className="font-display text-white mb-6"
                style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                Watch the agent<br />work in real time.
              </h2>
              <p className="text-white/60 text-base mb-8" style={{ lineHeight: 1.7 }}>
                Every reconciliation, payout, journal entry, and flagged anomaly
                streams through a single audit-ready feed. Nothing happens you
                can't see — and nothing slips through.
              </p>
              <div className="space-y-4">
                {[
                  "Cryptographic audit trail per action",
                  "Hover any event for the agent's reasoning",
                  "Pause autonomy on a single rule, anytime",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(217,255,67,0.12)" }}
                    >
                      <TbCheck size={12} className="text-[#D9FF43]" />
                    </div>
                    <span className="text-white/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — terminal-style feed */}
            <div className="md:col-span-7" data-reveal="right">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#0A0A0A",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(217,255,67,0.04) inset",
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-3.5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-white/40 text-xs ml-2 font-mono">swift · agent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9FF43] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9FF43]" />
                    </span>
                    <span className="text-[#D9FF43] text-xs font-medium tracking-wide">LIVE</span>
                  </div>
                </div>

                {/* Feed body */}
                <div className="p-2">
                  <div className="space-y-1">
                    {events.map((event, idx) => {
                      const Icon = event.icon
                      const isNew = event.age === 0
                      return (
                        <div
                          key={event.id}
                          className="flex items-start gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
                          style={{
                            background: isNew ? "rgba(217,255,67,0.04)" : "transparent",
                            opacity: 1 - Math.min(idx, 5) * 0.08,
                            animation: isNew ? "fadeInUp 0.5s ease forwards" : undefined,
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = isNew ? "rgba(217,255,67,0.04)" : "transparent")
                          }
                        >
                          {/* Icon */}
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${event.color}1f` }}
                          >
                            <Icon size={14} style={{ color: event.color }} />
                          </div>

                          {/* Body */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-3">
                              <p className="text-white text-sm font-medium truncate">
                                {event.label}
                              </p>
                              <span className="text-white/30 text-xs font-mono flex-shrink-0">
                                {formatAge(event.age)}
                              </span>
                            </div>
                            <p className="text-white/50 text-xs mt-0.5 truncate">
                              {event.detail}
                            </p>
                          </div>

                          {/* Status dot */}
                          <TbCircleDotFilled
                            size={8}
                            style={{ color: event.color }}
                            className="mt-2 flex-shrink-0"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-white/30 text-xs font-mono">
                    Streaming · 1,247 events today
                  </span>
                  <span className="text-white/30 text-xs font-mono">
                    avg. 0.3s response
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <section
        className="bg-[#080808] py-28 page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="max-w-2xl mb-16" data-reveal="up">
            <p
              className="text-[#D9FF43] font-semibold uppercase mb-5"
              style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
            >
              Testimonials
            </p>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Finance teams sleep<br />better with Swift.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-reveal-stagger>
            {[
              {
                quote: "Our month-end close went from 9 days to 2. The agent reconciles everything overnight — I just review the exceptions in the morning.",
                name: "Adaeze Okonkwo",
                role: "Head of Finance, Loophole Labs",
                country: "🇳🇬 Lagos",
                avatar: "/img/person1.jpg",
              },
              {
                quote: "We pay 40 contractors across 12 countries. Swift handles the FX, the journal entries, and the 1099s. I haven't touched a payroll spreadsheet in months.",
                name: "James Whitford",
                role: "CFO, Northwind Studio",
                country: "🇬🇧 London",
                avatar: "/img/person2.jpg",
              },
              {
                quote: "The QuickBooks sync is what sold us. The autonomous payouts are what kept us. It's the first AI agent that actually does the work.",
                name: "Mei Tanaka",
                role: "VP Operations, Hinata Co.",
                country: "🇯🇵 Tokyo",
                avatar: "/img/person3.jpg",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl p-8 flex flex-col"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="#D9FF43">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 text-sm mb-8 flex-1" style={{ lineHeight: 1.7 }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.role} · {t.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SUPPORTED COUNTRIES — payout reach
          ============================================================ */}
      <section
        className="bg-[#080808] py-28 page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
            <div data-reveal="left">
              <p
                className="text-[#D9FF43] font-semibold uppercase mb-5"
                style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
              >
                Global payout reach
              </p>
              <h2
                className="font-display text-white mb-6"
                style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                Pay your team in<br />150+ countries.
              </h2>
              <p className="text-white/60 text-base mb-8" style={{ lineHeight: 1.7 }}>
                Whether your engineer is in Lagos, your designer is in Manila, or your
                ops lead is in São Paulo — Swift settles in their local currency, at the
                real rate, without you lifting a finger.
              </p>
              <div className="flex items-center gap-3">
                <TbBolt size={20} className="text-[#D9FF43]" />
                <span className="text-white/70 text-sm font-medium">30+ currencies, instant settlement</span>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3" data-reveal="scale">
              {[
                { code: "US", name: "United States" },
                { code: "GB", name: "United Kingdom" },
                { code: "DE", name: "Germany" },
                { code: "CA", name: "Canada" },
                { code: "AU", name: "Australia" },
                { code: "JP", name: "Japan" },
                { code: "NG", name: "Nigeria" },
                { code: "KE", name: "Kenya" },
                { code: "GH", name: "Ghana" },
                { code: "ZA", name: "South Africa" },
                { code: "EG", name: "Egypt" },
                { code: "MA", name: "Morocco" },
                { code: "FR", name: "France" },
                { code: "IT", name: "Italy" },
                { code: "ES", name: "Spain" },
                { code: "NL", name: "Netherlands" },
                { code: "CH", name: "Switzerland" },
                { code: "SE", name: "Sweden" },
                { code: "CN", name: "China" },
                { code: "IN", name: "India" },
                { code: "SG", name: "Singapore" },
                { code: "KR", name: "South Korea" },
                { code: "TH", name: "Thailand" },
                { code: "PH", name: "Philippines" },
                { code: "BR", name: "Brazil" },
                { code: "MX", name: "Mexico" },
                { code: "AR", name: "Argentina" },
                { code: "CL", name: "Chile" },
                { code: "CO", name: "Colombia" },
                { code: "PE", name: "Peru" },
              ].map((country) => (
                <div
                  key={country.code}
                  title={country.name}
                  className="aspect-square rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-110 overflow-hidden"
                  style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{ width: "1.75em", height: "1.75em", borderRadius: "4px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
          ============================================================ */}
      <section
        className="bg-[#080808] py-28 page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16" data-reveal="up">
            <p
              className="text-[#D9FF43] font-semibold uppercase mb-5"
              style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
            >
              FAQ
            </p>
            <h2
              className="font-display text-white"
              style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Questions, answered.
            </h2>
          </div>

          <div className="space-y-3" data-reveal-stagger>
            {[
              {
                q: "What can the autonomous agent actually do?",
                a: "Swift reads QuickBooks events in real time, executes scheduled and threshold-based payouts, posts journal entries, reconciles bank feeds, flags anomalies, and generates reports. You set the guardrails — it handles the work.",
              },
              {
                q: "How do you keep the AI from making mistakes?",
                a: "Every autonomous action runs against the rules you define — payment limits, approval thresholds, blocked counterparties, currency caps. Anything that exceeds the guardrails pauses and waits for human approval. Every action is logged with the agent's reasoning.",
              },
              {
                q: "Does Swift replace QuickBooks?",
                a: "No — QuickBooks stays your source of truth. Swift sits on top of it and acts on what it sees. You never have to leave QuickBooks if you don't want to.",
              },
              {
                q: "Who can use Swift — my company, or my team members?",
                a: "Both. Companies get the admin console, autonomous payouts, and reporting. Each employee or contractor gets a personal dashboard to view their balances, transaction history, and payout method preferences.",
              },
              {
                q: "How is my financial data protected?",
                a: "End-to-end encryption in transit and at rest, SOC 2 Type II controls, and zero-trust access for the AI agent. Gemini never trains on your data, and we never share it with third parties.",
              },
              {
                q: "What if I need to switch off the autonomy?",
                a: "Toggle any rule to manual at any time. The agent keeps watching and recommending — but waits for your approval before acting. Many teams start in 'co-pilot' mode and graduate to full autonomy as trust builds.",
              },
            ].map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left bg-transparent border-0 cursor-pointer"
                  >
                    <span className="text-white text-base font-medium">{item.q}</span>
                    {isOpen ? (
                      <TbMinus size={20} className="text-[#D9FF43] flex-shrink-0" />
                    ) : (
                      <TbPlus size={20} className="text-white/50 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-7 pb-6 -mt-1">
                      <p className="text-white/60 text-sm" style={{ lineHeight: 1.7 }}>
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA BAND
          ============================================================ */}
      <section
        className="bg-[#080808] page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div
            data-reveal="scale"
            className="rounded-3xl my-28 px-12 py-20 text-center relative overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(217,255,67,0.18) 0%, transparent 45%)," +
                "radial-gradient(circle at 80% 80%, rgba(0,255,140,0.12) 0%, transparent 45%)," +
                "#0a0a0a",
              border: "1px solid rgba(217,255,67,0.15)",
            }}
          >
            <h2
              className="font-display text-white mb-6"
              style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
            >
              Ready to let finance run itself?
            </h2>
            <p className="text-white/60 text-base max-w-md mx-auto mb-10" style={{ lineHeight: 1.7 }}>
              Connect QuickBooks in 60 seconds. Set your rules. Watch the agent
              take over the manual work.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                to="/select-account-type"
                className="no-underline inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#D9FF43] text-black font-semibold hover:brightness-95 transition-all"
                style={{ fontSize: "0.875rem" }}
              >
                Start free trial
              </Link>
              <Link
                to="#"
                className="no-underline inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-all"
                style={{ fontSize: "0.875rem" }}
              >
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BLOG / NEWS STRIP
          ============================================================ */}
      <section
        className="bg-[#080808] py-28 page-x"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4" data-reveal="up">
            <div className="max-w-2xl">
              <p
                className="text-[#D9FF43] font-semibold uppercase mb-5"
                style={{ fontSize: "0.7rem", letterSpacing: "0.22em" }}
              >
                From the blog
              </p>
              <h2
                className="font-display text-white"
                style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
              >
                Inside autonomous finance.
              </h2>
            </div>
            <Link
              to="#"
              className="no-underline inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm font-medium"
            >
              View all
              <TbArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" data-reveal-stagger>
            {[
              {
                tag: "Engineering",
                date: "Mar 12, 2026",
                title: "How we built an AI agent you can actually trust with money",
                excerpt: "Guardrails, deterministic execution, and audit logs — the architecture behind autonomous payouts.",
              },
              {
                tag: "Finance",
                date: "Feb 28, 2026",
                title: "Why month-end close is dead",
                excerpt: "The future of accounting isn't faster spreadsheets — it's books that close themselves continuously.",
              },
              {
                tag: "Product",
                date: "Feb 14, 2026",
                title: "Inside our QuickBooks-to-Gemini pipeline",
                excerpt: "How financial events flow from your books to the agent, and back again — without anyone in between.",
              },
            ].map((post) => (
              <Link
                to="#"
                key={post.title}
                className="no-underline rounded-2xl overflow-hidden flex flex-col group transition-all duration-300"
                style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.border = "1px solid rgba(217,255,67,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)")}
              >
                <div
                  className="aspect-[16/10] relative overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 70%, rgba(217,255,67,0.18) 0%, transparent 50%)," +
                      "#0a0a0a",
                  }}
                >
                  <div className="absolute top-5 left-5">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-white"
                      style={{ background: "rgba(0,0,0,0.5)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.04em" }}
                    >
                      {post.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-5 right-5">
                    <TbSparkles size={20} className="text-[#D9FF43]/60" />
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <p className="text-white/40 text-xs mb-3">{post.date}</p>
                  <h3 className="text-white font-semibold mb-3 group-hover:text-[#D9FF43] transition-colors" style={{ fontSize: "1.05rem", lineHeight: 1.35 }}>
                    {post.title}
                  </h3>
                  <p className="text-white/50 text-sm flex-1" style={{ lineHeight: 1.65 }}>
                    {post.excerpt}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[#D9FF43] text-sm font-semibold">
                    Read article
                    <TbArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer
        className="bg-[#050505] page-x pt-20 pb-12"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {[
              { title: "Product", links: ["Business", "Personal", "Integrations", "Security"] },
              { title: "Solutions", links: ["Global payroll", "Reconciliation", "AI reporting", "Multi-entity"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
              { title: "Legal", links: ["Terms", "Privacy", "AI Policy", "Licenses"] },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="text-white font-semibold mb-5"
                  style={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="#"
                        className="no-underline transition-colors duration-200"
                        style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.5 }}
                        onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <img src="/img/logo-inverted.png" alt="Swift" className="h-6 w-auto opacity-70" />
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.775rem" }}>
                © 2026 Swift. All rights reserved.
              </span>
            </div>
            <p
              className="max-w-sm"
              style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.775rem", lineHeight: 1.6 }}
            >
              Swift is a financial technology platform, not a bank. Banking and
              payment services provided by licensed partner institutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
