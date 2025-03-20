/**
 * Meta Pixel Service
 * Provides functions to track events using Meta Pixel.
 * Make sure the Meta Pixel base code is included in the index.html before using this service.
 */

// Define types for Meta Pixel events
type MetaPixelEvent = 
  | 'Lead' 
  | 'Contact' 
  | 'CompleteRegistration' 
  | 'Purchase' 
  | 'StartTrial' 
  | 'InitiateCheckout' 
  | 'AddToCart' 
  | 'AddPaymentInfo';

// Define the global fbq function
declare global {
  interface Window {
    fbq: (
      track: string,
      eventName: MetaPixelEvent | string,
      params?: Record<string, any>
    ) => void;
  }
}

/**
 * Tracks a button click event
 * @param eventName The Meta Pixel standard event name
 * @param buttonName The name of the button that was clicked
 * @param additionalParams Any additional parameters to include with the event
 */
export const trackButtonClick = (
  eventName: MetaPixelEvent = 'Lead',
  buttonName: string,
  additionalParams: Record<string, any> = {}
): void => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, {
        content_name: buttonName,
        content_category: 'Button Click',
        ...additionalParams,
      });
      console.log(`Meta Pixel: Tracked "${buttonName}" button click with event "${eventName}"`);
    } else {
      console.warn('Meta Pixel: fbq function not available');
    }
  } catch (error) {
    console.error('Meta Pixel: Error tracking button click:', error);
  }
};

/**
 * Tracks a purchase event
 * @param value The purchase value
 * @param currency The currency code (e.g., 'USD')
 * @param contentName The name of the product or service purchased
 */
export const trackPurchase = (
  value: number,
  currency: string = 'USD',
  contentName: string = 'Google Cloud Free Trial Account'
): void => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Purchase', {
        value,
        currency,
        content_name: contentName,
        content_type: 'product',
      });
      console.log(`Meta Pixel: Tracked purchase of ${contentName} for ${value} ${currency}`);
    } else {
      console.warn('Meta Pixel: fbq function not available');
    }
  } catch (error) {
    console.error('Meta Pixel: Error tracking purchase:', error);
  }
};

/**
 * Tracks the initiation of a checkout process
 * @param value The value of the items in checkout
 * @param currency The currency code (e.g., 'USD')
 */
export const trackInitiateCheckout = (
  value: number,
  currency: string = 'USD'
): void => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        value,
        currency,
        content_category: 'Checkout',
      });
      console.log(`Meta Pixel: Tracked checkout initiation for ${value} ${currency}`);
    } else {
      console.warn('Meta Pixel: fbq function not available');
    }
  } catch (error) {
    console.error('Meta Pixel: Error tracking checkout initiation:', error);
  }
};

/**
 * Custom event tracking for any event
 * @param eventName The name of the custom event
 * @param params Additional parameters for the event
 */
export const trackCustomEvent = (
  eventName: string,
  params: Record<string, any> = {}
): void => {
  try {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, params);
      console.log(`Meta Pixel: Tracked custom event "${eventName}"`);
    } else {
      console.warn('Meta Pixel: fbq function not available');
    }
  } catch (error) {
    console.error('Meta Pixel: Error tracking custom event:', error);
  }
};

export default {
  trackButtonClick,
  trackPurchase,
  trackInitiateCheckout,
  trackCustomEvent,
}; 