import Link from "next/link";

import timeAgo from "@app/utils/time";

export default function PostHeader({ user, post }) {
  if (!post.anonymous)
    return (
      <div className="flex gap-[6px] items-center text-[14px] sm:mt-[10px] md:pl-[10px] md:mr-[100px] md:border-b-[1px] md:border-[rgb(var(--shadow)/1)]">
        <Link className="cursor-pointer" href={`/uzytkownik/${post.user_id}`}>
          <b>
            {post.firstname.toLowerCase()} {post.lastname.toLowerCase()}
          </b>
        </Link>
        <span>{post.email.split("@")[0]}</span>
        <span>·</span>
        <span>{timeAgo(post.date.getTime())}</span>
      </div>
    );
  else
    return (
      <div className="flex gap-[6px] items-center text-[14px] sm:mt-[10px] md:pl-[10px] md:mr-[100px] md:border-b-[1px] md:border-[rgb(var(--shadow)/1)]">
        <b>anonimowy</b>
        {user.id === post.user_id ? "(ty)" : ""}
        <span>·</span>
        <span>{timeAgo(post.date.getTime())}</span>
      </div>
    );
}
