import Footer from "@/app/_components/footer"
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeSwitcher } from "./_components/theme-switcher"
import { draftMode } from "next/headers"
import { SectionSeparator } from "./_components/section-separator"
import { ThemeProvider } from "@/app/_components/theme-provider"
import ScrollToTop from "@/app/_components/scroll-to-top"
import "./globals.css"
import type { SiteLocale } from "~/graphql/types/graphql"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `Next.js Blog Example with ${CMS_NAME}`,
  description: `A statically generated blog example using Next.js and ${CMS_NAME}.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraft } = await draftMode()

  const resolvedParams = {
    locale: "en" as SiteLocale,
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
      >
        <ThemeProvider>
          <ThemeSwitcher />
          <div className="min-h-screen">{children}</div>
          <ScrollToTop
            globalPageProps={{ params: resolvedParams }}
            isDraft={isDraft}
          />
          <SectionSeparator className="mt-0 mb-0" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
