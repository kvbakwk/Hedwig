import { Pool } from "pg";

import { getLikes } from "@app/utils/db-actions/like";
import { getDislikes } from "@app/utils/db-actions/dislike";
import { getSaves } from "@app/utils/db-actions/save";

export async function getPosts(user_id) {
  const client = new Pool();
  let posts = (
    await client.query(
      "SELECT p.id, p.user_id, u.email, u.firstname, u.lastname, p.content, p.create_date, p.anonymous FROM public.post AS p JOIN public.user AS u ON p.user_id = u.id ORDER BY p.create_date DESC;"
    )
  ).rows;
  await Promise.all(
    posts.map(async (post, index) => {
      posts[index] = {
        ...post,
        likes: (await getLikes(post.id)).map((like) => like.user_id),
        dislikes: (await getDislikes(post.id)).map(
          (dislike) => dislike.user_id
        ),
        saves: (await getSaves(post.id)).map((save) => save.user_id),
        replies: (await getReplyIds(post.id)).map((reply) => reply.post_id),
        reply: await isReplyPost(post),
      };
    })
  );
  await client.end();

  return posts
    .filter((post) => !post.reply)
    .map((post) =>
      user_id === post.user_id
        ? {
            id: post.id,
            user_id: post.user_id,
            email: post.email,
            firstname: post.firstname,
            lastname: post.lastname,
            content: post.content,
            date: post.create_date,
            anonymous: post.anonymous,
            likes: post.likes,
            dislikes: post.dislikes,
            saves: post.saves,
            replies: post.replies,
          }
        : post.anonymous
        ? {
            id: post.id,
            content: post.content,
            date: post.create_date,
            anonymous: post.anonymous,
            likes: post.likes,
            dislikes: post.dislikes,
            saves: post.saves,
            replies: post.replies,
          }
        : {
            id: post.id,
            user_id: post.user_id,
            email: post.email,
            firstname: post.firstname,
            lastname: post.lastname,
            content: post.content,
            date: post.create_date,
            anonymous: post.anonymous,
            likes: post.likes,
            dislikes: post.dislikes,
            saves: post.saves,
            replies: post.replies,
          }
    );
}

export async function addPost(user_id, content, anonymous) {
  const client = new Pool();
  await client.query(
    "INSERT INTO public.post VALUES (DEFAULT, $1, $2, $3, $4);",
    [user_id, content, new Date(), anonymous]
  );
  await client.end();
}

export async function addReplyPost(user_id, content, anonymous, parent_id) {
  const client = new Pool();
  let post_id = (
    await client.query(
      "INSERT INTO public.post VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id;",
      [user_id, content, new Date(), anonymous]
    )
  ).rows[0].id;
  await client.query("INSERT INTO public.post_parent VALUES ($1, $2);", [
    post_id,
    parent_id,
  ]);
  await client.end();
}

export async function isReplyPost(post) {
  const client = new Pool();
  const res = await client.query(
    "SELECT parent_id FROM public.post_parent WHERE post_id = $1;",
    [post.id]
  );
  await client.end();
  return res.rowCount === 1;
}

export async function getReplyIds(post_id) {
  const client = new Pool();
  const replies = (
    await client.query(
      "SELECT post_id FROM public.post_parent WHERE parent_id = $1;",
      [post_id]
    )
  ).rows;
  await client.end();
  return replies;
}
