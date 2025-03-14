"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import like from "@app/api/likePost";
import dislike from "@app/api/dislikePost";
import save from "@app/api/savePost";
import PostFooterOption from "./PostFooterOption";
import { IconButton } from "@components/IconButton";
import { Icon } from "@components/Icon";

export default function PostFooter({
  className,
  user,
  post,
  showReply,
  setShowReply,
  isDetailed,
}) {
  const router = useRouter();
  const [inProgress, setInProgress] = useState(false);
  const [liked, setLiked] = useState(
    post.likes.find((id: number) => id === user.id)
  );
  const [disliked, setDisliked] = useState(
    post.dislikes.find((id: number) => id === user.id)
  );
  const [saved, setSaved] = useState(
    post.saves.find((id: number) => id === user.id)
  );
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [dislikesCount, setDislikesCount] = useState(post.dislikes.length);
  const [repliesCount, setRepliesCount] = useState(post.replies.length);

  const moreButton = useRef(null);
  const moreEl = useRef(null);

  useEffect(() => {
    document.addEventListener("click", (e: PointerEvent) => {
      if (
        moreEl.current &&
        !moreEl.current.contains(e.target) &&
        !moreButton.current.contains(e.target)
      ) {
        moreEl.current.classList.add("hidden");
        moreEl.current.classList.remove("flex");
      }
    });
  }, []);

  useEffect(() => {
    setLiked(post.likes.find((id) => id === user.id));
    setDisliked(post.dislikes.find((id) => id === user.id));
    setSaved(post.saves.find((id) => id === user.id));
    setLikesCount(post.likes.length);
    setDislikesCount(post.dislikes.length);
    setRepliesCount(post.replies.length);
  }, [post, showReply]);

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
        iconColor="text-error"
        count={likesCount}
      />
      <PostFooterOption
        handleClick={() => (inProgress ? "" : handleDislike())}
        icon="thumb_down"
        iconFilled={disliked}
        iconColor="text-primary"
        count={dislikesCount}
      />
      <PostFooterOption
        handleClick={() => (inProgress ? "" : setShowReply(!showReply))}
        icon="reply"
        iconFilled={false}
        iconColor=""
        count={repliesCount}
      />
      {!isDetailed && (
        <IconButton onClick={() => router.push(`/post/${post.id}`)}>
          <Icon>open_in_new</Icon>
        </IconButton>
      )}
      <IconButton
        ref={moreButton}
        onClick={() => {
          moreEl.current.classList.toggle("hidden");
          moreEl.current.classList.toggle("flex");
        }}
      >
        <Icon>more_vert</Icon>
      </IconButton>
      <div
        className="absolute bottom-[calc(100%+10px)] right-0 hidden flex-col gap-[1px] font-medium text-primary text-sm w-[180px] py-[8px] bg-surface shadow-sm rounded-xl"
        ref={moreEl}
      >
        <div
          className="flex justify-start items-center gap-[8px] w-full h-[36px] px-[16px] hover:bg-surface-container cursor-pointer"
          onClick={() => (inProgress ? "" : handleSave())}
        >
          <Icon
            className={`text-on-surface-variant transition-icon ${
              saved && "fill"
            }`}
          >
            bookmark
          </Icon>
          {saved ? "zapisany" : "zapisz"}
        </div>
        <div className="flex justify-start items-center gap-[8px] w-full h-[36px] px-[16px] hover:bg-surface-container cursor-pointer transition-icon">
          <Icon className="text-on-surface-variant">upload</Icon>
          udostępnij
        </div>
        <div className="flex justify-start items-center gap-[8px] w-full h-[36px] px-[16px] hover:bg-surface-container cursor-pointer transition-icon">
          <Icon className="text-on-surface-variant">flag</Icon>
          zgłoś
        </div>
      </div>
    </div>
  );
}
