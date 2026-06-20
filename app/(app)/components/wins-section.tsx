"use client"

import { motion } from "framer-motion"
import { hackathons } from "../lib/portfolio-content"
import { SectionHeader } from "./section-header"

export function WinsSection() {
  return (
    <section id="wins" className="section-shell">
      <SectionHeader number="05" label="Wins" />

      <div className="grid lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1fr)]">
        <div className="border-b border-line px-6 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-16">
          <h2 className="display-title text-6xl sm:text-7xl lg:text-8xl">
            Hackathon
            <br />
            muscle
          </h2>
          <p className="mt-6 max-w-md text-xs uppercase leading-6 tracking-spec text-muted">
            Decisions rapides, prototypes, pitch, livraison.
          </p>
        </div>

        <div className="grid border-l border-line md:grid-cols-2 lg:border-l-0">
          {hackathons.map((win, index) => (
            <motion.article
              key={win.event}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className="min-h-[260px] border-b border-r border-line p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[10px] uppercase tracking-spec text-muted">{win.date}</p>
                <span className="font-display text-3xl leading-none text-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 font-display text-4xl uppercase leading-none md:text-5xl">
                {win.event}
              </h3>
              <p className="mt-3 text-xs uppercase tracking-spec text-cyan">{win.result}</p>
              <p className="mt-6 text-sm leading-7 text-muted">{win.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
