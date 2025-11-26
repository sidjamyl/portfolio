"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin } from "lucide-react"
import { GlassCard } from "./ui/glass-card"

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Let&apos;s Connect</h2>
        <p className="text-gray-400 text-center mb-12">
          I&apos;m always open to discussing new projects and opportunities.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <GlassCard className="flex-1 p-1.5 rounded-full">
            <a
              href="mailto:nj_sid@esi.dz"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Me</span>
            </a>
          </GlassCard>

          <GlassCard className="flex-1 p-1.5 rounded-full">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </GlassCard>

          <GlassCard className="flex-1 p-1.5 rounded-full">
            <a
              href="https://www.linkedin.com/in/yourusername/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </GlassCard>
        </div>
      </motion.div>
    </section>
  )
}
