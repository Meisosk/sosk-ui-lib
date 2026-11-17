import { IconButton, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { toSxArray } from "../utils";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: "small" | "medium";
  shape?: "pill" | "rounded";
  sx?: SxProps<Theme>;
}

export function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = Infinity,
  label = "quantity",
  size = "medium",
  shape = "pill",
  sx,
}: QuantityPickerProps) {
  const buttonSx = shape === "rounded" ? { borderRadius: 1 } : undefined;

  return (
    <Stack
      direction="row"
      sx={[
        {
          alignItems: "center",
          width: "fit-content",
          border: 1,
          borderColor: "divider",
          borderRadius: shape === "rounded" ? 1 : 999,
        },
        ...toSxArray(sx),
      ]}
    >
      <IconButton
        size={size}
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        sx={buttonSx}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography
        component="output"
        aria-label={label}
        sx={{ minWidth: 32, textAlign: "center", fontWeight: 600 }}
      >
        {value}
      </Typography>
      <IconButton
        size={size}
        aria-label={`Increase ${label}`}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        sx={buttonSx}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

export default QuantityPicker;
