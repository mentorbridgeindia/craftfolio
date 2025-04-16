import { Input } from "@components/ui/input";
import { ComponentProps, ReactNode } from "react";

export interface FormInputProps extends ComponentProps<typeof Input> {
  isDisplayLabel?: boolean;
  label?: string;
  isRequired?: boolean;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  hintText?: string;
  helperText?: string;
  isError?: boolean;
  errorMessage?: ReactNode;
}
