import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  CircleHelp,
  ChevronDown,
  ChevronRight,
  Shield,
  Landmark,
  House,
  Receipt,
  RefreshCcw,
  CreditCard,
  User,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const SendMoney = () => {

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
    <div className="bg-main-pallette min-vh-100 text-white d-flex flex-column">

      {/* CONTENT */}
      <div className="container-fluid px-4 pt-4 pb-5 flex-grow-1">

        {/* HEADER */}
        <div
          style={enter(0)}
          className="d-flex justify-content-between align-items-center mb-5"
        >
          <Link to="/dashboard" className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center top-cta-btn">
            <ChevronLeft size={18} color="white" />
          </Link>

          <h4 className="mb-0 fw-semibold">
            Send Money
          </h4>

          <Link to="#" className="btn btn-dark rounded-circle top-cta-btn d-flex align-items-center justify-content-center">
            <CircleHelp size={18} color="white" />
          </Link>
        </div>

        {/* YOU SEND */}
        <div style={enter(0.1)} className="mb-4">

          <p className="text-white-50 mb-2 fs-14">
            You send
          </p>

          <div className="glass-card p-3 rounded-4 border border-secondary border-opacity-10">

            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-center gap-3">
                <div className="fs-1">
                  🇺🇸
                </div>

                <div className="d-flex align-items-center gap-1">
                  <h5 className="mb-0 fw-semibold">
                    USD
                  </h5>

                  <ChevronDown size={16} />
                </div>
              </div>

              <h1 className="mb-0 fw-light">
                1,000.00
              </h1>
            </div>
          </div>

          <p className="text-white-50 fs-14 mt-2 mb-0">
            Available balance: $12,456.78
          </p>
        </div>

        {/* THEY RECEIVE */}
        <div style={enter(0.2)} className="mb-4">

          <p className="text-white-50 mb-2 fs-14">
            They receive
          </p>

          <div className="glass-card p-3 rounded-4 border border-secondary border-opacity-10">

            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-center gap-3">
                <div className="fs-1">
                  🇪🇺
                </div>

                <div className="d-flex align-items-center gap-1">
                  <h5 className="mb-0 fw-semibold">
                    EUR
                  </h5>

                  <ChevronDown size={16} />
                </div>
              </div>

              <h1 className="mb-0 fw-light">
                924.35
              </h1>
            </div>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <p className="text-white-50 fs-14 mb-0">
              1 USD = 0.9243 EUR
            </p>

            <p className="text-white-50 fs-14 mb-0">
              Fee: $4.99
            </p>
          </div>
        </div>

        {/* RECIPIENT */}
        <div style={enter(0.3)} className="mb-4">

          <p className="text-white-50 mb-2 fs-14">
            Recipient
          </p>

          <Link to="/recipient" className="text-decoration-none">
            <div className="glass-card p-3 rounded-4 border border-secondary border-opacity-10 d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-3">

                <div
                    className="rounded-circle d-flex text-white align-items-center justify-content-center"
                    style={{
                    width: 50,
                    height: 50,
                    background: 'rgba(255,255,255,0.06)',
                    fontWeight: 600,
                    }}
                >
                    JS
                </div>

                <div>
                    <h5 className="mb-1 fw-semibold text-white">
                    James Smith
                    </h5>

                    <p className="mb-0 text-white-50 fs-14">
                    james.smith@email.com
                    </p>
                </div>
                </div>

                <ChevronRight className="text-white-50" />
            </div>
          </Link>
        </div>

        {/* DELIVERY METHOD */}
        <div style={enter(0.4)} className="mb-4">

          <p className="text-white-50 mb-2 fs-14">
            Delivery method
          </p>

          <div className="glass-card p-3 rounded-4 border border-secondary border-opacity-10 d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center gap-3">

              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 50,
                  height: 50,
                  background: 'rgba(217,255,67,0.08)',
                }}
              >
                <Landmark color="#D9FF43" size={24} />
              </div>

              <div>
                <h5 className="mb-1 fw-semibold">
                  Bank Transfer
                </h5>

                <p className="mb-0 text-white-50 fs-14">
                  1–3 business days
                </p>
              </div>
            </div>

            <ChevronRight className="text-white-50" />
          </div>
        </div>

        {/* REASON */}
        <div style={enter(0.5)} className="mb-4">

          <p className="text-white-50 mb-2 fs-14">
            Reason for transfer
          </p>

          <div className="glass-card p-3 rounded-4 border border-secondary border-opacity-10 d-flex justify-content-between align-items-center">

            <h5 className="mb-0 fw-normal">
              Family support
            </h5>

            <ChevronDown className="text-white-50" />
          </div>
        </div>

        {/* SECURITY */}
        <div style={enter(0.6)} className="mb-4">

          <div className="glass-card p-3 rounded-4 border border-secondary border-opacity-10 d-flex align-items-center gap-3">

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 56,
                height: 56,
                background: 'rgba(217,255,67,0.08)',
              }}
            >
              <Shield color="#D9FF43" size={26} />
            </div>

            <div>
              <h5 className="fw-semibold mb-1">
                Secure & Encrypted
              </h5>

              <p className="mb-0 text-white-50 fs-14">
                Your transfers are protected with bank-level
                security and encryption.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div style={enter(0.7)}>
          <button
            className="btn w-100 rounded-4 fw-semibold bg-brand fs-18"
          >
            Review Transfer
          </button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div
        style={enter(0.8)}
        className="glass-card border-top border-secondary border-opacity-10 px-3 py-2 d-flex justify-content-around align-items-center"
      >

        <div className="d-flex flex-column align-items-center gap-1 text-lime">
          <House size={22} />
          <small>Home</small>
        </div>

        <div className="d-flex flex-column align-items-center gap-1 text-white-50">
          <Receipt size={22} />
          <small>Transactions</small>
        </div>

        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: 52,
            height: 52,
            background: '#D9FF43',
            marginTop: -24,
          }}
        >
          <RefreshCcw color="#000" size={24} />
        </div>

        <div className="d-flex flex-column align-items-center gap-1 text-white-50">
          <CreditCard size={22} />
          <small>Cards</small>
        </div>

        <div className="d-flex flex-column align-items-center gap-1 text-white-50">
          <User size={22} />
          <small>Profile</small>
        </div>
      </div>
    </div>
  )
}

export default SendMoney