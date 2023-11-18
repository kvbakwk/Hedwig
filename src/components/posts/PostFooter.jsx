"use client";

import { useState, useEffect } from "react";

import like from "@app/api/posts/like";

export default function PostFooter({ user_id, post_id, likes }) {
  const [liked, setLiked] = useState(likes.find((id) => id === user_id));
  const [likesCount, setLikesCount] = useState(likes.length);

  useEffect(() => {
    setLiked(likes.find((id) => id === user_id));
    setLikesCount(likes.length);
  }, [likes]);

  const handleLike = async () => {
    (await like(user_id, post_id))
      ? setLikesCount(likesCount + 1)
      : setLikesCount(likesCount - 1);
    setLiked(!liked);
  };

  return (
    <div>
      <div className="cursor-pointer" onClick={handleLike}>
        <span
          className={`material-symbols-outlined text-red-600 ${
            liked ? "fill" : ""
          }`}>
          favorite
        </span>
        {likesCount}
      </div>
    </div>
  );
}
