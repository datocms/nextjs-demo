import { draftMode } from "next/headers"
import RealTime from "./RealTime"
import queryDatoCMS from "@/lib/queryDatoCMS"
import { PostBySlugDocument } from "~/graphql/types/graphql"
import { PostPage } from "@/app/_components/post-page"

export default async function Page({
  params,
}: PageProps<"/posts/[slug]">): Promise<React.ReactNode> {
  const { isEnabled: isDraft } = await draftMode()
  const { slug } = await params

  const data = await queryDatoCMS(PostBySlugDocument, { slug }, isDraft)

  const token = process.env.NEXT_DATOCMS_READONLY_API_TOKEN!

  if (isDraft) {
    return <RealTime slug={slug} data={data} token={token} />
  }
  return <PostPage post={data.post} morePosts={data.morePosts ?? []} />
}
