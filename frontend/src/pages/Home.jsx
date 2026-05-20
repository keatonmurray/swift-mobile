import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  return (
    <div className="bg-main-pallette position-relative d-flex flex-column overflow-hidden min-vh-100">
      {/* Top Badge */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x rounded-pill px-4 py-2"
        style={{
          marginTop: "36px",
          zIndex: 10,
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          ✦ Trusted by 500k+ users
        </span>
      </div>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-4 pt-5 pb-4">
        {/* Logo */}
        <div style={enter(0)} className="mb-5">
          <img
            src="/img/logo-inverted.png"
            alt="Swift"
            style={{
              height: "36px",
              width: "auto",
            }}
          />
        </div>

        {/* Headline */}
        <div style={enter(0.1)} className="mb-4">
          <h1
            className="text-white m-0"
            style={{
              fontSize: "clamp(2.6rem, 11vw, 3.4rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              maxWidth: "340px",
            }}
          >
            Move money.
            <br />
            <span style={{ color: "#D9FF43" }}>Track finances.</span>
          </h1>
        </div>

        <br />

        {/* Subtext */}
        <div style={enter(0.2)} className="mb-5">
          <p
            className="mx-auto mb-0"
            style={{
              color: "rgba(255,255,255,0.72)",
              maxWidth: "260px",
              fontSize: "1rem",
              lineHeight: 1.5,
            }}
          >
            A gateway that operates accounting for you.
          </p>
        </div>

        <br />

        {/* Buttons */}
        <div
          style={enter(0.3)}
          className="d-flex flex-column gap-3 w-100"
        >
          <div className="mx-auto w-100" style={{ maxWidth: "340px" }}>
            <Link
              to="#"
              className="btn w-100 rounded-pill fw-semibold d-flex align-items-center justify-content-center"
              style={{
                height: "56px",
                background: "#D9FF43",
                color: "#000",
                boxShadow: "0 8px 30px rgba(217,255,67,0.28)",
                textDecoration: "none",
              }}
            >
              Create an Account
            </Link>

            <Link
              to="/dashboard"
              className="btn w-100 rounded-pill mt-3 d-flex align-items-center justify-content-center"
              style={{
                height: "56px",
                background: "rgba(255,255,255,0.07)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div
        className="px-4 pb-4 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 0.5s",
        }}
      >
        <p
          className="m-0"
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.78rem",
          }}
        >
          By continuing, you agree to our{" "}
          <span
            style={{
              color: "rgba(255,255,255,0.72)",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Terms
          </span>
          {" & "}
          <span
            style={{
              color: "rgba(255,255,255,0.72)",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  )
}

export default Home