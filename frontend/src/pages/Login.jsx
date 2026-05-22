import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import {
  MdArrowBack,
  MdOutlineEmail,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md"

const Login = () => {
  
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
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

  const handleLogin = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        { email, password, account_type: "personal" },
        { withCredentials: true }
      )

      if (response.data?.user) {
        localStorage.setItem("api_token", response.data.token)
        localStorage.setItem("user_id", response.data.user.id)
        localStorage.setItem("account_type", response.data.user.account_type)
        navigate(`/dashboard/${response.data.user.id}`)
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(error.response?.data?.message || "Invalid credentials")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex flex-column overflow-hidden bg-main-pallette">
      {/* Header */}
      <header
        className="px-4 pt-5 pb-3"
        style={enter(0)}
      >
        <Link
          to="/"
          className="d-inline-flex align-items-center justify-content-center text-white text-decoration-none top-cta-btn"
          style={{
            borderRadius: "50%",
          }}
        >
          <MdArrowBack size={20} />
        </Link>
      </header>

      {/* Main */}
      <main className="flex-grow-1 d-flex align-items-center">
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
                Welcome back
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
                Sign in to
                <br />
                <span style={{ color: "#D9FF43" }}>
                  your account.
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
                Enter your credentials to access your dashboard.
              </p>

              {/* Form */}
              <form
                onSubmit={handleLogin}
                style={enter(0.2)}>
                {/* Email */}
                <div className="mb-4">
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
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <MdOutlineEmail
                      size={18}
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      inputMode="email"
                      className="form-control border-0 bg-transparent text-white shadow-none p-0"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-2">
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
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <MdLockOutline
                      size={18}
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="form-control border-0 bg-transparent text-white shadow-none p-0"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="btn border-0 p-0 shadow-none"
                      style={{
                        color: "rgba(255,255,255,0.4)",
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

                {/* Forgot */}
                <div className="d-flex justify-content-end mb-4">
                  <span
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Forgot password?
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-100 fw-semibold border-0 btn-branded"
                >
                  Sign in
                </button>
              </form>

              {/* Register */}
              <p
                className="text-center mt-4 mb-0 text-white"
                style={{
                  ...enter(0.3),
                  fontSize: 13,
                }}
              >
                Don't have an account?{" "}
                <Link
                  to="/select-account-type"
                  className="fw-semibold text-white"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login