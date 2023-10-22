"use server";

import { uuid } from "uuidv4";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import conn from "@app/utils/conn";

export default async function login(email, password, remember) {
  const client = conn();
  const res = await client.query(
    "SELECT id FROM public.users WHERE email = $1 AND password = $2;",
    [email, password]
  );

  if (res.rowCount > 0) {
    const newUuid = uuid();
    if (cookies().has("device_id"))
      await client.query(
        "DELETE FROM public.users_devices WHERE device_id = $1;",
        [cookies().get("device_id").value]
      );
    await client.query("INSERT INTO public.users_devices VALUES ($1, $2);", [
      res.rows[0].id,
      newUuid,
    ]);
    if (remember)
      cookies().set("device_id", newUuid, { secure: true, path: "/" });
    else
      cookies().set("device_id", newUuid, {
        secure: true,
        path: "/",
        expires: Date.now() + 28800000,
      });
    return true;
  }

  return false;
}

export async function loginCheck(inLogin) {
  const client = conn();
  if (cookies().has("device_id")) {
    const res = await client.query(
      "SELECT user_id FROM public.users_devices WHERE device_id = $1;",
      [cookies().get("device_id").value]
    );
    if (res.rowCount > 0) if (inLogin) redirect("/");
  } else if (!inLogin) redirect("/logowanie");
  return false;
}
