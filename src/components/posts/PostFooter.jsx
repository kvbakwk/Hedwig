"use client";

import { useState, useEffect } from "react";

import like from "@app/api/users/like";
import dislike from "@app/api/users/dislike";
import save from "@app/api/users/save";

export default function PostFooter({ post, setReply }) {
  const [liked, setLiked] = useState(
    post.likes.find((id) => id === post.user_id)
  );
  const [disliked, setDisliked] = useState(
    post.dislikes.find((id) => id === post.user_id)
  );
  const [saved, setSaved] = useState(
    post.saves.find((id) => id === post.user_id)
  );
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes.length);

  useEffect(() => {
    setLiked(post.likes.find((id) => id === post.user_id));
    setDisliked(post.dislikes.find((id) => id === post.user_id));
    setSaved(post.saves.find((id) => id === post.user_id));
    setLikesCount(post.likes.length);
    setDislikesCount(post.dislikes.length);
  }, [post]);

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
        <span className={`material-symbols-outlined ${liked ? "fill" : ""}`}>
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
      <div className="cursor-pointer" onClick={() => setReply(post.id)}>
        <span className={`material-symbols-outlined`}>reply</span>0
      </div>
      <div className="cursor-pointer" onClick={handleSave}>
        {saved ? "zapisany" : "zapisz"}
      </div>
    </div>
  );
}
