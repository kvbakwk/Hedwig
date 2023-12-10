"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import like from "@app/api/likePost";
import dislike from "@app/api/dislikePost";
import save from "@app/api/savePost";
import PostFooterOption from "./PostFooterOption";

export default function PostFooter({ className, user, post, setReply }) {
  const router = useRouter();
  const [inProgress, setInProgress] = useState(false);
  const [liked, setLiked] = useState(post.likes.find((id) => id === user.id));
  const [disliked, setDisliked] = useState(
    post.dislikes.find((id) => id === user.id)
  );
  const [saved, setSaved] = useState(post.saves.find((id) => id === user.id));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes.length);
  const [repliesCount, setRepliesCount] = useState(post.replies.length);

  const moreEl = useRef("moreEl");

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
    <div className={className}>
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
      <div
        className="flex justify-center items-center justify-self-center self-center w-[35px] h-[35px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors rounded-full"
        onClick={() => router.push(`/post/${post.id}`)}>
        <span className={`material-symbols-outlined`}>open_in_new</span>
      </div>
      <div
        className="flex justify-center items-center justify-self-center self-center w-[30px] h-[30px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors rounded-full"
        onClick={() => {
          moreEl.current.classList.toggle("hidden");
          moreEl.current.classList.toggle("flex");
        }}>
        <span className={`material-symbols-outlined`}>more_vert</span>
      </div>
      <div
        className="absolute bottom-[-50%] md:bottom-[calc(100%+25px)] right-[40px] md:right-[-25px] hidden flex-col w-[150px] py-[10px] bg-[color:rgb(var(--background)/1)] glass-border shadow-md rounded-2xl"
        ref={moreEl}>
        <div
          className="flex justify-start items-center gap-[5px] w-full h-[30px] px-[16px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors"
          onClick={() => (inProgress ? "" : handleSave())}>
          <span className={`material-symbols-outlined ${saved ? "fill" : ""}`}>
            bookmark
          </span>
          {saved ? "zapisany" : "zapisz"}
        </div>
        <div className="flex justify-start items-center gap-[5px] w-full h-[30px] px-[16px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors">
          <span className="material-symbols-outlined">upload</span>
          udostępnij
        </div>
        <div className="flex justify-start items-center gap-[5px] w-full h-[30px] px-[16px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors">
          <span className="material-symbols-outlined">flag</span>
          zgłoś
        </div>
      </div>
    </div>
  );
}
