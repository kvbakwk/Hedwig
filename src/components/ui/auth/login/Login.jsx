"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@components/TextField";
import FormError from "@components/FormError";
import Button from "@components/Button";
import Checkbox from "@components/Checkbox";
import Form from "@components/ui/auth/Form";
import FormFields from "@components/ui/auth/FormFields";
import FormOptions from "@components/ui/auth/FormOptions";

export default function Login({ login }) {
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
    <Form handleSubmit={handleSubmit}>
      <FormFields>
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
      </FormFields>
      <FormError show={accountErr}>
        podane e-mail lub hasło jest nieprawidłowe
      </FormError>
      <FormOptions>
        <Checkbox name="remember" label="zapamiętaj" />
        <Button value="zaloguj się" />
      </FormOptions>
    </Form>
  );
}
