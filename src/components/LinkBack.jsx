"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";

export default function LinkBack({ children }) {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("http://localhost/");

  useEffect(() => {
    searchParams.get("powrot")
      ? setUrl(searchParams.get("powrot"))
      : setUrl("http://localhost/");
  }, [searchParams]);

  return <Link href={url}>{children}</Link>;
}
