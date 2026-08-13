import React, { useState } from 'react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How are Venn Fashion garments constructed?",
      a: "Each piece is hand-tailored in limited artisanal batches, combining sustainable textiles with traditional hand-weaving and contemporary luxury patternmaking."
    },
    {
      q: "What is the worldwide express delivery timeline?",
      a: "We offer complimentary express shipping on all orders over $300. Typical international delivery takes 3 to 5 business days via DHL/FedEx Express."
    },
    {
      q: "Can I request custom size tailoring?",
      a: "Yes. Our atelier provides made-to-measure consultations. Contact concierge@vennfashion.com or open the Size & Fit guide to request assistance."
    },
    {
      q: "What is your return and exchange policy?",
      a: "We accept unworn, tagged items within 14 days of delivery for complimentary exchange or store credit refund."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-xs font-sans tracking-[0.3em] text-champagne uppercase mb-2">
          Customer Care
        </h2>
        <h3 className="text-3xl font-serif text-obsidian uppercase">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-gray-200 bg-white">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              className="w-full text-left p-6 font-serif text-base text-obsidian font-semibold uppercase tracking-wider flex justify-between items-center focus:outline-none hover:text-terracotta transition-colors"
            >
              <span>{faq.q}</span>
              <span className="text-xl font-sans ml-4">{openIndex === idx ? '−' : '+'}</span>
            </button>

            {openIndex === idx && (
              <div className="px-6 pb-6 text-xs font-sans text-gray-600 leading-relaxed border-t border-gray-100 pt-4 animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
