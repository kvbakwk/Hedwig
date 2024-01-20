import getPost from "@app/api/getPostById";
import getUser from "@app/api/getUser";
import PostDetailed from "@components/dashboard/post/PostDetailed";

export default async function PostPage({
  params: { post_id },
}: {
  params: { post_id: number };
}) {
  const user = await getUser();

  const post = await getPost(user.id, post_id);
  return <PostDetailed user={user} post={post} />;
}
