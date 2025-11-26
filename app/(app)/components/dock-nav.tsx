"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Home, User, FolderGit2, Layers, Mail, Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

export function DockNav() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="glass-dock flex h-16 items-end gap-4 rounded-2xl px-4 pb-3"
      >
        <DockIcon mouseX={mouseX} icon={Home} label="Home" href="#hero" />
        <DockIcon mouseX={mouseX} icon={User} label="About" href="#about" />
        <DockIcon mouseX={mouseX} icon={FolderGit2} label="Projects" href="#projects" />
        <DockIcon mouseX={mouseX} icon={Layers} label="Stack" href="#stack" />
        <DockIcon mouseX={mouseX} icon={Mail} label="Contact" href="#contact" />

        <div className="h-10 w-[1px] bg-white/10 mx-1 self-center" />

        <DockIcon mouseX={mouseX} icon={Github} label="GitHub" href="https://github.com/sidjamyl" external />
        <DockIcon mouseX={mouseX} icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/jamyl-sid-723820285/" external />
      </motion.div>
    </div>
  )
}

function DockIcon({ mouseX, icon: Icon, label, href, external }: any) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val : number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <Link href={href} target={external ? "_blank" : undefined} aria-label={label}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square rounded-full bg-white/10 border border-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <Icon className="w-full h-full p-2.5 text-white/90" />
      </motion.div>
    </Link>
  )
}
