import Link from "next/link";
import Avatar from "@components/Avatar";

export default function ProfileItem({ user }) {
  return (
    <Link
      className="lg:hidden flex flex-col justify-center items-center gap-1 text-xs font-medium"
      href={`/uzytkownik/${user.id}`}>
      <Avatar
        className="md:w-[50px] w-[32px] md:h-[50px] h-[32px] rounded-full"
        user_id={user.id}
        anonymous={false}
      />
      <span className="md:hidden">{user.firstname.toLowerCase()}</span>
    </Link>
  );
}
