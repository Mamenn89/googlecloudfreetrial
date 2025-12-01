import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Cloud, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for the fixed navbar
          behavior: 'smooth'
        });

        // Close mobile menu if open
        setMobileMenuOpen(false);
      });
    });

    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function () { });
      });
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-cloud-blue/10 p-2 rounded-lg group-hover:bg-cloud-blue/20 transition-colors">
              <Cloud className="h-6 w-6 text-cloud-blue" />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">CloudCredit</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {['Features', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 hover:text-cloud-blue font-medium transition-colors relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cloud-blue transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <Link
            to="/blog/google-cloud-free-trial"
            className="text-gray-600 hover:text-cloud-blue font-medium transition-colors relative group"
          >
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cloud-blue transition-all duration-300 group-hover:w-full" />
          </Link>
          <Button className="bg-cloud-blue hover:bg-cloud-darkBlue text-white rounded-xl px-6 shadow-lg shadow-cloud-blue/20 hover:shadow-cloud-blue/40 transition-all hover:-translate-y-0.5">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="hover:bg-cloud-lightBlue/50"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {['Features', 'Pricing', 'FAQ'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-cloud-blue font-medium py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Link
                to="/blog/google-cloud-free-trial"
                className="text-gray-600 hover:text-cloud-blue font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Button className="bg-cloud-blue hover:bg-cloud-darkBlue text-white w-full rounded-xl py-6 shadow-lg shadow-cloud-blue/20">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
