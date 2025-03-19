# Email Notification Fix Guide

## Problem Identified
The Lambda function isn't sending emails because the `SENDER_EMAIL` environment variable is not set, and it's not properly returning the email sending status to the frontend.

## Fix Steps

### 1. Set Environment Variables in AWS Lambda
1. Go to the [AWS Lambda console](https://ap-southeast-2.console.aws.amazon.com/lambda/home?region=ap-southeast-2#/functions)
2. Select your Lambda function
3. Go to the **Configuration** tab
4. Click on **Environment variables**
5. Add the following key-value pairs:
   - Key: `SENDER_EMAIL` Value: `andhika@batamwebhosting.com`
   - Key: `ADMIN_EMAIL` Value: `andhika@batamwebhosting.com` (optional)
6. Click **Save**

### 2. Update Your Lambda Function Code
1. In the Lambda console, go to the **Code** tab
2. Replace your existing code with the code in `aws_lambda/index.js` that you've updated
3. Ensure the code includes proper response formatting with `adminEmailSent` and `customerEmailSent` properties
4. Click **Deploy** to save the changes

### 3. Test the Lambda Function Directly
1. In the Lambda console, go to the **Test** tab
2. Create a new test event with the following JSON:
```json
{
  "httpMethod": "POST",
  "body": "{\"adminEmail\":\"andhika@batamwebhosting.com\",\"orderDetails\":{\"orderId\":\"TEST-123\",\"productName\":\"Google Cloud Free Trial Account\",\"amount\":\"1.00\",\"currency\":\"USD\",\"customerEmail\":\"andhika@batamwebhosting.com\",\"customerName\":\"Test Customer\",\"paymentId\":\"TEST-PAYPAL-123\",\"date\":\"2023-03-19T10:03:45.183Z\"}}"
}
```
3. Click **Test** and check the response
4. Verify that the response includes `adminEmailSent` and `customerEmailSent` properties

### 4. Check CloudWatch Logs for Errors
1. Go to the CloudWatch console
2. Select **Log groups**
3. Look for `/aws/lambda/your-function-name`
4. Check recent log streams for any errors

### 5. Verify SES Configuration
1. Ensure your SES account is out of the sandbox mode
2. Verify your sender email address is verified in SES
3. If in sandbox mode, ensure recipient emails are also verified

## Testing After Fixes
1. Run the `test-api.js` script again after making these changes
2. Complete a test checkout in your application and verify both you and the customer receive emails

If you're still experiencing issues after implementing these fixes, please check the CloudWatch logs for specific error messages and we can troubleshoot further. 