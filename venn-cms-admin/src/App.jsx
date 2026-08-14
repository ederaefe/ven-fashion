import React, { useState, useEffect } from 'react';
import CmsNavbar from './components/CmsNavbar';
import ProductEditor from './components/ProductEditor';
import CollectionEditor from './components/CollectionEditor';
import SlideEditor from './components/SlideEditor';
import GistSettingsModal from './components/GistSettingsModal';
import WorkerSettingsModal from './components/WorkerSettingsModal';
import JsonExporterModal from './components/JsonExporterModal';
import { initialProducts, initialCollections, initialSlides } from './data/initialCmsData';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [isGistModalOpen, setIsGistModalOpen] = useState(false);
  const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('venn_cms_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem('venn_cms_collections');
      return saved ? JSON.parse(saved) : initialCollections;
    } catch {
      return initialCollections;
    }
  });

  const [slides, setSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('venn_cms_slides');
      return saved ? JSON.parse(saved) : initialSlides;
    } catch {
      return initialSlides;
    }
  });

  const [gistConfig, setGistConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('venn_gist_config');
      return saved ? JSON.parse(saved) : { token: '', gistId: '' };
    } catch {
      return { token: '', gistId: '' };
    }
  });

  const [workerConfig, setWorkerConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('venn_worker_config');
      return saved ? JSON.parse(saved) : { workerUrl: '', workerToken: '' };
    } catch {
      return { workerUrl: '', workerToken: '' };
    }
  });

  const [isPublishingGist, setIsPublishingGist] = useState(false);
  const [isPublishingWorker, setIsPublishingWorker] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('venn_cms_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('venn_cms_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('venn_cms_slides', JSON.stringify(slides));
  }, [slides]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveGistConfig = (newConfig) => {
    setGistConfig(newConfig);
    localStorage.setItem('venn_gist_config', JSON.stringify(newConfig));
  };

  const handleSaveWorkerConfig = (newConfig) => {
    setWorkerConfig(newConfig);
    localStorage.setItem('venn_worker_config', JSON.stringify(newConfig));
  };

  const isGistConnected = Boolean(gistConfig.token && gistConfig.gistId);
  const isWorkerConnected = Boolean(workerConfig.workerUrl && workerConfig.workerToken);

  const handlePublishToWorker = async () => {
    if (!isWorkerConnected) return;
    setIsPublishingWorker(true);
    try {
      const res = await fetch(workerConfig.workerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${workerConfig.workerToken}`
        },
        body: JSON.stringify({ products, collections, slides })
      });
      if (res.ok) {
        showToast('Successfully published CMS data to Cloudflare Worker Edge Database!');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(`Failed to publish: ${errData.error || res.statusText}`);
      }
    } catch (err) {
      showToast(`Network error: ${err.message}`);
    } finally {
      setIsPublishingWorker(false);
    }
  };

  const handlePublishToGist = async () => {
    if (!isGistConnected) return;
    setIsPublishingGist(true);
    try {
      const res = await fetch(`https://api.github.com/gists/${gistConfig.gistId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${gistConfig.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          files: {
            'cms_data.json': {
              content: JSON.stringify({ products, collections, slides }, null, 2)
            }
          }
        })
      });
      if (res.ok) {
        showToast('Successfully synchronized CMS data to GitHub Gist!');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(`Failed to update Gist: ${errData.message || res.statusText}`);
      }
    } catch (err) {
      showToast(`Network error: ${err.message}`);
    } finally {
      setIsPublishingGist(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      <CmsNavbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGistModal={() => setIsGistModalOpen(true)}
        onOpenWorkerModal={() => setIsWorkerModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isGistConnected={isGistConnected}
        isWorkerConnected={isWorkerConnected}
        onPublishToWorker={handlePublishToWorker}
        onPublishToGist={handlePublishToGist}
        isPublishingGist={isPublishingGist}
        isPublishingWorker={isPublishingWorker}
      />

      <main className="flex-grow">
        {activeTab === 'products' && (
          <ProductEditor products={products} setProducts={setProducts} />
        )}

        {activeTab === 'collections' && (
          <CollectionEditor collections={collections} setCollections={setCollections} />
        )}

        {activeTab === 'slides' && (
          <SlideEditor slides={slides} setSlides={setSlides} />
        )}
      </main>

      {/* Overlays */}
      <GistSettingsModal 
        isOpen={isGistModalOpen}
        onClose={() => setIsGistModalOpen(false)}
        gistConfig={gistConfig}
        onSaveConfig={handleSaveGistConfig}
      />

      <WorkerSettingsModal 
        isOpen={isWorkerModalOpen}
        onClose={() => setIsWorkerModalOpen(false)}
        workerConfig={workerConfig}
        onSaveConfig={handleSaveWorkerConfig}
      />

      <JsonExporterModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        cmsData={{ products, collections, slides }}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-orange-600 border border-orange-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 shadow-2xl transition-all">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
