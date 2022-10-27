import { buildClient } from '@datocms/cma-client-node';

const baseUrl = process.env.VERCEL_URL
  ? // Vercel auto-populates this environment variable
    `https://${process.env.VERCEL_URL}`
  : // Netlify auto-populates this environment variable
    process.env.URL;

async function installWebPreviewsPlugin(client) {
  const webPreviewsPlugin = await client.plugins.create({
    package_name: 'datocms-plugin-web-previews',
  });

  await client.plugins.update(webPreviewsPlugin, {
    parameters: {
      frontends: [
        { name: 'Production', previewWebhook: `${baseUrl}/api/preview-links` },
      ],
    },
  });
}

async function installSeoReadabilityPlugin(client) {
  const seoReadabilityPlugin = await client.plugins.create({
    package_name: 'datocms-plugin-seo-readability-analysis',
  });

  await client.plugins.update(seoReadabilityPlugin, {
    parameters: {
      htmlGeneratorUrl: `${baseUrl}/api/readability-metadata`,
      autoApplyToFieldsWithApiKey: 'seo_readability',
    },
  });
}

/*
  This endpoint is called right after bootstrapping the Starter project...
  it can be removed afterwards!
*/

export default async (req, res) => {
  // setup CORS permissions
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // This will allow OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  if (req.method !== 'POST') {
    return res.status(404).send('Invalid route');
  }

  const client = buildClient({ apiToken: req.body.datocmsApiToken });

  await Promise.all([
    installWebPreviewsPlugin(client),
    installSeoReadabilityPlugin(client),
  ]);

  return res.status(200).json({ success: true });
};
