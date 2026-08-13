import React from 'react';
import { useCart } from '../context/CartContext';

const PromoBanner = () => {
  const { showToast } = useCart();

  const handleCopyCode = () => {
    navigator.clipboard.writeText('VENN10');
    showToast('Promo code VENN10 copied to clipboard!');
  };

  return (
    <section className="bg-terracotta text-crispwhite py-12 px-4 text-center my-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xs font-sans tracking-[0.3em] uppercase mb-2">
          Exclusive Offer
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif uppercase mb-4">
          Enjoy 10% Off Your First Luxury Order
        </h3>
        <p className="text-xs font-sans mb-6 max-w-xl mx-auto opacity-90">
          Use promo code <span className="font-bold border-b border-crispwhite pb-0.5">VENN10</span> at checkout to claim your welcome discount on AW26 items.
        </p>
        <button 
          onClick={handleCopyCode}
          className="px-8 py-3 bg-obsidian text-crispwhite text-xs uppercase tracking-widest font-bold hover:bg-crispwhite hover:text-obsidian transition-colors shadow-lg"
        >
          Copy Code "VENN10"
        </button>
      </div>
    </section>
  );
};

export default PromoBanner;
