"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import register from "@app/api/register";
import Button from "@components/Button";
import TextField from "@components/TextField";
import FormError from "@components/FormError";
import Form from "@components/ui/auth/Form";
import FormFields from "@components/ui/auth/FormFields";
import FormOptions from "@components/ui/auth/FormOptions";
import AvatarField from "@components/ui/auth/register/AvatarField";

export default function Register() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(new FormData(e.target));

    setEmailErr(res.emailErr);
    setFullnameErr(res.fullnameErr);
    setPasswordErr(res.passwordErr);
    setPasswordsErr(res.passwordsErr);
    setAccountErr(res.accountErr);
    if (res.register) router.push("/logowanie");
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <FormFields>
        <AvatarField avatar={avatar} setAvatar={setAvatar} />
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
      </FormFields>
      <FormError show={accountErr}>
        konto z podanym e-mailem już istnieje
      </FormError>
      <FormOptions>
        <div></div>
        <Button value="zarejestruj się" />
      </FormOptions>
    </Form>
  );
}
