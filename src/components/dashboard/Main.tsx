"use client";

import { useEffect, useState } from "react";
import getPosts from "@app/api/getPosts";

import FormNewPost from "@components/dashboard/FormNewPost";
import Posts from "@components/dashboard/Posts";
import { CircularProgress } from "@components/Progress";

export default function Main({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(user.id, true, false, true).then((res) => setPosts(res));
  }, []);

  return (
    <div className="flex flex-col gap-[24px] w-full pt-[120px] pb-[80px] px-[10px]">
      <FormNewPost user={user} setPosts={setPosts} />
      <Posts user={user} posts={posts} />
      {posts.length ? (
        <div className="flex justify-center items-center w-full mt-[50px]">
          <CircularProgress indeterminate />
        </div>
      ) : (
        <div className="flex justify-center items-center text-on-surface-variant w-full h-[200px]">
          brak postów
        </div>
      )}
    </div>
  );
}
