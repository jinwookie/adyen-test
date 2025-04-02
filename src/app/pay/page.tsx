"use client";

import { useEffect, useState } from "react";
import Pay from "./Pay";

const PayPage = () => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const res = await fetch(`/session`, {
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
      setSessionData(data);
    };
    getSession();
  }, []);

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return <Pay sessionData={sessionData} />;
};

export default PayPage;
