"use client";

import { useEffect, useState } from "react";
import timeAgo from "@app/utils/time";
import getPostsById from "@app/api/getPostsById";

import Link from "next/link";
import Avatar from "@components/Avatar";
import Posts from "../Posts";
import FormNewReply from "../FormNewReply";
import PostFooter from "../PostFooter";
import { CircularProgress } from "@components/Progress";

export default function PostDetailed({ user, post }) {
  const [reply, setReply] = useState(0);
  const [replies, setReplies] = useState([]);
  const [showReply, setShowReply] = useState<boolean>(false);

  useEffect(() => {
    getPostsById(user.id, post.replies).then((posts) => setReplies(posts));
  }, [post, reply]);

  return (
    <>
      <div className="relative flex flex-col gap-[5px] w-full my-[30px] items-center">
        <div className="relative z-10 grid grid-cols-[100px_1fr] grid-rows-[48px_auto_64px] w-full bg-surface shadow-md rounded-2xl">
          <Avatar
            className="justify-self-center row-span-2 w-[60px] h-[60px] mt-[20px] rounded-full"
            user_id={post.user_id}
            anonymous={post.anonymous}
          />
          <div className="flex gap-[6px] items-end text-[16px] pb-[4px] pl-[10px]">
            {!post.anonymous && (
              <>
                <Link
                  className="cursor-pointer"
                  href={`/uzytkownik/${post.user_id}`}
                >
                  <b>
                    {post.firstname} {post.lastname}
                  </b>
                </Link>
                <span>{post.email.split("@")[0]}</span>
              </>
            )}
            {post.anonymous && (
              <>
                <b>anonimowy</b>
                {user.id === post.user_id ? "(ty)" : ""}
              </>
            )}
            <span>·</span>
            <span>{timeAgo(post.date.getTime())}</span>
          </div>
          <div className="text-[16px] sm:text-[20px] font-light break-all md:my-[15px] md:pl-[10px] mr-[70px]">
            {post.content}
          </div>
          <PostFooter
            className="relative z-10 col-span-2 justify-self-center self-center flex justify-around items-center w-full select-none"
            user={user}
            post={post}
            showReply={showReply}
            setShowReply={setShowReply}
            isDetailed={true}
          />
        </div>
        {showReply && (
          <div className="relative z-0 w-[95%] bg-surface shadow-md rounded-t-lg rounded-b-2xl">
            <FormNewReply
              user={user}
              parent_id={reply}
              setShowReply={setShowReply}
            />
          </div>
        )}
      </div>
      <div className="relative flex flex-col gap-[20px] w-[95%] items-center">
        <Posts user={user} posts={replies} />
        {replies.length ? (
          <div className="flex justify-center items-center w-full mt-[50px]">
            <CircularProgress indeterminate />
          </div>
        ) : (
          <div className="flex justify-center items-center text-on-surface-variant w-full h-[200px]">
            brak odpowiedzi
          </div>
        )}
      </div>
    </>
  );
}
