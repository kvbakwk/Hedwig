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
    let email = e.target.children[0].value,
      password = e.target.children[1].value,
      remember = e.target.children[2].value;

    const isValid = validateEmail(email) && validatePassword(password);
    
    if (isValid) {
      const isLogged = await login(email, password, remember);

      if (isLogged)
        router.push("/");
      else
        setAccountErr(true);
    } else {
      setEmailErr(!validateEmail(email));
      setPasswordErr(!validatePassword(password));
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
