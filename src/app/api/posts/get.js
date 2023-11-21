"use server";

import { getPosts } from "@app/utils/post";

export default async function get() {
  return await getPosts();
}
