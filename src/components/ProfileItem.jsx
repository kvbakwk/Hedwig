import Link from "next/link";
import Avatar from "@components/Avatar";

export default function ProfileItem({ user }) {
  return (
    <Link
      className="text-xs font-medium flex lg:hidden flex-col justify-center items-center gap-1"
      href={`/uzytkownik/${user.id}`}>
      <Avatar
        className="w-[32px] md:w-[50px] h-[32px] md:h-[50px] rounded-full"
        user_id={user.id}
        anonymous={false}
      />
      <span className="md:hidden">{user.firstname.toLowerCase()}</span>
    </Link>
  );
}
