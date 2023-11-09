import { Pool } from "pg";

import { loginCheck } from "./api/login";
import getUser from "./api/users/get";
import getAllPosts from "./api/posts/getAll";

import FormNewPost from "@components/forms/FormNewPost";
import Posts from "@components/Posts";

export const metadata = {
  title: "schcool | główna",
};

export default async function HomePage() {
  await loginCheck(false);

  const user = await getUser();
  const posts = await getAllPosts();

  return (
    <div>
      <FormNewPost user={user}/>
      <Posts posts={posts} />
    </div>
  );
}
