"use server";

import { Pool } from "pg";

import fs from "fs";

import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePasswords,
} from "@app/utils/validator";

export default async function register(formData) {
  const email = formData.get("email"),
    fullname = formData.get("fullname"),
    password = formData.get("password"),
    passwordValid = formData.get("passwordValid"),
    avatar = formData.get("avatar");

  const validateAccount = async (email) => {
    const client = new Pool();
    const res = await client.query(
      "SELECT id FROM public.user WHERE email = $1;",
      [email]
    );
    await client.end();
    return res.rowCount === 0;
  };

  const isValid =
    validateEmail(email) &&
    validateFullname(fullname) &&
    validatePassword(password) &&
    validatePasswords(password, passwordValid) &&
    (await validateAccount(email));

  if (isValid) {
    const client = new Pool();
    const name = fullname.split(" ");
    const res = await client.query(
      "INSERT INTO public.user VALUES (DEFAULT, $1, $2, $3, $4, NULL) RETURNING id;",
      [email, name[0], name[1], password]
    );
    if (avatar.size)
      fs.writeFile(
        `./public/avatars/${res.rows[0].id}.png`,
        Buffer.from(await avatar.arrayBuffer()),
        (err) => {
          if (err) console.error(err);
        }
      );
    await client.end();
  }

  return {
    register: isValid,
    emailErr: !validateEmail(email),
    fullnameErr: !validateFullname(fullname),
    passwordErr: !validatePassword(password),
    passwordsErr: !validatePasswords(password, passwordValid),
    accountErr:
      validateEmail(email) && !isValid && !(await validateAccount(email)),
  };
}
