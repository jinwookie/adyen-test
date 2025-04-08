export const POST = async (request: Request) => {
  const { validationUrl } = await request.json();

  const response = await fetch(validationUrl, {
    method: "POST",
    body: JSON.stringify({
      merchantIdentifier: process.env.APPLE_MERCHANT_IDENTIFIER,
      displayName: process.env.APPLE_DISPLAY_NAME,
      initiative: "web",
      initiativeContext: process.env.APPLE_DOMAIN_NAME,
    }),
  });

  return response;
};
