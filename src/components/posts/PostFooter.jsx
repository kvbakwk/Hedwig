"use client";

import { useState, useEffect } from "react";

import like from "@app/api/users/like";
import dislike from "@app/api/users/dislike";
import save from "@app/api/users/save";
import PostFooterOption from "./PostFooterOption";

export default function PostFooter({ user, post, setReply }) {
  const [inProgress, setInProgress] = useState(false);
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

  const handleLike = () => {
    setInProgress(true);
    like(user.id, post.id)
      .then((res) => {
        res ? setLikesCount(likesCount + 1) : setLikesCount(likesCount - 1);
        setLiked(!liked);
      })
      .finally(() => setInProgress(false));
  };
  const handleDislike = () => {
    setInProgress(true);
    dislike(user.id, post.id)
      .then((res) => {
        res
          ? setDislikesCount(dislikesCount + 1)
          : setDislikesCount(dislikesCount - 1);
        setDisliked(!disliked);
      })
      .finally(() => setInProgress(false));
  };

  const handleSave = () => {
    setInProgress(true);
    save(user.id, post.id)
      .then(() => setSaved(!saved))
      .finally(() => setInProgress(false));
  };

  return (
    <div className="justify-self-end self-center flex justify-center items-center gap-1 mr-[50px] select-none">
      <PostFooterOption
        handleClick={() => (inProgress ? "" : handleLike())}
        icon="favorite"
        iconFilled={liked}
        iconColor="text-[#FF0000]"
        count={likesCount}
      />
      <PostFooterOption
        handleClick={() => (inProgress ? "" : handleDislike())}
        icon="thumb_down"
        iconFilled={disliked}
        iconColor="text-[#0047D0]"
        count={dislikesCount}
      />
      <PostFooterOption
        handleClick={() => (inProgress ? "" : setReply(post.id))}
        icon="reply"
        iconFilled={false}
        iconColor=""
        count={repliesCount}
      />
      <div className="flex justify-center items-center cursor-pointer">
        <span className={`material-symbols-outlined`}>more_vert</span>
      </div>
      <div
        className="hidden cursor-pointer"
        onClick={() => (inProgress ? "" : handleSave())}>
        {saved ? "zapisany" : "zapisz"}
      </div>
    </div>
  );
}
