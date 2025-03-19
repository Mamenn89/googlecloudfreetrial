import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Server, Shield } from "lucide-react";

const Hero = () => {
  return <div className="bg-gradient-to-r from-cloud-lightBlue to-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 mx-0 my-0 px-0 md:text-4xl text-left py-0">
              Google Cloud Credits
              <span className="text-cloud-blue"> At Your Fingertips</span>
            </h1>
            <p className="text-lg md:text-xl text-cloud-gray mb-8">
              Get instant access to Google Cloud Platform with our pre-configured trial accounts. Start building without the wait.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#pricing">
                <Button className="bg-cloud-blue hover:bg-cloud-darkBlue text-white px-8 py-6 text-lg">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#faq">
                <Button variant="outline" className="border-cloud-blue text-cloud-blue hover:bg-cloud-lightBlue px-8 py-6 text-lg">
                  Learn More
                </Button>
              </a>
            </div>
            
            <div className="flex items-center mt-8 space-x-8">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-cloud-blue mr-2" />
                <span className="text-sm text-cloud-gray">$300 Credits</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-cloud-blue mr-2" />
                <span className="text-sm text-cloud-gray">Secure Access</span>
              </div>
              <div className="flex items-center">
                <Cloud className="h-5 w-5 text-cloud-blue mr-2" />
                <span className="text-sm text-cloud-gray">Instant Delivery</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 animate-float max-w-md mx-auto">
              <div className="flex items-center mb-6">
                <Cloud className="h-8 w-8 text-cloud-blue mr-3" />
                <div>
                  <h3 className="font-bold text-xl">Google Cloud Platform</h3>
                  <p className="text-cloud-gray">Free Trial Account</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-cloud-lightBlue rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-cloud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">$300 Cloud Credits</h4>
                    <p className="text-sm text-cloud-gray">Use for any GCP service</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-cloud-lightBlue rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-cloud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">90-Day Validity</h4>
                    <p className="text-sm text-cloud-gray">Extended trial period</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-cloud-lightBlue rounded-full p-1 mr-3 mt-1">
                    <svg className="h-4 w-4 text-cloud-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">No Credit Card Required</h4>
                    <p className="text-sm text-cloud-gray">Pre-verified accounts</p>
                  </div>
                </div>
              </div>
              
              <a href="#pricing">
                <Button className="w-full bg-cloud-blue hover:bg-cloud-darkBlue text-white py-6">
                  Get Your Account Now
                </Button>
              </a>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-cloud-yellow text-white text-sm font-bold px-4 py-1 rounded-full transform rotate-12">
              Limited Time Offer!
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Hero;