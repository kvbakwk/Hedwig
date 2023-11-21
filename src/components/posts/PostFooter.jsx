"use client";

import { useState, useEffect } from "react";

import like from "@app/api/posts/like";
import save from "@app/api/posts/save";

export default function PostFooter({ user_id, post_id, likes, saves }) {
  const [liked, setLiked] = useState(likes.find((id) => id === user_id));
  const [saved, setSaved] = useState(saves.find((id) => id === user_id));
  const [likesCount, setLikesCount] = useState(likes.length);

  useEffect(() => {
    setLiked(likes.find((id) => id === user_id));
    setSaved(saves.find((id) => id === user_id));
    setLikesCount(likes.length);
  }, [likes]);

  const handleLike = async () => {
    (await like(user_id, post_id))
      ? setLikesCount(likesCount + 1)
      : setLikesCount(likesCount - 1);
    setLiked(!liked);
  };

  const handleSave = async () => {
    await save(user_id, post_id);
    setSaved(!saved);
  };

  return (
    <div className="flex gap-2">
      <div className="cursor-pointer" onClick={handleLike}>
        <span
          className={`material-symbols-outlined text-red-600 ${
            liked ? "fill" : ""
          }`}>
          favorite
        </span>
        {likesCount}
      </div>
      <div className="cursor-pointer" onClick={handleSave}>
        {saved ? "zapisany" : "zapisz"}
      </div>
    </div>
  );
}
