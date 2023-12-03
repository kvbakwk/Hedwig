"use server";

import { getPost } from "@app/utils/db-actions/post";

export default async function getPostByIdAPI(user_id, post_id) {
  return await getPost(user_id, post_id);
}
