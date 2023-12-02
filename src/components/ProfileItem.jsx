"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@app/api/login";

import Link from "next/link";
import Avatar from "./Avatar";

export default function ProfileItem({ user }) {
  const router = useRouter();
  const moreEl = useRef("moreEl");
  const [page, setPage] = useState(`/uzytkownik/${user.id}`);

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="relative hidden lg:grid grid-cols-[40px_1fr_40px] grid-rows-1 lg:w-[180px] xl:w-[250px] h-[70px] xl:px-[25px] select-none">
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
        className="flex justify-center items-center justify-self-center self-center w-[30px] h-[30px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors rounded-full"
        onClick={() => {
          moreEl.current.classList.toggle("hidden");
          moreEl.current.classList.toggle("flex");
        }}>
        <span className="material-symbols-outlined">more_vert</span>
      </div>
      <div
        className="absolute bottom-[calc(100%+5px)] right-0 hidden flex-col w-[150px] py-[10px] bg-[color:rgb(var(--background)/1)] glass"
        ref={moreEl}>
        <div
          className="flex justify-start items-center gap-[5px] w-full h-[30px] px-[16px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors"
          onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          wyloguj się
        </div>
      </div>
    </div>
  );
}
