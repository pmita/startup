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

export function UpdateAddress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold">Address</CardTitle>
        <CardDescription>
          Update your address record. This will reflect on your billing information with stripe
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateAddressButton />
      </CardContent>
    </Card>
  )
}

export function UpdateAddressButton() {
  return (
    <Button
      className={cn(buttonVariants({ variant: "secondary" }))}
    >
      Update Password
    </Button>
  )
}