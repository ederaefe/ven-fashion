import React, { useState } from 'react';

const WorkerSettingsModal = ({ isOpen, onClose, workerConfig, onSaveConfig }) => {
  const [workerUrl, setWorkerUrl] = useState(workerConfig.workerUrl || '');
  const [workerToken, setWorkerToken] = useState(workerConfig.workerToken || '');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({ workerUrl, workerToken });
    setStatusMsg('Saved Worker credentials to localStorage!');
    setTimeout(() => {
      setStatusMsg(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full z-10 shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-2">Cloudflare Worker Edge Settings</h2>
        <p className="text-xs text-zinc-400 mb-6">
          Enter your deployed Cloudflare Worker API URL and the secure Authorization Secret Key.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Cloudflare Worker API Endpoint
            </label>
            <input 
              type="text"
              value={workerUrl}
              onChange={(e) => setWorkerUrl(e.target.value)}
              placeholder="https://venn-cms-worker.YOUR_SUBDOMAIN.workers.dev/api/cms"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Secret API Token (Authorization Key)
            </label>
            <input 
              type="password"
              value={workerToken}
              onChange={(e) => setWorkerToken(e.target.value)}
              placeholder="Enter VENN_API_KEY secret"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>
        </div>

        {statusMsg && (
          <div className="mb-4 text-xs font-semibold text-emerald-400 bg-emerald-500/10 p-2.5 rounded border border-emerald-500/30 text-center">
            {statusMsg}
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white rounded transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerSettingsModal;
