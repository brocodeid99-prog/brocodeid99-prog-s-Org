import React from 'react';
import { Compass, FileText, ArrowRight, CheckCircle, Award, Users } from 'lucide-react';
import { useDb } from '../context/DbContext';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { profilDesa } = useDb();
  const stats = [
    { label: 'Luas Wilayah', value: profilDesa.geografis.luasWilayah, icon: Compass },
    { label: 'Total Penduduk', value: `${profilDesa.dataWilayah.totalPenduduk.toLocaleString('id-ID')} Jiwa`, icon: Users },
    { label: 'Wilayah Dusun', value: `${profilDesa.dataWilayah.jumlahDusun} Dusun`, icon: Award },
  ];

  return (
    <section 
      id="beranda" 
      className="relative min-h-[95vh] flex items-center pt-24 md:pt-28 overflow-hidden"
    >
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=1920" 
          alt="Sawah Indonesia Desa Tinggarjaya" 
          className="w-full h-full object-cover scale-105 filter brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-desa-navy via-desa-hijau/60 to-transparent mix-blend-multiply" />
        {/* Abstract shapes for design depth */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-desa-emas/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-desa-hijau/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-6 text-left">


            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-desa-putih tracking-tight leading-tight">
              Website Resmi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-desa-emas to-yellow-300">
                Desa Tinggarjaya
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-light max-w-2xl leading-relaxed">
              Pusat Informasi, Pelayanan, dan Transparansi Pemerintah Desa Tinggarjaya, Kecamatan Sidareja, Kabupaten Cilacap, Jawa Tengah.
            </p>

            {/* Short summary block requested */}
            <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 max-w-2xl shadow-xl">
              <p className="text-sm md:text-base text-gray-300 leading-relaxed font-sans">
                Tinggarjaya adalah desa di Kecamatan Sidareja, Kabupaten Cilacap, Jawa Tengah. Desa ini memiliki kehidupan masyarakat yang aktif, potensi pertanian, kegiatan sosial, serta pelayanan pemerintahan desa yang terus berkembang.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onNavigate('profil')}
                id="hero-btn-profil"
                className="px-6 py-3.5 bg-desa-emas hover:bg-yellow-400 text-desa-hijau font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group focus:outline-none"
              >
                <span>Lihat Profil Desa</span>
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </button>
              
              <button
                onClick={() => onNavigate('layanan')}
                id="hero-btn-layanan"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm tracking-wider uppercase rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none"
              >
                <span>Layanan Masyarakat</span>
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats sidebar on Hero for high professional polish */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-4 lg:mt-0">
            {stats.map((stat, i) => {
              const IconComp = stat.icon;
              return (
                <div 
                  key={i}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors duration-300 flex items-center space-x-4 shadow-lg group"
                >
                  <div className="p-3 bg-desa-emas/20 rounded-xl group-hover:bg-desa-emas/30 transition-colors duration-300">
                    <IconComp className="w-6 h-6 text-desa-emas" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg md:text-xl font-bold text-desa-putih">{stat.value}</p>
                  </div>
                </div>
              );
            })}

            <div className="bg-gradient-to-r from-desa-emas/15 to-amber-500/5 border border-desa-emas/30 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-desa-emas uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  Status Desa Mandiri
                </h4>
                <p className="text-xs text-gray-300">
                  Tinggarjaya berkomitmen mewujudkan tata kelola berbasis digital (E-Government) untuk kemudahan masyarakat.
                </p>
              </div>
              <button 
                onClick={() => onNavigate('transparansi')}
                className="text-xs font-bold text-desa-emas hover:text-white flex items-center space-x-1.5 mt-4 transition-colors group focus:outline-none"
              >
                <span>Lihat Anggaran APBDes 2026</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave transition spacer */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-desa-abu to-transparent z-10 pointer-events-none" />
    </section>
  );
}
