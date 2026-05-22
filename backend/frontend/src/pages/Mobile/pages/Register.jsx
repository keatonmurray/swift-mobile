import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
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

import { countries } from "../../../constants/countries"

/* -----------------------------------------------------------
   Field primitives — DESIGN.md text-input on dark canvas
   - rounded-md (12px) per design spec
   - height 56px (text-input spec)
   - Inter body-md text, on-dark-mute placeholder
----------------------------------------------------------- */
const FieldShell = ({ children }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={() => setFocused(false)}
      className={[
        "flex items-center gap-3 h-14 px-4 rounded-xl border backdrop-blur-md transition",
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
  placeholder,
}) => (
  <div className="flex flex-col gap-1.5">
    {label && <FieldLabel>{label}</FieldLabel>}
    <FieldShell>
      {Icon && <Icon size={18} className="text-white/40 shrink-0" />}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? ""}
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

const SelectField = ({
  icon: Icon,
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
}) => (
  <div className="flex flex-col gap-1.5">
    {label && <FieldLabel>{label}</FieldLabel>}
    <FieldShell>
      {Icon && <Icon size={18} className="text-white/40 shrink-0" />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={[
          "flex-1 min-w-0 bg-transparent type-body-md outline-none border-0 appearance-none cursor-pointer",
          value ? "text-white" : "text-white/35",
        ].join(" ")}
      >
        <option value="" disabled className="bg-black text-white/60">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-black text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <MdKeyboardArrowDown size={18} className="text-white/40 shrink-0" />
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

const SectionLabel = ({ children }) => (
  <p className="type-caption font-semibold uppercase tracking-[0.12em] text-white/30 m-0 mb-1">
    {children}
  </p>
)

/* -----------------------------------------------------------
   Page
----------------------------------------------------------- */
const Register = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [country, setCountry] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
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
          account_type: "personal",
          email,
          password,
          password_confirmation: passwordConfirmation,
          country,
        }
      )
      toast.success(response.data.message ?? "Account created")
      navigate("/login")
    } catch (error) {
      if (error.response?.status === 422 && error.response.data?.errors) {
        Object.values(error.response.data.errors).forEach((msgs) =>
          msgs.forEach((msg) => toast.error(msg))
        )
      } else {
        toast.error(error.response?.data?.message || "Something went wrong")
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
          to="/select-account-type"
          aria-label="Back"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-white hover:bg-white/[0.12] transition"
        >
          <MdArrowBack size={20} />
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col px-6 pb-10">
        {/* Eyebrow */}
        <div style={enter(0)} className="mb-3">
          <span className="type-caption text-brand uppercase tracking-[0.18em] font-semibold">
            Create account
          </span>
        </div>

        {/* Heading — Aeonik Pro substitute (Inter) display weight 500, lh 1.0, tight tracking */}
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
            Get started
            <br />
            <span className="text-brand">in minutes.</span>
          </h1>
        </div>

        {/* Subtext — body-md, on-dark-mute */}
        <div style={enter(0.15)} className="mt-4 mb-8">
          <p className="type-body-md text-white/72 max-w-[34ch]">
            Set up your Swift account. We'll guide you through verification next.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={enter(0.25)}
          className="flex flex-col"
        >
          {/* Section: Personal */}
          <div className="flex flex-col gap-3 mb-5">
            <SectionLabel>Personal info</SectionLabel>

            <Field
              icon={MdOutlinePerson}
              label="First name"
              type="text"
              value={firstName}
              onChange={setFirstName}
              required
              autoComplete="given-name"
            />

            <Field
              icon={MdOutlinePerson}
              label="Last name"
              type="text"
              value={lastName}
              onChange={setLastName}
              required
              autoComplete="family-name"
            />

            <SelectField
              icon={MdOutlinePublic}
              label="Country"
              value={country}
              onChange={setCountry}
              required
              placeholder="Select your country"
              options={countries.map((c) => ({ value: c.code, label: c.name }))}
            />
          </div>

          {/* Section: Account */}
          <div className="flex flex-col gap-3 mb-5">
            <SectionLabel>Account details</SectionLabel>

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
          </div>

          {/* Section: Security */}
          <div className="flex flex-col gap-3 mb-7">
            <SectionLabel>Security</SectionLabel>

            <Field
              icon={MdLockOutline}
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              required
              autoComplete="new-password"
              trailing={
                <ToggleBtn
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                />
              }
            />

            <Field
              icon={MdLockOutline}
              label="Confirm password"
              type={showConfirm ? "text" : "password"}
              value={passwordConfirmation}
              onChange={setPasswordConfirmation}
              required
              autoComplete="new-password"
              trailing={
                <ToggleBtn
                  show={showConfirm}
                  onToggle={() => setShowConfirm((v) => !v)}
                />
              }
            />
          </div>

          {/* Submit — DESIGN.md button-primary: pill, white-on-dark equivalent uses brand stamp */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-pill bg-brand text-black active:scale-[0.98] hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              height: 56,
              boxShadow: "0 8px 30px rgba(217,255,67,0.28)",
            }}
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Sign-in link */}
        <p className="type-caption text-white/50 text-center mt-6 mb-0">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold underline underline-offset-2 decoration-white/30"
          >
            Sign in
          </Link>
        </p>
      </main>
    </div>
  )
}

export default Register
