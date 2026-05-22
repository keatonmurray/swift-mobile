import { useState, useEffect, useRef, useCallback } from "react"

/**
 * Typewriter — reveals text character by character.
 *
 * Props:
 *   text      — the string to type out
 *   speed     — ms per character (default 18)
 *   delay     — ms to wait before starting (default 0)
 *   className — optional wrapper class
 *   onDone    — callback when typing finishes
 */
const Typewriter = ({ text = "", speed = 18, delay = 0, className = "", onDone }) => {
  const [displayed, setDisplayed] = useState("")
  const started = useRef(false)
  const idx = useRef(0)
  const onDoneRef = useRef(onDone)

  // Keep callback ref fresh
  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  // Reset + start typing when text changes
  useEffect(() => {
    if (!text) {
      setDisplayed("")
      return
    }

    setDisplayed("")
    idx.current = 0
    started.current = false

    const delayTimer = setTimeout(() => {
      started.current = true

      const typeTimer = setInterval(() => {
        idx.current += 1
        const next = text.slice(0, idx.current)
        setDisplayed(next)

        if (idx.current >= text.length) {
          clearInterval(typeTimer)
          onDoneRef.current?.()
        }
      }, speed)

      // Cleanup interval
      return () => clearInterval(typeTimer)
    }, delay)

    return () => clearTimeout(delayTimer)
  }, [text, speed, delay])

  return (
    <span className={className}>
      {displayed}
      {text && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-violet-400 ml-[1px] animate-pulse align-text-bottom" />
      )}
    </span>
  )
}

export default Typewriter
