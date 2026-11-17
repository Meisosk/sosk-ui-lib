import { Fragment, ReactNode } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { toSxArray } from "../utils";

export interface DetailListItem {
  label: ReactNode;
  value: ReactNode;
}

export interface DetailListProps {
  items: DetailListItem[];
  sx?: SxProps<Theme>;
}

export function DetailList(props: DetailListProps) {
  const { items, sx } = props;

  if (items.length === 0) return null;

  return (
    <Box
      component="dl"
      sx={[
        {
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "6px 16px",
          m: 0,
        },
        ...toSxArray(sx),
      ]}
    >
      {items.map((item, index) => (
        <Fragment key={index}>
          <Box component="dt" sx={{ fontWeight: 700 }}>
            {item.label}
          </Box>
          <Box
            component="dd"
            sx={{ m: 0, color: "text.secondary", overflowWrap: "anywhere" }}
          >
            {item.value}
          </Box>
        </Fragment>
      ))}
    </Box>
  );
}

export default DetailList;
