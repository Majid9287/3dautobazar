// pages/api-guide.js
import { useState } from "react";

import styles from "@/styles/Color.module.css";
export default function ApiGuide() {
  const [copied, setCopied] = useState(false);
  const apiUrl = "https://programmingdrip.com/generate_3d_model";

  const handleCopy = () => {
    navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2">
      <div
        className={`max-w-4xl px-2 md:px-4 mx-auto bg-white p-6 mt-24 rounded-lg shadow-md ${styles.gradientBg3}`}
      >
        <h1 className="text-2xl font-bold mb-4">How to Use Our API</h1>
        <p className="mb-4">
          We provide a free API for auto 3D modeling from 2D images. Follow the
          instructions below to get started.
        </p>

        <h2 className="text-xl font-semibold mb-4">API Endpoint</h2>
        <p className="mb-4">
          <strong>POST</strong> <code>{apiUrl}</code>
        </p>

        <h2 className="text-xl font-semibold mb-4">Request Format</h2>
        <p className="mb-4">
          The API expects a POST request with a multipart/form-data body
          containing one or more 2D images.
        </p>

        <h2 className="text-xl font-semibold mb-4">Example Code</h2>
        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto mb-6">
          <code>
            {`const formData = new FormData();
for (let i = 0; i < selectedFiles.length; i++) {
  formData.append("images", selectedFiles[i]);
}

try {
  const response = await fetch("https://programmingdrip.com/generate_3d_model", {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    console.log('3D model generated successfully:', data);
  } else {
    console.error('Error generating 3D model:', response.statusText);
  }
} catch (error) {
  console.error('Network error:', error);
}`}
          </code>
        </pre>

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
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
          
            <img src="/images/exm3.jpg" alt="Example 1" className="mb-4 w-full h-60 object-cover rounded-lg"/>
            <p className="text-gray-700 mb-4">Uploading multiple 2D images to generate a more detailed 3D model.</p>
            
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
           
            <img src="/images/exm2.jpg" alt="Example 2" className="mb-4 w-full h-60 object-cover rounded-lg"/>
            <p className="text-gray-700 mb-4">Uploading multiple 2D images to generate a more detailed 3D model.</p>
           
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            
            <img src="/images/exm1.jpg" alt="Example 3" className="mb-4 w-full h-60 object-cover rounded-lg"/>
            <p className="text-gray-700 mb-4">Uploading multiple 2D images to generate a more detailed 3D model.</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
