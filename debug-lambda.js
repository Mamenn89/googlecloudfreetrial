// Debug script for local Lambda function testing
// This simulates AWS Lambda execution environment

// Import Lambda handler (this would only work if you have the aws_lambda directory locally)
// const { handler } = require('./aws_lambda/index');

// Mock API Gateway event
const event = {
  httpMethod: 'POST',
  body: JSON.stringify({
    adminEmail: 'andhika@batamwebhosting.com',
    orderDetails: {
      orderId: 'TEST-123',
      productName: 'Google Cloud Free Trial Account',
      amount: '1.00',
      currency: 'USD',
      customerEmail: 'andhika@batamwebhosting.com',
      customerName: 'Test Customer',
      paymentId: 'TEST-PAYPAL-123',
      date: new Date().toISOString()
    }
  })
};

console.log('Lambda Environment Variables Check:');
console.log('-----------------------------------');
console.log('SENDER_EMAIL:', process.env.SENDER_EMAIL || 'NOT SET ❌');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'NOT SET ❌');
console.log('AWS_REGION:', process.env.AWS_REGION || 'NOT SET (using default ap-southeast-2) ✓');

console.log('\nTroubleshooting Steps:');
console.log('---------------------');
console.log('1. Make sure the SENDER_EMAIL environment variable is set in your Lambda function');
console.log('   - Go to AWS Lambda console');
console.log('   - Select your function');
console.log('   - Go to the Configuration tab');
console.log('   - Click on Environment variables');
console.log('   - Add SENDER_EMAIL=andhika@batamwebhosting.com');
console.log('   - Add ADMIN_EMAIL=andhika@batamwebhosting.com (optional)');
console.log('   - Click Save');
console.log('\n2. Check your CloudWatch logs for any errors');
console.log('   - Go to CloudWatch console');
console.log('   - Select Log groups');
console.log('   - Look for /aws/lambda/your-function-name');
console.log('   - Check recent log streams for errors');
console.log('\n3. Test the function directly in Lambda console');
console.log('   - Go to AWS Lambda console');
console.log('   - Select your function');
console.log('   - Go to the Test tab');
console.log('   - Create a new test event with the following payload:');
console.log('     ' + JSON.stringify(JSON.parse(event.body), null, 2).replace(/\n/g, '\n     '));
console.log('   - Click Test and check the response');

console.log('\nCommon Errors:');
console.log('--------------');
console.log('- "Missing required parameter \'Source\'": SENDER_EMAIL env variable is not set');
console.log('- "Email address is not verified": Your SES sender email is not verified');
console.log('- "MessageRejected": Check SES account status (sandbox vs. production)');

console.log('\nFor testing in the sandbox mode, both sender and recipient must be verified'); 