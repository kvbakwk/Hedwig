"use client";

import { useState } from "react";

import Posts from "../posts/Posts";

export default function ProfilePosts({ user, posts }) {
  const [direction, setDirection] = useState(false);
  const [sort, setSort] = useState("date");

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
      <Posts user={user} posts={sortPosts(posts)} />
    </div>
  );
}
