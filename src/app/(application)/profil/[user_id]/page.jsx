import getUser from "@app/api/users/get";
import getUserById from "@app/api/users/id/get";

import Profile from "@components/profiles/Profile";
import ProfileOwn from "@components/profiles/ProfileOwn";

export default async function ProfilePage({ params: { slug } }) {
  const user = await getUser();

  if (slug == user.id) return <ProfileOwn user={user} option={"posty"} />;
  else return <Profile user={await getUserById(slug)} option={"posty"} />;
}
