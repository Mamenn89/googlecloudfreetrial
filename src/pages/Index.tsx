import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ, { CloudFeatures } from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const Index = () => {
  const [error, setError] = useState<string | null>(null);
  const [errorInfo, setErrorInfo] = useState<React.ErrorInfo | null>(null);

  useEffect(() => {
    // Add an error listener to catch unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      setError(event.error?.toString() || 'Unknown error occurred');
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-6">Something went wrong</h1>
          <pre className="whitespace-pre-wrap bg-red-50 p-4 rounded-md text-red-800 mb-6">
            {error}
          </pre>
          {errorInfo && (
            <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-gray-800 mb-6">
              {errorInfo.componentStack}
            </pre>
          )}
          <div className="flex space-x-4">
            <a 
              href="/debug"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Debug Page
            </a>
            <button 
              onClick={() => {
                setError(null);
                setErrorInfo(null);
                window.location.reload();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
          <Pricing />
          <FAQ />
          <CloudFeatures />
          <WhatsAppWidget />
        </main>
        <Footer />
      </div>
    );
  } catch (err) {
    console.error('Error rendering Index component:', err);
    setError(err instanceof Error ? err.message : String(err));
    return null;
  }
};

export default Index;
