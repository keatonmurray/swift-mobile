import { useEffect, useState } from "react"
import axios from "axios"

import DashboardShell from "../../components/DashboardShell"

import {
  RefreshCcw,
  Wallet,
  Clock3,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Lock,
  Building2,
} from "lucide-react"

const features = [
  {
    icon: <RefreshCcw size={20} className="text-green-600" />,
    title: "Automatically sync transactions",
    description: "Keep your books up to date in real time.",
    bg: "bg-green-50",
  },
  {
    icon: <Wallet size={20} className="text-violet-600" />,
    title: "Categorize with confidence",
    description: "Match payments and payouts to the right accounts.",
    bg: "bg-violet-50",
  },
  {
    icon: <Clock3 size={20} className="text-amber-600" />,
    title: "Save time, reduce errors",
    description: "Automate repetitive tasks and focus on growth.",
    bg: "bg-amber-50",
  },
]

const steps = [
  {
    icon: "qb",
    title: "Connect QuickBooks",
    description:
      "Securely connect your QuickBooks account using OAuth.",
    bg: "bg-green-50",
  },
  {
    icon: <SlidersHorizontal size={22} className="text-violet-600" />,
    title: "Map accounts",
    description: "Choose how your accounts and data sync.",
    bg: "bg-violet-50",
  },
  {
    icon: <RefreshCcw size={22} className="text-amber-600" />,
    title: "Sync data",
    description:
      "We'll securely sync your transactions and contacts.",
    bg: "bg-amber-50",
  },
  {
    icon: <CheckCircle2 size={22} className="text-green-600" />,
    title: "You're all set",
    description:
      "Automation is active and your books stay updated.",
    bg: "bg-green-50",
  },
]

const BusinessIntegrations = () => {
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  const [integration, setIntegration] = useState(null)

  // =========================================
  // FETCH INTEGRATION
  // =========================================

  const fetchIntegration = async () => {
    try {
      const token = localStorage.getItem("api_token")

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/status`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.connected) {
        setConnected(true)

        setIntegration(
          response.data.integration
        )
      } else {
        setConnected(false)

        setIntegration(null)
      }
    } catch (error) {
      console.log(error)

      setConnected(false)

      setIntegration(null)
    }
  }

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {
    fetchIntegration()
  }, [])

  // =========================================
  // HANDLE QUICKBOOKS POPUP MESSAGE
  // =========================================

  useEffect(() => {
    const handleMessage = async (event) => {
      // SECURITY CHECK
      if (
        event.origin !==
        import.meta.env.VITE_API_BASE_URL
      ) {
        return
      }

      // QUICKBOOKS CONNECTED
      if (
        event.data?.type ===
        "QUICKBOOKS_CONNECTED"
      ) {
        try {
          setLoading(true)

          // Re-fetch latest integration
          await fetchIntegration()
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    }

    window.addEventListener(
      "message",
      handleMessage
    )

    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      )
    }
  }, [])

  // =========================================
  // CONNECT QUICKBOOKS
  // =========================================

  const handleConnect = () => {
    if (connected || loading) return

    setLoading(true)

    const token = localStorage.getItem("api_token")

    const popup = window.open(
      `${import.meta.env.VITE_API_BASE_URL}/api/integrations/quickbooks/connect?token=${token}`,
      "quickbooks-oauth",
      "width=600,height=750"
    )

    // Detect popup close
    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer)

        setLoading(false)
      }
    }, 500)
  }

  return (
    <DashboardShell
      title="Integrations"
      subtitle="Securely connect your quickbooks to automate transactions, sync data and save time"
    >
      <div className="w-full bg-[#fafafa] p-4 md:p-6">
        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-5 md:p-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="flex items-start gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-100 bg-green-50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2CA01C] text-3xl font-bold text-white">
                    qb
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-semibold text-black">
                      Connect QuickBooks
                    </h2>

                    {connected && (
                      <div className="rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                        Connected
                      </div>
                    )}
                  </div>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Securely connect your QuickBooks account to automate
                    transactions, sync data, and save time.
                  </p>
                </div>
              </div>

              <div className="mt-10 space-y-7">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${feature.bg}`}
                    >
                      {feature.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-black">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div>
              <h2 className="text-2xl font-semibold text-black">
                QuickBooks Connection
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Securely connect your QuickBooks account using OAuth.
              </p>

              <div className="mt-8">
                {!connected ? (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Lock
                            size={18}
                            className="text-green-600"
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-black">
                            Secure OAuth Connection
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-gray-500">
                            You'll be redirected to QuickBooks to
                            securely authorize access to your
                            accounting data. We never store your
                            QuickBooks password.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SANDBOX MESSAGE */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
                          <span className="text-sm font-bold text-amber-700">
                            !
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-amber-900">
                              Sandbox Mode Enabled
                            </h3>

                            <div className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                              Test Mode
                            </div>
                          </div>

                          <p className="mt-1 text-sm leading-6 text-amber-800">
                            Since you're currently in test mode,
                            your Swift account will automatically
                            connect to our QuickBooks sandbox
                            environment for testing and development
                            purposes.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleConnect}
                      disabled={loading || connected}
                      className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium text-white transition
                        ${
                          connected
                            ? "cursor-not-allowed bg-green-600"
                            : "bg-black hover:opacity-90"
                        }
                        disabled:opacity-60
                      `}
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2CA01C] text-[10px] font-bold text-white">
                        qb
                      </div>

                      {connected
                        ? "Connected"
                        : loading
                          ? "Redirecting..."
                          : "Connect QuickBooks"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                          <CheckCircle2
                            size={22}
                            className="text-green-600"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-black">
                              QuickBooks Connected
                            </h3>

                            <div className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700">
                              Active
                            </div>
                          </div>

                          <p className="mt-1 text-sm text-gray-600">
                            Your QuickBooks account is securely
                            connected and syncing data.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-white bg-white p-4">
                          <div className="flex items-center gap-2">
                            <Building2
                              size={16}
                              className="text-gray-500"
                            />

                            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                              Company ID
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-semibold text-black break-all">
                            {integration?.realm_id ||
                              "Not available"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white bg-white p-4">
                          <div className="flex items-center gap-2">
                            <RefreshCcw
                              size={16}
                              className="text-gray-500"
                            />

                            <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                              Sync Status
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-semibold text-green-600">
                            Connected
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      disabled
                      className="flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-100 text-sm font-medium text-gray-500"
                    >
                      Connected Successfully
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default BusinessIntegrations