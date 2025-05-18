// app/api/create-checkout-session/route.ts

import paypal from '@paypal/checkout-server-sdk';

const clientId = process.env.PAYPAL_CLIENT_ID!;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!;
const environment =
  process.env.PAYPAL_ENVIRONMENT === 'live'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '100.00',
        },
      },
    ],
  });

  try {
    const response = await client.execute(request);
    return new Response(JSON.stringify({ id: response.result.id }), {
      status: 200,
    });
  } catch (err) {
    console.error('PayPal error:', err);
    return new Response('Something went wrong', { status: 500 });
  }
}
