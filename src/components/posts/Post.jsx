"use client";

import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

export default function Post({ user, post, setReply }) {
  return (
    <div>
      <PostHeader user={user} post={post} />
      <p>{post.content}</p>
      <PostFooter user={user} post={post} setReply={setReply} />
      <br />
    </div>
  );
}
