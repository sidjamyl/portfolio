"use client"
import { GlassCard } from "./ui/glass-card"
import { motion } from "framer-motion"
import Image from "next/image"
import type { Job, Media } from '@/payload-types'

type JobsSectionProps = {
  jobs: Job[]
}

export function JobsSection({ jobs }: JobsSectionProps) {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Experience</h2>
       
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, index) => {
          const imageUrl = typeof job.image === 'object' && job.image?.url 
            ? job.image.url 
            : "/placeholder.svg"
          
          const imageAlt = typeof job.image === 'object' && job.image?.alt
            ? job.image.alt 
            : job.position

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col p-8 hover:bg-white/10 transition-all duration-300 group">
                {/* Image Container - Centered at top */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl group-hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                    <Image
                      src={imageUrl}
                      alt={imageAlt || "Job image"}
                      fill
                      className="object-cover"
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center text-center flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-glow transition-all duration-300">
                    {job.position}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="mt-6 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
                  <div className="h-1 w-12 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
