import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import OptimizedGifImage from './OptimizedGifImage';

const FeaturedProducts = () => {
  const { products, setQuickViewProduct, addToCart, wishlist, toggleWishlist } = useCart();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Outerwear', 'Shirts', 'Trousers', 'Knitwear'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="new-arrivals" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-obsidian uppercase mb-4 tracking-wide">
          Curated Essentials
        </h2>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 pb-4 max-w-2xl mx-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-sans uppercase tracking-widest px-3 py-1 transition-colors ${
                activeCategory === cat 
                  ? 'text-terracotta border-b-2 border-terracotta font-semibold' 
                  : 'text-gray-500 hover:text-obsidian'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.map((product) => {
          const isSaved = wishlist.some(item => item.id === product.id);
          return (
            <div key={product.id} className="group relative flex flex-col justify-between">
              <div>
                {/* Product Image Card with Progressive GIF Hover / Tap Trigger */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  <OptimizedGifImage 
                    staticSrc={product.imagePrimary}
                    gifSrc={product.gifSrc}
                    alt={product.title}
                    className="w-full h-full"
                    onClick={() => setQuickViewProduct(product)}
                  />

                  {/* Tag Pill (NEW / SALE / EXCLUSIVE) */}
                  {product.tag && (
                    <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[9px] font-sans tracking-widest uppercase rounded-none shadow-sm ${product.tagColor}`}>
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-charcoal hover:text-terracotta transition-colors shadow-sm"
                    aria-label="Toggle wishlist"
                  >
                    <svg 
                      className={`w-4 h-4 ${isSaved ? 'fill-terracotta text-terracotta' : 'fill-none'}`} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex space-x-2 z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="flex-1 bg-obsidian text-crispwhite py-2.5 font-sans text-[10px] uppercase tracking-widest hover:bg-terracotta transition-colors"
                    >
                      Quick View
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 'M', 'Obsidian');
                      }}
                      className="px-3 bg-terracotta text-crispwhite py-2.5 font-sans text-[10px] uppercase tracking-widest hover:bg-obsidian transition-colors"
                    >
                      + Bag
                    </button>
                  </div>
                </div>
                
                <div className="text-center" onClick={() => setQuickViewProduct(product)}>
                  <h3 className="text-xs font-sans uppercase tracking-wider text-charcoal mb-1.5 group-hover:text-terracotta transition-colors cursor-pointer">
                    {product.title}
                  </h3>
                  <div className="flex justify-center items-center space-x-2 text-xs font-sans">
                    <span className="text-obsidian font-medium">{product.price}</span>
                    {product.originalPrice && (
                      <span className="line-through text-gray-400">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
