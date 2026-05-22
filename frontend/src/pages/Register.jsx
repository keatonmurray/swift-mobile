import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import {
  MdArrowBack,
  MdOutlineEmail,
  MdOutlinePerson,
  MdOutlinePublic,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md"

import { countries } from "../constants/countries"

const Register = () => {
  const navigate = useNavigate()

  const [visible, setVisible] = useState(false)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("")

  const [showPassword, setShowPassword] =
    useState(false)

  const [showConfirm, setShowConfirm] =
    useState(false)

  const [submitting, setSubmitting] =
    useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)

    return () => clearTimeout(t)
  }, [])

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateY(0)"
      : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (submitting) return

    setSubmitting(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/register`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          account_type: "personal",
          password,
          password_confirmation:
            passwordConfirmation,
          country,
        }
      )

      toast.success(
        response.data.message ??
          "Account created"
      )

      navigate("/login")
    } catch (error) {
      if (
        error.response?.status === 422 &&
        error.response.data?.errors
      ) {
        Object.values(
          error.response.data.errors
        ).forEach((msgs) =>
          msgs.forEach((msg) =>
            toast.error(msg)
          )
        )
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong"
        )
      }
    } finally {
      setSubmitting(false)
    }
  }

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
          to="/select-account-type"
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
            Create account
          </span>
        </div>

        {/* Heading */}
        <div style={enter(0.05)} className="mt-2">
          <h1
            className="text-white mb-0"
            style={{
              fontSize:
                "clamp(2.2rem, 9vw, 2.75rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            Get started
            <br />
            <span
              style={{ color: "#D9FF43" }}
            >
              in minutes.
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <div
          style={enter(0.15)}
          className="mt-3 mb-5"
        >
          <p
            className="mb-0"
            style={{
              color:
                "rgba(255,255,255,0.72)",
              maxWidth: 340,
              fontSize: 15,
            }}
          >
            Set up your Swift account.
            We'll guide you through
            verification next.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={enter(0.2)}
        >
          {/* Personal Info */}
          <div className="mb-5">
            <p
              className="text-uppercase fw-semibold mb-3"
              style={{
                color:
                  "rgba(255,255,255,0.3)",
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
                  color:
                    "rgba(255,255,255,0.4)",
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
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                />

                <input
                  type="text"
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(
                      e.target.value
                    )
                  }
                  className="form-control border-0 bg-transparent text-white shadow-none p-0"
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label
                className="form-label text-uppercase fw-semibold ps-1"
                style={{
                  color:
                    "rgba(255,255,255,0.4)",
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
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                />

                <input
                  type="text"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(
                      e.target.value
                    )
                  }
                  className="form-control border-0 bg-transparent text-white shadow-none p-0"
                  required
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label
                className="form-label text-uppercase fw-semibold ps-1"
                style={{
                  color:
                    "rgba(255,255,255,0.4)",
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
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                />

                <select
                  value={country}
                  onChange={(e) =>
                    setCountry(
                      e.target.value
                    )
                  }
                  className="form-select border-0 bg-transparent text-white shadow-none p-0"
                  required
                >
                  <option
                    value=""
                    disabled
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
                color:
                  "rgba(255,255,255,0.3)",
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
                  color:
                    "rgba(255,255,255,0.4)",
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
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  className="form-control border-0 bg-transparent text-white shadow-none p-0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="mb-5">
            <p
              className="text-uppercase fw-semibold mb-3"
              style={{
                color:
                  "rgba(255,255,255,0.3)",
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
                  color:
                    "rgba(255,255,255,0.4)",
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
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  className="form-control border-0 bg-transparent text-white shadow-none p-0"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="btn border-0 p-0 shadow-none"
                  style={{
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                >
                  {showPassword ? (
                    <MdVisibilityOff
                      size={20}
                    />
                  ) : (
                    <MdVisibility
                      size={20}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="form-label text-uppercase fw-semibold ps-1"
                style={{
                  color:
                    "rgba(255,255,255,0.4)",
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
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                />

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  value={
                    passwordConfirmation
                  }
                  onChange={(e) =>
                    setPasswordConfirmation(
                      e.target.value
                    )
                  }
                  className="form-control border-0 bg-transparent text-white shadow-none p-0"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(
                      !showConfirm
                    )
                  }
                  className="btn border-0 p-0 shadow-none"
                  style={{
                    color:
                      "rgba(255,255,255,0.4)",
                  }}
                >
                  {showConfirm ? (
                    <MdVisibilityOff
                      size={20}
                    />
                  ) : (
                    <MdVisibility
                      size={20}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="btn w-100 fw-semibold border-0"
            style={{
              height: 56,
              borderRadius: 999,
              background: "#D9FF43",
              color: "#000",
              boxShadow:
                "0 8px 30px rgba(217,255,67,0.28)",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        {/* Login */}
        <p
          className="text-center mt-4 mb-0"
          style={{
            ...enter(0.3),
            color:
              "rgba(255,255,255,0.5)",
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
      </main>
    </div>
  )
}

export default Register