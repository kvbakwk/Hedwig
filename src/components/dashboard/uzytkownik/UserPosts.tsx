"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Posts from "../Posts";

import getUserPosts from "@app/api/getPostsByUser";
import getPosts from "@app/api/getPosts";
import { CircularProgress } from "@components/Progress";
import { Icon } from "@components/Icon";

export default function UserPosts({ user }) {
  const params = useParams<{ user_id: string; option: string }>();
  const [posts, setPosts] = useState([]);
  const [direction, setDirection] = useState(false);
  const [sort, setSort] = useState("date");

  useEffect(() => {
    params.option === "posty"
      ? getUserPosts(parseInt(params.user_id), true, false, false).then((res) =>
          setPosts(res)
        )
      : params.option === "odpowiedzi"
      ? getUserPosts(parseInt(params.user_id), false, true, false).then((res) =>
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
              className="flex justify-center items-center w-[36px] h-[30px] hover:bg-surface hover:shadow-md rounded-lg cursor-pointer"
            onClick={() => setDirection(!direction)}
          >
            {direction ? (
              <Icon>trending_up</Icon>
            ) : (
              <Icon>trending_down</Icon>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-[10px]">
          <div
            className={`flex justify-center items-center h-[30px] px-[15px] rounded-lg cursor-pointer transition-shadow ${
              sort === "replies"
                ? "bg-surface shadow-md"
                : "hover:bg-surface hover:shadow-md"
            }`}
            onClick={() => setSort("replies")}
          >
            odpowiedzi
          </div>
          <div
            className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
              sort === "date"
                ? "bg-surface shadow-md"
                : "hover:bg-surface hover:shadow-md"
            }`}
            onClick={() => setSort("date")}
          >
            daty
          </div>
          <div
            className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
              sort === "likes"
                ? "bg-surface shadow-md"
                : "hover:bg-surface hover:shadow-md"
            }`}
            onClick={() => setSort("likes")}
          >
            polubień
          </div>
        </div>
      </div>
      <Posts user={user} posts={sortPosts(posts)} />
      {!posts.length && (
        <div className="flex justify-center items-center text-on-surface-variant w-full h-[200px]">
          brak postów
        </div>
      )}
    </>
  );
}
