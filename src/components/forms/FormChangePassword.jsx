"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import changePassword from "@app/api/changePassword";

import TextField from "@components/TextField";
import Button from "@components/Button";

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
      if (res.change) router.push("/");
    });
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-[15px] w-full mt-[100px] py-[40px]"
      onSubmit={handleSubmit}
      method="post">
      <div className="flex flex-col justify-center items-center gap-[10px] w-[300px]">
        <TextField
          type="password"
          name="oldPassword"
          placeholder="stare hasło"
          error={oldPasswordErr}
          errorMessage="stare hasło jest nieprawidłowe"
        />
      </div>
      <div className="w-[350px] h-[1px] bg-shadow"></div>
      <div className="flex flex-col justify-center items-center gap-[10px] w-[300px]">
        <TextField
          type="password"
          name="newPassword"
          placeholder="nowe hasło"
          error={newPasswordErr}
          errorMessage="podane hasło jest za łatwe"
        />
        <TextField
          type="password"
          name="newPasswordValid"
          placeholder="powtórz nowe hasło"
          error={newPasswordValidErr}
          errorMessage="podane hasła nie są identyczne"
        />
      </div>
      <div
        className={`flex-col justify-center items-center gap-[10px] text-white text-sm w-[320px] py-[20px] bg-red-300 rounded-md ${
          samePasswordErr ? "flex" : "hidden"
        }`}>
        nowe hasło musi być inne niż to obecne
      </div>
      <div className="flex justify-center md:justify-end items-center w-[350px]">
        <Button type="submit" value="potwierdź" />
      </div>
    </form>
  );
}
