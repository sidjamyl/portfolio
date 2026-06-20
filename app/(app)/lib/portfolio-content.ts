import type { Job, Project, Stack } from "@/payload-types"

export const profile = {
  name: "SID Jamyl Ryad",
  shortName: "Jamyl",
  role: "Etudiant ingenieur en informatique",
  headline: "Full-stack developer, product-minded builder.",
  location: "Alger, DZ",
  email: "nj_sid@esi.dz",
  phone: "0553591781",
  github: "https://github.com/sidjamyl",
  linkedin: "https://www.linkedin.com/in/jamyl-sid-723820285/",
  resume: "/assets/CV_SIDJAMYL.pdf",
  portrait: "/assets/jamyl-portrait.webp",
  availability: "Disponible pour projets web, produits internes et missions full-stack.",
  summary:
    "Je transforme des besoins metier en plateformes web claires, solides et livrables.",
}

export const navItems = [
  { number: "01", label: "About", href: "#about" },
  { number: "02", label: "Projects", href: "#projects" },
  { number: "03", label: "Experience", href: "#experience" },
  { number: "04", label: "Stack", href: "#stack" },
  { number: "05", label: "Wins", href: "#wins" },
  { number: "06", label: "Contact", href: "#contact" },
]

export const fallbackTitles = [
  "Full-stack developer",
  "ESI Algiers CS engineering student",
  "Product-minded builder",
  "AI and business systems explorer",
]

export const heroStats = [
  { value: "1CS", label: "Cycle superieur ESI Alger" },
  { value: "120+", label: "Personnes coordonnees a l'ESI" },
  { value: "100+", label: "Membres multimedia pilotes" },
  { value: "15k", label: "Audience club geree" },
]

export const workingModes = [
  {
    title: "Du besoin au produit",
    text: "Analyse metier, structuration du workflow, prototype, implementation et livraison.",
  },
  {
    title: "Interfaces utiles",
    text: "Je cherche des ecrans rapides a comprendre, solides en production et agreables a utiliser.",
  },
  {
    title: "Culture shipping",
    text: "Je prefere les iterations concretes: mesurer, corriger, simplifier, puis pousser plus loin.",
  },
]

type ProjectMeta = {
  year: string
  role: string
  stack: string[]
  metrics: { value: string; label: string }[]
  accent: "lime" | "cyan" | "coral" | "gold"
}

const projectMetas: Array<{ test: RegExp; meta: ProjectMeta }> = [
  {
    test: /esi-maint/i,
    meta: {
      year: "2025-2026",
      role: "Chef de projet",
      stack: ["Next.js", "NestJS", "Assistant IA", "Gestion SI"],
      metrics: [
        { value: "IA", label: "assistant integre" },
        { value: "SI", label: "materiel + interventions" },
        { value: "ESI", label: "terrain reel" },
      ],
      accent: "lime",
    },
  },
  {
    test: /gig/i,
    meta: {
      year: "2025-2026",
      role: "Full-stack developer",
      stack: ["Next.js", "Backend", "Analyse metier", "Dashboard"],
      metrics: [
        { value: "B2B", label: "usage interne" },
        { value: "0-1", label: "conception complete" },
        { value: "GIG", label: "assurance" },
      ],
      accent: "cyan",
    },
  },
  {
    test: /khatt/i,
    meta: {
      year: "2025",
      role: "Web developer",
      stack: ["Landing page", "UI", "Production video"],
      metrics: [
        { value: "Brand", label: "showcase creatif" },
        { value: "Web", label: "site vitrine" },
        { value: "Motion", label: "identite media" },
      ],
      accent: "coral",
    },
  },
  {
    test: /solidary|pay/i,
    meta: {
      year: "2025",
      role: "Hackathon builder",
      stack: ["Dons", "Impact", "Plateforme web"],
      metrics: [
        { value: "1st", label: "Djezzy Code Fest" },
        { value: "CSR", label: "entreprises engagees" },
        { value: "Team", label: "solution livree" },
      ],
      accent: "gold",
    },
  },
  {
    test: /uno/i,
    meta: {
      year: "2024",
      role: "C developer",
      stack: ["C", "Structures de donnees", "Terminal UI"],
      metrics: [
        { value: "C", label: "bas niveau" },
        { value: "CLI", label: "interface ASCII" },
        { value: "DSA", label: "stacks + queues" },
      ],
      accent: "cyan",
    },
  },
]

const accentFallbacks: ProjectMeta["accent"][] = ["lime", "cyan", "coral", "gold"]

export function getProjectMeta(project: Project, index: number): ProjectMeta {
  const title = project.title || ""
  return (
    projectMetas.find((entry) => entry.test.test(title))?.meta || {
      year: "2026",
      role: project.type || "Builder",
      stack: splitStack(project.type),
      metrics: [
        { value: "Web", label: "application" },
        { value: "UX", label: "interface" },
        { value: "Ship", label: "livraison" },
      ],
      accent: accentFallbacks[index % accentFallbacks.length],
    }
  )
}

export function splitStack(value?: string | null): string[] {
  if (!value) return ["Next.js", "TypeScript", "Product"]
  return value
    .split(/[,&/|]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5)
}

