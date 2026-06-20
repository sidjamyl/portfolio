"use client"

import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react"
import { profile } from "../lib/portfolio-content"
import { SectionHeader } from "./section-header"

const links = [
  {
    label: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: `github / ${profile.github.replace("https://github.com/", "")}`,
    href: profile.github,
    icon: Github,
  },
  {
    label: "linkedin / jamyl-sid",
    href: profile.linkedin,
    icon: Linkedin,
  },
  {
    label: `phone / ${profile.phone}`,
    href: `tel:${profile.phone}`,
    icon: Phone,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="section-shell">
      <SectionHeader number="06" label="Contact" />

      <div className="px-6 py-12 lg:px-10 lg:py-16">
        <h2 className="display-title max-w-5xl text-6xl text-balance sm:text-7xl lg:text-8xl">
          Let&apos;s build something useful, sharp and shipped.
        </h2>

        <div className="mt-10 grid max-w-5xl border-l border-t border-line md:grid-cols-2">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="focus-ring group flex min-h-24 items-center justify-between gap-4 border-b border-r border-line p-5 hover-invert"
            >
              <span className="flex min-w-0 items-center gap-4">
                <Icon aria-hidden className="h-5 w-5 shrink-0" />
                <span className="truncate font-display text-2xl uppercase leading-none md:text-3xl">
                  {label}
                </span>
              </span>
              <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="focus-ring group flex min-h-24 items-center justify-between gap-4 border-b border-r border-line p-5 hover-invert md:col-span-2"
          >
            <span className="font-display text-2xl uppercase leading-none md:text-3xl">
              Resume / download
            </span>
            <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="mt-8 flex items-center gap-3 text-xs uppercase tracking-spec text-muted">
          <span className="h-2 w-2 bg-lime" />
          {profile.availability}
        </p>
      </div>
    </section>
  )
}
