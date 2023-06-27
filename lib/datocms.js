import { cache } from 'react';

const dedupedFetch = cache(async (serializedInit) => {
  const response = await fetch("https://graphql.datocms.com/", JSON.parse(serializedInit));
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${JSON.stringify(responseBody)}`);
  }

  return responseBody;
})

export async function performRequest({
  query,
  variables = {},
  includeDrafts = false,
  excludeInvalid = false,
  visualEditingBaseUrl,
  revalidate,
 }) {
  const { data } = await dedupedFetch(JSON.stringify({
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      ...(includeDrafts ? { "X-Include-Drafts": "true" } : {}),
      ...(excludeInvalid ? { "X-Exclude-Invalid": "true" } : {}),
      ...(visualEditingBaseUrl ? { "X-Visual-Editing": "vercel-v1", "X-Base-Editing-Url": visualEditingBaseUrl } : {}),
      ...(process.env.NEXT_DATOCMS_ENVIRONMENT ? { "X-Environment": process.env.NEXT_DATOCMS_ENVIRONMENT } : {}),
    },
    body: JSON.stringify({ query, variables, revalidate }),
    next: { revalidate },
  }));

  return data;
}
