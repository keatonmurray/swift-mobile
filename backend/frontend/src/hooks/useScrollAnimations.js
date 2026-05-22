import { useEffect } from "react"
import Lenis from "lenis"

/**
 * Initializes Lenis smooth scroll, IntersectionObserver-based reveals,
 * and scroll-tied parallax. Mount once on a page to get all three.
 *
 * Markup contract (no JS imports needed at the call site):
 *
 *   data-reveal="up|left|right|scale|blur"   → element fades + transforms in
 *   data-reveal-stagger                       → children cascade in
 *   data-parallax="0.2"                       → element drifts at given speed
 *
 * The matching CSS lives in index.css under the `[data-reveal*]` selectors.
 */
export const useScrollAnimations = () => {
  useEffect(() => {
    // ---- 1. Lenis smooth scroll ------------------------------------------
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      lerp: 0.1,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // ---- 2. Reveal-on-scroll observer ------------------------------------
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    )

    const revealEls = document.querySelectorAll(
      "[data-reveal], [data-reveal-stagger]"
    )
    revealEls.forEach((el) => revealObserver.observe(el))

    // ---- 3. Parallax tied to Lenis scroll --------------------------------
    const parallaxEls = Array.from(
      document.querySelectorAll("[data-parallax]")
    )

    const updateParallax = () => {
      const vh = window.innerHeight
      parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.2
        const rect = el.getBoundingClientRect()
        // Distance of element's center from viewport center
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = vh / 2
        const distance = elementCenter - viewportCenter
        const offset = distance * speed * -1
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
      })
    }

    lenis.on("scroll", updateParallax)
    // Run once after layout settles
    requestAnimationFrame(updateParallax)

    // ---- Cleanup ---------------------------------------------------------
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      revealObserver.disconnect()
    }
  }, [])
}
