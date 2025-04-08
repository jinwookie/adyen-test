export const POST = async (request: Request) => {
  const { validationUrl } = await request.json();

  const response = await fetch(validationUrl, {
    method: "POST",
    body: JSON.stringify({
      merchantIdentifier: process.env.APPLE_MERCHANT_IDENTIFIER,
      displayName: "Bilt Rewards",
      initiative: "web",
      initiativeContext: process.env.APPLE_DOMAIN_NAME,
    }),
  });

  return response;
};
