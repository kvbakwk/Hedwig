"use client";

import { useEffect, useState } from "react";
import getAvatar, { DEFAULT_AVATAR_URL } from "@app/utils/avatar";

export default function Avatar({
  user_id,
  anonymous,
  className,
}: {
  user_id: number;
  anonymous: boolean;
  className: string;
}) {
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR_URL);

  useEffect(() => {
    getAvatar(user_id, anonymous).then((url) => setAvatarUrl(url));
  }, [user_id, anonymous]);
  return <img className={className} src={avatarUrl} />;
}
