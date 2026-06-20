import config from "@payload-config"
import { getPayload } from "payload"
import type { CollectionSlug, Where } from "payload"
import type { Job, Project, Stack, Title } from "@/payload-types"
import { ContactSection } from "./components/contact-section"
import { HeroSection } from "./components/hero-section"
import { JobsSection } from "./components/jobs-section"
import { ProjectsSection } from "./components/projects-section"
import { SidePanel } from "./components/side-panel"
import { StacksSection } from "./components/stacks-section"
import { WinsSection } from "./components/wins-section"

export const dynamic = "force-dynamic"

async function safeFind<T>({
  collection,
  depth,
  limit,
  sort,
  where,
}: {
  collection: CollectionSlug
  depth?: number
  limit?: number
  sort?: string
  where?: Where
}): Promise<T[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection,
      depth,
      limit,
      sort,
      where,
    })

    return result.docs as T[]
  } catch (error) {
    console.error(`Payload fetch failed for ${collection}:`, error)
    return []
  }
}

export default async function Portfolio() {
  const [projects, stacks, jobs, titles] = await Promise.all([
    safeFind<Project>({ collection: "projects", depth: 2, limit: 24, sort: "createdAt" }),
    safeFind<Stack>({ collection: "stacks", depth: 2, limit: 1000 }),
    safeFind<Job>({ collection: "jobs", depth: 2, sort: "order", limit: 24 }),
    safeFind<Title>({
      collection: "titles",
      sort: "order",
      limit: 24,
      where: {
        isActive: {
          equals: true,
        },
      },
    }),
  ])

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[440px_minmax(0,1fr)]">
      <SidePanel />
      <main className="relative min-w-0">
        <HeroSection titles={titles} />
        <ProjectsSection projects={projects} />
        <JobsSection jobs={jobs} />
        <StacksSection stacks={stacks} />
        <WinsSection />
        <ContactSection />
      </main>
    </div>
  )
}
