// AWS Lambda function for sending emails via SES
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' }); // Replace with your region

exports.handler = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // For API Gateway requests, the actual data is in the body
    const body = typeof event.body === 'string' 
      ? JSON.parse(event.body) 
      : event.body || {};
    
    const { adminEmail, orderDetails } = body;
    
    if (!orderDetails || !orderDetails.customerEmail) {
      throw new Error('Missing required order details or customer email');
    }
    
    // Send email to admin
    const adminEmailSent = await sendAdminNotification(
      adminEmail || process.env.ADMIN_EMAIL, 
      orderDetails
    );
    
    // Send receipt to customer
    const customerEmailSent = await sendCustomerReceipt(orderDetails);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        message: 'Email notifications processed',
        adminEmailSent,
        customerEmailSent
      })
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        message: 'Error sending emails',
        error: error.message,
        adminEmailSent: false,
        customerEmailSent: false
      })
    };
  }
};

async function sendAdminNotification(adminEmail, orderDetails) {
  try {
    const params = {
      Source: process.env.SENDER_EMAIL || adminEmail,
      Destination: {
        ToAddresses: [adminEmail]
      },
      Message: {
        Subject: {
          Data: `New Order: ${orderDetails.productName} - ${orderDetails.orderId}`
        },
        Body: {
          Text: {
            Data: `
You have received a new order!

Order Details:
-----------------
Order ID: ${orderDetails.orderId}
Product: ${orderDetails.productName}
Amount: ${orderDetails.currency} ${orderDetails.amount}
Date: ${orderDetails.date}

Customer Information:
-----------------
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}

Payment Details:
-----------------
Payment ID: ${orderDetails.paymentId}
Status: Completed

This is an automated notification. Please do not reply to this email.
            `
          }
        }
      }
    };
    
    await ses.sendEmail(params).promise();
    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    return false;
  }
}

async function sendCustomerReceipt(orderDetails) {
  try {
    const params = {
      Source: process.env.SENDER_EMAIL,
      Destination: {
        ToAddresses: [orderDetails.customerEmail]
      },
      Message: {
        Subject: {
          Data: `Your Receipt for ${orderDetails.productName}`
        },
        Body: {
          Text: {
            Data: `
Hello ${orderDetails.customerName},

Thank you for your purchase! Below are the details of your transaction.

Order Details:
-----------------
Order ID: ${orderDetails.orderId}
Product: ${orderDetails.productName}
Amount: ${orderDetails.currency} ${orderDetails.amount}
Date: ${orderDetails.date}

If you have any questions about your purchase, please contact our support team.

Payment Information:
-----------------
Payment ID: ${orderDetails.paymentId}
Status: Completed

Thank you for your business!

Best regards,
The GCP Team
            `
          }
        }
      }
    };
    
    await ses.sendEmail(params).promise();
    return true;
  } catch (error) {
    console.error('Error sending customer email:', error);
    return false;
  }
} 