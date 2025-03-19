const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Create SES client
const ses = new SESClient({ region: 'ap-southeast-2' });

// Main handler function that handles both email sending and CORS preflight
exports.handler = async (event) => {
  // For OPTIONS method calls, return appropriate CORS headers
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }

  // For other HTTP methods, proceed with the main email sending logic
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // For API Gateway requests, data is in the body
    const body = typeof event.body === 'string' 
      ? JSON.parse(event.body) 
      : event.body || {};
    
    console.log('Processed body:', JSON.stringify(body, null, 2));
    
    const { adminEmail, orderDetails } = body;
    
    if (!orderDetails || !orderDetails.customerEmail) {
      throw new Error('Missing required order details or customer email');
    }
    
    // Format the order ID and payment ID
    const orderId = orderDetails.orderId || `${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const formattedOrderId = `GCP-${orderId}`;
    
    const paymentId = orderDetails.paymentId || `PP-${Date.now()}`;
    const formattedPaymentId = paymentId.startsWith('PPID-') ? paymentId : `PPID-${paymentId}`;
    
    // Format the date
    let formattedDate;
    try {
      formattedDate = new Date(orderDetails.date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });
    } catch (e) {
      formattedDate = orderDetails.date;
    }
    
    // Send email to admin
    console.log('Attempting to send admin email to:', adminEmail);
    const adminEmailSent = await sendAdminNotification(
      adminEmail || process.env.ADMIN_EMAIL, 
      orderDetails,
      formattedOrderId,
      formattedPaymentId,
      formattedDate
    );
    console.log('Admin email sending result:', adminEmailSent);
    
    // Send receipt to customer
    console.log('Attempting to send customer email to:', orderDetails.customerEmail);
    const customerEmailSent = await sendCustomerReceipt(
      orderDetails,
      formattedOrderId,
      formattedPaymentId,
      formattedDate
    );
    console.log('Customer email sending result:', customerEmailSent);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
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
    console.error('Error processing request:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        message: 'Error occurred',
        error: error.message
      })
    };
  }
};

async function sendAdminNotification(adminEmail, orderDetails, formattedOrderId, formattedPaymentId, formattedDate) {
  try {
    console.log('Creating admin email with params:', {
      source: process.env.SENDER_EMAIL || adminEmail,
      destination: adminEmail
    });
    
    const adminEmailTextBody = `
You have received a new order!

Order Details:
-----------------
Order ID: ${formattedOrderId}
Product: ${orderDetails.productName}
Amount: ${orderDetails.currency} ${orderDetails.amount}
Date: ${formattedDate}

Customer Information:
-----------------
Name: ${orderDetails.customerName}
Email: ${orderDetails.customerEmail}

Payment Details:
-----------------
Payment ID: ${formattedPaymentId}
Payment Method: PayPal
Status: Completed

This is an automated notification. Please do not reply to this email.
`;

    const adminEmailHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order Notification</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 0; }
    .header { background-color: #4285F4; color: white; padding: 15px 20px; }
    .header h2 { margin: 0; font-size: 22px; }
    .content { padding: 20px; background-color: #ffffff; }
    .section { margin-bottom: 25px; }
    .section h3 { color: #4285F4; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; }
    .details-table { width: 100%; border-collapse: collapse; }
    .details-table th { text-align: left; padding: 8px 0; width: 140px; color: #555; font-weight: normal; vertical-align: top; }
    .details-table td { padding: 8px 0; }
    .footer { font-size: 12px; color: #777; padding: 20px; background-color: #f7f7f7; text-align: center; }
    .emphasis { font-weight: bold; color: #4285F4; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Order Received</h2>
    </div>
    <div class="content">
      <p>You have received a new order!</p>
      
      <div class="section">
        <h3>Order Details</h3>
        <table class="details-table">
          <tr>
            <th>Order ID:</th>
            <td class="emphasis">${formattedOrderId}</td>
          </tr>
          <tr>
            <th>Product:</th>
            <td>${orderDetails.productName}</td>
          </tr>
          <tr>
            <th>Amount:</th>
            <td>${orderDetails.currency} ${orderDetails.amount}</td>
          </tr>
          <tr>
            <th>Date:</th>
            <td>${formattedDate}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h3>Customer Information</h3>
        <table class="details-table">
          <tr>
            <th>Name:</th>
            <td>${orderDetails.customerName}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td><a href="mailto:${orderDetails.customerEmail}">${orderDetails.customerEmail}</a></td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h3>Payment Details</h3>
        <table class="details-table">
          <tr>
            <th>Payment ID:</th>
            <td>${formattedPaymentId}</td>
          </tr>
          <tr>
            <th>Payment Method:</th>
            <td>PayPal</td>
          </tr>
          <tr>
            <th>Status:</th>
            <td><span style="color: #00a650; font-weight: bold;">Completed</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
    
    const params = {
      Source: process.env.SENDER_EMAIL || adminEmail,
      Destination: {
        ToAddresses: [adminEmail]
      },
      Message: {
        Subject: {
          Data: `New Order: ${formattedOrderId} - ${orderDetails.productName}`
        },
        Body: {
          Text: {
            Data: adminEmailTextBody
          },
          Html: {
            Data: adminEmailHtmlBody
          }
        }
      }
    };
    
    console.log('Sending admin email with SES params:', JSON.stringify({
      Source: params.Source,
      Destination: params.Destination,
      Subject: params.Message.Subject.Data
    }));
    
    // Create and send the email
    const command = new SendEmailCommand(params);
    const response = await ses.send(command);
    
    console.log('Admin email sent successfully:', response.MessageId);
    return true;
  } catch (error) {
    console.error('Error sending admin email:', error);
    return false;
  }
}

async function sendCustomerReceipt(orderDetails, formattedOrderId, formattedPaymentId, formattedDate) {
  try {
    console.log('Creating customer email with params:', {
      source: process.env.SENDER_EMAIL,
      destination: orderDetails.customerEmail
    });
    
    const customerEmailTextBody = `
