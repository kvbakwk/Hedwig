"use client";

import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

export default function Post({ user, post, setReply }) {
  return (
    <div className="grid grid-rows-[40px_auto_40px]">
      <PostHeader user={user} post={post} />
      <div className="text-[20px] font-light my-[15px] pl-[10px] ml-[40px] mr-[50px]">
        {post.content}
      </div>
      <PostFooter user={user} post={post} setReply={setReply} />
    </div>
  );
}
