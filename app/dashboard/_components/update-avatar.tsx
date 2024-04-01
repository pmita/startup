"use client" 

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar } from '@/components/avatar';
// UTILS
import { cn } from "@/utils/helpers";
import { useAuthState } from "@/hooks/useAuthState";
import { useSignOut } from "@/hooks/useSignOut";
import { useForm } from "react-hook-form";
import { useStorage } from "@/hooks/useStorage";
import { Input } from "postcss";
import { InputField } from "@/components/input-field";

export function UpdateAvatar() {
  // STATE & HOOKS
  const { user } = useAuthState();
  
  return (
    <>
    <Card className="flex flex-col justify-center items-center">
      <CardHeader>
        <CardDescription>
          <Avatar
            src={'/${user?.photoURL}'}
            width={250}
            height={250}
            altText={user?.displayName ?? 'John Doe'}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignOutButton />
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
    </>
  )
}

export const UploadNewAvatarImg = () => {
  // STATE && VARIABLES
  const { user } = useAuthState();
  const { uploadFile, uploadProgress, downloadURL, isUploading } = useStorage();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      avatar: null
    }
  });

  const onChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file, `users/${user?.uid}/avatar`);
    }
  }

  return (
    <form>
      <InputField
        name="avatar"
        type="file"
        register={register}
        onChange={onChange}
      />  
      <Button
        className={cn(buttonVariants({ variant: "primary" }))}
        disabled={isUploading}
        type="submit"
      >
        {isUploading ? 'Uploading...' : 'Upload Avatar'}
      </Button>
    </form>
  )
}

export function SignOutButton() {
  // STATE & HOOKS
  const { signOut, isLoading } = useSignOut();
  
  return (
    <Button
      className={cn(buttonVariants({ variant: "primary" }))}
      onClick={signOut}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Sign Out'}
    </Button>
  )
}