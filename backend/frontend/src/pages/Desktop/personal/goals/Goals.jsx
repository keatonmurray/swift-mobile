import { useState, useEffect } from "react"
import {
  Target,
  Plus,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Wallet,
  Globe,
  CheckCircle2,
  Clock,
  MoreHorizontal,
  ArrowUpRight,
  ShieldCheck,
  Loader2,
  RefreshCw,
} from "lucide-react"
import axios from "axios"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import RevealSection from "@/components/RevealSection"

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const getTypeIcon = (type) => {
  switch (type) {
    case "savings":
      return { icon: Wallet, bg: "bg-emerald-50", color: "text-emerald-600" }
    case "income":
      return { icon: TrendingUp, bg: "bg-indigo-50", color: "text-indigo-600" }
    case "spending":
      return { icon: TrendingDown, bg: "bg-rose-50", color: "text-rose-600" }
    case "milestone":
      return { icon: Globe, bg: "bg-amber-50", color: "text-amber-600" }
    default:
      return { icon: Target, bg: "bg-zinc-100", color: "text-zinc-600" }
  }
}

const getSuggestionIcon = (category) => {
  switch (category) {
    case "savings":
      return { icon: Wallet, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" }
    case "income":
      return { icon: TrendingUp, iconBg: "bg-indigo-50", iconColor: "text-indigo-600" }
    case "spending":
      return { icon: TrendingDown, iconBg: "bg-rose-50", iconColor: "text-rose-600" }
    case "milestone":
      return { icon: Globe, iconBg: "bg-sky-50", iconColor: "text-sky-600" }
    default:
      return { icon: Wallet, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" }
  }
}

const formatValue = (value, currency) => {
  if (!currency) return String(value)
  return `$${Number(value).toLocaleString()}`
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const Goals = () => {
  const [goals, setGoals] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [walletData, setWalletData] = useState(null)
  const [transactions, setTransactions] = useState([])

  /* ── Fetch wallet + transactions ──────────────────────────────────── */
  const fetchData = async () => {
    const token = localStorage.getItem("api_token")
    if (!token) return { wallet: null, txns: [] }

    try {
      const [walletRes, txnRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ])

      const wallet = walletRes.data.data.wallet_rapyd
      const txns = txnRes.data.transactions || []
      setWalletData(wallet)
      setTransactions(txns)
      return { wallet, txns }
    } catch (err) {
      console.error(err)
      return { wallet: null, txns: [] }
    }
  }

  /* ── Fetch AI goals from Gemini ───────────────────────────────────── */
  const fetchGoals = async (wallet, txns) => {
    const token = localStorage.getItem("api_token")
    if (!token) return

    try {
      const accounts = wallet?.accounts || []
      const balance = accounts.reduce(
        (sum, a) => sum + Number(a.balance || 0), 0
      )
      const currencies = accounts.map((a) => a.currency?.toUpperCase()).filter(Boolean)
      const incoming = txns.filter((t) => Number(t.amount || 0) > 0)
      const outgoing = txns.filter((t) => Number(t.amount || 0) < 0)
      const totalIn = incoming.reduce((s, t) => s + Math.abs(Number(t.amount)), 0)
      const totalOut = outgoing.reduce((s, t) => s + Math.abs(Number(t.amount)), 0)

      const recentTransactions = txns.slice(0, 15).map((t) => ({
        type: t.type?.replaceAll("_", " ") || "transaction",
        amount: Number(t.amount || 0),
        currency: t.currency?.toUpperCase() || "USD",
      }))

      const payload = {
        totalBalance: balance,
        totalIncoming: totalIn,
        totalOutgoing: totalOut,
        currencyCount: currencies.length,
        transactionCount: txns.length,
        currencies,
        recentTransactions,
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/gemini/suggest-goals`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data?.success && response.data?.data) {
        const data = response.data.data

        // Compute simulated "current" progress based on real wallet data
        const goalsWithProgress = (data.goals || []).map((g, idx) => ({
          ...g,
          id: idx + 1,
          current: computeProgress(g, balance, totalIn, totalOut, currencies.length),
          status: "active",
        }))

        setGoals(goalsWithProgress)
        setSuggestions(data.suggestions || [])
      }
    } catch (err) {
      console.error("Goals fetch failed:", err)
    }
  }

  /* ── Compute rough current progress from real data ────────────────── */
  const computeProgress = (goal, balance, totalIn, totalOut, currCount) => {
    switch (goal.type) {
      case "savings":
        return Math.min(balance, goal.target)
      case "income":
        return Math.min(totalIn, goal.target)
      case "spending":
        return Math.min(totalOut, goal.target)
      case "milestone":
        return Math.min(currCount, goal.target)
      default:
        return 0
    }
  }

  /* ── Initial load ─────────────────────────────────────────────────── */
  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const { wallet, txns } = await fetchData()
      if (wallet) await fetchGoals(wallet, txns)
      setLoading(false)
    }
    init()
  }, [])

  /* ── Refresh handler ──────────────────────────────────────────────── */
  const handleRefresh = async () => {
    setRefreshing(true)
    const { wallet, txns } = await fetchData()
    if (wallet) await fetchGoals(wallet, txns)
    setRefreshing(false)
  }

  const activeGoals = goals.filter((g) => g.status === "active")
  const onTrack = goals.filter((g) => (g.current / g.target) >= 0.5)
  const needsAttention = goals.filter((g) => (g.current / g.target) < 0.3)

  return (
    <DashboardShell
      title="Goals"
      subtitle="Set personal finance goals and track your progress."
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 h-10 text-[13px] font-medium text-zinc-700 bg-white border border-zinc-200 rounded-full px-4 hover:bg-zinc-50 transition-colors disabled:opacity-60"
          >
            {refreshing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
            {refreshing ? "Refreshing..." : "Refresh Goals"}
          </button>
          <button className="inline-flex items-center gap-2 h-10 text-[13px] font-semibold text-white bg-black hover:bg-zinc-900 rounded-full px-5 transition-colors">
            <Plus size={14} />
            New Goal
          </button>
        </div>
      }
    >
      {/* ── Loading state ───────────────────────────────────────────── */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-28 gap-3">
          <Loader2 size={24} className="text-violet-400 animate-spin" />
          <p className="text-[13px] text-zinc-400">Generating your personalised goals...</p>
        </div>
      )}

      {!loading && (
        <>
          {/* ── Summary strip ─────────────────────────────────────────── */}
          <RevealSection show={!loading} delay={0}>
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <SummaryCard
              label="Active Goals"
              value={String(activeGoals.length)}
              sub="In progress"
              icon={Target}
              iconBg="bg-violet-50"
              iconColor="text-violet-600"
            />
            <SummaryCard
              label="On Track"
              value={String(onTrack.length)}
              sub="50%+ complete"
              icon={TrendingUp}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <SummaryCard
              label="Needs Attention"
              value={String(needsAttention.length)}
              sub="Below 30%"
              icon={Clock}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
            />
            <SummaryCard
              label="Completed"
              value={String(goals.filter((g) => (g.current / g.target) >= 1).length)}
              sub="All time"
              icon={CheckCircle2}
              iconBg="bg-sky-50"
              iconColor="text-sky-600"
            />
          </section>
          </RevealSection>

          {/* ── Main grid ─────────────────────────────────────────────── */}
          <section className="grid grid-cols-12 gap-4">
            {/* LEFT — goal cards */}
            <div className="col-span-12 lg:col-span-8 space-y-4">
              {goals.length === 0 ? (
                <div className="bg-white border border-zinc-200 rounded-[20px] p-10 flex flex-col items-center text-center">
                  <Target size={28} className="text-zinc-300 mb-3" />
                  <p className="text-[14px] text-zinc-500">No goals yet. Click refresh to generate AI-powered goals.</p>
                </div>
              ) : (
                goals.map((goal, i) => (
                  <RevealSection key={goal.id} show={!loading} delay={200 + i * 150}>
                    <GoalCard goal={goal} />
                  </RevealSection>
                ))
              )}
            </div>

            {/* RIGHT — AI suggestions */}
            <RevealSection show={!loading} delay={200 + Math.max(goals.length, 1) * 150} className="col-span-12 lg:col-span-4 space-y-4">
            <aside className="space-y-4">
              {/* Suggested goals */}
              <div className="bg-white border border-zinc-200 rounded-[20px] p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="flex items-center gap-1.5 text-[14px] font-semibold text-zinc-900">
                    <Sparkles size={14} className="text-violet-600" />
                    Suggested Goals
                  </h3>
                  <span className="text-[10px] font-semibold text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-2 py-0.5">
                    AI
                  </span>
                </div>
                <p className="text-[12px] text-zinc-500 mb-4">
                  Based on your wallet activity, Gemini suggests these goals.
                </p>

                {suggestions.length === 0 ? (
                  <div className="flex flex-col items-center py-6 gap-1">
                    <Sparkles size={16} className="text-zinc-300" />
                    <p className="text-[12px] text-zinc-400">No suggestions yet.</p>
                  </div>
                ) : (
                  <ul className="space-y-3 m-0 p-0 list-none">
                    {suggestions.map((sg, i) => {
                      const { icon: Icon, iconBg, iconColor } = getSuggestionIcon(sg.category)
                      return (
                        <li
                          key={i}
                          className="group flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3 hover:border-zinc-200 hover:bg-zinc-50 transition-colors cursor-pointer"
                        >
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}>
                            <Icon size={16} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-semibold text-zinc-900 m-0 leading-snug">
                              {sg.title}
                            </p>
                            <p className="text-[11.5px] text-zinc-500 m-0 mt-0.5 leading-snug">
                              {sg.reason}
                            </p>
                          </div>
                          <ArrowUpRight
                            size={14}
                            className="text-zinc-300 group-hover:text-zinc-600 transition-colors shrink-0 mt-0.5"
                          />
                        </li>
                      )
                    })}
                  </ul>
                )}

                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 h-10 text-[12.5px] font-semibold text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-full hover:bg-zinc-100 transition-colors disabled:opacity-60"
                >
                  {refreshing ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
                  {refreshing ? "Refreshing..." : "Get more suggestions"}
                </button>
              </div>

              {/* Tips */}
              <div className="bg-white border border-zinc-200 rounded-[20px] p-5">
                <h3 className="text-[14px] font-semibold text-zinc-900 mb-3">
                  Tips for reaching goals
                </h3>
                <ul className="space-y-2.5 m-0 p-0 list-none">
                  {[
                    "Set realistic deadlines based on your average inflow.",
                    "Break large goals into smaller monthly milestones.",
                    "Review goals weekly — Gemini will remind you.",
                    "Automate transfers to a savings wallet.",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500 shrink-0 mt-0.5"
                      />
                      <span className="text-[12.5px] text-zinc-600 leading-snug">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-zinc-100 mt-4 pt-3">
                  <p className="flex items-start gap-1.5 text-[11px] text-zinc-500 m-0">
                    <ShieldCheck
                      size={12}
                      className="text-zinc-400 shrink-0 mt-0.5"
                    />
                    Goal data is private and never shared.
                  </p>
                </div>
              </div>
            </aside>
            </RevealSection>
          </section>
        </>
      )}
    </DashboardShell>
  )
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                             */
/* -------------------------------------------------------------------------- */

const SummaryCard = ({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white border border-zinc-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
    <div className="min-w-0 flex-1">
      <p className="text-[13px] text-zinc-500 leading-none mb-2">{label}</p>
      <p className="text-[22px] font-semibold text-zinc-900 tracking-tight leading-none mb-2">
        {value}
      </p>
      <p className="text-[12px] text-zinc-400">{sub}</p>
    </div>
    <span
      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
    >
      <Icon size={18} className={iconColor} />
    </span>
  </div>
)

const GoalCard = ({ goal }) => {
  const progress = Math.min((goal.current / goal.target) * 100, 100)
  const { icon: TypeIcon, bg, color } = getTypeIcon(goal.type)

  const progressColor =
    progress >= 70
      ? "bg-emerald-500"
      : progress >= 40
      ? "bg-amber-500"
      : "bg-rose-500"

  return (
    <div className="bg-white border border-zinc-200 rounded-[20px] p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}
          >
            <TypeIcon size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="text-[14px] font-semibold text-zinc-900 m-0 leading-snug">
              {goal.title}
            </h3>
            <p className="text-[12px] text-zinc-500 m-0 mt-1">
              Deadline: {goal.deadline}
            </p>
          </div>
        </div>

        <button className="h-8 w-8 flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition-colors shrink-0">
          <MoreHorizontal size={14} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[12px] font-medium text-zinc-700">
            {formatValue(goal.current, goal.currency)} of{" "}
            {formatValue(goal.target, goal.currency)}
          </span>
          <span className="text-[12px] font-semibold text-zinc-900">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-zinc-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* AI note */}
      {goal.aiNote && (
        <div className="rounded-[12px] border border-violet-100 bg-violet-50/50 px-4 py-3 flex items-start gap-2.5">
          <Sparkles
            size={13}
            className="text-violet-600 shrink-0 mt-0.5"
          />
          <p className="text-[12px] text-violet-700 leading-snug m-0">
            {goal.aiNote}
          </p>
        </div>
      )}
    </div>
  )
}

export default Goals
