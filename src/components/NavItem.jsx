"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavItem({ value, icon, fillIcon, page, href }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  useEffect(() => {
    console.log(page);
    setActive(pathname == page || page === undefined);
  }, [pathname]);
  return (
    <Link
      href={href}
      className={`flex items-center gap-[18px] w-[250px] h-[70px] pl-[18px] text-[22px] font-extralight rounded-2xl cursor-pointer ${
        active ? "glass" : "border-[1px] border-transparent glass-hover"
      }`}
    >
      <span className={`${active && fillIcon ? "fill " : ""}material-symbols-outlined`}>
        {icon}
      </span>
      {value}
    </Link>
  );
}
