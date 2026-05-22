import { IoSearchOutline, IoNotificationsOutline } from "react-icons/io5"
import { HiOutlineSparkles } from "react-icons/hi2"

/**
 * DashboardShell
 * ----------------
 * The white rounded panel that hosts every dashboard page.
 * Renders the persistent topbar (search, notifications, AI button)
 * and a left-aligned page title block. Page content is passed as children.
 *
 * Usage:
 *   <DashboardShell
 *     title="Overview"
 *     subtitle="Real-time financial overview of your business"
 *   >
 *     ...page content...
 *   </DashboardShell>
 */
const DashboardShell = ({ title, subtitle, actions, children }) => {
  return (
    <div className="p-3 min-h-full">
      <div className="bg-white rounded-[28px] p-7">
        {/* Topbar */}
        <header className="flex items-start justify-between gap-6 mb-6">
          <div>
            {title && (
              <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">{title}</h1>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Optional per-page actions slot */}
            {actions}

            {/* Search — pill input, hairline-light border */}
            <div className="relative w-[320px]">
              <IoSearchOutline
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full h-10 bg-gray-50 border border-gray-200 rounded-full pl-9 pr-14 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-gray-500 bg-white border border-gray-200 rounded-md px-1.5 py-0.5 font-semibold">
                ⌘ K
              </kbd>
            </div>

            {/* Notifications */}
            <button className="h-10 w-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors">
              <IoNotificationsOutline size={18} />
            </button>

            {/* AI assistant — black pill, brand stamp */}
            <button className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
              <HiOutlineSparkles size={16} />
            </button>
          </div>
        </header>

        {/* Page content */}
        {children}
      </div>
    </div>
  )
}

export default DashboardShell
