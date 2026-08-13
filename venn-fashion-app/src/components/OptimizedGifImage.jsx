import React, { useState, useEffect, useRef } from 'react';

const OptimizedGifImage = ({ 
  staticSrc, 
  gifSrc, 
  alt = "", 
  className = "", 
  autoPlay = false,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [gifStatus, setGifStatus] = useState('idle'); // 'idle' | 'loading' | 'loaded' | 'error'
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Preload GIF when hovered or autoPlay is true
  useEffect(() => {
    if ((isHovered || autoPlay) && gifStatus === 'idle') {
      setGifStatus('loading');
      const img = new Image();
      img.src = gifSrc || staticSrc;
      img.onload = () => {
        if (isMounted.current) {
          setGifStatus('loaded');
        }
      };
      img.onerror = () => {
        if (isMounted.current) {
          setGifStatus('error');
        }
      };
    }
  }, [isHovered, autoPlay, gifSrc, staticSrc, gifStatus]);

  const shouldShowGif = (isHovered || autoPlay) && gifStatus === 'loaded';
  const isLoadingGif = (isHovered || autoPlay) && gifStatus === 'loading';

  return (
    <div 
      className={`relative overflow-hidden cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* High Quality Static Thumbnail (Always rendered as base fallback) */}
      <img
        src={staticSrc}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-700 ${
          shouldShowGif ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
      />

      {/* Motion Preview GIF Overlay */}
      {shouldShowGif && (
        <img
          src={gifSrc || staticSrc}
          alt={`${alt} motion preview`}
          className="absolute inset-0 w-full h-full object-cover animate-fade-in"
        />
      )}

      {/* Progressive Loading Spinner Badge */}
      {isLoadingGif && (
        <div className="absolute inset-0 bg-obsidian/20 backdrop-blur-[2px] flex items-center justify-center transition-opacity">
          <div className="flex items-center space-x-2 bg-obsidian/80 text-crispwhite px-3 py-1.5 rounded-full border border-gray-700 shadow-xl">
            <svg className="w-3.5 h-3.5 animate-spin text-terracotta" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Motion Preview</span>
          </div>
        </div>
      )}

      {/* Motion Indicator Tag */}
      {!isHovered && !autoPlay && (
        <div className="absolute bottom-2 right-2 bg-obsidian/70 backdrop-blur-md text-crispwhite text-[9px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-wider opacity-80 group-hover:opacity-0 transition-opacity">
          GIF Preview
        </div>
      )}
    </div>
  );
};

export default OptimizedGifImage;
