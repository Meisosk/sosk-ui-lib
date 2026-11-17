import { Box, Stack, Typography } from "@mui/material";
import type { SxProps, Theme, TypographyProps } from "@mui/material";
import type { ElementType, ReactNode } from "react";
import { toSxArray } from "../utils";

type TextSlotProps = Partial<TypographyProps> & { component?: ElementType };

export interface HeroBannerProps {
  title: ReactNode;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  align?: "auto" | "left";
  background?: string;
  minHeight?: string | number;
  maxWidth?: string | number;
  slotProps?: {
    root?: { sx?: SxProps<Theme> };
    image?: { sx?: SxProps<Theme> };
    title?: TextSlotProps;
    subtitle?: TextSlotProps;
  };
}

export function HeroBanner({
  title,
  subtitle,
  eyebrow,
  actions,
  imageSrc,
  imageAlt = "",
  imagePosition = "right",
  align = "auto",
  background = "background.paper",
  minHeight = "60vh",
  maxWidth = 1200,
  slotProps,
}: HeroBannerProps) {
  const hasImage = Boolean(imageSrc);
  const imageLeft = imagePosition === "left";
  const { sx: titleSx, ...titleProps } = slotProps?.title ?? {};
  const { sx: subtitleSx, ...subtitleProps } = slotProps?.subtitle ?? {};

  const textAlign =
    align === "left"
      ? "left"
      : hasImage
      ? { xs: "center", md: "left" }
      : "center";

  const actionsJustify =
    align === "left"
      ? "flex-start"
      : hasImage
      ? { xs: "center", md: "flex-start" }
      : "center";

  const image = hasImage && (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", md: 550 },
        minWidth: 0,
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={imageAlt}
        sx={[
          {
            width: "100%",
            height: "auto",
            maxHeight: { xs: 220, sm: 280, md: 400 },
            borderRadius: 2,
            objectFit: "cover",
            boxShadow: 4,
            display: "block",
          },
          ...toSxArray(slotProps?.image?.sx),
        ]}
      />
    </Box>
  );

  return (
    <Box
      sx={[
        {
          minHeight: { xs: "auto", md: minHeight },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: background,
          px: { xs: 2, sm: 3 },
          py: { xs: 5, md: 0 },
        },
        ...toSxArray(slotProps?.root?.sx),
      ]}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: hasImage ? "space-between" : "center",
          gap: { xs: 4, md: 8 },
        }}
      >
        {imageLeft && image}

        <Box
          sx={{
            width: align === "left" ? "100%" : "auto",
            maxWidth: hasImage ? { xs: "100%", md: 550 } : 700,
            minWidth: 0,
            textAlign,
          }}
        >
          {eyebrow && (
            <Typography
              variant="overline"
              sx={{
                display: "block",
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: "0.14em",
                mb: 1,
              }}
            >
              {eyebrow}
            </Typography>
          )}

          <Typography
            variant="h2"
            component="h1"
            {...titleProps}
            sx={[{ color: "primary.main", mb: 2 }, ...toSxArray(titleSx)]}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="h6"
              component="p"
              {...subtitleProps}
              sx={[{ color: "text.secondary" }, ...toSxArray(subtitleSx)]}
            >
              {subtitle}
            </Typography>
          )}

          {actions && (
            <Stack
              direction="row"
              spacing={1.5}
              useFlexGap
              sx={{ flexWrap: "wrap", justifyContent: actionsJustify, mt: 3 }}
            >
              {actions}
            </Stack>
          )}
        </Box>

        {!imageLeft && image}
      </Box>
    </Box>
  );
}
