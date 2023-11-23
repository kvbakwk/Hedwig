"use server";

import { getPosts } from "@app/utils/db-actions/post";

export default async function get(user_id) {
  return await getPosts(user_id);
}
