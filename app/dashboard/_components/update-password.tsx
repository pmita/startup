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
// UTILS
import { cn } from "@/utils/helpers";
import { set } from "date-fns";

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
        <UpdatePasswordButton onClick={() => setIsOpen(true)} />
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

export function UpdatePasswordButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      className={cn(buttonVariants({ variant: "secondary" }))}
      onClick={onClick}
    >
      Update Password
    </Button>
  )
}

export function UpdatePasswordDialog({ onClick }: { onClick: () => void }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Password</DialogTitle>
        <DialogDescription>
          Update your password. This will only affect email and password login
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
          onClick={onClick}
        >
          Update Password
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}