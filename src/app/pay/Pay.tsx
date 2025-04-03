"use client";

import {
  AdyenCheckout,
  ApplePay,
  ApplePayConfiguration,
  Card,
  CardConfiguration,
  CoreConfiguration,
  GooglePay,
  GooglePayConfiguration,
} from "@adyen/adyen-web";
import "@adyen/adyen-web/styles/adyen.css";
import { useEffect, useRef } from "react";

type Props = {
  sessionData: any;
};

const Pay = ({ sessionData }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const applePayContainerRef = useRef<HTMLDivElement>(null);
  const googlePayContainerRef = useRef<HTMLDivElement>(null);

  console.log(sessionData);

  useEffect(() => {
    const initAdyen = async () => {
      const config: CoreConfiguration = {
        environment: "test",
        session: {
          id: sessionData.id,
          sessionData: sessionData.sessionData,
        },
        clientKey: process.env.NEXT_PUBLIC_CHECKOUT_API_KEY,
        countryCode: "US",
        amount: {
          value: 1000,
          currency: "USD",
        },
        locale: "en-US",
        analytics: {
          enabled: false,
        },
        onPaymentCompleted: (state, component) => {
          console.log("completed", state);
        },
        onPaymentFailed: (state, component) => {
          console.log("failed", state);
        },
      };

      const checkout = await AdyenCheckout(config);

      const cardConfig: CardConfiguration = {
        showPayButton: true,
        billingAddressRequired: true,
        billingAddressMode: "partial",
        billingAddressRequiredFields: ["postalCode", "country"],
        billingAddressAllowedCountries: ["US", "CA"],
      };

      const applePayConfig: ApplePayConfiguration = {
        showPayButton: true,
        configuration: {
          merchantName: "AdyenOrg",
          merchantId: "merchant.com.adyen.test",
        },
      };

      const googlePayConfig: GooglePayConfiguration = {
        showPayButton: true,
        configuration: {
          gatewayMerchantId: "merchant.com.adyen.test",
          merchantId: "merchant.com.adyen.test",
          merchantName: "AdyenOrg",
          merchantOrigin: "https://adyen.com",
        },
      };

      const card = new Card(checkout, cardConfig);
      card.mount(containerRef.current as HTMLElement);

      const applePay = new ApplePay(checkout, applePayConfig);
      applePay.mount(applePayContainerRef.current as HTMLElement);

      const googlePay = new GooglePay(checkout, googlePayConfig);
      googlePay.mount(googlePayContainerRef.current as HTMLElement);
    };

    initAdyen();
  }, [sessionData]);
  return (
    <div className="flex flex-col gap-4">
      <h1>Pay</h1>

      <div ref={containerRef}></div>
      <div ref={applePayContainerRef}></div>
      <div ref={googlePayContainerRef}></div>
    </div>
  );
};

export default Pay;
