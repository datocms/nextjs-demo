import { cookies, draftMode } from "next/headers"
import { redirect } from "next/navigation"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const token = searchParams.get("token")
  const url = searchParams.get("url")

  if (token !== process.env.NEXT_DATOCMS_PREVIEW_SECRET)
    return new Response("Invalid token", { status: 401 })

  const draft = await draftMode()
  draft.enable()

  if (!url) return new Response("Draft mode is enabled")

  // By performing a redirect(), we would lose the __prerender_bypass cookie just
  // set by draftMode().enable(), so we would effectively not enter into Next.js's draft mode!
  //
  // The solution is to read the cookie just set by draftMode().enable()...
  const cookieStore = await cookies()
  const cookie = cookieStore.get("__prerender_bypass")!

  // and reapply it before launching the redirect.
  cookieStore.set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
    // Given that this route can also be accessed within the iframe of the Web Previews plugin,
    // it is important to bypass the restrictions for third-party cookies by setting the
    // `partitioned: true` option (https://developers.google.com/privacy-sandbox/3pcd)
    partitioned: true,
  })

  redirect(url)
}
