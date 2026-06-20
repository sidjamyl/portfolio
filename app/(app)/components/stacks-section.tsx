"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Stack } from "@/payload-types"
import { fallbackStacks, groupStacks } from "../lib/portfolio-content"
import { mediaAlt, mediaUrl } from "../lib/portfolio-utils"
import { SectionHeader } from "./section-header"

type StacksSectionProps = {
  stacks: Stack[]
}

export function StacksSection({ stacks }: StacksSectionProps) {
  const grouped = groupStacks(stacks)

  return (
    <section id="stack" className="section-shell">
      <SectionHeader number="04" label="Stack" />

      <div className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-10">
          <h2 className="display-title text-6xl sm:text-7xl lg:text-8xl">
            Tools
            <br />
            with taste
          </h2>
          <p className="mt-6 max-w-md text-xs uppercase leading-6 tracking-spec text-muted">
            Technologies groupees par usage, des langages au produit.
          </p>
        </div>

        {grouped.length ? (
          <div className="grid border-l border-t border-line md:grid-cols-2 xl:grid-cols-3">
            {grouped.map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.45 }}
                className="min-h-[260px] border-b border-r border-line p-5"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-4xl uppercase leading-none">{group.category}</h3>
                  <span className="text-[10px] uppercase tracking-spec text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  {group.items.map((stack) => {
                    const src = mediaUrl(stack.icon, "")

                    return (
                      <div key={stack.id} className="flex min-h-14 items-center gap-3 border border-line bg-panel-soft p-3">
                        {src ? (
                          <span className="relative h-7 w-7 shrink-0">
                            <Image
                              src={src}
                              alt={mediaAlt(stack.icon, stack.name || "Technology")}
                              fill
                              sizes="28px"
                              className="object-contain"
                            />
                          </span>
                        ) : (
                          <span className="h-2 w-2 shrink-0 bg-lime" />
                        )}
                        <span className="text-xs uppercase tracking-spec text-foreground">
                          {stack.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid border-l border-t border-line md:grid-cols-3 xl:grid-cols-5">
            {fallbackStacks.map((group, index) => (
              <div key={group.category} className="border-b border-r border-line p-5">
                <h3 className="font-display text-4xl uppercase leading-none">{group.category}</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="border border-line px-3 py-2 text-[10px] uppercase tracking-spec">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="mt-8 text-[10px] uppercase tracking-spec text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
