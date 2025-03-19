
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      question: "What exactly am I purchasing?",
      answer: "You're purchasing access to a pre-verified Google Cloud Platform account with $300 in free credits. These are legitimate trial accounts that allow you to explore and use all GCP services."
    },
    {
      question: "Are these accounts legitimate?",
      answer: "Yes, these are legitimate Google Cloud Platform trial accounts. Each account comes with the standard $300 credit offered by Google for new users."
    },
    {
      question: "How long are the credits valid for?",
      answer: "The $300 in credits are valid for 90 days from when the account was created. We provide accounts with the full validity period remaining."
    },
    {
      question: "Do I need to add a credit card to the account?",
      answer: "No, that's one of the main benefits of our service. These accounts are pre-verified so you don't need to provide any payment information to use the $300 credits."
    },
    {
      question: "How quickly will I receive my account?",
      answer: "Standard and Premium packages come with instant delivery. For Basic packages, delivery typically happens within 24 hours. We strive to process all orders as quickly as possible."
    },
    {
      question: "What happens when the credits run out?",
      answer: "When the $300 credits are used up or the 90-day period expires, the account will no longer provide free services. You would need to purchase another account for additional credits."
    },
    {
      question: "Can I transfer these credits to my existing Google account?",
      answer: "No, the credits are tied to the specific Google Cloud account we provide. They cannot be transferred to another account."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "We offer a replacement guarantee for our Standard and Premium packages. If an account becomes inaccessible within the 90-day period and credits remain, we'll replace it at no extra cost."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-cloud-lightGray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-cloud-gray text-lg max-w-2xl mx-auto">
            Find answers to the most common questions about our Google Cloud trial accounts.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg overflow-hidden bg-white shadow-sm">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-cloud-lightBlue transition-colors">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4">
                  <p className="text-cloud-gray">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-cloud-gray mb-4">
            Don't see your question here?
          </p>
          <Button variant="outline" className="border-cloud-blue text-cloud-blue hover:bg-cloud-lightBlue">
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
