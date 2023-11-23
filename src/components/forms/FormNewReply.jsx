"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import addPost from "@app/api/posts/add";

export default function FormNewPost({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [contentErr, setContentErr] = useState(false);

  const textareaElement = useRef();

  const createQueryString = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { content, anonymous } = e.target.elements;

    const res = await addPost(user.id, content.value, anonymous.checked);

    if (res.add) {
      router.push(pathname + "?" + createQueryString("reply"), {
        scroll: false,
      });
      textareaElement.current.value = "";
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
        ref={textareaElement}></textarea>
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
