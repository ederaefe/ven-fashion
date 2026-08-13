import React, { useState } from 'react';

const GistSettingsModal = ({ isOpen, onClose, gistConfig, onSaveConfig }) => {
  const [token, setToken] = useState(gistConfig.token || '');
  const [gistId, setGistId] = useState(gistConfig.gistId || '');
  const [statusMsg, setStatusMsg] = useState(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({ token, gistId });
    setStatusMsg('Saved credentials to localStorage!');
    setTimeout(() => {
      setStatusMsg(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full z-10 shadow-2xl">
        <h2 className="text-lg font-bold text-white mb-2">GitHub Gist API Credentials</h2>
        <p className="text-xs text-zinc-400 mb-6">
          Enter your GitHub Personal Access Token (with <code className="text-orange-400">gist</code> scope) and target Gist ID to enable live sync.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              GitHub Personal Access Token (PAT)
            </label>
            <input 
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Gist ID
            </label>
            <input 
              type="text"
              value={gistId}
              onChange={(e) => setGistId(e.target.value)}
              placeholder="a1b2c3d4e5f6..."
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
            Save Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default GistSettingsModal;
