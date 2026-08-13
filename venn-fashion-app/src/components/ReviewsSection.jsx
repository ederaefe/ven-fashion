import React from 'react';

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Amina K.",
      location: "London, UK",
      rating: 5,
      title: "Unmatched Craftsmanship",
      comment: "The Terracotta Suit Blazer is breathtaking. The drape and weight of the fabric feel as high-end as Savile Row tailoring."
    },
    {
      name: "Marcus O.",
      location: "New York, USA",
      rating: 5,
      title: "Favorite Coat in My Collection",
      comment: "The Obsidian Wool Trench fits flawlessly. Express shipping arrived in SoHo in just 3 days!"
    },
    {
      name: "Tunde E.",
      location: "Lagos, Nigeria",
      rating: 5,
      title: "Artisanal Perfection",
      comment: "Venn Fashion is setting the international standard for African contemporary luxury. Highly recommend."
    }
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-12">
        <h2 className="text-xs font-sans tracking-[0.3em] text-champagne uppercase mb-2">
          Verified Feedback
        </h2>
        <h3 className="text-3xl font-serif text-obsidian uppercase">
          Client Reviews (4.9 / 5.0 ★)
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {reviews.map((rev, idx) => (
          <div key={idx} className="bg-white p-8 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex space-x-1 text-terracotta text-sm mb-4">
                {"★".repeat(rev.rating)}
              </div>
              <h4 className="font-serif text-lg text-obsidian font-bold uppercase mb-2">{rev.title}</h4>
              <p className="text-xs font-sans text-gray-600 leading-relaxed mb-6">"{rev.comment}"</p>
            </div>
            <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-[10px] font-sans text-gray-500 uppercase tracking-widest">
              <span className="font-semibold text-obsidian">{rev.name}</span>
              <span>{rev.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
