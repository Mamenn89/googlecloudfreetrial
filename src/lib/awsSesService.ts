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

// Use environment variable for API endpoint
const API_ENDPOINT = process.env.NEXT_PUBLIC_AWS_SES_API_ENDPOINT;

/**
 * Sends both admin notification and customer receipt emails through AWS SES
 * The backend Lambda function uses rich HTML formatting for better email presentation
 */
export const sendOrderNotifications = async (
  orderDetails: OrderDetails
): Promise<{adminEmailSent: boolean; customerEmailSent: boolean}> => {
  try {
    console.log('Sending email notifications with details:', orderDetails);
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
        orderDetails
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API responded with status: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('Email notification result:', result);
    
    return { 
      adminEmailSent: result.adminEmailSent || false, 
      customerEmailSent: result.customerEmailSent || false 
    };
  } catch (error) {
    console.error('Failed to send SES notifications:', error);
    return { adminEmailSent: false, customerEmailSent: false };
  }
};

/**
 * For testing purposes only - simulates a successful email notification
 * Use this when AWS SES is not yet set up
 */
export const mockSendOrderNotifications = async (
  orderDetails: OrderDetails
): Promise<{adminEmailSent: boolean; customerEmailSent: boolean}> => {
  console.log('Mock sending notification for order:', orderDetails);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return success for testing UI
  return { adminEmailSent: true, customerEmailSent: true };
}; 