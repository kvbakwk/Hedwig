import getUser from "@app/api/users/get";
import getUserById from "@app/api/users/id/get";
import Profile from "@components/Profile";
import ProfileOwn from "@components/ProfileOwn";

import { redirect } from "next/navigation";

export const metadata = {
  title: "schcool | profil",
};

export default async function ProfilePage({ params: { slug } }) {
  const user = await getUser();

  const user_id = isNaN(slug)
    ? 0
    : !(await getUserById(slug))
    ? 0
    : Number(slug);

  if (user_id === 0) redirect("/");

  if (user_id === user.id) return <ProfileOwn user={user} />;
  else return <Profile user={await getUserById(user_id)} />;
}
