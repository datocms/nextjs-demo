import { NextResponse } from 'next/server';

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

/*
  This endpoint is for the Web Previews DatoCMS plugin:
  https://www.datocms.com/marketplace/plugins/i/datocms-plugin-web-previews

  After installing the plugin on the project, insert the following frontend settings:

  Name: Production Website
  URL: <YOUR_WEBSITE>/api/preview-links
*/

const findUrlForItem = ({ item, itemType }) => {
  switch (itemType.attributes.api_key) {
    case 'post':
      return `/posts/${item.attributes.slug}`;
    default:
      return null;
  }
};

export async function OPTIONS(request) {
  return NextResponse.json(
    { success: true },
    corsInitOptions,
  );
}

export async function POST(request) {
  const requestBody = await request.json();
  const url = findUrlForItem(requestBody);

  if (!url) {
    return NextResponse.json({ previewLinks: [] }, corsInitOptions);
  }

  const previewLinks = [
    {
      label: 'Published version',
      url: `${baseUrl}${url}`,
    },
    {
      label: 'Draft version',
      url: `${baseUrl}/api/draft?redirect=${url}&secret=${
        process.env.NEXT_DATOCMS_PREVIEW_SECRET || ''
      }`,
    },
  ];

  return NextResponse.json({ previewLinks }, corsInitOptions);
};
