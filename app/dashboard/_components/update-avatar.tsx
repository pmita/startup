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
import { SignOutButton } from "@/components/sign-out";
// HOOKS
import { useAuthState } from "@/hooks/useAuthState";
import { useStorage } from "@/hooks/useStorage";
// UTILS
import { cn } from "@/utils/helpers";
import { firebaseAuth } from "@/utils/firebase";
// TYPES
import { AuthActionTypes } from "@/types/AuthContextTypes";

export function UpdateAvatar() {
  // STATE & HOOKS
  const { user } = useAuthState();
  const [avatarUrl, setAvatarUrl] = React.useState<string | undefined | null>(user?.photoURL);
  const { uploadFile, uploadProgress, isUploading } = useStorage();
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
      const storageRef = await uploadFile(file, `users/${user?.uid}/avatar`)

      await firebaseAuth.currentUser?.updateProfile({
        photoURL: await storageRef.getDownloadURL()
      })
      
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
            {isUploading || progress !== '100' ? `Progress: ${uploadProgress.toFixed(0)}%` : 'Upload Avatar'}
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