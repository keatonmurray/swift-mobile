/**
 * Skeleton
 * --------
 * Lightweight shimmer placeholder used while data is loading.
 * Composable: <Skeleton className="h-4 w-24 rounded-md" /> renders a single bar.
 *
 * Presets exported alongside cover the common shapes used in the app:
 *   - <StatCardSkeleton />        — dashboard stat card (label + value + sub)
 *   - <TransferMoneySkeleton />   — wallet hero on Pay pages
 *   - <SkeletonRow />             — a single horizontal row with avatar
 *
 * The shimmer animation is the standard Tailwind `animate-pulse`. If you want a
 * sweeping gradient instead, swap `bg-zinc-200` for the gradient utility below.
 */

export const Skeleton = ({ className = "", as: Tag = "div", ...rest }) => (
  <Tag
    aria-hidden="true"
    className={`relative overflow-hidden bg-zinc-200/70 animate-pulse ${className}`}
    {...rest}
  />
)

/* -----------------------------------------------------------
   Stat card preset — matches the StatCard layout in Overview
   (label / value / subtitle + icon tile)
----------------------------------------------------------- */
export const StatCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] px-5 py-4 flex items-center justify-between gap-4">
    <div className="min-w-0 flex-1">
      <Skeleton className="h-3 w-24 rounded-md mb-3" />
      <Skeleton className="h-6 w-32 rounded-md mb-3" />
      <Skeleton className="h-3 w-20 rounded-md" />
    </div>
    <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
  </div>
)

/* -----------------------------------------------------------
   Transfer money preset — matches the Pay page wallet hero
   (balance + chips + nested credit card)
----------------------------------------------------------- */
export const TransferMoneySkeleton = () => (
  <div className="overflow-hidden rounded-[20px] bg-zinc-900 p-5 relative">
    {/* Balance row */}
    <div className="flex items-start justify-between">
      <div className="min-w-0 flex-1">
        <Skeleton className="h-3 w-32 rounded-md mb-3 bg-white/10" />
        <Skeleton className="h-8 w-44 rounded-md mb-3 bg-white/10" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full bg-white/10" />
          <Skeleton className="h-5 w-14 rounded-full bg-white/10" />
        </div>
      </div>
      <Skeleton className="h-9 w-9 rounded-xl bg-white/10 shrink-0" />
    </div>

    {/* Nested card */}
    <div className="mt-4 rounded-[18px] border border-white/10 bg-white/5 p-4 h-[170px] flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-2.5 w-20 rounded-md mb-3 bg-white/10" />
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-5 w-7 rounded bg-white/10" />
            <Skeleton className="h-3 w-16 rounded-md bg-white/10" />
          </div>
        </div>
        <Skeleton className="h-4 w-4 rounded bg-white/10" />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <Skeleton className="h-2.5 w-16 rounded-md mb-1 bg-white/10" />
          <Skeleton className="h-3 w-24 rounded-md bg-white/10" />
        </div>
        <div className="text-right">
          <Skeleton className="h-2.5 w-12 rounded-md mb-1 bg-white/10 ml-auto" />
          <Skeleton className="h-3 w-14 rounded-md bg-white/10 ml-auto" />
        </div>
      </div>
    </div>
  </div>
)

/* -----------------------------------------------------------
   Stats sidebar preset — paired with TransferMoneySkeleton
   on the Pay pages (Available + Pending + selector)
----------------------------------------------------------- */
export const TransferStatsSkeleton = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
    <Skeleton className="mt-4 h-12 w-full rounded-[20px] bg-zinc-200/70" />
  </>
)

/* -----------------------------------------------------------
   Generic row preset — for transaction lists
----------------------------------------------------------- */
export const SkeletonRow = () => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3 min-w-0">
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="min-w-0">
        <Skeleton className="h-3.5 w-36 rounded-md mb-1.5" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>
    </div>
    <Skeleton className="h-3.5 w-16 rounded-md" />
  </div>
)

export default Skeleton
