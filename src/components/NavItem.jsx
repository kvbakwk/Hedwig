"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavItem({ value, icon, fillIcon, page, href }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  useEffect(
    () => setActive(pathname == page || page === undefined),
    [pathname]
  );
  return (
    <Link
      href={href}
      className="relative flex flex-col items-center gap-1 text-xs font-medium"
    >
      <div
        className={`absolute z-0 w-16 h-8 bg-[color:rgb(var(--shadow)/1)] rounded-full ${
          active ? "block" : "hidden"
        }`}
      ></div>
      <div className="relative z-10 flex justify-center items-center w-16 h-8">
        <span
          className={`${
            active && fillIcon ? "fill " : ""
          }material-symbols-outlined`}
        >
          {icon}
        </span>
      </div>
      {value}
    </Link>
  );
}
