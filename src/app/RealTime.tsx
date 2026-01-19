"use client"

import { HomePageDocument, type HomePageQuery } from "~/graphql/types/graphql"
import { useQuerySubscription } from "react-datocms/use-query-subscription"
import { HomePage } from "./_components/home-page"

export default function RealTime({
  data,
  token,
}: {
  data: HomePageQuery
  token: string
}) {
  const subscription = useQuerySubscription({
    query: HomePageDocument,
    variables: {},
    token,
    initialData: data,
    preview: true,
  })

  return <HomePage allPosts={subscription.data?.allPosts ?? []} />
}
