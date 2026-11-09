import { ReactNode, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TitledDialog } from "./TitledDialog";
import { ConfirmDialog } from "./ConfirmDialog";

export interface EditFormProps {
  onSubmit: (payload: Record<string, unknown>) => void | Promise<void>;
  onCancel: () => void;
}

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
  onEdit?: (payload: Record<string, unknown>) => void | Promise<void>;
  editForm?: (props: EditFormProps) => ReactNode;
  editLabel?: string;
  onDelete?: () => void | Promise<void>;
  deleteLabel?: string;
  deleteConfirmMessage?: ReactNode;
  onClick?: () => void;
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
  onEdit,
  editForm,
  editLabel = "Edit",
  onDelete,
  deleteLabel = "Delete",
  deleteConfirmMessage = "Are you sure you want to delete this item? This action cannot be undone.",
  onClick,
}: MediaCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const canEdit = Boolean(onEdit && editForm);
  const canDelete = Boolean(onDelete);

  const handleEditSubmit = async (payload: Record<string, unknown>) => {
    if (!onEdit) return;
    await onEdit(payload);
    setEditOpen(false);
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      {(canEdit || canDelete) && (
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          {canEdit && (
            <IconButton
              size="small"
              onClick={() => setEditOpen(true)}
              aria-label={editLabel}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          {canDelete && (
            <IconButton
              size="small"
              onClick={() => setDeleteOpen(true)}
              aria-label={deleteLabel}
            >
              <DeleteIcon fontSize="small" color="error" />
            </IconButton>
          )}
        </Stack>
      )}

      <Card
        onClick={onClick}
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

      {canEdit && (
        <TitledDialog
          open={editOpen}
          onClose={() => setEditOpen(false)}
          title={editLabel}
        >
          {editForm!({
            onSubmit: handleEditSubmit,
            onCancel: () => setEditOpen(false),
          })}
        </TitledDialog>
      )}

      {canDelete && (
        <ConfirmDialog
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={onDelete!}
          title={deleteLabel}
          message={deleteConfirmMessage}
          confirmLabel={deleteLabel}
          pendingLabel="Deleting…"
        />
      )}
    </Box>
  );
}
