import { useEffect, useState } from "react"

/**
 * RevealSection
 * -------------
 * Wraps a section and animates it in (fade + slide up) after a configurable delay.
 * Used on AI-generated pages to stagger content appearance section-by-section.
 *
 * Props:
 *  - delay: ms before this section starts appearing (default 0)
 *  - show: boolean — when true, the timer starts. When false, stays hidden.
 *  - children: the content to reveal
 *  - className: optional extra classes on the wrapper
 */
const RevealSection = ({ delay = 0, show = true, children, className = "" }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!show) {
      setVisible(false)
      return
    }

    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [show, delay])

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {children}
    </div>
  )
}

export default RevealSection
