"use server";

import { getPosts } from "@app/utils/post";

export default async function get(user_id) {
  return await getPosts(user_id);
}
