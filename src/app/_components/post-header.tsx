import Avatar from "./avatar"
import CoverImage from "./cover-image"
import DateFormatter from "./date-formatter"
import { PostTitle } from "@/app/_components/post-title"
import type { PostBySlugQuery } from "~/graphql/types/graphql"

type PostFromQuery = NonNullable<PostBySlugQuery["post"]>
type AuthorFromQuery = PostFromQuery["author"]

type Props = {
  title: string
  coverImage: string
  date: string
  author?: AuthorFromQuery
}

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {author && (
        <div className="hidden md:block md:mb-12">
          <Avatar
            name={author.name}
            src={author.picture?.responsiveImage?.src ?? ""}
          />
        </div>
      )}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        {author && (
          <div className="block md:hidden mb-6">
            <Avatar
              name={author.name}
              src={author.picture?.responsiveImage?.src ?? ""}
            />
          </div>
        )}
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
