"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@app/api/login";

import Avatar from "../Avatar";
import { Icon } from "../Icon";
import { IconButton } from "@components/IconButton";

export default function User({ user }) {
  const router = useRouter();

  const moreButton = useRef(null);
  const moreEl = useRef(null);

  const [page, setPage] = useState(`/uzytkownik/${user.id}`);

  useEffect(() => {
    document.addEventListener("click", (e: PointerEvent) => {
      if (moreEl.current && moreButton.current && !moreEl.current.contains(e.target) && !moreButton.current.contains(e.target)) {
        moreEl.current.classList.add("hidden");
        moreEl.current.classList.remove("flex");
      }
    });
  }, []);
  useEffect(() => setPage(`/uzytkownik/${user.id}`), [user]);

  const handleLogout = async (): Promise<void> => {
    await logout();
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center gap-[10px] text-primary w-full mb-[30px] px-[24px] py-[10px]">
      <div className="relative flex justify-between items-center gap-[18px] font-light text-[22px] w-full h-[70px] px-[18px] rounded-2xl border-primary">
        <div className="flex justify-center items-center gap-[18px]">
          <Avatar
            className="justify-self-center self-center w-[45px] h-[45px] rounded-full"
            user_id={user.id}
            anonymous={false}
          />
          <span className="self-center text-[22px] cursor-pointer">
            {user.firstname}
          </span>
        </div>
        <IconButton
          ref={moreButton}
          onClick={() => {
            moreEl.current.classList.toggle("hidden");
            moreEl.current.classList.toggle("flex");
          }}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <div
          className="absolute bottom-[100%] right-0 hidden flex-col gap-[1px] font-medium text-primary text-sm w-[180px] py-[8px] bg-surface shadow-sm rounded-xl"
          ref={moreEl}
        >
          <div
            className="flex justify-start items-center gap-[8px] w-full h-[36px] px-[16px] hover:bg-surface-container cursor-pointer"
            onClick={() => router.push("/zmiana-awatara")}
          >
            <Icon className="text-on-surface-variant">account_circle</Icon>
            zmień awatar
          </div>
          <div
            className="flex justify-start items-center gap-[8px] w-full h-[36px] px-[16px] hover:bg-surface-container cursor-pointer"
            onClick={() => router.push("/zmiana-hasla")}
          >
            <Icon className="text-on-surface-variant">password</Icon>
            zmień hasło
          </div>
          <div
            className="flex justify-start items-center gap-[8px] w-full h-[36px] px-[16px] hover:bg-surface-container cursor-pointer"
            onClick={handleLogout}
          >
            <Icon className="text-on-surface-variant">move_item</Icon>
            wyloguj się
          </div>
        </div>
      </div>
    </div>
  );
}
