import { redirect } from "next/navigation";
import getPosts from "@app/api/posts/get";
import getUserPosts from "@app/api/posts/user/get";

import Link from "next/link";
import Posts from "./posts/Posts";

export default async function Profile({ user, option }) {
  const pathsSites = [
    {
      path: ["posty", undefined],
      site: (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, true, false, false)}
        />
      ),
    },
    {
      path: ["odpowiedzi"],
      site: (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, false, true, false)}
        />
      ),
    },
    {
      path: ["polubione"],
      site: (
        <Posts
          user={user}
          posts={(await getPosts(user.id)).filter((post) =>
            post.likes.find((id) => id === user.id)
          )}
        />
      ),
    },
  ];

  if (!pathsSites.find((pathSite) => pathSite.path.includes(option)))
    redirect("/");

  return (
    <div>
      profil <br />
      {user.firstname.toLowerCase()} {user.lastname.toLowerCase()} <br />
      {user.email}
      <div className="flex gap-2">
        <Link className="cursor-pointer" href={`/profil/${user.id}/posty`}>
          posty
        </Link>
        <Link className="cursor-pointer" href={`/profil/${user.id}/odpowiedzi`}>
          odpowiedzi
        </Link>
        <Link className="cursor-pointer" href={`/profil/${user.id}/polubione`}>
          polubione
        </Link>
      </div>
      {pathsSites.find((pathSite) => pathSite.path.includes(option)).site}
    </div>
  );
}
