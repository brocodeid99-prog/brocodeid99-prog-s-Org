import React, { useState } from 'react';
import { Leaf, ShoppingBag, HeartHandshake, GraduationCap, Compass, Hammer } from 'lucide-react';
import { useDb } from '../context/DbContext';

export default function Potensi() {
  const { potensiDesa: POTENSI_DESA } = useDb();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Pertanian':
        return <Leaf className="w-5 h-5 text-emerald-600" />;
      case 'UMKM':
        return <ShoppingBag className="w-5 h-5 text-amber-600" />;
      case 'Kegiatan Masyarakat':
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'Pendidikan':
        return <GraduationCap className="w-5 h-5 text-blue-600" />;
      case 'Budaya & Tradisi':
        return <Compass className="w-5 h-5 text-purple-600" />;
      default:
        return <Hammer className="w-5 h-5 text-indigo-600" />;
    }
  };

  return (
    <section id="potensi" className="py-20 md:py-28 bg-slate-50 relative motif-bg">
      <div className="absolute top-0 left-0 w-80 h-80 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Sektor Unggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Potensi Desa Tinggarjaya
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Sumber daya alam yang melimpah, kreativitas kewirausahaan warga, serta luhurnya adat budaya Cilacapan bersinergi melahirkan kemandirian ekonomi berkelanjutan.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {POTENSI_DESA.map((potensi) => {
            const isHovered = hoveredCardId === potensi.id;
            return (
              <div 
                key={potensi.id}
                id={`potensi-card-${potensi.id}`}
                onMouseEnter={() => setHoveredCardId(potensi.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image with zoom effect and dark overlay */}
                  <div className="h-56 relative overflow-hidden bg-slate-100">
                    <img 
                      src={potensi.gambar} 
                      alt={potensi.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    
                    {/* Category icon indicator */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-md flex items-center justify-center">
                      {getCategoryIcon(potensi.kategori)}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[9px] font-bold bg-white/20 backdrop-blur-md text-white uppercase px-2.5 py-1 rounded-full border border-white/10 tracking-widest font-mono">
                        {potensi.kategori}
                      </span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-base md:text-lg font-bold text-desa-navy group-hover:text-desa-hijau transition-colors leading-snug">
                      {potensi.judul}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed text-justify">
                      {potensi.deskripsi}
                    </p>
                  </div>
                </div>

                {/* Footer status / indicators */}
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="font-sans">Sektor Unggulan Desa</span>
                  <span className="text-desa-hijau font-bold flex items-center space-x-1">
                    <span>Lihat Statistik</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
