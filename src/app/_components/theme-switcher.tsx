"use client"

import { memo, useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"

declare global {
  var updateDOM: () => void
}

type ColorSchemePreference = "system" | "dark" | "light"

const STORAGE_KEY = "nextjs-blog-starter-theme"
const modes: ColorSchemePreference[] = ["system", "dark", "light"]

/** Script to avoid FOUC (same as your original contract) */
export const NoFOUCScript = (storageKey: string) => {
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"]

  const modifyTransition = () => {
    const css = document.createElement("style")
    css.textContent = "*,*:after,*:before{transition:none !important;}"
    document.head.appendChild(css)

    return () => {
      getComputedStyle(document.body)
      setTimeout(() => document.head.removeChild(css), 1)
    }
  }

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`)

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition()

    const mode = localStorage.getItem(storageKey) ?? SYSTEM
    const systemMode = media.matches ? DARK : LIGHT
    const resolvedMode = mode === SYSTEM ? systemMode : mode

    const classList = document.documentElement.classList
    if (resolvedMode === DARK) classList.add(DARK)
    else classList.remove(DARK)

    document.documentElement.setAttribute("data-mode", mode)

    restoreTransitions()
  }

  window.updateDOM()
  media.addEventListener("change", window.updateDOM)
}

// biome-ignore lint/suspicious/noRedeclare: keep same pattern
let updateDOM: () => void

const Script = memo(() => (
  <script
    // biome-ignore lint/security/noDangerouslySetInnerHtml: inline for FOUC prevention
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
))

function wobble(el: HTMLElement) {
  el.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(-15deg)", offset: 0.4 },
      { transform: "rotate(10deg)", offset: 0.8 },
      { transform: "rotate(0deg)" },
    ],
    { duration: 500, easing: "linear" },
  )
}

function SwitchButton() {
  const { theme, setTheme, systemTheme } = useTheme()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const mode = (
    mounted ? (theme ?? "system") : "system"
  ) as ColorSchemePreference
  const resolved = useMemo(() => {
    if (!mounted) return "light" as const
    if (mode === "system") return (systemTheme ?? "light") as "light" | "dark"
    return mode
  }, [mode, systemTheme, mounted])

  useEffect(() => {
    updateDOM = window.updateDOM

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      const next = (e.newValue ?? "system") as ColorSchemePreference
      setTheme(next)
    }

    addEventListener("storage", onStorage)
    return () => removeEventListener("storage", onStorage)
  }, [setTheme])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, mode)
    updateDOM?.()
  }, [mode, mounted])

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode)
    const next = modes[(index + 1) % modes.length]
    setTheme(next)

    // replicate dark mode wobble when switching into dark (resolved)
    const nextResolved =
      next === "system"
        ? ((systemTheme ?? "light") as "light" | "dark")
        : (next as "light" | "dark")
    if (nextResolved === "dark" && btnRef.current) wobble(btnRef.current)
  }

  const base =
    "absolute right-5 top-[70px] inline-flex h-6 w-6 items-center justify-center rounded-full " +
    "cursor-pointer text-current !transition-all duration-300 ease-in-out"

  const systemClasses = "border border-dashed"
  const lightClasses =
    "border border-orange-600 bg-yellow-300 shadow-[0_0_50px_10px_yellow]"
  const darkClasses =
    "border-none bg-transparent shadow-[calc(1.5rem/4)_calc(1.5rem/-4)_calc(1.5rem/8)_inset_#fff]"

  const variant =
    mode === "system"
      ? systemClasses
      : resolved === "dark"
        ? darkClasses
        : lightClasses

  return (
    <button
      ref={btnRef}
      suppressHydrationWarning
      type="button"
      onClick={handleModeSwitch}
      aria-label={`Theme: ${mode}`}
      className={`${base} ${variant}`}
    >
      {mode === "system" ? (
        <span className="text-[12px] font-semibold leading-none">A</span>
      ) : null}
    </button>
  )
}

export function ThemeSwitcher() {
  return (
    <>
      <Script />
      <SwitchButton />
    </>
  )
}
