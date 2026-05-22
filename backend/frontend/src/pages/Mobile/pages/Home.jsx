import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const Home = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Shared transition base for the staged entrance
  const enter = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  return (
    <div className="bg-main-pallette relative flex flex-col overflow-hidden min-h-screen -mt-10">
      {/* Top floating badge — caption type, surface-elevated chip on dark */}
      <div
        className="absolute top-9 left-1/2 -translate-x-1/2 z-10 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md px-4 py-1.5 whitespace-nowrap"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        <span className="type-caption text-white/72 uppercase tracking-[0.08em] font-semibold">
          ✦ Trusted by 500k+ users
        </span>
      </div>

      {/* Main content — vertically centered */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-7 pt-20 pb-8">
        {/* Logo */}
        <div style={enter(0)} className="mb-9">
          <img
            src="/img/logo-inverted.png"
            alt="Swift"
            className="h-9 w-auto"
          />
        </div>

        {/* Headline — Aeonik Pro substitute (Inter) at display weight 500, lh 1.0, tight tracking */}
        <div style={enter(0.1)} className="mb-5 max-w-[340px]">
          <h1
            className="font-display text-white m-0"
            style={{
              fontSize: "clamp(2.6rem, 11vw, 3.4rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 500,
            }}
          >
            Move money.
            <br />
            <span className="text-brand">Track finances.</span>
          </h1>
        </div>

        {/* Subtext — body-md, on-dark-mute */}
        <div style={enter(0.2)} className="mb-12">
          <p className="type-body-md text-white/72 max-w-[260px] mx-auto">
            A gateway that operates accounting for you.
          </p>
        </div>

        {/* CTA buttons — full pill, 48px target, button-md type */}
        <div
          style={enter(0.3)}
          className="flex flex-col gap-3 w-full max-w-[340px]"
        >
          <Link
            to="/select-account-type"
            className="btn-pill bg-brand text-black active:scale-[0.98] hover:brightness-95"
            style={{
              height: 56,
              boxShadow: "0 8px 30px rgba(217,255,67,0.28)",
            }}
          >
            Create an Account
          </Link>

          <Link
            to="/login"
            className="btn-pill bg-white/[0.07] text-white border border-white/15 backdrop-blur-md active:scale-[0.98] hover:bg-white/[0.12]"
            style={{ height: 56 }}
          >
            Sign In
          </Link>
        </div>
      </main>

      {/* Footnote — caption type, on-dark-mute */}
      <div
        className="px-7 pb-8 text-center"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.7s ease 0.5s" }}
      >
        <p className="type-caption text-white/40 m-0">
          By continuing, you agree to our{" "}
          <span className="text-white/72 underline underline-offset-2 decoration-white/30 cursor-pointer">
            Terms
          </span>
          {" & "}
          <span className="text-white/72 underline underline-offset-2 decoration-white/30 cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  )
}

export default Home
