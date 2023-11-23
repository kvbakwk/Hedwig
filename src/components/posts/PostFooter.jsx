"use client";

import { useState, useEffect } from "react";

import like from "@app/api/users/like";
import dislike from "@app/api/users/dislike";
import save from "@app/api/users/save";

export default function PostFooter({ user, post, setReply }) {
  const [liked, setLiked] = useState(post.likes.find((id) => id === user.id));
  const [disliked, setDisliked] = useState(
    post.dislikes.find((id) => id === user.id)
  );
  const [saved, setSaved] = useState(post.saves.find((id) => id === user.id));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes.length);
  const [repliesCount, setRepliesCount] = useState(post.replies.length);

  useEffect(() => {
    setLiked(post.likes.find((id) => id === user.id));
    setDisliked(post.dislikes.find((id) => id === user.id));
    setSaved(post.saves.find((id) => id === user.id));
    setLikesCount(post.likes.length);
    setDislikesCount(post.dislikes.length);
    setRepliesCount(post.replies.length);
  }, [post]);

  const handleLike = async () => {
    (await like(user.id, post.id))
      ? setLikesCount(likesCount + 1)
      : setLikesCount(likesCount - 1);
    setLiked(!liked);
  };
  const handleDislike = async () => {
    (await dislike(user.id, post.id))
      ? setDislikesCount(dislikesCount + 1)
      : setDislikesCount(dislikesCount - 1);
    setDisliked(!disliked);
  };

  const handleSave = async () => {
    await save(user.id, post.id);
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
        <span className={`material-symbols-outlined`}>reply</span>
        {repliesCount}
      </div>
      <div className="cursor-pointer" onClick={handleSave}>
        {saved ? "zapisany" : "zapisz"}
      </div>
    </div>
  );
}
