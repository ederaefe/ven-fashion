import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const HeroSlider = () => {
  const { slides } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[currentIndex];

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] bg-obsidian flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        key={slide.id}
        className="absolute inset-0 bg-cover bg-center opacity-85 transition-opacity duration-1000 animate-fade-in"
        style={{ backgroundImage: `url(${slide.image})` }}
      ></div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h2 className="text-xs md:text-sm font-sans tracking-[0.3em] text-champagne mb-4 uppercase">
          {slide.subtitle}
        </h2>
        <h1 className="text-4xl md:text-7xl font-serif text-crispwhite mb-8 uppercase leading-tight tracking-wide">
          {slide.title}
        </h1>
        <a 
          href="#new-arrivals" 
          className="inline-block px-10 py-4 bg-crispwhite text-obsidian font-sans uppercase tracking-widest text-xs font-bold hover:bg-terracotta hover:text-crispwhite transition-colors duration-300 shadow-xl"
        >
          Shop Collection
        </a>
      </div>

      {/* Slide Navigation Controls */}
      <button 
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 text-crispwhite/70 hover:text-crispwhite bg-obsidian/30 hover:bg-obsidian/60 transition-colors z-20"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 text-crispwhite/70 hover:text-crispwhite bg-obsidian/30 hover:bg-obsidian/60 transition-colors z-20"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-350 ${
              currentIndex === idx ? 'bg-terracotta w-6' : 'bg-crispwhite/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
