import { redirect } from "next/navigation";
import getUser from "@app/api/users/get";
import getUserById from "@app/api/users/id/get";

import Link from "next/link";
import Image from "next/image";
import Avatar from "../../user.jpg";

export const metadata = {
  title: "schcool | profil",
};

export default async function ProfileLayout({ params: { user_id }, children }) {
  const user = await getUser();

  if (isNaN(user_id) || !(await getUserById(user_id))) redirect("/");

  const profileUser = await getUserById(user_id);

  return (
    <div className="relative w-[full] h-auto px-[15px]">
      <div className="z-10 fixed flex items-center text-[22px] w-[720px] h-[70px] pl-[50px] border-[1px] border-t-0 border-gray-300 border-solid transition-shadow rounded-b-2xl backdrop-blur-xl glass-shadow">
        {user.id == user_id ? "twój profil użytkownika" : "profil użytkownika"}{" "}
        <br />
      </div>
      <div className="z-0 relative flex flex-col gap-[20px] w-full py-[90px] px-[5px]">
        <div className="relative flex flex-col gap-[5px] pl-[40px] pt-[100px] pb-[40px] mt-[60px] glass">
          <Image
            className="absolute top-[-50px] left-[60px] bg-[rgb(var(--background)/1)] border-[1px] border-gray-300 border-solid rounded-full"
            src={Avatar}
            width={100}
            height={100}></Image>
          <span className="text-[20px]">
            {profileUser.firstname.toLowerCase()}{" "}
            {profileUser.lastname.toLowerCase()}
          </span>
          <span className="text-[16px] text-gray-500">{profileUser.email}</span>
        </div>
        <div className="flex justify-center items-center gap-[30px]">
          <Link
            className="flex justify-center items-center px-[20px] h-[40px] glass"
            href={`/uzytkownik/${user_id}/posty`}>
            posty
          </Link>
          <Link
            className="flex justify-center items-center px-[20px] h-[40px] glass"
            href={`/uzytkownik/${user_id}/odpowiedzi`}>
            odpowiedzi
          </Link>
          <Link
            className="flex justify-center items-center px-[20px] h-[40px] glass"
            href={`/uzytkownik/${user_id}/polubione`}>
            polubione
          </Link>
          {user.id == user_id && (
            <>
              <Link
                className="flex justify-center items-center px-[20px] h-[40px] glass"
                href={`/uzytkownik/${user_id}/negatywne`}>
                negatywne
              </Link>
              <Link
                className="flex justify-center items-center px-[20px] h-[40px] glass"
                href={`/uzytkownik/${user_id}/zapisane`}>
                zapisane
              </Link>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
