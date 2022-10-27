import { buildClient } from '@datocms/cma-client-node';
import { JSDOM } from 'jsdom';

const baseUrl = process.env.VERCEL_URL
  ? // Vercel auto-populates this environment variable
    `https://${process.env.VERCEL_URL}`
  : // Netlify auto-populates this environment variable
    process.env.URL;

const findSlugAndUrlForItem = (item, itemTypeApiKey) => {
  switch (itemTypeApiKey) {
    case 'post':
      return [item.slug, `/posts/${item.slug}`];
    default:
      return null;
  }
};

const handler = async (req, res) => {
  // setup CORS permissions
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // This will allow OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ success: true });
  }

  const client = buildClient({
    apiToken: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
    environment: req.query.sandboxEnvironmentId,
  });

  const item = await client.items.find(req.query.itemId);

  const result = findSlugAndUrlForItem(item, req.query.itemTypeApiKey);

  if (!result) {
    return res.status(422).json({
      error: `Record #${req.query.itemId} does not have a route on the frontend!`,
    });
  }

  const [slug, url] = result;

  // let's start a temporary Next.js Preview Mode just to get the authentication cookies

  res.setPreviewData({});

  const cookie = res
    .getHeader('Set-Cookie')
    .map((cookie) => cookie.split(';')[0])
    .join(';');

  res.clearPreviewData();

  // final step is to get the HTML of the webpage associated with the record
  // and return it to the client

  const response = await fetch(new URL(url, baseUrl).toString(), {
    headers: { cookie },
  });

  const body = await response.text();

  const { document } = new JSDOM(body).window;

  const contentEl = document.getElementById('main-content');

  if (!contentEl) {
    res.status(422).json({
      error: `Page ${url} does not have an element with ID "main-content"!`,
    });
    return;
  }

  const content = contentEl.innerHTML;
  const locale = document.querySelector('html').getAttribute('lang') || 'en';
  const title = document.querySelector('title').textContent;
  const description = document
    .querySelector('meta[name="description"]')
    .getAttribute('content');

  res.status(200).json({
    locale,
    slug,
    permalink: url,
    title,
    description,
    content,
  });
};

export default handler;
