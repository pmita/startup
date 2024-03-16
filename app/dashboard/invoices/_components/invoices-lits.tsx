"use client"

// REACT
import { useCallback, useState } from "react"
// COMPOPNENTS
import { 
  Card,
  CardContent,
  CardFooter 
} from "@/components/ui/Card"
import { Button, buttonVariants } from "@/components/ui/Button"
// HOOKS
import { useAuthState } from "@/hooks/useAuthState"
// FIREBASE
import { firestore, fromMillis } from "@/utils/firebase"
// UTILS
import { cn } from "@/utils/helpers"
// TYPES
import { UserInvoiceDocument } from "@/types"


type UserInvoiceData = {
  invoices: UserInvoiceDocument[] | null;
}

const LIMIT = 5;
 

export function InvoicesList({ invoices }: UserInvoiceData) {
  // STATE && VARIABLES
  const [items, setItems] = useState<UserInvoiceDocument[] | null>(invoices);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [itemsEnded, setItemsEnded] = useState<boolean>(false);
  const { user } = useAuthState();  
  
  if (!items) return null;
  
  console.log(items);
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loadMore = useCallback(async () => {
    const lastItem = items[items.length - 1];
    const startAfer = typeof lastItem.created === 'number' ? fromMillis(lastItem.created) : lastItem.created;

    try {
      const dataRef = firestore.collection(`users/${user?.uid}/invoices`).orderBy('created', 'desc').startAfter(startAfer).limit(LIMIT);
      const dataDoc = (await dataRef.get()).docs.map((doc) => ({ 
        ...doc.data(), 
        id: doc.id, 
        created: doc.data().created.toMillis() 
      }));

      setItems([...items, ...dataDoc]);

      if (dataDoc.length < LIMIT) {
        setItemsEnded(true);
      }
    }catch (error) {
      setError((error as Error).message);
    }finally {
      setIsLoading(false);
    }
  }, [items, user?.uid]);


  return (
    <Card className="flex flex-col justify-center items-start">
      <CardContent className="gap-5 p-6">
        {items?.map((invoice) => {
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
        {error && <p>{error}</p>}
        {itemsEnded && (
          <Button 
            className={cn(buttonVariants({ variant: "secondary" }))}
            onClick={loadMore}
          > 
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
