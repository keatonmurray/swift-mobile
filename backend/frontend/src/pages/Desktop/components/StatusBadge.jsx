/**
 * StatusBadge
 * -----------
 * Pill badge with an optional leading dot or icon and tonal variants.
 *
 * Props:
 *   children – label text
 *   icon     – optional icon node (e.g. <LuClock4 size={10} />)
 *   dot      – tailwind color class for the leading dot (only shown when no icon).
 *              Defaults per variant.
 *   variant  – "neutral" | "success" | "warning" | "info" | "danger"
 *   showDot  – whether to show the leading dot when no icon is supplied.
 *              Defaults to true for "neutral", false for tinted variants.
 */
const VARIANTS = {
  neutral: { surface: "bg-gray-100 text-gray-700", dot: "bg-emerald-500" },
  success: { surface: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  warning: { surface: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  info:    { surface: "bg-sky-50 text-sky-700", dot: "bg-sky-500" },
  danger:  { surface: "bg-rose-50 text-rose-700", dot: "bg-rose-500" },
}

const StatusBadge = ({
  children,
  icon,
  dot,
  variant = "neutral",
  showDot,
}) => {
  const v = VARIANTS[variant] ?? VARIANTS.neutral
  const renderDot = showDot ?? (variant === "neutral" && !icon)

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-2.5 py-1 ${v.surface}`}
    >
      {icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : renderDot ? (
        <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${dot ?? v.dot}`} />
      ) : null}
      {children}
    </span>
  )
}

export default StatusBadge
