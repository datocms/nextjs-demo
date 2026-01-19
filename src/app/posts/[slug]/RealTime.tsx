"use client"

import {
  PostBySlugDocument,
  type PostBySlugQuery,
} from "~/graphql/types/graphql"
import { useQuerySubscription } from "react-datocms/use-query-subscription"
import { PostPage } from "@/app/_components/post-page"

export default function RealTime({
  slug,
  data,
  token,
}: {
  slug: string
  data: PostBySlugQuery
  token: string
}) {
  const variables = { slug }

  const subscription = useQuerySubscription({
    query: PostBySlugDocument,
    variables,
    token,
    initialData: data,
    preview: true,
  })

  return (
    <PostPage
      post={subscription.data?.post}
      morePosts={subscription.data?.morePosts ?? []}
    />
  )
}
