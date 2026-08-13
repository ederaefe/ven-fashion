import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 300);
          return 100;
        }
        return prev + 25;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (isDone) return null;

  return (
    <div className="fixed inset-0 z-50 bg-obsidian text-crispwhite flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold uppercase tracking-widest text-champagne">
          Venn Fashion
        </h1>
        <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-gray-400">
          Loading Motion & Artisanal Collections
        </p>

        {/* Minimalist Progress Line */}
        <div className="w-48 h-0.5 bg-gray-800 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-terracotta transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
