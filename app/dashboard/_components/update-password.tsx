"use client" 

// REACT
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { InputField } from "@/components/input-field";
// HOOKS
import { useUpdatePassword } from "@/hooks/useUpdatePassword";
// PACKAGES
import { useForm, SubmitHandler } from "react-hook-form";
// CONFIG
import { updatePasswordInputs } from "@/config/forms";
// UTILS
import { cn } from "@/utils/helpers";

export function UpdatePassword() {
  // STATE && VARIABLES
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Password</CardTitle>
        <CardDescription>
          Update your password. This will only affect email and password login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className={cn(buttonVariants({ variant: "secondary" }))}
          onClick={() => setIsOpen(true)}
        >
          Update Password
        </Button>
      </CardContent>
    </Card>
    
    {isOpen && (
      <UpdatePasswordDialog 
        onClick={() => setIsOpen(false)} 
      />
    )}
    </>
  )
}

export function UpdatePasswordDialog({ onClick }: { onClick: () => void }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Password</DialogTitle>
        <DialogDescription>
          Update your password. This will only affect email and password login
          <UpdatePasswordForm />
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          className={cn(buttonVariants({ variant: "secondaryOutlined" }))}
          onClick={onClick}
        >
          Cancel
        </Button>
        <Button
          className={cn(buttonVariants({ variant: "secondary" }))}
          type="submit"
        >
          Update Password
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

interface IUpdatePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IUpdatePasswordFormErrors {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const UpdatePasswordForm = () => {
  const { updatePassword, isLoading, error } = useUpdatePassword();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<IUpdatePasswordForm> = ({ currentPassword, newPassword, confirmPassword }) => {
    updatePassword(currentPassword, newPassword, confirmPassword);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      {updatePasswordInputs && updatePasswordInputs.map((input) => (
        <InputField
          key={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          register={register}
          validationSchema={input.validationSchema}
          error={errors[input.name as keyof IUpdatePasswordFormErrors]?.message}
        />
      ))}

      {error && (
        <span className="text-primary-error">{error}</span>
      )}

      {/* TODO: Extract this form directly into the Dialog component */}
      <Button
        className={cn(buttonVariants({ variant: "secondary" }))}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Updating...' : 'Update Password'}
      </Button>
    </form>
  )
}