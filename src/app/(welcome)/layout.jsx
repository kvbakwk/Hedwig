import { loginCheck } from "@app/api/login";

import Link from "next/link";
import NavItem from "@components/NavItem";

export default async function WelcomeLayout({ children }) {
  await loginCheck(true);

  return (
    <div className="relative md:flex w-screen h-screen md:w-[905px] lg:w-[1240px] md:mx-auto">
      <div className="fixed md:static z-50 bottom-0 md:flex md:flex-col md:justify-around md:items-center w-full md:w-[102.5px] lg:w-[265px] xl:w-[345px] h-20 md:h-full bg-[color:rgb(var(--background)/1)] border-t-[1px] md:border-0 border-[color:rgb(var(--shadow)/1)]">
        <div className="hidden md:flex justify-center items-center text-[32px] text-center tracking-[4.16px] md:w-[70px] lg:w-[250px] md:h-[250px] lg:h-[70px] md:rotate-90 lg:rotate-0">
          schcool
        </div>
        <div className="flex md:flex-col justify-around md:justify-center md:items-center md:gap-[10px] items-center pt-3 pb-4">
          <NavItem
            value="logowanie"
            icon={"account_circle"}
            fillIcon={true}
            page="/logowanie"
            href="/logowanie"
          />
          <NavItem
            value="rejestracja"
            icon={"person_add"}
            page="/rejestracja"
            href="/rejestracja"
            fillIcon={true}
          />
        </div>
      </div>
      {children}
      <div className="fixed md:static z-50 top-0 flex md:flex-col justify-between md:justify-center items-center w-full md:w-[102.5px] lg:w-[265px] xl:w-[345px] h-[60px] sm:h-[70px] md:h-full px-8 md:px-0 md:pb-40 border-b-[1px] md:border-0 border-[color:rgb(var(--shadow)/1)]">
        <div className="flex md:hidden justify-center items-center text-2xl tracking-[4.16px]">
          schcool
        </div>
        <Link
          href="/regulamin"
          className="relative flex justify-center lg:justify-start items-center text-xl xl:text-[22px] font-extralight w-10 md:w-[70px] lg:w-[180px] xl:w-[250px] h-10 md:h-[70px] border-[1px] border-[color:rgb(var(--shadow)/1)] rounded-2xl md:glass">
          <div className="relative z-10 flex justify-center items-center w-16 h-8 lg:w-auto lg:h-auto lg:px-[18px]">
            <span className="material-symbols-outlined">book_5</span>
          </div>
          <span className="hidden lg:contents">regulamin</span>
        </Link>
      </div>
    </div>
  );
}
