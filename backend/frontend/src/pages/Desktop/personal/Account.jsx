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
} from "lucide-react"

import DashboardShell from "../components/DashboardShell"

import { useState } from "react"

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
  const [selectedCurrencies, setSelectedCurrencies] = useState(["USD"])
  const [step, setStep] = useState(1)

  return (
    <DashboardShell
      title="Open Wallet"
      subtitle="Choose currencies and create a wallet to receive and hold funds."
    >
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-1 items-center">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                    step > 1
                      ? "bg-violet-600 text-white"
                      : step === 1
                      ? "border-2 border-violet-500 text-violet-600"
                      : "border border-zinc-300 text-zinc-600"
                  }`}
                >
                  {step > 1 ? <Check size={18} /> : 1}
                </div>

                <span
                  className={`font-medium ${
                    step >= 1
                      ? "text-zinc-900"
                      : "text-zinc-500"
                  }`}
                >
                  Select currencies
                </span>
              </div>

              <div className="mx-8 h-px flex-1 bg-zinc-200" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-1 items-center">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                    step > 2
                      ? "bg-violet-600 text-white"
                      : step === 2
                      ? "border-2 border-violet-500 text-violet-600"
                      : "border border-zinc-300 text-zinc-600"
                  }`}
                >
                  {step > 2 ? <Check size={18} /> : 2}
                </div>

                <span
                  className={`font-medium ${
                    step >= 2
                      ? "text-zinc-900"
                      : "text-zinc-500"
                  }`}
                >
                  Add virtual account number
                </span>
              </div>

              <div className="mx-8 h-px flex-1 bg-zinc-200" />
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  step === 3
                    ? "border-2 border-violet-500 text-violet-600"
                    : "border border-zinc-300 text-zinc-600"
                }`}
              >
                3
              </div>

              <span
                className={`font-medium ${
                  step >= 3
                    ? "text-zinc-900"
                    : "text-zinc-500"
                }`}
              >
                Review & confirm
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left */}
          <div className="col-span-8">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-zinc-900">
                    Select currencies
                  </h2>

                  <p className="mt-2 text-zinc-500">
                    Choose the currencies you want to include in this
                    wallet. You can add more later.
                  </p>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                  />

                  <input
                    type="text"
                    placeholder="Search currencies..."
                    className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-zinc-400"
                  />
                </div>

                {/* Popular */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-500">
                      Popular
                    </span>

                    <button className="cursor-not-allowed text-sm font-medium text-zinc-400">
                      Select all
                    </button>
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
                </div>

                {/* All currencies */}
                <div>
                  <div className="mb-4">
                    <span className="text-sm font-medium text-zinc-500">
                      All currencies
                    </span>
                  </div>

                  <div>
                    {allCurrencies.map((currency) => (
                      <CurrencyRow
                        key={currency.code}
                        {...currency}
                        selectedCurrencies={selectedCurrencies}
                        setSelectedCurrencies={setSelectedCurrencies}
                      />
                    ))}
                  </div>
                </div>

                {/* Selected currencies */}
                <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                        <Globe
                          size={22}
                          className="text-violet-600"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-zinc-900">
                          {selectedCurrencies.length}{" "}
                          {selectedCurrencies.length === 1
                            ? "currency selected"
                            : "currencies selected"}
                        </h3>

                        <p className="mt-1 text-zinc-500">
                          {selectedCurrencies.join(", ")}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCurrencies([])}
                      className="text-sm font-medium text-violet-600 hover:text-violet-700"
                    >
                      Clear all
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700 transition hover:bg-zinc-50">
                    Cancel
                  </button>

                  <button
                    onClick={() => setStep(2)}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black font-medium text-white transition hover:opacity-90"
                  >
                    Continue

                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-zinc-900">
                    Add virtual account numbers
                  </h2>

                  <p className="mt-2 text-zinc-500">
                    Enable local receiving accounts for the currencies
                    you selected.
                  </p>
                </div>

                <div className="space-y-4">
                  {selectedCurrencies.map((currency) => (
                    <div
                      key={currency}
                      className="flex items-center justify-between rounded-2xl border border-zinc-200 p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
                          {currency === "USD" && "🇺🇸"}
                        </div>

                        <div>
                          <h3 className="font-semibold text-zinc-900">
                            {currency} virtual account
                          </h3>

                          <p className="mt-1 text-sm text-zinc-500">
                            Receive local transfers with dedicated
                            account details.
                          </p>
                        </div>
                      </div>

                      <button className="flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white transition hover:opacity-90">
                        Enable
                      </button>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700 transition hover:bg-zinc-50"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setStep(3)}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black font-medium text-white transition hover:opacity-90"
                  >
                    Continue

                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <h2 className="text-2xl font-semibold text-zinc-900">
                  Review & confirm
                </h2>

                <p className="mt-2 text-zinc-500">
                  Review your wallet setup before continuing.
                </p>

                <div className="mt-8 rounded-2xl border border-zinc-200 p-6">
                  <h3 className="font-semibold text-zinc-900">
                    Selected currencies
                  </h3>

                  <p className="mt-2 text-zinc-500">
                    {selectedCurrencies.join(", ")}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex h-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700 transition hover:bg-zinc-50"
                  >
                    Back
                  </button>

                  <button className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-black font-medium text-white transition hover:opacity-90">
                    Create wallet
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="col-span-4 space-y-6">
            {/* Why open wallet */}
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
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${feature.bg}`}
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

            {/* Help */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-8">
              <h3 className="text-2xl font-semibold text-zinc-900">
                Need help?
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Learn more about wallets or contact our support team.
              </p>

              <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white font-medium text-zinc-700 transition hover:bg-zinc-50">
                Visit Help Center

                <ExternalLink size={16} />
              </button>

              <button className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black">
                <Headphones size={18} />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

export default Account