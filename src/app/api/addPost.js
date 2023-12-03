"use server";

import { validatePostContent } from "@app/utils/validator";
import { addPost, addPostReply } from "@app/utils/db-actions/post";

export default async function addPostAPI(
  user_id,
  content,
  anonymous,
  parent_id
) {
  const isValid = validatePostContent(content);

  if (isValid)
    parent_id === 0
      ? await addPost(user_id, content, anonymous)
      : await addPostReply(user_id, content, anonymous, parent_id);

  return {
    add: isValid,
    contentErr: !validatePostContent(content),
  };
}
