import { FormEvent } from "react";
import { Box, ButtonBase, IconButton, InputBase } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { toSxArray } from "../utils";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  label?: string;
  submitLabel?: string;
  clearLabel?: string;
  sx?: SxProps<Theme>;
}

export function SearchField(props: SearchFieldProps) {
  const {
    value,
    onChange,
    onSubmit,
    placeholder = "Search",
    label = "Search",
    submitLabel = "Search",
    clearLabel = "Clear search",
    sx,
  } = props;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSubmit?.(value);
  }

  return (
    <Box
      component="form"
      role="search"
      onSubmit={handleSubmit}
      sx={[
        {
          display: "flex",
          alignItems: "stretch",
          height: 44,
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          bgcolor: "background.paper",
          "&:focus-within": { borderColor: "primary.main" },
        },
        ...toSxArray(sx),
      ]}
    >
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        slotProps={{
          input: { "aria-label": label, enterKeyHint: "search" },
        }}
        sx={{ flex: 1, minWidth: 0, px: 1.5 }}
      />
      {value && (
        <IconButton
          size="small"
          aria-label={clearLabel}
          onClick={() => onChange("")}
          sx={{ alignSelf: "center", mr: 0.5 }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <ButtonBase
        type="submit"
        aria-label={submitLabel}
        sx={{
          width: 48,
          flexShrink: 0,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          "&.Mui-focusVisible": {
            outline: "2px solid",
            outlineColor: "primary.contrastText",
            outlineOffset: "-5px",
          },
        }}
      >
        <SearchIcon fontSize="small" />
      </ButtonBase>
    </Box>
  );
}

export default SearchField;
