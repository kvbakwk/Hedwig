"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import changePassword from "@app/api/changePassword";

import { TextFieldOutlined } from "@components/TextField";
import { FilledButton } from "@components/Button";

export default function FormChangePassword({ user }) {
  const router = useRouter();
  const [oldPasswordErr, setOldPasswordErr] = useState(false);
  const [newPasswordErr, setNewPasswordErr] = useState(false);
  const [newPasswordValidErr, setNewPasswordValidErr] = useState(false);
  const [samePasswordErr, setSamePasswordErr] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, newPasswordValid } = e.target.elements;

    changePassword(
      user.id,
      oldPassword.value,
      newPassword.value,
      newPasswordValid.value
    ).then((res) => {
      setOldPasswordErr(res.oldPasswordErr);
      setNewPasswordErr(res.newPasswordErr);
      setNewPasswordValidErr(res.newPasswordValidErr);
      setSamePasswordErr(res.samePasswordErr);
      if (res.change) router.back();
    });
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[100px] w-full mt-[100px] py-[40px]"
      onSubmit={handleSubmit}
      method="post"
    >
      <div className="flex flex-col justify-center items-center gap-[50px] w-[300px]">
        <TextFieldOutlined
          className="w-full"
          type="password"
          name="oldPassword"
          label="stare hasło"
          error={oldPasswordErr || samePasswordErr}
          errorText="wpisane hasło jest niepoprawne"
        />
        <div className="flex flex-col justify-center items-center gap-[10px] w-[300px]">
          <TextFieldOutlined
            className="w-full"
            type="password"
            name="newPassword"
            label="nowe hasło"
            error={newPasswordErr}
            errorText="wymagane: 8+ znaków, duża litera, liczba i znak"
          />
          <TextFieldOutlined
            className="w-full"
            type="password"
            name="newPasswordValid"
            label="powtórz nowe hasło"
            error={newPasswordValidErr}
            errorText="wpisane hasła nie są identyczne"
          />
        </div>
      </div>
      <div className="flex justify-center md:justify-end items-center w-[500px]">
        <FilledButton>potwierdź</FilledButton>
      </div>
    </form>
  );
}
