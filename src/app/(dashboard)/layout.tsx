import "@app/utils/globals.css";

import { Metadata } from "next";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";
import getUser from "@app/api/getUser";

import NavItem from "@components/NavItem";
import EventsItem from "@components/dashboard/EventsItem";
import User from "@components/dashboard/User";

export const metadata: Metadata = {
  title: "schcool",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await loginCheck())) redirect("/logowanie");

  return (
    <html lang="pl" className="font-noto">
      <body>
        <div className="flex justify-center items-center w-full h-full">
          <div className="z-0 fixed top-0 left-0 grid grid-rows-[110px_1fr] w-[calc((100vw-750px)/2)] h-full bg-surface-container">
            <div className="flex justify-center items-center font-bold text-primary text-[45px] tracking-tight">
              schcool.
            </div>
            <div className="justify-self-center flex flex-col justify-between items-center w-[300px] h-full">
              <div className="flex flex-col items-center gap-[10px] text-primary w-full mt-[30px] px-[30px] py-[10px]">
                <NavItem
                  value="główna"
                  icon={"home"}
                  fillIcon={true}
                  page="/"
                  href="/"
                />
              </div>
              <User user={await getUser()} />
            </div>
          </div>
          <div className="z-0 fixed top-0 right-0 grid grid-rows-[9fr_1fr] w-[calc((100vw-750px)/2)] h-full bg-surface-container">
            <div className="justify-self-center flex flex-col justify-center items-center w-[300px]">
              <EventsItem />
            </div>
            <div className="flex justify-center items-center gap-[10px] text-primary w-full h-[70px] mb-[30px] py-[10px] select-none">
              <span className="font-semibold">simple.</span><span className="font-light">@</span><span className="font-semibold">2025</span>
            </div>
          </div>
          <div className="z-10 w-[750px] min-h-screen bg-surface-container">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
