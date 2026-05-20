import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ShieldCheck,
  CircleCheckBig,
  Clock3,
  House,
  Receipt,
  RefreshCcw,
  CreditCard,
  User,
  Quote
} from 'lucide-react'
import { Link } from 'react-router-dom'

const AcceptPayment = () => {

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

         <Link to="/receive-money"
            className="btn btn-dark rounded-circle d-flex top-cta-btn align-items-center justify-content-center"
          >
            <ChevronLeft size={18} color="white" />
          </Link>

          <h4 className="mb-0 fw-semibold">
            Receive Money
          </h4>

          <div style={{ width: 42 }} />
        </div>

        {/* AMOUNT */}
        <div
          style={enter(0.1)}
          className="text-center mb-5"
        >

          <div
            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{
              width: 96,
              height: 96,
              background: 'rgba(20,209,155,0.12)',
              border: '1px solid rgba(20,209,155,0.2)',
            }}
          >
            <CircleCheckBig
              size={48}
              color="#14D19B"
            />
          </div>

          <p className="text-white-50 mb-2 fs-14">
            Money sent to you by
          </p>

          <h1
              className="fw-semibold mb-0 fs-34 ls-2"
            >
            James Smith
            </h1>
        </div>

        {/* PAYMENT CARD */}
        <div
          style={enter(0.2)}
          className="glass-card rounded-4 p-4 mb-4"
          style={{
            ...enter(0.2),
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >

          <div className="d-flex justify-content-center align-items-center mb-2">
            <div>
              <p className="text-white-50 mb-1 fs-14 text-center">
                You will receive
              </p>

              <h1
              className="fw-semibold mb-0 fs-34 ls-2"
                >
                $3,245.89
                </h1>
            </div>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <span
                className="text-success d-flex align-items-center justify-content-center fs-12"
                style={{
                    borderRadius: '999px',
                    padding: '5px 14px',
                    borderColor: 'rgba(255, 255, 255, 0.06)',
                    background: 'rgba(25, 135, 84, 0.08)',
                    width: 'fit-content',
                    border: "1px solid rgba(255, 255, 255, 0.06)"
                }}
                >
                <CircleCheckBig size={20} className="me-2" />
                Verified sender
                </span>
          </div>
        </div>

        {/* PAYMENT CARD */}
        <div
          style={enter(0.2)}
          className="glass-card rounded-4 p-4 mb-4"
          style={{
            ...enter(0.2),
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <p className="text-white-50 mb-1 fs-14">
                Sender
              </p>

              <h5 className="fw-semibold mb-0 fs-16">
                James Smith
              </h5>
            </div>

            <div
              className="rounded-circle d-flex align-items-center justify-content-center fw-semibold"
              style={{
                width: 52,
                height: 52,
                background: 'rgba(255,255,255,0.06)',
              }}
            >
              JS
            </div>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span className="text-white-50">
              Currency
            </span>

            <span className="fw-medium fs-14">
              EUR Account
            </span>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span className="text-white-50">
              Fee
            </span>

            <span className="fw-medium fs-14">
              Free
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span className="text-white-50">
              Estimated arrival
            </span>

            <span className="fw-medium text-success fs-14">
              Instant
            </span>
          </div>
        </div>

        {/* MESSAGE CARD */}
        <div
          style={enter(0.2)}
          className="glass-card rounded-4 p-4 mb-4"
          style={{
            ...enter(0.2),
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >

          <div className="d-flex justify-content-start align-items-center mb-2">
            <div>
              <p className="text-white-50 mb-1 fs-14">
                Message from sender
              </p>

            </div>
          </div>


          <div className="d-flex justify-content-start mb-3 fs-14">
            Thank you!
          </div>
        </div>

        {/* SECURITY */}
        <div
          style={enter(0.3)}
          className="glass-card rounded-4 p-3 mb-4"
          style={{
            ...enter(0.3),
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >

          <div className="d-flex align-items-center gap-3">

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 54,
                height: 54,
                background: 'rgba(217,255,67,0.08)',
              }}
            >
              <ShieldCheck
                size={28}
                color="#D9FF43"
              />
            </div>

            <div>
              <h5 className="fw-semibold mb-1">
                Protected Transfer
              </h5>

              <p className="mb-0 text-white-50 fs-14">
                This payment is encrypted and secured
                by Swift.
              </p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div
          style={enter(0.4)}
          className="d-flex flex-column gap-3"
        >

          <button
            className="btn w-100 rounded-4 fw-semibold"
            style={{
              height: 62,
              background: '#D9FF43',
              color: '#000',
              fontSize: 18,
            }}
          >
            Accept Payment
          </button>

          <button
            className="btn glass-card w-100 rounded-4 text-white fw-medium"
            style={{
              height: 58,
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            Decline
          </button>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div
        style={enter(0.6)}
        className="glass-card border-top border-secondary border-opacity-10 px-3 py-2 d-flex justify-content-around align-items-center"
      >

        <div className="d-flex flex-column align-items-center gap-1 text-white-50">
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

export default AcceptPayment