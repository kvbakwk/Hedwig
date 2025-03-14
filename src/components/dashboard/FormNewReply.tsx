"use client";

import { useState, useRef, FormEventHandler } from "react";
import { useRouter } from "next/navigation";

import addPost from "@app/api/addPost";
import { FilledTonalButton } from "@components/Button";
import { Checkbox } from "@components/Checkbox";

export default function FormNewReply({ user, parent_id, setShowReply }) {
  const router = useRouter();
  const [contentErr, setContentErr] = useState(false);

  const textareaElement = useRef<HTMLTextAreaElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const content = e.currentTarget.elements["content"];
    const anonymous = e.currentTarget.elements["anonymous_reply"];

    const res = await addPost(
      user.id,
      content.value,
      anonymous.checked,
      parent_id
    );

    if (res.add) {
      textareaElement.current.value = "";
      setShowReply(false);
      router.refresh();
    }
    setContentErr(res.contentErr);
  };

  return (
    <form
      className="grid grid-rows-[1fr_15px_60px]"
      onSubmit={handleSubmit}
      method="post"
    >
      <textarea
        className="text-on-surface-variant text-[18px] leading-8 h-[40px] mt-[20px] mx-[40px] bg-inherit outline-none resize-none"
        name="content"
        placeholder="odpowiedz..."
        ref={textareaElement}
      ></textarea>
      <div className="flex justify-center items-center justify-self-end mr-[40px]">
        {contentErr && (
          <span className=" text-xs text-red-400">
            zawartość posta musi mieć conajmniej 1 znak i maksymalnie 255
          </span>
        )}
      </div>
      <div className="flex justify-center items-center gap-8 justify-self-end self-center mb-[15px] mr-[40px] select-none">
        <label
          className="flex justify-center items-center text-[14px] text-outline tracking-wider"
          htmlFor="anonymous_reply"
        >
          <Checkbox
            className="m-[15px]"
            name="anonymous_reply"
            id="anonymous_reply"
          />
          anonimowy
        </label>
        <FilledTonalButton>odpowiedz</FilledTonalButton>
      </div>
    </form>
  );
}
