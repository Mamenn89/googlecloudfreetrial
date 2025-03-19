import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cloud-blue/70 to-cloud-darkBlue/70 z-0"></div>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cloud-blue/30 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2 z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cloud-blue/30 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2 z-0"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cloud-yellow/20 rounded-full filter blur-3xl z-0"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Start Building on Google Cloud Today
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
            Get instant access to $300 in Google Cloud credits without the hassle of verification or adding payment methods.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-white/20 backdrop-blur-md border border-white/40 text-white hover:bg-white/30 px-8 py-6 text-lg font-medium transition-all hover:shadow-lg">
              View Pricing
            </Button>
            <Button variant="outline" className="border-white/40 bg-transparent backdrop-blur-md text-white hover:bg-white/10 px-8 py-6 text-lg font-medium transition-all hover:shadow-lg">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto gap-6">
            <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg p-6 shadow-[0_8px_32px_rgba(31,38,135,0.1)] transition-all hover:transform hover:translate-y-[-5px] hover:bg-white/20">
              <div className="text-3xl font-bold mb-2 text-white">$300</div>
              <p className="text-white/90 font-light">Free credits per account</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg p-6 shadow-[0_8px_32px_rgba(31,38,135,0.1)] transition-all hover:transform hover:translate-y-[-5px] hover:bg-white/20">
              <div className="text-3xl font-bold mb-2 text-white">90 Days</div>
              <p className="text-white/90 font-light">Credit validity period</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg p-6 shadow-[0_8px_32px_rgba(31,38,135,0.1)] transition-all hover:transform hover:translate-y-[-5px] hover:bg-white/20">
              <div className="text-3xl font-bold mb-2 text-white">Instant</div>
              <p className="text-white/90 font-light">Account delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
