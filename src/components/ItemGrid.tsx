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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
}: ItemGridProps<T>) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const canAdd = Boolean(onAddNewItem && addNewItemForm);

  const handleSubmit = async (payload: Record<string, unknown>) => {
    if (!onAddNewItem) return;
    await onAddNewItem(payload);
    setDialogOpen(false);
  };

  return (
    <Box sx={{ margin }}>
      <Grid sx={{ width: "100%" }} container spacing={spacing}>
        {items.map((item) => (
          <Grid size={gridSize} key={getItemKey(item)}>
            {renderItem(item)}
          </Grid>
        ))}

        {canAdd && (
          <Grid size={gridSize}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                minHeight: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderStyle: "dashed",
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
                  py: 4,
                }}
              >
                <AddIcon fontSize="large" color="action" />
                <Typography color="text.secondary">
                  {addNewItemLabel}
                </Typography>
              </CardActionArea>
            </Card>
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
          <DialogTitle>{addNewItemLabel}</DialogTitle>
          <DialogContent>
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
