"use client";

import register from "@app/utils/register";

export default function FormRegister() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, fullname, password, passwordValid } = e.target.elements;

    console.log(await register(email.value, fullname.value, password.value, passwordValid.value));
  };

  return (
    <form onSubmit={handleSubmit} method="post">
      <input
        type="text"
        name="email"
        placeholder="e-mail"
      />
      <input
        type="text"
        name="fullname"
        placeholder="imię i nazwisko"
      />
      <input
        type="password"
        name="password"
        placeholder="hasło"
      />
      <input
        type="password"
        name="passwordValid"
        placeholder="powtórz hasło"
      />
      <input type="submit" value="zarejestruj się" />
    </form>
  );
}
