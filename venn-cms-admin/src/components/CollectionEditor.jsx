import React, { useState } from 'react';

const CollectionEditor = ({ collections, setCollections }) => {
  const [editingCollection, setEditingCollection] = useState(null);

  const emptyCollection = {
    id: `c_${Date.now()}`,
    title: '',
    itemCount: '10 Items',
    image: '/assets/hero_black_1.jpg'
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingCollection.title) return;

    setCollections(prev => {
      const exists = prev.some(c => c.id === editingCollection.id);
      if (exists) {
        return prev.map(c => c.id === editingCollection.id ? editingCollection : c);
      }
      return [...prev, editingCollection];
    });
    setEditingCollection(null);
  };

  const handleDelete = (id) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Category Collections</h2>
          <p className="text-xs text-zinc-400">Manage lookbook category grids and featured imagery.</p>
        </div>
        <button 
          onClick={() => setEditingCollection(emptyCollection)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded shadow transition-colors"
        >
          + Add Collection
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(c => (
          <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl flex flex-col justify-between">
            <div className="relative aspect-[16/9] bg-zinc-950 overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
              <span className="absolute top-2 right-2 px-2 py-0.5 bg-black/70 text-zinc-300 font-mono text-[10px] rounded">
                {c.itemCount}
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white uppercase text-sm">{c.title}</h3>
                <span className="text-[10px] text-zinc-500 font-mono">{c.id}</span>
              </div>
              <div className="space-x-2">
                <button 
                  onClick={() => setEditingCollection(c)}
                  className="px-3 py-1 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(c.id)}
                  className="px-3 py-1 text-xs font-bold bg-red-950/60 hover:bg-red-900 text-red-300 rounded border border-red-800/40"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingCollection(null)}></div>
          <form onSubmit={handleSave} className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-md w-full z-10 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white uppercase">{editingCollection.title ? 'Edit Collection' : 'Add Collection'}</h3>
            
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Collection Title</label>
              <input 
                type="text"
                value={editingCollection.title}
                onChange={(e) => setEditingCollection({...editingCollection, title: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Item Count Badge</label>
              <input 
                type="text"
                value={editingCollection.itemCount}
                onChange={(e) => setEditingCollection({...editingCollection, itemCount: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                placeholder="12 Items"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Cover Image URL</label>
              <input 
                type="text"
                value={editingCollection.image}
                onChange={(e) => setEditingCollection({...editingCollection, image: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-800">
              <button 
                type="button"
                onClick={() => setEditingCollection(null)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white rounded"
              >
                Save Collection
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CollectionEditor;
