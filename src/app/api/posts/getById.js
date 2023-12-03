"use server";

import { getPostsById } from "@app/utils/db-actions/post";

export default async function get(user_id, post_ids) {
  return await getPostsById(user_id, post_ids);
}
