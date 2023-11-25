"use server";

import { getUserPosts } from "@app/utils/db-actions/post";

export default async function get(
  user_id,
  withPosts,
  withReplies,
  withAnonymous
) {
  return await getUserPosts(user_id, withPosts, withReplies, withAnonymous);
}
