"use client"

import { cn } from "@/lib/utils"

interface DotPatternProps {
  className?: string
  size?: "sm" | "md" | "lg"
  opacity?: "low" | "medium" | "high"
  fadeStyle?: "ellipse" | "circle" | "none"
}

export function DotPattern({
  className,
  size = "md",
  opacity = "medium",
  fadeStyle = "ellipse"
}: DotPatternProps) {
  // Use predefined Tailwind classes instead of template literals for consistency
  const sizeMap = {
    sm: "[background-size:12px_12px]",
    md: "[background-size:16px_16px]",
    lg: "[background-size:20px_20px]"
  }

  const opacityMap = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-70"
  }

  const fadeMap = {
    ellipse: "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]",
    circle: "[mask-image:radial-gradient(circle_at_50%_50%,#000_70%,transparent_100%)]",
    none: ""
  }

  return (
    <div
      className={cn(
        "absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)]",
        sizeMap[size],
        fadeMap[fadeStyle],
        opacityMap[opacity],
        className
      )}
    />
  )
}

// Alternative themed variants
export function DotPatternLight({
  className,
  size = "md",
  opacity = "medium",
  fadeStyle = "ellipse"
}: DotPatternProps) {
  // Use predefined Tailwind classes instead of template literals for consistency
  const sizeMap = {
    sm: "[background-size:12px_12px]",
    md: "[background-size:16px_16px]",
    lg: "[background-size:20px_20px]"
  }

  const opacityMap = {
    low: "opacity-20",
    medium: "opacity-40",
    high: "opacity-60"
  }

  const fadeMap = {
    ellipse: "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]",
    circle: "[mask-image:radial-gradient(circle_at_50%_50%,#000_70%,transparent_100%)]",
    none: ""
  }

  return (
    <div
      className={cn(
        "absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)]",
        sizeMap[size],
        fadeMap[fadeStyle],
        opacityMap[opacity],
        className
      )}
    />
  )
}

export function DotPatternDark({
  className,
  size = "md",
  opacity = "medium",
  fadeStyle = "ellipse"
}: DotPatternProps) {
  // Use predefined Tailwind classes instead of template literals for consistency
  const sizeMap = {
    sm: "[background-size:12px_12px]",
    md: "[background-size:16px_16px]",
    lg: "[background-size:20px_20px]"
  }

  const opacityMap = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-70"
  }

  const fadeMap = {
    ellipse: "[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]",
    circle: "[mask-image:radial-gradient(circle_at_50%_50%,#000_70%,transparent_100%)]",
    none: ""
  }

  return (
    <div
      className={cn(
        "absolute inset-0 bg-[radial-gradient(#4b5563_1px,transparent_1px)]",
        sizeMap[size],
        fadeMap[fadeStyle],
        opacityMap[opacity],
        className
      )}
    />
  )
}
