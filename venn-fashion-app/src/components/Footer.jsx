import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="bg-obsidian text-crispwhite pt-24 pb-12 px-4 md:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-serif uppercase tracking-widest mb-6 text-champagne">
            Venn Fashion
          </h2>
          <p className="text-gray-400 font-sans text-xs leading-relaxed mb-6">
            Positioned at the intersection of artisanal craftsmanship, modern luxury silhouettes, and creative activism. Founded with a global perspective rooted in contemporary African storytelling.
          </p>

          {/* Circular Social Buttons */}
          <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-terracotta text-crispwhite flex items-center justify-center transition-colors" aria-label="Instagram">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-terracotta text-crispwhite flex items-center justify-center transition-colors" aria-label="Twitter">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-terracotta text-crispwhite flex items-center justify-center transition-colors" aria-label="Pinterest">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h3 className="font-sans text-xs tracking-widest uppercase mb-6 text-gray-300">Explore</h3>
          <ul className="space-y-3 font-sans text-xs">
            <li><a href="#new-arrivals" className="text-gray-400 hover:text-terracotta transition-colors">New Arrivals</a></li>
            <li><a href="#collections" className="text-gray-400 hover:text-terracotta transition-colors">Collections</a></li>
            <li><a href="#campaign" className="text-gray-400 hover:text-terracotta transition-colors">Lookbook</a></li>
            <li><a href="#story" className="text-gray-400 hover:text-terracotta transition-colors">Our Story</a></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="font-sans text-xs tracking-widest uppercase mb-6 text-gray-300">Customer Care</h3>
          <ul className="space-y-3 font-sans text-xs">
            <li><a href="#" className="text-gray-400 hover:text-terracotta transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="text-gray-400 hover:text-terracotta transition-colors">Size & Fit Guide</a></li>
            <li><a href="#" className="text-gray-400 hover:text-terracotta transition-colors">Contact Concierge</a></li>
            <li><a href="#" className="text-gray-400 hover:text-terracotta transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3 className="font-sans text-xs tracking-widest uppercase mb-6 text-gray-300">Stay Connected</h3>
          <p className="text-gray-400 text-xs mb-4 leading-relaxed">
            Subscribe to receive private capsule drops, campaign reveals, and exclusive access.
          </p>
          <form className="flex flex-col space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-gray-900 border border-gray-800 px-4 py-3 text-xs focus:outline-none focus:border-terracotta text-crispwhite placeholder-gray-500 transition-colors"
            />
            <button 
              type="submit" 
              className="bg-crispwhite text-obsidian uppercase tracking-widest text-[10px] font-bold py-3 hover:bg-terracotta hover:text-crispwhite transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-sans">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Venn Fashion. Positioned at the intersection of craftsmanship, activism, and luxury.
        </p>
        <p>Lagos • London • New York</p>
      </div>
    </footer>
  );
};

export default Footer;
