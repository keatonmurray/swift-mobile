import {
  Bell,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Plus,
  House,
  Receipt,
  CreditCard,
  User,
  RefreshCcw,
  CloudBackup
} from 'lucide-react'

import { Link } from 'react-router-dom'

const Footer = () => {
  const userId = localStorage.getItem('user_id')
  return (
    <div>
        <div className="position-fixed bottom-0 start-0 end-0 glass-nav">
            <div className="container-fluid px-4 py-3 mobile-shell">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/dashboard/${userId}`} className="btn btn-reset p-0 text-center">
                        <div className="d-flex flex-column align-items-center gap-1">
                        <House size={22} className="text-lime" />
                        <span className="text-lime fs-12">
                            Home
                        </span>
                        </div>
                    </Link>

                    <Link to="/transactions" className="btn btn-reset p-0 text-center">
                        <div className="d-flex flex-column align-items-center gap-1">
                        <CloudBackup size={22} className="text-white-45" />
                        <span className="text-white-45 fs-12">
                            Transactions
                        </span>
                        </div>
                    </Link>
                    <button className="btn btn-reset p-0 text-center">
                        <div className="d-flex flex-column align-items-center gap-1">
                        <RefreshCcw size={22} className="text-white-45" />

                        <span className="text-white-45 fs-12">
                            Convert
                        </span>
                        </div>
                    </button>
                    <button className="btn btn-reset p-0 text-center">
                        <div className="d-flex flex-column align-items-center gap-1">
                        <User size={22} className="text-white-45" />

                        <span className="text-white-45 fs-12">
                            Profile
                        </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer