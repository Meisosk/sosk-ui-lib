import { ReactNode, useId } from "react";
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface TitledDialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: Breakpoint;
  disableClose?: boolean;
}

export function TitledDialog({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  disableClose = false,
}: TitledDialogProps) {
  const titleId = useId();

  return (
    <Dialog
      open={open}
      onClose={() => !disableClose && onClose()}
      fullWidth
      maxWidth={maxWidth}
      aria-labelledby={titleId}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          borderBottom: 2,
          borderColor: "divider",
          pr: 3,
        }}
      >
        <DialogTitle id={titleId} sx={{ flex: 1, minWidth: 0 }}>
          {title}
        </DialogTitle>
        <IconButton
          size="small"
          onClick={onClose}
          disabled={disableClose}
          aria-label="Close"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
      <DialogContent sx={{ padding: 0 }}>
        {children}
        {actions && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "flex-end",
              borderTop: 2,
              borderColor: "divider",
              p: 2,
            }}
          >
            {actions}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TitledDialog;
