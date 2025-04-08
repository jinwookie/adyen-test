"use client";

import { useEffect, useState } from "react";
import Pay from "./Pay";

const PayPage = () => {
  const [paymentMethods, setPaymentMethods] = useState(null);

  useEffect(() => {
    const getPaymentMethods = async () => {
      const res = await fetch(`/api/paymentMethods/test`, {
        method: "POST",
      });

      const data = await res.json();
      setPaymentMethods(data);
    };
    getPaymentMethods();
  }, []);

  if (!paymentMethods) {
    return <div>Loading...</div>;
  }

  return <Pay paymentMethodsResponse={paymentMethods} />;
};

export default PayPage;
