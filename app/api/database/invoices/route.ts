// LIB
import { validateUser } from "@/lib/auth";
import { firestore } from "@/utils/firebase-admin";


export async function GET(req: Request) {
  // check if user is authenticated
  const user = await validateUser(req);

  if (!user) {
    return new Response(JSON.stringify({ 
      error: 'User not authenticated' 
    }), { status: 401 });
  }

  try {
    // get all invoices for a user
    const invoicesRef = await firestore.collection('users').doc(user.uid).collection('invoices').get();
    const invoices = invoicesRef.docs.map((doc) => ({
      id: doc.id,
      createdAt: doc.data().createdAt.toMillis(),
      ...doc.data(),
    }));

    if (invoices) {
      return new Response(JSON.stringify({ 
        invoices 
      }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ 
        error: 'No invoices found' 
      }), { status: 404 });
    }
  } catch(error) {
    return new Response(JSON.stringify({ 
      error: (error as Error).message 
    }));
  }
}