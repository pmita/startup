
// LIBS
import { createStripeCheckoutSession } from "@/lib/checkout";

export async function POST(req: Request, res: Response) {
  const { line_items, type } = await req.json();
  try {
    const stripeSession = await createStripeCheckoutSession(type, line_items);

    if (stripeSession) {
      return new Response(JSON.stringify({ 
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