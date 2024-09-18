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
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <label>{label}</label>
      {children}
      {error?.message && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
};
