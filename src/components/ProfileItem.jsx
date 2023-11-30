"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { logout } from "@app/api/login";

import Link from "next/link";

export default function ProfileItem({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const moreEl = useRef("moreEl");
  const [active, setActive] = useState(false);
  const [page, setPage] = useState(`/uzytkownik/${user.id}`);

  useEffect(
    () => setActive(pathname == page || page === undefined),
    [pathname]
  );

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div className="relative hidden lg:grid grid-cols-[1fr_40px] grid-rows-1 lg:w-[180px] xl:w-[250px] h-[70px] px-[10px] select-none">
      <Link className="self-center text-[22px] pl-4 cursor-pointer" href={page}>
        {user.firstname.toLowerCase()}
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
