"use client";

import { useState, useRef } from "react";
import addPost from "@app/api/addPost";
import getPosts from "@app/api/getPosts";
import Avatar from "@components/Avatar";
import { FilledButton } from "@components/Button";
import { Checkbox } from "@components/Checkbox";

export default function FormNewPost({ user, setPosts }) {
  const [anonymous, setAnonymous] = useState(false);
  const [contentErr, setContentErr] = useState(false);

  const textareaElement = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { content, anonymous } = e.target.elements;

    addPost(user.id, content.value, anonymous.checked, 0).then((res) => {
      if (res.add) {
        textareaElement.current.value = "";

        getPosts(user.id, true, false, true).then((res) => setPosts(res));
      }
      setContentErr(res.contentErr);
    });
  };

  return (
    <form
      className="grid grid-cols-[100px_1fr] grid-rows-[1fr_15px_60px] mb-[50px] bg-surface rounded-2xl shadow-sm"
      onSubmit={handleSubmit}
      method="post"
    >
      <Avatar
        className="row-span-3 justify-self-center w-[60px] h-[60px] mt-[20px] rounded-full"
        user_id={user.id}
        anonymous={anonymous}
      />
      <textarea
        className="text-on-surface-variant text-[22px] leading-10 h-[170px] mt-[20px] mr-[40px] bg-surface outline-none resize-none"
        name="content"
        placeholder="co u ciebie?"
        ref={textareaElement}
      />
      <div className="flex justify-center items-center justify-self-end mr-[40px]">
        {contentErr && (
          <span className=" text-xs text-error">
            zawartość posta musi mieć conajmniej 1 znak i maksymalnie 255
          </span>
        )}
      </div>
      <div className="justify-self-end self-center flex justify-center items-center gap-8 mb-[15px] mr-[40px] select-none">
        <label
          className="flex justify-center items-center text-[14px] text-outline tracking-wider"
          htmlFor="anonymous"
        >
          <Checkbox
            className="m-[15px]"
            name="anonymous"
            id="anonymous"
            onChange={() => setAnonymous(!anonymous)}
          />
          anonimowy
        </label>
        <FilledButton>opublikuj</FilledButton>
      </div>
    </form>
  );
}
