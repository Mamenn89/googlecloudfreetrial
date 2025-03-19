import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalCheckoutProps {
  amount: string;
  currency: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export const PaypalCheckout = ({ amount, currency, onSuccess, onError }: PaypalCheckoutProps) => {
  const [isPending, setIsPending] = useState(false);
  
  useEffect(() => {
    console.log("PayPal clientId:", import.meta.env.VITE_NEXT_PUBLIC_PAYPAL_CLIENT_ID);
    console.log("PayPal amount:", amount);
    console.log("PayPal currency:", currency);
  }, [amount, currency]);

  return (
    <PayPalScriptProvider
      options={{
        clientId: "AfdAu9IQF4LP5bLlCF4e8ABMRr0l23q0s6jU-M39VuhDrffk9DDUOTXJEHtYg69PRC8cWvhIBtZrC-jh",
        currency: currency,
        intent: "capture",
      }}
    >
      {isPending && <div className="text-center py-4">Loading PayPal...</div>}
      
      <div className="w-full overflow-hidden">
        <PayPalButtons
          style={{
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 45,
            layout: "vertical"
          }}
          createOrder={(data, actions) => {
            console.log("Creating PayPal order");
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              console.log("Order approved", data);
              if (actions.order) {
                const details = await actions.order.capture();
                onSuccess(details);
              }
            } catch (error) {
              console.error("Capture error", error);
              onError(error);
            }
          }}
          onError={(err) => {
            console.error("PayPal error", err);
            onError(err);
          }}
          onInit={() => {
            console.log("PayPal initialized");
            setIsPending(false);
          }}
          onCancel={() => {
            console.log("Payment cancelled");
            // Handle cancellation if needed
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout; 