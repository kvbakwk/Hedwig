"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import register from "@app/api/register";
import Button from "@components/Button";
import TextField from "@components/TextField";
import FormError from "@components/FormError";

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
    if (res.register) router.refresh();
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
          placeholder="e-mail"
          error={emailErr}
          errorMessage="wprowadź poprawnego e-maila"
        />
        <TextField
          type="text"
          name="fullname"
          placeholder="imię i nazwisko"
          error={fullnameErr}
          errorMessage="wprowadź swoje poprawne dane"
        />
        <TextField
          type="password"
          name="password"
          placeholder="hasło"
          error={passwordErr}
          errorMessage="podane hasło jest za łatwe"
        />
        <TextField
          type="password"
          name="passwordValid"
          placeholder="powtórz hasło"
          error={passwordsErr}
          errorMessage="podane hasła nie są identyczne"
        />
      </div>
      <FormError show={accountErr}>
        konto z podanym e-mailem już istnieje
      </FormError>
      <div className="flex justify-around md:justify-end items-center w-11/12 sm:w-1/2 md:w-[300px]">
        <Button value="zarejestruj się" />
      </div>
    </form>
  );
}
