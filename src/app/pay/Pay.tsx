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
  paymentMethodsResponse: any;
};

const Pay = ({ paymentMethodsResponse }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const applePayContainerRef = useRef<HTMLDivElement>(null);
  const googlePayContainerRef = useRef<HTMLDivElement>(null);

  console.log(paymentMethodsResponse);

  useEffect(() => {
    const initAdyen = async () => {
      const config: CoreConfiguration = {
        environment: "test",
        paymentMethodsResponse,
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
        onSubmit(state, component, actions) {
          console.log("submit", state, component, actions);
          actions.resolve({
            resultCode: "Authorised",
          });
        },
        onPaymentCompleted: (state, component) => {
          console.log("completed", state);
        },
        onPaymentFailed: (state, component) => {
          console.log("failed", state);
        },
      };

      const checkout = await AdyenCheckout(config);

      const paymentMethods = paymentMethodsResponse?.paymentMethods;
      console.log(paymentMethods);

      const cardConfig: CardConfiguration = {
        showPayButton: true,
        ...paymentMethods.card,
        billingAddressRequired: true,
        billingAddressMode: "partial",
        billingAddressRequiredFields: ["postalCode", "country"],
        billingAddressAllowedCountries: ["US", "CA"],
      };

      const applePayConfig: ApplePayConfiguration = {
        showPayButton: true,
        ...paymentMethods.applePay,
        // configuration: {
        //   merchantName: "AdyenOrg",
        //   merchantId: "merchant.com.adyen.test",
        // },
        onValidateMerchant: async (resolve, reject, validationURL) => {
          try {
            const response = await fetch("/api/apple/validate", {
              method: "POST",
              body: JSON.stringify({ validationURL }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await response.json();
            resolve(data);
          } catch (error) {
            reject(error);
          }
        },
      };

      const googlePayConfig: GooglePayConfiguration = {
        showPayButton: true,
        ...paymentMethods.googlePay,
        // configuration: {
        //   gatewayMerchantId: "merchant.com.adyen.test",
        //   merchantId: "merchant.com.adyen.test",
        //   merchantName: "AdyenOrg",
        //   merchantOrigin: "https://adyen.com",
        // },
      };

      const card = new Card(checkout, cardConfig);
      card.mount(containerRef.current as HTMLElement);

      const applePay = new ApplePay(checkout, applePayConfig);
      applePay.mount(applePayContainerRef.current as HTMLElement);

      const googlePay = new GooglePay(checkout, googlePayConfig);
      googlePay.mount(googlePayContainerRef.current as HTMLElement);
    };

    initAdyen();
  }, [paymentMethodsResponse]);
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
