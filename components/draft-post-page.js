"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import { PostPage } from "./post-page";

export function DraftPostPage({ subscription }) {
  const { data } = useQuerySubscription(subscription);

  return <PostPage data={data} />;
}
