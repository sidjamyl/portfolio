"use client"

import { motion } from "framer-motion"
import type { Stack } from '../../../payload-types'
import Image from "next/image"

type StacksSectionProps = {
  stacks: Stack[]
}

function OrbitingStack({ items }: { items: Stack[] }) {
  const radius = 100 // Radius of the orbit circle

  return (
    <div className="relative flex items-center justify-center w-full aspect-square max-w-[300px] mx-auto">
      {/* Center Label */}
      <div className="absolute z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <span className="text-sm font-bold text-white tracking-widest uppercase">
          {typeof items[0]?.StackCategory === 'object' && items[0]?.StackCategory?.name ? items[0].StackCategory.name : ''}
        </span>
      </div>

      {/* Orbital Path (Visual only) */}
      <div className="absolute inset-0 rounded-full border border-white/5" />

      {/* Rotating Container */}
      <div className="absolute inset-0 animate-orbit">
        {items.map((item, i) => {
          const angle = (i / items.length) * 360

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -ml-6 -mt-6 w-12 h-12 flex items-center justify-center"
              style={{
                transform: `rotate(${angle}deg) translate(${radius}px)`,
              }}
            >
              {/* Counter-rotate pour garder les icônes droites */}
              <div 
                className="w-10 h-10 p-2 rounded-full bg-black/50 border border-white/10 backdrop-blur-sm flex items-center justify-center"
                style={{
                  transform: `rotate(-${angle}deg)`,
                }}
              >
                <div className="relative w-full h-full opacity-80">
                  <Image 
                    src={typeof item.icon === 'object' && item.icon?.url ? item.icon.url : '/placeholder.svg'} 
                    alt={item.name || 'Stack icon'} 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function StacksSection({ stacks }: StacksSectionProps) {
  // Grouper les stacks par catégorie
  const categoryMap = new Map<string, Stack[]>()
  
  stacks.forEach(stack => {
    // Vérifier si StackCategory existe et a un nom
    let categoryName = 'Uncategorized'
    
    if (stack.StackCategory) {
      if (typeof stack.StackCategory === 'object' && stack.StackCategory.name) {
        categoryName = stack.StackCategory.name
      } else if (typeof stack.StackCategory === 'number') {
        // Si c'est juste un ID, on ne peut pas l'utiliser
        categoryName = 'Uncategorized'
      }
    }
    
    if (!categoryMap.has(categoryName)) {
      categoryMap.set(categoryName, [])
    }
    categoryMap.get(categoryName)!.push(stack)
  })

  const categorizedStacks = Array.from(categoryMap.entries()).map(([category, items]) => ({
    category,
    items
  }))

  return (
    <section id="stack" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">My Stack</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {categorizedStacks.map((categoryGroup, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <OrbitingStack items={categoryGroup.items} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
