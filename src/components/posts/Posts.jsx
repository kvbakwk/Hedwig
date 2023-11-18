import Post from "./Post";

export default function Posts({ user, posts }) {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} user={user} post={post} />
      ))}
    </div>
  );
}
