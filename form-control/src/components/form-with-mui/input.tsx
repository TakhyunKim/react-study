import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

import { FormWrapper } from "./formWrapper";

import type { TextFieldProps } from "@mui/material";
import type { FieldValues, FieldPath, ControllerProps } from "react-hook-form";

import type { FieldWrapperPassThroughProps } from "./formWrapper";

export type InputProps<T extends FieldValues, P extends FieldPath<T>> = Omit<
  TextFieldProps,
  "error"
> &
  FieldWrapperPassThroughProps &
  Omit<ControllerProps<T, P>, "render">;

export const Input = <T extends FieldValues, P extends FieldPath<T>>({
  type,
  label,
  error,
  control,
  name,
  ...props
}: InputProps<T, P>) => {
  return (
    <FormWrapper label={label} error={error}>
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, ...fieldProps } }) => (
          <TextField
            {...fieldProps}
            type={type}
            ref={ref}
            label="Email"
            variant="outlined"
            {...props}
          />
        )}
      />
    </FormWrapper>
  );
};
