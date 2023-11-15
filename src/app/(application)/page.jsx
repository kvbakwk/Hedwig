import { loginCheck } from "@app/api/login";
import getUser from "@app/api/users/get";
import getAllPosts from "@app/api/posts/getAll";

import FormNewPost from "@components/forms/FormNewPost";
import Posts from "@components/Posts";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  const user = await getUser();
  const posts = await getAllPosts();

  return (
    <div>
      <FormNewPost user={user}/>
      <Posts user={user} posts={posts} />
    </div>
  );
}
