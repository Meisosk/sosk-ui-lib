import { ReactNode, useState } from "react";
import {
  Grid,
  Box,
  Card,
  CardActionArea,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export interface AddNewItemFormProps {
  onSubmit: (payload: Record<string, unknown>) => void | Promise<void>;
  onCancel: () => void;
}

export interface ItemGridProps<T = Record<string, unknown>> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getItemKey: (item: T) => string | number;
  margin?: number | string;
  spacing?: number;
  gridSize?: { xs?: number; sm?: number; md?: number; lg?: number };
  onAddNewItem?: (payload: Record<string, unknown>) => void | Promise<void>;
  addNewItemForm?: (props: AddNewItemFormProps) => ReactNode;
  addNewItemLabel?: string;
  loading?: boolean;
  skeletonCount?: number;
  skeletonWidth?: number | string;
  skeletonHeight?: number | string;
}

export function ItemGrid<T = Record<string, unknown>>({
  items,
  renderItem,
  getItemKey,
  margin = 8,
  spacing = 2,
  gridSize = { xs: 12, sm: 6, md: 4 },
  onAddNewItem,
  addNewItemForm,
  addNewItemLabel = "Add New Item",
  loading = false,
  skeletonCount = 6,
  skeletonWidth = 500,
  skeletonHeight = 450,
}: ItemGridProps<T>) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const canAdd = Boolean(onAddNewItem && addNewItemForm);

  const addGridSize = {
    xs: gridSize.xs,
    sm: gridSize.sm ? Math.max(1, Math.floor(gridSize.sm / 2)) : undefined,
    md: gridSize.md ? Math.max(1, Math.floor(gridSize.md / 2)) : undefined,
    lg: gridSize.lg ? Math.max(1, Math.floor(gridSize.lg / 2)) : undefined,
  };

  const handleSubmit = async (payload: Record<string, unknown>) => {
    if (!onAddNewItem) return;
    await onAddNewItem(payload);
    setDialogOpen(false);
  };

  return (
    <Box sx={{ margin }}>
      <Grid container spacing={spacing} sx={{ width: "100%" }}>
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <Grid size={gridSize} key={`skeleton-${i}`}>
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={skeletonHeight}
                  sx={{
                    width: "100%",
                    maxWidth: skeletonWidth,
                    mx: "auto",
                    borderRadius: 4,
                  }}
                />
              </Grid>
            ))
          : items.map((item) => (
              <Grid size={gridSize} key={getItemKey(item)}>
                {renderItem(item)}
              </Grid>
            ))}

        {!loading && canAdd && (
          <Grid size={addGridSize}>
            <Box
              sx={{
                height: "100%",
                minHeight: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  width: "100%",
                  height: "50%",
                  minHeight: 80,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                  border: "3px dashed",
                  borderColor: "grey.400",
                  boxShadow: "none",
                  transition: "all 0.2s ease",
                  borderRadius: 4,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, 0.08)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => setDialogOpen(true)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    p: 2,
                  }}
                >
                  <AddIcon fontSize="large" color="action" />
                  <Typography color="text.secondary">
                    {addNewItemLabel}
                  </Typography>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        )}
      </Grid>

      {canAdd && (
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{
              borderBottom: 2,
              borderColor: "divider",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {addNewItemLabel}
            <IconButton
              size="small"
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ padding: 0 }}>
            {addNewItemForm!({
              onSubmit: handleSubmit,
              onCancel: () => setDialogOpen(false),
            })}
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}

export default ItemGrid;
