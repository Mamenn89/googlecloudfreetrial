import React from 'react';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface BlogPostProps {
  title: string;
  imageUrl: string;
  content: React.ReactNode;
  readingTime?: string;
  publishDate?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  imageUrl,
  content,
  readingTime = "15 min read",
  publishDate = "May 15, 2024"
}) => {
  return (
    <div className="bg-white">
      {/* Hero section with image */}
      <div className="w-full h-[300px] md:h-[400px] relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h1>
          <div className="flex items-center text-white space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">{publishDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{readingTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row">
          {/* Main content */}
          <div className="md:w-3/4 md:pr-10">
            <div className="mb-6">
              <Link to="/">
                <Button variant="outline" className="border-cloud-blue text-cloud-blue hover:bg-cloud-lightBlue">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="prose max-w-none prose-headings:text-cloud-darkBlue prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h3:text-xl prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-cloud-blue prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-strong:text-cloud-darkBlue prose-ul:list-disc prose-ul:pl-5 prose-ol:pl-5 prose-li:text-gray-700 prose-li:my-1">
              {content}
            </div>

            {/* Share buttons */}
            <div className="mt-12 border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-lg mb-4">Share this post</h3>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="flex items-center border-gray-300 hover:bg-gray-100 text-gray-700">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="flex items-center border-gray-300 hover:bg-gray-100 text-gray-700">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center border-gray-300 hover:bg-gray-100 text-gray-700">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="flex items-center border-gray-300 hover:bg-gray-100 text-gray-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-12 bg-gradient-to-r from-cloud-lightBlue to-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to start your Google Cloud journey?</h3>
              <p className="text-gray-700 mb-4">Get instant access to Google Cloud Platform with our pre-configured trial accounts.</p>
              <a href="/#pricing">
                <Button className="bg-cloud-blue hover:bg-cloud-darkBlue text-white">
                  Get Started Now
                </Button>
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4 mt-10 md:mt-0">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Table of Contents</h3>
              <nav className="space-y-2">
                <a href="#introduction" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">Introduction</a>
                <a href="#what-exactly-does-the-google-cloud-free-trial-include" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">What's Included</a>
                <a href="#common-challenges-when-starting-with-google-cloud" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">Common Challenges</a>
                <a href="#5-strategic-steps-to-maximize-your-google-cloud-free-trial" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">5 Strategic Steps</a>
                <a href="#10-lesser-known-google-cloud-features-worth-exploring" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">10 Lesser-Known Features</a>
                <a href="#real-world-success-stories" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">Success Stories</a>
                <a href="#beyond-the-free-trial" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">Beyond the Free Trial</a>
                <a href="#conclusion" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">Conclusion</a>
                <a href="#faq-google-cloud-free-trial" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">FAQ</a>
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">Related Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://cloud.google.com/docs" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">Google Cloud Documentation</a>
                  </li>
                  <li>
                    <a href="https://cloud.google.com/pricing" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">GCP Pricing Calculator</a>
                  </li>
                  <li>
                    <a href="https://www.cloudskillsboost.google" className="block text-cloud-blue hover:text-cloud-darkBlue transition-colors">Google Cloud Skills Boost</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost; 