"use client";

import Icon from "@components/Icon";
import { Dispatch, SetStateAction } from "react";

export default function Popup({
  children,
  show,
  setShow,
}: {
  children: JSX.Element;
  show: boolean;
  setShow: Dispatch<SetStateAction<any>>;
}) {
  const handleClose = (): void => {
    setShow(0);
  };

  return (
    <div
      className={`fixed z-50 bottom-[50px] w-[710px] bg-background shadow-md glass-border rounded-2xl ${
        show ? "block" : "hidden"
      }`}>
      <div
        className="absolute top-2 right-2 flex justify-center items-center w-[30px] h-[30px] hover:bg-shadow rounded-full cursor-pointer"
        onClick={handleClose}>
        <Icon icon="close" fill={false} />
      </div>
      {children}
    </div>
  );
}
