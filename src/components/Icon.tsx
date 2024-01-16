"use client";

import { useEffect, useRef } from "react";

export default function Icon({ icon, fill }) {
  const iconEl = useRef("iconEl");

  useEffect(() => {
    if (fill) iconEl.current.classList.add("fill");
    else iconEl.current.classList.remove("fill");
  }, [fill]);

  return (
    <span className="material-symbols-outlined" ref={iconEl}>
      {icon}
    </span>
  );
}
