"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/payload-types"
import { fallbackProjects, getProjectMeta, splitStack } from "../lib/portfolio-content"
import { externalUrl, mediaAlt, mediaUrl } from "../lib/portfolio-utils"
import { SectionHeader } from "./section-header"

type ProjectsSectionProps = {
  projects: Project[]
}

const accentClass = {
  lime: "text-lime",
  cyan: "text-cyan",
  coral: "text-coral",
  gold: "text-gold",
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const items = projects.length ? projects : fallbackProjects

  return (
    <section id="projects" className="section-shell">
      <SectionHeader number="02" label="Projects" />

      <div className="px-6 py-12 lg:px-10 lg:py-16">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.5fr)] lg:items-end">
          <h2 className="display-title text-6xl sm:text-7xl lg:text-8xl">
            Selected
            <br />
            builds
          </h2>
          <p className="max-w-md text-xs uppercase leading-6 tracking-spec text-muted">
            Plateformes internes, produits web, sites vitrines et hackathons.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {items.map((project, index) => {
            const meta = getProjectMeta(project, index)
            const imageUrl = mediaUrl(project.media, "")
            const liveHref = externalUrl(project.CodeLink)
            const githubHref = externalUrl(project.githubLink)
            const stack = meta.stack.length ? meta.stack : splitStack(project.type)

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid gap-0 lg:grid-cols-[86px_minmax(0,1fr)_minmax(280px,420px)]"
              >
                <div className="flex items-start border-line py-5 pr-5 lg:border-r lg:p-5">
                  <span className="font-display text-4xl leading-none text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="py-6 lg:px-8">
                  <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-spec text-muted">
                    <span>{meta.year}</span>
                    <span className={accentClass[meta.accent]}>{meta.role}</span>
                    {project.type ? <span>{project.type}</span> : null}
                  </div>

                  <h3 className="mt-4 display-title text-5xl leading-[0.88] sm:text-6xl lg:text-7xl">
                    {project.title || "Untitled project"}
                  </h3>

                  <p className="text-clamp-3 mt-6 max-w-2xl text-sm leading-7 text-muted">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <span key={item} className="border border-line px-3 py-2 text-[10px] uppercase tracking-spec text-foreground">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {githubHref ? (
                      <a
                        href={githubHref}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-2 border border-line px-4 py-3 text-xs uppercase tracking-spec hover-invert"
                      >
                        <Github aria-hidden className="h-4 w-4" />
                        GitHub
                      </a>
                    ) : null}
                    {liveHref ? (
                      <a
                        href={liveHref}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-2 border border-line px-4 py-3 text-xs uppercase tracking-spec hover-invert"
                      >
                        Live
                        <ArrowUpRight aria-hidden className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className="border-line pb-8 lg:border-l lg:p-5">
                  <div className="sketch-frame aspect-[16/11] bg-panel-soft">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={mediaAlt(project.media, project.title || "Project image")}
                        fill
                        sizes="(min-width: 1024px) 420px, 100vw"
                        className="object-contain p-4"
                      />
                    ) : (
                      <div className="technical-grid flex h-full items-center justify-center p-8 text-center">
                        <span className="font-display text-5xl uppercase text-muted">
                          {project.title?.slice(0, 2) || "UI"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
