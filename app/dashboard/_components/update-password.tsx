"use client" 

// REACT
import { useState, useCallback } from "react";
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
    // STATE && VARIABLES
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
  
    const onSubmit: SubmitHandler<IUpdatePasswordForm> = useCallback(async ({ currentPassword, newPassword, confirmPassword }) => {
      await updatePassword(currentPassword, newPassword, confirmPassword);

      if(!error && !isLoading) {
        onClick();
      }
    }, [error, isLoading, onClick, updatePassword]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Password</DialogTitle>
        <p>Update your password. This will only affect email and password login</p>
        <DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-2.5"
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

            <DialogFooter>
                <CancelUpdatePassword onClick={onClick} />
                <Button
                className={cn(buttonVariants({ variant: "secondary" }))}
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

const CancelUpdatePassword = ({ onClick }: { onClick: () => void}) => {
  return (
    <Button
      className={cn(buttonVariants({ variant: "secondaryOutlined" }))}
      onClick={onClick}
      type="button"
    >
      Cancel
    </Button>
  );
}