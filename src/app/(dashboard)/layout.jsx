import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";
import getUser from "@app/api/users/get";

import { Suspense } from "react";
import ProfileItem from "@components/ProfileItem";
import NavItem from "@components/NavItem";
import Link from "next/link";
import Image from "next/image";
import awatarImage from "./user.jpg";

export const metadata = {
  title: "schcool",
};

export default async function RootDashboardLayout({ children }) {
  if (!(await loginCheck())) redirect("/logowanie");

  const user = await getUser();

  return (
    <html>
      <head></head>
      <body>
        <Suspense fallback={<></>}>
          <div className="md:z-0 md:fixed md:grid md:grid-cols-[1fr_700px_1fr] lg:grid-cols-[1fr_750px_1fr] md:w-screen md:h-screen">
            <div className="fixed md:static z-50 bottom-0 flex md:flex-col justify-around md:justify-between items-center md:gap-2 w-screen md:w-full h-20 md:h-full pt-3 pb-4 md:py-[50px] bg-[color:rgb(var(--background)/1)] border-t-[1px] border-[color:rgb(var(--shadow)/1)] md:border-0">
              <div className="hidden md:flex justify-center items-center text-[32px] text-center tracking-[4.16px] md:w-[70px] lg:w-[180px] xl:w-[250px] md:h-[250px] lg:h-[70px] md:rotate-90 lg:rotate-0">
                schcool
              </div>
              <div className="contents md:flex md:flex-col md:justify-start md:items-center md:gap-[10px] md:w-auto md:h-1/2">
                <NavItem
                  value="główna"
                  icon={"home"}
                  fillIcon={true}
                  page="/"
                  href="/"
                />
              </div>
              <Link
                className="text-xs font-medium flex lg:hidden flex-col justify-center items-center gap-1"
                href={`/uzytkownik/${user.id}`}>
                <Image
                  className="w-[32px] md:w-[50px] h-[32px] md:h-[50px] rounded-full"
                  src={awatarImage}
                />
                <span className="md:hidden">
                  {user.firstname.toLowerCase()}
                </span>
              </Link>
              <ProfileItem user={user} />
            </div>
            <div></div>
            <div className="fixed md:static z-50 top-0 flex md:flex-col justify-between md:justify-center items-center w-screen md:w-full h-[60px] sm:h-[70px] md:h-full px-[50px] md:px-0  lg:pb-[200px] bg-[color:rgb(var(--background)/1)] border-b-[1px] border-[color:rgb(var(--shadow)/1)]">
              <span className="md:hidden text-[22px]">główna</span>
              <div className="flex justify-center items-center w-[40px] sm:w-[50px] md:w-[60px] lg:w-[180px] xl:w-[250px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] bg-[color:rgb(var(--shadow)/1)] rounded-2xl">
                <span className="material-symbols-outlined">newspaper</span>
              </div>
            </div>
          </div>
          <div className="z-10 relative w-screen md:w-[700px] lg:w-[750px] min-h-screen mx-auto">
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
