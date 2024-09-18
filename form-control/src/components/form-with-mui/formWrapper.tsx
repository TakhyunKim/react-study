import { Box, Typography } from "@mui/material";

import type { ReactNode } from "react";
import type { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  children: ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FormWrapper = ({ label, children, error }: FieldWrapperProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography component="label" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      {children}
      {error?.message && (
        <Typography sx={{ color: "red" }}>{error.message}</Typography>
      )}
    </Box>
  );
};
