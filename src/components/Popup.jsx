"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Popup({ children, param }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [show, setShow] = useState(searchParams.has(param));

  const createQueryString = useCallback(
    (name) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const handleClose = () => {
    router.push(pathname + "?" + createQueryString(param), { scroll: false });
  };

  useEffect(() => {
    setShow(searchParams.has(param));
  }, [searchParams]);

  return (
    <div
      className={`fixed bottom-1 ${
        show ? "flex" : "hidden"
      } justify-center items-center w-[600px] h-[400px] mx-[calc(50vw-300px)] border-[1px] border-solid border-black`}>
      <div onClick={handleClose}>
        <span className="material-symbols-outlined">close</span>
      </div>
      {children}
    </div>
  );
}
