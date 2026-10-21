import React, { useState } from 'react';
import { X, BookOpen, Search, Sparkles } from 'lucide-react';
import { GLOSSARY_ITEMS, GlossaryItem } from '../data/glossaryData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  if (!isOpen) return null;

  const categories = ['Semua', 'Prinsip Syariah', 'Produk Keuangan', 'Waspada Keuangan'];

  const filteredItems = GLOSSARY_ITEMS.filter((item: GlossaryItem) => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.simpleMeaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exampleInDailyLife.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden border-2 border-emerald-200 my-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header in BSI Green */}
        <div className="bg-gradient-to-r from-[#005E54] via-[#00827B] to-[#00A39D] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <BookOpen className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">Kamus Istilah Keuangan Syariah</h3>
              <p className="text-xs text-emerald-100 font-semibold">BSI & PKK • Bukan Sekadar Hemat, tetapi Tepat</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter & Search */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari istilah: Riba, Rahn, Murabahah, Pinjol, dll..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-2xl border-2 border-slate-300 text-sm sm:text-base font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#00A39D] focus:border-[#00A39D]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-full font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#00827B] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List with LARGE READABLE FONTS */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 divide-y divide-slate-100">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm font-semibold">
              Istilah tidak ditemukan. Coba ketik kata kunci lain.
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div key={idx} className="pt-4 first:pt-0 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900 text-base sm:text-lg">{item.term}</h4>
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {item.simpleMeaning}
                </p>
                <div className="bg-emerald-50 border-l-4 border-[#00827B] p-3 rounded-r-2xl text-xs sm:text-sm text-emerald-950 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#00827B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-[#00675B]">Contoh di Rumah & Pasar: </span>
                    <span className="font-semibold">{item.exampleInDailyLife}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00827B] hover:bg-[#00675B] text-white rounded-2xl text-sm font-extrabold transition-colors cursor-pointer"
          >
            Tutup Kamus
          </button>
        </div>
      </div>
    </div>
  );
};
