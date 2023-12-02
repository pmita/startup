// UTILS
import { validateUser, getOrCreateCustomer } from "@/utils/helpers/auth";
import { createStripePortalSession } from "@/utils/helpers/stripe";


export async function POST(req: Request, res: Response) {
  // check if user is authenticated and then check their stripe cusnomer id
  const user = await validateUser(req);
  const customer = await getOrCreateCustomer(user.uid);

  if (!customer) {
    return new Response(JSON.stringify({ error: 'Failed to get customer' }), { status: 500 });
  }

  try {
    const portalSession = await createStripePortalSession(customer.id);

    if (portalSession) {
      return new Response(JSON.stringify({ 
        url: portalSession.url
      }), {status: 200 });
    } else {
      return new Response(JSON.stringify({ 
        error: { 
          statusCode: 500, 
          message: 'Stripe session is not defined'
        }}), {status: 500 });
    }
  }catch(error) {
    return new Response(JSON.stringify({ error: (error as Error).message }));
  }
}