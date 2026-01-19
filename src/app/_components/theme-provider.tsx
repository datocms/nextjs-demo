"use client"

import type { ReactNode } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class" // adds/removes "dark" class on <html>
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="nextjs-blog-starter-theme" // keep your key
    >
      {children}
    </NextThemesProvider>
  )
}
