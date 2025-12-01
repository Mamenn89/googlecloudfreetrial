import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PaypalCheckoutProps {
  amount: string;
  currency: string;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export const PaypalCheckout = ({ amount, currency, onSuccess, onError }: PaypalCheckoutProps) => {
  const [isPending, setIsPending] = useState(true);
  const [scriptError, setScriptError] = useState<string | null>(null);

  const clientId = "Ad0-tPTr-Q0ZmI8Fd1eLvhGcvcX7AkNrIZDZcAg4aaUN_zby6LwID-OQhajhCEuJhc2Xrrx_4QbmwZTM"; // Hardcoded for immediate fix

  useEffect(() => {
    console.log("PayPal Debug Info:");
    console.log("- Client ID:", clientId ? "Present" : "Missing");
    console.log("- Amount:", amount);
    console.log("- Currency:", currency);

    if (!clientId) {
      setScriptError("PayPal Client ID is missing in configuration.");
    }
  }, [amount, currency, clientId]);

  if (scriptError) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
        Error: {scriptError}
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId || "test", // Fallback to avoid crash, but will fail if invalid
        currency: currency,
        intent: "capture",
        "enable-funding": "card",
        "disable-funding": "credit,paylater",
      }}
    >
      <div className="w-full min-h-[150px] relative">
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg z-10">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 border-2 border-cloud-blue border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-sm text-gray-500">Loading secure payment...</span>
            </div>
          </div>
        )}

        <div className={isPending ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
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
                console.error("Capture error", error);
                onError(error);
              }
            }}
            onError={(err) => {
              console.error("PayPal button error:", err);
              // Don't trigger main onError immediately for button render errors to avoid closing modal
              // Just log it, or set a local error state
            }}
            onInit={() => {
              console.log("PayPal button initialized successfully");
              setIsPending(false);
            }}
            onCancel={() => {
              console.log("Payment cancelled");
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PaypalCheckout;