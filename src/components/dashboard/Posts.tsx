"use client";

import Post from "@components/dashboard/Post";

export default function Posts({ user, posts }) {

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} user={user} post={post} />
      ))}
    </>
  );
}
