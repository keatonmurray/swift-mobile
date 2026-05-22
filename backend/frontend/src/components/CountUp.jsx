import { useEffect, useRef, useState } from "react"

/**
 * Animates a number from 0 to `value` when scrolled into view.
 * Uses requestAnimationFrame with an ease-out curve for a snappy finish.
 *
 *   <CountUp value={450} suffix="k+" duration={1600} />
 */
const CountUp = ({
  value,
  duration = 1600,
  suffix = "",
  prefix = "",
  className = "",
  style = {},
}) => {
  const [display, setDisplay] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            const start = performance.now()
            const animate = (now) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              // Ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              setDisplay(value * eased)
              if (progress < 1) requestAnimationFrame(animate)
              else setDisplay(value)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  // Format as integer for clean display
  const rounded = Math.round(display)

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {rounded}
      {suffix}
    </span>
  )
}

export default CountUp
