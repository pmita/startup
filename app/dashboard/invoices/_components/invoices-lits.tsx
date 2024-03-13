"use client"

// COMPOPNENTS
import { 
  Card,
  CardContent,
  CardFooter 
} from "@/components/ui/Card"
import { Button, buttonVariants } from "@/components/ui/Button"
// UTILS
import { cn } from "@/utils/helpers"
import { UserInvoiceDocument } from "@/types"

type UserInvoiceData = {
  invoices: UserInvoiceDocument[] | null;
}
 

export function InvoicesList({
  invoices
}: UserInvoiceData) {
  console.log(invoices)

  if (!invoices) return null;

  return (
    <Card className="flex flex-col justify-center items-start">
      <CardContent className="gap-5 p-6">
        {invoices?.map((invoice) => {
          return (
            <li key={invoice?.id} className="list-none">
                <p>
                  <span>{invoice.id}</span>
                  {`for ${invoice?.amount_paid} on ${invoice?.created}`}
              </p>
            </li>
          )
        })}
      </CardContent>
      <CardFooter>
        <Button 
          className={cn(buttonVariants({ variant: "secondary" }))}
        > Load More
        </Button>
      </CardFooter>
    </Card>
  )
}