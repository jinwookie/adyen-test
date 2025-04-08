export const POST = async (request: Request) => {
  const requestBody = await request.json();
  console.log(requestBody);

  const body = {
    merchantIdentifier: process.env.APPLE_MERCHANT_IDENTIFIER,
    displayName: "Bilt Rewards",
    initiative: "web",
    initiativeContext: process.env.APPLE_DOMAIN_NAME,
  };

  console.log(body);

  const response = await fetch(requestBody.validationURL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);
  if (!response.ok) {
    const error = await response.text();
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
