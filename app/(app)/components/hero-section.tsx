"use client"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import type { Title } from "@/payload-types"
import { fallbackTitles, profile } from "../lib/portfolio-content"
import { SectionHeader } from "./section-header"

type HeroSectionProps = {
  titles: Title[]
}

export function HeroSection({ titles }: HeroSectionProps) {
  const headlineTitles = titles.length
    ? titles.map((item) => item.title).filter(Boolean)
    : fallbackTitles

  return (
    <section id="about" className="section-shell">
      <SectionHeader number="01" label="About" />

      <div className="grid min-w-0 items-stretch lg:min-h-[calc(100svh-64px)] lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_460px]">
        <div className="flex min-w-0 flex-col justify-center px-6 py-12 lg:px-10 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-6 max-w-full text-xs uppercase tracking-spec text-muted sm:max-w-xl">
              {profile.location} / {profile.role}
            </p>
            <h2 className="display-title max-w-full text-[4.3rem] text-balance sm:text-[6.4rem] md:text-[8rem] lg:text-[8.8rem] xl:text-[10rem]">
              <span className="block">SID</span>
              <span className="block">Jamyl</span>
              <span className="block">
                Ryad<span className="blink text-lime">_</span>
              </span>
            </h2>

            <div className="mt-8 max-w-full border-l border-line pl-5 sm:max-w-2xl">
              <p className="text-lg leading-tight text-foreground sm:text-xl md:text-2xl">
                {profile.headline}
              </p>
              <p className="mt-4 max-w-full text-sm leading-7 text-muted md:max-w-xl">
                {profile.summary}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {headlineTitles.map((title) => (
                <span
                  key={title}
                  className="ink-border max-w-full bg-panel-soft px-3 py-2 text-[10px] uppercase tracking-spec text-foreground"
                >
                  {title}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-line lg:flex lg:items-center lg:border-l lg:border-t-0">
          <div className="p-6 lg:sticky lg:top-0 lg:w-full lg:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: 1.4 }}
              animate={{ opacity: 1, scale: 1, rotate: -0.7 }}
              transition={{ delay: 0.12, duration: 0.75, ease: "easeOut" }}
              className="sketch-frame aspect-[4/5]"
            >
              <Image
                src={profile.portrait}
                alt="Portrait de SID Jamyl Ryad"
                fill
                priority
                sizes="(min-width: 1280px) 440px, (min-width: 1024px) 360px, 100vw"
                className="object-cover grayscale contrast-110"
              />
              <div className="absolute bottom-4 left-4 right-4 z-10 grid grid-cols-2 border border-foreground/70 bg-background/86 text-[10px] uppercase tracking-spec backdrop-blur-sm">
                <span className="border-r border-foreground/50 p-3 text-muted">Status</span>
                <span className="p-3 text-lime">Available</span>
              </div>
            </motion.div>

            <div className="mt-5 grid grid-cols-2 border border-line font-display text-xl uppercase leading-none">
              <a href="#projects" className="focus-ring flex items-center justify-between border-r border-line p-4 hover-invert">
                Work
                <ArrowDown aria-hidden className="h-4 w-4" />
              </a>
              <a href={profile.resume} className="focus-ring flex items-center justify-between p-4 hover-invert" target="_blank" rel="noreferrer">
                CV
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
