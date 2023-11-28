import "@app/utils/globals.css";

import { redirect } from "next/navigation";
import { loginCheck } from "@app/api/login";
import getUser from "@app/api/users/get";

import { Suspense } from "react";
import ProfileItem from "@components/ProfileItem";
import NavItem from "@components/NavItem";

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
          <div className="z-0 fixed grid grid-cols-[345px_1fr_345px] w-[1440px] h-screen mx-[calc(50vw-720px)]">
            <div className="sticky top-0 flex flex-col justify-between items-center gap-2 w-[345px] h-full py-[50px]">
              <div className="flex justify-center items-center text-[32px] text-center tracking-[4.16px] w-[250px] h-[70px]">
                schcool
              </div>
              <div className="flex flex-col justify-start items-center gap-[10px] w-auto h-1/2">
                <NavItem
                  value="główna"
                  icon={"home"}
                  fillIcon={true}
                  page="/"
                  href="/"
                />
              </div>
              <ProfileItem user={user} />
            </div>
            <div></div>
            <div className="sticky top-0 flex flex-col justify-center items-center w-[345px] h-full pb-[300px]">
              <div className="flex justify-center items-center w-[250px] h-[70px] bg-[color:rgb(var(--shadow)/1)] rounded-xl">
                <span className="material-symbols-outlined">newspaper</span>
              </div>
            </div>
          </div>
          <div className="z-10 relative w-[750px] min-h-screen mx-auto">
            {children}
          </div>
        </Suspense>
      </body>
    </html>
  );
}
