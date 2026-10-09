"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Github, Home, Linkedin, Mail, Phone, FileDown } from "lucide-react"
import type { Category, Job, Project, Stack } from "@/payload-types"
import { profile } from "../lib/portfolio-content"
import { externalUrl, mediaUrl } from "../lib/portfolio-utils"
import { Portrait } from "./portrait"
import { MechanicalCanvas } from "./mechanical-canvas"

type Props = { projects: Project[]; jobs: Job[]; stacks: Stack[]; categories: Category[] }
const links = [["About", "about"], ["Clients", "clients"], ["Projects", "projects"], ["Skills", "skills"], ["Experience", "experience"], ["Contact", "contact"]]
const split = (value?: string | null, separator = ",") => (value || "").split(separator).map(part => part.trim()).filter(Boolean)
const pageTop = (element: HTMLElement) => { let top = 0; for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop; return top }

function ClientVisual({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => ref.current?.classList.toggle("show-preview", entry.isIntersecting), { rootMargin: "-45% 0px -45% 0px" })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const shot = project.title.toLowerCase().includes("khatt") ? "/assets/khatt-preview.png" : project.title.toLowerCase().includes("joumla") ? "/assets/joumla-preview.jpg" : "/assets/gig-preview.png"
  return <div className="client-visual" ref={ref}>
    <div className={`screen schematic schematic-${index}`} aria-hidden="true">
      <div className="screen-top"><i /><i /><i /></div>
      {index === 0 ? <div className="screen-content"><div className="mock-sidebar">{Array.from({ length: 8 }, (_, n) => <i key={n} />)}</div><div className="mock-main"><div className="mock-heading"><i /><i /></div><div className="mock-cards">{Array.from({ length: 24 }, (_, n) => <i key={n} />)}</div></div></div>
      : index === 1 ? <div className="mock-landing"><div className="mock-heading"><i /><i /></div><div className="mock-landing-cards">{[0, 1, 2].map(n => <div key={n}><i /><i /><i /><b /></div>)}</div><div className="mock-bars"><i /><i /></div></div>
      : <div className="mock-dashboard"><div className="mock-stats">{[0, 1, 2].map(n => <i key={n} />)}</div><div className="mock-chart">{[40, 58, 35, 76, 62, 90, 68, 100].map((height, n) => <i key={n} style={{ height: `${height}%` }} />)}</div><div className="mock-bars"><i /><i /></div></div>}
      <div className="screen-bottom"><i /><i /></div>
    </div>
    {shot && <img className="client-shot" src={shot} alt={`${project.title} website preview`} />}
  </div>
}

