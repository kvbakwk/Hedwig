import getUser from "@app/api/users/get";
import getUserById from "@app/api/users/id/get";
import getUserPosts from "@app/api/posts/user/get";

import ProfilePosts from "@components/profiles/ProfilePosts";
import ProfilePostsOwn from "@components/profiles/ProfilePostsOwn";

export default async function ProfilePage({ params: { user_id } }) {
  const user = await getUser();

  const posts = await getUserPosts(user_id, true, false, user_id == user.id);

  if (user_id == user.id) return <ProfilePostsOwn user={user} posts={posts} />;
  else return <ProfilePosts user={await getUserById(user_id)} posts={posts} />;
}
