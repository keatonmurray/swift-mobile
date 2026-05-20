import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  CircleHelp,
  Wallet,
  Landmark,
  ChevronDown,
  Shield,
  House,
  Receipt,
  RefreshCcw,
  CreditCard,
  User,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Recipient = () => {

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
          <Link to="/send-money"
            className="btn top-cta-btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
          >
            <ChevronLeft size={18} color="white" />
          </Link>

          <h4 className="mb-0 fw-semibold">
            Recipient
          </h4>

          <Link
            className="btn top-cta-btn btn-dark rounded-circle d-flex align-items-center justify-content-center"
          >
            <CircleHelp size={18} color="white" />
          </Link>
        </div>

        {/* TRANSFER TYPE */}
        <div
          style={enter(0.1)}
          className="mb-5"
        >
          <p className="text-white-50 mb-3 fs-14">
            Choose transfer type
          </p>

          <div className="row g-3">

            {/* E-WALLET */}
            <div className="col-6">
              <div
                className="glass-card rounded-4 p-3 h-100 d-flex align-items-center"
                style={{
                  border: '1px solid #D9FF43',
                }}
              >
                <div className="d-flex align-items-center gap-3">

                  <div>
                    <h6 className="fw-semibold mb-1 text-lime">
                      E-wallet
                    </h6>

                    <p className="mb-0 text-white-50 fs-14">
                      Send to e-wallet
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BANK */}
            <div className="col-6">
              <div
                className="glass-card rounded-4 p-3 h-100 d-flex align-items-center border border-secondary border-opacity-10"
              >
                <div className="d-flex align-items-center gap-3">

                  <div>
                    <h6 className="fw-semibold mb-1">
                      Direct to bank
                    </h6>

                    <p className="mb-0 text-white-50 fs-14">
                      Send to bank account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* E-WALLET DETAILS */}
        <div
          style={enter(0.2)}
          className="mb-4"
        >
          <h4 className="fw-semibold mb-4">
            E-wallet details
          </h4>

          {/* PROVIDER */}
          <div className="mb-4">

            <p className="text-white-50 mb-2 fs-14">
              E-wallet provider
            </p>

            <div
              className="glass-card rounded-4 px-4 d-flex align-items-center justify-content-between"
              style={{
                height: 62,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span className="text-white-50">
                Select e-wallet provider
              </span>

              <ChevronDown
                size={20}
                className="text-white-50"
              />
            </div>
          </div>

          {/* MOBILE NUMBER */}
          <div className="mb-4">

            <p className="text-white-50 mb-2 fs-14">
              E-wallet mobile number
            </p>

            <div
              className="glass-card rounded-4 d-flex align-items-center"
              style={{
                height: 62,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >

              <div className="d-flex align-items-center gap-2 px-3">
                <span className="fs-4">
                  🇵🇭
                </span>

                <span className="fw-medium">
                  +63
                </span>

                <ChevronDown
                  size={16}
                  className="text-white-50"
                />
              </div>

              <div
                className="h-100"
                style={{
                  width: 1,
                  background: 'rgba(255,255,255,0.08)',
                }}
              />

              <input
                type="text"
                className="form-control bg-transparent border-0 text-white shadow-none h-100 px-3"
              />
            </div>

            <p className="text-white-50 fs-14 mt-2 mb-0">
              Make sure the number is registered to the e-wallet.
            </p>
          </div>

          {/* RECIPIENT NAME */}
          <div className="mb-4">

            <p className="text-white-50 mb-2 fs-14">
              Recipient name
            </p>

            <input
              type="text"
              className="form-control glass-card border-0 text-white shadow-none rounded-4 px-4"
              style={{
                height: 62,
                background: 'rgba(255,255,255,0.03)',
              }}
            />

            <p className="text-white-50 fs-14 mt-2 mb-0">
              Name as shown on the e-wallet account
            </p>
          </div>

          {/* NICKNAME */}
          <div className="mb-4">

            <p className="text-white-50 mb-2 fs-14">
              Nickname (optional)
            </p>

            <input
              type="text"
              className="form-control glass-card border-0 text-white shadow-none rounded-4 px-4"
              style={{
                height: 62,
                background: 'rgba(255,255,255,0.03)',
              }}
            />

            <p className="text-white-50 fs-14 mt-2 mb-0">
              Easier to find next time
            </p>
          </div>
        </div>

        {/* SECURITY */}
        <div
          style={enter(0.3)}
          className="mb-4"
        >
          <div
            className="glass-card rounded-4 p-3 d-flex align-items-center gap-3"
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 95,
                height: 60,
                background: 'rgba(217,255,67,0.08)',
              }}
            >
              <Shield
                color="#D9FF43"
                size={26}
              />
            </div>

            <div>
              <h5 className="fw-semibold mb-1 fs-18">
                Your transfers are secure
              </h5>

              <p className="mb-0 text-white-50 fs-12">
                We use industry-standard encryption to
                keep your information safe.
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div style={enter(0.4)}>
          <button
            className="btn w-100 rounded-4 fw-semibold"
            style={{
              height: 62,
              background: '#D9FF43',
              color: '#000',
              fontSize: 18,
            }}
          >
            Save Recipient
          </button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div
        style={enter(0.5)}
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
          <RefreshCcw
            color="#000"
            size={24}
          />
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

export default Recipient