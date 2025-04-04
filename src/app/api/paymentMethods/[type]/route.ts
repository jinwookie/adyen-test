export async function POST(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const fullRequest = {
    merchantAccount: process.env.MERCHANT_ACCOUNT,
  };

  let apiKey = process.env.CHECKOUT_API_KEY;

  const { type } = await params;

  if (type === "mobile") {
    apiKey = process.env.MOBILE_CHECKOUT_API_KEY;
  }

  console.log(apiKey);
  console.log(fullRequest);

  const res = await fetch(
    `https://checkout-test.adyen.com/${process.env.CHECKOUT_API_VERSION}/paymentMethods`,
    {
      method: "POST",
      body: JSON.stringify(fullRequest),
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
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
