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
  width?: number | string;
  disableClearable?: boolean;
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
  width = 240,
  disableClearable = true,
  sx,
}: SelectFieldProps<T>) {
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
        options={options}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        value={value}
        onChange={(_, newValue) => {
          if (newValue !== null) onChange(newValue);
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
            pl: icon ? 4 : undefined,
            "& fieldset": {
              borderColor: "divider",
            },
            "&:hover": {
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              "& fieldset": {
                borderColor: "primary.main",
              },
            },
            "&.Mui-focused": {
              boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            },
          },
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </Box>
  );
}

export default Autocomplete;
