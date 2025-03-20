# Meta Dataset Setup Guide for Google Cloud Free Trial Website

## Overview

Meta (Facebook) has replaced the traditional Pixel setup with a new Dataset system for tracking web events. This guide will walk you through the complete process of setting up your Meta Dataset to track important events on your Google Cloud Free Trial website.

## Step 1: Access Events Manager

1. Log in to your [Facebook Business Manager](https://business.facebook.com/)
2. Navigate to **Events Manager** from the main menu
3. You'll see a dashboard showing any existing data sources (if any)

## Step 2: Create a New Dataset

1. Click the green **Connect Data Sources** button (or the "+" icon)
2. Select **Web** as your data source type
3. Choose your connection method:
   - **Option A**: Manually add events code
   - **Option B**: Connect using a partner platform (if you're using Shopify, WordPress, etc.)
4. For manual setup, you'll see two options:
   - Meta Pixel
   - Conversions API
   - **Select both** for the most comprehensive tracking

## Step 3: Configure Your Dataset

1. Name your Dataset (e.g., "Google Cloud Free Trial Web Events")
2. Enter your website domain: `googlecloudfreetrial.vercel.app`
3. Select any relevant business vertical (likely "Technology" or "E-commerce & Retail")
4. Click **Continue**

## Step 4: Set Up Event Tracking

You'll now need to implement the tracking code on your website:

### Option A: Update Your Existing Meta Pixel Code

If you already have Meta Pixel code on your site, you can continue using it with your new Dataset ID:

1. The Events Manager will provide you with a new Dataset ID
2. Replace your existing Pixel ID with this new Dataset ID in your website's code
3. The basic implementation will look like this:

```html
<!-- Meta Dataset Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_DATASET_ID'); // Replace with your Dataset ID
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_DATASET_ID&ev=PageView&noscript=1"/>
</noscript>
<!-- End Meta Dataset Code -->
```

### Option B: Use Meta's Event Setup Tool

If you prefer a no-code solution:

1. In Events Manager, select your Dataset
2. Go to **Settings** > **Event Setup**
3. Click **Open Event Setup Tool**
4. Follow the visual interface to select elements on your site to track

## Step 5: Configure Web Events

After iOS 14.5, you need to configure and prioritize your web events:

1. Go to **Events Manager** > **Data Sources** > select your Dataset
2. Navigate to **Settings** > **Event Setup**
3. Click on **Configure Web Events**
4. You can configure up to 8 events, but you should prioritize them in order of importance:
   - `Purchase` (highest priority)
   - `InitiateCheckout`
   - `Lead` (when user clicks "Get Started Now")
   - `PageView` (lowest priority)

## Step 6: Verify Domain Ownership

Domain verification is essential for accurate tracking:

1. Go to **Business Settings** > **Brand Safety** > **Domains**
2. Click **Add** and enter your domain: `googlecloudfreetrial.vercel.app`
3. Choose your verification method:
   - **Meta-tag verification**: Add a meta tag to your site's header
   - **HTML file upload**: Upload a specific HTML file to your server
   - **DNS verification**: Add a TXT record to your DNS settings
   - **Facebook Pixel**: If you already have the Pixel implemented

## Step 7: Test Your Implementation

Verify that your events are being tracked correctly:

1. In Events Manager, select your Dataset
2. Click **Test Events** in the sidebar
3. Enter your website URL and click "Open Website"
4. The Test Events tab will show real-time events as you navigate and interact with your site
5. Test the following key events:
   - Clicking "Get Started Now" button (should fire a `Lead` event)
   - Opening the checkout modal (should fire an `InitiateCheckout` event)
   - Completing a purchase (should fire a `Purchase` event)

## Step 8: Set Up Aggregated Event Measurement

For optimal tracking under iOS 14.5+ restrictions:

1. Go to **Events Manager** > **Aggregated Event Measurement**
2. Follow the prompts to configure your events
3. Remember you can only use 8 conversion events per domain

## Step 9: Create Custom Conversions

Custom conversions allow for more detailed tracking:

1. Go to **Events Manager** > **Custom Conversions**
2. Click **Create Custom Conversion**
3. Define your custom conversion rules:
   - **Button Click Conversion**: Event = `Lead`, Parameter = `content_name`, Value = `Get Started Now`
   - **High-Value Purchase**: Event = `Purchase`, Parameter = `value`, Condition = `Greater than`, Value = `90`

## Step 10: Connect to Facebook Ads

Make your Dataset available for ad optimization:

1. Go to **Business Settings** > **Data Sources** > select your Dataset
2. Under **Connected Assets** tab, click **Add Assets**
3. Select **Ad Accounts** and choose your ad account
4. Set permission level to "Full Access"

## Troubleshooting Common Issues

### Events Not Firing

1. Check browser console for JavaScript errors
2. Verify the Dataset ID is correctly implemented
3. Test with Facebook's Event Testing Tool
4. Ensure no ad blockers are interfering with the tracking

### iOS 14.5+ Tracking Issues

1. Verify your domain is properly verified
2. Ensure you've configured your 8 priority events
3. Remember that real-time reporting is limited for iOS users
4. Use Aggregated Event Measurement for iOS campaign optimization

### Dataset vs. Pixel Confusion

- The Dataset is the new container for all your tracking data
- The implementation code is still called "fbq" and works similarly to Pixel
- Your old Pixel ID may still work but should be replaced with the Dataset ID
- The tracking capabilities and event structure remain largely the same

## Next Steps

Once your Dataset is properly configured and tracking events:

1. Create custom audiences based on website visitors
2. Set up lookalike audiences from your custom audiences
3. Optimize ad campaigns for specific events (like purchases)
4. Analyze your conversion paths to improve marketing efficiency

For further assistance, refer to [Meta's Business Help Center](https://www.facebook.com/business/help) or contact Meta Business Support directly. 