import { FieldError } from "react-hook-form";
export interface InputFieldProps {
  type?: string;
  placeholder?: string;
  error?: FieldError;
}