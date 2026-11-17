import { ReactNode, useState } from "react";
import { Alert, Box, Button, ButtonProps, Typography } from "@mui/material";
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
  errorMessage?: ReactNode;
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
  errorMessage = "Something went wrong. Please try again.",
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleClose = () => {
    setFailed(false);
    onClose();
  };

  const handleConfirm = async () => {
    setPending(true);
    setFailed(false);
    try {
      await onConfirm();
    } catch {
      setFailed(true);
      setPending(false);
      return;
    }
    setPending(false);
    handleClose();
  };

  return (
    <TitledDialog
      open={open}
      onClose={handleClose}
      title={title}
      maxWidth="xs"
      disableClose={pending}
      actions={
        <>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClose}
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
        <Typography component="div">{message}</Typography>
        {failed && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </TitledDialog>
  );
}

export default ConfirmDialog;
