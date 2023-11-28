"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@components/TextField";
import FormError from "@components/FormError";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";

export default function FormLogin({ login }) {
  const router = useRouter();
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);

  useEffect(() => {
    router.prefetch("/rejestracja");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, remember } = e.target.elements;

    const res = await login(email.value, password.value, remember.checked);

    setEmailErr(res.emailErr);
    setPasswordErr(res.passwordErr);
    setAccountErr(res.accountErr);
    if (res.login) router.refresh();
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[25px] w-full md:w-[500px] h-full md:h-auto pb-40 md:py-16 md:glass"
      method="post"
      onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center gap-[10px] w-11/12 sm:w-1/2 md:w-[300px]">
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
      <div className="flex justify-around md:justify-between items-center w-11/12 sm:w-1/2 md:w-[300px]">
        <Checkbox name="remember" label="zapamiętaj" />
        <Button value="zaloguj się" />
      </div>
    </form>
  );
}
