import type React from "react"
import localFont from "next/font/local"
import "./globals.css"
import { SmoothScroll } from "./components/smooth-scroll"

const sans = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "../../public/fonts/UntitledSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/UntitledSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
})

const mono = localFont({
  variable: "--font-mono",
  src: "../../public/fonts/RobotoMono-Regular.woff2",
})

const jockey = localFont({
  variable: "--font-display",
  src: "../../public/fonts/JockeyOne-Regular.ttf",
})

export const metadata = {
  title: "SID Jamyl Ryad | Full-Stack Developer",
  description:
    "Portfolio de SID Jamyl Ryad, etudiant ingenieur en informatique, developpeur full-stack et builder produit a Alger.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${sans.variable} ${mono.variable} ${jockey.variable} min-h-screen`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
