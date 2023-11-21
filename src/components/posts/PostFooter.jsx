"use client";

import { useState, useEffect } from "react";

import like from "@app/api/users/like";
import dislike from "@app/api/users/dislike";
import save from "@app/api/users/save";

export default function PostFooter({
  user_id,
  post_id,
  likes,
  dislikes,
  saves,
}) {
  const [liked, setLiked] = useState(likes.find((id) => id === user_id));
  const [disliked, setDisliked] = useState(
    dislikes.find((id) => id === user_id)
  );
  const [saved, setSaved] = useState(saves.find((id) => id === user_id));
  const [likesCount, setLikesCount] = useState(likes.length);
  const [dislikesCount, setDislikesCount] = useState(dislikes.length);

  useEffect(() => {
    setLiked(likes.find((id) => id === user_id));
    setDisliked(dislikes.find((id) => id === user_id));
    setSaved(saves.find((id) => id === user_id));
    setLikesCount(likes.length);
    setDislikesCount(dislikes.length);
  }, [likes]);

  const handleLike = async () => {
    (await like(user_id, post_id))
      ? setLikesCount(likesCount + 1)
      : setLikesCount(likesCount - 1);
    setLiked(!liked);
  };
  const handleDislike = async () => {
    (await dislike(user_id, post_id))
      ? setDislikesCount(dislikesCount + 1)
      : setDislikesCount(dislikesCount - 1);
    setDisliked(!disliked);
  };

  const handleSave = async () => {
    await save(user_id, post_id);
    setSaved(!saved);
  };

  return (
    <div className="flex gap-2">
      <div className="cursor-pointer" onClick={handleLike}>
        <span
          className={`material-symbols-outlined ${
            liked ? "fill" : ""
          } text-red-600`}>
          favorite
        </span>
        {likesCount}
      </div>
      <div className="cursor-pointer" onClick={handleDislike}>
        <span className={`material-symbols-outlined ${disliked ? "fill" : ""}`}>
          thumb_down
        </span>
        {dislikesCount}
      </div>
      <div className="cursor-pointer" onClick={handleSave}>
        {saved ? "zapisany" : "zapisz"}
      </div>
    </div>
  );
}
