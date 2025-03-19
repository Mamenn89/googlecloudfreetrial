import { useEffect } from 'react';

const WhatsAppWidget = () => {
  useEffect(() => {
    // Load the Elfsight platform script
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="elfsight-app-cc49addb-2342-4f66-978f-a0e461792fcf" 
      data-elfsight-app-lazy
    ></div>
  );
};

export default WhatsAppWidget; 