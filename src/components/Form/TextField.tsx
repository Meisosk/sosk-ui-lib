import React from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  InputAdornment,
} from "@mui/material";

type BaseProps = Omit<MuiTextFieldProps, "variant" | "value" | "onChange"> & {
  variant?: MuiTextFieldProps["variant"];
};

type TextProps = BaseProps & {
  price?: false;
  value?: MuiTextFieldProps["value"];
  onChange?: MuiTextFieldProps["onChange"];
};

type PriceProps = BaseProps & {
  price: true;
  value: number;
  onChange: (value: number) => void;
  currencySymbol?: string;
};

export type TextFieldProps = TextProps | PriceProps;

/**
 * TextField wrapper that standardizes the label/error/helperText/fullWidth
 * pattern used across forms, and doubles as a currency input when `price`
 * is set — emitting a plain number via onChange instead of a raw change
 * event, and rendering the currency adornment through the MUI v9
 * slotProps API (InputProps -> slotProps.input) in one place instead of
 * at every call site.
 */
export function TextField(props: TextFieldProps) {
  const { fullWidth = true, ...rest } = props;

  if (rest.price) {
    const { price, value, onChange, currencySymbol = "$", ...others } = rest;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "") {
        onChange(0);
        return;
      }
      const parsed = Number(raw);
      if (!Number.isNaN(parsed)) onChange(parsed);
    };

    return (
      <MuiTextField
        {...others}
        fullWidth={fullWidth}
        type="number"
        value={value === 0 ? "" : value}
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">{currencySymbol}</InputAdornment>
            ),
          },
          htmlInput: { min: 0, step: "0.01" },
        }}
      />
    );
  }

  const { price, ...others } = rest;
  return <MuiTextField {...others} fullWidth={fullWidth} />;
}
