import { Button } from "@/components/ui/button";
import { ArrowRight, Cloud, Server, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-cloud-lightBlue/50 via-white to-white py-20 md:py-32">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-cloud-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cloud-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2 mb-12 md:mb-0"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-cloud-lightBlue/50 border border-cloud-blue/20 text-cloud-blue font-medium text-sm">
              🚀 Instant Access to Google Cloud
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Google Cloud Credits
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cloud-blue to-cloud-darkBlue block mt-2 pb-2">
                At Your Fingertips
              </span>
            </h1>
            <p className="text-lg md:text-xl text-cloud-gray mb-8 max-w-lg leading-relaxed">
              Get instant access to Google Cloud Platform with our pre-configured trial accounts. Start building your dreams without the wait.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#pricing">
                <Button className="bg-cloud-blue hover:bg-cloud-darkBlue text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-cloud-blue/30 transition-all duration-300 transform hover:-translate-y-1">
                  View Pricing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#faq">
                <Button variant="outline" className="border-cloud-blue/30 text-cloud-blue hover:bg-cloud-lightBlue/50 px-8 py-6 text-lg rounded-xl backdrop-blur-sm">
                  Learn More
                </Button>
              </a>
            </div>

            <div className="flex items-center mt-10 space-x-8 border-t border-gray-100 pt-8">
              <div className="flex items-center">
                <div className="p-2 bg-cloud-lightBlue/50 rounded-lg mr-3">
                  <Server className="h-5 w-5 text-cloud-blue" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">$300</p>
                  <p className="text-xs text-cloud-gray">Credits</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-cloud-lightBlue/50 rounded-lg mr-3">
                  <Shield className="h-5 w-5 text-cloud-blue" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Secure</p>
                  <p className="text-xs text-cloud-gray">Access</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-cloud-lightBlue/50 rounded-lg mr-3">
                  <Cloud className="h-5 w-5 text-cloud-blue" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Instant</p>
                  <p className="text-xs text-cloud-gray">Delivery</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:w-1/2 relative"
          >
            <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 p-8 md:p-10 animate-float max-w-md mx-auto">
              <div className="flex items-center mb-8">
                <div className="bg-white p-3 rounded-xl shadow-md mr-4">
                  <Cloud className="h-10 w-10 text-cloud-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-900">Google Cloud</h3>
                  <p className="text-cloud-gray font-medium">Free Trial Account</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {[
                  { title: "$300 Cloud Credits", desc: "Use for any GCP service" },
                  { title: "90-Day Validity", desc: "Extended trial period" },
                  { title: "No Credit Card", desc: "Pre-verified accounts" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start group">
                    <div className="bg-cloud-lightBlue/50 group-hover:bg-cloud-blue group-hover:text-white transition-colors rounded-full p-1.5 mr-4 mt-1">
                      <svg className="h-4 w-4 text-cloud-blue group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-cloud-gray">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a href="#pricing">
                <Button className="w-full bg-gradient-to-r from-cloud-blue to-cloud-darkBlue hover:from-cloud-darkBlue hover:to-cloud-blue text-white py-6 text-lg rounded-xl shadow-lg shadow-cloud-blue/20 transition-all">
                  Get Your Account Now
                </Button>
              </a>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-cloud-yellow text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg transform rotate-12 z-20"
            >
              Limited Time Offer!
            </motion.div>

            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cloud-blue/10 rounded-full blur-2xl z-0" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;