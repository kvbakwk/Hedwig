import React from "react";
import { createComponent } from "@lit/react";
import { MdCircularProgress } from "@material/web/progress/circular-progress";

export const CircularProgress = createComponent({
  tagName: "md-circular-progress",
  elementClass: MdCircularProgress,
  react: React,
});