import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockCms';

const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isSearchOpen) return null;

  const filtered = mockProducts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-crispwhite/95 backdrop-blur-md animate-fade-in">
      {/* Search Header */}
      <div className="container mx-auto px-6 py-8 flex items-center justify-between border-b border-gray-200">
        <div className="flex-1 max-w-3xl flex items-center space-x-4">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products, collections, editorial..."
            className="w-full bg-transparent text-xl font-serif text-obsidian placeholder-gray-400 focus:outline-none"
            autoFocus
          />
        </div>
        <button 
          onClick={() => setIsSearchOpen(false)}
          className="p-2 text-charcoal hover:text-terracotta text-sm uppercase font-sans tracking-widest"
        >
          Close [ESC]
        </button>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-6 py-12 flex-1 overflow-y-auto">
        {searchTerm && (
          <p className="text-xs font-sans text-gray-500 uppercase tracking-widest mb-6">
            Search Results ({filtered.length})
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div 
              key={product.id}
              onClick={() => {
                setQuickViewProduct(product);
                setIsSearchOpen(false);
              }}
              className="cursor-pointer group bg-white p-4 border border-gray-100 hover:border-gray-300 transition-colors"
            >
              <img src={product.imagePrimary} alt={product.title} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-xs font-sans text-obsidian font-medium group-hover:text-terracotta">{product.title}</h3>
              <p className="text-xs font-sans text-gray-500 mt-1">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
