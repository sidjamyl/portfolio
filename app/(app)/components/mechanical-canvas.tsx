"use client"

import { useEffect, useRef } from "react"

type Point = [number, number, number]
type Segment = [Point, Point]

function geometry(variant: number) {
  const lines: Segment[] = []
  const groups: [number, number][] = []
  const ring = (radius: number, y: number, plane = 0, count = 48, phase = 0) => {
    const points: Point[] = Array.from({ length: count + 1 }, (_, i) => {
      const angle = i / count * Math.PI * 2 + phase
      const a = radius * Math.cos(angle), b = radius * Math.sin(angle)
      return plane === 1 ? [a, b, y] : plane === 2 ? [y, a, b] : [a, y, b]
    })
    for (let i = 1; i < points.length; i++) lines.push([points[i - 1], points[i]])
  }
  const cylinder = (radius: number, height: number, y = 0, count = 12) => {
    const start = lines.length
    ring(radius, y - height / 2, 0, count, Math.PI / 2)
    ring(radius, y + height / 2, 0, count, Math.PI / 2)
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2
      lines.push([[radius * Math.sin(angle), y - height / 2, radius * Math.cos(angle)], [radius * Math.sin(angle), y + height / 2, radius * Math.cos(angle)]])
    }
    groups.push([start, lines.length])
  }
  const torus = (radius: number, tube: number, count: number, sides: number, plane = 1) => {
    const start = lines.length
    for (let i = 0; i < sides; i++) { const angle = i / sides * Math.PI * 2; ring(radius + tube * Math.cos(angle), tube * Math.sin(angle), plane, count) }
    groups.push([start, lines.length])
  }
  const gear = (radius: number, root: number, teeth: number, cx = 0, cy = 0, rotation = 0) => {
    const start = lines.length
    const points: Point[] = Array.from({ length: teeth * 4 + 1 }, (_, i) => {
      const angle = i / (teeth * 4) * Math.PI * 2 + rotation
      const r = i % 4 === 0 || i % 4 === 3 ? root : radius
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle), -.101]
    })
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1], b = points[i]
      lines.push([a, b], [[a[0], a[1], .101], [b[0], b[1], .101]], [a, [a[0], a[1], .101]])
    }
    groups.push([start, lines.length])
  }
  if (variant % 4 === 0) {
    cylinder(.094, 2.66, 0, 6); cylinder(.3, .75, 0, 6)
    cylinder(.39, .072, -.375, 8); cylinder(.39, .072, .375, 8)
    for (const y of [-1.164, -.831, -.499, .499, .831, 1.164]) cylinder(.194, .029, y)
  } else if (variant % 4 === 1) {
    cylinder(.2, .5, 0, 10); torus(1, .05, 40, 6, 0)
    for (let i = 0; i < 8; i++) {
      const start = lines.length
      const angle = i * Math.PI / 4, c = Math.cos(angle), s = Math.sin(angle)
      const point = (x: number, y: number, z: number): Point => [x * c - z * s + .62 * c, y, z * c + x * s + .62 * s]
      for (const y of [-.21, .21]) {
        const p = [point(-.25, y, -.025), point(.25, y, -.025), point(.25, y, .025), point(-.25, y, .025)]
        p.forEach((a, j) => lines.push([a, p[(j + 1) % 4]]))
      }
      for (const x of [-.25, .25]) for (const z of [-.025, .025]) lines.push([point(x, -.21, z), point(x, .21, z)])
      groups.push([start, lines.length])
    }
  } else if (variant % 4 === 2) {
    for (let p = 0; p < 3; p++) torus(.9, .055, 64, 4, p)
    cylinder(.03, 2.07, 0, 4)
  } else {
    torus(1.012, .064, 56, 6); gear(.405, .304, 12)
    for (let i = 0; i < 4; i++) gear(.278, .202, 8, .683 * Math.cos(i * Math.PI / 2), .683 * Math.sin(i * Math.PI / 2), i * Math.PI / 2 + Math.PI / 8)
  }
  return { lines, groups }
}

export function MechanicalCanvas({ variant }: { variant: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return
    const { lines, groups } = geometry(variant)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let frame = 0, visible = false, elapsed = 0, drawElapsed = 0, previous = 0
    const render = (time: number) => {
      const delta = previous ? Math.min(time - previous, 50) : 0
      elapsed += delta; drawElapsed += delta
      previous = time
      const width = canvas.clientWidth, height = canvas.clientHeight
      const ratio = Math.min(window.devicePixelRatio, 2)
      if (canvas.width !== width * ratio || canvas.height !== height * ratio) { canvas.width = width * ratio; canvas.height = height * ratio }
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      const xAngle = reduced ? .5 : elapsed * .00024, yAngle = reduced ? .8 : elapsed * .00042
      const scale = window.innerWidth < 1024 ? 1.84 : 1.15
      const project = ([x, y, z]: Point) => {
        const x1 = x * Math.cos(yAngle) + z * Math.sin(yAngle), z1 = z * Math.cos(yAngle) - x * Math.sin(yAngle)
        const y1 = y * Math.cos(xAngle) - z1 * Math.sin(xAngle), z2 = y * Math.sin(xAngle) + z1 * Math.cos(xAngle)
        const distance = Math.hypot(2.4, 1.7, 3.8), horizontal = Math.hypot(2.4, 3.8)
        const right = (3.8 * x1 - 2.4 * z2) / horizontal
        const up = -(2.4 * 1.7 * x1 + 3.8 * 1.7 * z2) / (distance * horizontal) + horizontal * y1 / distance
        const depth = distance - scale * (2.4 * x1 + 1.7 * y1 + 3.8 * z2) / distance
        const focal = height / (2 * Math.tan(42 * Math.PI / 360))
        return [width / 2 + right * scale * focal / depth, height / 2 - up * scale * focal / depth]
      }
      context.strokeStyle = "#e8e8e8"; context.lineWidth = 1; context.beginPath()
      let count = 0
      for (const [start, end] of groups) {
        const visibleEnd = start + Math.floor((end - start) * (reduced ? 1 : Math.min(1, drawElapsed / 2000)))
        count += visibleEnd - start
        for (let i = start; i < visibleEnd; i++) { const a = project(lines[i][0]), b = project(lines[i][1]); context.moveTo(a[0], a[1]); context.lineTo(b[0], b[1]) }
      }
      context.stroke()
      canvas.dataset.drawnSegments = String(count)
      if (visible && !reduced) frame = requestAnimationFrame(render)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame); previous = 0
      if (visible) { drawElapsed = 0; frame = requestAnimationFrame(render) }
    })
    observer.observe(canvas)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [variant])
  return <canvas ref={ref} className="mechanical-canvas" aria-hidden="true" />
}
