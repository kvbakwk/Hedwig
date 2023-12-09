"use client";

import { useRouter } from "next/navigation";

export default function Back({ children }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className="flex justify-center items-center justify-self-center self-center w-[30px] h-[30px] hover:bg-[rgb(var(--shadow)/1)] cursor-pointer transition-colors rounded-full"
      onClick={handleBack}>
      <span className="material-symbols-outlined">arrow_back</span>
    </div>
  );
}
