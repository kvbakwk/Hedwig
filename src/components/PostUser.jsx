import timeAgo from "@app/utils/time";

export default function PostUser({ post }) {
  return (
    <div>
      <p>
        <b>
          {post.firstname.toLowerCase()} {post.lastname.toLowerCase()}
        </b>{" "}
        {post.email.split("@")[0]} · {timeAgo(post.create_date.getTime())}
      </p>
      <p>{post.content}</p>
      <br />
    </div>
  );
}
