import DashboardShell from "../../components/DashboardShell"
import {
  IoChevronDownOutline,
  IoCalendarOutline,
} from "react-icons/io5"
import { HiOutlinePaperAirplane } from "react-icons/hi2"
import { RiShieldCheckLine } from "react-icons/ri"

import { useState, useEffect } from "react"
import axios from "axios"

const SummaryRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[15px] text-zinc-500">{label}</span>

      <span className="text-[15px] font-medium text-black">{value}</span>
    </div>
  )
}

const BusinessTransferMoney = () => {

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(""); 
  const [destination_ewallet, setDestinationEwallet] = useState("");
  const [source_wallet, setSourceWallet] = useState("");
  const [wallet, setWallet] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const token = localStorage.getItem("api_token");

  const handleTransferMoney = async () => {

    const defaultExp = "1781502000"; //sandbox only (UNIX format)
    
    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const payload = {
        amount: Number(amount),
        currency,
        destination_ewallet,
        source_ewallet: source_wallet,
        expiration: defaultExp,
        metadata: {},
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/transfer-personal-money`,
        payload,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      setSuccess("Money transferred successfully!")
    } catch (error) {
      console.error(error)

      setError(
        error?.response?.data?.message ||
          "Something went wrong while transferring money."
      )
    } finally {
      setLoading(false)
    }
  }

  // Retrieve wallet
  const handleRetrieveWallet = async () => {
    try {
      setLoading(true)

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )

      const walletData = response.data?.data?.wallet_rapyd

      setWallet(walletData)

      // Automatically set source wallet using the ewallet id
      setSourceWallet(walletData?.id || "")
    } catch (error) {
      console.error("Retrieve wallet error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleRetrieveWallet()
  }, [])

  return (
    <DashboardShell
      title="Transfer To Another Wallet"
      subtitle="Send money securely"
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.65fr_0.95fr]">
        {/* LEFT */}
        <div className="rounded-[32px] border border-zinc-200/70 bg-white p-5 md:p-8">
          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Amount
              </label>

              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-[15px] outline-none transition focus:border-zinc-300"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Currency
              </label>

              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border border-zinc-200 bg-white px-4 text-[15px] text-zinc-500 outline-none transition focus:border-zinc-300"
                >
                  <option value="" disabled>
                    Select currency
                  </option>

                  <option value="USD">USD</option>
                </select>

                <IoChevronDownOutline className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-zinc-500" />
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Destination E-Wallet
              </label>

              <input
                type="text"
                placeholder="Enter destination e-wallet"
                value={destination_ewallet}
                onChange={(e) => setDestinationEwallet(e.target.value)}
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-white px-4 text-[15px] outline-none transition focus:border-zinc-300"
              />

              <p className="mt-2 text-[13px] text-zinc-500">
                The e-wallet that will receive the payment.
              </p>
            </div>

            {/* Source */}
            <div>
              <label className="mb-3 block text-[15px] font-medium text-black">
                Source E-Wallet
              </label>

              <input
                type="text"
                placeholder={source_wallet}
                value={source_wallet}
                readOnly
                className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-100 px-4 text-[15px] text-zinc-500 outline-none cursor-not-allowed"
              />

              <p className="mt-2 text-[13px] text-zinc-500">
                The e-wallet the payment will be sent from.
              </p>
            </div>

            {/* Status Messages */}
            {success && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] text-emerald-700">
                {success}
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
                {error}
              </div>
            )}

            {/* Button */}
            <button
              onClick={handleTransferMoney}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-black text-[15px] font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HiOutlinePaperAirplane className="text-[16px]" />

              {loading ? "Sending Payment..." : "Send Payment"}
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-[32px] border border-zinc-200/70 bg-white p-5 md:p-6">
          <h2 className="text-center text-[28px] font-semibold tracking-tight text-black">
            Transfer Summary
          </h2>

          {/* Icon */}
          <div className="flex flex-col items-center justify-center py-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <HiOutlinePaperAirplane className="text-[34px] text-emerald-600" />
            </div>

            <h3 className="mt-6 text-[28px] font-semibold text-black">
              Swift Payment
            </h3>

            <p className="mt-2 max-w-[260px] text-center text-[15px] leading-6 text-zinc-500">
              Money should hit the destination wallet within seconds.
            </p>
          </div>

          <div className="border-t border-zinc-200 pt-6">
            <div className="space-y-5">
              <SummaryRow
                label="Amount"
                value={amount ? `$${amount}` : "—"}
              />

              <SummaryRow
                label="Currency"
                value={currency || "—"}
              />

              <SummaryRow
                label="Destination E-Wallet"
                value={destination_ewallet || "—"}
              />

              <SummaryRow
                label="Source E-Wallet"
                value={source_wallet || "—"}
              />
            </div>

            {/* Secure Card */}
            <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
                  <RiShieldCheckLine className="text-[22px] text-emerald-600" />
                </div>

                <div>
                  <h4 className="text-[15px] font-semibold text-black">
                    Secure & Trusted
                  </h4>

                  <p className="mt-1 text-[14px] leading-6 text-zinc-600">
                    Your payment will be processed securely via Rapyd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END RIGHT */}
      </div>
    </DashboardShell>
  )
}

export default BusinessTransferMoney