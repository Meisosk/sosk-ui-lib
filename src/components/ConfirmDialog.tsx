import { ReactNode, useState } from "react";
import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { TitledDialog } from "./TitledDialog";

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: ReactNode;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  pendingLabel?: string;
  confirmColor?: ButtonProps["color"];
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  pendingLabel,
  confirmColor = "error",
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false);

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setPending(false);
    }
  };

  return (
    <TitledDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      disableClose={pending}
      actions={
        <>
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            disabled={pending}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="contained"
            color={confirmColor}
            onClick={handleConfirm}
            disabled={pending}
          >
            {pending && pendingLabel ? pendingLabel : confirmLabel}
          </Button>
        </>
      }
    >
      <Box sx={{ p: 2 }}>
        <Typography>{message}</Typography>
      </Box>
    </TitledDialog>
  );
}

export default ConfirmDialog;
