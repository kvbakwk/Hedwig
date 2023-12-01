"use client";

import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import Avatar from "@components/Avatar";

export default function Post({ user, post, setReply }) {
  return (
    <div className="grid grid-cols-[60px_1fr] sm:grid-cols-[100px_1fr] grid-rows-[35px_auto_40px] sm:grid-rows-[40px_auto_40px]">
      <Avatar
        className="row-span-3 justify-self-center w-[40px] sm:w-[60px] h-[40px] sm:h-[60px] mt-[10px] sm:mt-[20px] rounded-full"
        user_id={post.user_id}
        anonymous={post.anonymous}
      />
      <PostHeader user={user} post={post} />
      <div className="text-[16px] sm:text-[20px] font-light break-all md:my-[15px] md:pl-[10px] mr-[50px]">
        {post.content}
      </div>
      <PostFooter user={user} post={post} setReply={setReply} />
    </div>
  );
}
