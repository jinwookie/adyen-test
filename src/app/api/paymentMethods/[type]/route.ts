import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const searchParams = request.nextUrl.searchParams;
  const v = searchParams.get("v"); // Get the value of the 'query' parameter

  const fullRequest = {
    merchantAccount: process.env.MERCHANT_ACCOUNT,
  };

  let apiKey = process.env.CHECKOUT_API_KEY;

  const { type } = await params;

  if (type === "mobile") {
    apiKey = process.env.MOBILE_CHECKOUT_API_KEY;
    fullRequest.merchantAccount = process.env.MOBILE_MERCHANT_ACCOUNT;
  }

  if (type === "test") {
    apiKey = process.env.TEST_CHECKOUT_API_KEY;
    fullRequest.merchantAccount = process.env.TEST_MERCHANT_ACCOUNT;
  }

  const version = v ?? process.env.CHECKOUT_API_VERSION;

  console.log(apiKey);
  console.log(fullRequest);
  console.log(version);

  const res = await fetch(
    `https://checkout-test.adyen.com/${version}/paymentMethods`,
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
  console.log(response);
  return Response.json(response, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Api-Key": process.env.CHECKOUT_API_KEY ?? "",
    },
  });
}
