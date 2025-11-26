"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Home, User, Briefcase, Code, Mail } from "lucide-react"
import { useRef } from "react"

const navItems = [
  { icon: Home, label: "Home", href: "#hero" },
  { icon: User, label: "About", href: "#about" },
  { icon: Briefcase, label: "Jobs", href: "#jobs" },
  { icon: Code, label: "Projects", href: "#projects" },
  { icon: Mail, label: "Contact", href: "#contact" },
]

function DockIcon({ icon: Icon, label, href, mouseX }: { 
  icon: React.ElementType
  label: string
  href: string
  mouseX: ReturnType<typeof useMotionValue<number>>
}) {
  const ref = useRef<HTMLAnchorElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={handleClick}
      style={{ width }}
      className="aspect-square rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors relative group"
    >
      <Icon className="w-5 h-5 text-white" />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </motion.a>
  )
}

export function DockNav() {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex gap-4 p-2 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {navItems.map((item) => (
          <DockIcon key={item.href} {...item} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  )
}
