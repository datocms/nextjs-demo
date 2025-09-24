import { buildClient } from "@datocms/cma-client-node";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";
import { draftMode, cookies } from "next/headers";

const corsInitOptions = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
};

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? // Vercel auto-populates this environment variable
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : // Netlify auto-populates this environment variable
    process.env.URL;

const findSlugAndUrlForItem = (item, itemTypeApiKey) => {
  switch (itemTypeApiKey) {
    case "post":
      return [item.slug, `/posts/${item.slug}`];
    default:
      return null;
  }
};

export async function OPTIONS(request) {
  return NextResponse.json({ success: true }, corsInitOptions);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const client = buildClient({
    apiToken: process.env.NEXT_DATOCMS_API_TOKEN,
    environment: searchParams.get("sandboxEnvironmentId"),
  });

  const item = await client.items.find(searchParams.get("itemId"));

  const result = findSlugAndUrlForItem(
    item,
    searchParams.get("itemTypeApiKey")
  );

  if (!result) {
    return NextResponse.json(
      {
        error: `Record #${searchParams.get(
          "itemId"
        )} does not have a route on the frontend!`,
      },
      { ...corsInitOptions, status: 422 }
    );
  }

  const [slug, url] = result;

  // let's start a temporary Next.js Draft Mode just to get the authentication cookies

  draftMode().enable();

  const cookie = cookies()
    .getAll("Set-Cookie")
    .map((cookie) => cookie.value.split(";")[0])
    .join(";");

  draftMode().disable();

  // final step is to get the HTML of the webpage associated with the record
  // and return it to the client

  const response = await fetch(new URL(url, baseUrl).toString(), {
    headers: { cookie },
  });

  const body = await response.text();

  const { document } = new JSDOM(body).window;

  const contentEl = document.getElementById("main-content");

  if (!contentEl) {
    return NextResponse.json(
      {
        error: `Page ${url} does not have an element with ID "main-content"!`,
      },
      { ...corsInitOptions, status: 422 }
    );
  }

  const content = contentEl.innerHTML;
  const locale = document.querySelector("html").getAttribute("lang") || "en";
  const title = document.querySelector("title").textContent;
  const description = document
    .querySelector('meta[name="description"]')
    .getAttribute("content");

  return NextResponse.json(
    {
      locale,
      slug,
      permalink: url,
      title,
      description,
      content,
    },
    corsInitOptions
  );
}
