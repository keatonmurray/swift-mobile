import {
  ArrowLeft,
  HelpCircle,
  Wallet,
  Landmark,
  CreditCard,
  Smartphone,
  Shield,
  ChevronRight,
  Home,
  ReceiptText,
  ArrowUpDown,
  User,
  ChevronLeft,
  CircleHelp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const methods = [
  {
    title: 'Bank Transfer',
    subtitle: 'Transfer from your bank account.',
    time: '1–3 business days',
    icon: <Landmark size={24} />,
    active: true,
    recommended: true,
  },
  {
    title: 'Debit / Credit Card',
    subtitle: 'Add instantly using your card.',
    time: 'Instant',
    icon: <CreditCard size={24} />,
  },
  {
    title: 'E-Wallet',
    subtitle: 'Add instantly from your e-wallet.',
    time: 'Instant',
    icon: <Smartphone size={24} />,
  },
]

const quickAmounts = [50, 100, 250, 500]

const AddMoney = () => {
  return (
    <div
      className="min-vh-100 text-white position-relative overflow-hidden bg-main-pallette"
    >

      {/* BACKGROUND GLOW */}
      <div
        style={{
          position: 'absolute',
          right: '-120px',
          top: '220px',
          width: '320px',
          height: '320px',
          background: '#00FFC2',
          opacity: 0.18,
          filter: 'blur(120px)',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      <div
        className="position-relative"
        style={{
          zIndex: 2,
          padding: '28px 20px 120px',
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-5">
         <Link to="/dashboard"
            className="btn btn-dark rounded-circle d-flex top-cta-btn align-items-center justify-content-center"
          >
            <ChevronLeft size={18} color="white" />
          </Link>
            <h4 className="mb-0 fw-semibold">Add Money</h4>
            
            <button
                className="btn btn-dark rounded-circle d-flex top-cta-btn align-items-center justify-content-center"
                >
                <CircleHelp size={18} color="white" />
            </button>
        </div>

        {/* ADD TO */}
        <div className="mb-4">

          <p
            className="text-white-50 mb-3"
            style={{ fontSize: 15 }}
          >
            Add to
          </p>

          <div
            className="d-flex justify-content-between align-items-center"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: '18px',
              backdropFilter: 'blur(18px)',
            }}
          >

            <div className="d-flex align-items-center gap-3">

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(214,255,0,0.08)',
                  color: '#D6FF00',
                }}
              >
                <Wallet size={24} />
              </div>

              <div>
                <h6 className="mb-1 fw-semibold">
                  Swift Balance
                </h6>

                <small className="text-white-50">
                  USD
                </small>
              </div>

            </div>

            <div className="text-end">

              <h4
                className="mb-1 fw-semibold fs-20"
                style={{
                  letterSpacing: '-1px',
                }}
              >
                $12,456.78
              </h4>

              <small className="text-white-50">
                Available Balance
              </small>

            </div>

          </div>

        </div>

        {/* METHODS */}
        <div className="mb-4">

          <p
            className="text-white-50 mb-3"
            style={{ fontSize: 15 }}
          >
            How would you like to add money?
          </p>

          <div className="d-flex flex-column gap-3">

            {methods.map((method, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center"
                style={{
                  padding: '18px',
                  borderRadius: 24,
                  border: method.active
                    ? '1px solid #D6FF00'
                    : '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(18px)',
                  boxShadow: method.active
                    ? '0 0 24px rgba(214,255,0,0.08)'
                    : 'none',
                }}
              >

                <div className="d-flex align-items-start gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: '50%',
                      background: 'rgba(214,255,0,0.08)',
                      color: '#D6FF00',
                    }}
                  >
                    {method.icon}
                  </div>

                    <div>
                        <p className="fs-16 text-white mb-1 fw-semibold">Bank Transfer</p>
                        <p
                        className="text-white-50 mb-0"
                        style={{
                            fontSize: 12,
                        }}
                        >
                        {method.subtitle}
                        </p>

                        <small className="text-white-50 fs-12">
                            {method.time}
                        </small>

                    </div>

                </div>

                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    border: method.active
                      ? 'none'
                      : '2px solid rgba(255,255,255,0.4)',
                    background: method.active
                      ? '#D6FF00'
                      : 'transparent',
                    color: '#000',
                  }}
                >
                  {method.active && '✓'}
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* AMOUNT */}
        <div className="mb-4">

          <p
            className="text-white-50 mb-3"
            style={{ fontSize: 15 }}
          >
            Enter amount
          </p>

          <div
            className="d-flex justify-content-between align-items-center mb-3"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: '8px 15px',
            }}
          >

            <div className="d-flex align-items-center gap-3">

              <div style={{ fontSize: 34 }}>
                🇺🇸
              </div>

              <h5 className="mb-0 fw-semibold">
                USD
              </h5>

            </div>

            <h1
              className="m-0 fw-bold fs-22"
              style={{
                letterSpacing: '-2px',
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              0.00
            </h1>

          </div>

          <div className="row g-3">

            {quickAmounts.map((amount) => (
              <div
                key={amount}
                className="col-3"
              >
                <button
                  className="w-100"
                  style={{
                    height: 50,
                    borderRadius: 18,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                    fontWeight: 600,
                  }}
                >
                  ${amount}
                </button>
              </div>
            ))}

          </div>

        </div>

        {/* SECURITY */}
        <div
          className="d-flex justify-content-between align-items-center mb-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: '18px',
          }}
        >

          <div className="d-flex align-items-center gap-3">

            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(214,255,0,0.08)',
                color: '#D6FF00',
              }}
            >
              <Shield size={24} />
            </div>

            <div>

              <h6 className="mb-1 fw-semibold">
                Secure & Reliable
              </h6>

              <p
                className="text-white-50 mb-0"
                style={{
                  fontSize: 14,
                }}
              >
                Your money is protected with bank-level security and encryption.
              </p>

            </div>

          </div>

          <ChevronRight className="text-white-50" />

        </div>

        {/* CTA */}
        <button
          className="w-100 border-0 fw-bold btn-branded"
        >
          Continue
        </button>

      </div>
    </div>
  )
}

export default AddMoney