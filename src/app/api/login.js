"use server";

import { Pool } from "pg";

import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";

import { validateEmail, validatePassword } from "@app/utils/validator";

export default async function login(email, password, remember) {
  const validateAccount = async (email, password) => {
    const client = new Pool();
    const res = await client.query(
      "SELECT id FROM public.user WHERE email = $1 AND password = $2;",
      [email, password]
    );
    await client.end();
    return res.rowCount === 1;
  };

  const isValid =
    validateEmail(email) &&
    validatePassword(password) &&
    (await validateAccount(email, password));

  if (isValid) {
    const client = new Pool();
    if (!cookies().has("device_id"))
      cookies().set("device_id", uuid(), { secure: true, path: "/" });

    const res = await client.query(
      "SELECT id FROM public.user WHERE email = $1 AND password = $2;",
      [email, password]
    );

    const expireDate = new Date();
    remember
      ? expireDate.setMonth(expireDate.getMonth() + 3)
      : expireDate.setHours(expireDate.getHours() + 6);

    await client.query("INSERT INTO public.user_device VALUES ($1, $2, $3);", [
      res.rows[0].id,
      cookies().get("device_id").value,
      expireDate,
    ]);
    await client.end();
  }

  return {
    login: isValid,
    emailErr: !validateEmail(email),
    passwordErr: !validatePassword(password),
    accountErr:
      validateEmail(email) &&
      validatePassword(password) &&
      !(await validateAccount(email, password)),
  };
}

export async function loginCheck() {
  const client = new Pool();
  if (cookies().has("device_id")) {
    const res = await client.query(
      "SELECT user_id, expire_date FROM public.user_device WHERE device_id = $1;",
      [cookies().get("device_id").value]
    );
    if (res.rowCount > 0) {
      if (new Date(res.rows[0].expire_date) < new Date()) {
        await client.query(
          "DELETE FROM public.user_device WHERE device_id = $1;",
          [cookies().get("device_id").value]
        );
        await client.end();
        return false;
      } else await client.end();
      return true;
    }
    return false;
  }
  return false;
}

export async function logout() {
  const client = new Pool();
  if (cookies().has("device_id")) {
    await client.query("DELETE FROM user_device WHERE device_id = $1;", [
      cookies().get("device_id").value,
    ]);
  }
}
