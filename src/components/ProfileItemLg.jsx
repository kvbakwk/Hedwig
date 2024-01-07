"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@app/api/login";

import Link from "next/link";
import Avatar from "./Avatar";
import Icon from "./Icon";

export default function ProfileItemLg({ user }) {
  const router = useRouter();
  const moreEl = useRef("moreEl");
  const [page, setPage] = useState(`/uzytkownik/${user.id}`);

  useEffect(() => setPage(`/uzytkownik/${user.id}`), [user]);

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="relative lg:grid hidden grid-cols-[40px_1fr_40px] grid-rows-1 xl:w-[250px] lg:w-[180px] h-[70px] xl:px-[25px] select-none">
      <Link className="contents" href={page}>
        <Avatar
          className="justify-self-center self-center w-[40px] h-[40px] rounded-full"
          user_id={user.id}
          anonymous={false}
        />
        <span className="self-center text-[22px] pl-4 cursor-pointer">
          {user.firstname.toLowerCase()}
        </span>
      </Link>
      <div
        className="justify-self-center self-center flex justify-center items-center w-[30px] h-[30px] hover:bg-shadow cursor-pointer transition-colors rounded-full"
        onClick={() => {
          moreEl.current.classList.toggle("hidden");
          moreEl.current.classList.toggle("flex");
        }}>
        <Icon icon="more_vert" fill={false} />
      </div>
      <div
        className="absolute bottom-[calc(100%+5px)] right-0 hidden flex-col gap-[1px] w-[160px] py-[8px] px-[4px] bg-background glass"
        ref={moreEl}>
        <div
          className="flex justify-start items-center gap-[5px] w-full h-[30px] px-[16px] hover:bg-shadow cursor-pointer transition-colors rounded-lg"
          onClick={() => router.push("/zmiana-hasla")}>
          <Icon icon="password" fill={false} />
          zmień hasło
        </div>
        <div
          className="flex justify-start items-center gap-[5px] w-full h-[30px] px-[16px] hover:bg-shadow cursor-pointer transition-colors rounded-lg"
          onClick={handleLogout}>
          <Icon icon="logout" fill={false} />
          wyloguj się
        </div>
      </div>
    </div>
  );
}
