"use client";

import { useEffect, useState } from "react";
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
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    router.prefetch("/logowanie");
  }, []);

  const handleSubmit = async (formData) => {
    const res = await register(formData);

    setEmailErr(res.emailErr);
    setFullnameErr(res.fullnameErr);
    setPasswordErr(res.passwordErr);
    setPasswordsErr(res.passwordsErr);
    setAccountErr(res.accountErr);
    if (res.register) router.push("/logowanie");
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[25px] w-full md:w-[500px] h-full md:h-auto pb-40 md:py-16 md:glass"
      method="post"
      action={handleSubmit}>
      <div className="flex flex-col justify-center items-center gap-[10px] w-11/12 sm:w-1/2 md:w-[300px]">
        <label
          className="flex justify-center items-center w-[100px] h-[100px] mb-[10px] bg-[rgb(var(--background)/1)] glass-shadow glass-border rounded-full cursor-pointer"
          htmlFor="avatar">
          {avatar.length === 0 && (
            <span className="material-symbols-outlined">
              add_photo_alternate
            </span>
          )}
          {avatar.length === 1 && (
            <img
              className="w-full h-full rounded-full"
              src={URL.createObjectURL(avatar[0])}
            />
          )}
          <input
            className="hidden"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files)}
          />
        </label>
        <TextField
          type="text"
          name="fullname"
          placeholder="imię i nazwisko"
          error={fullnameErr}
          errorMessage="wprowadź swoje poprawne dane"
        />
        <TextField
          type="text"
          name="email"
          placeholder="e-mail"
          error={emailErr}
          errorMessage="wprowadź poprawnego e-maila"
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
