import React, { useEffect, useState } from "react"
import {
  FiSearch,
  FiPlus,
  FiChevronDown,
  FiChevronRight,
  FiArrowUpRight,
  FiDollarSign,
  FiClock,
  FiLock,
} from "react-icons/fi"

import {
  TransferMoneySkeleton,
  TransferStatsSkeleton,
} from "@/pages/Desktop/components/Skeleton"

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

const BusinessPay = () => {
  const [walletTransactions, setWalletTransactions] =
    useState([])

  const [walletData, setWalletData] = useState(null)

  const [loading, setLoading] = useState(true)

  const userId = localStorage.getItem("user_id")

  const token = localStorage.getItem("api_token")

  // FETCH BUSINESS WALLET
  const fetchWallet = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-business-wallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      console.log(
        "BUSINESS WALLET RESPONSE:",
        response.data
      )

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
        "FETCH BUSINESS WALLET ERROR:",
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
        "BUSINESS TRANSACTIONS:",
        response.data
      )

      setWalletTransactions(
        response.data?.transactions || []
      )
    } catch (err) {
      console.error(
        "TRANSACTION ERROR:",
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

  return (
    <div className="min-h-screen bg-[#f7f7f8] p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
              Pay
            </h1>

            <p className="mt-2 text-lg text-[#6b7280]">
              Send payouts, manage balances,
              and track outgoing payments
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            {/* <button className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#e5e7eb] bg-white px-5 text-base font-medium text-[#111111] shadow-sm transition hover:bg-[#fafafa]">
              <FiSearch className="text-[18px]" />
              Search Payments
            </button>

            <button className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black px-6 text-base font-medium text-white shadow-sm transition hover:opacity-90">
              <FiPlus className="text-[18px]" />
              New Payment
            </button> */}
          </div>
        </div>

        {/* TOP */}
        <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          {/* WALLET CARD */}
          {loading ? (
            <TransferMoneySkeleton />
          ) : (
            <div className="overflow-hidden rounded-[28px] bg-main-pallette p-8 text-white shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base text-zinc-400">
                    Primary Wallet Balance
                  </p>

                  <h2 className="mt-4 text-5xl font-semibold tracking-[-0.04em]">
                    {totalBalance.toLocaleString(
                      undefined,
                      {
                        style: "currency",
                        currency:
                          walletCurrency,
                      }
                    )}
                  </h2>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white">
                      {walletCurrency} Wallet
                    </div>

                    <div className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-300">
                      +12.4% this month
                    </div>
                  </div>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
                  <FiDollarSign className="text-[28px]" />
                </div>
              </div>

              {/* CARD */}
              <div className="relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-7 backdrop-blur">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

                <div className="absolute right-4 top-4 z-20">
                  <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-sm">
                    Sandbox Only
                  </span>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">
                        Corporate Card
                      </p>

                      <div className="mt-6 flex items-center gap-3">
                        <div className="h-10 w-14 rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-300" />

                        <span className="text-xl tracking-[0.25em]">
                          •••• 4821
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                      <FiLock
                        size={17}
                        className="text-zinc-200"
                      />
                    </div>

                    <p className="text-[14px] font-semibold text-white tracking-tight">
                      Card Transactions
                      Unavailable
                    </p>

                    <p className="mt-1.5 max-w-[240px] text-[11px] leading-relaxed text-zinc-400">
                      Card features are
                      disabled on sandbox
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATS */}
          {loading ? (
            <TransferStatsSkeleton />
          ) : (
            <div className="space-y-6">
              <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base text-[#6b7280]">
                      Available Balance
                    </p>

                    <h3 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
                      {availableBalance.toLocaleString(
                        undefined,
                        {
                          style:
                            "currency",
                          currency:
                            walletCurrency,
                        }
                      )}
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                    <FiArrowUpRight className="text-[24px] text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-base text-[#6b7280]">
                      Pending Payments
                    </p>

                    <h3 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
                      {pendingAmount.toLocaleString(
                        undefined,
                        {
                          style:
                            "currency",
                          currency:
                            walletCurrency,
                        }
                      )}
                    </h3>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                    <FiClock className="text-[24px] text-amber-600" />
                  </div>
                </div>
              </div>

              {/* <button className="flex h-16 w-full items-center justify-between rounded-[28px] border border-[#ececec] bg-white px-6 text-base font-medium text-[#111111] shadow-sm">
                {walletCurrency} Wallet

                <FiChevronDown className="text-[20px]" />
              </button> */}
            </div>
          )}
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-[28px] border border-[#ececec] bg-white shadow-sm">
            <div className="border-b border-[#f1f1f1] px-8 py-6">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                Recent Payments
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="px-8 py-10 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : recentPayments.length ===
                    0 ? (
                    <tr>
                      <td className="px-8 py-10 text-center">
                        No payments found
                      </td>
                    </tr>
                  ) : (
                    recentPayments.map(
                      (payment, index) => (
                        <tr
                          key={index}
                          className="border-b border-[#f5f5f5]"
                        >
                          <td className="px-8 py-6">
                            {
                              payment.name
                            }
                          </td>

                          <td className="px-8 py-6">
                            {
                              payment.amount
                            }
                          </td>

                          <td className="px-8 py-6">
                            {
                              payment.status
                            }
                          </td>

                          <td className="px-8 py-6">
                            <FiChevronRight />
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <div className="rounded-[28px] border border-[#ececec] bg-white p-8 shadow-sm">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
                Wallet Details
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Wallet ID
                  </span>

                  <span className="max-w-[180px] break-all text-right text-base font-medium text-[#111111]">
                    {walletId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Currency
                  </span>

                  <span className="text-base font-medium text-[#111111]">
                    {walletCurrency}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-base text-[#6b7280]">
                    Status
                  </span>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                    {walletStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessPay