import getUser from "@app/api/users/get";
import Glowna from "@components/Glowna";
import { Suspense } from "react";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();

  return (
    <div className="relative w-[full] h-auto md:px-[15px]">
      <div className="fixed hidden md:flex items-center text-[22px] w-[670px] lg:w-[720px] h-[70px] pl-[50px] border-[1px] border-t-0 border-gray-300 border-solid transition-shadow rounded-b-2xl backdrop-blur-xl glass-shadow">
        główna
      </div>
      <div className="flex flex-col gap-[20px] w-full pt-[60px] pb-[100px] md:pt-[90px] md:pb-[50px] px-[5px]">
        <Glowna user={user} />
      </div>
    </div>
  );
}
