import Link from "next/link"
import Avatar from "./avatar"
import CoverImage from "./cover-image"
import DateFormatter from "./date-formatter"
import type { PostBySlugQuery } from "~/graphql/types/graphql"

type PostFromQuery = NonNullable<PostBySlugQuery["post"]>
type AuthorFromQuery = PostFromQuery["author"]

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: AuthorFromQuery
  slug: string
}

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar
        name={author.name}
        src={author.picture?.responsiveImage?.src ?? ""}
      />
    </div>
  )
}
