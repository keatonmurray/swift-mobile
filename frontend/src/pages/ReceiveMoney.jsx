import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  CircleHelp,
  ChevronDown,
  X,
  Funnel,
  ChevronRight,
  House,
  Receipt,
  RefreshCcw,
  CreditCard,
  User,
  ArrowDownToLine,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ReceiveMoney = () => {

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

  const transactions = [
    {
      day: 'Today',
      items: [
        {
          initials: 'JS',
          flag: '🇪🇺',
          name: 'James Smith',
          account: 'EUR',
          note: 'Thank you!',
          amount: '+€924.35',
        },
        {
          initials: 'AW',
          flag: '🇺🇸',
          name: 'Anna Williams',
          account: 'USD',
          note: 'For dinner',
          amount: '+$150.00',
        },
        {
          initials: 'MR',
          flag: '🇬🇧',
          name: 'Michael Roberts',
          account: 'GBP',
          note: 'Here you go',
          amount: '+£320.50',
        },
      ],
    },
    {
      day: 'Yesterday',
      items: [
        {
          initials: 'SC',
          flag: '🇨🇦',
          name: 'Sophie Chen',
          account: 'CAD',
          note: 'Happy birthday!',
          amount: '+$75.20',
        },
        {
          initials: 'DL',
          flag: '🇦🇺',
          name: 'David Lee',
          account: 'AUD',
          note: 'For the tickets',
          amount: '+$200.00',
        },
      ],
    },
    {
      day: 'Jun 3, 2025',
      items: [
        {
          initials: 'ET',
          flag: '🇪🇺',
          name: 'Emma Thompson',
          account: 'EUR',
          note: 'Monthly support',
          amount: '+€500.00',
        },
      ],
    },
  ]

  return (
    <div className="bg-main-pallette min-vh-100 text-white d-flex flex-column">

      {/* CONTENT */}
      <div className="container-fluid px-4 pt-4 pb-5 flex-grow-1">

        {/* HEADER */}
        <div
          style={enter(0)}
          className="d-flex justify-content-between align-items-center mb-5"
        >
          <Link to="/dashboard"
            className="btn btn-dark rounded-circle d-flex top-cta-btn align-items-center justify-content-center"
          >
            <ChevronLeft size={18} color="white" />
          </Link>

          <h4 className="mb-0 fw-semibold">
            Receive Money
          </h4>

          <button
            className="btn btn-dark rounded-circle d-flex top-cta-btn align-items-center justify-content-center"
          >
            <CircleHelp size={18} color="white" />
          </button>
        </div>

        {/* TOTAL RECEIVED */}
        <div
          style={enter(0.1)}
          className="mb-4"
        >
          <p className="text-white-50 mb-2 fs-14">
            Total received
          </p>

          <div className="d-flex align-items-center gap-3 mb-2">

            <h1
              className="fw-semibold mb-0 fs-34 ls-2"
            >
              $3,245.89
            </h1>

            <button
              className="btn glass-card btn-sm text-white rounded-4 d-flex align-items-center gap-2"
            >
              This month
              <ChevronDown size={16} />
            </button>
          </div>

          <p className="mb-0 text-white-50 mb-2 fs-14">
            <span className="text-success">↑</span> $520.40 more than last month
          </p>
        </div>

        {/* FILTERS */}
        <div
          style={enter(0.3)}
          className="d-flex justify-content-between align-items-center mb-4"
        >

          <div className="d-flex gap-2">

            <button
              className="btn rounded-pill fw-semibold"
              style={{
                background: '#D9FF43',
                color: '#000',
                paddingInline: 22,
                height: 42,
              }}
            >
              All
            </button>

            <button
              className="btn glass-card text-white rounded-pill"
              style={{
                height: 42,
                paddingInline: 22,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              Received
            </button>

            <button
              className="btn glass-card text-white rounded-pill"
              style={{
                height: 42,
                paddingInline: 22,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              Pending
            </button>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div style={enter(0.4)}>

          {transactions.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="mb-4"
            >

              <h6 className="text-white-50 mb-3">
                {group.day}
              </h6>

              <div className="d-flex flex-column gap-2">

                {group.items.map((item, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-4 p-3 d-flex justify-content-between align-items-center"
                    style={{
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >

                    <div className="d-flex align-items-center gap-3">

                      {/* AVATAR */}
                      <div className="position-relative">

                        <div
                          className="rounded-circle icon-rounded d-flex align-items-center justify-content-center fw-semibold"
                          style={{
                            background: 'rgba(255,255,255,0.06)',
                          }}
                        >
                          {item.initials}
                        </div>

                        <div
                          className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: 22,
                            height: 22,
                            background: '#111',
                            fontSize: 12,
                          }}
                        >
                          {item.flag}
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div>
                        <h5 className="fw-semibold mb-1 fs-14">
                          {item.name}
                        </h5>

                        <p className="mb-1 text-white-50 fs-12">
                          From {item.account} account
                        </p>

                        <p className="mb-0 text-white-50 fs-12 fst-italic">
                          "{item.note}"
                        </p>
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div className="d-flex align-items-center gap-3">

                      <div className="text-end">
                        <h5
                          className="fw-semibold mb-1 fs-12"
                          style={{
                            color: '#14D19B',
                          }}
                        >
                          {item.amount}
                        </h5>

                        <p
                          className="mb-0 fw-medium fs-12"
                          style={{
                            color: '#14D19B',
                            fontSize: 14,
                          }}
                        >
                          Received
                        </p>
                      </div>

                      <ChevronRight
                        className="text-white-50"
                        size={18}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div
          style={enter(0.5)}
          className="text-center mt-4"
        >
          <button className="btn btn-branded w-100 text-decoration-none fw-semibold">
            Load more
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

export default ReceiveMoney