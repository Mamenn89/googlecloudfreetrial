# Setting Up EmailJS for Order Notifications

Follow these steps to set up EmailJS for your order notification system:

## 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for an account
2. Verify your email address

## 2. Add an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps

## 3. Create Admin Notification Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it "Admin Notification"
4. Use the following template:

```
Subject: New Order: {{product_name}} - {{order_id}}

You have received a new order!

Order Details:
-----------------
Order ID: {{order_id}}
Product: {{product_name}}
Amount: {{amount}}
Date: {{date}}

Customer Information:
-----------------
Name: {{customer_name}}
Email: {{customer_email}}

Payment Details:
-----------------
Payment ID: {{payment_id}}
Status: Completed

This is an automated notification. Please do not reply to this email.
```

5. Save the template and note the template ID (it will look like "template_admin_notification")

## 4. Create Customer Receipt Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it "Customer Receipt"
4. Use the following template:

```
Subject: Your Receipt for {{product_name}}

Hello {{customer_name}},

Thank you for your purchase! Below are the details of your transaction.

Order Details:
-----------------
Order ID: {{order_id}}
Product: {{product_name}}
Amount: {{amount}}
Date: {{date}}

If you have any questions about your purchase, please contact our support team.

Payment Information:
-----------------
Payment ID: {{payment_id}}
Status: Completed

Thank you for your business!

Best regards,
The GCP Team
```

5. Save the template and note the template ID (it will look like "template_customer_receipt")

## 5. Configure Your Application

Update the emailService.ts file with your EmailJS credentials:

```typescript
// Replace these with your actual EmailJS service details
const EMAILJS_SERVICE_ID = 'your_service_id'; // e.g., 'service_abc123'
const EMAILJS_TEMPLATE_ID_ADMIN = 'your_admin_template_id'; // e.g., 'template_admin_notification'
const EMAILJS_TEMPLATE_ID_CUSTOMER = 'your_customer_template_id'; // e.g., 'template_customer_receipt'
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // e.g., 'user_abc123'
```

You can find these values in your EmailJS dashboard:
- Service ID: Under "Email Services"
- Template IDs: Under "Email Templates"
- Public Key: Under "Account" > "API Keys"

## Important Notes

1. EmailJS has usage limits on the free plan (200 emails per month)
2. For production use, consider upgrading to a paid plan
3. Client-side email sending should be used only for simple notification systems
4. For a more robust system, implement a server-side email solution 