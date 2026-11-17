import { ElementType, ReactNode, useState } from "react";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TitledDialog } from "./TitledDialog";
import { ConfirmDialog } from "./ConfirmDialog";
import { toSxArray } from "../utils";

export interface EditFormProps {
  onSubmit: (payload: Record<string, unknown>) => void | Promise<void>;
  onCancel: () => void;
}

type MediaCardVariant = "elevated" | "outlined";
type MediaCardDensity = "comfortable" | "compact";

export interface MediaCardProps {
  image?: string;
  imageAlt?: string;
  imageHeight?: number;
  imageAspectRatio?: string | number;
  fallback?: ReactNode;
  title: ReactNode;
  titleComponent?: ElementType;
  subtitle?: ReactNode;
  description?: ReactNode;
  descriptionLines?: number;
  highlight?: ReactNode;
  footer?: ReactNode;
  actions?: ReactNode;
  variant?: MediaCardVariant;
  density?: MediaCardDensity;
  sx?: SxProps<Theme>;
  onEdit?: (payload: Record<string, unknown>) => void | Promise<void>;
  editForm?: (props: EditFormProps) => ReactNode;
  editLabel?: string;
  onDelete?: () => void | Promise<void>;
  deleteLabel?: string;
  deleteConfirmMessage?: ReactNode;
  onClick?: () => void;
}

export interface MediaCardSkeletonProps {
  imageHeight?: number;
  imageAspectRatio?: string | number;
  variant?: MediaCardVariant;
  density?: MediaCardDensity;
}

function surfaceSx(variant: MediaCardVariant, interactive: boolean) {
  if (variant === "outlined") {
    return {
      borderRadius: 1,
      border: 1,
      borderColor: "divider",
      boxShadow: "none",
      ...(interactive && {
        transition: "border-color 0.2s ease",
        "&:hover": { borderColor: "primary.main" },
      }),
    };
  }
  return {
    borderRadius: 3,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    ...(interactive && {
      transition: "all 0.25s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
      },
    }),
  };
}

function mediaSx(imageHeight: number, imageAspectRatio?: string | number) {
  return imageAspectRatio
    ? { width: "100%", height: "auto", aspectRatio: imageAspectRatio }
    : { height: imageHeight };
}

export function MediaCard({
  image,
  imageAlt = "",
  imageHeight = 260,
  imageAspectRatio,
  fallback = <Typography>No Image Available</Typography>,
  title,
  titleComponent,
  subtitle,
  description,
  descriptionLines = 3,
  highlight,
  footer,
  actions,
  variant = "elevated",
  density = "comfortable",
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
  const compact = density === "compact";
  const pad = compact ? 1.75 : 3;

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
        sx={[
          {
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            ...surfaceSx(variant, Boolean(onClick)),
          },
          ...toSxArray(sx),
        ]}
      >
        {image ? (
          <CardMedia
            component="img"
            image={image}
            alt={imageAlt}
            sx={{
              ...mediaSx(imageHeight, imageAspectRatio),
              objectFit: "cover",
              bgcolor: "background.default",
            }}
          />
        ) : (
          <Box
            sx={{
              ...mediaSx(imageHeight, imageAspectRatio),
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
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            p: pad,
            pb: actions ? 0 : pad,
            "&:last-child": { pb: pad },
          }}
        >
          <Typography
            variant={compact ? "subtitle1" : "h6"}
            {...(titleComponent && { component: titleComponent })}
            sx={{
              fontWeight: 600,
              color: "text.primary",
              mb: compact ? 0.5 : 1,
              ...(compact && { lineHeight: 1.3 }),
            }}
          >
            {onClick ? (
              <ButtonBase
                onClick={onClick}
                disableRipple
                sx={{
                  position: "static",
                  font: "inherit",
                  letterSpacing: "inherit",
                  textAlign: "inherit",
                  color: "inherit",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "inherit",
                  },
                  "&.Mui-focusVisible::after": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: "-2px",
                  },
                }}
              >
                {title}
              </ButtonBase>
            ) : (
              title
            )}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: compact ? 0.5 : 1 }}
            >
              {subtitle}
            </Typography>
          )}

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
              variant={compact ? "h6" : "h5"}
              sx={{
                fontWeight: 700,
                color: "primary.main",
                ...(compact ? { mt: "auto", pt: 0.5 } : { mb: 2 }),
              }}
            >
              {highlight}
            </Typography>
          )}

          {compact && footer ? <Box sx={{ mt: 1 }}>{footer}</Box> : footer}
        </CardContent>

        {actions && (
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              px: pad,
              pt: compact ? 1.5 : 2,
              pb: pad,
            }}
          >
            {actions}
          </Box>
        )}
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

export function MediaCardSkeleton({
  imageHeight = 260,
  imageAspectRatio,
  variant = "elevated",
  density = "comfortable",
}: MediaCardSkeletonProps) {
  const compact = density === "compact";

  return (
    <Card
      sx={{ width: "100%", overflow: "hidden", ...surfaceSx(variant, false) }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ width: "100%", ...mediaSx(imageHeight, imageAspectRatio) }}
      />
      <Box sx={{ p: compact ? 1.75 : 3 }}>
        <Skeleton
          animation="wave"
          width="60%"
          height={compact ? 24 : 32}
          sx={{ mb: 1 }}
        />
        {!compact && (
          <>
            <Skeleton animation="wave" height={20} />
            <Skeleton animation="wave" height={20} />
          </>
        )}
        <Skeleton
          animation="wave"
          width="30%"
          height={compact ? 28 : 36}
          sx={{ mt: compact ? 0 : 2 }}
        />
      </Box>
    </Card>
  );
}
