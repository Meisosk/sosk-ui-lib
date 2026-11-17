import { ReactNode } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import type { Breakpoint } from "@mui/material";

export interface SiteFooterColumn {
  title: string;
  items: ReactNode[];
  wide?: boolean;
}

export interface SiteFooterColors {
  background?: string;
  text?: string;
  heading?: string;
  divider?: string;
}

export interface SiteFooterProps {
  brand: ReactNode;
  description?: ReactNode;
  columns?: SiteFooterColumn[];
  bottom?: ReactNode;
  bottomAlign?: "left" | "right";
  colors?: SiteFooterColors;
  maxWidth?: Breakpoint | false;
}

const DEFAULT_COLORS: Required<SiteFooterColors> = {
  background: "grey.900",
  text: "grey.300",
  heading: "common.white",
  divider: "grey.800",
};

export function SiteFooter(props: SiteFooterProps) {
  const {
    brand,
    description,
    columns = [],
    bottom,
    bottomAlign = "left",
    colors,
    maxWidth = "lg",
  } = props;
  const palette = { ...DEFAULT_COLORS, ...colors };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: palette.background,
        color: palette.text,
        "& a": {
          color: "inherit",
          textDecoration: "underline",
          textUnderlineOffset: "0.2em",
          "&:focus-visible": {
            outline: "2px solid currentColor",
            outlineOffset: 2,
            borderRadius: "2px",
          },
        },
        "& li a": {
          textDecoration: "none",
          "&:hover, &:focus-visible": { textDecoration: "underline" },
        },
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: columns.length
              ? `2fr repeat(${columns.length}, minmax(0, 1fr))`
              : "1fr",
          },
          gap: "28px 24px",
          pt: 5,
          pb: 3.5,
        }}
      >
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}>
          <Box sx={{ mb: 1, color: palette.heading }}>{brand}</Box>
          {description && (
            <Typography sx={{ maxWidth: "34ch", fontSize: 15 }}>
              {description}
            </Typography>
          )}
        </Box>
        {columns.map((column) => (
          <Box
            key={column.title}
            component="nav"
            aria-label={column.title}
            sx={
              column.wide
                ? { gridColumn: { xs: "1 / -1", md: "auto" } }
                : undefined
            }
          >
            <Typography
              component="h2"
              sx={{
                mb: 1.25,
                color: palette.heading,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {column.title}
            </Typography>
            <Stack
              component="ul"
              spacing={1}
              sx={{ m: 0, p: 0, listStyle: "none", fontSize: 15 }}
            >
              {column.items.map((item, index) => (
                <Box component="li" key={index} sx={{ overflowWrap: "anywhere" }}>
                  {item}
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Container>
      {bottom && (
        <Box sx={{ borderTop: 1, borderColor: palette.divider }}>
          <Container
            maxWidth={maxWidth}
            sx={{
              display: "flex",
              justifyContent: bottomAlign === "right" ? "flex-end" : "flex-start",
              py: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: 13 }}>
              {bottom}
            </Typography>
          </Container>
        </Box>
      )}
    </Box>
  );
}

export default SiteFooter;
