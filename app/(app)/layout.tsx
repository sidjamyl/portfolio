import type React from "react"
import localFont from "next/font/local"
import "./globals.css"

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
    "SID Jamyl Ryad is a full-stack developer and computer science engineering student in Algiers, building practical web products and business systems.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${sans.variable} ${mono.variable} ${jockey.variable} min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
