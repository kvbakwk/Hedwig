"use server";

export default async function login(formData) {
  if (await fetch(`http://www:3000/api/users/exist/email-password/${formData.get("email")}/${formData.get("password")}`, { method: "post" }).then((res) => res.json()))
    return true;
  else return false;
}
