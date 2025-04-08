import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const version = process.env.CHECKOUT_API_VERSION;

  const requestBody = {
    amount: {
      currency: "USD",
      value: 1000,
    },
    reference: "Your order number",
    paymentMethod: {
      type: "scheme",
      encryptedCardNumber: "test_4111111111111111",
      encryptedExpiryMonth: "test_03",
      encryptedExpiryYear: "test_2030",
      encryptedSecurityCode: "test_737",
    },
    returnUrl: "https://bilt.com",
    merchantAccount: process.env.MERCHANT_ACCOUNT,
    ...body,
  };

  const res = await fetch(
    `https://checkout-test.adyen.com/${version}/payments`,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      // @ts-ignore
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "X-Api-Key": process.env.MOBILE_CHECKOUT_API_KEY,
      },
    }
  );
};
