import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import CheckoutModal from "./CheckoutModal";
import { trackButtonClick } from '../lib/metaPixelService';

const Pricing = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-white to-cloud-lightBlue/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cloud-blue to-cloud-darkBlue bg-clip-text text-transparent">Premium Access</h2>
          <p className="text-cloud-gray text-lg max-w-2xl mx-auto">
            Get started with Google Cloud quickly and efficiently
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-cloud-blue/10 hover:shadow-[0_20px_50px_rgba(8,112,184,0.15)] transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left side with description */}
              <div className="p-10 lg:col-span-2 bg-gradient-to-br from-cloud-blue to-cloud-darkBlue text-white flex flex-col justify-center">
                <div className="bg-white/20 text-white text-sm font-bold px-4 py-1 rounded-full w-max mb-6">
                  Limited Offer
                </div>
                <h3 className="text-3xl font-bold mb-4">Google Cloud Free Trial Account</h3>
                <p className="text-white/90 mb-6 text-lg">
                  Everything you need to get started with Google Cloud. Perfect for developers, startups, and cloud enthusiasts.
                </p>
                <div className="mt-auto">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-cloud-yellow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-sm">Secure payment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-2 text-cloud-yellow">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="text-sm">100% satisfaction guarantee</span>
                  </div>
                </div>
              </div>
              
              {/* Right side with price and features */}
              <div className="p-10 lg:col-span-3 flex flex-col">
                <div className="flex items-end mb-8">
                  <span className="text-5xl font-bold text-gray-900">$49.99</span>
                  <span className="text-cloud-gray ml-2 pb-2"> / account</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    "$300 Google Cloud Credits",
                    "90-day validity period",
                    "Instant account delivery",
                    "Priority email support",
                    "No credit card required",
                    "Account replacement guarantee",
                    "Full documentation and setup guides",
                    "24/7 customer service"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-1 bg-cloud-lightBlue p-1 rounded-full">
                        <Check className="h-4 w-4 text-cloud-blue" />
                      </div>
                      <span className="text-cloud-gray">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="bg-cloud-blue hover:bg-cloud-darkBlue text-white w-full py-7 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all mt-auto"
                  onClick={() => {
                    // Track the button click with Meta Pixel
                    trackButtonClick('Lead', 'Get Started Now', {
                      value: 49.99,
                      currency: 'USD'
                    });
                    // Open the checkout modal
                    setIsCheckoutOpen(true);
                  }}
                >
                  Get Started Now
                </Button>
                
                <p className="text-xs text-center text-cloud-gray mt-4">
                  Secure checkout with credit card, PayPal, or cryptocurrency
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Need more accounts?</h3>
          <p className="text-cloud-gray mb-6">
            We offer custom packages for businesses and educational institutions requiring larger quantities of Google Cloud trial accounts.
          </p>
          <a 
            href="mailto:andhika@batamwebhosting.com?subject=Bulk%20Pricing%20Inquiry"
            className="inline-block"
          >
            <Button 
              variant="outline" 
              className="border-cloud-blue text-cloud-blue hover:bg-cloud-lightBlue/30 px-8 py-4 rounded-xl shadow-sm"
            >
              Contact for Bulk Pricing
            </Button>
          </a>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productName="Google Cloud Free Trial Account"
        amount="49.99"
        currency="USD"
      />
    </section>
  );
};

export default Pricing;
