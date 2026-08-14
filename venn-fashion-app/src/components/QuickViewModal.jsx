import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import OptimizedGifImage from './OptimizedGifImage';

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsSizeGuideOpen, formatPrice } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Obsidian');

  if (!quickViewProduct) return null;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Obsidian', 'Terracotta', 'Champagne'];

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-obsidian/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-crispwhite max-w-3xl w-full rounded-none shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-obsidian hover:text-terracotta bg-crispwhite/80 rounded-full"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 5-Second Motion GIF Media Container */}
        <div className="w-full md:w-1/2 bg-gray-100 h-72 md:h-auto relative">
          <OptimizedGifImage
            staticSrc={quickViewProduct.imagePrimary}
            gifSrc={quickViewProduct.gifSrc}
            alt={quickViewProduct.title}
            autoPlay={true}
            className="w-full h-full"
          />
         </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <h2 className="text-2xl font-serif text-obsidian uppercase mb-2">
              {quickViewProduct.title}
            </h2>
            <p className="text-lg font-sans text-terracotta font-semibold mb-4">
              {formatPrice(quickViewProduct.price)}
            </p>
            <p className="text-xs font-sans text-gray-600 leading-relaxed mb-6">
              Crafted from premium sustainable textiles. Features full 5-second motion preview. Designed with tailored precision for a relaxed luxury silhouette.
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-sans uppercase tracking-widest text-gray-500">
                  Size
                </label>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[10px] font-sans uppercase tracking-wider text-terracotta underline hover:text-obsidian"
                >
                  Size Guide & Measurements
                </button>
              </div>
              <div className="flex space-x-2">
                {sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 text-xs font-sans border transition-all ${
                      selectedSize === size 
                        ? 'border-obsidian bg-obsidian text-crispwhite' 
                        : 'border-gray-300 text-charcoal hover:border-gray-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mb-8">
              <label className="block text-xs font-sans uppercase tracking-widest text-gray-500 mb-2">
                Color
              </label>
              <div className="flex space-x-3">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 text-xs font-sans border transition-all ${
                      selectedColor === color
                        ? 'border-terracotta bg-terracotta/10 text-terracotta font-semibold'
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full py-4 bg-obsidian text-crispwhite uppercase tracking-widest text-xs font-bold hover:bg-terracotta transition-colors duration-300 shadow-md"
          >
            Add to Bag
          </button>
        </div>

      </div>
    </div>
  );
};

export default QuickViewModal;
