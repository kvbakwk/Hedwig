import getUser from "@app/api/users/get";
import getPosts from "@app/api/posts/get";

import FormNewPost from "@components/forms/FormNewPost";
import Posts from "@components/posts/Posts";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();
  const posts = await getPosts();

  return (
    <div>
      <FormNewPost user={user} />
      <Posts user={user} posts={posts} />
    </div>
  );
}
