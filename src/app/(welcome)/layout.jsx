import { loginCheck } from "@app/api/login";

import NavItem from "@components/NavItem";

export default async function WelcomeLayout({ children }) {
  await loginCheck(true);

  return (
    <div className="grid grid-cols-[345px_750px_345px] w-[1440px] h-screen mx-auto">
      <div className="flex flex-col justify-center items-center gap-28 w-full h-full">
        <div className="flex justify-center items-center text-[32px] text-center tracking-[4.16px] w-[250px] h-[70px]">
          schcool
        </div>
        <div className="flex flex-col gap-[10px]">
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
      <div className="flex justify-center w-full h-full pt-[327px]">
        <NavItem
          value="regulamin"
          icon={"book_5"}
          href="/regulamin"
          fillIcon={false}
        />
      </div>
    </div>
  );
}
