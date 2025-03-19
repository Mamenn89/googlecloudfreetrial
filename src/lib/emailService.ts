import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS service details
const EMAILJS_SERVICE_ID = 'service_replace_with_your_id';
const EMAILJS_TEMPLATE_ID_ADMIN = 'template_admin_notification';
const EMAILJS_TEMPLATE_ID_CUSTOMER = 'template_customer_receipt';
const EMAILJS_PUBLIC_KEY = 'replace_with_your_public_key';

interface OrderDetails {
  orderId: string;
  productName: string;
  amount: string;
  currency: string;
  customerEmail: string;
  customerName: string;
  paymentId: string;
  date: string;
}

/**
 * Sends an email notification to the admin about a new order
 */
export const sendAdminNotification = async (orderDetails: OrderDetails): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_ADMIN,
      {
        order_id: orderDetails.orderId,
        product_name: orderDetails.productName,
        amount: `${orderDetails.currency} ${orderDetails.amount}`,
        customer_email: orderDetails.customerEmail,
        customer_name: orderDetails.customerName,
        payment_id: orderDetails.paymentId,
        date: orderDetails.date,
      },
      EMAILJS_PUBLIC_KEY
    );
    
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    return false;
  }
};

/**
 * Sends a receipt email to the customer
 */
export const sendCustomerReceipt = async (orderDetails: OrderDetails): Promise<boolean> => {
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CUSTOMER,
      {
        order_id: orderDetails.orderId,
        product_name: orderDetails.productName,
        amount: `${orderDetails.currency} ${orderDetails.amount}`,
        customer_email: orderDetails.customerEmail,
        customer_name: orderDetails.customerName,
        payment_id: orderDetails.paymentId,
        date: orderDetails.date,
      },
      EMAILJS_PUBLIC_KEY
    );
    
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send customer receipt:', error);
    return false;
  }
};

/**
 * Sends both admin notification and customer receipt emails
 */
export const sendOrderNotifications = async (
  orderDetails: OrderDetails
): Promise<{adminEmailSent: boolean; customerEmailSent: boolean}> => {
  const adminEmailSent = await sendAdminNotification(orderDetails);
  const customerEmailSent = await sendCustomerReceipt(orderDetails);
  
  return { adminEmailSent, customerEmailSent };
}; 