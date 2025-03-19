
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-cloud-blue to-cloud-darkBlue text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Building on Google Cloud Today
        </h2>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
          Get instant access to $300 in Google Cloud credits without the hassle of verification or adding payment methods.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="bg-white text-cloud-blue hover:bg-opacity-90 px-8 py-6 text-lg font-semibold">
            View Pricing Options
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
            Learn More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 max-w-3xl mx-auto gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">$300</div>
            <p className="opacity-90">Free credits per account</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">90 Days</div>
            <p className="opacity-90">Credit validity period</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">Instant</div>
            <p className="opacity-90">Account delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
