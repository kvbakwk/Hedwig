"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import changeAvatar from "@app/api/changeAvatar";

import { FilledButton } from "@components/Button";
import Avatar from "@components/Avatar";
import AvatarField from "@components/AvatarField";

export default function FormChangeAvatar({ user }) {
  const router = useRouter();
  const [avatar, setAvatar] = useState<FileList>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    changeAvatar(user.id, new FormData(e.currentTarget)).then(() =>
      router.back()
    );
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[150px] w-full mt-[100px] py-[40px]"
      onSubmit={handleSubmit}
      method="post">
      <div className="flex justify-center items-center gap-[150px]">
        <Avatar
          className="flex justify-center items-center w-[100px] h-[100px] bg-background shadow-md glass-border rounded-full"
          user_id={user.id}
          anonymous={false}
        />
        <AvatarField avatar={avatar} setAvatar={setAvatar} />
      </div>
      <div className="flex justify-end items-center w-[500px]">
        <FilledButton>potwierdź</FilledButton>
      </div>
    </form>
  );
}
