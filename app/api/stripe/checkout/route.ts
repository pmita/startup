
// LIBS
import { createStripeCheckoutSession } from "@/lib/checkout";
import { validateUser } from "@/lib/auth-admin";

export async function POST(req: Request) {
  const { line_items, type } = await req.json();
  // check if user is authenticated
  const user = await validateUser(req);

  try {
    const stripeSession = await createStripeCheckoutSession(user, type, line_items);

    if (stripeSession) {
      return new Response(JSON.stringify({ 
        sessionId: stripeSession.id,
        url: stripeSession.url 
      }), {status: 200 });
    } else {
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