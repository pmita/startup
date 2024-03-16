"use client" 

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/Card";
import { Button, buttonVariants } from "@/components/ui/Button";
// UTILS
import { cn } from "@/utils/helpers";

export function DeleteAccount() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Delete Account</CardTitle>
        <CardDescription>
          You are now in danger zone. This will remove all of your details and invoice records from our database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteAccountButton />
      </CardContent>
    </Card>
  )
}

export function DeleteAccountButton() {
  return (
    <Button
      className={cn(buttonVariants({ variant: "danger" }))}
    >
      Update Password
    </Button>
  )
}