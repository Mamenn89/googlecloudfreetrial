
import { Cloud, Mail, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Cloud className="h-6 w-6 text-cloud-blue" />
              <span className="font-semibold text-xl">CloudCredit</span>
            </div>
            <p className="text-gray-400 mb-4">
              The easiest way to get Google Cloud Platform trial accounts with $300 credits.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Single Accounts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bulk Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Corporate Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Educational Discounts</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@cloudcredit.example</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>Live chat available 24/7</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Payment Options</h4>
              <div className="flex space-x-3">
                <div className="bg-white p-1 rounded">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="5" width="20" height="14" rx="2" fill="#1434CB" />
                    <path d="M10 9.5C10 8.672 10.672 8 11.5 8C12.328 8 13 8.672 13 9.5C13 10.328 12.328 11 11.5 11C10.672 11 10 10.328 10 9.5Z" fill="#FFFFFF" />
                  </svg>
                </div>
                <div className="bg-white p-1 rounded">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 7.44444C2 5.54211 3.54211 4 5.44444 4H18.5556C20.4579 4 22 5.54211 22 7.44444V16.5556C22 18.4579 20.4579 20 18.5556 20H5.44444C3.54211 20 2 18.4579 2 16.5556V7.44444Z" fill="#FF5F00" />
                  </svg>
                </div>
                <div className="bg-white p-1 rounded">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.2954 12.0023C19.3178 13.9538 17.9841 15.0992 16.2172 15.0992H14.3968V8.90625H16.2172C17.9841 8.90625 19.2954 10.0499 19.2954 12.0023Z" fill="#0079BE" />
                  </svg>
                </div>
                <div className="bg-white p-1 rounded">
                  <svg className="h-6 w-auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.976 9.15H10.024C9.5476 9.15 9.16 9.5376 9.16 10.014V11.018C9.16 11.4944 9.5476 11.882 10.024 11.882H13.976C14.4524 11.882 14.84 11.4944 14.84 11.018V10.014C14.84 9.5376 14.4524 9.15 13.976 9.15Z" fill="#888" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
          <p>© {new Date().getFullYear()} CloudCredit. All rights reserved.</p>
          <p className="mt-2">Not affiliated with Google LLC. Google Cloud Platform and the Google Cloud logo are trademarks of Google LLC.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
