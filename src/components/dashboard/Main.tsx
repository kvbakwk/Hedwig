"use client";

import { useEffect, useState } from "react";
import getPosts from "@app/api/getPosts";

import FormNewPost from "@components/dashboard/FormNewPost";
import Posts from "@components/dashboard/Posts";
import Container from "@components/styled/dashboard/home/MainContainer";

export default function Main({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(user.id, true, false, true).then((res) => setPosts(res));
  }, []);

  return (
    <Container>
      <FormNewPost user={user} setPosts={setPosts} />
      <Posts user={user} posts={posts} />
    </Container>
  );
}
