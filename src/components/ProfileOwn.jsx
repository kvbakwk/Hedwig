import Link from "next/link";
import Posts from "./posts/Posts";
import getPosts from "@app/api/posts/get";
import getUserPosts from "@app/api/posts/user/get";

export default async function ProfileOwn({ user, option }) {
  const pathsSites = [
    {
      path: ["posty", undefined],
      site: (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, true, false, true)}
        />
      ),
    },
    {
      path: ["odpowiedzi"],
      site: (
        <Posts
          user={user}
          posts={await getUserPosts(user.id, false, true, true)}
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
    {
      path: ["negatywne"],
      site: (
        <Posts
          user={user}
          posts={(await getPosts(user.id)).filter((post) =>
            post.dislikes.find((id) => id === user.id)
          )}
        />
      ),
    },
  ];

  return (
    <div>
      twój profil <br />
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
        <Link className="cursor-pointer" href={`/profil/${user.id}/negatywne`}>
          negatywne
        </Link>
      </div>
      {pathsSites.find((pathSite) => pathSite.path.includes(option)).site}
    </div>
  );
}
