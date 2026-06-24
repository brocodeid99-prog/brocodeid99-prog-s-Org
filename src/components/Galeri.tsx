import React, { useState } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { useDb } from '../context/DbContext';
import { GaleriFoto } from '../types';

export default function Galeri() {
  const { galeriDesa: GALERI_DESA } = useDb();
  const [activeTab, setActiveTab] = useState<string>('Semua');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const tabs = [
    'Semua',
    'Pemerintahan',
    'Masyarakat',
    'Pembangunan',
    'PKK',
    'Pemuda',
    'Pelayanan'
  ];

  const getFullKategoriName = (kat: string) => {
    switch (kat) {
      case 'Pemerintahan': return 'Kegiatan Pemerintahan Desa';
      case 'Masyarakat': return 'Kegiatan Kemasyarakatan';
      case 'Pembangunan': return 'Pembangunan Infrastruktur';
      case 'PKK': return 'Kegiatan Pemberdayaan PKK';
      case 'Pemuda': return 'Aktivitas Pemuda Karang Taruna';
      case 'Pelayanan': return 'Pelayanan Publik & Kesehatan';
      default: return 'Foto Dokumentasi Desa';
    }
  };

  const filteredGallery = activeTab === 'Semua' 
    ? GALERI_DESA 
    : GALERI_DESA.filter(item => item.kategori === activeTab);

  const openLightbox = (item: GaleriFoto) => {
    const idxInAll = GALERI_DESA.findIndex(x => x.id === item.id);
    if (idxInAll !== -1) {
      setLightboxIndex(idxInAll);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev > 0) ? prev - 1 : GALERI_DESA.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev !== null && prev < GALERI_DESA.length - 1) ? prev + 1 : 0);
    }
  };

  const currentLightboxItem = lightboxIndex !== null ? GALERI_DESA[lightboxIndex] : null;

  return (
    <section id="galeri" className="py-20 md:py-28 bg-white relative">
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-desa-emas/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Dokumentasi Visual
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Galeri Kegiatan Desa Tinggarjaya
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Rekam jejak sinergi pembangunan, kehangatan kegiatan sosial kemasyarakatan, pemberdayaan PKK, kreativitas kepemudaan, serta dinamika pelayanan desa sehari-hari.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12 bg-slate-50 p-2 rounded-2xl max-w-4xl mx-auto border border-slate-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none ${
                activeTab === tab
                  ? 'bg-desa-hijau text-white shadow-sm'
                  : 'text-slate-600 hover:text-desa-hijau hover:bg-slate-100'
              }`}
            >
              {tab === 'Semua' ? 'Tampilkan Semua' : getFullKategoriName(tab)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filteredGallery.map((item) => (
              <div 
                key={item.id}
                onClick={() => openLightbox(item)}
                id={`gallery-item-${item.id}`}
                className="group relative bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer aspect-4/3 transition-all duration-300"
              >
                {/* Photo */}
                <img 
                  src={item.url} 
                  alt={item.judul} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-desa-navy/80 via-desa-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                  <div className="text-white space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[9px] font-bold bg-desa-emas text-desa-navy uppercase px-2 py-0.5 rounded font-mono">
                      {item.kategori}
                    </span>
                    <h4 className="text-xs font-bold leading-snug truncate">
                      {item.judul}
                    </h4>
                    <p className="text-[10px] text-slate-300 line-clamp-2 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                  
                  {/* Eye look-up action indicator */}
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-1.5 rounded-lg text-white">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto">
            <p className="text-sm text-slate-500">Belum ada foto dalam kategori ini.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null && currentLightboxItem && (
          <div 
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex flex-col justify-between p-4 bg-black/95 backdrop-blur-sm animate-fadeIn"
          >
            {/* Lightbox Top bar */}
            <div className="flex justify-between items-center text-white px-4 py-2 relative z-10 w-full max-w-7xl mx-auto">
              <div>
                <span className="text-[9px] font-bold text-desa-emas uppercase tracking-widest font-mono">
                  {getFullKategoriName(currentLightboxItem.kategori)}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold truncate max-w-xs md:max-w-md mt-0.5">
                  {currentLightboxItem.judul}
                </h3>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Large Image Display Area with Nav buttons */}
            <div className="flex-1 flex items-center justify-center relative my-4 max-h-[70vh]">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none z-10"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central Expanded Photo */}
              <div 
                onClick={(e) => e.stopPropagation()} // block closing lightbox when clicking image
                className="max-w-4xl max-h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative"
              >
                <img 
                  src={currentLightboxItem.url} 
                  alt={currentLightboxItem.judul} 
                  className="max-h-[60vh] md:max-h-[65vh] object-contain mx-auto"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none z-10"
                aria-label="Selanjutnya"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Bottom Info Drawer */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl max-w-3xl w-full mx-auto text-center text-white space-y-1.5 relative z-10 mb-4">
              <span className="text-[10px] font-bold text-desa-emas uppercase font-mono tracking-widest">
                Dokumentasi Desa Tinggarjaya
              </span>
              <p className="text-xs sm:text-sm text-gray-200">
                {currentLightboxItem.deskripsi}
              </p>
              <div className="text-[10px] text-gray-400 font-medium pt-1.5">
                Foto {lightboxIndex + 1} dari {GALERI_DESA.length} Dokumentasi
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
