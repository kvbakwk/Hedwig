import { redirect } from "next/navigation";
import getUser from "@app/api/users/get";
import getUserById from "@app/api/users/id/get";

import Link from "next/link";

export const metadata = {
  title: "schcool | profil",
};

export default async function ProfileLayout({ params: { user_id }, children }) {
  const user = await getUser();

  if (isNaN(user_id) || !(await getUserById(user_id))) redirect("/");

  const profileUser = await getUserById(user_id);

  return (
    <div>
      {user.id == user_id ? "twój profil" : "profil"} <br />
      {profileUser.firstname.toLowerCase()} {profileUser.lastname.toLowerCase()}{" "}
      <br />
      {profileUser.email}
      <div className="flex gap-2">
        <Link className="cursor-pointer" href={`/profil/${user_id}/posty`}>
          posty
        </Link>
        <Link className="cursor-pointer" href={`/profil/${user_id}/odpowiedzi`}>
          odpowiedzi
        </Link>
        <Link className="cursor-pointer" href={`/profil/${user_id}/polubione`}>
          polubione
        </Link>
        {user.id == user_id && (
          <>
            <Link
              className="cursor-pointer"
              href={`/profil/${user_id}/negatywne`}>
              negatywne
            </Link>
            <Link
              className="cursor-pointer"
              href={`/profil/${user_id}/zapisane`}>
              zapisane
            </Link>
          </>
        )}
      </div>
      {children}
    </div>
  );
}
