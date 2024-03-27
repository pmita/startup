"use client" 

// REACT
import { useState } from "react";
// COMPONENTS
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
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { InputField } from "@/components/input-field";
// HOOKS
import { useDeleteAccount } from "@/hooks/useDeleteAccount";
// PACKAGES
import { useForm, SubmitHandler} from "react-hook-form";
// UTILS
import { cn } from "@/utils/helpers";

export function DeleteAccount() {
  // STATE && VARIABLES
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold">Delete Account</CardTitle>
          <CardDescription>
            You are now in danger zone. This will remove all of your details and invoice records from our database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className={cn(buttonVariants({ variant: "danger" }))}
            onClick={() => setIsOpen(true)}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
    
      {isOpen && (
        <DeleteAccountDialog 
          onClick={() => setIsOpen(false)} 
        />
      
      )}
    </>
  )
}

export function DeleteAccountDialog({ onClick }: { onClick: () => void }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Danger Zone! This will remove all of your details and invoice records from our database
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          className={cn(buttonVariants({ variant: "dangerOutlined" }))}
          onClick={onClick}
        >
          Cancel
        </Button>
        <Button
          className={cn(buttonVariants({ variant: "danger" }))}
          type="submit"
        >
          Delete Account
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

interface IDeleteAccountForm {
  currentPassword: string;
}
interface IDeleteAccountFormErrors {
  currentPassword: string;
}

export const DeleteAccountForm = () => {
  // STATE && VARIABLES
  const { deleteAccount, error, isLoading } = useDeleteAccount();
  const { register, handleSubmit, formState: { errors } } = useForm<IDeleteAccountForm>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      currentPassword: ""
    }
  });

  const onSubmit: SubmitHandler<IDeleteAccountForm> = ({ currentPassword }) => {
    deleteAccount(currentPassword);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        name="currentPassword"
        type="password"
        placeholder="Enter your password to confirm deletion"
        register={register}
        error={errors["currentPassword"]?.message}
        validationSchema={{
          required: "Password is required",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: "Password must contain at least one uppercase letter, one lowercase letter and one number",
          }
        }}
      />

      {error && (
        <span className="text-primary-error">{error}</span>
      )}

      <Button
        className={cn(buttonVariants({ variant: "danger" }))}
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? 'Deleting...' : 'Delete Account'}
      </Button>
    </form>
  )
}
