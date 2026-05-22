import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  MdOutlinePerson,
  MdKeyboardArrowRight,
  MdArrowBack,
} from "react-icons/md"
import { HiOutlineBriefcase } from "react-icons/hi"

const SelectAccountType = () => {
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState("personal")

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  const options = [
    {
      id: "personal",
      to: "/register",
      icon: MdOutlinePerson,
      title: "Personal",
      desc: "For individuals and personal use",
    },
    {
      id: "business",
      to: "/register",
      icon: HiOutlineBriefcase,
      title: "Business",
      desc: "For companies and organizations",
      comingSoon: true,
    },
  ]

  const active = options.find((o) => o.id === selected) ?? options[0]

  return (
    <div
      className="min-vh-100 d-flex flex-column position-relative overflow-hidden px-3 bg-main-pallette"
    >
      {/* Header */}
      <header
        className="d-flex align-items-center pt-5 pb-3"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        <Link
          to="/"
          className="d-inline-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none top-cta-btn"
        >
          <MdArrowBack size={20} />
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow-1 d-flex flex-column pb-4">
        {/* Eyebrow */}
        <div style={enter(0)}>
          <span
            className="text-uppercase fw-semibold"
            style={{
              letterSpacing: "0.18em",
              color: "#D9FF43",
              fontSize: 12,
            }}
          >
            Welcome
          </span>
        </div>

        {/* Heading */}
        <div style={enter(0.05)} className="mt-2">
          <h1
            className="text-white mb-0"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 2.75rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            Choose your
            <br />
            <span style={{ color: "#D9FF43" }}>account type.</span>
          </h1>
        </div>

        {/* Subtext */}
        <div style={enter(0.15)} className="mt-3 mb-5">
          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,0.72)",
              maxWidth: 340,
              fontSize: 15,
            }}
          >
            Tell us a bit about yourself so we can tailor the
            experience.
          </p>
        </div>

        {/* Options */}
        <div style={enter(0.25)} className="d-flex flex-column gap-3">
          {options.map((opt) => {
            const Icon = opt.icon
            const isActive = selected === opt.id

            return (
              <button
                key={opt.id}
                type="button"
                disabled={opt.comingSoon}
                onClick={() => setSelected(opt.id)}
                className="w-100 border-0 text-start d-flex align-items-center gap-3"
                style={{
                  padding: 20,
                  borderRadius: 20,
                  background: isActive
                    ? "rgba(217,255,67,0.08)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(217,255,67,0.6)"
                    : "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  opacity: opt.comingSoon ? 0.6 : 1,
                  cursor: opt.comingSoon ? "not-allowed" : "pointer",
                  transition: "0.25s ease",
                }}
              >
                {/* Icon */}
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: isActive
                      ? "#D9FF43"
                      : "rgba(255,255,255,0.08)",
                    color: isActive ? "#000" : "#fff",
                  }}
                >
                  <Icon size={24} />
                </div>

                {/* Content */}
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <h6
                      className="mb-0 text-white"
                      style={{ fontSize: 16 }}
                    >
                      {opt.title}
                    </h6>

                    {opt.comingSoon && (
                      <span
                        style={{
                          fontSize: 11,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        Soon
                      </span>
                    )}
                  </div>

                  <p
                    className="mb-0 mt-1"
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: 14,
                    }}
                  >
                    {opt.desc}
                  </p>
                </div>

                {/* Radio */}
                <div
                  className="d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: isActive ? "#D9FF43" : "transparent",
                    border: isActive
                      ? "none"
                      : "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  {isActive && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#000",
                      }}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <div style={enter(0.35)} className="mt-4">
          <Link
            to={active.comingSoon ? "#" : active.to}
            className="w-100 d-flex align-items-center justify-content-center text-decoration-none fw-semibold"
            style={{
              height: 56,
              borderRadius: 999,
              background: active.comingSoon
                ? "rgba(255,255,255,0.3)"
                : "#D9FF43",
              color: "#000",
              pointerEvents: active.comingSoon ? "none" : "auto",
              boxShadow: active.comingSoon
                ? "none"
                : "0 8px 30px rgba(217,255,67,0.28)",
              transition: "0.25s ease",
            }}
          >
            Continue
            <MdKeyboardArrowRight size={20} className="ms-1" />
          </Link>

          <p
            className="text-center mt-4 mb-0"
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-semibold text-white"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default SelectAccountType