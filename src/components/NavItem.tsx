"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

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
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  useEffect(
    () => setActive(pathname == page || page === undefined),
    [pathname]
  );
  return (
    <Link
      href={href}
      className="relative flex lg:flex-row flex-col lg:justify-start md:justify-center items-center lg:gap-0 gap-1 xl:text-[22px] lg:text-xl text-xs lg:font-light font-medium xl:w-[250px] lg:w-[180px] md:w-[60px] lg:h-[70px] md:h-[60px] md:glass">
      <div
        className={`absolute z-0 w-16 h-8 bg-shadow rounded-full ${
          active ? "block md:hidden" : "hidden"
        }`}
      />
      <div className="z-10 relative flex justify-center items-center md:w-auto w-16 md:h-auto h-8 lg:px-[18px]">
        <Icon icon={icon} fill={active && fillIcon} />
      </div>
      <span className="md:hidden lg:contents">{value}</span>
    </Link>
  );
}
