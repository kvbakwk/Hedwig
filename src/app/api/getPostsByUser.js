"use server";

import { getPostsByUser } from "@app/utils/db-actions/post";

export default async function getPostsByUserAPI(
  user_id,
  withPosts,
  withReplies,
  withAnonymous
) {
  return await getPostsByUser(user_id, withPosts, withReplies, withAnonymous);
}
