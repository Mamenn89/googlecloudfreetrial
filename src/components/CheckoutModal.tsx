import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PaypalCheckout } from "./PaypalCheckout";
import { Check, X, Mail } from "lucide-react";
import { useOrder } from '@/lib/OrderContext';
import CustomerInfoForm, { CustomerInfo } from './CustomerInfoForm';
import { sendOrderNotifications, mockSendOrderNotifications } from '@/lib/awsSesService';
import { toast } from "sonner";
import { trackInitiateCheckout, trackPurchase } from '@/lib/metaPixelService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  amount: string;
  currency: string;
}

// Flag to use mock service for testing - set to false when your AWS Lambda function is deployed
const USE_MOCK_SERVICE = false; // Use real email service for production

// Helper function to generate a proper order ID
const generateOrderId = (): string => {
  const timestamp = new Date().getTime();
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${timestamp}-${randomSuffix}`;
};

const CheckoutModal = ({ isOpen, onClose, productName, amount, currency }: CheckoutModalProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'initial' | 'collectInfo' | 'processing' | 'success' | 'error'>('collectInfo');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { addOrder, updateOrderStatus } = useOrder();

  // Track checkout initiation when modal opens
  useEffect(() => {
    if (isOpen) {
      const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
      trackInitiateCheckout(numericAmount, currency);
    }
  }, [isOpen, amount, currency]);

  // Create a pending order when modal opens
  useEffect(() => {
    if (isOpen && !orderId) {
      const newOrderId = addOrder({
        productName,
        amount,
        currency,
        status: 'pending',
        paymentMethod: 'paypal'
      });
      setOrderId(newOrderId);
    }
    console.log("Current payment status:", paymentStatus, "isOpen:", isOpen, "orderId:", orderId);
  }, [isOpen, orderId, addOrder, productName, amount, currency, paymentStatus]);

  const handleCustomerInfoSubmit = (info: CustomerInfo) => {
    console.log("Customer info submitted:", info);
    setCustomerInfo(info);
    setPaymentStatus('initial');
  };

  const handlePaymentSuccess = async (details: any) => {
    setPaymentStatus('processing');
    
    try {
      console.log('Payment successful!', details);
      setPaymentStatus('success');
      
      // Generate a proper order ID for production
      const generatedOrderId = generateOrderId();
      
      // Update order status in the context
      if (orderId) {
        updateOrderStatus(orderId, 'completed', details.id);
      }
      
      // Send email notifications if customer info is available
      if (customerInfo) {
        setNotificationStatus('sending');
        
        const { adminEmailSent, customerEmailSent } = await sendOrderNotifications({
          orderId: generatedOrderId,
          productName,
          amount,
          currency,
          customerEmail: customerInfo.email,
          customerName: customerInfo.name,
          paymentId: details.id || `PP-${Date.now()}`,
          date: new Date().toISOString(),
        });
        
        setNotificationStatus('success');
        
        if (adminEmailSent && customerEmailSent) {
          toast.success("Order confirmation emails sent successfully!");
        } else if (!adminEmailSent && !customerEmailSent) {
          toast.warning("Could not send confirmation emails. We'll contact you soon.");
        } else {
          toast.info("Partial delivery of confirmation emails. We'll follow up if needed.");
        }
      }
      
      // Track successful purchase with Meta Pixel
      const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
      trackPurchase(numericAmount, currency, productName);
    } catch (error) {
      console.error("Failed to send notifications:", error);
      setNotificationStatus('error');
      toast.error("Failed to send confirmation emails. We'll contact you soon.");
    }
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    setPaymentStatus('error');
    setErrorMessage(error.message || 'Payment failed. Please try again.');
    
    // Update order status in the context
    if (orderId) {
      updateOrderStatus(orderId, 'failed');
    }
  };

  const resetPaymentState = () => {
    setPaymentStatus('collectInfo');
    setErrorMessage('');
    setNotificationStatus('idle');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        // Reset the state when the modal is closed
        setTimeout(() => {
          resetPaymentState();
          setOrderId(null);
          setCustomerInfo(null);
        }, 300);
      }
    }}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Complete your purchase of {productName}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {paymentStatus === 'collectInfo' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-medium">{productName}</span>
                <span className="font-bold">${amount} {currency}</span>
              </div>
              
              <p className="text-sm text-gray-500 mb-2">
                Please provide your information to continue with the checkout.
              </p>
              
              <CustomerInfoForm onSubmit={handleCustomerInfoSubmit} />
            </div>
          )}
          
          {paymentStatus === 'initial' && customerInfo && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-medium">{productName}</span>
                <span className="font-bold">${amount} {currency}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <h4 className="font-medium text-sm mb-2">Order Information:</h4>
                <p className="text-sm">Name: {customerInfo.name}</p>
                <p className="text-sm">Email: {customerInfo.email}</p>
              </div>
              
              <div className="pt-2">
                <PaypalCheckout 
                  amount={amount}
                  currency={currency}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2" 
                onClick={resetPaymentState}
              >
                Edit Information
              </Button>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Payment Successful!</h3>
              <p className="text-gray-500">Thank you for your purchase. You will receive an email confirmation shortly.</p>
              
              {notificationStatus === 'sending' && (
                <div className="flex items-center justify-center text-sm text-gray-500 animate-pulse">
                  <Mail className="w-4 h-4 mr-2" />
                  Sending confirmation emails...
                </div>
              )}
              
              {notificationStatus === 'success' && customerInfo && (
                <div className="text-sm text-green-600">
                  Confirmation sent to {customerInfo.email}
                </div>
              )}
              
              {notificationStatus === 'error' && (
                <div className="text-sm text-amber-600">
                  We couldn't send the confirmation email automatically.
                  We'll reach out to you soon.
                </div>
              )}
              
              <Button 
                className="mt-4 bg-cloud-blue hover:bg-cloud-darkBlue" 
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-medium">Payment Failed</h3>
              <p className="text-gray-500">{errorMessage}</p>
              <div className="flex gap-3 justify-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={resetPaymentState}
                >
                  Try Again
                </Button>
                <Button 
                  className="bg-cloud-blue hover:bg-cloud-darkBlue" 
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal; 