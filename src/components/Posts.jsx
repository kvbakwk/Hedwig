import PostUser from "@components/PostUser";
import PostAnon from "@components/PostAnon";

export default function Posts({ user, posts }) {
  return (
    <div>
      {posts.map((post) => !post.anonymous ? <PostUser key={post.id} post={post} /> : <PostAnon key={post.id} user={user} post={post} />)}
    </div>
  );
}
