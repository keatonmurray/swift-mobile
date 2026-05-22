import React, { useEffect, useState } from "react"
import {
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiArrowUpRight,
  FiClock,
  FiDollarSign,
  FiLock,
} from "react-icons/fi"

import DashboardShell from "@/pages/Desktop/components/DashboardShell"

import { Link } from "react-router-dom"

import axios from "axios"

const statusStyles = {
  Received:
    "bg-emerald-50 text-emerald-700 border border-emerald-100",

  Sent:
    "bg-indigo-50 text-indigo-700 border border-indigo-100",

  Pending:
    "bg-amber-50 text-amber-700 border border-amber-100",

  Failed:
    "bg-red-50 text-red-700 border border-red-100",
}

const PersonalPay = () => {
  const [walletTransactions, setWalletTransactions] =
    useState([])

  const [walletData, setWalletData] = useState(null)

  const [loading, setLoading] = useState(true)

  const userId = localStorage.getItem("user_id")

  const token = localStorage.getItem("api_token")

  // FETCH WALLET
  const fetchWallet = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      console.log(
        "FULL WALLET RESPONSE:",
        response.data
      )

      // HANDLE MULTIPLE RESPONSE SHAPES
      const wallet =
        response.data?.data?.wallet_rapyd ||
        response.data?.wallet_rapyd ||
        response.data?.data ||
        response.data ||
        null

      console.log("PARSED WALLET:", wallet)

      setWalletData(wallet)
    } catch (err) {
      console.error(
        "FETCH WALLET ERROR:",
        err?.response?.data || err
      )
    }
  }

  // FETCH TRANSACTIONS
  const fetchWalletTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      console.log(
        "TRANSACTIONS RESPONSE:",
        response.data
      )

      setWalletTransactions(
        response.data?.transactions || []
      )
    } catch (err) {
      console.error(
        "TRANSACTIONS ERROR:",
        err?.response?.data || err
      )
    } finally {
      setLoading(false)
    }
  }

  // INITIAL LOAD
  useEffect(() => {
    if (userId && token) {
      fetchWallet()

      fetchWalletTransactions()
    } else {
      setLoading(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, token])

  // FORMAT TRANSACTIONS
  const transactions =
    walletTransactions.length > 0
      ? walletTransactions.map((t) => {
          const numericAmount = Number(
            t.amount || 0
          )

          const isReceived = numericAmount > 0

          return {
            id:
              t.id ||
              Math.random().toString(36),

            date: t.created_at
              ? new Date(
                  Number(t.created_at) * 1000
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A",

            time: t.created_at
              ? new Date(
                  Number(t.created_at) * 1000
                ).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",

            description:
              t.type
                ?.replaceAll("_", " ")
                ?.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                ) || "Transaction",

            sub:
              t.reason ||
              t.status ||
              "Wallet transaction",

            currency:
              t.currency?.toUpperCase() ||
              "USD",

            amount: `${isReceived ? "+" : "-"}${Math.abs(
              numericAmount
            ).toLocaleString(undefined, {
              style: "currency",
              currency:
                t.currency?.toUpperCase() ||
                "USD",
            })}`,

            rawAmount: numericAmount,

            status: isReceived
              ? "Received"
              : "Sent",

            color: isReceived
              ? "bg-emerald-500"
              : "bg-indigo-500",
          }
        })
      : []

  // RECENT PAYMENTS
  const recentPayments = transactions
    .slice(0, 5)
    .map((t) => ({
      id: t.id,

      name: t.description || "Transaction",

      email:
        t.sub ||
        t.currency ||
        "Wallet transaction",

      amount: t.amount,

      status: t.status,

      color: t.color,

      initials:
        t.description
          ?.split(" ")
          ?.map((n) => n[0])
          ?.join("")
          ?.slice(0, 2)
          ?.toUpperCase() || "TX",
    }))

  // WALLET VALUES
  const walletCurrency =
    walletData?.accounts?.[0]?.currency ||
    walletData?.currency ||
    "USD"

  const totalBalance = Number(
    walletData?.balances?.[0]?.balance ||
      walletData?.balance ||
      0
  )

  const availableBalance = Number(
    walletData?.balances?.[0]
      ?.available_balance ||
      walletData?.available_balance ||
      totalBalance
  )

  const pendingTransactions =
    walletTransactions.filter(
      (t) =>
        t.status?.toLowerCase() ===
          "pending" ||
        t.status?.toLowerCase() === "hold" ||
        t.status?.toLowerCase() ===
          "in_progress"
    )

  const pendingAmount =
    pendingTransactions.reduce(
      (sum, t) =>
        sum +
        Math.abs(Number(t.amount || 0)),
      0
    )

  const walletId =
    walletData?.id ||
    walletData?.ewallet ||
    walletData?.ewallet_id ||
    "N/A"

  const walletStatus =
    walletData?.status || "Active"

  const walletCreated =
    walletData?.created_at
      ? new Date(
          Number(walletData.created_at) *
            1000
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A"

  const cardLast4 = "4821"

  const walletGrowth = "+12.4%"

  return (
    <DashboardShell
      title="Transfer money"
      subtitle="Send money to other wallets, manage balances, and track outgoing payments"
      actions={
        <Link
          to="/personal/transfer"
          className="inline-flex items-center gap-1.5 h-10 text-[13px] font-semibold text-white bg-black rounded-full px-5 hover:opacity-90 transition-colors"
        >
          <FiPlus size={14} />
          Send to another wallet
        </Link>
      }
    >
      <section className="grid grid-cols-12 gap-4 mb-5">
        <div className="col-span-12 xl:col-span-4 overflow-hidden rounded-[20px] bg-main-pallette p-5 text-white relative">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-black/10 blur-2xl" />

          <div className="relative flex items-start justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Primary Wallet Balance
              </p>

              <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.03em] leading-none">
                {totalBalance.toLocaleString(
                  undefined,
                  {
                    style: "currency",
                    currency: walletCurrency,
                  }
                )}
              </h2>

              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white border border-white/10 backdrop-blur-sm">
                  {walletCurrency} Wallet
                </span>

                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-400/20 backdrop-blur-sm">
                  {walletGrowth}
                </span>
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm shrink-0 shadow-lg">
              <FiDollarSign size={17} />
            </div>
          </div>

          <div className="relative mt-5 h-[175px] w-full max-w-[340px] overflow-hidden rounded-[22px] border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-2xl">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/5 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-black/10 blur-2xl" />

            <div className="absolute right-4 top-4 z-20">
              <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-sm">
                Sandbox Only
              </span>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between opacity-85">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider">
                    Personal Card
                  </p>

                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="relative h-5 w-7 overflow-hidden rounded bg-gradient-to-br from-zinc-100 to-zinc-300 opacity-80">
                      <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/10" />
                    </div>

                    <span className="text-[13px] font-medium tracking-[0.25em]">
                      •••• {cardLast4}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center text-center px-2">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                  <FiLock
                    size={17}
                    className="text-zinc-200"
                  />
                </div>

                <p className="text-[14px] font-semibold text-white tracking-tight">
                  Card Transactions Unavailable
                </p>

                <p className="mt-1.5 max-w-[240px] text-[11px] leading-relaxed text-zinc-400">
                  Card features are disabled on sandbox
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group bg-white border border-gray-200 rounded-[22px] px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-gray-500 leading-none mb-2">
                  Available Balance
                </p>

                <p className="text-[24px] font-semibold text-gray-900 tracking-tight leading-none mb-2">
                  {availableBalance.toLocaleString(
                    undefined,
                    {
                      style: "currency",
                      currency: walletCurrency,
                    }
                  )}
                </p>

                <p className="text-[12px] text-emerald-600 font-medium">
                  Ready to send
                </p>
              </div>

              <span className="h-11 w-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-emerald-50">
                <FiArrowUpRight
                  size={18}
                  className="text-emerald-500"
                />
              </span>
            </div>

            <div className="group bg-white border border-gray-200 rounded-[22px] px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[13px] text-gray-500 leading-none mb-2">
                  Pending Payments
                </p>

                <p className="text-[24px] font-semibold text-gray-900 tracking-tight leading-none mb-2">
                  {pendingAmount.toLocaleString(
                    undefined,
                    {
                      style: "currency",
                      currency: walletCurrency,
                    }
                  )}
                </p>

                <p className="text-[12px] text-amber-600 font-medium">
                  {
                    pendingTransactions.length
                  }{" "}
                  in progress
                </p>
              </div>

              <span className="h-11 w-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-amber-50">
                <FiClock
                  size={18}
                  className="text-amber-500"
                />
              </span>
            </div>
          </div>

          <button className="mt-4 h-13 w-full rounded-[22px] border border-gray-200 bg-white px-5 flex items-center justify-between text-[13px] font-medium text-gray-900">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {walletCurrency} Wallet
            </span>

            <FiChevronDown
              size={14}
              className="text-gray-400"
            />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8 bg-white border border-gray-200 rounded-[20px] overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-semibold text-gray-900">
                Recent Transactions
              </h3>

              <p className="text-[12px] text-gray-400 mt-0.5">
                Latest outgoing transfers and payouts
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-5 py-10 text-center text-[13px] text-gray-400">
                      Loading transactions...
                    </td>
                  </tr>
                ) : recentPayments.length ===
                  0 ? (
                  <tr>
                    <td className="px-5 py-10 text-center text-[13px] text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  recentPayments.map(
                    (payment, i) => (
                      <tr key={i}>
                        <td className="px-5 py-4">
                          {payment.name}
                        </td>

                        <td className="px-5 py-4">
                          {payment.amount}
                        </td>

                        <td className="px-5 py-4">
                          {payment.status}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5">
            <h3 className="text-[14px] font-semibold text-gray-900 mb-4">
              Wallet Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">
                  Wallet ID
                </span>

                <span className="text-[13px] font-medium text-gray-900 break-all text-right">
                  {walletId}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">
                  Currency
                </span>

                <span className="text-[13px] font-medium text-gray-900">
                  {walletCurrency}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] text-gray-400">
                  Status
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  {walletStatus}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-[13px] text-gray-400">
                  Created
                </span>

                <span className="text-[13px] font-medium text-gray-900">
                  {walletCreated}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </DashboardShell>
  )
}

export default PersonalPay