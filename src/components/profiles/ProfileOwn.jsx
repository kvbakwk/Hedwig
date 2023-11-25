import getPosts from "@app/api/posts/get";
import getUserPosts from "@app/api/posts/user/get";

import Posts from "../posts/Posts";

export default async function ProfileOwn({ user, option }) {
  return (
    <div>
      {(option === "posty" || option === undefined) && (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, true, false, true)}
        />
      )}
      {option === "odpowiedzi" && (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, false, true, true)}
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
      {option === "negatywne" && (
        <Posts
          user={user}
          posts={(await getPosts(user.id, true, true, true)).filter((post) =>
            post.dislikes.find((id) => id === user.id)
          )}
        />
      )}
      {option === "zapisane" && (
        <Posts
          user={user}
          posts={(await getPosts(user.id, true, true, true)).filter((post) =>
            post.saves.find((id) => id === user.id)
          )}
        />
      )}
    </div>
  );
}
