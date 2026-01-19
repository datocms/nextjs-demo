import { executeQuery } from "@datocms/cda-client"
import type { TypedDocumentNode } from "@graphql-typed-document-node/core"

export default async function queryDatoCMS<
  TResult = unknown,
  TVariables = Record<string, unknown>,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables,
  isDraft?: boolean,
): Promise<TResult> {
  return executeQuery(document, {
    token: process.env.NEXT_DATOCMS_API_TOKEN!,
    excludeInvalid: true,
    includeDrafts: isDraft,
    variables,
    requestInitOptions: {
      cache: "force-cache",
      next: { tags: ["datocms"] },
    },
  })
}
