import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalCheckoutProps {
  amount: string;
  currency: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export const PaypalCheckout = ({ amount, currency, onSuccess, onError }: PaypalCheckoutProps) => {
  const [isPending, setIsPending] = useState(false);

  return (
    <PayPalScriptProvider
      options={{
        clientId: "AetzPGCgCVt4xKubMCORk0mhJY2OM2PWgs0hHTCwcw-IeLQ_vLbOZ-k2SFFaTVFHSN_18ZWKfIV-I8V8",
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
              if (actions.order) {
                const details = await actions.order.capture();
                onSuccess(details);
              }
            } catch (error) {
              onError(error);
            }
          }}
          onError={(err) => {
            onError(err);
          }}
          onInit={() => {
            setIsPending(false);
          }}
          onCancel={() => {
            // Handle cancellation if needed
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout; 