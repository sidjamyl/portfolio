"use client"

import { useState } from "react"
import { Github, Mail, Menu } from "lucide-react"
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
  const clients = projects.filter((project) => project.section === "clients")
  const personal = projects.filter((project) => project.section !== "clients")
  const current = personal[index % personal.length]
  const orderedCategories = [...categories].sort((a, b) => (a.order || 0) - (b.order || 0))
  const skillGroups = orderedCategories.map((category) => ({
    category,
    items: stacks.filter((stack) => typeof stack.StackCategory === "object" && stack.StackCategory?.id === category.id),
  })).filter((group) => group.items.length)
  const heroSkills = ["Next.js", "TypeScript", "React", "Tailwind CSS", "CSS", "Figma", "Node.js", "NestJS", "MySQL", "Python"]
    .map((name) => stacks.find((stack) => stack.name?.trim() === name))
    .filter((stack): stack is Stack => Boolean(stack))

  return <div className="portfolio">
    <header className="site-header">
      <a className="site-brand mono" href="#about"><span>{profile.name}</span><span className="muted">FULL-STACK DEVELOPER</span></a>
      <nav className="site-nav mono" aria-label="Main navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <details className="mobile-menu"><summary aria-label="Open navigation"><Menu size={21} strokeWidth={1} aria-hidden="true" /></summary><nav className="mono" aria-label="Mobile navigation">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></details>
    </header>

    <section id="about">
      <div className="section-label mono">ABOUT</div>
      <div className="hero">
        <div>
          <h1>{profile.name.toUpperCase()}<span aria-hidden="true" /></h1>
          <p className="hero-intro">{profile.summary}</p>
          <div className="hero-tech" aria-label="Selected technologies">{heroSkills.map((stack) => <img className={stack.name?.trim() === "Next.js" ? "dark-icon" : ""} key={stack.id} src={mediaUrl(stack.icon)} alt={stack.name || "Technology"} title={stack.name || ""} />)}</div>
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
            {href && <a className="corner-link" href={href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}>↗</a>}
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
      <div className="section-label mono projects-heading"><span>PROJECTS</span>{personal.length > 1 && <span className="project-controls">{personal.map((project, i) => <button type="button" key={project.id} aria-label={`Show project ${i + 1}: ${project.title}`} aria-current={i === index} onClick={() => setIndex(i)}>{i === index ? "■" : "□"}</button>)}</span>}</div>
      {current && <article className="project-card" key={current.id}>
        <div className="project-art"><div className="project-links">{current.githubLink && <a href={externalUrl(current.githubLink)} aria-label="View source on GitHub" target="_blank" rel="noreferrer">⌘</a>}{current.CodeLink && <a href={externalUrl(current.CodeLink)} aria-label="Visit project" target="_blank" rel="noreferrer">↗</a>}</div><ProjectImage project={current} /></div>
        <div className="project-copy"><h2>{current.title}</h2><div className="eyebrow mono">{current.type}</div><p>{current.description}</p><div className="stack-label mono">TECH STACK</div><div className="tags mono">{split(current.tags).map((tag) => <span key={tag}>{tag}</span>)}</div><div className="project-highlights mono">{split(current.highlights, ";").map((highlight) => <span key={highlight}>{highlight}</span>)}</div></div>
      </article>}
    </section>

    <section id="skills"><div className="section-label mono">SKILLS</div><div className="skills-grid">{skillGroups.map(({ category, items }) => <div className="skill-column" key={category.id}><h3 className="mono">{category.name}</h3><ul>{items.map((stack) => <li key={stack.id}>{mediaUrl(stack.icon) ? <img src={mediaUrl(stack.icon)} alt="" /> : <span className="skill-icon">✦</span>}<span className="mono">{stack.name}</span></li>)}</ul></div>)}</div></section>

    <section id="experience"><div className="section-label mono">EXPERIENCE</div>{jobs.map((job) => <article className="job" key={job.id}><div className="job-date mono">{job.period || "PRESENT"}</div><div className="job-body"><h3>{job.position}</h3><ul>{job.description.split("\n").filter(Boolean).map((line) => <li key={line}>{line}</li>)}</ul></div><div className="job-art" aria-hidden="true" /></article>)}</section>

    <section id="contact"><div className="section-label mono">CONTACT</div><div className="contact-main"><h2>Let&apos;s ship something fast and great</h2><p>Tell me what you&apos;re building. I usually reply within one business day.</p><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}>{profile.email} &nbsp; →</a><a className="button" href={profile.resume} target="_blank" rel="noreferrer">resume / download</a></div></div><footer className="site-footer"><a className="barcode" href="#about" aria-label="Back to top">|||| SID JAMYL ||||</a><div className="footer-links"><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">◉</a><a href={`mailto:${profile.email}`} aria-label="Email">✉</a></div></footer></section>
  </div>
}
