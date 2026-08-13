import React from 'react';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../data/mockCms';

const SocialFeed = () => {
  const { setQuickViewProduct } = useCart();

  const socialPosts = [
    { img: "/assets/hero_black_1.jpg", handle: "@vennfashion", product: mockProducts[0] },
    { img: "/assets/hero_black_2.jpg", handle: "@vennfashion", product: mockProducts[2] },
    { img: "/assets/product_black_coat.jpg", handle: "@vennfashion", product: mockProducts[1] },
    { img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80", handle: "@vennfashion", product: mockProducts[3] }
  ];

  return (
    <section className="py-20 bg-crispwhite border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-12">
        <h2 className="text-xs font-sans tracking-[0.3em] text-champagne uppercase mb-2">
          Social Lookbook
        </h2>
        <h3 className="text-3xl font-serif text-obsidian uppercase">
          As Worn By Our Community #VennFashion
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto px-4">
        {socialPosts.map((post, idx) => (
          <div 
            key={idx} 
            onClick={() => setQuickViewProduct(post.product)}
            className="group relative aspect-square overflow-hidden cursor-pointer bg-gray-100 shadow-md"
          >
            <img src={post.img} alt="Social Feed Look" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-crispwhite p-4">
              <span className="text-xs font-sans font-semibold mb-2">{post.handle}</span>
              <span className="text-[10px] font-sans uppercase tracking-widest bg-crispwhite text-obsidian px-3 py-1.5 hover:bg-terracotta hover:text-crispwhite transition-colors">
                Shop The Look
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialFeed;
