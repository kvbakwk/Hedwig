"use server";

import { getPosts } from "@app/utils/db-actions/post";

export default async function getPostsAPI(
  user_id,
  withPosts,
  withReplies,
  withAnonymous
) {
  return await getPosts(user_id, withPosts, withReplies, withAnonymous);
}
