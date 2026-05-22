import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  CircleHelp,
  House,
  Receipt,
  RefreshCcw,
  CreditCard,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Landmark,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Transactions = () => {

  const userId = localStorage.getItem('user_id')
  const [visible, setVisible] = useState(false)
  const [transactions, setTransactions] = useState([])
  const token = localStorage.getItem("api_token")

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

 const getTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/get-wallet-transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setTransactions(response.data.transactions ?? [])

      console.log(response.data.transactions)

    } catch (error) {
      console.error("Transaction fetch error:", error)
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const formattedTransactions = transactions.map((tx) => ({
    type:
      tx.type === 'p2p_transfer'
        ? 'sent'
        : 'received',

    name:
      tx.type === 'p2p_transfer'
        ? 'Wallet Transfer'
        : 'Incoming Transfer',

    date: new Date(tx.created_at * 1000).toLocaleString(),

    amount: `${
      tx.type === 'p2p_transfer' ? '-' : '+'
    }${Number(tx.amount).toFixed(2)} ${tx.currency}`,

    status: tx.status,
  }))

  const renderIcon = (type) => {

    if (type === 'sent') {
      return (
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: 58,
            height: 58,
            background: 'rgba(157,255,0,0.12)',
          }}
        >
          <ArrowUpRight color="#B6FF3B" size={28} />
        </div>
      )
    }

    if (type === 'received') {
      return (
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: 58,
            height: 58,
            background: 'rgba(59,130,246,0.12)',
          }}
        >
          <ArrowDownLeft color="#60A5FA" size={28} />
        </div>
      )
    }

    return (
      <div
        className="rounded-circle d-flex align-items-center justify-content-center"
        style={{
          width: 58,
          height: 58,
          background: 'rgba(217,255,67,0.08)',
        }}
      >
        <Landmark color="#D9FF43" size={26} />
      </div>
    )
  }

  return (
    <div className="bg-main-pallette min-vh-100 text-white d-flex flex-column pb-5">

      {/* CONTENT */}
      <div className="container-fluid px-4 pt-4 pb-5 flex-grow-1">

        {/* HEADER */}
        <div
          style={enter(0)}
          className="d-flex justify-content-between align-items-center mb-4"
        >

          <Link
            to={`/dashboard/${userId}`}
            className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center top-cta-btn"
          >
            <ChevronLeft size={18} color="white" />
          </Link>

          <h4 className="mb-0 fw-semibold">
            Transactions
          </h4>

          <Link
            to="#"
            className="btn btn-dark rounded-circle top-cta-btn d-flex align-items-center justify-content-center"
          >
            <CircleHelp size={18} color="white" />
          </Link>
        </div>

        {/* FILTERS */}
        <div
            style={enter(0.1)}
            className="p-1 rounded-4 border border-secondary border-opacity-10 d-flex mb-4"
        >

        <button
            className="btn flex-fill rounded-4 py-2 fw-semibold text-white"
            style={{
            background: 'rgba(255,255,255,0.04)',
            fontSize: 14,
            }}
        >
            All
        </button>

        <button
            className="btn flex-fill rounded-4 py-2 text-white-50"
            style={{
            fontSize: 14,
            }}
        >
            Received
        </button>
        </div>

        {/* MONTH */}
        <div style={enter(0.2)} className="mb-2">
          <p className="text-white-50 fs-15 mb-0">
            This month
          </p>
        </div>
        {/* TRANSACTIONS */}
        <div className="d-flex flex-column gap-3">

        {formattedTransactions.map((transaction, index) => (
          <div
            key={index}
            style={enter(0.25 + index * 0.1)}
            className="glass-card p-3 rounded-4 border border-secondary border-opacity-10"
          >
            <div className="d-flex justify-content-between align-items-center">

              <div className="d-flex align-items-center gap-3">

                {renderIcon(transaction.type)}

                <div>
                  <h6 className="mb-1 fw-semibold fs-16">
                    {transaction.name}
                  </h6>

                  <p className="mb-0 text-white-50 fs-12">
                    {transaction.date}
                  </p>
                </div>
              </div>

              <div className="text-end">

                <h6 className="mb-1 fw-light fs-15">
                  {transaction.amount}
                </h6>

                <p
                  className="mb-0 fw-medium fs-12"
                  style={{
                    color:
                      transaction.status === 'CLOSED'
                        ? '#4ADE80'
                        : '#FACC15',
                  }}
                >
                  {transaction.status}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions