"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "./Icon";

export default function NavItem({
  value,
  icon,
  fillIcon,
  page,
  href,
}: {
  value: string;
  icon: string;
  fillIcon: boolean;
  page?: string;
  href: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const element = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    console.log(pathname);
    if (pathname == page || page === undefined) {
      element.current.classList.add("bg-surface");
      element.current.classList.add("shadow-md");
    } else {
      element.current.classList.remove("bg-surface");
      element.current.classList.remove("shadow-md");
    }
    setActive(pathname == page || page === undefined);
  }, [pathname]);

  return (
    <div
      className="flex items-center gap-[18px] font-extralight text-[22px] w-full h-[70px] p-[18px] rounded-2xl cursor-pointer hover:bg-surface"
      ref={element}
      onClick={() => router.push(href)}
    >
      <Icon className="fill">{icon}</Icon>
      <div className="font-extralight text-on-surface-variant text-[22px]">
        {value}
      </div>
    </div>
  );
}
