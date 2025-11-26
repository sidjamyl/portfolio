import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "./components/smooth-scroll"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Jamyl | Full-Stack Developer",
  description: "Portfolio of Jamyl, a Full-Stack Developer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
