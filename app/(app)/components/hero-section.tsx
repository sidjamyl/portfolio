"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { Title } from '@/payload-types'
import { useState, useEffect } from "react"

type HeroSectionProps = {
  titles: Title[]
}

export function HeroSection({ titles }: HeroSectionProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)

  useEffect(() => {
    if (titles.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [titles.length])
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Ambient Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -z-10 mix-blend-screen animate-float" />
      <div
        className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] -z-10 mix-blend-screen animate-float"
        style={{ animationDelay: "2s" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-6 z-10 px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full bg-gradient-to-b from-gray-700 to-black border border-white/10 flex items-center justify-center mb-8 shadow-2xl"
        >
          {/* Memoji placeholder or actual image */}
          <span className="text-4xl md:text-6xl">👋</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 pb-2 text-glow">
          Hello, I'm Jamyl
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Delighted to see you visit my portfolio.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md min-w-[250px] justify-center">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <motion.span
            key={currentTitleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-gray-300"
          >
            {titles[currentTitleIndex]?.title || 'Full-Stack Developer'}
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-32 md:bottom-12 animate-bounce text-white/30"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  )
}
