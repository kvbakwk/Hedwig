"use client";

import { useRouter } from "next/navigation";

import { Icon } from "@components/Icon";

export default function Back() {
  const router = useRouter();

  return (
    <div
      className="justify-self-center self-center flex justify-center items-center w-[30px] h-[30px] hover:bg-shadow cursor-pointer transition-colors rounded-full"
      onClick={() => router.back()}
    >
      <Icon>arrow_back</Icon>
    </div>
  );
}
