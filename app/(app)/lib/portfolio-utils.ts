import type { Media } from "@/payload-types"

export function mediaUrl(media: Media | number | null | undefined, fallback = "") {
  if (!media || typeof media === "number") return fallback
  if (media.url) return media.url
  if (!media.filename) return fallback

  const encoded = media.filename.split("/").map(encodeURIComponent).join("/")
  return `/api/media/file/${encoded}`
}

export function mediaAlt(media: Media | number | null | undefined, fallback: string) {
  if (!media || typeof media === "number") return fallback
  return media.alt || fallback
}

export function externalUrl(url?: string | null) {
  if (!url) return ""

  const value = url.trim()
  if (!value) return ""
  if (value.startsWith("#") || value.startsWith("/") || value.startsWith("mailto:")) return value
  if (/^https?:\/\//i.test(value)) return value
  if (/^\d{1,3}(\.\d{1,3}){3}(:\d+)?/.test(value)) return `http://${value}`
  return `https://${value}`
}

export function initials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}
