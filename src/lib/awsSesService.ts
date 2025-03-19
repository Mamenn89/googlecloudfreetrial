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

// Hardcoded API endpoint for production
const API_ENDPOINT = 'https://87zif0n0f3.execute-api.ap-southeast-2.amazonaws.com/prod/send-email';

// Hardcoded admin email
const ADMIN_EMAIL = 'andhika@batamwebhosting.com';

/**
 * Sends both admin notification and customer receipt emails through AWS SES
 * The backend Lambda function uses rich HTML formatting for better email presentation
 */
export const sendOrderNotifications = async (
  orderDetails: OrderDetails
): Promise<{adminEmailSent: boolean; customerEmailSent: boolean}> => {
  try {
    console.log('Sending email notifications with details:', orderDetails);
    console.log('Using API endpoint:', API_ENDPOINT);
    
    if (!orderDetails.customerEmail) {
      console.error('Customer email is missing from order details');
      return { adminEmailSent: false, customerEmailSent: false };
    }
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        adminEmail: ADMIN_EMAIL,
        orderDetails
      }),
      mode: 'cors'
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      console.error('API Status:', response.status);
      console.error('API Status Text:', response.statusText);
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
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.stack) console.error('Stack trace:', error.stack);
    }
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
  console.log('🎉 MOCK EMAIL SERVICE: Successfully simulated sending notification for order:', orderDetails);
  console.log('📧 Would have sent email to customer:', orderDetails.customerEmail);
  console.log('📧 Would have sent email to admin:', ADMIN_EMAIL);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Always return success for testing UI
  return { adminEmailSent: true, customerEmailSent: true };
}; 