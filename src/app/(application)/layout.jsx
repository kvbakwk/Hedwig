import { loginCheck } from "@app/api/login";
import getUser from "@app/api/users/get";

import ProfileItem from "@components/ProfileItem";

export default async function ApplicationLayout({ children }) {
  await loginCheck(false);

  const user = await getUser();

  return (
    <div className="flex gap-16">
      <div className="">
        <ProfileItem user={user} />
      </div>
      {children}
    </div>
  );
}
