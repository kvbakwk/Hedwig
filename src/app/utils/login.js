"use server";

import { uuid } from "uuidv4";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { validateEmail, validatePassword } from "@app/utils/validator";
import conn from "@app/utils/conn";

export default async function login(email, password, remember) {
  const client = conn();

  const validateAccount = async (email, password) => {
    const res = await client.query(
      "SELECT id FROM public.users WHERE email = $1 AND password = $2;",
      [email, password]
    );
    return res.rowCount === 1;
  };

  const isValid =
    validateEmail(email) &&
    validatePassword(password) &&
    (await validateAccount(email, password));

  if (isValid) {
    const newUuid = uuid();
    const res = await client.query(
      "SELECT id FROM public.users WHERE email = $1 AND password = $2;",
      [email, password]
    );

    if (cookies().has("device_id")) {
      await client.query(
        "DELETE FROM public.users_devices WHERE device_id = $1;",
        [cookies().get("device_id").value]
      );
    }

    await client.query("INSERT INTO public.users_devices VALUES ($1, $2);", [
      res.rows[0].id,
      newUuid,
    ]);

    if (remember) {
      cookies().set("device_id", newUuid, { secure: true, path: "/" });
    } else {
      cookies().set("device_id", newUuid, {
        secure: true,
        path: "/",
        expires: Date.now() + 28800000,
      });
    }
  }

  return {
    login: isValid,
    emailErr: !validateEmail(email),
    passwordErr: !validatePassword(password),
    accountErr:
      (validateEmail(email) && validatePassword(password)) &&
      !(await validateAccount(email, password)),
  };
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
