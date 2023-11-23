"use server";

import { Pool } from "pg";

import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePasswords,
} from "../utils/validator";

export default async function register(
  email,
  fullname,
  password,
  passwordValid
) {
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
    await client.query(
      "INSERT INTO public.user VALUES (DEFAULT, $1, $2, $3, $4);",
      [email, name[0], name[1], password]
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
