import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { MdOutlinePerson, MdKeyboardArrowRight, MdArrowBack } from "react-icons/md"
import { HiOutlineBriefcase } from "react-icons/hi"

const AccountType = () => {
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
    <div className="bg-main-pallette relative flex flex-col overflow-hidden min-h-screen -mt-10">
      {/* Header — back link */}
      <header className="px-6 pt-12 pb-4 flex items-center" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Link
          to="/"
          aria-label="Back"
          className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md text-white hover:bg-white/[0.12] transition"
        >
          <MdArrowBack size={20} />
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col px-6 pb-8">
        {/* Eyebrow */}
        <div style={enter(0)} className="mb-5">
          <span className="type-caption text-brand uppercase tracking-[0.18em] font-semibold">
            Welcome
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
            Choose your
            <br />
            <span className="text-brand">account type.</span>
          </h1>
        </div>

        {/* Subtext */}
        <div style={enter(0.15)} className="mt-4 mb-9">
          <p className="type-body-md text-white/72 max-w-[34ch]">
            Tell us a bit about yourself so we can tailor the experience.
          </p>
        </div>

        {/* Options */}
        <div style={enter(0.25)} className="flex flex-col gap-3">
          {options.map((opt) => {
            const Icon = opt.icon
            const isActive = selected === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelected(opt.id)}
                disabled={opt.comingSoon}
                className={[
                  "group relative w-full text-left rounded-[20px] p-5 border backdrop-blur-md transition",
                  "flex items-center gap-4",
                  isActive
                    ? "bg-brand/[0.08] border-brand/60"
                    : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07]",
                  opt.comingSoon ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
                ].join(" ")}
                style={{ borderRadius: 20 }}
              >
                {/* Icon tile */}
                <span
                  className={[
                    "flex items-center justify-center h-12 w-12 rounded-2xl shrink-0 transition",
                    isActive
                      ? "bg-brand text-black"
                      : "bg-white/[0.08] text-white",
                  ].join(" ")}
                >
                  <Icon size={24} />
                </span>

                {/* Copy */}
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="type-heading-sm text-white">{opt.title}</span>
                    {opt.comingSoon && (
                      <span className="type-caption text-white/60 px-2 py-[2px] rounded-full bg-white/[0.08] border border-white/10">
                        Soon
                      </span>
                    )}
                  </span>
                  <span className="block type-body-sm text-white/60 mt-0.5">
                    {opt.desc}
                  </span>
                </span>

                {/* Radio indicator */}
                <span
                  className={[
                    "h-5 w-5 rounded-full shrink-0 flex items-center justify-center transition",
                    isActive ? "bg-brand" : "bg-transparent border border-white/25",
                  ].join(" ")}
                >
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-black" />
                  )}
                </span>
              </button>
            )
          })}
        </div>

        {/* CTA */}
        <div style={enter(0.35)} className="mt-8">
          <Link
            to={active.comingSoon ? "#" : active.to}
            className={[
              "btn-pill w-full text-black",
              active.comingSoon
                ? "bg-white/30 pointer-events-none"
                : "bg-brand hover:brightness-95 active:scale-[0.98]",
            ].join(" ")}
            style={{
              height: 56,
              boxShadow: active.comingSoon ? "none" : "0 8px 30px rgba(217,255,67,0.28)",
            }}
          >
            Continue
            <MdKeyboardArrowRight size={20} className="ml-1" />
          </Link>

          <p className="type-caption text-white/50 text-center mt-5">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold underline underline-offset-2 decoration-white/30">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default AccountType
