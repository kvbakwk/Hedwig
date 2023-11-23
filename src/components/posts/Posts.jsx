"use client";

import { useState } from "react";

import Post from "@components/posts/Post";
import FormNewReply from "@components/forms/FormNewReply";
import Popup from "@components/Popup";

export default function Posts({ user, posts }) {
  const [reply, setReply] = useState(0);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} user={user} post={post} setReply={setReply} />
      ))}
      <Popup show={reply !== 0} setShow={setReply}>
        <FormNewReply user={user} parent_id={reply} />
      </Popup>
    </div>
  );
}
