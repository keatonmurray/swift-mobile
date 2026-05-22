import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({ className, size = "default", ...props }) {
  const sizes = {
    sm: "size-7",
    default: "size-9",
    lg: "size-11",
  }

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizes[size] ?? sizes.default,
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-gray-100 text-gray-700 flex size-full items-center justify-center rounded-full text-[11px] font-semibold",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute bottom-0 right-0 size-2.5 rounded-full ring-2 ring-white bg-emerald-500",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "flex items-center -space-x-2 [&>[data-slot=avatar]]:ring-2 [&>[data-slot=avatar]]:ring-white",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({ className, ...props }) {
  return (
    <span
      data-slot="avatar-group-count"
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-gray-700 ring-2 ring-white",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
}
