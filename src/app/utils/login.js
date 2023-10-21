"use server";

export default async function login(email, password, remember) {
  if (await fetch(`http://www:3000/api/users/exist/email-password/${email}/${password}`, { method: "post" }).then((res) => res.json()))
    return true;
  else return false;
}
