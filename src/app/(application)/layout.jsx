import { loginCheck } from "@app/api/login";
import getUser from "@app/api/users/get";

import Link from "next/link";
import ProfileItem from "@components/ProfileItem";

export default async function ApplicationLayout({ children }) {
  await loginCheck(false);

  const user = await getUser();

  return (
    <div className="flex gap-16">
      <div className="flex flex-col gap-2">
        <Link href="/">główna</Link>
        <ProfileItem user={user} />
      </div>
      {children}
    </div>
  );
}
