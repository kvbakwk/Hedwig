import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

export default function Post({ user, post }) {
  return (
    <div>
      <PostHeader user={user} post={post} />
      <p>{post.content}</p>
      <PostFooter post={post} />
      <br />
    </div>
  );
}
