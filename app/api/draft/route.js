import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

function canEnterDraftMode(requestedSecret) {
  const previewSecret = process.env.NEXT_DATOCMS_PREVIEW_SECRET;

  if (previewSecret) {
    return requestedSecret === previewSecret;
  }

  return process.env.NEXT_DATOCMS_PUBLIC_PREVIEW === "true";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  if (!canEnterDraftMode(searchParams.get("secret"))) {
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
