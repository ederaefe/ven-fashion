import React from 'react';

const CmsNavbar = ({ activeTab, setActiveTab, onOpenGistModal, onOpenExportModal, isGistConnected }) => {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logotype */}
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse"></span>
          <h1 className="font-serif text-lg text-white font-bold tracking-wider uppercase">
            Venn Fashion CMS
          </h1>
          <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
            v1.0 Headless
          </span>
        </div>

        {/* Tab Links */}
        <nav className="flex space-x-2">
          {['products', 'collections', 'slides'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors ${
                activeTab === tab 
                  ? 'bg-orange-600 text-white shadow-md' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenGistModal}
            className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors flex items-center space-x-1.5 ${
              isGistConnected 
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' 
                : 'border-amber-500/50 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isGistConnected ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span>{isGistConnected ? 'Gist Sync Active' : 'Connect GitHub Gist'}</span>
          </button>

          <button 
            onClick={onOpenExportModal}
            className="px-3 py-1.5 text-xs font-semibold bg-zinc-800 text-zinc-200 rounded border border-zinc-700 hover:bg-zinc-700 transition-colors"
          >
            Export JSON
          </button>
        </div>

      </div>
    </header>
  );
};

export default CmsNavbar;
