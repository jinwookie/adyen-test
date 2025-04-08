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

  console.log(response);
  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    return Response.json(error, {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const data = await response.json();
  console.log(data);
  return Response.json(data, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
