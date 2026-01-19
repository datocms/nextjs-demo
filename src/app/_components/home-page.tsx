import Container from "./container"
import { Intro } from "./intro"
import { HeroPost } from "./hero-post"
import { MoreStories } from "./more-stories"
import type { HomePageQuery } from "~/graphql/types/graphql"

export function HomePage({
  allPosts,
}: {
  allPosts: HomePageQuery["allPosts"]
}) {
  const [heroPost, ...morePosts] = allPosts

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title ?? ""}
          coverImage={heroPost.coverImage?.responsiveImage?.src ?? ""}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  )
}
