import { useEffect, useState } from 'react';

const Debug = () => {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      // Collect environment information
      setInfo({
        'User Agent': navigator.userAgent,
        'Viewport': `${window.innerWidth}x${window.innerHeight}`,
        'URL': window.location.href,
        'React Version': (window as any).React?.version || 'Unknown'
      });
    } catch (err) {
      setError(`Error collecting debug info: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Debug Page</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
            <pre className="whitespace-pre-wrap text-red-800">{error}</pre>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Environment Info</h2>
          <ul className="space-y-2">
            {Object.entries(info).map(([key, value]) => (
              <li key={key} className="flex">
                <span className="font-medium w-32">{key}:</span>
                <span className="text-gray-600">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Navigation</h2>
          <div className="flex space-x-4">
            <a 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Debug; 