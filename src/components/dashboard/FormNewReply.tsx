"use client";

import { useState, useRef, FormEventHandler } from "react";
import { useRouter } from "next/navigation";

import addPost from "@app/api/addPost";

export default function FormNewReply({ user, parent_id }) {
  const router = useRouter();
  const [contentErr, setContentErr] = useState(false);

  const textareaElement = useRef<HTMLTextAreaElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const content = e.currentTarget.elements["content"];
    const anonymous = e.currentTarget.elements["anonymous"];

    const res = await addPost(
      user.id,
      content.value,
      anonymous.checked,
      parent_id
    );

    if (res.add) {
      textareaElement.current.value = "";
      router.refresh();
    }
    setContentErr(res.contentErr);
  };

  return (
    <form
      className="grid grid-rows-[1fr_15px_60px]"
      onSubmit={handleSubmit}
      method="post">
      <textarea
        className="text-[22px] leading-10 h-[80px] mt-[20px] mx-[40px] border-b-[1px] border-[rgb(var(--shadow)/1)] outline-none resize-none"
        name="content"
        placeholder="odpowiedz..."
        ref={textareaElement}></textarea>
      <div className="flex justify-center items-center justify-self-end mr-[40px]">
        {contentErr && (
          <span className=" text-xs text-red-400">
            zawartość posta musi mieć conajmniej 1 znak i maksymalnie 255
          </span>
        )}
      </div>
      <div className="flex justify-center items-center gap-8 justify-self-end self-center mb-[15px] mr-[40px] select-none">
        <label
          htmlFor="anonymous"
          className="flex justify-center items-center gap-2">
          <input type="checkbox" name="anonymous" id="anonymous" /> anonimowy
        </label>
        <input
          className="text-lg text-[rgb(var(--background)/1)] p-[5px_18px] bg-[rgb(var(--foreground)/1)] rounded-full cursor-pointer"
          type="submit"
          value="opublikuj"
        />
      </div>
    </form>
  );
}
