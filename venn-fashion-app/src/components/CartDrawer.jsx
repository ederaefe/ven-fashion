import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    formatPrice,
    appliedPromo,
    promoDiscount,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [promoInput, setPromoInput] = useState('');

  const freeShippingThreshold = 300;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartTotal;

  const discountAmount = cartTotal * promoDiscount;
  const finalTotal = cartTotal - discountAmount;

  if (!isCartOpen) return null;

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-crispwhite shadow-2xl flex flex-col z-10 animate-slide-in">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-serif uppercase tracking-widest text-obsidian">
            Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </h2>
          <button 
            className="p-2 text-charcoal hover:text-terracotta transition-colors"
            onClick={() => setIsCartOpen(false)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-gray-50 p-4 border-b border-gray-200 text-xs font-sans text-charcoal">
          {remainingForFreeShipping > 0 ? (
            <p className="mb-2">Add <span className="font-semibold text-terracotta">{formatPrice(remainingForFreeShipping)}</span> more for Express Worldwide Shipping</p>
          ) : (
            <p className="mb-2 font-semibold text-green-700">✓ You qualified for Complimentary Express Shipping!</p>
          )}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-terracotta h-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 font-sans text-sm mb-4">Your bag is currently empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-obsidian text-crispwhite text-xs uppercase tracking-widest hover:bg-terracotta transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${idx}`} className="flex space-x-4 border-b border-gray-100 pb-6">
                <img 
                  src={item.imagePrimary} 
                  alt={item.title} 
                  className="w-20 h-24 object-cover rounded-none bg-gray-100"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-sans text-obsidian font-medium">{item.title}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-400 hover:text-red-500 text-xs ml-2"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize} | Color: {item.selectedColor || 'Standard'}</p>
                    <p className="text-xs font-sans text-charcoal font-semibold mt-1">{formatPrice(item.price)}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mt-3">
                    <div className="flex items-center border border-gray-300">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)}
                        className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-sans">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)}
                        className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-white space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handlePromoSubmit} className="flex space-x-2">
              <input 
                type="text" 
                placeholder="PROMO CODE (e.g. VENN10)" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-grow border border-gray-300 px-3 py-2 text-xs font-sans uppercase tracking-widest focus:outline-none focus:border-obsidian"
              />
              <button 
                type="submit" 
                className="bg-obsidian text-crispwhite px-4 py-2 text-xs uppercase tracking-widest hover:bg-terracotta transition-colors"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex justify-between items-center text-xs font-sans bg-gray-50 px-3 py-2 border border-gray-200">
                <span className="text-green-700 font-semibold">Code Applied: {appliedPromo} (-10%)</span>
                <button 
                  type="button" 
                  onClick={removePromoCode} 
                  className="text-gray-400 hover:text-red-500 font-bold"
                >
                  Remove
                </button>
              </div>
            )}

            <div className="space-y-2 border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center text-xs font-sans text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between items-center text-xs font-sans text-green-700 font-medium">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-sans pt-2 border-t border-gray-100">
                <span className="text-obsidian font-semibold uppercase tracking-wider text-xs">Total</span>
                <span className="text-obsidian font-bold text-base">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400">Taxes and shipping calculated at checkout.</p>
            <button className="w-full py-4 bg-obsidian text-crispwhite uppercase tracking-widest text-xs font-bold hover:bg-terracotta transition-colors duration-300 shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;
