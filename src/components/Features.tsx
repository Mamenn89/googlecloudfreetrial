
import { Shield, CloudOff, Zap, Server, Clock, CreditCard } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100">
      <div className="bg-cloud-lightBlue rounded-full p-3 inline-block mb-4">
        <Icon className="h-6 w-6 text-cloud-blue" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-cloud-gray">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Pre-Verified Accounts",
      description: "All accounts are already verified and ready to use. No need to provide your personal details."
    },
    {
      icon: Server,
      title: "$300 Free Credits",
      description: "Each account comes loaded with $300 in Google Cloud credits, usable for any GCP service."
    },
    {
      icon: Clock,
      title: "90-Day Validity",
      description: "Extended trial period gives you more time to explore and build on Google Cloud Platform."
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Receive your account credentials immediately after purchase. No waiting time."
    },
    {
      icon: CloudOff,
      title: "No Restrictions",
      description: "Access all Google Cloud services without limitations that typically come with new accounts."
    },
    {
      icon: CreditCard,
      title: "No Credit Card Needed",
      description: "Use the credits without attaching your personal payment methods to the account."
    }
  ];

  return (
    <section id="features" className="py-16 bg-cloud-lightGray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Cloud Credits?</h2>
          <p className="text-cloud-gray text-lg max-w-2xl mx-auto">
            Our Google Cloud Platform trial accounts offer several advantages over creating a new account yourself.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
