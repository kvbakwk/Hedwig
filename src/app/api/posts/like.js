"use server";

import { Pool } from "pg";

export default async function like(user_id, post_id) {
  const client = new Pool();
  let res;

  const id = (
    await client.query(
      "SELECT id FROM likes WHERE post_id = $1 AND user_id = $2",
      [post_id, user_id]
    )
  ).rows;

  if (!id.length) {
    await client.query(
      "INSERT INTO likes (post_id, user_id, date) VALUES ($1, $2, $3);",
      [post_id, user_id, new Date()]
    );
    res = true;
  } else {
    await client.query("DELETE FROM likes WHERE id = $1;", [id[0].id]);
    res = false;
  }

  await client.end();

  return res;
}
