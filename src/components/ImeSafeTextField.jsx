import { forwardRef } from "react";
import { TextField } from "@mui/material";

const ImeSafeTextField = forwardRef(function ImeSafeTextField(
  { sx, ...props },
  ref
) {
  return (
    <TextField
      {...props}
      inputRef={ref}
      sx={sx}
    />
  );
});

export default ImeSafeTextField;
