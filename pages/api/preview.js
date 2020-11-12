export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be know to this API route and the CMS
  if (
    req.query.secret !== process.env.NEXT_EXAMPLE_CMS_DATOCMS_PREVIEW_SECRET
  ) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the homepage
  res.writeHead(307, { Location: "/" });
  res.end();
};
