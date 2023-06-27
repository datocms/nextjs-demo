import HeroPost from "./hero-post";
import Intro from "./intro";
import MoreStories from "./more-stories";

export function PostIndex({ data }) {
  const { allPosts } = data;

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </>
  );
}
