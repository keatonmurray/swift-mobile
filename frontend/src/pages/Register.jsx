import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  MdArrowBack,
  MdOutlineEmail,
  MdOutlinePerson,
  MdOutlinePublic,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
  MdKeyboardArrowDown,
} from "react-icons/md"

import {countries} from "../constants/countries"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
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
    <div className="min-vh-100 d-flex flex-column overflow-hidden bg-main-pallette">
      {/* Header */}
      <header
        className="px-4 pt-5 pb-3"
        style={enter(0)}
      >
        <Link
          to="/"
          className="d-inline-flex align-items-center justify-content-center text-white text-decoration-none"
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <MdArrowBack size={20} />
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow-1">
        <div className="container p-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-7 col-lg-5">
              {/* Eyebrow */}
              <span
                className="text-uppercase fw-semibold"
                style={{
                  ...enter(0.05),
                  color: "#D9FF43",
                  letterSpacing: "0.18em",
                  fontSize: 12,
                  display: "inline-block",
                }}
              >
                Create account
              </span>

              {/* Heading */}
              <h1
                className="text-white mt-2 mb-0"
                style={{
                  ...enter(0.1),
                  fontSize: "clamp(2.2rem, 9vw, 2.75rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  fontWeight: 500,
                }}
              >
                Get started
                <br />
                <span style={{ color: "#D9FF43" }}>
                  in minutes.
                </span>
              </h1>

              {/* Subtext */}
              <p
                className="mt-4 mb-5"
                style={{
                  ...enter(0.15),
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: "34ch",
                }}
              >
                Set up your Swift account. We'll guide you
                through verification next.
              </p>

              {/* Form */}
              <form style={enter(0.2)}>
                {/* Personal Info */}
                <div className="mb-5">
                  <p
                    className="text-uppercase fw-semibold mb-3"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                    }}
                  >
                    Personal info
                  </p>

                  {/* First Name */}
                  <div className="mb-3">
                    <label
                      className="form-label text-uppercase fw-semibold ps-1"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                      }}
                    >
                      First name
                    </label>

                    <div
                      className="d-flex align-items-center gap-3 px-3"
                      style={{
                        height: 56,
                        borderRadius: 12,
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        background:
                          "rgba(255,255,255,0.05)",
                      }}
                    >
                      <MdOutlinePerson
                        size={18}
                        style={{
                          color: "rgba(255,255,255,0.4)",
                        }}
                      />

                      <input
                        type="text"
                        className="form-control border-0 bg-transparent text-white shadow-none p-0"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="mb-3">
                    <label
                      className="form-label text-uppercase fw-semibold ps-1"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Last name
                    </label>

                    <div
                      className="d-flex align-items-center gap-3 px-3"
                      style={{
                        height: 56,
                        borderRadius: 12,
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        background:
                          "rgba(255,255,255,0.05)",
                      }}
                    >
                      <MdOutlinePerson
                        size={18}
                        style={{
                          color: "rgba(255,255,255,0.4)",
                        }}
                      />

                      <input
                        type="text"
                        className="form-control border-0 bg-transparent text-white shadow-none p-0"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label
                      className="form-label text-uppercase fw-semibold ps-1"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Country
                    </label>

                    <div
                      className="d-flex align-items-center gap-3 px-3"
                      style={{
                        height: 56,
                        borderRadius: 12,
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        background:
                          "rgba(255,255,255,0.05)",
                      }}
                    >
                      <MdOutlinePublic
                        size={18}
                        style={{
                          color: "rgba(255,255,255,0.4)",
                        }}
                      />

                      <select
                        className="form-select border-0 bg-transparent text-white shadow-none p-0"
                        defaultValue=""
                      >
                        <option
                          value=""
                          disabled
                          selected
                          className="bg-dark"
                        >
                          Select your country
                        </option>

                        {countries.map((country) => (
                          <option
                            key={country.code}
                            value={country.code}
                            className="bg-dark"
                          >
                            {country.name}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="mb-5">
                  <p
                    className="text-uppercase fw-semibold mb-3"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                    }}
                  >
                    Account details
                  </p>

                  {/* Email */}
                  <div>
                    <label
                      className="form-label text-uppercase fw-semibold ps-1"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Email
                    </label>

                    <div
                      className="d-flex align-items-center gap-3 px-3"
                      style={{
                        height: 56,
                        borderRadius: 12,
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        background:
                          "rgba(255,255,255,0.05)",
                      }}
                    >
                      <MdOutlineEmail
                        size={18}
                        style={{
                          color: "rgba(255,255,255,0.4)",
                        }}
                      />

                      <input
                        type="email"
                        className="form-control border-0 bg-transparent text-white shadow-none p-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="mb-5">
                  <p
                    className="text-uppercase fw-semibold mb-3"
                    style={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: 12,
                      letterSpacing: "0.12em",
                    }}
                  >
                    Security
                  </p>

                  {/* Password */}
                  <div className="mb-3">
                    <label
                      className="form-label text-uppercase fw-semibold ps-1"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Password
                    </label>

                    <div
                      className="d-flex align-items-center gap-3 px-3"
                      style={{
                        height: 56,
                        borderRadius: 12,
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        background:
                          "rgba(255,255,255,0.05)",
                      }}
                    >
                      <MdLockOutline
                        size={18}
                        style={{
                          color: "rgba(255,255,255,0.4)",
                        }}
                      />

                      <input
                        type={
                          showPassword ? "text" : "password"
                        }
                        className="form-control border-0 bg-transparent text-white shadow-none p-0"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="btn border-0 p-0 shadow-none"
                        style={{
                          color:
                            "rgba(255,255,255,0.4)",
                        }}
                      >
                        {showPassword ? (
                          <MdVisibilityOff size={20} />
                        ) : (
                          <MdVisibility size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      className="form-label text-uppercase fw-semibold ps-1"
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: 12,
                        letterSpacing: "0.06em",
                      }}
                    >
                      Confirm password
                    </label>

                    <div
                      className="d-flex align-items-center gap-3 px-3"
                      style={{
                        height: 56,
                        borderRadius: 12,
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        background:
                          "rgba(255,255,255,0.05)",
                      }}
                    >
                      <MdLockOutline
                        size={18}
                        style={{
                          color: "rgba(255,255,255,0.4)",
                        }}
                      />

                      <input
                        type={
                          showConfirm ? "text" : "password"
                        }
                        className="form-control border-0 bg-transparent text-white shadow-none p-0"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirm(!showConfirm)
                        }
                        className="btn border-0 p-0 shadow-none"
                        style={{
                          color:
                            "rgba(255,255,255,0.4)",
                        }}
                      >
                        {showConfirm ? (
                          <MdVisibilityOff size={20} />
                        ) : (
                          <MdVisibility size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn w-100 fw-semibold border-0"
                  style={{
                    height: 56,
                    borderRadius: 999,
                    background: "#D9FF43",
                    color: "#000",
                    boxShadow:
                      "0 8px 30px rgba(217,255,67,0.28)",
                  }}
                >
                  Create account
                </button>
              </form>

              {/* Login */}
              <p
                className="text-center mt-4 mb-0"
                style={{
                  ...enter(0.3),
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
          </div>
        </div>
      </main>
    </div>
  )
}

export default Register