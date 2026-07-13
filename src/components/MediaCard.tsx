import { ReactNode } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

export interface MediaCardProps {
  image?: string;
  imageAlt?: string;
  imageHeight?: number;
  fallback?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  descriptionLines?: number;
  highlight?: ReactNode;
  footer?: ReactNode;
  sx?: SxProps<Theme>;
}

export function MediaCard({
  image,
  imageAlt = "",
  imageHeight = 260,
  fallback = <Typography>No Image Available</Typography>,
  title,
  description,
  descriptionLines = 3,
  highlight,
  footer,
  sx,
}: MediaCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
        },
        ...sx,
      }}
    >
      {image ? (
        <CardMedia
          component="img"
          image={image}
          alt={imageAlt}
          sx={{
            height: imageHeight,
            objectFit: "cover",
            bgcolor: "background.default",
          }}
        />
      ) : (
        <Box
          sx={{
            height: imageHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.100",
            color: "text.secondary",
          }}
        >
          {fallback}
        </Box>
      )}

      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "text.primary", mb: 1 }}
        >
          {title}
        </Typography>

        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flexGrow: 1,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: descriptionLines,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>
        )}

        {highlight && (
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "primary.main", mb: 2 }}
          >
            {highlight}
          </Typography>
        )}

        {footer}
      </CardContent>
    </Card>
  );
}
