"use client"

// PACKAGES
import { UseFormRegister } from "react-hook-form";

export interface InputFieldProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  validationSchema?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
  }
  error?: string; 
}

export function InputField({
  name,
  label,
  register,
  validationSchema,
  type,
  placeholder,
  error,
  ...rest
}: InputFieldProps) : JSX.Element {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-5">
      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}

      <input
        className="w-full rounded-[6px]"
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name, validationSchema)}
        {...rest}
      />

      {error && (
        <span className="text-primary-error">{error}</span>
      )}
    </div>
  )
}