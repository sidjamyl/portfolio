"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Job } from "@/payload-types"
import { fallbackJobs } from "../lib/portfolio-content"
import { mediaAlt, mediaUrl } from "../lib/portfolio-utils"
import { SectionHeader } from "./section-header"

type JobsSectionProps = {
  jobs: Job[]
}

export function JobsSection({ jobs }: JobsSectionProps) {
  const items = jobs.length ? jobs : fallbackJobs

  return (
    <section id="experience" className="section-shell">
      <SectionHeader number="03" label="Experience" />

      <div className="grid lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
        <div className="border-b border-line px-6 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-16">
          <h2 className="display-title text-6xl sm:text-7xl lg:text-8xl">
            Real
            <br />
            missions
          </h2>
          <p className="mt-6 max-w-md text-xs uppercase leading-6 tracking-spec text-muted">
            Missions client, freelance, coordination et produits internes.
          </p>
        </div>

        <ol className="min-w-0 divide-y divide-line overflow-hidden">
          {items.map((job, index) => {
            const imageUrl = mediaUrl(job.image, "")

            return (
              <motion.li
                key={job.id}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="grid min-w-0 grid-cols-[56px_minmax(0,1fr)] lg:grid-cols-[120px_minmax(0,1fr)_190px]"
              >
                <div className="flex items-center justify-center border-r border-line py-6">
                  <span className="font-display text-2xl text-muted [writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="min-w-0 px-5 py-6 lg:px-8 lg:py-8">
                  <h3 className="mt-3 font-display text-4xl uppercase leading-none md:text-5xl">
                    {job.position}
                  </h3>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
                    {job.description}
                  </p>
                </div>

                <div className="hidden border-l border-line p-5 lg:block">
                  {imageUrl ? (
                    <div className="sketch-frame aspect-square bg-panel-soft">
                      <Image
                        src={imageUrl}
                        alt={mediaAlt(job.image, job.position)}
                        fill
                        sizes="190px"
                        className="object-contain p-5"
                      />
                    </div>
                  ) : (
                    <div className={`${index % 2 === 0 ? "hatch" : "dot-grid"} h-full`} />
                  )}
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
