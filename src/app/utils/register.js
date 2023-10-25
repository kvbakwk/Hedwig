"use server";

import {
  validateEmail,
  validateFullname,
  validatePassword,
  validatePasswords,
} from "./validator";
import conn from "./conn";

export default async function register(email, fullname, password, passwordValid) {
  const client = conn();

  const validateAccount = async (email) => {
    const res = await client.query('SELECT id FROM users WHERE email = $1;', [email])
    return res.rowCount === 0;
  }

  const isValid =
    validateEmail(email) &&
    validateFullname(fullname) &&
    validatePassword(password) &&
    validatePasswords(password, passwordValid) && 
    await validateAccount(email);

  return {
    registered: isValid,
    emailErr: !validateEmail(email),
    fullnameErr: !validateFullname(fullname),
    passwordErr: !validatePassword(password),
    passwordsErr: !validatePasswords(password, passwordValid),
    accountErr: validateEmail(email) && !await validateAccount(email)
  };
}
