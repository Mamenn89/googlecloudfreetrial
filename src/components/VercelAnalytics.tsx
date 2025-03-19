import { useEffect, useState } from 'react';

// Create a placeholder component that will load Vercel Analytics only in production
// This approach uses dynamic imports to prevent build failures
export default function VercelAnalytics() {
  const [Analytics, setAnalytics] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only load the Analytics component in production
    const loadAnalytics = async () => {
      try {
        const module = await import('@vercel/analytics/react');
        setAnalytics(() => module.Analytics);
      } catch (error) {
        console.warn('Vercel Analytics failed to load:', error);
      }
    };

    loadAnalytics();
  }, []);

  // Render the Analytics component if it loaded successfully
  return Analytics ? <Analytics /> : null;
} 