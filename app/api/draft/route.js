import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  // Please set the NEXT_DATOCMS_PREVIEW_SECRET env variable
  // on Vercel/Netlify, or everyone will be able to enter Preview Mode and
  // see draft content!
  const secret = process.env.NEXT_DATOCMS_PREVIEW_SECRET;

  const { searchParams } = new URL(request.url);

  // Check the secret and next parameters
  if (secret && searchParams.get("secret") !== secret) {
    return NextResponse.json({
      message: "Missing or invalid `secret` query string parameter!",
    }, { status: 401 });
  }

  draftMode().enable();

  // Redirect to the homepage, or to the URL provided with the `redirect` query string parameter:
  const redirectUrl = new URL(
    searchParams.get("redirect") || "/",
    "https://example.com"
  );

  redirect(`${redirectUrl.pathname}${redirectUrl.search}`);
}
