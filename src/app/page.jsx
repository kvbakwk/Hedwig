import { Pool } from "pg";

import { loginCheck } from "./utils/login";
import timeAgo from "./utils/time";

export default async function HomePage() {
  await loginCheck(false);

  const client = new Pool();
  const posts = await client.query(
    "SELECT posts.id, users.email, users.firstname, users.lastname, posts.content, posts.create_date FROM posts JOIN users ON posts.user_id = users.id;"
  );
  await client.end();

  return (
    <div>
      {posts.rows.map((post) => (
        <div key={post.id}>
          <p>
            <b>{post.firstname.toLowerCase()} {post.lastname.toLowerCase()}</b> {post.email.split('@')[0]} · {timeAgo(post.create_date.getTime())}
          </p>
          <p>{post.content}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
