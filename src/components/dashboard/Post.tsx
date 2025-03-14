"use client";

import { useState } from "react";

import Link from "next/link";

import timeAgo from "@app/utils/time";

import PostFooter from "./PostFooter";
import Avatar from "@components/Avatar";
import FormNewReply from "./FormNewReply";

export default function Post({ user, post }) {
  const [showReply, setShowReply] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col gap-[5px] w-full items-center">
      <div className="relative z-10 grid grid-cols-[100px_1fr] grid-rows-[48px_auto_48px] w-full bg-surface shadow-md rounded-2xl">
        <Avatar
          className="row-span-3 justify-self-center w-[60px] :h-[60px] mt-[20px] rounded-full hover:rounded-2xl transition-radius"
          user_id={post.user_id}
          anonymous={post.anonymous}
        />
        <PostHeader user={user} post={post} />
        <div className="text-[16px] sm:text-[20px] font-light break-all md:my-[15px] md:pl-[10px] mr-[70px]">
          {post.content}
        </div>
        <PostFooter
          className="relative z-10 flex justify-end items-start gap-[4px] mr-[12px] select-none"
          user={user}
          post={post}
          showReply={showReply}
          setShowReply={setShowReply}
          isDetailed={false}
        />
      </div>
      {showReply && (
        <div className="relative z-0 w-[95%] bg-surface shadow-md rounded-t-lg rounded-b-2xl">
          <FormNewReply
            user={user}
            parent_id={post.id}
            setShowReply={setShowReply}
          />
        </div>
      )}
    </div>
  );
}

function PostHeader({ user, post }) {
  if (!post.anonymous)
    return (
      <div className="flex gap-[6px] items-end text-[14px] pb-[4px] pl-[10px]">
        <Link className="cursor-pointer" href={`/uzytkownik/${post.user_id}`}>
          <b>
            {post.firstname} {post.lastname}
          </b>
        </Link>
        <span>{post.email.split("@")[0]}</span>
        <span>·</span>
        <span>{timeAgo(post.date.getTime())}</span>
      </div>
    );
  else
    return (
      <div className="flex gap-[6px] items-end text-[14px] pb-[4px] pl-[10px]">
        <b>anonimowy</b>
        {user.id === post.user_id ? "(ty)" : ""}
        <span>·</span>
        <span>{timeAgo(post.date.getTime())}</span>
      </div>
    );
}
