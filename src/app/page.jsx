import { Pool } from "pg";

import { loginCheck } from "./api/login";
import getUser from "./api/users/get";
import getAllPosts from "./api/posts/getAll";
import timeAgo from "./utils/time";

import FormNewPost from "@components/FormNewPost";


export default async function HomePage() {
  await loginCheck(false);

  const user = await getUser();
  const posts = await getAllPosts();

  return (
    <div>
      <FormNewPost user={user}/>
      {posts.map((post) => (
        <div key={post.id}>
          <p>
            <b>
              {post.firstname.toLowerCase()} {post.lastname.toLowerCase()}
            </b>{" "}
            {post.email.split("@")[0]} · {timeAgo(post.create_date.getTime())}
          </p>
          <p>{post.content}</p>
          <br />
        </div>
      ))}
    </div>
  );
}
