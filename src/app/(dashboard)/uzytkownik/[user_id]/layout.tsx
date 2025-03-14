import { redirect } from "next/navigation";
import getUser from "@app/api/getUser";
import getUserById from "@app/api/getUserById";
import Container from "@components/styled/dashboard/user/Container";
import Header from "@components/styled/dashboard/user/Header";
import Main from "@components/styled/dashboard/user/Main";
import Profile from "@components/styled/dashboard/user/Profile";
import ProfileAvatar from "@components/styled/dashboard/user/ProfileAvatar";
import ProfileFullname from "@components/styled/dashboard/user/ProfileFullname";
import ProfileEmail from "@components/styled/dashboard/user/ProfileEmail";
import Nav from "@components/styled/dashboard/user/Nav";
import NavItem from "@components/styled/dashboard/user/NavItem";
import Back from "@components/Back";

export const metadata = {
  title: "schcool | profil",
};

export default async function ProfileLayout({
  params: { user_id },
  children,
}: {
  params: { user_id: number };
  children: JSX.Element;
}) {
  const user = await getUser();

  if (isNaN(user_id) || !(await getUserById(user_id))) redirect("/");

  const profileUser = await getUserById(user_id);

  return (
    <div className="relative w-[full] h-auto px-[15px]">
      <div className="z-50 fixed top-[10px] flex items-center gap-[25px] text-primary text-[22px] w-[720px] h-[70px] pl-[25px] bg-surface rounded-2xl shadow-lg">
        <Back />
        <span className="text-on-surface">
          {user.id == user_id
            ? "twój profil użytkownika"
            : "profil użytkownika"}
        </span>
      </div>
      <div className="z-0 relative flex flex-col gap-[24px] w-full py-[90px] md:px-[5px]">
        <div className="relative flex flex-col justify-start items-start gap-[5px] pl-[40px] pt-[100px] pb-[40px] mt-[60px] bg-surface rounded-2xl shadow-md">
          <ProfileAvatar user_id={user_id} />
          <span className="text-[20px]">
            {profileUser.firstname} {profileUser.lastname}
          </span>
          <span className="text-gray-500 text-[16px]">{profileUser.email}</span>
        </div>
        <div className="flex justify-center items-center gap-[30px]">
          <NavItem href={`/uzytkownik/${user_id}/posty`}>posty</NavItem>
          <NavItem href={`/uzytkownik/${user_id}/odpowiedzi`}>
            odpowiedzi
          </NavItem>
          <NavItem href={`/uzytkownik/${user_id}/polubione`}>polubione</NavItem>
          {user.id == user_id && (
            <>
              <NavItem href={`/uzytkownik/${user_id}/negatywne`}>
                negatywne
              </NavItem>
              <NavItem href={`/uzytkownik/${user_id}/zapisane`}>
                zapisane
              </NavItem>
            </>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
