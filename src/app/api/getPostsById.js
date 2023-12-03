"use server";

import { getPostsById } from "@app/utils/db-actions/post";

export default async function getPostsByIdAPI(user_id, post_ids) {
  return await getPostsById(user_id, post_ids);
}
