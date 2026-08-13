import React, { useState, useEffect } from 'react';
import CmsNavbar from './components/CmsNavbar';
import ProductEditor from './components/ProductEditor';
import CollectionEditor from './components/CollectionEditor';
import SlideEditor from './components/SlideEditor';
import GistSettingsModal from './components/GistSettingsModal';
import JsonExporterModal from './components/JsonExporterModal';
import { initialProducts, initialCollections, initialSlides } from './data/initialCmsData';

function App() {
  const [activeTab, setActiveTab] = useState('products');
  const [isGistModalOpen, setIsGistModalOpen] = useState(false);
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

  useEffect(() => {
    localStorage.setItem('venn_cms_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('venn_cms_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('venn_cms_slides', JSON.stringify(slides));
  }, [slides]);

  const handleSaveGistConfig = (newConfig) => {
    setGistConfig(newConfig);
    localStorage.setItem('venn_gist_config', JSON.stringify(newConfig));
  };

  const isGistConnected = Boolean(gistConfig.token && gistConfig.gistId);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
      <CmsNavbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGistModal={() => setIsGistModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        isGistConnected={isGistConnected}
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

      <JsonExporterModal 
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        cmsData={{ products, collections, slides }}
      />
    </div>
  );
}

export default App;
