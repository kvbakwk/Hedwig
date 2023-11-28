import { redirect } from "next/navigation";

export default async function ProfilePage({ params: { user_id } }) {
  redirect(`/uzytkownik/${user_id}/posty`);
}
