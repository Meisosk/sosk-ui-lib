import { IconButton, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export interface QuantityPickerProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  size?: "small" | "medium";
}

export function QuantityPicker({
  value,
  onChange,
  min = 1,
  max = Infinity,
  label = "quantity",
  size = "medium",
}: QuantityPickerProps) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        width: "fit-content",
        border: 1,
        borderColor: "divider",
        borderRadius: 999,
      }}
    >
      <IconButton
        size={size}
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
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
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

export default QuantityPicker;
