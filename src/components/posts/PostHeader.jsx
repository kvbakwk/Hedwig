import timeAgo from "@app/utils/time";

export default function PostHeader({ user, post }) {
  if (!post.anonymous)
    return (
      <div>
        <b>
          {post.firstname.toLowerCase()} {post.lastname.toLowerCase()}
        </b>{" "}
        {post.email.split("@")[0]} · {timeAgo(post.date.getTime())}
      </div>
    );
  else
    return (
      <div>
        <b>anonimowy {user.id === post.user_id ? "(ty)" : ""}</b> ·{" "}
        {timeAgo(post.date.getTime())}
      </div>
    );
}
