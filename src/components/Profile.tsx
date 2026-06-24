import React, { useState } from 'react';
import { BookOpen, Compass, Users, Milestone, ArrowRight, CheckCircle2, Map } from 'lucide-react';
import { useDb } from '../context/DbContext';

export default function Profile() {
  const { profilDesa: PROFIL_DESA } = useDb();
  const [activeSubTab, setActiveSubTab] = useState<'sejarah' | 'visi-misi' | 'geografis' | 'demografi'>('sejarah');

  const tabs = [
    { id: 'sejarah', label: 'Sejarah Desa', icon: BookOpen },
    { id: 'visi-misi', label: 'Visi & Misi', icon: Milestone },
    { id: 'geografis', label: 'Kondisi Geografis', icon: Compass },
    { id: 'demografi', label: 'Demografi & Wilayah', icon: Users },
  ] as const;

  return (
    <section id="profil" className="py-20 md:py-28 bg-desa-abu motif-bg relative overflow-hidden">
      {/* Visual background enhancements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-desa-emas/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Mengenal Lebih Dekat
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Profil Desa Tinggarjaya
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Sejarah panjang, letak geografis yang subur, serta kependudukan yang dinamis membentuk fondasi kuat kemajuan Desa Tinggarjaya.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 max-w-4xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                id={`tab-btn-${tab.id}`}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? 'bg-desa-hijau text-desa-putih shadow-md'
                    : 'text-slate-600 hover:text-desa-hijau hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-desa-emas' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 max-w-5xl mx-auto min-h-[400px]">
          
          {/* Sejarah Desa */}
          {activeSubTab === 'sejarah' && (
            <div className="space-y-6 md:space-y-8 animate-fadeIn" id="profil-sejarah-konten">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:w-1/2 space-y-4">
                  <h3 className="text-2xl font-bold text-desa-navy flex items-center gap-2">
                    <BookOpen className="text-desa-hijau w-6 h-6" />
                    Asal-Usul & Perkembangan
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 leading-relaxed text-justify">
                    {PROFIL_DESA.sejarah}
                  </p>
                  <div className="p-4 bg-desa-emas/10 rounded-xl border-l-4 border-desa-emas">
                    <p className="text-xs font-semibold text-desa-emas-dark font-mono">
                      "Tinggar (Kesiagaan & Keberanian) · Jaya (Kemakmuran & Kemenangan)"
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800" 
                    alt="Sejarah Desa" 
                    className="rounded-2xl shadow-lg object-cover w-full h-80 filter brightness-95 hover:scale-[1.01] transition-transform duration-300"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-desa-hijau text-desa-putih py-3 px-5 rounded-xl shadow-md text-xs font-bold font-mono">
                    Est. Abad Ke-19
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visi & Misi */}
          {activeSubTab === 'visi-misi' && (
            <div className="space-y-8 animate-fadeIn" id="profil-visi-misi-konten">
              {/* Visi */}
              <div className="bg-gradient-to-r from-desa-hijau to-desa-hijau-light p-6 md:p-8 rounded-2xl text-white shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Milestone className="w-32 h-32 text-white" />
                </div>
                <span className="text-xs font-bold text-desa-emas uppercase tracking-widest font-mono">Visi Desa</span>
                <p className="text-lg md:text-xl font-bold mt-2 leading-relaxed text-yellow-50">
                  "{PROFIL_DESA.visi}"
                </p>
              </div>

              {/* Misi */}
              <div>
                <h3 className="text-xl font-bold text-desa-navy mb-5 flex items-center gap-2">
                  <CheckCircle2 className="text-desa-emas w-6 h-6" />
                  Misi Pembangunan Desa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROFIL_DESA.misi.map((misi, i) => (
                    <div 
                      key={i}
                      className="p-4 bg-slate-50 hover:bg-desa-hijau-soft border border-slate-100 hover:border-desa-hijau/20 rounded-xl transition-all duration-300 flex items-start space-x-3 group"
                    >
                      <div className="bg-desa-hijau/10 text-desa-hijau group-hover:bg-desa-hijau group-hover:text-white p-1.5 rounded-lg text-xs font-bold font-mono transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{misi}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Kondisi Geografis */}
          {activeSubTab === 'geografis' && (
            <div className="space-y-6 md:space-y-8 animate-fadeIn" id="profil-geografis-konten">
              <h3 className="text-2xl font-bold text-desa-navy flex items-center gap-2">
                <Compass className="text-desa-hijau w-6 h-6" />
                Letak Wilayah & Topografi
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Luas Wilayah</span>
                  <span className="text-2xl font-extrabold text-desa-hijau mt-2">{PROFIL_DESA.geografis.luasWilayah}</span>
                  <p className="text-xs text-slate-500 mt-2">Sebagian besar didominasi sawah basah subur</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Suhu Udara</span>
                  <span className="text-2xl font-extrabold text-desa-hijau mt-2">{PROFIL_DESA.geografis.suhuRataRata}</span>
                  <p className="text-xs text-slate-500 mt-2">Tropis basah, ideal untuk komoditas hortikultura</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Curah Hujan</span>
                  <span className="text-2xl font-extrabold text-desa-hijau mt-2">{PROFIL_DESA.geografis.curahHujan}</span>
                  <p className="text-xs text-slate-500 mt-2">Intensitas hujan tahunan teratur</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-5 bg-desa-navy text-white p-6 rounded-2xl shadow-inner flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-bold text-desa-emas flex items-center gap-2 mb-4">
                      <Map className="w-5 h-5" />
                      Batas Administratif
                    </h4>
                    <ul className="space-y-3.5 text-sm text-gray-300">
                      <li className="flex justify-between border-b border-white/10 pb-2">
                        <span className="font-medium text-gray-400">Utara:</span>
                        <span className="font-semibold text-white">{PROFIL_DESA.geografis.batasUtara}</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-2">
                        <span className="font-medium text-gray-400">Selatan:</span>
                        <span className="font-semibold text-white">{PROFIL_DESA.geografis.batasSelatan}</span>
                      </li>
                      <li className="flex justify-between border-b border-white/10 pb-2">
                        <span className="font-medium text-gray-400">Timur:</span>
                        <span className="font-semibold text-white">{PROFIL_DESA.geografis.batasTimur}</span>
                      </li>
                      <li className="flex justify-between pb-2">
                        <span className="font-medium text-gray-400">Barat:</span>
                        <span className="font-semibold text-white">{PROFIL_DESA.geografis.batasBarat}</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-400 italic mt-4">
                    * Berdasarkan ketetapan batas BPN Kabupaten Cilacap
                  </p>
                </div>

                <div className="lg:col-span-7 p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-center">
                  <h4 className="text-base font-bold text-desa-navy mb-2">Topografi Wilayah</h4>
                  <p className="text-sm text-slate-600 leading-relaxed text-justify">
                    {PROFIL_DESA.geografis.topografi}
                  </p>
                  <div className="mt-5 p-4 bg-desa-hijau-soft border border-desa-hijau/10 rounded-xl flex items-center space-x-3">
                    <span className="w-3 h-3 rounded-full bg-desa-hijau animate-ping" />
                    <p className="text-xs text-desa-hijau font-medium">
                      Memiliki irigasi teknis terintegrasi langsung dari hulu aliran Sidareja.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Demografi & Wilayah */}
          {activeSubTab === 'demografi' && (
            <div className="space-y-6 md:space-y-8 animate-fadeIn" id="profil-demografi-konten">
              <h3 className="text-2xl font-bold text-desa-navy flex items-center gap-2">
                <Users className="text-desa-hijau w-6 h-6" />
                Demografi Penduduk & Pembagian Wilayah
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Total Penduduk</p>
                  <p className="text-2xl font-extrabold text-desa-hijau mt-1">
                    {PROFIL_DESA.dataWilayah.totalPenduduk.toLocaleString('id-ID')}
                  </p>
                  <span className="text-[10px] text-slate-400">Jiwa terdaftar</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Kepala Keluarga</p>
                  <p className="text-2xl font-extrabold text-desa-hijau mt-1">
                    {PROFIL_DESA.dataWilayah.jumlahKk.toLocaleString('id-ID')}
                  </p>
                  <span className="text-[10px] text-slate-400">KK aktif</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Laki-Laki</p>
                  <p className="text-2xl font-extrabold text-blue-600 mt-1">
                    {PROFIL_DESA.dataWilayah.jumlahLakiLaki.toLocaleString('id-ID')}
                  </p>
                  <span className="text-[10px] text-slate-400">Jiwa</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Perempuan</p>
                  <p className="text-2xl font-extrabold text-pink-600 mt-1">
                    {PROFIL_DESA.dataWilayah.jumlahPerempuan.toLocaleString('id-ID')}
                  </p>
                  <span className="text-[10px] text-slate-400">Jiwa</span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                <h4 className="text-base font-bold text-desa-navy mb-4">Pembagian Administrasi Lingkungan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 font-mono">DUSUN</span>
                      <p className="text-lg font-bold text-desa-navy mt-0.5">{PROFIL_DESA.dataWilayah.jumlahDusun} Wilayah</p>
                    </div>
                    <div className="w-10 h-10 bg-desa-hijau-soft text-desa-hijau rounded-full flex items-center justify-center font-bold">
                      D
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 font-mono">RUKUN WARGA (RW)</span>
                      <p className="text-lg font-bold text-desa-navy mt-0.5">{PROFIL_DESA.dataWilayah.jumlahRw} RW</p>
                    </div>
                    <div className="w-10 h-10 bg-desa-hijau-soft text-desa-hijau rounded-full flex items-center justify-center font-bold">
                      W
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 font-mono">RUKUN TETGANGGA (RT)</span>
                      <p className="text-lg font-bold text-desa-navy mt-0.5">{PROFIL_DESA.dataWilayah.jumlahRt} RT</p>
                    </div>
                    <div className="w-10 h-10 bg-desa-hijau-soft text-desa-hijau rounded-full flex items-center justify-center font-bold">
                      T
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
