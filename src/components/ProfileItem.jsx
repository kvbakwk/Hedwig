"use client";

import { useRouter } from "next/navigation";
import { logout } from "@app/api/login";

import Button from "@components/Button";

export default function ProfileItem({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div>
      {user.firstname.toLowerCase()}
      <Button value="wyloguj się" onClick={handleLogout} />
    </div>
  );
}
