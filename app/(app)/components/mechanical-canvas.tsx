"use client"

import { useEffect, useRef } from "react"

type Point = [number, number, number]
type Segment = [Point, Point]

function geometry(variant: number) {
  const lines: Segment[] = []
  const ring = (radius: number, y: number, plane = 0, count = 48) => {
    const points: Point[] = Array.from({ length: count + 1 }, (_, i) => {
      const angle = i / count * Math.PI * 2
      const a = radius * Math.cos(angle), b = radius * Math.sin(angle)
      return plane === 1 ? [a, b, y] : plane === 2 ? [y, a, b] : [a, y, b]
    })
    for (let i = 1; i < points.length; i++) lines.push([points[i - 1], points[i]])
  }
  const cylinder = (radius: number, height: number, y = 0, count = 12) => {
    ring(radius, y - height / 2, 0, count)
    ring(radius, y + height / 2, 0, count)
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2
      lines.push([[radius * Math.cos(angle), y - height / 2, radius * Math.sin(angle)], [radius * Math.cos(angle), y + height / 2, radius * Math.sin(angle)]])
    }
  }
  const gear = (radius: number, teeth: number, cx = 0, cy = 0) => {
    const points: Point[] = Array.from({ length: teeth * 4 + 1 }, (_, i) => {
      const angle = i / (teeth * 4) * Math.PI * 2
      const r = radius * (i % 4 === 0 || i % 4 === 3 ? .75 : 1)
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle), -.1]
    })
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i]
      lines.push([a, b], [[a[0], a[1], .1], [b[0], b[1], .1]], [a, [a[0], a[1], .1]])
    }
  }
  if (variant % 4 === 0) {
    cylinder(.094, 2.66, 0, 6); cylinder(.3, .75, 0, 6)
    cylinder(.39, .072, -.375, 8); cylinder(.39, .072, .375, 8)
    for (const y of [-1.164, -.831, -.499, .499, .831, 1.164]) cylinder(.194, .029, y)
  } else if (variant % 4 === 1) {
    cylinder(.2, .5, 0, 10); ring(1, 0); ring(.95, 0)
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4, c = Math.cos(angle), s = Math.sin(angle)
      const point = (x: number, y: number, z: number): Point => [x * c + z * s + .62 * c, y, z * c - x * s + .62 * s]
      for (const y of [-.21, .21]) {
        const p = [point(-.25, y, -.025), point(.25, y, -.025), point(.25, y, .025), point(-.25, y, .025)]
        p.forEach((a, j) => lines.push([a, p[(j + 1) % 4]]))
      }
      for (const x of [-.25, .25]) for (const z of [-.025, .025]) lines.push([point(x, -.21, z), point(x, .21, z)])
    }
  } else if (variant % 4 === 2) {
    for (let p = 0; p < 3; p++) { ring(.9, 0, p, 64); ring(.955, 0, p, 64) }
    cylinder(.03, 2.07, 0, 4)
  } else {
    ring(1.012, 0, 1, 56); ring(1.076, 0, 1, 56); gear(.405, 12)
    for (let i = 0; i < 4; i++) gear(.278, 8, .683 * Math.cos(i * Math.PI / 2), .683 * Math.sin(i * Math.PI / 2))
  }
  return lines
}

export function MechanicalCanvas({ variant }: { variant: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return
    const lines = geometry(variant)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0, visible = false, elapsed = 0, previous = 0
    const render = (time: number) => {
      elapsed += previous ? Math.min(time - previous, 50) : 0
      previous = time
      const width = canvas.clientWidth, height = canvas.clientHeight
      const ratio = Math.min(window.devicePixelRatio, 2)
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) { canvas.width = width * ratio; canvas.height = height * ratio }
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      const xAngle = reduced ? .5 : elapsed * .00024, yAngle = reduced ? .8 : elapsed * .00042
      const scale = window.innerWidth < 1024 ? 1.84 : 1.15
      const project = ([x, y, z]: Point) => {
        const y1 = y * Math.cos(xAngle) - z * Math.sin(xAngle), z1 = y * Math.sin(xAngle) + z * Math.cos(xAngle)
        const x1 = x * Math.cos(yAngle) + z1 * Math.sin(yAngle), z2 = z1 * Math.cos(yAngle) - x * Math.sin(yAngle)
        const right = x1 * .845 - z2 * .534
        const up = -.189 * x1 + .933 * y1 - .3 * z2
        const depth = 4.8 - scale * (.5 * x1 + .354 * y1 + .791 * z2)
        const focal = height / (2 * Math.tan(42 * Math.PI / 360))
        return [width / 2 + right * scale * focal / depth, height / 2 - up * scale * focal / depth]
      }
      context.strokeStyle = "#e8e8e8"; context.lineWidth = 1; context.beginPath()
      const count = reduced ? lines.length : Math.floor(Math.min(1, elapsed / 2000) * lines.length)
      for (let i = 0; i < count; i++) { const a = project(lines[i][0]), b = project(lines[i][1]); context.moveTo(a[0], a[1]); context.lineTo(b[0], b[1]) }
      context.stroke()
      canvas.dataset.drawnSegments = String(count)
      if (visible && !reduced) frame = requestAnimationFrame(render)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame); previous = 0
      if (visible) frame = requestAnimationFrame(render)
    })
    observer.observe(canvas)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [variant])
  return <canvas ref={ref} className="mechanical-canvas" aria-hidden="true" />
}
