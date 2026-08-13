import React from 'react';

const StockistsSection = () => {
  const stockists = [
    { city: "Lagos Flagship", address: "Victoria Island, Lagos", hours: "Mon - Sat: 10am - 7pm" },
    { city: "London Studio", address: "Mayfair, London", hours: "Mon - Sat: 11am - 6pm" },
    { city: "New York Showroom", address: "SoHo, Manhattan", hours: "By Private Appointment" },
    { city: "Paris Pop-Up", address: "Le Marais, Paris", hours: "Seasonal Fashion Week" }
  ];

  return (
    <section id="stockists" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-xs font-sans tracking-[0.3em] text-champagne uppercase mb-3">
            Global Destinations
          </h2>
          <h3 className="text-3xl md:text-5xl font-serif text-obsidian uppercase leading-tight mb-6">
            Visit Our Flagships & Stockists
          </h3>
          <p className="text-gray-600 font-sans text-sm leading-relaxed mb-8">
            Experience the tactile weight of our textiles and bespoke tailoring in person. Private concierge appointments available upon request.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stockists.map((loc, idx) => (
              <div key={idx} className="p-4 border-l-2 border-terracotta bg-gray-50/50">
                <h4 className="font-serif text-lg text-obsidian font-bold uppercase mb-1">{loc.city}</h4>
                <p className="text-xs font-sans text-charcoal">{loc.address}</p>
                <p className="text-[10px] font-sans text-gray-500 mt-1 uppercase tracking-wider">{loc.hours}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[450px] relative overflow-hidden shadow-2xl">
          <img 
            src="/assets/flagship.jpg" 
            alt="Venn Fashion Flagship Interior" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default StockistsSection;
