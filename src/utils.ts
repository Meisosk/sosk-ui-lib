import type { CSSProperties } from "react";
import type { SxProps, Theme } from "@mui/material";

export function toSxArray(sx?: SxProps<Theme>) {
  if (!sx) return [];
  return Array.isArray(sx) ? sx : [sx];
}

export const visuallyHidden: CSSProperties = {
  border: 0,
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
};
