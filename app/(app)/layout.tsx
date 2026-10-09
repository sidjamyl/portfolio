import type React from "react"
import "./globals.css"

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
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
