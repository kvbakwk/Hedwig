"use server";

import { Pool } from "pg";

export default async function get(user_id) {
  const queryPosts =
    "SELECT p.id, p.user_id, u.email, u.firstname, u.lastname, p.content, p.create_date, p.anonymous FROM posts AS p JOIN users AS u ON p.user_id = u.id WHERE p.user_id = $1 ORDER BY p.create_date DESC;";
  const queryLikes = "SELECT user_id FROM likes WHERE likes.post_id = $1;";

  const client = new Pool();
  const posts = (await client.query(queryPosts, [user_id])).rows;
  await Promise.all(
    posts.map(async (post, index) => {
      const res = await client.query(queryLikes, [post.id]);
      posts[index] = {
        ...posts[index],
        likes: res.rows.map((like) => like.user_id),
      };
    })
  );
  await client.end();

  return posts;
}
