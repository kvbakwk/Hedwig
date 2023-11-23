import { Pool } from "pg";

export async function getLikes(post_id) {
  const client = new Pool();
  const likes = (
    await client.query(
      "SELECT user_id FROM public.like_user_post WHERE post_id = $1;",
      [post_id]
    )
  ).rows;
  await client.end();
  return likes;
}
