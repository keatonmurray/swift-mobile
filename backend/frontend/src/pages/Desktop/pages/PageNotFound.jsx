import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="bg-main-palette min-h-screen flex items-center justify-center page-x font-sans">
      <div className="text-center max-w-md">

        {/* 404 illustration */}
        <img
          src="/img/404.png"
          alt="404 Page Not Found"
          className="h-72 w-auto mx-auto mb-8"
        />

        {/* Heading */}
        <h1
          className="font-display text-white mb-3"
          style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
        >
          Device switch detected
        </h1>

        {/* Message */}
        <p className="text-white/60 text-base leading-relaxed mb-8">
          It looks like you've switched devices. You may have to re-login to enter desktop mode.
        </p>

        {/* CTA */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-[#e8e8e8] transition-colors duration-200"
          style={{ fontSize: "0.875rem" }}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
