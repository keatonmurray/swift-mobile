import React, { useEffect, useState } from 'react'
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Plus,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Homepage = () => {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  return (
    <div className="bg-main-pallette min-vh-100 text-white">
      <div className="container-fluid px-4 pt-4 mobile-shell-padding-bottom mobile-shell">

        {/* TOP BAR */}
        <div
          style={enter(0)}
          className="d-flex justify-content-between align-items-center mb-5"
        >
          <span className="logo">
            <img
              src="/img/logo-inverted.png"
              height={30}
              width="auto"
              alt="Logo"
            />
          </span>

          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <Bell size={20} />

              <div className="position-absolute notification-dot" />
            </div>

            <div className="profile-circle d-flex align-items-center justify-content-center">
              MT
            </div>
          </div>
        </div>

        {/* WELCOME */}
        <div
          style={enter(0.1)}
          className="mb-4"
        >
          <p className="mb-1 text-white-60 fs-18">
            Welcome back,
          </p>

          <h2 className="fw-bold mb-0 fs-42 lh-1 ls-2">
            Michael
          </h2>
        </div>

        {/* BALANCE CARD */}
        <div
          style={enter(0.2)}
          className="glass-card balance-card position-relative overflow-hidden mb-4"
        >
          <div className="position-absolute balance-glow" />

          <p className="mb-2 text-white-55 fs-14">
            Total balance
          </p>

          <div className="d-flex justify-content-between align-items-end">
            <div className="d-flex align-items-end gap-2">
              <h3 className="fw-semibold mb-0 fs-34 ls-2">
                $12,456.78
              </h3>

              <div className="d-flex align-items-center gap-1 mb-2 text-white-60 fs-14">
                USD
                <ChevronDown size={14} />
              </div>
            </div>

            <ChevronDown
              size={18}
              className="text-white-45"
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={enter(0.3)}
          className="row g-3 mb-4"
        >
          {[
            {
              icon: <ArrowUpRight size={34} className="text-lime" />,
              title: 'Send',
              subtitle: 'Send money',
            },
            {
              icon: <ArrowDownLeft size={34} className="text-lime" />,
              title: 'Receive',
              subtitle: 'Receive money',
            },
            {
              icon: <RefreshCw size={30} className="text-lime" />,
              title: 'Convert',
              subtitle: 'Convert currencies',
            },
            {
              icon: <Plus size={34} className="text-lime" />,
              title: 'Add Money',
              subtitle: 'Deposit to account',
            },
          ].map((item, index) => (
            <div className="col-6" key={index}>
              <Link to="/send-money" className="text-decoration-none d-flex align-items-center glass-card action-card h-100 position-relative overflow-hidden">
                <div>
                  <div className="mb-1">
                    {item.icon}
                  </div>

                  <h4 className="fw-semibold mb-1 fs-14 text-white">
                    {item.title}
                  </h4>

                  <p className="mb-0 text-white-45 fs-12">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CURRENCIES */}
        <div
          style={enter(0.4)}
          className="glass-card radius-28 overflow-hidden mb-4"
        >
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary border-opacity-10">
            <h3 className="fw-semibold mb-0 fs-16">
              Your Currencies
            </h3>

            <button className="fs-16 btn btn-reset text-lime fw-semibold">
              View all
            </button>
          </div>

          {[
            {
              flag: '🇺🇸',
              name: 'US Dollar',
              code: 'USD',
              amount: '$8,240.00',
            },
            {
              flag: '🇪🇺',
              name: 'Euro',
              code: 'EUR',
              amount: '€2,150.34',
              sub: '~ $2,353.20',
            },
            {
              flag: '🇬🇧',
              name: 'British Pound',
              code: 'GBP',
              amount: '£1,320.50',
              sub: '~ $1,664.10',
            },
          ].map((currency, index) => (
            <div
              key={index}
              className={`d-flex justify-content-between align-items-center p-4 ${
                index !== 2
                  ? 'border-bottom border-secondary border-opacity-10'
                  : ''
              }`}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="fs-34">
                  {currency.flag}
                </div>

                <div>
                  <h5 className="mb-1 fw-semibold fs-14">
                    {currency.name}
                  </h5>

                  <p className="mb-0 text-white-45 fs-12">
                    {currency.code}
                  </p>
                </div>
              </div>

              <div className="text-end">
                <h5 className="mb-1 fw-semibold fs-14">
                  {currency.amount}
                </h5>

                {currency.sub && (
                  <p className="mb-0 text-white-35 fs-14">
                    {currency.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SECURITY CARD */}
        <div
          style={enter(0.5)}
          className="glass-card security-card d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center gap-3">
            <div className="security-circle d-flex align-items-center justify-content-center">
              🛡️
            </div>

            <div>
              <h5 className="fw-semibold mb-1">
                Secure. Fast. Global.
              </h5>

              <p className="mb-0 text-white-45 fs-14">
                Move your money around the world
                with confidence.
              </p>
            </div>
          </div>

          <ChevronRight className="text-white-40" />
        </div>
      </div>
    </div>
  )
}

export default Homepage