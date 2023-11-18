import getUser from "@app/api/users/get";
import getPosts from "@app/api/posts/user/get";

import Posts from "@components/posts/Posts";

export const metadata = {
  title: "schcool | twoje posty",
};

export default async function PostsPage() {
  const user = await getUser();
  const posts = await getPosts(user.id);

  return (
    <div>
      <Posts user={user} posts={posts} />
    </div>
  );
}
