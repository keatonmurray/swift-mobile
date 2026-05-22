import { Link, useParams } from "react-router-dom"
import { useEffect, useMemo, useState } from "react"
import { Carousel } from "bootstrap"
import axios from "axios"
import {
  MdKeyboardArrowRight,
  MdNotificationsNone,
  MdOutlineFilterAlt,
  MdAdd,
  MdArrowUpward,
  MdArrowDownward,
  MdAccountBalanceWallet,
  MdSwapHoriz,
  MdReceiptLong,
  MdCreditCard,
} from "react-icons/md"

import Notification from "../../../components/dashboard/Notification"
import cardLogo from "../../../../public/img/mastercard.png"

const FX_RATES = { USD: 1, AUD: 0.65, GBP: 1.27, CAD: 0.74 }

const Dashboard = () => {
  useParams()
  const userId = localStorage.getItem("user_id")
  const token = localStorage.getItem("api_token")

  const [user, setUser] = useState(null)
  const [wallet, setWallet] = useState(null)
  const [bankAccounts, setBankAccounts] = useState([])
  const [walletTransactions, setWalletTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [notificationOpen, setNotificationOpen] = useState(false)

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [profileRes, walletRes, bankRes, txRes] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, authHeaders),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-wallet`, authHeaders),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/retrieve-personal-currency`, authHeaders),
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`, authHeaders),
        ])

        if (profileRes.status === "fulfilled") setUser(profileRes.value.data.user)
        if (walletRes.status === "fulfilled") setWallet(walletRes.value.data?.data?.wallet_rapyd ?? null)
        if (bankRes.status === "fulfilled") {
          setBankAccounts(bankRes.value.data?.data?.wallet_rapyd?.bank_accounts ?? [])
        }
        if (txRes.status === "fulfilled") setWalletTransactions(txRes.value.data.transactions ?? [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalBalance = useMemo(() => {
    return (
      wallet?.accounts?.reduce((sum, acc) => {
        const balance = Number(acc.balance || 0)
        const rate = FX_RATES?.[acc.currency] ?? 0
        return sum + balance * rate
      }, 0) || 0
    )
  }, [wallet])

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance)

  const transactions = useMemo(
    () =>
      walletTransactions.map((t) => ({
        name: t.type.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        initials: t.currency,
        time: new Date(t.created_at * 1000).toLocaleString(),
        amount: `${t.type.includes("in") ? "+" : "-"}$${t.amount}`,
        isIncoming: t.type.includes("in"),
      })),
    [walletTransactions]
  )

  const cardNumbers = [
    { holder: `${user?.first_name || ""} ${user?.last_name || ""}`, number: "4312 1213 5463 7564", currency: "USD", expiry: "11/29" },
    { holder: `${user?.first_name || ""} ${user?.last_name || ""}`, number: "4333 2321 5467 3212", currency: "GBP", expiry: "12/32" },
    { holder: `${user?.first_name || ""} ${user?.last_name || ""}`, number: "4546 8797 0987 2341", currency: "CAD", expiry: "06/29" },
  ]

  useEffect(() => {
    const el = document.getElementById("carouselExample")
    if (!el) return

    const instance = new Carousel(el, { interval: false, ride: false, touch: true })

    const handleSlide = (event) => {
      const indicators = el.querySelectorAll(".carousel-indicators button")
      indicators.forEach((btn) => btn.classList.remove("active"))
      indicators[event.to]?.classList.add("active")
    }

    el.addEventListener("slide.bs.carousel", handleSlide)

    return () => {
      el.removeEventListener("slide.bs.carousel", handleSlide)
      instance.dispose()
    }
  }, [])

  return (
    // bg-[#f4f4f4] = surface-soft per DESIGN.md
    // -mt-10 cancels the global .page-wrapper 40px top padding so the canvas extends to the top
    <main className="min-h-screen bg-[#f4f4f4] text-[#191c1f] -mt-10 pt-10">
      {notificationOpen && (
        <Notification
          notification={notificationOpen}
          setNotification={setNotificationOpen}
        />
      )}

      <div className="mx-auto max-w-md px-4 pb-28">
        {/* ── Header ───────────────────────────────────────── */}
        <header className="mb-6 flex items-center justify-between pt-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={user?.profile_avatar ?? "/img/profile.png"}
              alt=""
              className="h-11 w-11 shrink-0 rounded-full border border-[#e2e2e7] object-cover"
            />

            <div className="min-w-0">
              <p className="type-body-sm text-[#5c5e60] m-0">
                {user?.first_name ? `Hey, ${user.first_name}` : "Welcome back"}
              </p>
              <h1 className="type-heading-sm text-[#191c1f] m-0 truncate">
                Your wallet
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setNotificationOpen((v) => !v)}
            aria-label="Notifications"
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e2e2e7] bg-white text-[#191c1f] transition active:scale-95"
          >
            <MdNotificationsNone size={22} />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
        </header>

        {/* ── Balance hero ─────────────────────────────────── */}
        <section
          className="mb-5 rounded-[28px] p-5 text-white"
          style={{ backgroundColor: "#16181a" }}
        >
          <p className="type-caption uppercase tracking-[0.14em] font-semibold text-white/55 m-0 mb-2">
            Available balance
          </p>

          <h2
            className="font-display text-white m-0 mb-2"
            style={{
              fontSize: "clamp(2.4rem, 11vw, 2.75rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            {formattedTotal}
          </h2>

          <div className="flex items-center justify-between">
            <p className="type-body-sm text-white/65 m-0">
              Across {wallet?.accounts?.length ?? 0} currency
              {wallet?.accounts?.length === 1 ? "" : " accounts"}
            </p>

            <span className="type-caption font-semibold rounded-full bg-white/[0.08] border border-white/10 px-3 py-1 text-white/80">
              Swift
            </span>
          </div>
        </section>

        {/* ── Card carousel ────────────────────────────────── */}
        <section className="mb-7">
          <div className="swift homepage card-container mx-auto max-w-[340px]">
            <div id="carouselExample" className="carousel slide">
              <div className="carousel-indicators !bottom-[-30px]">
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2" />
                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3" />
              </div>

              <div className="carousel-inner overflow-visible">
                {cardNumbers.map((c, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <div
                      className="relative h-[205px] overflow-hidden rounded-[28px] p-6 text-white"
                      style={{ backgroundColor: "#000000" }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_85%,rgba(14,165,107,0.65),transparent_38%),radial-gradient(circle_at_80%_40%,rgba(22,101,52,0.55),transparent_35%)]" />
                      <div className="absolute inset-0 bg-black/25" />

                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="type-body-md font-semibold mb-1">
                              {c.holder.trim() || "Swift User"}
                            </p>
                            <img
                              src="/img/logo-inverted.png"
                              alt="Swift"
                              className="h-8 w-auto object-contain"
                            />
                          </div>

                          <img
                            src={cardLogo}
                            alt=""
                            className="h-10 w-auto object-contain"
                          />
                        </div>

                        <p
                          className="font-display m-0 text-white"
                          style={{
                            fontSize: 22,
                            fontWeight: 500,
                            letterSpacing: "0.16em",
                            lineHeight: 1,
                          }}
                        >
                          {c.number}
                        </p>

                        <div className="flex items-center justify-between type-button-sm">
                          <span>{c.currency}</span>
                          <span>{c.expiry}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Currency accounts ────────────────────────────── */}
        <section className="mb-5 rounded-[20px] border border-[#e2e2e7] bg-white p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="type-heading-sm text-[#191c1f] m-0 mb-1">
                Currency accounts
              </h2>
              <p className="type-body-sm text-[#5c5e60] m-0 max-w-[210px]">
                Open and manage balances across multiple currencies.
              </p>
            </div>

            <Link
              to={`/currency-details/${userId}`}
              onClick={(e) => !bankAccounts?.length && e.preventDefault()}
              className={`shrink-0 rounded-full px-3 py-2 type-button-sm no-underline transition ${
                bankAccounts?.length
                  ? "bg-[#f4f4f4] text-[#191c1f]"
                  : "cursor-not-allowed bg-[#f4f4f4] text-[#c9c9cd]"
              }`}
            >
              See all
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-6">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#e2e2e7] border-t-[#191c1f]" />
            </div>
          ) : !wallet ? (
            <EmptyState
              text="You haven't opened any currency account yet."
              actionText="Create a wallet"
              to="/create-personal-wallet"
            />
          ) : bankAccounts?.length ? (
            <div className="space-y-3">
              {bankAccounts.slice(0, 3).map((acc, index) => (
                <Link
                  key={index}
                  to={`/currency-details/${userId}`}
                  className="flex items-center justify-between rounded-2xl border border-[#e2e2e7] bg-[#f4f4f4] p-4 no-underline transition active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white type-button-sm"
                      style={{ backgroundColor: "#191c1f" }}
                    >
                      {acc.currency?.slice(0, 1)}
                    </div>

                    <div>
                      <p className="type-body-md font-semibold text-[#191c1f] m-0">
                        {acc.currency} Account
                      </p>
                      <p className="type-caption text-[#8d969e] m-0">
                        Available currency wallet
                      </p>
                    </div>
                  </div>

                  <MdKeyboardArrowRight size={22} className="text-[#8d969e]" />
                </Link>
              ))}

              <Link
                to={`/create-personal-currency/${userId}`}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c9c9cd] bg-[#f4f4f4] type-button-sm text-[#191c1f] no-underline transition active:scale-[0.98]"
              >
                <MdAdd size={20} />
                Add currency
              </Link>
            </div>
          ) : (
            <EmptyState
              text="Your wallet is ready. Add a currency to start."
              actionText="Open currency"
              to={`/create-personal-currency/${userId}`}
            />
          )}
        </section>

        {/* ── Quick actions ────────────────────────────────── */}
        <section className="mb-5 grid grid-cols-3 gap-3">
          <ActionTile
            to="/currencies"
            icon={<MdAccountBalanceWallet size={24} />}
            label="Currencies"
          />
          <ActionTile
            to="/deposit"
            icon={<MdSwapHoriz size={25} />}
            label="Transfer"
          />
          <ActionTile
            to="#"
            icon={<MdReceiptLong size={24} />}
            label="Invoices"
            disabled
          />
        </section>

        {/* ── Transactions ─────────────────────────────────── */}
        <section className="rounded-[20px] border border-[#e2e2e7] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="type-heading-sm text-[#191c1f] m-0 mb-1">
                Recent transactions
              </h2>
              <p className="type-body-sm text-[#5c5e60] m-0">
                Latest activity from your wallet
              </p>
            </div>

            <button
              type="button"
              aria-label="Filter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e2e7] bg-[#f4f4f4] text-[#191c1f] transition active:scale-95"
            >
              <MdOutlineFilterAlt size={19} />
            </button>
          </div>

          {transactions.length > 0 ? (
            <ul className="m-0 flex list-none flex-col divide-y divide-[#e2e2e7] p-0">
              {transactions.map((t, index) => (
                <li key={index} className="flex items-center justify-between py-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        t.isIncoming
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {t.isIncoming ? (
                        <MdArrowDownward size={20} />
                      ) : (
                        <MdArrowUpward size={20} />
                      )}
                    </span>

                    <div className="min-w-0">
                      <p className="type-body-md font-semibold text-[#191c1f] m-0 truncate">
                        {t.name}
                      </p>
                      <p className="type-caption text-[#8d969e] m-0 truncate">
                        {t.initials} • {t.time}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 type-button-sm ${
                      t.isIncoming ? "text-emerald-700" : "text-rose-700"
                    }`}
                  >
                    {t.amount}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl bg-[#f4f4f4] py-8 text-center">
              <MdCreditCard className="mx-auto mb-2 text-[#8d969e]" size={28} />
              <p className="type-body-sm text-[#5c5e60] m-0">No transactions yet</p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

const EmptyState = ({ text, actionText, to }) => {
  return (
    <div className="rounded-2xl bg-[#f4f4f4] p-4 text-center">
      <p className="type-body-sm text-[#5c5e60] m-0 mb-3">{text}</p>
      <Link
        to={to}
        className="inline-flex h-12 w-full items-center justify-center rounded-full text-white no-underline type-button-md transition active:scale-[0.98]"
        style={{ backgroundColor: "#191c1f" }}
      >
        {actionText}
      </Link>
    </div>
  )
}

const ActionTile = ({ to, icon, label, disabled }) => {
  const content = (
    <span className="flex h-[92px] flex-col items-center justify-center gap-2 rounded-[20px] border border-[#e2e2e7] bg-white text-[#191c1f] transition active:scale-[0.98]">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4f4f4]">
        {icon}
      </span>
      <span className="type-button-sm">{label}</span>
    </span>
  )

  if (disabled) {
    return <div className="pointer-events-none cursor-not-allowed opacity-50">{content}</div>
  }

  return (
    <Link to={to} className="no-underline">
      {content}
    </Link>
  )
}

export default Dashboard
