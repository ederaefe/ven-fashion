import React, { useState } from 'react';

const JsonExporterModal = ({ isOpen, onClose, cmsData }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(cmsData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl w-full z-10 shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase">Raw CMS JSON Payload</h2>
            <p className="text-xs text-zinc-400">Copy this payload directly into your GitHub Gist file or environment variables.</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-sm p-1">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto bg-zinc-950 p-4 rounded border border-zinc-800 font-mono text-xs text-orange-300 leading-relaxed mb-4">
          <pre>{jsonString}</pre>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-zinc-500 font-mono">
            {cmsData.products.length} Products • {cmsData.collections.length} Collections • {cmsData.slides.length} Slides
          </span>
          <div className="space-x-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
            >
              Close
            </button>
            <button 
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white rounded shadow transition-colors"
            >
              {copied ? '✓ Copied Payload!' : 'Copy Payload to Clipboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonExporterModal;
