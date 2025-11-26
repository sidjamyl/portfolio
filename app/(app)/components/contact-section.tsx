"use client"

import { GlassCard } from "./ui/glass-card"
import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto mb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center space-y-8"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Let's work together</h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Have a project in mind? I'm always open to discussing new opportunities and ideas.
        </p>

        <GlassCard className="inline-flex p-1.5 rounded-full">
          <a
            href="mailto:nj_sid@esi.dz"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </GlassCard>
      </motion.div>
    </section>
  )
}
