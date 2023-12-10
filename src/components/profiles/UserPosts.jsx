"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Posts from "../posts/Posts";

import getUserPosts from "@app/api/getPostsByUser";
import getPosts from "@app/api/getPosts";

export default function UserPosts({ user }) {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [direction, setDirection] = useState(false);
  const [sort, setSort] = useState("date");

  useEffect(() => {
    params.option === "posty"
      ? getUserPosts(params.user_id, true, false, false).then((res) =>
          setPosts(res)
        )
      : params.option === "odpowiedzi"
      ? getUserPosts(params.user_id, false, true, false).then((res) =>
          setPosts(res)
        )
      : params.option === "polubione"
      ? getPosts(user.id, true, true, true).then((res) =>
          setPosts(
            res.filter((post) =>
              post.likes.find((id) => id === parseInt(params.user_id))
            )
          )
        )
      : setPosts([]);
  }, [params]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  const sortPosts = (posts) => {
    let tempPosts = posts;
    switch (sort) {
      case "likes":
        tempPosts.sort((a, b) =>
          direction
            ? a.likes.length - b.likes.length
            : b.likes.length - a.likes.length
        );
        break;
      case "replies":
        tempPosts.sort((a, b) =>
          direction
            ? a.replies.length - b.replies.length
            : b.replies.length - a.replies.length
        );
        break;
      default:
        tempPosts.sort((a, b) =>
          direction ? a.date - b.date : b.date - a.date
        );
        break;
    }
    return tempPosts;
  };

  return (
    <>
      <div className="grid grid-rows-2 gap-[10px] my-[10px] select-none">
        <div className="flex justify-center items-center gap-[10px]">
          <span>sortuj według</span>
          <div
            className="flex justify-center items-center w-[30px] h-[30px] rounded-lg cursor-pointer shadow-md glass-border"
            onClick={() => setDirection(!direction)}>
            {direction ? (
              <span className="material-symbols-outlined">
                arrow_upward_alt
              </span>
            ) : (
              <span className="material-symbols-outlined">
                arrow_downward_alt
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-[10px]">
          <div
            className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
              sort === "replies"
                ? "shadow-md glass-border"
                : "hover:shadow-md hover:glass-border border-[1px] border-transparent"
            }`}
            onClick={() => setSort("replies")}>
            odpowiedzi
          </div>
          <div
            className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
              sort === "date"
                ? "shadow-md glass-border"
                : "hover:shadow-md hover:glass-border border-[1px] border-transparent"
            }`}
            onClick={() => setSort("date")}>
            daty
          </div>
          <div
            className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
              sort === "likes"
                ? "shadow-md glass-border"
                : "hover:shadow-md hover:glass-border border-[1px] border-transparent"
            }`}
            onClick={() => setSort("likes")}>
            polubień
          </div>
        </div>
      </div>
      <Posts user={user} posts={sortPosts(posts)} />
    </>
  );
}
