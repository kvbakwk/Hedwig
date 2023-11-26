"use client";

import { useState, useEffect } from "react";

import like from "@app/api/users/like";
import dislike from "@app/api/users/dislike";
import save from "@app/api/users/save";
import PostFooterOption from "./PostFooterOption";

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
    <div className="justify-self-end self-center flex justify-center items-center gap-1 mr-[50px] select-none">
      <PostFooterOption
        handleClick={handleLike}
        icon="favorite"
        iconFilled={liked}
        iconColor="text-[#FF0000]"
        count={likesCount}
      />
      <PostFooterOption
        handleClick={handleDislike}
        icon="thumb_down"
        iconFilled={disliked}
        iconColor="text-[#0047D0]"
        count={dislikesCount}
      />
      <PostFooterOption
        handleClick={() => setReply(post.id)}
        icon="reply"
        iconFilled={false}
        iconColor=""
        count={repliesCount}
      />
      <div className="flex justify-center items-center cursor-pointer">
        <span className={`material-symbols-outlined`}>more_vert</span>
      </div>
      <div className="hidden cursor-pointer" onClick={handleSave}>
        {saved ? "zapisany" : "zapisz"}
      </div>
    </div>
  );
}
