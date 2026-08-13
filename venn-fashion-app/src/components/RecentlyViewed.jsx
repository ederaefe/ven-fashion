import React from 'react';
import { useCart } from '../context/CartContext';

const RecentlyViewed = () => {
  const { recentlyViewed, setQuickViewProduct } = useCart();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xs font-sans tracking-[0.2em] text-gray-500 uppercase">
          Recently Viewed Items
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {recentlyViewed.map(product => (
          <div 
            key={product.id}
            onClick={() => setQuickViewProduct(product)}
            className="group cursor-pointer bg-white p-2 border border-gray-100 hover:border-gray-300 transition-all"
          >
            <img src={product.imagePrimary} alt={product.title} className="w-full h-32 object-cover mb-2" />
            <h3 className="text-[10px] font-sans text-obsidian uppercase truncate group-hover:text-terracotta">{product.title}</h3>
            <p className="text-[10px] font-sans text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
