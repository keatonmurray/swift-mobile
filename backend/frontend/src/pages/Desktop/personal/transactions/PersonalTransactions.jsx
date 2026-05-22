import React, { useEffect, useState } from "react"
import { FiSearch, FiDownload, FiChevronDown, FiChevronRight } from "react-icons/fi"
import DashboardShell from "@/pages/Desktop/components/DashboardShell"
import axios from "axios"

/* -------------------------------------------------------------------------- */
/*  Status styles                                                              */
/* -------------------------------------------------------------------------- */

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Pending: "bg-amber-50 text-amber-700 border border-amber-100",
  Failed: "bg-red-50 text-red-700 border border-red-100",
  Received: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Sent: "bg-indigo-50 text-indigo-700 border border-indigo-100",
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

const PersonalTransactions = () => {
  const [walletTransactions, setWalletTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const userId = localStorage.getItem("user_id")
  const token = localStorage.getItem("api_token")

  // Fetch wallet transactions
  const fetchWalletTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setWalletTransactions(response.data.transactions || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchWalletTransactions()
    } else {
      setLoading(false)
    }
  }, [userId])

  // Format transactions for display
  const transactions =
    walletTransactions.length > 0
      ? walletTransactions.map((t) => {
          const numericAmount = Number(t.amount || 0)

          // Positive = received
          // Negative = sent
          const isReceived = numericAmount > 0

          return {
            id: t.id,

            date: new Date(t.created_at * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),

            time: new Date(t.created_at * 1000).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),

            description:
              t.type
                ?.replaceAll("_", " ")
                ?.replace(/\b\w/g, (char) => char.toUpperCase()) || "Transaction",

            sub: t.reason || t.status || "",

            currency: t.currency?.toUpperCase() || "USD",

            // Properly format +/- based on actual amount
            amount: `${isReceived ? "+" : "-"}$${Math.abs(
              numericAmount
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,

            rawAmount: numericAmount,

            status: isReceived ? "Received" : "Sent",

            color: isReceived ? "bg-emerald-500" : "bg-indigo-500",
          }
        })
      : []

  // Summary stats
  const totalVolume = walletTransactions.reduce(
    (sum, t) => sum + Math.abs(Number(t.amount || 0)),
    0
  )

  const received = transactions.filter(
    (t) => t.rawAmount > 0
  ).length

  const sent = transactions.filter(
    (t) => t.rawAmount < 0
  ).length

  const summaryStatuses = [
    {
      label: "Received",
      count: received,
      color: "bg-emerald-500",
    },
    {
      label: "Sent",
      count: sent,
      color: "bg-indigo-500",
    },
  ]

  const recentActivity = transactions.slice(0, 3).map((t) => ({
    title: t.description,
    amount: t.amount,
    time: t.time,
    color: t.color,
  }))

  return (
    <DashboardShell
      title="Transactions"
      subtitle="Track and manage all your personal transactions"
    >
      {/* ── Toolbar: search + filters + export ─────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {/* Search */}
        <div className="flex items-center gap-2 h-9 bg-white border border-gray-200 rounded-full px-3 w-[220px]">
          <FiSearch size={13} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400 min-w-0"
          />
        </div>

        {/* Filter pills */}
        {["All Transactions", "All Currencies", "All Statuses"].map((item) => (
          <button
            key={item}
            className="inline-flex items-center gap-1.5 h-9 text-[12px] text-gray-600 bg-white border border-gray-200 rounded-full px-3 hover:bg-gray-50 transition-colors"
          >
            {item}
            <FiChevronDown size={11} className="text-gray-400" />
          </button>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Export */}
        <button className="inline-flex items-center gap-1.5 h-9 text-[12px] font-medium text-gray-700 bg-white border border-gray-200 rounded-full px-4 hover:bg-gray-50 transition-colors">
          <FiDownload size={12} />
          Export
        </button>
      </div>

      {/* ── Main grid: lg:8/4 ───────────────────────────────────────────── */}
      <section className="grid grid-cols-12 gap-4">
        {/* LEFT — table */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-[20px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left border-b border-gray-50">
                  {["Date", "Description", "Currency", "Amount", "Status", ""].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-[13px] text-gray-400"
                    >
                      Loading transactions...
                    </td>
                  </tr>
                ) : transactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-[13px] text-gray-400"
                    >
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  transactions.map((t, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Date */}
                      <td className="px-5 py-4">
                        <p className="text-[13px] font-medium text-gray-800 leading-tight">
                          {t.date}
                        </p>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                          {t.time}
                        </p>
                      </td>
                      {/* Description */}
                      <td className="px-5 py-4">
                        <p className="text-[13px] font-medium text-gray-800 leading-tight">
                          {t.description}
                        </p>
                        <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                          {t.sub}
                        </p>
                      </td>
                      {/* Currency */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1.5 text-[13px] text-gray-500">
                          {t.currency}
                        </span>
                      </td>
                      {/* Amount */}
                      <td className="px-5 py-4 text-[13px] font-semibold text-gray-900 tabular-nums">
                        {t.amount}
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                            statusStyles[t.status] || ""
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      {/* Arrow */}
                      <td className="px-5 py-4">
                        <button className="h-8 w-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
                          <FiChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer — pagination */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
            <p className="text-[12px] text-gray-400">
              Showing {transactions.length} transaction
              {transactions.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-1.5">
              <button className="h-8 w-8 flex items-center justify-center rounded-xl text-[12px] font-medium bg-black text-white">
                1
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          {/* Transaction Summary */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-0.5">
              Transaction Summary
            </h3>
            <p className="text-[12px] text-gray-400 mb-4">All time</p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">Total Volume</span>
                <span className="text-[14px] font-semibold text-gray-900 tabular-nums">
                  ${totalVolume.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">
                  Total Transactions
                </span>
                <span className="text-[14px] font-semibold text-gray-900 tabular-nums">
                  {transactions.length}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              {summaryStatuses.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full flex-shrink-0 ${item.color}`}
                    />
                    <span className="text-[13px] text-gray-600">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[13px] font-medium text-gray-900 tabular-nums">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold text-gray-900">
                Recent Activity
              </h3>
              <button className="text-[12px] font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <p className="text-[12px] text-gray-400">No recent activity</p>
              ) : (
                recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${item.color}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-gray-800 leading-snug">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5 tabular-nums">
                            {item.amount}
                          </p>
                        </div>
                        <span className="text-[11px] text-gray-400 flex-shrink-0">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </section>
    </DashboardShell>
  )
}

export default PersonalTransactions
