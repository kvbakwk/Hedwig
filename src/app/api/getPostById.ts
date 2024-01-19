"use server";

import { getPostById } from "@app/utils/db-actions/post";

export default async function getPostByIdAPI(user_id: number, post_id: number) {
  return await getPostById(user_id, post_id);
}
