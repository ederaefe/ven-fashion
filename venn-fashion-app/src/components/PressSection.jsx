import React from 'react';

const PressSection = () => {
  const pressQuotes = [
    {
      publication: "VOGUE",
      quote: "Venn Fashion redefines luxury menswear and womenswear with an unyielding commitment to African artisanal craftsmanship.",
      date: "September 2026 Issue"
    },
    {
      publication: "BUSINESS OF FASHION",
      quote: "A pioneering digital flagship setting new benchmarks for storytelling, sustainable textiles, and fluid tailored silhouettes.",
      date: "Global Fashion Report"
    },
    {
      publication: "GQ MAGAZINE",
      quote: "Understated, powerful, and impeccably constructed. The AW26 collection is a masterclass in modern luxury.",
      date: "Style Edit"
    }
  ];

  return (
    <section className="py-20 bg-obsidian text-crispwhite border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-xs font-sans tracking-[0.3em] text-champagne uppercase mb-4">
          Press & Recognition
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif uppercase mb-16 tracking-wide">
          As Featured In
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressQuotes.map((item, idx) => (
            <div key={idx} className="bg-gray-900/60 p-8 border border-gray-800 flex flex-col justify-between hover:border-terracotta transition-colors">
              <p className="font-serif italic text-gray-300 text-sm leading-relaxed mb-6">
                "{item.quote}"
              </p>
              <div>
                <h4 className="font-serif text-xl tracking-widest text-champagne font-bold mb-1">
                  {item.publication}
                </h4>
                <span className="text-[10px] font-sans uppercase tracking-widest text-gray-500">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
