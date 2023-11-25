import getUser from "@app/api/users/get";
import getUserById from "@app/api/users/id/get";
import getPosts from "@app/api/posts/get";
import getUserPosts from "@app/api/posts/user/get";

import ProfilePosts from "@components/profiles/ProfilePosts";
import ProfilePostsOwn from "@components/profiles/ProfilePostsOwn";

export default async function ProfilePage({ params: { user_id, option } }) {
  const user = await getUser();

  const posts =
    option === "posty" || option === undefined
      ? await getUserPosts(user_id, true, false, user_id == user.id)
      : option === "odpowiedzi"
      ? await getUserPosts(user_id, false, true, user_id == user.id)
      : option === "polubione"
      ? (await getPosts(user_id, true, true, true)).filter((post) =>
          post.likes.find((id) => id === user.id)
        )
      : user_id == user.id && option === "negatywne"
      ? (await getPosts(user_id, true, true, true)).filter((post) =>
          post.dislikes.find((id) => id === user.id)
        )
      : user_id == user.id && option === "zapisane"
      ? (await getPosts(user_id, true, true, true)).filter((post) =>
          post.saves.find((id) => id === user.id)
        )
      : [];

  if (user_id == user.id) return <ProfilePostsOwn user={user} posts={posts} />;
  else return <ProfilePosts user={await getUserById(user_id)} posts={posts} />;
}
