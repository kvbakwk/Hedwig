import { redirect } from "next/navigation";
import getPosts from "@app/api/posts/get";
import getUserPosts from "@app/api/posts/user/get";

import { Suspense } from "react";
import Link from "next/link";
import Posts from "../posts/Posts";

export default async function Profile({ user, option }) {
  return (
    <div>
      {(option === "posty" || option === undefined) && (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, true, false, false)}
        />
      )}
      {option === "odpowiedzi" && (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, false, true, false)}
        />
      )}
      {option === "polubione" && (
        <Posts
          user={user}
          posts={(await getPosts(user.id, true, true, true)).filter((post) =>
            post.likes.find((id) => id === user.id)
          )}
        />
      )}
    </div>
  );
}
