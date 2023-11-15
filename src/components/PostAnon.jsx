import timeAgo from "@app/utils/time";

export default function PostAnon({ user, post }) {
  return (
    <div>
      <p>
        <b>anonimowy {user.id === post.user_id ? "(ty)" : ""}</b> ·{" "}
        {timeAgo(post.create_date.getTime())}
      </p>
      <p>{post.content}</p>
      <br />
    </div>
  );
}
