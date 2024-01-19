"use server";

import { getPostsByUser } from "@app/utils/db-actions/post";

export default async function getPostsByUserAPI(
  user_id: number,
  withPosts: boolean,
  withReplies: boolean,
  withAnonymous: boolean
) {
  return await getPostsByUser(user_id, withPosts, withReplies, withAnonymous);
}
