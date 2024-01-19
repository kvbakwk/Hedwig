"use server";

import { Pool, QueryResult } from "pg";

import fs from "fs";

import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePasswords,
} from "@app/utils/validator";

interface registerAPIResponse {
  register: boolean;
  emailErr: boolean;
  fullnameErr: boolean;
  passwordErr: boolean;
  passwordsErr: boolean;
  accountErr: boolean;
}

export default async function registerAPI(
  formData
): Promise<registerAPIResponse> {
  const email: string = formData.get("email"),
    fullname: string = formData.get("fullname"),
    password: string = formData.get("password"),
    passwordValid: string = formData.get("passwordValid"),
    avatar: File = formData.get("avatar");

  const validateAccount = async (email: string): Promise<boolean> => {
    const client: Pool = new Pool();
    const res: QueryResult = await client.query(
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
    const client: Pool = new Pool();
    const name = fullname.split(" ");
    const res: QueryResult = await client.query(
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
