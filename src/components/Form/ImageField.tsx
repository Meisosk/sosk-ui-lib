import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Avatar,
  FormHelperText,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

export type ImageFieldValue = {
  base64: string;
  fileName: string;
  fileType: string;
  fileSize: number;
};

type ImageFieldProps = {
  label?: string;
  value?: ImageFieldValue | null;
  onChange: (value: ImageFieldValue | null) => void;
  error?: boolean;
  helperText?: string;
  maxSizeMB?: number;
  disabled?: boolean;
};

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function ImageField({
  label = "Image",
  value,
  onChange,
  error,
  helperText,
  maxSizeMB = 5,
  disabled = false,
}: ImageFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      setLocalError(null);

      if (!file.type.startsWith("image/")) {
        setLocalError("Only image files are allowed.");
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setLocalError(`Image must be smaller than ${maxSizeMB}MB.`);
        return;
      }

      try {
        const base64 = await fileToBase64(file);
        onChange({
          base64,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        });
      } catch {
        setLocalError("Failed to read the image file.");
      }
    },
    [maxSizeMB, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (disabled) return;

      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [disabled, processFile]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // reset so selecting the same file again still fires onChange
    e.target.value = "";
  };

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setLocalError(null);
  };

  const displayError = error || Boolean(localError);
  const displayHelperText = localError || helperText;

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>

      <Paper
        variant="outlined"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          p: 3,
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: displayError
            ? "error.main"
            : isDragging
            ? "primary.main"
            : "divider",
          bgcolor: isDragging ? "action.hover" : "background.paper",
          opacity: disabled ? 0.5 : 1,
          transition: "border-color 0.15s, background-color 0.15s",
          "&:hover": disabled
            ? undefined
            : { borderColor: "primary.main", bgcolor: "action.hover" },
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          disabled={disabled}
          onChange={handleInputChange}
        />

        {value ? (
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Avatar
              src={value.base64}
              variant="rounded"
              sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ textAlign: "left", minWidth: 0 }}>
              <Typography variant="body2" noWrap sx={{ maxWidth: 220 }}>
                {value.fileName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {(value.fileSize / 1024).toFixed(1)} KB
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleRemove} disabled={disabled}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <Stack spacing={1} sx={{ alignItems: "center" }}>
            <CloudUploadIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              Drag & drop an image here, or click to browse
            </Typography>
          </Stack>
        )}
      </Paper>

      {displayHelperText && (
        <FormHelperText error={displayError}>
          {displayHelperText}
        </FormHelperText>
      )}
    </Box>
  );
}
