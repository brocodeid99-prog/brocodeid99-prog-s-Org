import React, { useState, useEffect } from 'react';
import { Palette, Check, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ColorPalette {
  id: string;
  name: string;
  class: string;
  primaryColor: string; // Tailwind hex or descriptive color for preview
  accentColor: string;  // Accent/Emas hex or descriptive color for preview
  desc: string;
}

const PALETTES: ColorPalette[] = [
  { 
    id: 'hijau', 
    name: 'Hijau Alam', 
    class: '', 
    primaryColor: '#14532d', 
    accentColor: '#fbbf24', 
    desc: 'Tema default kelestarian & kemakmuran alam.' 
  },
  { 
    id: 'biru', 
    name: 'Samudra Biru', 
    class: 'palette-biru', 
    primaryColor: '#1e3a8a', 
    accentColor: '#06b6d4', 
    desc: 'Tema bahari, modern, & profesional.' 
  },
  { 
    id: 'merah', 
    name: 'Merah Perjuangan', 
    class: 'palette-merah', 
    primaryColor: '#7f1d1d', 
    accentColor: '#f59e0b', 
    desc: 'Tema nasionalis, semangat, & keberanian.' 
  },
  { 
    id: 'teal', 
    name: 'Teal Harmoni', 
    class: 'palette-teal', 
    primaryColor: '#115e59', 
    accentColor: '#f43f5e', 
    desc: 'Tema modern, tentram, & seimbang.' 
  }
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('hijau');

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('tinggarjaya_theme') || 'hijau';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeId: string) => {
    const root = document.documentElement;
    // Remove all palette classes
    PALETTES.forEach(p => {
      if (p.class) {
        root.classList.remove(p.class);
      }
    });
    
    // Add the class if it's not the default one
    const selectedTheme = PALETTES.find(t => t.id === themeId);
    if (selectedTheme && selectedTheme.class) {
      root.classList.add(selectedTheme.class);
    }
  };

  const selectPalette = (themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem('tinggarjaya_theme', themeId);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50" id="theme-selector-container">
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 bg-white hover:bg-slate-50 text-desa-hijau border border-slate-200/80 rounded-full shadow-2xl flex items-center justify-center focus:outline-none relative group"
        title="Ubah Palet Warna Website"
        id="theme-toggle-fab"
      >
        <Palette className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out whitespace-nowrap text-desa-navy">
          Palet Warna
        </span>
        {/* Decorative badge */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-desa-emas rounded-full border border-white"></span>
      </motion.button>

      {/* Popover Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop to close on click outside */}
            <div 
              className="fixed inset-0 z-40 bg-transparent" 
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-20 left-0 z-50 w-76 bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 overflow-hidden"
              id="theme-popover-panel"
            >
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-desa-hijau to-desa-emas" />
              
              <div className="flex items-center justify-between mb-4 mt-1">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-desa-emas" />
                  <h3 className="text-sm font-extrabold text-desa-navy uppercase tracking-wider">
                    Palet Warna Website
                  </h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-1 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Ubah skema warna visual website resmi Desa Tinggarjaya sesuai dengan preferensi kenyamanan Anda.
              </p>

              <div className="space-y-2.5">
                {PALETTES.map((palette) => {
                  const isSelected = currentTheme === palette.id;
                  return (
                    <button
                      key={palette.id}
                      onClick={() => selectPalette(palette.id)}
                      className={`w-full text-left p-2.5 rounded-2xl border transition-all duration-200 flex items-center justify-between group ${
                        isSelected 
                          ? 'border-desa-hijau bg-desa-hijau-soft/30 shadow-sm' 
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {/* Custom visual color preview circles */}
                        <div className="flex -space-x-2">
                          <div 
                            className="w-5 h-5 rounded-full border border-white shadow-sm flex-shrink-0 z-10"
                            style={{ backgroundColor: palette.primaryColor }}
                          />
                          <div 
                            className="w-5 h-5 rounded-full border border-white shadow-sm flex-shrink-0"
                            style={{ backgroundColor: palette.accentColor }}
                          />
                        </div>

                        <div>
                          <span className={`block text-xs font-bold ${isSelected ? 'text-desa-hijau' : 'text-slate-700'}`}>
                            {palette.name}
                          </span>
                          <span className="block text-[10px] text-slate-400 max-w-[180px] truncate">
                            {palette.desc}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 bg-desa-hijau text-white rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  Desa Tinggarjaya • Cilacap
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
