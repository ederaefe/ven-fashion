import React from 'react';

const EditorialHero = () => {
  return (
    <section className="w-full relative bg-charcoal text-crispwhite overflow-hidden my-16">
      <div className="flex flex-col md:flex-row">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 order-2 md:order-1">
          <div className="max-w-md">
            <h2 className="text-xs font-sans tracking-[0.3em] text-champagne mb-4 uppercase">
              The Artisan Process
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif uppercase leading-tight mb-6 tracking-wide">
              Redefining Modern Luxury
            </h3>
            <p className="text-gray-300 font-sans leading-relaxed text-sm mb-8">
              At Venn Fashion, we merge traditional craftsmanship with contemporary silhouettes. Every piece is a dialogue between heritage and the future, designed for those who appreciate understated elegance and meticulous construction.
            </p>
            <a 
              href="#new-arrivals" 
              className="inline-block px-8 py-3 border border-crispwhite text-crispwhite font-sans uppercase tracking-widest text-xs hover:bg-crispwhite hover:text-obsidian transition-colors duration-300 shadow-lg"
            >
              Discover the Story
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 h-[60vh] md:h-auto min-h-[550px] relative order-1 md:order-2">
           <img 
              src="/assets/hero_black_2.jpg" 
              alt="Black model editorial presentation"
              className="absolute inset-0 w-full h-full object-cover"
            />
        </div>

      </div>
    </section>
  );
};

export default EditorialHero;
