"use server";

import { Pool } from "pg";

import { validatePostContent } from "@app/utils/validator";

export default async function add(user_id, content, anonymous) {
  const isValid = validatePostContent(content);

  if (isValid) {
    const client = new Pool();
    await client.query(
      "INSERT INTO public.post VALUES (DEFAULT, $1, $2, $3, $4);",
      [user_id, content, new Date(), anonymous]
    );
    await client.end();
  }

  return {
    add: isValid,
    contentErr: !validatePostContent(content),
  };
}
