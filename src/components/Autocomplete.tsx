import { ReactNode } from "react";
import { Autocomplete as MuiAutocomplete, Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { TextField } from "./Form/TextField";

export interface SelectFieldProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getOptionLabel: (option: T) => string;
  isOptionEqualToValue: (option: T, value: T) => boolean;
  label: string;
  icon?: ReactNode;
  popupIcon?: ReactNode;
  width?: number | string;
  disableClearable?: boolean;
  variant?: "card" | "minimal";
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
}

export function Autocomplete<T>({
  options,
  value,
  onChange,
  getOptionLabel,
  isOptionEqualToValue,
  label,
  icon,
  popupIcon,
  width = 240,
  disableClearable = true,
  variant = "card",
  size = "medium",
  sx,
}: SelectFieldProps<T>) {
  const isMinimal = variant === "minimal";

  return (
    <Box sx={{ position: "relative", width, ...sx }}>
      {icon && (
        <Box
          sx={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "text.secondary",
            zIndex: 1,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      )}
      <MuiAutocomplete<T, false, boolean>
        disableClearable={disableClearable}
        size={size}
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        value={value}
        popupIcon={popupIcon}
        onChange={(_, newValue) => {
          if (newValue !== null) onChange(newValue);
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: isMinimal ? 1 : 3,
            bgcolor: "transparent",
            boxShadow: isMinimal ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
            pl: icon ? 4 : undefined,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Box>
  );
}

export default Autocomplete;
