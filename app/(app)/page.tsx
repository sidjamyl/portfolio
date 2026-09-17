import config from "@payload-config"
import { getPayload } from "payload"
import type { Category, Job, Project, Stack } from "@/payload-types"
import { PortfolioView } from "./components/portfolio-view"

export const dynamic = "force-dynamic"

export default async function Portfolio() {
  const payload = await getPayload({ config })
  const [projects, jobs, stacks, categories] = await Promise.all([
    payload.find({ collection: "projects", depth: 1, limit: 100, sort: "order" }),
    payload.find({ collection: "jobs", depth: 1, limit: 100, sort: "order" }),
    payload.find({ collection: "stacks", depth: 1, limit: 100, sort: "order" }),
    payload.find({ collection: "categories", limit: 100, sort: "order" }),
  ])

  return <PortfolioView projects={projects.docs as Project[]} jobs={jobs.docs as Job[]} stacks={stacks.docs as Stack[]} categories={categories.docs as Category[]} />
}
