import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const SizeGuideModal = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useCart();
  const [unit, setUnit] = useState('inches');

  if (!isSizeGuideOpen) return null;

  const sizeData = {
    inches: [
      { size: 'S', chest: '36 - 38"', waist: '30 - 32"', hip: '37 - 39"', sleeve: '33.5"' },
      { size: 'M', chest: '39 - 41"', waist: '33 - 35"', hip: '40 - 42"', sleeve: '34.5"' },
      { size: 'L', chest: '42 - 44"', waist: '36 - 38"', hip: '43 - 45"', sleeve: '35.5"' },
      { size: 'XL', chest: '45 - 47"', waist: '39 - 41"', hip: '46 - 48"', sleeve: '36.5"' }
    ],
    cm: [
      { size: 'S', chest: '91 - 96 cm', waist: '76 - 81 cm', hip: '94 - 99 cm', sleeve: '85 cm' },
      { size: 'M', chest: '99 - 104 cm', waist: '84 - 89 cm', hip: '101 - 107 cm', sleeve: '87.5 cm' },
      { size: 'L', chest: '107 - 112 cm', waist: '91 - 96 cm', hip: '109 - 114 cm', sleeve: '90 cm' },
      { size: 'XL', chest: '114 - 119 cm', waist: '99 - 104 cm', hip: '117 - 122 cm', sleeve: '92.5 cm' }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-obsidian/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      ></div>

      <div className="relative bg-crispwhite max-w-2xl w-full p-8 shadow-2xl z-10 animate-fade-in border border-gray-200">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-serif text-obsidian uppercase tracking-wider">Size & Fit Guide</h2>
            <p className="text-xs text-gray-500 font-sans mt-1">Tailored silhouette fits true to size. For a relaxed fit, select one size up.</p>
          </div>
          <button 
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-2 text-charcoal hover:text-terracotta text-sm uppercase"
          >
            ✕
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-end space-x-2 mb-6">
          <button
            onClick={() => setUnit('inches')}
            className={`px-3 py-1 text-xs font-sans uppercase tracking-widest transition-colors ${
              unit === 'inches' ? 'bg-obsidian text-crispwhite' : 'bg-gray-100 text-charcoal hover:bg-gray-200'
            }`}
          >
            Inches
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`px-3 py-1 text-xs font-sans uppercase tracking-widest transition-colors ${
              unit === 'cm' ? 'bg-obsidian text-crispwhite' : 'bg-gray-100 text-charcoal hover:bg-gray-200'
            }`}
          >
            CM
          </button>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-obsidian uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-semibold">Chest</th>
                <th className="py-3 px-4 font-semibold">Waist</th>
                <th className="py-3 px-4 font-semibold">Hips</th>
                <th className="py-3 px-4 font-semibold">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizeData[unit].map(row => (
                <tr key={row.size} className="hover:bg-gray-50 text-gray-700">
                  <td className="py-3 px-4 font-bold text-obsidian">{row.size}</td>
                  <td className="py-3 px-4">{row.chest}</td>
                  <td className="py-3 px-4">{row.waist}</td>
                  <td className="py-3 px-4">{row.hip}</td>
                  <td className="py-3 px-4">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center text-xs font-sans">
          <span className="text-gray-500">Need personalized sizing assistance?</span>
          <a href="#footer" onClick={() => setIsSizeGuideOpen(false)} className="text-terracotta font-semibold hover:underline">Contact Stylist</a>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
