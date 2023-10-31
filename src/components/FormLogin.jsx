"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import login from "@app/api/login";

export default function FormLogin() {
  const router = useRouter();
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, remember } = e.target.elements;

    const res = await login(email.value, password.value, remember.checked);

    setEmailErr(res.emailErr);
    setPasswordErr(res.passwordErr);
    setAccountErr(res.accountErr);
    if (res.login) router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input
        className={emailErr ? "text-red-400" : ""}
        type="text"
        name="email"
        placeholder="e-mail"
      />
      {emailErr && (
        <span className="text-red-400">wprowadź poprawnego e-maila</span>
      )}
      <input
        className={passwordErr ? "text-red-400" : ""}
        type="password"
        name="password"
        placeholder="hasło"
      />
      {passwordErr && (
        <span className="text-red-400">
          hasło musi mieć przynajmniej 8 znaków
        </span>
      )}
      <input type="checkbox" name="remember" id="remember" />
      {accountErr && (
        <span className="text-red-400">
          podane e-mail lub hasło jest nieprawidłowe
        </span>
      )}
      {!login && (
        <span className="text-red-400">coś poszło nie tak, spróbuj ponownie później</span>
      )}
      <input type="submit" value="zaloguj się" />
    </form>
  );
}
