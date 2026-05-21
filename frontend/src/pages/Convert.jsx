import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  CircleHelp,
  ChevronDown,
  ArrowUpDown,
  House,
  Receipt,
  RefreshCcw,
  CreditCard,
  User,
  Info,
  Clock3,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Convert = () => {

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
          className="d-flex justify-content-between align-items-center mb-4"
        >
          <Link
            to="/dashboard"
            className="btn btn-dark rounded-circle d-flex top-cta-btn align-items-center justify-content-center"
          >
            <ChevronLeft size={18} color="white" />
          </Link>

          <h4 className="mb-0 fw-semibold">
            Convert
          </h4>

          <button
            className="btn btn-dark rounded-circle d-flex top-cta-btn align-items-center justify-content-center"
          >
            <CircleHelp size={18} color="white" />
          </button>
        </div>

        {/* FROM */}
        <div
          style={enter(0.1)}
          className="mb-1"
        >
          <p className="text-white-50 mb-2 fs-14">
            From
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
        </div>

        <br />

        {/* SWITCH BTN */}
        <div
          style={enter(0.15)}
          className="d-flex justify-content-center position-relative"
        >
          <button
            className="btn rounded-circle d-flex align-items-center justify-content-center position-absolute"
            style={{
              width: 52,
              height: 52,
              background: '#111',
              border: '1px solid rgba(255,255,255,0.08)',
              top: -8,
              zIndex: 2,
            }}
          >
            <ArrowUpDown size={18} color="#D9FF43" />
          </button>
        </div>

        <br />

        {/* TO */}
        <div
          style={enter(0.2)}
          className="mt-3"
        >
            <p className="text-white-50 mb-2 fs-14">
                To
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
        </div>

        {/* RATE */}
        <div
          style={enter(0.25)}
          className="d-flex justify-content-between align-items-center mb-4 px-1"
        >

          <div className="d-flex align-items-center gap-2">
            <p className="mb-0 text-white-50 fs-14 mt-2">
              1 USD = 0.9243 EUR
            </p>

            <Info size={14} className="text-white-50 mt-2" />
          </div>

          <div className="d-flex align-items-center gap-2">
            <p
              className="mb-0 fs-14 fw-medium mt-2"
              style={{
                color: '#D9FF43',
              }}
            >
              Rate updates in 45s
            </p>

            <Clock3
              className="mt-2"
              size={14}
              style={{
                color: '#D9FF43',
              }}
            />
          </div>
        </div>

        {/* CONVERSION DETAILS */}
        <div>
            <div
                style={enter(0.3)}
                className="glass-card rounded-4 mb-4"
                style={{
                    ...enter(0.3),
                    border: '1px solid rgba(255,255,255,0.06)',
                }}
            >
            {/* ROW */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                <p className="text-white-50 mb-0 fs-14 m-2">
                    Exchange rate
                </p>
                </div>

                <p className="mb-0 fw-medium fs-14 m-2">
                1 USD = 0.9243 EUR
                </p>
            </div>

            {/* ROW */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                    <p className="text-white-50 mb-0 fs-14 m-2">
                        Fee
                    </p>
                </div>

                <p className="mb-0 fw-medium m-2">
                $4.99 USD
                </p>
            </div>

            <hr
                style={{
                borderColor: 'rgba(255,255,255,0.08)',
                }}
            />

            {/* ROW */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p className="text-white-50 mb-0 fs-14 m-2">
                You'll receive
                </p>

                <p
                className="mb-0 fw-semibold m-2"
                style={{
                    color: '#D9FF43',
                }}
                >
                €924.35
                </p>
            </div>

                {/* ROW */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <p className="text-white-50 mb-0 fs-14 m-2">
                            You save
                        </p>

                    </div>

                    <p
                        className="mb-0 fw-medium m-2"
                        style={{
                            color: '#D9FF43',
                        }}
                        >
                        $12.36 vs other providers
                    </p>
                    </div>
                </div>
            </div>

        {/* CONVERSION METHOD */}
        <div
          style={enter(0.45)}
          className="mb-4"
        >

          <h5 className="fw-semibold mb-3">
            Conversion method
          </h5>

          {/* INSTANT */}
          <div
            className="rounded-4 p-3 mb-3"
            style={{
              border: '1px solid #D9FF43',
              background: 'rgba(217,255,67,0.03)',
            }}
          >

            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 48,
                    height: 48,
                    background: 'rgba(217,255,67,0.12)',
                  }}
                >
                  <Clock3 size={20} color="#D9FF43" />
                </div>

                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <h5 className="fw-semibold mb-0 fs-16">
                      Instant conversion
                    </h5>
                  </div>

                  <p className="text-white-50 mb-0 fs-14">
                    Convert now and get funds instantly.
                  </p>
                </div>
              </div>

              <div
                className="ms-2 rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: 27,
                  height: 24,
                  background: '#D9FF43',
                }}
              >
                <div
                  className="rounded-circle"
                  style={{
                    width: 10,
                    height: 10,
                    background: '#000',
                  }}
                />
              </div>
            </div>
          </div>

          {/* SCHEDULED */}
          <div
            className="glass-card rounded-4 p-3"
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >

            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-center gap-3">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: 55,
                    height: 48,
                    background: 'rgba(255,255,255,0.06)',
                  }}
                >
                  <Clock3 size={20} className="text-white-50" />
                </div>

                <div>
                  <h5 className="fw-semibold mb-1 fs-16">
                    Scheduled conversion
                  </h5>

                  <p className="text-white-50 mb-0 fs-14">
                    Choose a date and time for better rates.
                  </p>
                </div>
              </div>

              <div
                className="rounded-circle ms-2"
                style={{
                  width: 27,
                  height: 24,
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={enter(0.5)}
          className="mt-4"
        >
          <button className="btn btn-branded w-100 fw-semibold py-3 rounded-4 mb-4">
            Review Conversion
          </button>
        </div>

        <br />
      </div>
    </div>
  )
}

export default Convert