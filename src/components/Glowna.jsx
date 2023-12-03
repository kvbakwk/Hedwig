"use client";
import { useEffect, useState } from "react";
import getPosts from "@app/api/posts/getAll";

import FormNewPost from "@components/forms/FormNewPost";
import Posts from "@components/posts/Posts";

export default function Glowna({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(user.id, true, false, true).then((res) => setPosts(res));
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <FormNewPost user={user} setPosts={setPosts} />
      </div>
      <Posts user={user} posts={posts} />
    </>
  );
}
