/**
 * Speeder — minimal animated motion effect.
 * A small character "vehicle" wobbles in place while horizontal streak lines
 * sweep behind it, suggesting forward motion.
 *
 * Visual styling lives in `index.css` under the `.speeder-*` classes.
 * Adapted to render in white so it sits on the lime/dark gradient panels.
 */
const Speeder = ({ className = "" }) => {
  return (
    <div className={`speeder-stage ${className}`.trim()}>
      {/* Background streak lines */}
      <div className="speeder-longfazers">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Character */}
      <div className="speeder-loader-container">
        <div className="speeder">
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className="speeder-base">
            <span />
            <div className="speeder-face" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Speeder
