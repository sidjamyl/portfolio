"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"
import { navItems, profile } from "../lib/portfolio-content"

export function SidePanel() {
  const [open, setOpen] = useState(false)

  return (
    <aside className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl lg:h-screen lg:border-r lg:border-line">
      <div className="border-b border-line">
        <div className="flex h-16 items-stretch lg:h-20 xl:h-24">
          <a
            href="#about"
            className="focus-ring flex w-16 shrink-0 items-center justify-center border-r border-line font-display text-2xl hover-invert lg:w-20 lg:text-3xl xl:w-24"
            aria-label="Retour au debut"
          >
            SJ
          </a>
          <div className="flex min-w-0 flex-1 flex-col justify-center px-4 text-[10px] uppercase tracking-spec text-muted">
            <span className="truncate text-foreground">{profile.name}</span>
            <span className="truncate">{profile.role}</span>
          </div>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="focus-ring flex w-16 items-center justify-center border-l border-line hover-invert lg:hidden"
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav
        className={`absolute inset-x-0 top-16 border-b border-line bg-background/98 lg:static lg:block lg:border-b-0 ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="font-display text-2xl uppercase leading-none lg:border-t lg:border-line">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="focus-ring group flex items-baseline border-b border-line px-6 py-3 hover-invert xl:px-8"
              >
                <span className="mr-3 text-sm text-muted group-hover:text-background">{item.number}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="hidden flex-1 flex-col items-end justify-end px-6 pb-8 pt-12 lg:flex xl:px-8">
        <h2 className="font-display text-right text-4xl uppercase leading-[0.86] xl:text-5xl">
          <span className="block">SID</span>
          <span className="block">JAMYL</span>
        </h2>
        <div className="mt-4 flex items-center gap-4">
          <span className="h-px w-20 bg-foreground/60 xl:w-28" />
          <span className="text-[10px] tracking-spec text-muted">100%</span>
        </div>
      </div>

      <div className="hidden border-t border-line px-6 py-4 text-[10px] uppercase tracking-spec text-muted lg:flex lg:items-center lg:justify-between xl:px-8">
        <span>{profile.location}</span>
        <span>&copy; 2026</span>
      </div>
    </aside>
  )
}
