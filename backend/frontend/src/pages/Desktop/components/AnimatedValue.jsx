import { useEffect, useRef, useState } from "react"

/**
 * AnimatedValue
 * -------------
 * Animates a numeric value from 0 to target with currency formatting.
 * Parses the display string to extract the number, animates it,
 * then re-formats with the original prefix/suffix.
 *
 * Props:
 *   value     – string like "$1,234,567.89" or "€12,000.00"
 *   duration  – ms (default 1400)
 *   className – passed to the wrapping span
 */
const AnimatedValue = ({ value, duration = 1400, className = "" }) => {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return

    // Extract prefix (currency symbol / sign), numeric part, suffix
    const match = value.match(/^([^0-9]*)([\d,]+\.?\d*)(.*)$/)
    if (!match) {
      setDisplay(value)
      return
    }

    const prefix = match[1]
    const numStr = match[2].replace(/,/g, "")
    const suffix = match[3]
    const target = parseFloat(numStr)
    if (isNaN(target)) {
      setDisplay(value)
      return
    }

    // Determine decimal places from original
    const decimalPart = match[2].split(".")[1]
    const decimals = decimalPart ? decimalPart.length : 0

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const start = performance.now()

            const animate = (now) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              // Ease-out cubic
              const eased = 1 - Math.pow(1 - progress, 3)
              const current = target * eased

              // Format with commas
              const formatted = current.toLocaleString("en-US", {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
              })

              setDisplay(`${prefix}${formatted}${suffix}`)

              if (progress < 1) requestAnimationFrame(animate)
              else setDisplay(value)
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

export default AnimatedValue
