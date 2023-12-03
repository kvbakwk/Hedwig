"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Posts from "../posts/Posts";

import getUserPosts from "@app/api/getPostsByUser";
import getPosts from "@app/api/getPosts";

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
              className="flex justify-center items-center w-[30px] h-[30px] rounded-lg cursor-pointer glass-shadow glass-border"
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
          <div className="flex flex-col md:flex-row md:justify-center items-center gap-[10px]">
            <div
              className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
                sort === "replies"
                  ? "glass-shadow glass-border"
                  : "hover:glass-shadow hover:glass-border border-[1px] border-transparent"
              }`}
              onClick={() => setSort("replies")}>
              odpowiedzi
            </div>
            <div
              className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
                sort === "date"
                  ? "glass-shadow glass-border"
                  : "hover:glass-shadow hover:glass-border border-[1px] border-transparent"
              }`}
              onClick={() => setSort("date")}>
              daty
            </div>
            <div
              className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
                sort === "likes"
                  ? "glass-shadow glass-border"
                  : "hover:glass-shadow hover:glass-border border-[1px] border-transparent"
              }`}
              onClick={() => setSort("likes")}>
              polubień
            </div>
          </div>
        </div>
        <div className="grid grid-rows-[50px_1fr] gap-[10px]">
          <div className="flex justify-center items-center">filtruj</div>
          <div className="flex flex-col md:flex-row md:justify-center items-center gap-[10px]">
            <div
              className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
                filter.includes("common")
                  ? "glass-shadow glass-border"
                  : "hover:glass-shadow hover:glass-border border-[1px] border-transparent"
              }`}
              onClick={() =>
                filter.includes("common")
                  ? setFilter(filter.filter((filter) => filter !== "common"))
                  : setFilter(filter.concat(["common"]))
              }>
              zwykłe
            </div>
            <div
              className={`flex justify-center items-center px-[15px] h-[30px] rounded-lg cursor-pointer transition-shadow ${
                filter.includes("anonymous")
                  ? "glass-shadow glass-border"
                  : "hover:glass-shadow hover:glass-border border-[1px] border-transparent"
              }`}
              onClick={() =>
                filter.includes("anonymous")
                  ? setFilter(filter.filter((filter) => filter !== "anonymous"))
                  : setFilter(filter.concat(["anonymous"]))
              }>
              anonimowe
            </div>
          </div>
        </div>
      </div>
      <Posts user={user} posts={sortPosts(filterPosts(posts))} />
    </>
  );
}
