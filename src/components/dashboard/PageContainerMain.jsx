"use client";

import { useEffect, useState } from "react";
import getPosts from "@app/api/getPosts";

import FormNewPost from "@components/forms/FormNewPost";
import Posts from "@components/posts/Posts";

export default function Glowna({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(user.id, true, false, true).then((res) => setPosts(res));
  }, []);

  return (
    <div className="flex flex-col gap-[20px] w-full pt-[70px] sm:pt-[80px] md:pt-[90px] pb-[100px] md:pb-[50px] md:px-[5px]">
      <div className="hidden md:block">
        <FormNewPost user={user} setPosts={setPosts} />
      </div>
      <Posts user={user} posts={posts} />
    </div>
  );
}
