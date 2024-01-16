"use server";

import fs from "fs";

interface changeAvatarAPIResponse {
  change: boolean;
}

export default async function changeAvatarAPI(
  user_id: number,
  formData: FormData
): Promise<changeAvatarAPIResponse> {
  const avatar = formData.get("avatar");

  if (avatar instanceof File && avatar.size)
    fs.writeFile(
      `./public/avatars/${user_id}.png`,
      Buffer.from(await avatar.arrayBuffer()),
      (err) => {
        if (err) console.error(err);
      }
    );

  return { change: true };
}
