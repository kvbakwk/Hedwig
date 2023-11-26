import Link from "next/link";

import timeAgo from "@app/utils/time";

export default function PostHeader({ user, post }) {
  if (!post.anonymous)
    return (
      <div className="flex gap-[6px] items-center text-[14px] mt-[10px] pl-[10px] ml-[40px] mr-[100px] border-b-[1px] border-[rgb(var(--shadow)/1)]">
        <Link className="cursor-pointer" href={`/profil/${post.user_id}`}>
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
      <div className="flex gap-[6px] items-center text-[14px] mt-[10px] pl-[10px] ml-[40px] mr-[100px] border-b-[1px] border-[rgb(var(--shadow)/1)]">
        <b>anonimowy {user.id === post.user_id ? "(ty)" : ""}</b>
        <span>·</span>
        <span>{timeAgo(post.date.getTime())}</span>
      </div>
    );
}
