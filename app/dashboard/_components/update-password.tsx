"use client" 

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
// UTILS
import { cn } from "@/utils/helpers";

export function UpdatePassword() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Password</CardTitle>
        <CardDescription>
          Update your password. This will only affect email and password login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdatePasswordButton />
      </CardContent>
    </Card>
  )
}

export function UpdatePasswordButton() {
  return (
    <Button
      className={cn(buttonVariants({ variant: "secondary" }))}
    >
      Update Password
    </Button>
  )
}