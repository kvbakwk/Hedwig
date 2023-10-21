"use server";

export default async function login(email, password, remember) {
  return await fetch(
    `http://www:3000/api/login/${email}/${password}/${remember}`,
    {
      status: 200,
      headers: {},
      method: "post",
    }
  ).then((res) => res.json());
}
