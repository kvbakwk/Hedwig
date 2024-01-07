"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import changeAvatar from "@app/api/changeAvatar";

import Button from "@components/Button";
import Avatar from "@components/Avatar";
import AvatarField from "@components/AvatarField";

export default function FormChangeAvatar({ user }) {
  const router = useRouter();
  const [avatar, setAvatar] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    changeAvatar(user.id, new FormData(e.target)).then(() => router.push("/"));
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[15px] w-full mt-[100px] py-[40px]"
      onSubmit={handleSubmit}
      method="post">
      <div className="flex flex-col justify-center items-center gap-[10px] w-[150px]">
        <Avatar
          className="flex justify-center items-center w-[100px] h-[100px] bg-background shadow-md glass-border rounded-full"
          user_id={user.id}
          anonymous={false}
        />
      </div>
      <div className="w-[200px] h-[1px] bg-shadow"></div>
      <div className="flex flex-col justify-center items-center gap-[10px] w-[150px]">
        <AvatarField avatar={avatar} setAvatar={setAvatar} />
      </div>
      <div className="flex justify-center md:justify-end items-center w-[500px]">
        <Button type="submit" value="potwierdź" />
      </div>
    </form>
  );
}
