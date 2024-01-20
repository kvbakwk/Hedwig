"use client";

import { useEffect, useState } from "react";
import timeAgo from "@app/utils/time";
import getPostsById from "@app/api/getPostsById";

import Link from "next/link";
import Avatar from "@components/Avatar";
import Posts from "../Posts";
import Popup from "../../Popup";
import FormNewReply from "../FormNewReply";
import PostFooter from "../PostFooter";

export default function PostDetailed({ user, post }) {
  const [reply, setReply] = useState(0);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    getPostsById(user.id, post.replies).then((posts) => setReplies(posts));
  }, [post, reply]);

  return (
    <>
      <div className="grid grid-cols-[100px_1fr] grid-rows-[60px_1fr_50px] glass">
        <Avatar
          className="justify-self-center row-span-2 w-[60px] h-[60px] mt-[20px] rounded-full"
          user_id={post.user_id}
          anonymous={post.anonymous}
        />
        <div className="flex gap-[6px] items-center text-[16px] sm:mt-[10px] md:pl-[10px] md:mr-[100px] md:border-b-[1px] md:border-[rgb(var(--shadow)/1)]">
          {!post.anonymous && (
            <>
              <Link
                className="cursor-pointer"
                href={`/uzytkownik/${post.user_id}`}>
                <b>
                  {post.firstname.toLowerCase()} {post.lastname.toLowerCase()}
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
        <div className="text-[16px] sm:text-[20px] font-light break-all md:mt-[15px] md:mb-[50px] md:pl-[10px] mr-[50px]">
          {post.content}
        </div>
        <PostFooter
          className="relative z-10 col-span-2 justify-self-center self-center flex justify-around items-center w-full select-none"
          user={user}
          post={post}
          setReply={setReply}
        />
      </div>
      <Posts user={user} posts={replies} />
      <Popup show={reply !== 0} setShow={setReply}>
        <FormNewReply user={user} parent_id={reply} />
      </Popup>
    </>
  );
}
