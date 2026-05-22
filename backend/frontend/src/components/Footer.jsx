import { Link, useLocation } from "react-router-dom"
import {
  MdHome,
  MdHomeFilled,
  MdSwapHoriz,
  MdOutlinePieChart,
  MdPieChart,
  MdPersonOutline,
  MdPerson,
} from "react-icons/md"

/* -----------------------------------------------------------
   Mobile bottom navigation
   - DESIGN.md surface-elevated (#16181a) on canvas-dark
   - rounded-full pill, hairline-dark border
   - lime brand stamp on the active tab
   - safe-area-inset aware
----------------------------------------------------------- */

const Footer = () => {
  const userId = localStorage.getItem("user_id")
  const location = useLocation()

  const items = [
    {
      to: `/dashboard/${userId}`,
      label: "Home",
      icon: MdHome,
      iconActive: MdHomeFilled,
      match: (p) => p.startsWith("/dashboard"),
    },
    {
      to: "/transfer",
      label: "Transfer",
      icon: MdSwapHoriz,
      iconActive: MdSwapHoriz,
      match: (p) => p.startsWith("/transfer"),
    },
    {
      to: "#",
      label: "Stats",
      icon: MdOutlinePieChart,
      iconActive: MdPieChart,
      match: () => false,
      disabled: true,
    },
    {
      to: `/profile/${userId}`,
      label: "Profile",
      icon: MdPersonOutline,
      iconActive: MdPerson,
      match: (p) => p.startsWith("/profile") || p.startsWith("/update-profile"),
    },
  ]

  return (
    <nav
      className="fixed left-0 right-0 z-40 px-4 pointer-events-none"
      style={{
        bottom: "max(16px, env(safe-area-inset-bottom))",
      }}
      aria-label="Primary"
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <ul
          className="flex items-center justify-between gap-1 m-0 p-1.5 list-none rounded-full border"
          style={{
            backgroundColor: "#16181a",
            borderColor: "rgba(255,255,255,0.08)",
            boxShadow:
              "0 12px 30px -12px rgba(0,0,0,0.55), 0 0 0 1px rgba(0,0,0,0.04)",
          }}
        >
          {items.map((item) => {
            const isActive = item.match(location.pathname)
            const Icon = isActive ? item.iconActive : item.icon

            const inner = (
              <span
                className={[
                  "relative flex items-center justify-center gap-1.5 h-11 px-3 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-brand text-black flex-1"
                    : "text-white/55 hover:text-white",
                  item.disabled ? "opacity-40 cursor-not-allowed" : "",
                ].join(" ")}
              >
                <Icon size={20} />
                {isActive && (
                  <span className="type-button-sm font-semibold whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </span>
            )

            if (item.disabled) {
              return (
                <li
                  key={item.label}
                  className="flex items-center justify-center"
                  aria-disabled="true"
                >
                  {inner}
                </li>
              )
            }

            return (
              <li
                key={item.label}
                className={[
                  "flex items-center justify-center",
                  isActive ? "flex-1" : "",
                ].join(" ")}
              >
                <Link
                  to={item.to}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className="no-underline w-full flex items-center justify-center"
                >
                  {inner}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Footer
