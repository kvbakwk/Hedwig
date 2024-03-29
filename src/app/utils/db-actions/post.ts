import { Pool } from "pg";

export async function addPost(
  user_id: number,
  content: string,
  anonymous: boolean
): Promise<void> {
  const client = new Pool();
  await client.query(
    "INSERT INTO public.post VALUES (DEFAULT, $1, $2, $3, $4);",
    [user_id, content, new Date(), anonymous]
  );
  await client.end();
}

export async function addPostReply(
  user_id: number,
  content: string,
  anonymous: boolean,
  parent_id: number
): Promise<void> {
  const client: Pool = new Pool();
  let post_id: number = (
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

export async function getPostById(user_id: number, post_id: number) {
  const client = new Pool();
  let post = (
    await client.query(
      "SELECT p.id, p.user_id, u.email, u.firstname, u.lastname, p.content, p.create_date, p.anonymous FROM public.post AS p JOIN public.user AS u ON p.user_id = u.id WHERE p.id = $1 ORDER BY p.create_date DESC;",
      [post_id]
    )
  ).rows[0];
  await client.end();

  await Promise.all([
    (post = {
      ...post,
      likes: (await getPostLikes(post.id)).map((like) => like.user_id),
      dislikes: (
        await getPostDislikes(post.id)
      ).map((dislike) => dislike.user_id),
      saves: (await getPostSaves(post.id)).map((save) => save.user_id),
      replies: (await getPostReplies(post.id)).map((reply) => reply.post_id),
      reply: await isReply(post),
    }),
  ]);

  return user_id === post.user_id
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
      };
}

export async function getPosts(
  user_id: number,
  withPosts: boolean,
  withReplies: boolean,
  withAnonymous: boolean
) {
  const client = new Pool();
  let posts = (
    await client.query(
      "SELECT p.id, p.user_id, u.email, u.firstname, u.lastname, p.content, p.create_date, p.anonymous FROM public.post AS p JOIN public.user AS u ON p.user_id = u.id ORDER BY p.create_date DESC;"
    )
  ).rows;
  await client.end();

  await Promise.all(
    posts.map(async (post, index) => {
      posts[index] = {
        ...post,
        likes: (await getPostLikes(post.id)).map((like) => like.user_id),
        dislikes: (await getPostDislikes(post.id)).map(
          (dislike) => dislike.user_id
        ),
        saves: (await getPostSaves(post.id)).map((save) => save.user_id),
        replies: (await getPostReplies(post.id)).map((reply) => reply.post_id),
        reply: await isReply(post),
      };
    })
  );

  return posts
    .filter((post) => post.reply || (!post.reply && withPosts))
    .filter((post) => !post.reply || (post.reply && withReplies))
    .filter((post) => !post.anonymous || (post.anonymous && withAnonymous))
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

export async function getPostsById(
  user_id: number,
  post_ids: Array<number | any>
) {
  let posts = post_ids;

  await Promise.all(
    post_ids.map(async (id, index) => {
      posts[index] = await getPostById(user_id, id);
    })
  );

  await Promise.all(
    posts.map(async (post, index) => {
      posts[index] = {
        ...post,
        likes: (await getPostLikes(post.id)).map((like) => like.user_id),
        dislikes: (await getPostDislikes(post.id)).map(
          (dislike) => dislike.user_id
        ),
        saves: (await getPostSaves(post.id)).map((save) => save.user_id),
        replies: (await getPostReplies(post.id)).map((reply) => reply.post_id),
        reply: await isReply(post),
      };
    })
  );

  return posts.map((post) =>
    user_id === post.user_id
      ? {
          id: post.id,
          user_id: post.user_id,
          email: post.email,
          firstname: post.firstname,
          lastname: post.lastname,
          content: post.content,
          date: post.date,
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
          date: post.date,
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
          date: post.date,
          anonymous: post.anonymous,
          likes: post.likes,
          dislikes: post.dislikes,
          saves: post.saves,
          replies: post.replies,
        }
  );
}

export async function getPostsByUser(
  user_id: number,
  withPosts: boolean,
  withReplies: boolean,
  withAnonymous: boolean
) {
  const client: Pool = new Pool();
  let posts = (
    await client.query(
      "SELECT p.id, p.user_id, u.email, u.firstname, u.lastname, p.content, p.create_date, p.anonymous FROM public.post AS p JOIN public.user AS u ON p.user_id = u.id WHERE p.user_id = $1 ORDER BY p.create_date DESC;",
      [user_id]
    )
  ).rows;
  await client.end();

  await Promise.all(
    posts.map(async (post, index) => {
      posts[index] = {
        ...post,
        likes: (await getPostLikes(post.id)).map((like) => like.user_id),
        dislikes: (await getPostDislikes(post.id)).map(
          (dislike) => dislike.user_id
        ),
        saves: (await getPostSaves(post.id)).map((save) => save.user_id),
        replies: (await getPostReplies(post.id)).map((reply) => reply.post_id),
        reply: await isReply(post),
      };
    })
  );

  return posts
    .filter((post) => post.reply || (!post.reply && withPosts))
    .filter((post) => !post.reply || (post.reply && withReplies))
    .filter((post) => !post.anonymous || (post.anonymous && withAnonymous))
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

export async function getPostReplies(post_id: number): Promise<any> {
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

export async function getPostLikes(post_id: number): Promise<any> {
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

export async function getPostDislikes(post_id: number): Promise<any> {
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

export async function getPostSaves(post_id: number): Promise<any> {
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

export async function isReply(post: any): Promise<boolean> {
  const client = new Pool();
  const res = await client.query(
    "SELECT parent_id FROM public.post_parent WHERE post_id = $1;",
    [post.id]
  );
  await client.end();
  return res.rowCount === 1;
}
