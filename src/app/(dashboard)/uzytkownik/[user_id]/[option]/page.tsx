import getUser from "@app/api/getUser";

import UserPosts from "@components/dashboard/uzytkownik/UserPosts";
import UserPostsOwn from "@components/dashboard/uzytkownik/UserPostsOwn";

export default async function ProfilePage({
  params: { user_id },
}: {
  params: { user_id: number };
}) {
  const user = await getUser();

  if (user_id == user.id) return <UserPostsOwn user={user} />;
  else return <UserPosts user={user} />;
}
