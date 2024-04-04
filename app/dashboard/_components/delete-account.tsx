"use client" 

// REACT
import { useState, useCallback } from "react";
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

interface IDeleteAccountForm {
  currentPassword: string;
}


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
    // STATE && VARIABLES
    const { deleteAccount, error, isLoading } = useDeleteAccount();
    const { register, handleSubmit, formState: { errors } } = useForm<IDeleteAccountForm>({
      mode: "onBlur",
      reValidateMode: "onChange",
      defaultValues: {
        currentPassword: ""
      }
    });
  
    const onSubmit: SubmitHandler<IDeleteAccountForm> = useCallback(async ({ currentPassword }) => {
      await deleteAccount(currentPassword);

      if(!error && !isLoading) {
        onClick();
      }
    }, [deleteAccount, error, isLoading, onClick]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <p>Danger Zone! This will remove all of your details and invoice records from our database</p>
        <DialogDescription>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-2.5"
          >
            <InputField
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              register={register}
              error={errors["currentPassword"]?.message}
              validationSchema={{
                required: "Password is required",
              }}
            />

            {error && (
              <span className="text-primary-error">{error}</span>
            )}

            <DialogFooter>
              <CanceDeleteAccount onClick={onClick}/>
              <Button
                className={cn(buttonVariants({ variant: "danger" }))}
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? 'Deleting...' : 'Delete Account'}
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  )
}

const CanceDeleteAccount = ({ onClick }: { onClick: () => void}) => {
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
