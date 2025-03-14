"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import loginAPI from "@app/api/login";

import { FilledButton } from "@components/Button";
import { TextFieldOutlined } from "@components/TextField";
import { Checkbox } from "../../Checkbox";

export default function Login() {
  const router = useRouter();

  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await loginAPI(
      formData.get("email").toString(),
      formData.get("password").toString(),
      formData.get("remember") ? true : false
    );

    if (res.login) router.push("/");
    setEmailErr(res.emailErr);
    setPasswordErr(res.passwordErr);
    setAccountErr(res.accountErr);
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[16px] w-[500px] h-fit py-[60px] bg-surface rounded-2xl shadow-md"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center items-center gap-[25px] w-[320px] px-[10px] py-[20px]">
        <TextFieldOutlined
          className="w-full"
          label="twój e-mail"
          name="email"
          error={emailErr}
          errorText="wpisany adres e-mail jest niepoprawny"
        />
        <TextFieldOutlined
          className="w-full"
          label="twoje hasło"
          name="password"
          type="password"
          error={passwordErr || accountErr}
          errorText="wpisane hasło jest niepoprawne"
        />
      </div>
      <div className="flex justify-center items-center gap-[70px] pr-[10px]">
        <label
          className="flex justify-center items-center text-[14px] text-outline tracking-wider"
          htmlFor="remember"
        >
          <Checkbox className="m-[15px]" name="remember" id="remember" />
          zapamiętaj
        </label>
        <FilledButton>zaloguj się</FilledButton>
      </div>
    </form>
  );
}
