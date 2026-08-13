import React from 'react';
import { useCart } from '../context/CartContext';

const CollectionGrid = () => {
  const { collections } = useCart();

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <a 
            key={collection.id} 
            href="#" 
            className="group relative block w-full aspect-[4/5] overflow-hidden bg-gray-100"
          >
            <img 
              src={collection.image} 
              alt={collection.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-obsidian/20 transition-opacity group-hover:bg-obsidian/40"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-serif text-crispwhite uppercase mb-2">
                {collection.title}
              </h3>
              <span className="inline-block text-sm font-sans text-crispwhite tracking-widest uppercase border-b border-crispwhite pb-1 group-hover:border-terracotta transition-colors">
                Explore
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CollectionGrid;
