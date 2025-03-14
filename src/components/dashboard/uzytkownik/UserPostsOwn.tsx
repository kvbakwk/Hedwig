"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Posts from "../Posts";

import getUserPosts from "@app/api/getPostsByUser";
import getPosts from "@app/api/getPosts";
import { Icon } from "@components/Icon";
import { CircularProgress } from "@components/Progress";

export default function UserPostsOwn({ user }) {
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const [direction, setDirection] = useState(false);
  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    params.option === "posty"
      ? getUserPosts(user.id, true, false, true).then((res) => setPosts(res))
      : params.option === "odpowiedzi"
      ? getUserPosts(user.id, false, true, true).then((res) => setPosts(res))
      : params.option === "polubione"
      ? getPosts(user.id, true, true, true).then((res) =>
          setPosts(
            res.filter((post) => post.likes.find((id) => id === user.id))
          )
        )
      : params.option === "negatywne"
      ? getPosts(user.id, true, true, true).then((res) =>
          setPosts(
            res.filter((post) => post.dislikes.find((id) => id === user.id))
          )
        )
      : params.option === "zapisane"
      ? getPosts(user.id, true, true, true).then((res) =>
          setPosts(
            res.filter((post) => post.saves.find((id) => id === user.id))
          )
        )
      : setPosts([]);
  }, [params]);

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
  const filterPosts = (posts) => {
    let tempPosts = [];
    if (filter.includes("common"))
      tempPosts = tempPosts.concat(posts.filter((post) => !post.anonymous));
    if (filter.includes("anonymous"))
      tempPosts = tempPosts.concat(posts.filter((post) => post.anonymous));
    if (filter.length === 0) tempPosts = posts;
    return tempPosts;
  };

  return (
    <>
      <div className="grid grid-cols-2 my-[10px] select-none">
        <div className="grid grid-rows-[50px_1fr] gap-[10px]">
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
        <div className="grid grid-rows-[50px_1fr] gap-[10px]">
          <div className="flex justify-center items-center">filtruj</div>
          <div className="flex md:justify-center items-center gap-[10px]">
            <div
              className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
                filter.includes("common")
                  ? "bg-surface shadow-md"
                  : "hover:bg-surface hover:shadow-md"
              }`}
              onClick={() =>
                filter.includes("common")
                  ? setFilter(filter.filter((filter) => filter !== "common"))
                  : setFilter(filter.concat(["common"]))
              }
            >
              zwykłe
            </div>
            <div
              className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
                filter.includes("anonymous")
                ? "bg-surface shadow-md"
                : "hover:bg-surface hover:shadow-md"
              }`}
              onClick={() =>
                filter.includes("anonymous")
                  ? setFilter(filter.filter((filter) => filter !== "anonymous"))
                  : setFilter(filter.concat(["anonymous"]))
              }
            >
              anonimowe
            </div>
          </div>
        </div>
      </div>
      <Posts user={user} posts={sortPosts(filterPosts(posts))} />
      {posts.length ? (
        <div className="flex justify-center items-center w-full mt-[50px]">
          <CircularProgress indeterminate />
        </div>
      ) : (
        <div className="flex justify-center items-center text-on-surface-variant w-full h-[200px]">
          brak postów
        </div>
      )}
    </>
  );
}
