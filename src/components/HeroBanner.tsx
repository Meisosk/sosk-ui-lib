import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface HeroBannerProps {
  title: ReactNode;
  subtitle?: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  minHeight?: string | number;
}

export function HeroBanner({
  title,
  subtitle,
  imageSrc,
  imageAlt = "",
  minHeight = "60vh",
}: HeroBannerProps) {
  const hasImage = Boolean(imageSrc);

  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: minHeight },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
        px: { xs: 2, sm: 3 },
        py: { xs: 5, md: 0 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          justifyContent: hasImage ? "space-between" : "center",
          gap: { xs: 4, md: 8 },
        }}
      >
        {hasImage && (
          <Box
            sx={{
              order: { xs: 0, md: 1 },
              width: "100%",
              maxWidth: { xs: "100%", md: 550 },
              minWidth: 0,
            }}
          >
            <Box
              component="img"
              src={imageSrc}
              alt={imageAlt}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: { xs: 220, sm: 280, md: 400 },
                borderRadius: 2,
                objectFit: "cover",
                boxShadow: 4,
                display: "block",
              }}
            />
          </Box>
        )}

        <Box
          sx={{
            order: { xs: 1, md: 0 },
            maxWidth: hasImage ? { xs: "100%", md: 550 } : 700,
            minWidth: 0,
            textAlign: hasImage ? { xs: "center", md: "left" } : "center",
          }}
        >
          <Typography variant="h2" sx={{ color: "primary.main", mb: 2 }}>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="h6" sx={{ color: "text.secondary" }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
