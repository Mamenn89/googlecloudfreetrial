import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import CheckoutModal from "./CheckoutModal";
import { trackButtonClick } from '../lib/metaPixelService';
import { motion } from "framer-motion";

const Pricing = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-cloud-lightBlue/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cloud-lightBlue/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-cloud-blue/10 text-cloud-blue font-medium text-sm"
          >
            Pricing Plans
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cloud-blue to-cloud-darkBlue bg-clip-text text-transparent"
          >
            Premium Access
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-cloud-gray text-lg max-w-2xl mx-auto"
          >
            Get started with Google Cloud quickly and efficiently with our fully verified accounts.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-cloud-blue/10 hover:shadow-[0_30px_80px_rgba(66,133,244,0.15)] transition-all duration-500 relative"
          >
            <div className="absolute top-0 right-0 bg-cloud-yellow text-white text-xs font-bold px-8 py-1.5 transform rotate-45 translate-x-8 translate-y-4 shadow-sm z-20">
              BEST VALUE
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left side with description */}
              <div className="p-10 lg:col-span-2 bg-gradient-to-br from-cloud-blue to-cloud-darkBlue text-white flex flex-col justify-center relative overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-[-50px] left-[-50px] w-40 h-40 rounded-full bg-white blur-3xl" />
                  <div className="absolute bottom-[-50px] right-[-50px] w-40 h-40 rounded-full bg-white blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-2 mb-6">
                    <Star className="h-5 w-5 text-cloud-yellow fill-cloud-yellow" />
                    <span className="font-semibold tracking-wide uppercase text-sm text-cloud-lightBlue">Premium Tier</span>
                  </div>

                  <h3 className="text-3xl font-bold mb-4 leading-tight">Google Cloud Free Trial Account</h3>
                  <p className="text-white/90 mb-8 text-lg leading-relaxed">
                    Everything you need to get started with Google Cloud. Perfect for developers, startups, and cloud enthusiasts.
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="mr-3 text-cloud-yellow bg-white/10 p-1.5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">Secure SSL Payment</span>
                    </div>
                    <div className="flex items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="mr-3 text-cloud-yellow bg-white/10 p-1.5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">100% Satisfaction Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side with price and features */}
              <div className="p-10 lg:col-span-3 flex flex-col bg-white">
                <div className="flex items-end mb-8 border-b border-gray-100 pb-8">
                  <span className="text-6xl font-bold text-gray-900 tracking-tight">$49.99</span>
                  <span className="text-cloud-gray ml-3 pb-2 text-lg font-medium">/ account</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                  {[
                    "$300 Google Cloud Credits",
                    "90-day validity period",
                    "Instant account delivery",
                    "Priority email support",
                    "No credit card required",
                    "Account replacement guarantee",
                    "Full documentation included",
                    "24/7 customer service"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5 bg-green-50 p-1 rounded-full shrink-0">
                        <Check className="h-4 w-4 text-green-500" />
                      </div>
                      <span className="text-gray-600 font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="bg-gradient-to-r from-cloud-blue to-cloud-darkBlue hover:from-cloud-darkBlue hover:to-cloud-blue text-white w-full py-8 text-xl font-bold rounded-xl shadow-lg hover:shadow-cloud-blue/25 hover:-translate-y-1 transition-all duration-300 mt-auto"
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

                <div className="flex justify-center items-center mt-6 space-x-4 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Need more accounts?</h3>
          <p className="text-cloud-gray mb-8">
            We offer custom packages for businesses and educational institutions requiring larger quantities of Google Cloud trial accounts.
          </p>
          <a
            href="mailto:andhika@batamwebhosting.com?subject=Bulk%20Pricing%20Inquiry"
            className="inline-block"
          >
            <Button
              variant="outline"
              className="border-cloud-blue text-cloud-blue hover:bg-cloud-lightBlue/30 px-8 py-6 rounded-xl shadow-sm text-lg"
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
