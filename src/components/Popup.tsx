"use client";

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
      className={`fixed z-50 bottom-[50px] w-[710px] bg-surface shadow-md rounded-2xl ${
        show ? "block" : "hidden"
      }`}
    >
      {children}
    </div>
  );
}
