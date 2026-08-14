import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProducts, mockCollections, mockSlides } from '../data/mockCms';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Real-time Cloudflare Worker data states with mock fallback defaults
  const [products, setProducts] = useState(mockProducts);
  const [collections, setCollections] = useState(mockCollections);
  const [slides, setSlides] = useState(mockSlides);

  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_CMS_API_URL || 'http://localhost:8787/api/cms';
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          if (data.products) setProducts(data.products);
          if (data.collections) setCollections(data.collections);
          if (data.slides) setSlides(data.slides);
        }
      } catch (err) {
        console.warn('Unable to connect to Cloudflare Worker, using local CMS fallback cache.', err);
      }
    };
    fetchCmsData();
  }, []);

  // LocalStorage state for Wishlist & Recently Viewed
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('venn_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('venn_recent');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('venn_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('venn_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed "${product.title}" from saved items`);
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved "${product.title}" to wishlist`);
    }
  };

  const addRecentlyViewed = (product) => {
    if (!product) return;
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const handleSetQuickView = (product) => {
    setQuickViewProduct(product);
    if (product) {
      addRecentlyViewed(product);
    }
  };

  const [activeCurrency, setActiveCurrency] = useState('USD');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const currencyRates = {
    USD: { rate: 1.0, symbol: '$' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.79, symbol: '£' },
    NGN: { rate: 1600.0, symbol: '₦' }
  };

  const formatPrice = (usdPriceValue) => {
    if (usdPriceValue === undefined || usdPriceValue === null) return '';
    let numPrice = 0;
    if (typeof usdPriceValue === 'number') {
      numPrice = usdPriceValue;
    } else {
      numPrice = parseFloat(String(usdPriceValue).replace(/[^0-9.]/g, '')) || 0;
    }
    const { rate, symbol } = currencyRates[activeCurrency] || currencyRates.USD;
    const converted = numPrice * rate;
    
    if (activeCurrency === 'NGN') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  const applyPromoCode = (code) => {
    if (code.toUpperCase() === 'VENN10') {
      setAppliedPromo('VENN10');
      setPromoDiscount(0.10);
      showToast('Promo code VENN10 applied: 10% off!');
      return true;
    } else {
      showToast('Invalid promo code');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
    showToast('Promo code removed');
  };

  const addToCart = (product, selectedSize = 'M', selectedColor = 'Standard') => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, selectedSize, selectedColor, quantity: 1 }];
    });
    showToast(`Added "${product.title}" (${selectedSize} / ${selectedColor}) to bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)));
  };

  const updateQuantity = (id, selectedSize, selectedColor, delta) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((sum, item) => {
    const numPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + numPrice * item.quantity;
  }, 0);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        wishlist,
        toggleWishlist,
        recentlyViewed,
        addRecentlyViewed,
        quickViewProduct,
        setQuickViewProduct: handleSetQuickView,
        toastMessage,
        showToast,
        cartTotal,
        totalItemsCount,
        products,
        collections,
        slides,
        activeCurrency,
        setActiveCurrency,
        formatPrice,
        appliedPromo,
        promoDiscount,
        applyPromoCode,
        removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export const useCart = () => useContext(CartContext);
