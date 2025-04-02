import Pay from "./Pay";

const PayPage = async () => {
  const res = await fetch("http://localhost:3001/session", {
    method: "POST",
    body: JSON.stringify({
      amount: { value: 1000, currency: "USD" },
      countryCode: "US",
      merchantAccount: "AdyenOrg",
      reference: "test-reference",
      returnUrl: "http://localhost:3000/pay",
    }),
  });

  const data = await res.json();

  return <Pay sessionData={data} />;
};

export default PayPage;
