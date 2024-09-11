import { forwardRef } from "react";

import { FormWrapper } from "./formWrapper";

import type { UseFormRegisterReturn } from "react-hook-form";

import type { FieldWrapperPassThroughProps } from "./formWrapper";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FieldWrapperPassThroughProps & {
    /**
     * react-hook-form useForm Return value
     * @see https://react-hook-form.com/api/useform/register
     */
    registration: Partial<UseFormRegisterReturn>;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, registration, label, error, ...props }, ref) => {
    return (
      <FormWrapper label={label} error={error}>
        <input type={type} ref={ref} {...registration} {...props} />
      </FormWrapper>
    );
  }
);
