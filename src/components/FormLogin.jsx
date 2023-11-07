"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@components/TextField";
import FormError from "@components/FormError";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";

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
    <form
      className="flex flex-col justify-center items-center gap-[30px] w-[500px] py-[75px] glass"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center items-center gap-[10px] w-[300px]">
        <TextField
          type="text"
          name="email"
          placeholder="twój e-mail"
          error={emailErr}
          errorMessage="wprowadź poprawnego e-maila"
        />
        <TextField
          type="password"
          name="password"
          placeholder="twoje hasło"
          error={passwordErr}
          errorMessage="hasło musi mieć przynajmniej 8 znaków"
        />
      </div>
      <FormError show={accountErr}>
        podane e-mail lub hasło jest nieprawidłowe
      </FormError>
      <div className="flex justify-between w-[350px]">
        <Checkbox name="remember" label="zapamiętaj" />
        <Button value="zaloguj się"/>
      </div>
    </form>
  );
}
