"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,        // Durée de l'animation (plus élevé = plus lent)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing personnalisé
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,  // Réduire la vitesse de la molette
      touchMultiplier: 1.5,  // Ajuster la vitesse tactile
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
