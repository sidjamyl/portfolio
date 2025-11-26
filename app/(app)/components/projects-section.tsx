"use client"
import { GlassCard } from "./ui/glass-card"
import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
// Importe le type généré par Payload pour l'autocomplétion
import type { Project } from '@/payload-types' 

// 1. On définit le type des props attendues
type ProjectsSectionProps = {
  projects: Project[]
}

// 2. RETIRE "async" (interdit sur les "use client") et AJOUTE les accolades { } autour de projects
export function ProjectsSection({ projects }: ProjectsSectionProps) {

  return (

    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Projects</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
           // 3. Gestion sécurisée de l'image (Payload peut renvoyer un ID ou un objet Media)
           const mediaUrl = typeof project.media === 'object' && project.media?.url 
             ? project.media.url 
             : "/placeholder.svg";
           
           const mediaAlt = typeof project.media === 'object' && project.media?.alt
             ? project.media.alt 
             : project.title;

           return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col p-0 overflow-hidden group hover:bg-white/10 transition-colors duration-300">
                <div className="relative w-full pt-[56.25%] bg-black/20 border-b border-white/5">
                  <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <div className="relative w-full h-full max-w-[85%] max-h-[85%] mx-auto rounded-lg overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={mediaUrl} // Utilisation de l'URL sécurisée
                        alt={mediaAlt || "Project Image"}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                        {/* Assure-toi que 'type' existe dans ta collection Project */}
                        {project.type} 
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                    {/* Assure-toi que description existe */}
                    {project.description} 
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex gap-3">
                      {/* Vérifie si githubLink existe avant d'afficher le bouton */}
                      {project.githubLink && (
                        <Link
                          href={project.githubLink}
                          className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                        >
                          <Github size={20} />
                        </Link>
                      )}
                    </div>
                    
                    {project.CodeLink && (
                      <Link
                        href={project.CodeLink}
                        className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-300 transition-colors group/link"
                      >
                        View Project
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}