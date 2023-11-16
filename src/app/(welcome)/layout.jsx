import { loginCheck } from "@app/api/login";

import Link from "next/link";
import NavItem from "@components/NavItem";

export default async function WelcomeLayout({ children }) {
  await loginCheck(true);

  return (
    <div className="relative w-screen h-screen">
      <div className="fixed z-50 bottom-0 w-full h-20 bg-[color:rgb(var(--background)/1)] border-t-[1px] border-[color:rgb(var(--shadow)/1)]">
        <div className="hidden justify-center items-center text-[32px] text-center tracking-[4.16px] w-[250px] h-[70px]">
          schcool
        </div>
        <div className="flex justify-around items-center pt-3 pb-4">
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
      <div className="fixed z-50 top-0 flex justify-between items-center px-8 w-full h-[60px] border-b-[1px] border-[color:rgb(var(--shadow)/1)]">
        <div className="flex justify-center items-center text-2xl tracking-[4.16px]">
          schcool
        </div>
        <Link
          href="/regulamin"
          className="relative flex justify-center items-center w-10 h-10 border-[1px] border-[color:rgb(var(--shadow)/1)] rounded-2xl"
        >
          <div className="relative z-10 flex justify-center items-center w-16 h-8">
            <span className="material-symbols-outlined">book_5</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
