import React from 'react';
import { useCart } from '../context/CartContext';

const WishlistDrawer = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart, formatPrice } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      ></div>

      <div className="relative w-full max-w-md h-full bg-crispwhite shadow-2xl flex flex-col z-10 animate-slide-in">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-serif uppercase tracking-widest text-obsidian">
            Saved Wishlist ({wishlist.length})
          </h2>
          <button 
            className="p-2 text-charcoal hover:text-terracotta"
            onClick={() => setIsWishlistOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 font-sans text-sm mb-4">No saved items yet.</p>
              <button 
                onClick={() => setIsWishlistOpen(false)}
                className="px-6 py-2 bg-obsidian text-crispwhite text-xs uppercase tracking-widest hover:bg-terracotta transition-colors"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlist.map(item => (
              <div key={item.id} className="flex space-x-4 border-b border-gray-100 pb-6 items-center">
                <img src={item.imagePrimary} alt={item.title} className="w-16 h-20 object-cover bg-gray-100" />
                <div className="flex-1">
                  <h3 className="text-xs font-sans font-medium text-obsidian uppercase">{item.title}</h3>
                  <p className="text-xs font-sans text-terracotta mt-1">{formatPrice(item.price)}</p>
                  <button 
                    onClick={() => {
                      addToCart(item, 'M', 'Obsidian');
                      toggleWishlist(item);
                    }}
                    className="mt-2 text-[10px] font-sans uppercase tracking-widest bg-obsidian text-crispwhite px-3 py-1 hover:bg-terracotta transition-colors"
                  >
                    Move to Bag
                  </button>
                </div>
                <button 
                  onClick={() => toggleWishlist(item)}
                  className="text-gray-400 hover:text-red-500 text-xs p-2"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistDrawer;
