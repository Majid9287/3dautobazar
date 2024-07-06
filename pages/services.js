// pages/api-guide.js
import { useState } from 'react';

export default function ApiGuide() {
  const [copied, setCopied] = useState(false);
  const apiUrl = 'https://example.com/api/convert-2d-to-3d';

  const handleCopy = () => {
    navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">How to Use Our API</h1>
        <p className="mb-4">We provide a free API for auto 3D modeling from 2D images. Follow the instructions below to get started.</p>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={apiUrl}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Example 1</h2>
            <p className="text-gray-700">Description of the first example. This is where you can provide details on how to use the API for this specific case.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Example 2</h2>
            <p className="text-gray-700">Description of the second example. This is another scenario showing the use of the API.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Example 3</h2>
            <p className="text-gray-700">Description of the third example. Explain how to use the API for this particular example.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
