"use client";

import { useRouter } from "next/navigation";
import { logout } from "@app/api/login";

import Link from "next/link";
import Button from "@components/Button";

export default function ProfileItem({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <div>
      <Link className="cursor-pointer" href={`/profil/${user.id}`}>
        {user.firstname.toLowerCase()}
      </Link>
      <br />
      <Button value="wyloguj się" onClick={handleLogout} />
      <br />
      <br />
    </div>
  );
}
