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

/* -----------------------------------------------------------
   Field primitives — same as Register, DESIGN.md text-input
----------------------------------------------------------- */
const FieldShell = ({ children }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      className={[
        "flex items-center gap-3 h-14 px-4 border backdrop-blur-md transition",
        focused
          ? "bg-white/[0.08] border-white/30"
          : "bg-white/[0.05] border-white/10",
      ].join(" ")}
      style={{ borderRadius: 12 }}
    >
      {children}
    </div>
  )
}

const FieldLabel = ({ children }) => (
  <span className="type-caption text-white/40 uppercase font-semibold tracking-[0.06em] pl-0.5">
    {children}
  </span>
)

const Field = ({
  icon: Icon,
  type = "text",
  label,
  value,
  onChange,
  required,
  autoComplete,
  inputMode,
  trailing,
}) => (
  <div className="flex flex-col gap-1.5">
    {label && <FieldLabel>{label}</FieldLabel>}
    <FieldShell>
      {Icon && <Icon size={18} className="text-white/40 shrink-0" />}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="flex-1 min-w-0 bg-transparent text-white placeholder-white/35 type-body-md outline-none border-0"
        style={{ caretColor: "#D9FF43" }}
      />
      {trailing}
    </FieldShell>
  </div>
)

const ToggleBtn = ({ show, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={show ? "Hide password" : "Show password"}
    className="text-white/40 hover:text-white transition p-1 shrink-0"
  >
    {show ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
  </button>
)

/* -----------------------------------------------------------
   Page
----------------------------------------------------------- */
const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
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
    <div className="bg-main-pallette relative flex flex-col overflow-hidden min-h-screen -mt-10">
      {/* Header */}
      <header
        className="px-6 pt-12 pb-4 flex items-center"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <Link
          to="/"
          aria-label="Back"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-white hover:bg-white/[0.12] transition"
        >
          <MdArrowBack size={20} />
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-center px-6 pb-10">
        {/* Eyebrow */}
        <div style={enter(0)} className="mb-3">
          <span className="type-caption text-brand uppercase tracking-[0.18em] font-semibold">
            Welcome back
          </span>
        </div>

        {/* Heading */}
        <div style={enter(0.05)}>
          <h1
            className="font-display text-white m-0"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 2.75rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            Sign in to
            <br />
            <span className="text-brand">your account.</span>
          </h1>
        </div>

        {/* Subtext */}
        <div style={enter(0.15)} className="mt-4 mb-10">
          <p className="type-body-md text-white/72 max-w-[34ch]">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          noValidate
          style={enter(0.25)}
          className="flex flex-col gap-4"
        >
          <Field
            icon={MdOutlineEmail}
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            required
            autoComplete="email"
            inputMode="email"
          />

          <Field
            icon={MdLockOutline}
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={setPassword}
            required
            autoComplete="current-password"
            trailing={
              <ToggleBtn
                show={showPassword}
                onToggle={() => setShowPassword((v) => !v)}
              />
            }
          />

          {/* Forgot password link */}
          <div className="flex justify-end -mt-1">
            <span className="type-caption text-white/50 cursor-pointer hover:text-white/80 transition">
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-pill bg-brand text-black mt-4 active:scale-[0.98] hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              height: 56,
              boxShadow: "0 8px 30px rgba(217,255,67,0.28)",
            }}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Register link */}
        <p className="type-caption text-white/50 text-center mt-6 mb-0">
          Don't have an account?{" "}
          <Link
            to="/select-account-type"
            className="text-white font-semibold underline underline-offset-2 decoration-white/30"
          >
            Create one
          </Link>
        </p>
      </main>
    </div>
  )
}

export default Login
