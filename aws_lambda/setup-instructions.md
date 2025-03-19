# Setting Up AWS SES and Lambda for Order Notifications

This guide will walk you through setting up AWS Simple Email Service (SES) and Lambda to handle order notification emails.

## 1. Set Up AWS SES

### Create and Verify Email Identities

1. Sign in to the AWS Management Console and open the [Amazon SES console](https://console.aws.amazon.com/ses/)
2. In the navigation pane, choose **Verified identities**
3. Choose **Create identity**
4. Select **Email address** and enter the email address you want to use as your sender (e.g., `noreply@yourdomain.com`)
5. Choose **Create identity**
6. Check your email inbox and verify the email by clicking the link in the verification email
7. Repeat this process for any other email addresses you want to verify (in sandbox mode, you must verify both sender and recipient emails)

### Move Out of the Sandbox (for Production)

Note: Initially, your SES account is in "sandbox" mode, which means you can only send to verified email addresses. For production use, request to move out of the sandbox:

1. In the SES console, click on **Account dashboard**
2. Under **Production Access**, click **Request production access**
3. Fill out the form with your use case details
4. Submit the request

## 2. Create an AWS Lambda Function

1. Sign in to the AWS Management Console and open the [AWS Lambda console](https://console.aws.amazon.com/lambda/)
2. Choose **Create function**
3. Select **Author from scratch**
4. Enter a name for your function (e.g., `send-order-emails`)
5. For the runtime, choose **Node.js 18.x** (or a later version)
6. Under **Permissions**, choose **Create a new role with basic Lambda permissions**
7. Choose **Create function**

### Add SES Permissions to Your Lambda Role

1. In your Lambda function dashboard, select the **Configuration** tab
2. Select **Permissions** in the left navigation
3. Click on the role name under **Execution role**
4. In the IAM console that opens, choose **Add permissions** > **Create inline policy**
5. Choose the **JSON** tab and paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

6. Choose **Review policy**
7. Name the policy (e.g., `SESEmailSendPolicy`) and choose **Create policy**

### Configure Environment Variables

1. Go back to your Lambda function
2. Select the **Configuration** tab
3. Select **Environment variables** in the left navigation
4. Choose **Edit** and add the following variables:
   - Key: `SENDER_EMAIL`, Value: `your-verified-email@example.com`
   - Key: `ADMIN_EMAIL`, Value: `your-admin-email@example.com`
5. Choose **Save**

### Deploy the Lambda Function Code

1. Go to the **Code** tab of your Lambda function
2. Delete any existing code in the editor
3. Copy and paste the code from `send-email-function.js` into the editor
4. Click **Deploy**

## 3. Create an API Gateway Endpoint

1. Sign in to the AWS Management Console and open the [API Gateway console](https://console.aws.amazon.com/apigateway/)
2. Choose **Create API**
3. Select **REST API** and choose **Build**
4. Select **New API**, enter a name (e.g., `OrderNotificationAPI`), and choose **Create API**
5. From the **Actions** dropdown menu, select **Create Resource**
6. Enter `send-email` for the **Resource Name** and choose **Create Resource**
7. With the `/send-email` resource selected, from the **Actions** dropdown menu, select **Create Method**
8. Select **POST** and choose the checkmark
9. For **Integration type**, select **Lambda Function**
10. Check **Use Lambda Proxy integration**
11. For **Lambda Function**, enter the name of your Lambda function
12. Choose **Save**

### Enable CORS for the API

1. With the `/send-email` resource selected, from the **Actions** dropdown menu, select **Enable CORS**
2. Enter `*` for **Access-Control-Allow-Origin**
3. For **Access-Control-Allow-Headers**, enter `Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token`
4. For **Access-Control-Allow-Methods**, select `POST,OPTIONS`
5. Choose **Enable CORS and replace existing CORS headers**

### Deploy the API

1. From the **Actions** dropdown menu, select **Deploy API**
2. For **Deployment stage**, select **New Stage**
3. Enter a stage name (e.g., `prod`)
4. Choose **Deploy**
5. Note the **Invoke URL** displayed at the top of the page - this is your API endpoint

## 4. Update Your Frontend Code

1. Open the `src/lib/awsSesService.ts` file
2. Replace the `API_ENDPOINT` value with your actual API Gateway endpoint URL:

```typescript
const API_ENDPOINT = 'https://your-api-id.execute-api.region.amazonaws.com/prod/send-email';
```

3. Replace the `adminEmail` value with your actual admin email address
4. Change the `USE_MOCK_SERVICE` flag in `src/components/CheckoutModal.tsx` to `false`

## 5. Testing

1. Deploy both the Lambda function and API Gateway
2. Test your API endpoint using Postman or any API testing tool with a payload like:

```json
{
  "adminEmail": "your-verified-email@example.com",
  "orderDetails": {
    "orderId": "test123",
    "productName": "Google Cloud Free Trial Account",
    "amount": "99.99",
    "currency": "USD",
    "customerEmail": "your-verified-email@example.com",
    "customerName": "Test User",
    "paymentId": "test-payment-123",
    "date": "2023-10-20T12:00:00Z"
  }
}
```

3. When testing in sandbox mode, make sure both the sender and recipient emails are verified in SES

## Notes

- For production, consider adding more security to your API Gateway (like API keys or AWS Cognito)
- The sandbox mode limits you to sending only to verified email addresses and a daily sending quota
- Consider adding error handling and retries in your Lambda function for production use 