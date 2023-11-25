"use client";

import Posts from "../posts/Posts";

import { useState } from "react";

export default function ProfilePostsOwn({ user, posts }) {
  const [direction, setDirection] = useState(false);
  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState([]);

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
    <div>
      <div className="cursor-pointer" onClick={() => setDirection(!direction)}>
        sortuj według
        {direction ? (
          <span className="material-symbols-outlined">arrow_upward_alt</span>
        ) : (
          <span className="material-symbols-outlined">arrow_downward_alt</span>
        )}
      </div>
      <select onChange={(e) => setSort(e.target.value)} defaultValue="date">
        <option value="replies">odpowiedzi</option>
        <option value="date">daty</option>
        <option value="likes">polubień</option>
      </select>
      <input
        type="checkbox"
        onChange={() =>
          filter.includes("common")
            ? setFilter(filter.filter((filter) => filter !== "common"))
            : setFilter(filter.concat(["common"]))
        }
      />
      <input
        type="checkbox"
        onChange={() =>
          filter.includes("anonymous")
            ? setFilter(filter.filter((filter) => filter !== "anonymous"))
            : setFilter(filter.concat(["anonymous"]))
        }
      />
      <Posts user={user} posts={sortPosts(filterPosts(posts))} />
    </div>
  );
}
