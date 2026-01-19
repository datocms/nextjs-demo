import type { SiteLocale } from "~/graphql/types/graphql"

// Base params type from Next.js (string-based)
export type BaseParams = {
  locale: string
}

// Resolved params type with validated SiteLocale (after awaiting and validating)
export type ResolvedParams = {
  locale: SiteLocale
}

// Page props with Promise-based params (Next.js 16+)
// Uses string-based params since that's what Next.js provides
export type GlobalPageProps = {
  params: Promise<BaseParams>
}

// Helper type for resolved page props (used internally after awaiting params)
// This uses the validated SiteLocale type
export type ResolvedGlobalPageProps = {
  params: ResolvedParams
}

export function buildUrl(
  globalPageProps: ResolvedGlobalPageProps,
  path?: string,
) {
  return `/${globalPageProps.params.locale}${path || ""}`
}
