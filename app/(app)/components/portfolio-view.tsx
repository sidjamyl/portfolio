"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Github, Linkedin, Mail, Menu, Phone } from "lucide-react"
import type { Category, Job, Project, Stack } from "@/payload-types"
import { profile } from "../lib/portfolio-content"
import { externalUrl, mediaUrl } from "../lib/portfolio-utils"

type Props = { projects: Project[]; jobs: Job[]; stacks: Stack[]; categories: Category[] }

const links = [
  ["About", "about"],
  ["Clients", "clients"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Contact", "contact"],
]

const split = (value?: string | null, separator = ",") =>
  (value || "").split(separator).map((part) => part.trim()).filter(Boolean)

function ProjectImage({ project }: { project: Project }) {
  const src = mediaUrl(project.media)
  return src ? <img src={src} alt={project.title} /> : <span className="project-initial">{project.title.slice(0, 2)}</span>
}

export function PortfolioView({ projects, jobs, stacks, categories }: Props) {
  const [index, setIndex] = useState(0)
  const [activeSection, setActiveSection] = useState("about")
  const scrollSpace = useRef<HTMLDivElement>(null)
  const projectTrack = useRef<HTMLDivElement>(null)
  const clients = projects.filter((project) => project.section === "clients")
  const personal = projects.filter((project) => project.section !== "clients")
  const orderedCategories = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0))
  const skillGroups = orderedCategories.map((category) => ({
    category,
    items: stacks.filter((stack) => typeof stack.StackCategory === "object" && stack.StackCategory?.id === category.id),
  })).filter((group) => group.items.length)
  const heroSkills = ["Next.js", "TypeScript", "React", "Tailwind CSS", "CSS", "Figma", "Node.js", "NestJS", "MySQL", "Python", "JavaScript", "Vite", "Vercel", "Adobe Illustrator", "Canva", "Express", "REST APIs", "Docker", "Git", "Linux"]
    .map((name) => stacks.find((stack) => stack.name?.trim() === name))
    .filter((stack): stack is Stack => Boolean(stack))

  useEffect(() => {
    const space = scrollSpace.current
    const track = projectTrack.current
    if (!space || !track || personal.length < 2) return
    let frame = 0
    let distance = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.innerWidth <= 700) {
          space.style.height = "auto"
          track.style.transform = ""
          return
        }
        const progress = Math.max(0, Math.min(distance, 88 - space.getBoundingClientRect().top))
        track.style.transform = `translateX(${-progress}px)`
        setIndex(Math.min(personal.length - 1, Math.round(progress / space.clientWidth)))
      })
    }
    const measure = () => {
      distance = track.scrollWidth - space.clientWidth
      space.style.height = window.innerWidth <= 700 ? "auto" : `${distance + Math.min(720, window.innerHeight - 88)}px`
      update()
    }
    measure()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", measure)
    }
  }, [personal.length])

  useEffect(() => {
    const update = () => {
      const current = [...links].reverse().find(([, id]) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 110)
      setActiveSection(current?.[1] || "about")
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return <div className="portfolio">
    <header className="site-header">
      <a className="site-brand mono" href="#about"><span>{profile.name}</span><span className="muted">FULL-STACK DEVELOPER</span></a>
      <nav className="site-nav mono" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav>
      <details className="mobile-menu"><summary aria-label="Open navigation"><Menu size={21} strokeWidth={1} aria-hidden="true" /></summary><nav className="mono" aria-label="Mobile navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>{label}</a>)}</nav></details>
    </header>

    <section id="about">
      <div className="section-label mono">ABOUT</div>
      <div className="hero">
        <div>
          <h1>{profile.name.toUpperCase()}<span aria-hidden="true" /></h1>
          <p className="hero-intro">{profile.summary}</p>
          <div className="hero-tech" aria-label="Selected technologies">{heroSkills.map((stack) => <img className={["Next.js", "Vercel", "Express"].includes(stack.name?.trim() || "") ? "dark-icon" : ""} key={stack.id} src={mediaUrl(stack.icon)} alt={stack.name || "Technology"} title={stack.name || ""} />)}</div>
          <div className="hero-actions"><a className="button primary" href={profile.github} target="_blank" rel="noreferrer"><Github size={20} /> GitHub</a><a className="button" href="#contact"><Mail size={20} /> Contact</a></div>
        </div>
        <figure className="portrait"><img src={profile.portrait} alt="Portrait of SID Jamyl Ryad" /><figcaption className="mono"><span>{profile.name}</span><span className="muted">DEVELOPER</span></figcaption></figure>
      </div>
    </section>

    <section id="clients">
      <div className="section-label mono">CLIENTS</div>
      {clients.map((project, i) => {
        const href = externalUrl(project.CodeLink || project.githubLink)
        return <article className={`client-card ${i % 2 ? "reverse" : ""}`} key={project.id}>
          <div className="client-copy">
            {href && <a className="corner-link" href={href} target="_blank" rel="noreferrer" aria-label={`${project.CodeLink ? "Visit" : "View source for"} ${project.title}`}>↗</a>}
            <h2>{project.title}</h2><div className="eyebrow mono">{project.type}</div>
            <p>{project.description}</p>
            <div className="tags mono">{split(project.tags).map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
          {project.title.toLowerCase().includes("khatt") ?
            <div className="client-visual client-visual-photo"><img className="client-shot" src="/assets/khatt-preview.png" alt="Khatt Production website preview" /></div> :
            <div className="client-visual"><div className="screen"><div className="screen-top"><i /><i /><i /></div><div className="screen-content"><div className="mock-sidebar"><div className="mock-logo"><ProjectImage project={project} /></div>{Array.from({ length: 7 }, (_, n) => <i key={n} />)}</div><div className="mock-main"><div className="mock-heading"><i /><i /></div><div className="mock-cards">{Array.from({ length: 18 }, (_, n) => <i key={n} />)}</div><div className="mock-bars"><i /><i /></div></div></div><div className="screen-bottom"><i /><i /></div></div></div>}
        </article>
      })}
    </section>

    <section id="projects">
      <div className="section-label mono projects-heading"><span>PROJECTS</span>{personal.length > 1 && <span className="project-controls" aria-hidden="true">{personal.map((project, i) => <span key={project.id} className={i === index ? "active" : ""} />)}</span>}</div>
      <div className="projects-scroll-space" ref={scrollSpace}><div className="projects-pinned"><div className="projects-track" ref={projectTrack}>{personal.map((project) => <article className="project-card" key={project.id}>
        <div className="project-copy"><div className="project-links">{project.githubLink && <a href={externalUrl(project.githubLink)} aria-label={`View ${project.title} source on GitHub`} target="_blank" rel="noreferrer"><Github size={19} /></a>}{project.CodeLink && <a href={externalUrl(project.CodeLink)} aria-label={`Visit ${project.title}`} target="_blank" rel="noreferrer"><ArrowUpRight size={20} /></a>}</div><h2>{project.title}</h2><div className="eyebrow mono">{project.type}</div><p>{project.description}</p><div className="stack-label mono">TECH STACK</div><div className="tags mono">{split(project.tags).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-highlights mono">{split(project.highlights, ";").map((highlight) => <span key={highlight}>{highlight}</span>)}</div></div>
        <div className="project-art"><ProjectImage project={project} /></div>
      </article>)}</div></div></div>
    </section>

    <section id="skills"><div className="section-label mono">SKILLS</div><div className="skills-grid">{skillGroups.map(({ category, items }) => <div className="skill-column" key={category.id}><h3 className="mono">{category.name}</h3><ul>{items.map((stack) => <li key={stack.id}>{mediaUrl(stack.icon) ? <img src={mediaUrl(stack.icon)} alt="" /> : <span className="skill-icon">✦</span>}<span className="mono">{stack.name}</span></li>)}</ul></div>)}</div></section>

    <section id="experience"><div className="section-label mono">EXPERIENCE</div>{jobs.map((job) => <article className="job" key={job.id}><div className="job-date mono">{job.period || "PRESENT"}</div><div className="job-body"><h3>{job.position}</h3><ul>{job.description.split("\n").filter(Boolean).map((line) => <li key={line}>{line}</li>)}</ul></div><div className="job-art" aria-hidden="true">{mediaUrl(job.image) && <img src={mediaUrl(job.image)} alt="" />}</div></article>)}</section>

    <section id="contact"><div className="section-label mono">CONTACT</div><div className="contact-main"><h2>Let&apos;s ship something fast and great</h2><p>Tell me what you&apos;re building. I usually reply within one business day.</p><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}>{profile.email} &nbsp; →</a><a className="button" href={profile.resume} target="_blank" rel="noreferrer">resume / download</a></div><div className="contact-text-links mono"><a href={profile.github} target="_blank" rel="noreferrer">github / sidjamyl</a><a href={profile.linkedin} target="_blank" rel="noreferrer">linkedin / jamyl-sid</a><a href={`tel:${profile.phone.replace(/\s/g, "")}`}>call / {profile.phone}</a></div></div><footer className="site-footer"><a className="barcode" href="#about" aria-label="Back to top">|||| SID JAMYL ||||</a><div className="footer-links"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a><a href={profile.resume} target="_blank" rel="noreferrer" aria-label="Download resume">CV</a><a href={`tel:${profile.phone.replace(/\s/g, "")}`} aria-label={`Call ${profile.phone}`}><Phone size={17} /></a></div></footer></section>
  </div>
}
