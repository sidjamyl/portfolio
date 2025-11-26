import { DockNav } from "./components/dock-nav"
import { HeroSection } from "./components/hero-section"
import { AboutSection } from "./components/about-section"
import { JobsSection } from "./components/jobs-section"
import { ProjectsSection } from "./components/projects-section"
import { StacksSection } from "./components/stacks-section"
import { ContactSection } from "./components/contact-section"
import { getPayload } from 'payload'
import config from '@payload-config'
export default async function Portfolio() {

  const payload = await getPayload({ config })

  
  let projects = await payload.find({ 
    collection: 'projects',
  }).then((res) => res.docs)

  let stacks = await payload.find({ 
    collection: 'stacks',
    depth: 2, // Populate les relations (StackCategory et icon)
    limit: 1000, // Augmenter la limite par défaut
  }).then((res) => {
    console.log('Total stacks fetched:', res.docs.length)
    console.log('Stacks with categories:', res.docs.filter(s => s.StackCategory).length)
    return res.docs
  })

  let jobs = await payload.find({ 
    collection: 'jobs',
    sort: 'order',
  }).then((res) => res.docs)

  let titles = await payload.find({ 
    collection: 'titles',
    sort: 'order',
    where: {
      isActive: {
        equals: true,
      },
    },
  }).then((res) => res.docs)

  return (
    <main className="relative min-h-screen w-full selection:bg-blue-500/30">
      <HeroSection titles={titles} />
      <AboutSection />
      <JobsSection jobs={jobs} />
      <ProjectsSection projects={projects} />
      <StacksSection stacks={stacks} />
      <ContactSection />

      {/* Mobile padding for dock */}
      <div className="h-24 md:h-0" />

      <DockNav />
    </main>
  )
}
