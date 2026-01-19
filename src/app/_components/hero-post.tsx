import Avatar from "@/app/_components/avatar"
import CoverImage from "@/app/_components/cover-image"
import Link from "next/link"
import DateFormatter from "./date-formatter"
import type { PostBySlugQuery } from "~/graphql/types/graphql"

type PostFromQuery = NonNullable<PostBySlugQuery["post"]>
type AuthorFromQuery = PostFromQuery["author"]

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt?: string | null
  author: AuthorFromQuery
  slug: string
}

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar
            name={author.name}
            src={author.picture?.responsiveImage?.src ?? ""}
          />
        </div>
      </div>
    </section>
  )
}
