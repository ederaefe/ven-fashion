import React from 'react';
import { useCart } from '../context/CartContext';

const AnnouncementBar = () => {
  const { activeCurrency, setActiveCurrency } = useCart();

  return (
    <div className="bg-obsidian text-crispwhite text-xs font-sans uppercase tracking-widest py-2 px-4 border-b border-gray-800 flex justify-between items-center">
      <div className="hidden md:block w-32"></div>

      <div className="flex-1 text-center flex items-center justify-center space-x-4">
        <span>Complimentary Worldwide Express Shipping on Orders Over $300</span>
        <span className="hidden md:inline text-terracotta">•</span>
        <span className="hidden md:inline">AW26 Capsule Drop Now Live</span>
      </div>

      {/* Currency Selector Dropdown */}
      <div className="relative">
        <select 
          value={activeCurrency} 
          onChange={(e) => setActiveCurrency(e.target.value)}
          className="bg-transparent text-crispwhite text-[10px] uppercase font-sans tracking-widest focus:outline-none cursor-pointer pr-2"
        >
          <option value="USD" className="bg-obsidian text-crispwhite">USD ($)</option>
          <option value="EUR" className="bg-obsidian text-crispwhite">EUR (€)</option>
          <option value="GBP" className="bg-obsidian text-crispwhite">GBP (£)</option>
          <option value="NGN" className="bg-obsidian text-crispwhite">NGN (₦)</option>
        </select>
      </div>
    </div>
  );
};

export default AnnouncementBar;
