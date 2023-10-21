"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import login from "../utils/login";
import { validateEmail, validatePassword } from "@app/utils/validator";

export default function LoginPage() {
  const router = useRouter();
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, remember } = e.target.elements;

    const isValid =
      validateEmail(email.value) && validatePassword(password.value);

    if (isValid) {
      const isLogged = await login(email.value, password.value, remember.value);

      if (isLogged) router.push("/");
      else setAccountErr(true);
      setEmailErr(false);
      setPasswordErr(false);
    } else {
      setEmailErr(!validateEmail(email.value));
      setPasswordErr(!validatePassword(password.value));
      setAccountErr(false);
    }
  };

  return (
    <div>
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
        <input type="submit" value="zaloguj się" />
      </form>
    </div>
  );
}
