import React, { useState } from 'react';

const ProductEditor = ({ products, setProducts }) => {
  const [editingProduct, setEditingProduct] = useState(null);

  const emptyProduct = {
    id: `p_${Date.now()}`,
    title: '',
    price: '$0.00',
    originalPrice: '',
    category: 'Outerwear',
    imagePrimary: '/assets/hero_black_1.jpg',
    imageHover: '/assets/hero_black_2.jpg',
    tag: 'NEW',
    tagColor: 'bg-obsidian text-crispwhite',
    inStock: true
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingProduct.title) return;

    setProducts(prev => {
      const exists = prev.some(p => p.id === editingProduct.id);
      if (exists) {
        return prev.map(p => p.id === editingProduct.id ? editingProduct : p);
      }
      return [editingProduct, ...prev];
    });
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Product Inventory</h2>
          <p className="text-xs text-zinc-400">Manage apparel titles, category assignments, tags, and Black model images.</p>
        </div>
        <button 
          onClick={() => setEditingProduct(emptyProduct)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
        >
          + Add New Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 font-semibold uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4">Image</th>
                <th className="py-3.5 px-4">Title & ID</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Tag</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <img src={p.imagePrimary} alt={p.title} className="w-12 h-14 object-cover rounded bg-zinc-800" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{p.title}</div>
                    <div className="text-[10px] font-mono text-zinc-500">{p.id}</div>
                  </td>
                  <td className="py-3 px-4 text-zinc-400 font-medium">{p.category}</td>
                  <td className="py-3 px-4 font-semibold text-orange-400">
                    {p.price}
                    {p.originalPrice && <span className="line-through text-zinc-500 text-[10px] ml-1">{p.originalPrice}</span>}
                  </td>
                  <td className="py-3 px-4">
                    {p.tag ? (
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-zinc-800 text-zinc-300">
                        {p.tag}
                      </span>
                    ) : <span className="text-zinc-600">—</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${p.inStock ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button 
                      onClick={() => setEditingProduct(p)}
                      className="px-2.5 py-1 text-[10px] uppercase font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="px-2.5 py-1 text-[10px] uppercase font-bold bg-red-950/60 hover:bg-red-900 text-red-300 rounded border border-red-800/40"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Add Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingProduct(null)}></div>
          <form onSubmit={handleSave} className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-lg w-full z-10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white uppercase">{editingProduct.title ? 'Edit Product' : 'Add Product'}</h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Title</label>
              <input 
                type="text"
                value={editingProduct.title}
                onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Price</label>
                <input 
                  type="text"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Original Price (Sale)</label>
                <input 
                  type="text"
                  value={editingProduct.originalPrice || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, originalPrice: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  placeholder="$0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Outerwear">Outerwear</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Trousers">Trousers</option>
                  <option value="Knitwear">Knitwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Tag Pill</label>
                <input 
                  type="text"
                  value={editingProduct.tag || ''}
                  onChange={(e) => setEditingProduct({...editingProduct, tag: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                  placeholder="NEW / SALE / EXCLUSIVE"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Primary Image URL (Black Model Asset)</label>
              <input 
                type="text"
                value={editingProduct.imagePrimary}
                onChange={(e) => setEditingProduct({...editingProduct, imagePrimary: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Hover Image URL</label>
              <input 
                type="text"
                value={editingProduct.imageHover}
                onChange={(e) => setEditingProduct({...editingProduct, imageHover: e.target.value})}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-800">
              <button 
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white rounded"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default ProductEditor;
