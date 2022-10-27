/*
  This endpoint is for the Web Previews DatoCMS plugin:
  https://www.datocms.com/marketplace/plugins/i/datocms-plugin-web-previews

  After installing the plugin on the project, insert the following frontend settings:

  Name: Production Website
  URL: <YOUR_WEBSITE>/api/preview-links
*/

const generatePreviewLink = ({ item, itemType }) => {
  switch (itemType.attributes.api_key) {
    case 'post':
      return {
        label: `${item.attributes.title}`,
        url: `/blog/${item.attributes.slug}`,
      };
    default:
      return null;
  }
};

const handler = (req, res) => {
  // setup CORS permissions
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // This will allow OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  const previewLink = generatePreviewLink(req.body);

  if (!previewLink) {
    return res.status(200).json({ previewLinks: [] });
  }

  const { label, url } = previewLink;

  const baseUrl = process.env.VERCEL_URL
    ? // Vercel auto-populates this environment variable
      `https://${process.env.VERCEL_URL}`
    : // Netlify auto-populates this environment variable
      process.env.URL;

  const previewLinks = [
    {
      label,
      url: `${baseUrl}${url}`,
    },
    {
      label: `${label} (Preview Mode)`,
      url: `${baseUrl}/api/start-preview-mode?redirect=${url}&secret=${process.env.NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET}`,
    },
  ];

  return res.status(200).json({ previewLinks });
};

export default handler;
