"use client";

import { useState } from "react";

import login from "../utils/login";
import { validateEmail, validatePassword } from "@app/utils/validator";

export default function LoginPage() {
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElements = e.target.children;

    let email = false;
    let password = false;
    let account = false;

    formElements[0].value !== ""
      ? (email = !validateEmail(formElements[0].value))
      : (email = true);
    formElements[1].value !== ""
      ? (password = !validatePassword(formElements[1].value))
      : (password = true);

    if (!email && !password) {
      if (await login(formElements[0].value, formElements[1].value, formElements[3].value)) {
        account = false;
        // do something
      } else account = true;
    }

    setEmailErr(email);
    setPasswordErr(password);
    setAccountErr(account);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} method="post">
        <input
          className={emailErr? "text-red-400" : ""}
          type="text"
          name="email"
          placeholder="e-mail"
        />
        <input
          className={passwordErr ? "text-red-400" : ""}
          type="password"
          name="password"
          placeholder="hasło"
        />
        <input type="checkbox" name="remember" id="remember" />
        {emailErr && (
          <span className="text-red-400">wprowadź poprawnego e-maila</span>
        )}
        {passwordErr && (
          <span className="text-red-400">
            hasło musi mieć przynajmniej 8 znaków
          </span>
        )}
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
