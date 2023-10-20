"use client";

import { useState } from "react";

import login from "../utils/login";
import { validateEmail, validatePassword } from "@app/utils/validator";

export default function LoginPage() {
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);

  const handleSubmit = async (formData) => {
    setEmailErr(!validateEmail(formData.get("email")));
    setPasswordErr(!validatePassword(formData.get("password")));
    setAccountErr(!(await login(formData)));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <form action={handleSubmit} className="contents">
        <input
          type="text"
          name="email"
          id="email"
          placeholder="e-mail"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="hasło"
          required
        />
        <label htmlFor="remember">
          <input type="checkbox" name="remember" id="remember" /> zapamiętaj to
          urządzenie
        </label>
        <input type="submit" value="zaloguj się" />
      </form>
    </div>
  );
}
