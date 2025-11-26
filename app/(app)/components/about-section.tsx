"use client"

import { GlassCard } from "./ui/glass-card"
import { motion } from "framer-motion"
import Image from "next/image"



export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
       

        <GlassCard className="p-8 md:p-12 overflow-hidden relative">
          {/* Ambient background element */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light mb-6">
                Computer Science Engineering Student at ESI Algiers, 
                </p>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  <p>
                   specializing in Full Stack development . With a strong entrepreneurial mindset, I thrive on the entire project lifecycle—from identifying problems and ideation to development and final delivery.
                    <span className="inline-block mx-2 align-middle relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                      <Image src="/PHOTO JAMYL.png" alt="Jamyl" fill className="object-cover" />
                    </span>
                    I specialize in building scalable web applications with modern technologies, focusing on
                    performance, accessibility, and clean aesthetics.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-12">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Location</h4>
                <p className="text-white text-lg">Algiers, Algeria</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Experience</h4>
                <p className="text-white text-lg">1+ Year</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Status</h4>
                <p className="text-green-400 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Available for work
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </section>
  )
}
