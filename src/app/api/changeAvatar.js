"use server";

import fs from "fs";

export default async function changeAvatarAPI(user_id, formData) {
  const avatar = formData.get("avatar");

  if (avatar.size)
    fs.writeFile(
      `./public/avatars/${user_id}.png`,
      Buffer.from(await avatar.arrayBuffer()),
      (err) => {
        if (err) console.error(err);
      }
    );

  return { change: true };
}
