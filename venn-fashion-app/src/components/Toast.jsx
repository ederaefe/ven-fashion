import React from 'react';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-obsidian text-crispwhite px-5 py-3 rounded-none shadow-2xl border border-champagne/30 text-xs font-sans uppercase tracking-widest flex items-center space-x-3 animate-slide-up">
      <span className="w-2 h-2 rounded-full bg-terracotta animate-ping"></span>
      <span>{toastMessage}</span>
    </div>
  );
};

export default Toast;
