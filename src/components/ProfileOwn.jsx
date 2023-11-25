import Link from "next/link";
import Posts from "./posts/Posts";
import getPosts from "@app/api/posts/user/get";

export default async function ProfileOwn({ user, option }) {
  return (
    <div>
      twój profil <br />
      {user.firstname.toLowerCase()} {user.lastname.toLowerCase()} <br />
      {user.email}
      <div className="flex gap-2">
        <Link className="cursor-pointer" href={`/profil/${user.id}/posty`}>
          posty
        </Link>
      </div>
      {(option === "posty" || option === undefined) && (
        <Posts user={user} posts={await getPosts(user.id, true, false, true)} />
      )}
    </div>
  );
}
