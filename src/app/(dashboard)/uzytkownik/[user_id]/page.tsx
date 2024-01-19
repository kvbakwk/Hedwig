import { redirect } from "next/navigation";

export default async function ProfilePage({
  params: { user_id },
}: {
  params: { user_id: number };
}) {
  redirect(`/uzytkownik/${user_id}/posty`);
}
