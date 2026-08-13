import React, { useState } from 'react';

const SlideEditor = ({ slides, setSlides }) => {
  const [editingSlide, setEditingSlide] = useState(null);

  const emptySlide = {
    id: `s_${Date.now()}`,
    title: 'THE NEW ELEGANCE',
    subtitle: 'DISCOVER THE AW26 COLLECTION',
    image: '/assets/hero_black_1.jpg'
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingSlide.title) return;

    setSlides(prev => {
      const exists = prev.some(s => s.id === editingSlide.id);
      if (exists) {
        return prev.map(s => s.id === editingSlide.id ? editingSlide : s);
      }
      return [...prev, editingSlide];
    });
    setEditingSlide(null);
  };

  const handleDelete = (id) => {
    setSlides(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Hero Slideshow</h2>
          <p className="text-xs text-zinc-400">Reorder and edit homepage full-bleed hero slides.</p>
        </div>
        <button 
          onClick={() => setEditingSlide(emptySlide)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-colors"
        >
          + Add Hero Slide
        </button>
      </div>

      <div className="space-y-4">
        {slides.map(s => (
          <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-4">
              <img src={s.image} alt={s.title} className="w-24 h-16 object-cover rounded bg-zinc-950" />
              <div>
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest block mb-0.5">{s.subtitle}</span>
                <h3 className="font-bold text-white uppercase text-base">{s.title}</h3>
              </div>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => setEditingSlide(s)}
                className="px-3 py-1.5 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded"
              >
                Edit Slide
              </button>
              <button 
                onClick={() => handleDelete(s.id)}
                className="px-3 py-1.5 text-xs font-bold bg-red-950/60 hover:bg-red-900 text-red-300 rounded border border-red-800/40"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingSlide(null)}></div>
          <form onSubmit={handleSave} className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full z-10 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white uppercase">{editingSlide.title ? 'Edit Slide' : 'Add Slide'}</h3>
            
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Headline Title</label>
              <input 
                type="text"
                value={editingSlide.title}
                onChange={(e) => setEditingSlide({...editingSlide, title: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Subtitle Tagline</label>
              <input 
                type="text"
                value={editingSlide.subtitle}
                onChange={(e) => setEditingSlide({...editingSlide, subtitle: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Hero Image URL (Black Model Asset)</label>
              <input 
                type="text"
                value={editingSlide.image}
                onChange={(e) => setEditingSlide({...editingSlide, image: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-800">
              <button 
                type="button"
                onClick={() => setEditingSlide(null)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white rounded"
              >
                Save Slide
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SlideEditor;
