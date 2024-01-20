"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import register from "@app/api/register";
import Button from "@components/Button";
import TextField from "@components/TextField";
import FormError from "@components/auth/FormError";
import Form from "@components/auth/Form";
import FormFields from "@components/styled/auth/FormFields";
import FormOptions from "@components/styled/auth/FormOptions";
import AvatarField from "@components/AvatarField";
import FormContainer from "@components/styled/auth/FormContainer";

export default function Register() {
  const router = useRouter();
  const [emailErr, setEmailErr] = useState(false);
  const [fullnameErr, setFullnameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordsErr, setPasswordsErr] = useState(false);
  const [accountErr, setAccountErr] = useState(false);
  const [avatar, setAvatar] = useState<FileList>(null);

  useEffect(() => {
    router.prefetch("/logowanie");
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const res = await register(new FormData(e.currentTarget));

    setEmailErr(res.emailErr);
    setFullnameErr(res.fullnameErr);
    setPasswordErr(res.passwordErr);
    setPasswordsErr(res.passwordsErr);
    setAccountErr(res.accountErr);
    if (res.register) router.push("/logowanie");
  };

  return (
    <FormContainer>
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
          <div />
          <Button value="zarejestruj się" />
        </FormOptions>
      </Form>
    </FormContainer>
  );
}
