import { Pool } from "pg";

export async function getSaves(post_id) {
  const client = new Pool();
  const saves = (
    await client.query(
      "SELECT user_id FROM public.save_user_post WHERE post_id = $1;",
      [post_id]
    )
  ).rows;
  await client.end();
  return saves;
}
