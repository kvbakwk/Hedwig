"use server";

import { validatePostContent } from "@app/utils/validator";
import { addPost } from "@app/utils/db-actions/post";

export default async function add(user_id, content, anonymous) {
  const isValid = validatePostContent(content);

  if (isValid) await addPost(user_id, content, anonymous);

  return {
    add: isValid,
    contentErr: !validatePostContent(content),
  };
}
