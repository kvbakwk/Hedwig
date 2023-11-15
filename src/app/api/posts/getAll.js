'use server'

import { Pool } from "pg";

export default async function getAll() {
  const client = new Pool();
  const posts = (
    await client.query(
      "SELECT posts.id, posts.user_id, users.email, users.firstname, users.lastname, posts.content, posts.create_date, posts.anonymous FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.create_date DESC;"
    )
  ).rows;
  await client.end();

  return posts;
}
