const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Create a SES client in ap-southeast-2 region
const ses = new SESClient({ region: 'ap-southeast-2' });

exports.handler = async (event) => {
  try {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // For API Gateway requests, data is in the body
    const body = typeof event.body === 'string' 
      ? JSON.parse(event.body) 
      : event.body || {};
    
    console.log('Processed body:', JSON.stringify(body, null, 2));
    
    // For testing - just return success
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        message: 'Lambda function executed successfully',
        adminEmailSent: true,
        customerEmailSent: true
      })
    };
    
    // After testing is successful, uncomment below to implement actual email sending
    /*
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
    */
    
  } catch (error) {
    console.error('Error:', error);
    
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
            Data: `You have received a new order!\n\nOrder Details:\n-----------------\nOrder ID: ${orderDetails.orderId}\nProduct: ${orderDetails.productName}\nAmount: ${orderDetails.currency} ${orderDetails.amount}\nDate: ${orderDetails.date}\n\nCustomer Information:\n-----------------\nName: ${orderDetails.customerName}\nEmail: ${orderDetails.customerEmail}\n\nPayment Details:\n-----------------\nPayment ID: ${orderDetails.paymentId}\nStatus: Completed\n\nThis is an automated notification. Please do not reply to this email.`
          }
        }
      }
    };
    
    const command = new SendEmailCommand(params);
    await ses.send(command);
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
            Data: `Hello ${orderDetails.customerName},\n\nThank you for your purchase! Below are the details of your transaction.\n\nOrder Details:\n-----------------\nOrder ID: ${orderDetails.orderId}\nProduct: ${orderDetails.productName}\nAmount: ${orderDetails.currency} ${orderDetails.amount}\nDate: ${orderDetails.date}\n\nIf you have any questions about your purchase, please contact our support team.\n\nPayment Information:\n-----------------\nPayment ID: ${orderDetails.paymentId}\nStatus: Completed\n\nThank you for your business!\n\nBest regards,\nThe GCP Team`
          }
        }
      }
    };
    
    const command = new SendEmailCommand(params);
    await ses.send(command);
    return true;
  } catch (error) {
    console.error('Error sending customer email:', error);
    return false;
  }
}
