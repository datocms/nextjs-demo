"use client";

import { useQuerySubscription } from "react-datocms/use-query-subscription";
import { PostIndex } from "./post-index";

export function DraftPostIndex({ subscription }) {
  const { data } = useQuerySubscription(subscription);

  return <PostIndex data={data} />;
}
