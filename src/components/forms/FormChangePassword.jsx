"use client";

import Button from "@components/Button";
import TextField from "@components/TextField";

export default function FormChangePassword({ user }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[15px] w-full py-[40px] glass"
      onSubmit={handleSubmit}
      method="post">
      <div className="flex flex-col justify-center items-center gap-[10px] w-[300px]">
        <TextField
          type="password"
          name="oldPassword"
          placeholder="stare hasło"
          error={false}
          errorMessage="stare hasło jest nieprawidłowe"
        />
      </div>
      <div className="w-[350px] h-[1px] bg-shadow"></div>
      <div className="flex flex-col justify-center items-center gap-[10px] w-[300px]">
        <TextField
          type="password"
          name="newPassword"
          placeholder="nowe hasło"
          error={false}
          errorMessage="podane hasło jest za łatwe"
        />
        <TextField
          type="password"
          name="newPasswordValid"
          placeholder="powtórz nowe hasło"
          error={false}
          errorMessage="podane hasła nie są identyczne"
        />
      </div>
      <div className="flex justify-end items-center w-[350px]">
        <Button type="submit" value="potwierdź" />
      </div>
    </form>
  );
}
