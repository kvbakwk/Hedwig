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
      className={`relative flex flex-col lg:flex-row md:justify-center lg:justify-start items-center gap-1 lg:gap-0 md:w-[70px] lg:w-[180px] xl:w-[250px] md:h-[70px] text-xs lg:text-xl xl:text-[22px] font-medium lg:font-light glass`}>
      <div
        className={`absolute z-0 w-16 h-8 bg-[color:rgb(var(--shadow)/1)] rounded-full ${
          active ? "block md:hidden" : "hidden"
        }`}></div>
      <div className="relative z-10 flex justify-center items-center w-16 h-8 md:w-auto md:h-auto lg:px-[18px]">
        <span
          className={`${
            active && fillIcon ? "fill " : ""
          }material-symbols-outlined`}>
          {icon}
        </span>
      </div>
      <span className="md:hidden lg:contents">{value}</span>
    </Link>
  );
}
