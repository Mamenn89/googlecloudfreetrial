
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Cloud, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 px-6 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Cloud className="h-6 w-6 text-cloud-blue" />
          <span className="font-semibold text-xl">CloudCredit</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-cloud-gray hover:text-cloud-blue transition-colors">Features</a>
          <a href="#pricing" className="text-cloud-gray hover:text-cloud-blue transition-colors">Pricing</a>
          <a href="#faq" className="text-cloud-gray hover:text-cloud-blue transition-colors">FAQ</a>
          <Button className="bg-cloud-blue hover:bg-cloud-darkBlue text-white">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-cloud-gray hover:text-cloud-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="text-cloud-gray hover:text-cloud-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="text-cloud-gray hover:text-cloud-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Button className="bg-cloud-blue hover:bg-cloud-darkBlue text-white w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
