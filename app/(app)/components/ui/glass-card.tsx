import { cn } from "../../lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl p-6 transition-all duration-500",
        hoverEffect && "hover:bg-white/10 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
