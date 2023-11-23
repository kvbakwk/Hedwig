import { Pool } from "pg";

export async function getDislikes(post_id) {
  const client = new Pool();
  const dislikes = (
    await client.query(
      "SELECT user_id FROM public.dislike_user_post WHERE post_id = $1;",
      [post_id]
    )
  ).rows;
  await client.end();
  return dislikes;
}
