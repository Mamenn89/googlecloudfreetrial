
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  popular = false,
  buttonText = "Buy Now"
}: { 
  title: string, 
  price: string, 
  description: string, 
  features: string[],
  popular?: boolean,
  buttonText?: string
}) => {
  return (
    <div className={`rounded-lg ${popular ? 'border-2 border-cloud-blue scale-105' : 'border border-gray-200'} bg-white shadow-lg p-8 relative flex flex-col`}>
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cloud-blue text-white text-sm font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        <span className="text-cloud-gray"> / account</span>
      </div>
      <p className="text-cloud-gray mb-6">{description}</p>
      <div className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-2 mt-1">
              <Check className="h-5 w-5 text-cloud-green" />
            </div>
            <span className="text-sm text-cloud-gray">{feature}</span>
          </div>
        ))}
      </div>
      <Button className={`${popular ? 'bg-cloud-blue hover:bg-cloud-darkBlue' : 'bg-gray-800 hover:bg-gray-700'} text-white w-full py-6`}>
        {buttonText}
      </Button>
    </div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-cloud-gray text-lg max-w-2xl mx-auto">
            Choose the option that works best for you. All accounts come with $300 credit and 90-day validity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard 
            title="Basic"
            price="$19.99"
            description="Perfect for testing and small projects"
            features={[
              "$300 Google Cloud Credits",
              "90-day validity period",
              "Email delivery within 24 hours",
              "Basic email support",
              "Single account",
              "No credit card required"
            ]}
          />
          
          <PricingCard 
            title="Standard"
            price="$49.99"
            description="Ideal for developers and startups"
            features={[
              "$300 Google Cloud Credits",
              "90-day validity period",
              "Instant account delivery",
              "Priority email support",
              "3 accounts included",
              "No credit card required",
              "Account replacement guarantee"
            ]}
            popular={true}
          />
          
          <PricingCard 
            title="Premium"
            price="$99.99"
            description="Best for teams and businesses"
            features={[
              "$300 Google Cloud Credits per account",
              "90-day validity period",
              "Instant account delivery",
              "24/7 priority support",
              "7 accounts included",
              "No credit card required",
              "Account replacement guarantee",
              "Dedicated account manager"
            ]}
          />
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Need more accounts?</h3>
          <p className="text-cloud-gray mb-6">
            We offer custom packages for businesses and educational institutions requiring larger quantities of Google Cloud trial accounts.
          </p>
          <Button variant="outline" className="border-cloud-blue text-cloud-blue hover:bg-cloud-lightBlue">
            Contact for Bulk Pricing
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
