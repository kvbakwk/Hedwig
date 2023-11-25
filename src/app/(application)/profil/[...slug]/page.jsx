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

  const user_id = isNaN(slug[0])
    ? 0
    : !(await getUserById(slug[0]))
    ? 0
    : Number(slug[0]);

  if (user_id === 0) redirect("/");

  if (user_id === user.id) return <ProfileOwn user={user} option={slug[1]} />;
  else return <Profile user={await getUserById(user_id)} option={slug[1]} />;
}
