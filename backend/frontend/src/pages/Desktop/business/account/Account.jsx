import DashboardShell from "../../components/DashboardShell"

import {
  Search,
  Globe,
  Building2,
  Clock3,
  ShieldCheck,
  Headphones,
  ExternalLink,
  ArrowRight,
  Check,
  BadgeCheck,
} from "lucide-react"

import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const popularCurrencies = [
  {
    code: "USD",
    name: "US Dollar",
    flag: "🇺🇸",
    recommended: true,
    disabled: false,
  },
  {
    code: "EUR",
    name: "Euro",
    flag: "🇪🇺",
    disabled: true,
  },
  {
    code: "GBP",
    name: "British Pound",
    flag: "🇬🇧",
    disabled: true,
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    flag: "🇸🇬",
    disabled: true,
  },
  {
    code: "PHP",
    name: "Philippine Peso",
    flag: "🇵🇭",
    disabled: true,
  },
]

const allCurrencies = [
  {
    code: "AED",
    name: "UAE Dirham",
    flag: "🇦🇪",
    disabled: true,
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    flag: "🇦🇺",
    disabled: true,
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    disabled: true,
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    flag: "🇨🇭",
    disabled: true,
  },
]

const features = [
  {
    title: "Multi-currency support",
    description:
      "Hold and manage funds in multiple currencies all in one place.",
    icon: Globe,
    bg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Local payment rails",
    description:
      "Receive payments like a local in multiple countries and currencies.",
    icon: Building2,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Fast & easy setup",
    description:
      "Open a wallet in minutes and start receiving payments.",
    icon: Clock3,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Secure & compliant",
    description:
      "Bank-grade security with global compliance built in.",
    icon: ShieldCheck,
    bg: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
]

const currencyMeta = {
  USD: {
    flag: "🇺🇸",
    name: "US Dollar",
  },
  EUR: {
    flag: "🇪🇺",
    name: "Euro",
  },
  GBP: {
    flag: "🇬🇧",
    name: "British Pound",
  },
  SGD: {
    flag: "🇸🇬",
    name: "Singapore Dollar",
  },
  PHP: {
    flag: "🇵🇭",
    name: "Philippine Peso",
  },
}

const CurrencyRow = ({
  flag,
  code,
  name,
  recommended = false,
  disabled = false,
  selectedCurrencies,
  setSelectedCurrencies,
}) => {
  const isSelected = selectedCurrencies.includes(code)

  const handleChange = () => {
    if (disabled) return

    if (isSelected) {
      setSelectedCurrencies(
        selectedCurrencies.filter((currency) => currency !== code)
      )
    } else {
      setSelectedCurrencies([...selectedCurrencies, code])
    }
  }

  return (
    <div className="flex items-center justify-between border-b border-zinc-100 px-1 py-4 last:border-none">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleChange}
          disabled={disabled}
          className="h-5 w-5 rounded border-zinc-300 text-black focus:ring-black disabled:cursor-not-allowed disabled:opacity-40"
        />

        <div className="text-2xl">{flag}</div>

        <div className="flex items-center gap-4">
          <span className="w-12 font-semibold text-zinc-900">
            {code}
          </span>

          <span className="text-zinc-500">{name}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {disabled && (
          <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            Not yet available
          </div>
        )}

        {recommended && (
          <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Recommended
          </div>
        )}
      </div>
    </div>
  )
}

