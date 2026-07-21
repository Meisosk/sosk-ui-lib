import React, { forwardRef, useId } from "react";
import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";

type BaseProps = Omit<
  MuiTextFieldProps,
  "variant" | "value" | "onChange" | "label"
> & {
  variant?: MuiTextFieldProps["variant"];
  label?: string;
};
type TextProps = BaseProps & {
  price?: false;
  value?: MuiTextFieldProps["value"];
  onChange?: MuiTextFieldProps["onChange"];
};

type PriceProps = BaseProps & {
  price: true;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  currencySymbol?: string;
};

export type TextFieldProps = TextProps | PriceProps;

/**
 * TextField wrapper that standardizes the label/error/helperText/fullWidth
 * pattern used across forms, renders the label as static text above the
 * field (rather than MUI's floating/notched label), and doubles as a
 * currency input when `price` is set — emitting a plain number (or
 * undefined when cleared) via onChange instead of a raw change event, and
 * rendering the currency adornment through the MUI v9 slotProps API
 * (InputProps -> slotProps.input) in one place instead of at every call
 * site.
 */
export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  function TextField(props, ref) {
    const { fullWidth = true, label, ...rest } = props;

    const generatedId = useId();
    const inputId = rest.id ?? generatedId;

    const wrap = (field: React.ReactNode) => (
      <Box sx={{ width: fullWidth ? "100%" : "auto" }}>
        {label && (
          <Typography
            component="label"
            htmlFor={inputId}
            variant="body2"
            sx={{ display: "block", mb: 0.5, fontWeight: 500 }}
          >
            {label}
            {rest.required && (
              <Typography
                component="span"
                sx={{ color: "error.main", ml: 0.5 }}
              >
                *
              </Typography>
            )}
          </Typography>
        )}
        {field}
      </Box>
    );

    if (rest.price) {
      const {
        price,
        value,
        onChange,
        currencySymbol = "$",
        slotProps,
        ...others
      } = rest;

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        if (raw === "") {
          onChange(undefined);
          return;
        }
        const parsed = Number(raw);
        if (!Number.isNaN(parsed)) onChange(parsed);
      };

      return wrap(
        <MuiTextField
          {...others}
          id={inputId}
          ref={ref}
          fullWidth={fullWidth}
          type="number"
          value={value ?? ""}
          onChange={handleChange}
          hiddenLabel
          slotProps={{
            ...slotProps,
            input: {
              ...slotProps?.input,
              startAdornment: (
                <InputAdornment position="start">
                  {currencySymbol}
                </InputAdornment>
              ),
            },
            htmlInput: { min: 0, step: "0.01", ...slotProps?.htmlInput },
            formHelperText: { sx: { mx: 0 }, ...slotProps?.formHelperText },
          }}
        />
      );
    }

    const { price, slotProps, ...others } = rest;
    return wrap(
      <MuiTextField
        {...others}
        id={inputId}
        ref={ref}
        fullWidth={fullWidth}
        hiddenLabel
        slotProps={{
          ...slotProps,
          formHelperText: { sx: { mx: 0 }, ...slotProps?.formHelperText },
        }}
      />
    );
  }
);

export default TextField;
