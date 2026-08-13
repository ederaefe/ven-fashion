import React from 'react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockCms';

const LookbookSection = () => {
  const { setQuickViewProduct } = useCart();

  const hotspots = [
    { id: 'h1', top: '38%', left: '46%', product: mockProducts[0] },
    { id: 'h2', top: '65%', left: '54%', product: mockProducts[1] }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-xs font-sans tracking-[0.3em] text-champagne uppercase mb-2">
          Interactive Lookbook
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif text-obsidian uppercase">
          Shop the Campaign
        </h3>
      </div>

      <div className="relative w-full h-[75vh] min-h-[550px] bg-gray-900 overflow-hidden shadow-2xl">
        <img 
          src="/assets/hero_black_1.jpg" 
          alt="Campaign Lookbook Black Model" 
          className="w-full h-full object-cover opacity-95"
        />

        {/* Hotspot Pins */}
        {hotspots.map((spot) => (
          <div 
            key={spot.id}
            style={{ top: spot.top, left: spot.left }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          >
            <button 
              onClick={() => setQuickViewProduct(spot.product)}
              className="relative w-8 h-8 rounded-full bg-crispwhite/90 border-2 border-obsidian flex items-center justify-center hover:scale-125 transition-transform shadow-2xl animate-pulse"
              aria-label={`Shop ${spot.product.title}`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-terracotta"></span>
            </button>

            {/* Hover Tooltip Card */}
            <div className="hidden group-hover:block absolute bottom-10 left-1/2 transform -translate-x-1/2 w-52 bg-white p-3.5 shadow-2xl z-30 border border-gray-100 text-center animate-slide-up">
              <p className="text-xs font-sans font-medium text-obsidian uppercase">{spot.product.title}</p>
              <p className="text-xs font-sans text-terracotta font-semibold mt-0.5">{spot.product.price}</p>
              <span className="text-[9px] font-sans uppercase tracking-widest text-gray-400 mt-2 block border-t border-gray-100 pt-1">Click to Shop</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LookbookSection;
