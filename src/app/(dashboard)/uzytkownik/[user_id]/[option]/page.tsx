import getUser from "@app/api/getUser";

import UserPosts from "@components/profiles/UserPosts";
import UserPostsOwn from "@components/profiles/UserPostsOwn";

export default async function ProfilePage({ params: { user_id } }) {
  const user = await getUser();

  if (user_id == user.id) return <UserPostsOwn user={user} />;
  else return <UserPosts user={user} />;
}
