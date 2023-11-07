"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import register from "@app/api/register";

export default function FormRegister() {
  const router = useRouter();
  const [emailErr, setEmailErr] = useState(false);
  const [fullnameErr, setFullnameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordsErr, setPasswordsErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, fullname, password, passwordValid } = e.target.elements;

    const res = await register(
      email.value,
      fullname.value,
      password.value,
      passwordValid.value
    );

    setEmailErr(res.emailErr);
    setFullnameErr(res.fullnameErr);
    setPasswordErr(res.passwordErr);
    setPasswordsErr(res.passwordsErr);
    setAccountErr(res.accountErr);
    if (res.register) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input
        className={emailErr || accountErr ? "text-red-400" : ""}
        type="text"
        name="email"
        placeholder="e-mail"
      />
      {emailErr && (
        <span className="text-red-400">wprowadź poprawnego e-maila</span>
      )}
      {accountErr && (
        <span className="text-red-400">
          konto z podanym e-mailem już istnieje
        </span>
      )}
      <input
        className={fullnameErr ? "text-red-400" : ""}
        type="text"
        name="fullname"
        placeholder="imię i nazwisko"
      />
      {fullnameErr && (
        <span className="text-red-400">wprowadź swoje poprawne dane</span>
      )}
      <input
        className={passwordErr || passwordsErr ? "text-red-400" : ""}
        type="password"
        name="password"
        placeholder="hasło"
      />
      <input
        className={passwordErr || passwordsErr ? "text-red-400" : ""}
        type="password"
        name="passwordValid"
        placeholder="powtórz hasło"
      />
      {passwordErr && (
        <>
          <span className="text-red-400">hasło musi:</span>
          <span className="text-red-400">- mieć przynajmniej 8 znaków</span>
          <span className="text-red-400">
            - zawierać kombinację liter i liczb
          </span>
        </>
      )}
      {passwordsErr && (
        <span className="text-red-400">podane hasła nie są identyczne</span>
      )}
      <input type="submit" value="zarejestruj się" />
    </form>
  );
}
