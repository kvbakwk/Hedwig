"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import addPost from "@app/api/posts/add";

export default function FormNewPost({ user }) {
  const router = useRouter();
  const [contentErr, setContentErr] = useState(false);

  const textareaElement = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { content } = e.target.elements;

    const res = await addPost(user.id, content.value);

    if (res.add) {
      textareaElement.current.value = "";
      router.refresh();
    }
    setContentErr(res.contentErr);
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <textarea
        name="content"
        cols="30"
        rows="10"
        placeholder="co u ciebie?"
        ref={textareaElement}
      ></textarea>
      {contentErr && (
        <span className="text-red-400">
          zawartość posta powinna mieć conajmniej 1 znak i maksymalnie 255
        </span>
      )}
      <input type="checkbox" name="anonymous" />
      <input type="submit" value="wstaw" />
    </form>
  );
}
