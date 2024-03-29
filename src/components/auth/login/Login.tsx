"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import TextField from "@components/TextField";
import FormError from "@components/auth/FormError";
import Button from "@components/Button";
import Checkbox from "@components/auth/login/Checkbox";
import Form from "@components/auth/Form";
import FormContainer from "@components/styled/auth/FormContainer";
import FormFields from "@components/styled/auth/FormFields";
import FormOptions from "@components/styled/auth/FormOptions";

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
    <FormContainer>
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
    </FormContainer>
  );
}
