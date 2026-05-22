import { Outlet } from "react-router-dom"

const DashboardLayout = ({ sidebar }) => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-[220px] flex-col bg-black text-white flex-shrink-0">
        {sidebar}
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default DashboardLayout
