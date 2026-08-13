import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemsCount, wishlist, setIsCartOpen, setIsSearchOpen, setIsWishlistOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-crispwhite/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-charcoal hover:text-terracotta transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <a href="/" className="text-2xl font-serif font-bold tracking-widest text-obsidian uppercase">
            Venn Fashion
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#new-arrivals" className="text-xs font-sans uppercase tracking-widest text-charcoal hover:text-terracotta transition-colors">New Arrivals</a>
          <a href="#collections" className="text-xs font-sans uppercase tracking-widest text-charcoal hover:text-terracotta transition-colors">Collections</a>
          <a href="#campaign" className="text-xs font-sans uppercase tracking-widest text-charcoal hover:text-terracotta transition-colors">Lookbook</a>
          <a href="#story" className="text-xs font-sans uppercase tracking-widest text-charcoal hover:text-terracotta transition-colors">Our Story</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-charcoal hover:text-terracotta transition-colors" 
            aria-label="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-charcoal hover:text-terracotta transition-colors relative" 
            aria-label="Wishlist"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-terracotta text-crispwhite text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="p-2 text-charcoal hover:text-terracotta transition-colors relative" 
            aria-label="Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItemsCount > 0 && (
              <span className="absolute top-1 right-1 bg-terracotta text-crispwhite text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans font-bold">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-obsidian/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative w-4/5 max-w-sm h-full bg-crispwhite shadow-xl flex flex-col p-6 animate-slide-in">
            <button 
              className="self-end p-2 mb-8 text-charcoal hover:text-terracotta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col space-y-6">
              <a href="#new-arrivals" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif uppercase tracking-widest text-charcoal hover:text-terracotta">New Arrivals</a>
              <a href="#collections" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif uppercase tracking-widest text-charcoal hover:text-terracotta">Collections</a>
              <a href="#campaign" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif uppercase tracking-widest text-charcoal hover:text-terracotta">Lookbook</a>
              <a href="#story" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-serif uppercase tracking-widest text-charcoal hover:text-terracotta">Our Story</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