Hello ${orderDetails.customerName},

Thank you for your purchase! Below are the details of your transaction.

Order Details:
-----------------
Order ID: ${formattedOrderId}
Product: ${orderDetails.productName}
Amount: ${orderDetails.currency} ${orderDetails.amount}
Date: ${formattedDate}

Your account will be set up and details sent to you within 24 hours.

If you have any questions about your purchase, please contact our support team.

Payment Information:
-----------------
Payment ID: ${formattedPaymentId}
Payment Method: PayPal
Status: Completed

Thank you for your business!

Best regards,
The GCP Team
`;

    const customerEmailHtmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Order Receipt</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 0; }
    .header { background-color: #4285F4; color: white; padding: 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 20px; background-color: #ffffff; }
    .section { margin-bottom: 25px; }
    .section h2 { color: #4285F4; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; }
    .details-table { width: 100%; border-collapse: collapse; }
    .details-table th { text-align: left; padding: 8px 0; width: 140px; color: #555; font-weight: normal; vertical-align: top; }
    .details-table td { padding: 8px 0; }
    .total-section { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px; }
    .total-row th, .total-row td { font-weight: bold; }
    .thank-you { text-align: center; margin: 30px 0; font-size: 18px; color: #4285F4; }
    .note { background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .note p { margin: 0; }
    .footer { font-size: 12px; color: #777; padding: 20px; background-color: #f7f7f7; text-align: center; }
    .emphasis { font-weight: bold; color: #4285F4; }
    .cta-button { display: inline-block; background-color: #4285F4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 3px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Order</h1>
    </div>
    <div class="content">
      <p>Hello ${orderDetails.customerName},</p>
      <p>Thank you for your purchase! Your order has been successfully processed and payment has been received.</p>
      
      <div class="section">
        <h2>Order Details</h2>
        <table class="details-table">
          <tr>
            <th>Order ID:</th>
            <td class="emphasis">${formattedOrderId}</td>
          </tr>
          <tr>
            <th>Product:</th>
            <td>${orderDetails.productName}</td>
          </tr>
          <tr>
            <th>Date:</th>
            <td>${formattedDate}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <h2>Payment Information</h2>
        <table class="details-table">
          <tr>
            <th>Amount:</th>
            <td>${orderDetails.currency} ${orderDetails.amount}</td>
          </tr>
          <tr>
            <th>Payment ID:</th>
            <td>${formattedPaymentId}</td>
          </tr>
          <tr>
            <th>Payment Method:</th>
            <td>PayPal</td>
          </tr>
          <tr>
            <th>Status:</th>
            <td><span style="color: #00a650; font-weight: bold;">Completed</span></td>
          </tr>
        </table>
      </div>
      
      <div class="note">
        <p><strong>Important:</strong> Your account will be set up and details sent to you within 24 hours.</p>
      </div>
      
      <div class="thank-you">
        <p>Thank you for your business!</p>
      </div>
    </div>
    <div class="footer">
      <p>If you have any questions about your order, please contact our support team.</p>
      <p>&copy; 2025 GCP Team. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
    
    const params = {
      Source: process.env.SENDER_EMAIL,
      Destination: {
        ToAddresses: [orderDetails.customerEmail]
      },
      Message: {
        Subject: {
          Data: `Your Receipt for Order ${formattedOrderId}`        },
        Body: {
          Text: {
            Data: customerEmailTextBody
          },
          Html: {
            Data: customerEmailHtmlBody
          }
        }
      }
    };
    
    console.log('Sending customer email with SES params:', JSON.stringify({
      Source: params.Source,
      Destination: params.Destination,
      Subject: params.Message.Subject.Data
    }));
    
    // Create and send the email
    const command = new SendEmailCommand(params);
    const response = await ses.send(command);
    
    console.log('Customer email sent successfully:', response.MessageId);
    return true;
  } catch (error) {
    console.error('Error sending customer email:', error);
    return false;
  }
} 