const Account = () => {
  const navigate = useNavigate()

  const token = localStorage.getItem("api_token")

  const [user, setUser] = useState(null)

  const [selectedCurrencies, setSelectedCurrencies] = useState(["USD"])
  const [step, setStep] = useState(1)
  const [accepted, setAccepted] = useState(false)
  const [walletCreated, setWalletCreated] = useState(false)
  const [enabledAccounts, setEnabledAccounts] = useState([])
  const [creatingWallet, setCreatingWallet] = useState(false)
  const [walletError, setWalletError] = useState("")
  const [openingCurrency, setOpeningCurrency] = useState("")
  const [ewalletId, setEwalletId] = useState(null)

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          )
  
          const fetchedUser =
            response.data.user ||
            response.data.data ||
            response.data
  
          setUser(fetchedUser)
        } catch (error) {
          console.error(error)
          toast.error("Failed to fetch user")
        }
      }
  
      if (token) {
        fetchUser()
      }
    }, [token])
  
    const handleCreateWallet = async () => {
    if (!user) {
      setWalletError("User not loaded yet.")
      return
    }

    try {
      setCreatingWallet(true)

      // CLEAR OLD ERRORS
      setWalletError("")

      // STEP 1 — CREATE WALLET
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/create-personal-wallet`,
        {
          user_id: user.id,

          first_name:
            user.first_name ||
            user.firstname ||
            user.name?.split(" ")[0] ||
            "John",

          last_name:
            user.last_name ||
            user.lastname ||
            user.name?.split(" ")[1] ||
            "Doe",

          email: user.email || "john@example.com",

          country: user.country || "US",

          nationality: user.country || "US",

          identification_number: `ID-${Date.now()}`,

          date_of_birth: "1999-01-01",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      // STEP 2 — RETRIEVE WALLET
      const walletResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      const walletData =
        walletResponse.data?.data?.wallet_rapyd

      const walletId = walletData?.id

      if (!walletId) {
        setWalletError(
          "We couldn't retrieve your wallet right now. Please try again."
        )

        return
      }

      setEwalletId(walletId)

      // STEP 3 — OPEN ENABLED CURRENCIES
      for (const currency of enabledAccounts) {
        try {
          const payload = {
            country: user.country || "US",

            currency: currency,

            ewallet: walletId,

            description: "Personal currency account",

            merchant_reference_id: `cur_${Date.now()}`,

            metadata: {
              source: "frontend",
              user_id: user.id,
            },

            requested_currency: currency,
          }

          await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/create-personal-currency-account`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          )
        } catch (currencyError) {
          console.error(currencyError)

          const currencyMessage =
            currencyError?.response?.data?.message ||
            `Failed to open ${currency} account`

          setWalletError(currencyMessage)
        }
      }

      setWalletCreated(true)

      toast.success("Wallet setup completed!")
    } catch (error) {
      console.error(error)

      const apiMessage =
        error?.response?.data?.message

      const validationErrors =
        error?.response?.data?.errors

      // VALIDATION ERRORS
      if (validationErrors) {
        const firstError =
          Object.values(validationErrors)[0]

        setWalletError(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError
        )

        return
      }

      // API MESSAGE
      if (apiMessage) {
        setWalletError(apiMessage)
        return
      }

      // FALLBACK
      setWalletError(
        "Something went wrong. Please try again."
      )
    } finally {
      setCreatingWallet(false)
    }
  }
  
    return (
    <DashboardShell
      title="Open Wallet"
      subtitle="Choose currencies and create a wallet to receive and hold funds."
    >
      <div className="space-y-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">
                1
              </div>

              <span className="font-medium text-zinc-900">
                Select currencies
              </span>
            </div>

            <div className="h-px flex-1 bg-zinc-200 mx-6" />

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-sm font-semibold text-zinc-600">
                2
              </div>

              <span className="font-medium text-zinc-500">
                Add virtual accounts
              </span>
            </div>

            <div className="h-px flex-1 bg-zinc-200 mx-6" />

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-sm font-semibold text-zinc-600">
                3
              </div>

              <span className="font-medium text-zinc-500">
                Review & confirm
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            {step === 1 && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-zinc-900">
                    Select currencies
                  </h2>

                  <p className="mt-2 text-zinc-500">
                    Choose the currencies you want to include in this wallet.
                  </p>
                </div>

                <div className="relative mb-8">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <input
                    type="text"
                    placeholder="Search currencies..."
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 text-sm outline-none"
                  />
                </div>

                <div className="mb-8">
                  {popularCurrencies.map((currency) => (
                    <CurrencyRow
                      key={currency.code}
                      {...currency}
                      selectedCurrencies={selectedCurrencies}
                      setSelectedCurrencies={setSelectedCurrencies}
                    />
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700">
                    Cancel
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black font-medium text-white"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-zinc-900">
                    Add virtual account numbers
                  </h2>
                </div>

                <div className="space-y-4">
                  {selectedCurrencies.map((currency) => (
                    <div
                      key={currency}
                      className="flex items-center justify-between rounded-2xl border border-zinc-200 p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">
                          {currencyMeta[currency]?.flag}
                        </div>

                        <div>
                          <h3 className="font-semibold text-zinc-900">
                            {currency} virtual account
                          </h3>

                          <p className="text-sm text-zinc-500">
                            Receive local transfers
                          </p>
                        </div>
                      </div>

                      <button
                        disabled={openingCurrency === currency}
                        onClick={() => {
                          if (
                            enabledAccounts.includes(currency)
                          ) {
                            return
                          }

                          setEnabledAccounts([
                            ...enabledAccounts,
                            currency,
                          ])

                          toast.success(
                            `${currency} enabled`
                          )
                        }}
                        className={`flex h-11 items-center justify-center rounded-xl px-5 text-sm font-medium ${
                          enabledAccounts.includes(currency)
                            ? "bg-green-100 text-green-700"
                            : "bg-black text-white"
                        }`}
                      >
                        {enabledAccounts.includes(currency)
                          ? "Enabled"
                          : "Enable"}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black font-medium text-white"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && !walletCreated && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-zinc-900">
                    Review & confirm
                  </h2>
                </div>

                <div className="divide-y divide-zinc-100 rounded-3xl border border-zinc-200">
                  {selectedCurrencies.map((currency) => (
                    <div
                      key={currency}
                      className="flex items-center justify-between p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">
                          {currencyMeta[currency]?.flag}
                        </div>

                        <div>
                          <h4 className="font-semibold text-zinc-900">
                            {currency}
                          </h4>

                          <p className="text-sm text-zinc-500">
                            {currencyMeta[currency]?.name}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                          enabledAccounts.includes(currency)
                            ? "bg-green-100 text-green-700"
                            : "bg-zinc-100 text-zinc-600"
                        }`}
                      >
                        <BadgeCheck size={16} />

                        {enabledAccounts.includes(currency)
                          ? "Enabled"
                          : "Not enabled"}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <label className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={() => setAccepted(!accepted)}
                      className="mt-1 h-5 w-5 rounded border-zinc-300"
                    />

                    <div>
                      <p className="font-medium text-zinc-900">
                        I confirm the information above is correct
                      </p>
                    </div>
                  </label>
                </div>

                {walletError && (
                  <div className="mt-6 mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
                          />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-500">
                          Wallet Error
                        </p>

                        <p className="mt-1 text-sm text-red-500">
                          {walletError}
                        </p>
                      </div>

                      <button
                        onClick={() => setWalletError("")}
                        className="text-red-300 transition hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700"
                  >
                    Back
                  </button>

                  <button
                    disabled={
                      !accepted ||
                      creatingWallet ||
                      enabledAccounts.length === 0
                    }
                    onClick={handleCreateWallet}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black font-medium text-white disabled:opacity-40"
                  >
                    {creatingWallet
                      ? "Creating wallet..."
                      : "Create wallet"}

                    {!creatingWallet && <Check size={18} />}
                  </button>
                </div>
              </div>
            )}

            {walletCreated && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-10">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                    <Check
                      size={42}
                      className="text-green-600"
                    />
                  </div>

                  <h2 className="mt-8 text-3xl font-semibold text-zinc-900">
                    Wallet successfully created
                  </h2>

                  <div className="mt-10 flex gap-4">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/${user?.id}`)
                      }
                      className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white px-8 font-medium text-zinc-700"
                    >
                      Open dashboard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-12 space-y-6 lg:col-span-4">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8">
              <h3 className="mb-8 text-2xl font-semibold text-zinc-900">
                Why open a wallet?
              </h3>

              <div className="space-y-8">
                {features.map((feature) => {
                  const Icon = feature.icon

                  return (
                    <div key={feature.title} className="flex gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg}`}
                      >
                        <Icon
                          size={24}
                          className={feature.iconColor}
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-zinc-900">
                          {feature.title}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-8">
              <h3 className="text-2xl font-semibold text-zinc-900">
                Need help?
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Learn more about wallets or contact support.
              </p>

              {/* <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700">
                Visit Help Center
                <ExternalLink size={16} />
              </button>

              <button className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-700">
                <Headphones size={18} />
                Contact Support
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default Account