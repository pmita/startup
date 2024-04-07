"use client" 

import Image from "next/image";
// REACT
import React, { useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
import { useSignOut } from "@/hooks/useSignOut";
import { useStorage } from "@/hooks/useStorage";
// UTILS
import { cn } from "@/utils/helpers";
import { firebaseAuth } from "@/utils/firebase";
import { AuthActionTypes } from "@/types/AuthContextTypes";

export function UpdateAvatar() {
  // STATE & HOOKS
  const { user } = useAuthState();
  const [avatarUrl, setAvatarUrl] = React.useState<string | undefined | null>(user?.photoURL);
  const { uploadFile, uploadProgress, downloadURL, isUploading } = useStorage();
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useAuthState();

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    fileUploadRef.current?.click();
  }

  const progress = uploadProgress.toFixed(0);

  const onChange = async (e: { target: { files: any[]; }; }) => {
    const file = e.target.files;
    if (file) {
      await uploadFile(file, `users/${user?.uid}/avatar`)
      
      setAvatarUrl(user?.photoURL);
      dispatch({ type: AuthActionTypes.FETCH_UPDATED_USER, payload: firebaseAuth.currentUser })
    }
  }
  
  return (
    <>
    <Card className="flex flex-col justify-center items-center">
      <CardHeader>
        <CardDescription>
          <Image
            className="rounded-[50%]"
            src={avatarUrl ?? '/images/hacker.png'}
            width={250}
            height={250}
            alt={"test"}
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="gap-5">
        <>
          <FileInput
            onChange={onChange}
            ref={fileUploadRef}
          />
          <Button
            className={cn(buttonVariants({ variant: "primary" }))}
            disabled={isUploading}
            onClick={handleClick}
          >
            {progress !== '100' ? `Progress: ${uploadProgress.toFixed(0)}%` : 'Upload Avatar'}
          </Button>
        </>
        <SignOutButton />
      </CardFooter>
    </Card>
    </>
  )
}

interface FileInputProps {
  onChange: (e: any) => void;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ onChange}, ref ) => {
  return (
    <input
      className="w-full rounded-[6px] hidden"
      id="avatar"
      type="file"
      onChange={onChange}
      ref={ref}
    />
  )
})
FileInput.displayName = "FileInput";

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