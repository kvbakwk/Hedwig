"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import register from "@app/api/register";
import FormError from "@components/auth/FormError";
import Form from "@components/auth/Form";
import FormFields from "@components/styled/auth/FormFields";
import FormOptions from "@components/styled/auth/FormOptions";
import AvatarField from "@components/AvatarField";
import FormContainer from "@components/styled/auth/FormContainer";
import { TextFieldOutlined } from "@components/TextField";
import { FilledButton } from "@components/Button";
import { Checkbox } from "../../Checkbox";

export default function Register() {
  const router = useRouter();
  const [emailErr, setEmailErr] = useState(false);
  const [fullnameErr, setFullnameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordsErr, setPasswordsErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);
  const [avatar, setAvatar] = useState<FileList>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const res = await register(new FormData(e.currentTarget));

    if (res.register) router.push("/logowanie");
    setEmailErr(res.emailErr);
    setFullnameErr(res.fullnameErr);
    setPasswordErr(res.passwordErr);
    setPasswordsErr(res.passwordsErr);
    setAccountErr(res.accountErr);
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[40px] w-[540px] h-fit pt-[35px] pb-[70px] bg-surface rounded-2xl shadow-md"
      onSubmit={handleSubmit}
    >
    <div className="flex flex-col justify-center items-center gap-[25px] w-[370px] px-[10px] py-[20px]">
        <AvatarField avatar={avatar} setAvatar={setAvatar} />
        <TextFieldOutlined
          className="w-full"
          label="twoje imię i nazwisko"
          name="fullname"
          error={fullnameErr}
          errorText="wpisane imię i nazwisko są niepoprawne"
        />
        <TextFieldOutlined
          className="w-full"
          label="twój e-mail"
          name="email"
          error={emailErr || accountErr}
          errorText="wpisany adres e-mail jest niepoprawny lub zajęty"
        />
        <TextFieldOutlined
          className="w-full"
          label="twoje hasło"
          name="password"
          type="password"
          error={passwordErr}
          errorText="wymagane: 8+ znaków, duża litera, liczba i znak"
        />
        <TextFieldOutlined
          className="w-full"
          label="powtórz hasło"
          name="passwordValid"
          type="password"
          error={passwordsErr}
          errorText="wpisane hasła nie są identyczne"
        />
      </div>
      <div className="flex justify-center items-center gap-[40px] pr-[10px]">
        <label
          className="flex justify-center items-center text-[14px] text-outline tracking-wider"
          htmlFor="rules"
        >
          <Checkbox className="m-[15px]" name="rules" id="rules" required />
          akceptuję regulamin
        </label>
        <FilledButton>zarejestuj się</FilledButton>
      </div>
    </form>
  );
}
