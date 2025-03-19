import emailjs from '@emailjs/browser';

// Use the same EmailJS service as emailService.ts
const EMAILJS_SERVICE_ID = 'service_replace_with_your_id';
const EMAILJS_TEMPLATE_ID_CONTACT = 'template_contact';
const EMAILJS_PUBLIC_KEY = 'replace_with_your_public_key';

// Admin's support email - this should be changed to the actual support email
const SUPPORT_EMAIL = 'support@cloudcredit.example';

interface ContactDetails {
  email: string;       // User's email for reply
  name?: string;       // Optional user name
  message?: string;    // Optional message content
  subject: string;     // Email subject
}

/**
 * Sends a general contact/support email
 */
export const sendSupportEmail = async (contactDetails: Partial<ContactDetails>): Promise<boolean> => {
  try {
    // Use default empty subject if not provided
    const details: ContactDetails = {
      email: contactDetails.email || '',
      name: contactDetails.name || '',
      message: contactDetails.message || '',
      subject: contactDetails.subject || ''
    };
    
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID_CONTACT,
      {
        user_email: details.email,
        user_name: details.name,
        message: details.message,
        subject: details.subject,
        to_email: SUPPORT_EMAIL
      },
      EMAILJS_PUBLIC_KEY
    );
    
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send support email:', error);
    return false;
  }
};

/**
 * Sends a bulk pricing inquiry email
 */
export const sendBulkPricingEmail = async (contactDetails: Partial<ContactDetails>): Promise<boolean> => {
  // Set subject line for bulk pricing
  contactDetails.subject = 'Bulk Pricing';
  
  return sendSupportEmail(contactDetails);
}; 