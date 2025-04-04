// route for create a session for web
export async function POST(request: Request, context: any) {
  const body = await request.json();

  const fullRequest = {
    ...body,
    merchantAccount: process.env.MERCHANT_ACCOUNT,
  };

  console.log(fullRequest);

  const res = await fetch(
    `https://checkout-test.adyen.com/${process.env.CHECKOUT_API_VERSION}/sessions`,
    {
      method: "POST",
      body: JSON.stringify(fullRequest),
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "X-Api-Key": process.env.CHECKOUT_API_KEY,
      },
    }
  );

  console.log(res);

  const response = await res.json();
  return Response.json(response, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Api-Key": process.env.CHECKOUT_API_KEY ?? "",
    },
  });
}