export function PortfolioView({ projects, jobs, stacks, categories }: Props) {
  const [index, setIndex] = useState(0)
  const [activeSection, setActiveSection] = useState("about")
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollSpace = useRef<HTMLDivElement>(null)
  const projectTrack = useRef<HTMLDivElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const pre = useRef<HTMLDivElement>(null)
  const post = useRef<HTMLDivElement>(null)
  const heading = useRef<HTMLDivElement>(null)
  const progressBar = useRef<HTMLDivElement>(null)
  const skillScroller = useRef<HTMLDivElement>(null)
  const clients = projects.filter(project => project.section === "clients")
  const personal = projects.filter(project => project.section !== "clients")
  const skillGroups = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0)).map(category => ({ category, items: stacks.filter(stack => typeof stack.StackCategory === "object" && stack.StackCategory?.id === category.id) })).filter(group => group.items.length)
  const heroSkills = ["Next.js", "TypeScript", "React", "Tailwind CSS", "CSS", "Figma", "Node.js", "NestJS", "MySQL", "Python", "JavaScript", "Vite", "Vercel", "Adobe Illustrator", "Canva", "Express", "REST APIs", "Docker", "Git", "Linux"].map(name => stacks.find(stack => stack.name?.trim() === name)).filter((stack): stack is Stack => Boolean(stack))

  useEffect(() => {
    const space = scrollSpace.current, track = projectTrack.current, pinned = pin.current
    if (!space || !track || !pinned) return
    let frame = 0, distance = 0, pinTop = 88
    let segments: { start: number; length: number; from: number; to: number }[] = []
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const consumed = Math.max(0, Math.min(distance, window.scrollY - pageTop(space) + pinTop))
        const segment = segments.find(s => consumed <= s.start + s.length) || segments[segments.length - 1]
        const progress = segment ? segment.from + (segment.to - segment.from) * Math.max(0, Math.min(1, (consumed - segment.start) / segment.length)) : 0
        track.style.transform = `translateX(${-progress * (personal.length - 1) * space.clientWidth}px)`
        if (pre.current) pre.current.style.transform = `translateY(${consumed}px)`
        if (heading.current) heading.current.style.transform = `translateY(${consumed}px)`
        if (post.current) post.current.style.transform = `translateY(${consumed - distance}px)`
        if (progressBar.current) { progressBar.current.style.transform = `scaleX(${progress})`; progressBar.current.style.opacity = consumed >= distance - 220 ? "0" : "1" }
        const selected = Math.round(progress * (personal.length - 1))
        setIndex(current => current === selected ? current : selected)
        track.querySelectorAll<HTMLElement>(".project-card").forEach((card, i) => { card.inert = i !== selected; card.setAttribute("aria-hidden", String(i !== selected)) })
        const current = [...links].reverse().find(([, id]) => { const section = document.getElementById(id); return section && pageTop(section) <= window.scrollY + pinTop })
        setActiveSection(current?.[1] || "about")
      })
    }
    const measure = () => {
      // The same pause/move rhythm as the reference keeps every project readable.
      const cards = Array.from(track.children) as HTMLElement[]
      const height = Math.max(280, Math.min(720, Math.max(...cards.map(card => card.scrollHeight))))
      pinned.style.height = `${height}px`
      pinTop = Math.max(48, (window.innerHeight - height - 40) / 2) + 40
      pinned.style.top = `${pinTop}px`
      distance = 0; segments = []
      const add = (length: number, from: number, to: number) => { segments.push({ start: distance, length, from, to }); distance += length }
      add(220, 0, 0)
      for (let i = 1; i < personal.length; i++) { add(height, (i - 1) / (personal.length - 1), i / (personal.length - 1)); add(i === personal.length - 1 ? 220 : 140, i / (personal.length - 1), i / (personal.length - 1)) }
      space.style.height = `${height + distance}px`
      update()
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(space)
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", measure)
    document.fonts.ready.then(measure)
    return () => { resize.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", measure) }
  }, [personal.length])

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target) } }), { threshold: .05, rootMargin: "0px 0px -24px 0px" })
    document.querySelectorAll<HTMLElement>("[data-animate]").forEach(element => { if (reduced) element.classList.add("in-view"); else { element.classList.add("will-reveal"); observer.observe(element) } })
    const scroller = skillScroller.current
    const reset = () => { if (scroller) scroller.scrollLeft = scroller.scrollWidth / 3 }
    reset()
    const loop = () => { if (!scroller) return; const width = scroller.scrollWidth / 3; if (scroller.scrollLeft < width / 2) scroller.scrollLeft += width; else if (scroller.scrollLeft > width * 1.5) scroller.scrollLeft -= width }
    scroller?.addEventListener("scroll", loop, { passive: true })
    window.addEventListener("resize", reset)
    return () => { observer.disconnect(); scroller?.removeEventListener("scroll", loop); window.removeEventListener("resize", reset) }
  }, [])

  const navigate = (id: string) => {
    setMenuOpen(false)
    const target = document.getElementById(id)
    if (target) { window.scrollTo({ top: pageTop(target) - 48, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); history.replaceState(null, "", `#${id}`) }
  }
  const anchor = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); navigate(id) }

  return <div className="portfolio">
    <header className="site-header">
      <a className="site-brand mono" href="#about" onClick={anchor("about")}><span>{profile.name}</span><span className="muted">FULL-STACK DEVELOPER</span></a>
      <nav className="site-nav mono" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={anchor(id)} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
      <button className={`menu-toggle ${menuOpen ? "open" : ""}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
      <nav id="mobile-navigation" className={`mobile-nav mono ${menuOpen ? "open" : ""}`} aria-label="Mobile navigation" inert={!menuOpen}>{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={anchor(id)}>{label}</a>)}</nav>
    </header>
    <div ref={pre} className="pre-projects-content">
      <section id="about"><div className="section-label mono">ABOUT</div><div className="hero"><div className="hero-copy">
        <h1 data-animate>{profile.name.toUpperCase()}<span className="caret" aria-hidden="true">_</span></h1>
        <p className="hero-intro" data-animate style={{ transitionDelay: "60ms" }}>{profile.summary}</p>
        <div className="hero-tech" data-animate style={{ transitionDelay: "120ms" }} aria-label="Selected technologies">{[0, 1].map(row => <div className={`marquee marquee-${row}`} key={row}><div className="marquee-track">{[0, 1].map(copy => <div className="marquee-copy" key={copy} aria-hidden={copy === 1}>{(row ? [...heroSkills].reverse() : heroSkills).map(stack => <img className={["Next.js", "Vercel", "Express"].includes(stack.name?.trim() || "") ? "dark-icon" : ""} key={stack.id} src={mediaUrl(stack.icon)} alt={stack.name || "Technology"} title={stack.name || ""} />)}</div>)}</div></div>)}</div>
        <div className="hero-actions" data-animate style={{ transitionDelay: "180ms" }}><a className="button primary" href={profile.github} target="_blank" rel="noreferrer"><Github size={20} /> GitHub</a><a className="button" href="#contact" onClick={anchor("contact")}><Mail size={20} /> Contact</a></div>
      </div><div className="portrait-wrapper"><Portrait /></div></div></section>
      <section id="clients"><div className="section-label mono">CLIENTS</div>{clients.map((project, i) => { const href = externalUrl(project.CodeLink || project.githubLink); return <article className={`client-card ${i % 2 ? "reverse" : ""}`} key={project.id}><div className="client-copy">
        {href && <a className="corner-link" href={href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><ArrowUpRight size={20} /></a>}
        <h2 data-animate>{project.title}</h2><div className="eyebrow mono" data-animate>{project.type}</div><p data-animate>{project.description}</p><div className="tags mono" data-animate>{split(project.tags).map(tag => <span key={tag}>{tag}</span>)}</div>
      </div><ClientVisual project={project} index={i} /></article> })}</section>
    </div>
    <section id="projects"><div ref={heading} className="section-label mono projects-heading"><span>PROJECTS</span><span className="project-controls" aria-label={`Project ${index + 1} of ${personal.length}`}>{personal.map((project, i) => <span key={project.id} className={i === index ? "active" : ""} />)}</span></div>
      <div className="projects-scroll-space" ref={scrollSpace}><div className="projects-pinned" ref={pin}><div className="projects-track" ref={projectTrack}>{personal.map((project, i) => <article className="project-card" key={project.id}>
        <div className="project-copy"><div className="project-links">{project.githubLink && <a href={externalUrl(project.githubLink)} aria-label={`View ${project.title} source on GitHub`} target="_blank" rel="noreferrer"><Github size={19} /></a>}{project.CodeLink && <a href={externalUrl(project.CodeLink)} aria-label={`Visit ${project.title}`} target="_blank" rel="noreferrer"><ArrowUpRight size={20} /></a>}</div><h2>{project.title}</h2><div className="eyebrow mono">{project.type}</div><p>{project.description}</p><div className="stack-label mono">TECH STACK</div><div className="tags mono">{split(project.tags).map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-highlights">{split(project.highlights, ";").map(highlight => { const [value, ...caption] = highlight.split(" "); return <div key={highlight}><strong>{value}</strong><span className="mono">{caption.join(" ")}</span></div> })}</div></div>
        <div className="project-art"><MechanicalCanvas variant={i} /></div>
      </article>)}</div><div className="project-progress" ref={progressBar} /></div></div>
    </section>
    <div ref={post} className="post-projects-content">
      <section id="skills"><div className="section-label mono">SKILLS</div><div className="skills-scroller" ref={skillScroller} tabIndex={0} aria-label="Skills, scroll horizontally to explore"><div className="skills-track">{[0, 1, 2].map(copy => <div className="skills-grid" key={copy} aria-hidden={copy !== 1} inert={copy !== 1}>{skillGroups.map(({ category, items }) => <div className="skill-column" key={category.id}><h3 className="mono">{category.name}</h3><ul>{items.map(stack => <li key={stack.id}>{mediaUrl(stack.icon) ? <img className={["Next.js", "Vercel", "Express"].includes(stack.name?.trim() || "") ? "dark-icon" : ""} src={mediaUrl(stack.icon)} alt="" /> : <span className="skill-icon">✦</span>}<span className="mono">{stack.name}</span></li>)}</ul></div>)}</div>)}</div></div></section>
      <section id="experience"><div className="section-label mono">EXPERIENCE</div>{jobs.map(job => <article className="job" key={job.id}><div className="job-date mono">{split(job.period || "PRESENT", "→").map((date, i) => <span key={i}>{i > 0 && <b aria-hidden="true">↓</b>}{date}</span>)}</div><div className="job-body"><h3 data-animate>{job.position}</h3><ul data-animate>{job.description.split("\n").filter(Boolean).map(line => <li key={line}>{line}</li>)}</ul></div><div className="job-art" aria-hidden="true" /></article>)}</section>
      <section id="contact"><div className="section-label mono">CONTACT</div><div className="contact-main"><h2 data-animate>Let&apos;s ship something fast and great</h2><p data-animate>Tell me what you&apos;re building. I usually reply within one business day.</p><div className="contact-actions" data-animate><a className="button primary" href={`mailto:${profile.email}`}>{profile.email} &nbsp; →</a><a className="button" href={profile.resume} target="_blank" rel="noreferrer">resume / download</a></div><div className="contact-text-links mono" data-animate><a href={profile.github} target="_blank" rel="noreferrer">github / sidjamyl</a><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin / jamyl-sid</a></div></div></section>
      <footer className="site-footer"><a className="barcode" href="#about" onClick={anchor("about")} aria-label="Back to top"><img src="/assets/portfolio-barcode.png" alt="" /></a><div className="footer-links">{[{ href: profile.linkedin, label: "LinkedIn", icon: <Linkedin size={17} /> }, { href: profile.github, label: "GitHub", icon: <Github size={17} /> }, { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={17} /> }, { href: profile.resume, label: "Download resume", icon: <FileDown size={17} /> }, { href: `tel:${profile.phone.replace(/\s/g, "")}`, label: "Phone", icon: <Phone size={17} /> }, { href: "#about", label: "Back to top", icon: <Home size={17} /> }].map((link, i) => <a key={link.label} href={link.href} aria-label={link.label} onClick={link.href === "#about" ? anchor("about") : undefined} data-animate style={{ transitionDelay: `${i * 90}ms` }}>{link.icon}</a>)}</div></footer>
    </div>
  </div>
}
