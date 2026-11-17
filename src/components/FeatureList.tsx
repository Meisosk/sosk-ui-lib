import { ReactNode } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import type { Breakpoint } from "@mui/material";

export interface FeatureListItem {
  icon: ReactNode;
  title: ReactNode;
  text?: ReactNode;
}

export interface FeatureListProps {
  items: FeatureListItem[];
  columns?: number;
  background?: string;
  maxWidth?: Breakpoint | false;
}

export function FeatureList(props: FeatureListProps) {
  const {
    items,
    columns = 3,
    background = "transparent",
    maxWidth = "lg",
  } = props;

  return (
    <Box sx={{ bgcolor: background }}>
      <Container
        component="ul"
        maxWidth={maxWidth}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            md: `repeat(${columns}, minmax(0, 1fr))`,
          },
          gap: { xs: 2.5, md: 4 },
          my: 0,
          py: 4,
          listStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <Stack
            component="li"
            key={index}
            direction="row"
            spacing={1.75}
            sx={{ alignItems: "flex-start" }}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                flexShrink: 0,
                width: 44,
                height: 44,
                border: 1,
                borderColor: "secondary.main",
                borderRadius: "50%",
                bgcolor: "background.paper",
                color: "primary.main",
              }}
            >
              {item.icon}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
              {item.text && (
                <Typography
                  color="text.secondary"
                  sx={{ mt: 0.25, fontSize: 15 }}
                >
                  {item.text}
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
      </Container>
    </Box>
  );
}

export default FeatureList;
