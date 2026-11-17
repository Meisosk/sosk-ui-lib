import { ElementType, ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme, TypographyProps } from "@mui/material";
import { toSxArray } from "../utils";

export interface StatusPanelProps {
  icon: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  titleVariant?: TypographyProps["variant"];
  titleComponent?: ElementType;
  iconBackground?: string;
  sx?: SxProps<Theme>;
}

/**
 * A centred icon, title, short text and optional buttons, for screens that
 * have nothing else to show: an empty list, no search results, or a
 * finished step such as "Request sent".
 */
export function StatusPanel(props: StatusPanelProps) {
  const {
    icon,
    title,
    children,
    actions,
    titleVariant = "h5",
    titleComponent = "h3",
    iconBackground = "action.hover",
    sx,
  } = props;

  return (
    <Stack
      spacing={1.5}
      sx={[
        {
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          textAlign: "center",
        },
        ...toSxArray(sx),
      ]}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 64,
          height: 64,
          borderRadius: "50%",
          bgcolor: iconBackground,
          color: "primary.main",
        }}
      >
        {icon}
      </Box>
      <Typography variant={titleVariant} component={titleComponent}>
        {title}
      </Typography>
      {children}
      {actions && (
        <Stack
          direction="row"
          spacing={1.5}
          useFlexGap
          sx={{ flexWrap: "wrap", justifyContent: "center", pt: 1 }}
        >
          {actions}
        </Stack>
      )}
    </Stack>
  );
}

export default StatusPanel;