export const fallbackProjects: Project[] = [
  {
    id: -1,
    title: "ESI-MAINT",
    description:
      "Plateforme de gestion du materiel et des interventions de maintenance pour suivre les equipements, organiser les tickets et assister les equipes avec de l'IA.",
    type: "Web / AI app",
    githubLink: "https://github.com/Aeternum-ESI/",
    CodeLink: "",
    updatedAt: "",
    createdAt: "",
  },
  {
    id: -2,
    title: "GIG Training Platform",
    description:
      "Outil interne de gestion de formations pour GIG Assurance, de l'analyse des besoins jusqu'au developpement complet de l'interface et des workflows.",
    type: "Internal web app",
    githubLink: "https://github.com/sidjamyl/GIG-APP/",
    CodeLink: "",
    updatedAt: "",
    createdAt: "",
  },
  {
    id: -3,
    title: "Plateforme S2EE",
    description:
      "Contribution a la plateforme du Salon de l'Emploi de l'ESI, avec un focus sur l'organisation, la coordination et les besoins de l'evenement.",
    type: "Event platform",
    githubLink: "",
    CodeLink: "",
    updatedAt: "",
    createdAt: "",
  },
]

export const experienceDetails = [
  {
    test: /\bib\s*[- ]?\s*software\b/i,
    period: "08/2025 - Present",
    org: "IB Software",
    title: "Developpeur Full Stack",
    bullets: [
      "Developpement de solutions logicielles pour clients professionnels.",
      "Participation a des projets d'envergure, notamment GIG Assurance.",
      "Contribution sur l'analyse metier, le backend, le frontend et la livraison.",
    ],
  },
  {
    test: /freelance/i,
    period: "05/2024 - Present",
    org: "Freelance",
    title: "Developpeur Web Full Stack",
    bullets: [
      "Applications web et mobile e-commerce pour grossiste.",
      "Plateformes metier et sites vitrines: Joumla Store, Myroom immobilier, Khatt Production, IB Software.",
      "Gestion du cycle complet: besoin, design, developpement, deploiement.",
    ],
  },
  {
    test: /etic|develop/i,
    period: "2024 - Present",
    org: "ETIC",
    title: "Coordination, communication et developpement",
    bullets: [
      "Coordinateur du Salon de l'emploi ESI 17 avec plus de 120 personnes mobilisees.",
      "Responsable Communication & Multimedia: equipe de 100 membres et audience de 15k abonnes.",
      "Contribution a des projets web publics et internes pour le club.",
    ],
  },
]

export function getExperienceDetail(job: Job, index: number) {
  const source = `${job.position} ${job.description}`
  return (
    experienceDetails.find((detail) => detail.test.test(source)) || {
      period: index === 0 ? "Present" : "Recent",
      org: job.position,
      title: job.position,
      bullets: [job.description],
    }
  )
}

export const fallbackJobs: Job[] = [
  {
    id: -1,
    position: "Developpeur Full Stack at IB Software",
    description: "Developpement de solutions logicielles pour clients professionnels.",
    image: -1,
    order: 0,
    updatedAt: "",
    createdAt: "",
  },
  {
    id: -2,
    position: "Freelance Web Developer",
    description: "Creation de plateformes web, mobile et sites vitrines.",
    image: -1,
    order: 1,
    updatedAt: "",
    createdAt: "",
  },
  {
    id: -3,
    position: "ETIC Coordination",
    description: "Coordination evenementielle, communication et projets web.",
    image: -1,
    order: 2,
    updatedAt: "",
    createdAt: "",
  },
]

export const hackathons = [
  {
    event: "Djezzy Code Fest",
    date: "03/2025",
    result: "Equipe gagnante",
    text: "Plateforme de dons connectant donateurs et entreprises socialement responsables.",
  },
  {
    event: "MicroHack",
    date: "04/2024",
    result: "GED",
    text: "Solution autour de la gestion electronique des documents.",
  },
  {
    event: "MicroHack 3",
    date: "02/2026",
    result: "Innovation POC",
    text: "Outil de generation rapide de POC base sur l'exploitation de papiers de recherche.",
  },
  {
    event: "Forsa Hackathon",
    date: "12/2025",
    result: "Bot bilingue",
    text: "Centralisation des offres de services Algerie Telecom en arabe et francais.",
  },
]

export const fallbackStacks = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["NestJS", "Express", "Node.js", "REST APIs", "Docker"],
  },
  {
    category: "IA & Data",
    items: ["LangChain", "LangGraph", "AI SDK", "Python", "RAG", "Agents"],
  },
  {
    category: "Langages",
    items: ["TypeScript", "JavaScript", "Python", "C", "SQL"],
  },
  {
    category: "Produit",
    items: ["Analyse metier", "Modelisation SI", "Gestion de projet", "Figma", "Coordination"],
  },
]

export function groupStacks(stacks: Stack[]) {
  const groups = new Map<string, Stack[]>()

  stacks.forEach((stack) => {
    const category =
      typeof stack.StackCategory === "object" && stack.StackCategory?.name
        ? stack.StackCategory.name.trim()
        : "Other"

    if (!groups.has(category)) groups.set(category, [])
    groups.get(category)?.push(stack)
  })

  return Array.from(groups.entries()).map(([category, items]) => ({ category, items }))
}
