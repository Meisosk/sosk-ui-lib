import { ReactNode } from "react";
import {
  Autocomplete as MuiAutocomplete,
  Box,
  InputAdornment,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { TextField } from "./Form/TextField";
import { toSxArray } from "../utils";

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
  variant = "card",
  size = "medium",
  sx,
}: SelectFieldProps<T>) {
  const isMinimal = variant === "minimal";

  return (
    <Box sx={[{ width }, ...toSxArray(sx)]}>
      <MuiAutocomplete<T, false, boolean>
        disableClearable
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
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            slotProps={{
              ...params.slotProps,
              input: {
                ...params.slotProps.input,
                startAdornment: icon ? (
                  <InputAdornment
                    position="start"
                    sx={{ color: "text.secondary" }}
                  >
                    {icon}
                  </InputAdornment>
                ) : (
                  params.slotProps.input.startAdornment
                ),
              },
            }}
          />
        )}
      />
    </Box>
  );
}

export default Autocomplete;
