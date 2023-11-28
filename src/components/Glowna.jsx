"use client";
import { useEffect, useState } from "react";
import getPosts from "@app/api/posts/get";

import FormNewPost from "@components/forms/FormNewPost";
import Posts from "@components/posts/Posts";

export default function Glowna({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(user.id, true, false, true).then((res) => setPosts(res));
  }, []);

  return (
    <>
      <FormNewPost user={user} setPosts={setPosts} />
      <Posts user={user} posts={posts} />
    </>
  );
}
