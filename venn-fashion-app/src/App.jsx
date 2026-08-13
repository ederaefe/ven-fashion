import React from 'react';
import { CartProvider } from './context/CartContext';
import Preloader from './components/Preloader';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import CollectionGrid from './components/CollectionGrid';
import EditorialHero from './components/EditorialHero';
import LookbookSection from './components/LookbookSection';
import FeaturedProducts from './components/FeaturedProducts';
import PromoBanner from './components/PromoBanner';
import PressSection from './components/PressSection';
import StockistsSection from './components/StockistsSection';
import ReviewsSection from './components/ReviewsSection';
import SocialFeed from './components/SocialFeed';
import FaqSection from './components/FaqSection';
import RecentlyViewed from './components/RecentlyViewed';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import WishlistDrawer from './components/WishlistDrawer';
import SizeGuideModal from './components/SizeGuideModal';
import Toast from './components/Toast';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <CartProvider>
      <Preloader />
      <div className="min-h-screen flex flex-col font-sans bg-crispwhite selection:bg-terracotta selection:text-crispwhite">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-grow">
          <HeroSlider />
          <div id="collections">
            <CollectionGrid />
          </div>
          <div id="story">
            <EditorialHero />
          </div>
          <div id="campaign">
            <LookbookSection />
          </div>
          <FeaturedProducts />
          <PromoBanner />
          <PressSection />
          <StockistsSection />
          <ReviewsSection />
          <SocialFeed />
          <FaqSection />
          <RecentlyViewed />
        </main>
        <Footer />

        {/* Global Interactive Overlays */}
        <CartDrawer />
        <WishlistDrawer />
        <QuickViewModal />
        <SizeGuideModal />
        <SearchModal />
        <Toast />
        <BackToTop />
      </div>
    </CartProvider>
  );
}

export default App;
