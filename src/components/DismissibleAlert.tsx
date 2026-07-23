import { useEffect, useState } from "react";
import { Alert, AlertProps, Box, Fade, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface DismissibleAlertProps {
  severity: AlertProps["severity"];
  children: React.ReactNode;
  onClose: () => void;
  autoHideDuration?: number; // ms, pass 0/undefined to disable auto-dismiss
}

const FADE_DURATION = 400; // ms

export function DismissibleAlert({
  severity,
  children,
  onClose,
  autoHideDuration = 2500,
}: DismissibleAlertProps) {
  const [visible, setVisible] = useState(true);

  const startClose = () => setVisible(false);

  useEffect(() => {
    if (!autoHideDuration) return;
    const timer = setTimeout(startClose, autoHideDuration);
    return () => clearTimeout(timer);
  }, [autoHideDuration]);

  return (
    <Fade in={visible} timeout={FADE_DURATION} onExited={onClose}>
      <Box
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: (theme) => theme.zIndex.snackbar,
          width: { xs: "calc(100% - 32px)", sm: "auto" },
          maxWidth: 480,
        }}
      >
        <Alert
          severity={severity}
          variant="standard"
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={startClose}
              aria-label="close"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{
            backgroundColor: "background.paper",
            boxShadow: 4,
          }}
        >
          {children}
        </Alert>
      </Box>
    </Fade>
  );
}
