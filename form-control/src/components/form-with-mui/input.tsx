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
        name={name}
        control={control}
        render={({ field: { ref, ...fieldProps } }) => (
          <TextField
            type={type}
            inputRef={ref}
            label={label}
            variant="outlined"
            {...fieldProps}
            {...props}
          />
        )}
      />
    </FormWrapper>
  );
};
