import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function useGoogleAnalytics() {
  useEffect(() => {
    // Add Google Analytics script
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-5JP28NZWT2';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-5JP28NZWT2');
    `;
    
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    return () => {
      // Cleanup if needed
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);
} 