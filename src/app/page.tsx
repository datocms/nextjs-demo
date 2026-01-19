import { HomePageDocument } from "~/graphql/types/graphql"
import queryDatoCMS from "@/lib/queryDatoCMS"
import { draftMode } from "next/headers"
import { HomePage } from "./_components/home-page"
import RealTime from "./RealTime"

export default async function Index() {
  const { isEnabled: isDraft } = await draftMode()
  const data = await queryDatoCMS(HomePageDocument, {}, isDraft)

  const token = process.env.NEXT_DATOCMS_READONLY_API_TOKEN!

  if (isDraft) {
    return <RealTime data={data} token={token} />
  }

  return <HomePage allPosts={data.allPosts} />
}
