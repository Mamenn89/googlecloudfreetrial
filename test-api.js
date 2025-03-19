// Simple test script to check if the API is working
// For Node.js v18 or later, you can use the global fetch directly
// For Node.js < v18, uncomment the next line
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const testApiEndpoint = async () => {
  const API_ENDPOINT = 'https://87zif0n0f3.execute-api.ap-southeast-2.amazonaws.com/prod/send-email';
  
  try {
    console.log('Testing API endpoint...');
    
    const orderDetails = {
      orderId: 'TEST-123',
      productName: 'Google Cloud Free Trial Account',
      amount: '1.00',
      currency: 'USD',
      customerEmail: 'andhika@batamwebhosting.com', // Use your own email for testing
      customerName: 'Test Customer',
      paymentId: 'TEST-PAYPAL-123',
      date: new Date().toISOString()
    };
    
    const requestBody = {
      adminEmail: 'andhika@batamwebhosting.com', // Your admin email
      orderDetails
    };
    
    console.log('Sending request with body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', response.status, errorText);
      return;
    }
    
    const result = await response.json();
    console.log('API response body:', JSON.stringify(result, null, 2));
    
    // Check if the emails were actually sent
    if (result.adminEmailSent && result.customerEmailSent) {
      console.log('✅ SUCCESS: Both admin and customer emails were sent successfully!');
      console.log('Check your inbox at andhika@batamwebhosting.com for the test emails.');
    } else if (result.adminEmailSent) {
      console.log('⚠️ PARTIAL SUCCESS: Admin email was sent, but customer email failed.');
    } else if (result.customerEmailSent) {
      console.log('⚠️ PARTIAL SUCCESS: Customer email was sent, but admin email failed.');
    } else {
      console.log('❌ FAILURE: Neither admin nor customer emails were sent.');
      console.log('This suggests a problem with your Lambda function or SES configuration.');
    }
    
    // Provide troubleshooting guidance
    if (!result.adminEmailSent || !result.customerEmailSent) {
      console.log('\nTroubleshooting tips:');
      console.log('1. Check your Lambda function logs in CloudWatch');
      console.log('2. Verify that the SENDER_EMAIL and ADMIN_EMAIL environment variables are set correctly');
      console.log('3. Ensure your SES identity is verified and out of the sandbox mode');
      console.log('4. Check SES sending quotas and statistics');
    }
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
};

testApiEndpoint(); 