
// LIB
import { validateUser, getOrCreateCustomer } from "@/lib/auth";
import { createStripeCheckoutSession } from "@/utils/helpers/stripe";

export async function POST(req: Request) {
  const { line_items, type } = await req.json();
  // check if user is authenticated and then check their stripe cusnomer id
  const user = await validateUser(req);
  const customer = await getOrCreateCustomer(user.uid);

  try {
    // create a new stripe checkout
    const stripeSession = await createStripeCheckoutSession(customer.id, user, type, line_items);

    if (stripeSession) {
      // if user is authenticated we return the stripe checkout url
      return new Response(JSON.stringify({ 
        sessionId: stripeSession.id,
        url: stripeSession.url 
      }), {status: 200 });
    } else {
      // if user un-authed simply return an error
      return new Response(JSON.stringify({ 
        error: { 
          statusCode: 500, 
          message: 'Stripe session is not defined'
        }}), {status: 500 });
    }
  } catch(error) {
    return new Response(JSON.stringify({ error: (error as Error).message }));
  }
}