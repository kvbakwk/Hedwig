"use client";

import { useState } from "react";

import Post from "@components/dashboard/Post";
import FormNewReply from "@components/dashboard/FormNewReply";
import Popup from "@components/Popup";

export default function Posts({ user, posts }) {
  const [reply, setReply] = useState(0);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} user={user} post={post} setReply={setReply} />
      ))}
      <Popup show={reply !== 0} setShow={setReply}>
        <FormNewReply user={user} parent_id={reply} />
      </Popup>
    </>
  );
}
