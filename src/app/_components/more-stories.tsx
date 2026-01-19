import { PostPreview } from "./post-preview"
import type { HomePageQuery } from "~/graphql/types/graphql"

type PostFromQuery = HomePageQuery["allPosts"][number]

export function MoreStories({ posts }: { posts?: PostFromQuery[] }) {
  if (!posts) return null
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title ?? ""}
            coverImage={post.coverImage?.responsiveImage?.src ?? ""}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt ?? ""}
          />
        ))}
      </div>
    </section>
  )
}
