import { ReactNode, useId } from "react";
import { Box, ButtonBase, Container, Typography } from "@mui/material";
import type { Breakpoint, SxProps, Theme } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { toSxArray } from "../utils";

export interface CategoryTile {
  label: string;
  image?: string;
  onClick: () => void;
}

export interface CategoryTilesProps {
  items: CategoryTile[];
  title?: ReactNode;
  placeholderIcon?: ReactNode;
  tileBackground?: string;
  maxWidth?: Breakpoint | false;
  sx?: SxProps<Theme>;
}

export function CategoryTiles(props: CategoryTilesProps) {
  const {
    items,
    title,
    placeholderIcon = <StorefrontOutlinedIcon />,
    tileBackground = "background.default",
    maxWidth = "lg",
    sx,
  } = props;
  const headingId = useId();

  const circleSx = {
    width: "100%",
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    p: "4px",
    border: 1,
    borderColor: "divider",
    bgcolor: tileBackground,
  } as const;

  return (
    <Container
      component="section"
      maxWidth={maxWidth}
      aria-labelledby={title ? headingId : undefined}
      sx={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        },
        ...toSxArray(sx),
      ]}
    >
      {title && (
        <Typography id={headingId} variant="h3" component="h2">
          {title}
        </Typography>
      )}
      <Box
        component="ul"
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          gap: { xs: 1.5, md: 2 },
          width: "100%",
          maxWidth: items.length * 190,
          m: 0,
          p: 0,
          listStyle: "none",
        }}
      >
        {items.map((item) => (
          <li key={item.label}>
            <ButtonBase
              onClick={item.onClick}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
                borderRadius: 1,
                color: "text.primary",
                fontSize: 15,
                fontWeight: 600,
                lineHeight: 1.3,
                textAlign: "center",
                "&:hover .category-tile-label": { textDecoration: "underline" },
                "&.Mui-focusVisible": {
                  outline: 2,
                  outlineColor: "primary.main",
                  outlineOffset: 4,
                },
              }}
            >
              {item.image ? (
                <Box
                  component="img"
                  src={item.image}
                  alt=""
                  loading="lazy"
                  sx={{ ...circleSx, display: "block", objectFit: "cover" }}
                />
              ) : (
                <Box
                  aria-hidden
                  sx={{
                    ...circleSx,
                    display: "grid",
                    placeItems: "center",
                    color: "primary.main",
                  }}
                >
                  {placeholderIcon}
                </Box>
              )}
              <Box component="span" className="category-tile-label">
                {item.label}
              </Box>
            </ButtonBase>
          </li>
        ))}
      </Box>
    </Container>
  );
}

export default CategoryTiles;
