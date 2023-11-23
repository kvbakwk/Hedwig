import getUser from "@app/api/users/get";
import getPosts from "@app/api/posts/get";

import FormNewPost from "@components/forms/FormNewPost";
import FormNewReply from "@components/forms/FormNewReply";
import Posts from "@components/posts/Posts";
import Popup from "@components/Popup";

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
      <Popup param="reply">
        <FormNewReply user={user} />
      </Popup>
    </div>
  );
}
