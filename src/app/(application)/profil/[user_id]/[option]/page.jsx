import getUser from "@app/api/users/get";
import getUserById from "@app/api/users/id/get";

import Profile from "@components/profiles/Profile";
import ProfileOwn from "@components/profiles/ProfileOwn";

export default async function ProfilePage({ params: { user_id, option } }) {
  const user = await getUser();

  if (user_id == user.id) return <ProfileOwn user={user} option={option} />;
  else return <Profile user={await getUserById(user_id)} option={option} />;
}
