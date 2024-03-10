// LIB
import { validateUser } from "@/lib/auth";
import { firestore } from "@/utils/firebase-admin";
// TYPES
import { type FirestoreQuery, type FirestoreOrderBy } from "@/types/index";


export async function GET(req: Request) {
  // check if user is authenticated
  // const { limit, _query, _orderBy, cursor } = await req.json();
  const user = await validateUser(req);
  let limit = 5;

  if (!user) {
    return new Response(JSON.stringify({ 
      error: 'User not authenticated' 
    }), { status: 401 });
  }

  try {
    // get all invoices for a user
    const invoicesRef = firestore.collection('users')
     .doc(user.uid)
     .collection('invoices')
     .orderBy('createdAt', 'desc')
     .limit(limit);

    // if (limit) {
    //   invoicesRef.limit(limit);
    // }

    // if (_query) {
    //   invoicesRef.where(...(_query as FirestoreQuery));
    // }

    // if (_orderBy) {
    //   invoicesRef.orderBy(...(_orderBy as FirestoreOrderBy));
    // }

    // if (cursor) {
    //   invoicesRef.startAfter(cursor);
    // }

    const invoices = (await invoicesRef.get()).docs.map((doc) => ({
      id: doc.id,
      createdAt: doc.data().createdAt.toMillis(),
      ...doc.data(),
    }));

    if (invoices) {
      return new Response(JSON.stringify({ invoices }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'No invoices found' }), { status: 404 });
    }
  } catch(error) {
    return new Response(JSON.stringify({ error: (error as Error).message }));
  }
}