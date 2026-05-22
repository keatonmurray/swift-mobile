import { NavLink } from "react-router-dom"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  IoHomeOutline,
  IoSettingsOutline,
  IoDocumentTextOutline,
} from "react-icons/io5"

import { GoCreditCard } from "react-icons/go"
import { BsWallet2 } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";

import {
  TbArrowsExchange,
  TbReportSearch,
  TbReportAnalytics,
} from "react-icons/tb"

import { RiRobot2Line } from "react-icons/ri"

import { LuGoal } from "react-icons/lu"

import useCurrentUser from "@/hooks/useCurrentUser"

const navItems = [
  { label: "Dashboard", icon: IoHomeOutline, to: "/personal" },
  { label: "Open a wallet", icon: BsWallet2, to: "/personal/account" },
  { label: "Transfer money", icon: GoCreditCard, to: "/personal/pay" },
  { label: "Accept money", icon: CiMoneyBill, to: "/personal/transfer/pending" },
  {
    label: "Transactions",
    icon: TbArrowsExchange,
    to: "/personal/transactions",
  },
  // {
  //   label: "Automations",
  //   icon: RiRobot2Line,
  //   to: "/personal/automations",
  // },
  // { label: "Cards", icon: BsCreditCard2Front, to: "/personal/cards" },
  // {
  //   label: "Expenses",
  //   icon: TbReportSearch,
  //   to: "/personal/expenses",
  // },
  {
    label: "Reports",
    icon: TbReportAnalytics,
    to: "/personal/reports",
  },
  // {
  //   label: "Documents",
  //   icon: IoDocumentTextOutline,
  //   to: "/personal/documents",
  // },
  { label: "Goals", icon: LuGoal, to: "/personal/goals" },
  {
    label: "Settings",
    icon: IoSettingsOutline,
    to: "/personal/settings",
  },
]

const PersonalSidebar = () => {
  // ADD INSIDE COMPONENT
  const navigate = useNavigate()
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const { user, loading } = useCurrentUser()

  const displayName = user
    ? [user.first_name, user.last_name].filter(Boolean).join(" ").trim() ||
      user.email ||
      "Account"
    : ""

  const accountTypeLabel = user?.account_type
    ? `${user.account_type.charAt(0).toUpperCase()}${user.account_type.slice(1)} Account`
    : "Personal Account"

  const avatarSrc = user?.profile_avatar || "/img/profile.png"

  return (
    <aside className="flex h-screen w-[100%] flex-col border-r border-white/10 bg-[#050816] px-5 py-6">
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3 px-2">

        <img
          src="/img/logo-inverted.png"
          alt="Swift Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === "/personal"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white shadow-lg"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon
                  size={19}
                  className="transition-transform duration-200 group-hover:scale-105"
                />

                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* FOOTER ACCOUNT */}
      <div className="relative mt-6 border-t border-white/10 pt-6">
        <div className="group relative">
          <button
            onClick={() => setAccountMenuOpen((prev) => !prev)}
            className="flex w-full items-center gap-3 rounded-2xl bg-white/5 p-3 transition-all hover:bg-white/10"
          >
            {loading ? (
              <span className="h-10 w-10 flex-shrink-0 rounded-full bg-white/10 animate-pulse" />
            ) : (
              <img
                src={avatarSrc}
                alt=""
                className="h-10 w-10 flex-shrink-0 rounded-full object-cover bg-white/5"
                onError={(e) => {
                  e.currentTarget.src = "/img/profile.png"
                }}
              />
            )}

            <div className="min-w-0 flex-1 text-left">
              {loading ? (
                <>
                  <span className="block h-3.5 w-24 rounded bg-white/10 animate-pulse mb-1.5" />
                  <span className="block h-3 w-20 rounded bg-white/5 animate-pulse" />
                </>
              ) : (
                <>
                  <p className="truncate text-sm font-semibold text-white">
                    {displayName}
                  </p>

                  <p className="truncate text-xs text-zinc-400">
                    {accountTypeLabel}
                  </p>
                </>
              )}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 flex-shrink-0 text-zinc-400 transition-transform duration-200 ${
                accountMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* DROPDOWN */}
          {accountMenuOpen && (
            <div className="absolute bottom-full left-0 z-50 mb-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111827] shadow-2xl backdrop-blur-xl">
              <button
                onClick={() => navigate("/settings")}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-zinc-300 transition-all hover:bg-white/5 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-1.14 1.603-1.14 1.902 0a1.724 1.724 0 002.573 1.01c1.01-.59 2.23.63 1.64 1.64a1.724 1.724 0 001.01 2.573c1.14.3 1.14 1.603 0 1.902a1.724 1.724 0 00-1.01 2.573c.59 1.01-.63 2.23-1.64 1.64a1.724 1.724 0 00-2.573 1.01c-.3 1.14-1.603 1.14-1.902 0a1.724 1.724 0 00-2.573-1.01c-1.01.59-2.23-.63-1.64-1.64a1.724 1.724 0 00-1.01-2.573c-1.14-.3-1.14-1.603 0-1.902a1.724 1.724 0 001.01-2.573c-.59-1.01.63-2.23 1.64-1.64a1.724 1.724 0 002.573-1.01z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                Settings
              </button>

              <div className="h-px bg-white/10" />

              <button
                onClick={() => {
                  localStorage.removeItem("token")
                  navigate("/login")
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 21h4a2 2 0 002-2V5a2 2 0 00-2-2H3"
                  />
                </svg>

                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default PersonalSidebar