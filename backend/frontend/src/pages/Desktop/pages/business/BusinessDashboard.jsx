import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import BusinessDashboardSidebar from "../../components/BusinessDashboardSidebar"

const BusinessDashboard = () => {
  return (
    <div className="swift desktop-view homepage d-flex m-0 p-0 min-vh-100">
            {/* Sidebar */}
            <div className="sidebar bg-dark text-white d-none d-md-block">
                <BusinessDashboardSidebar />
            </div>

            {/* Main content */}
            <div className="content flex-grow-1">
                {/* page content */}
            </div>
        </div>
  )
}

export default BusinessDashboard