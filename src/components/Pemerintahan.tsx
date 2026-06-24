import React, { useState } from 'react';
import { Search, UserCheck, ShieldCheck, Mail, Calendar, MapPin, Award } from 'lucide-react';
import { useDb } from '../context/DbContext';

export default function Pemerintahan() {
  const { perangkatDesa: PERANGKAT_DESA } = useDb();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Pimpinan',
    'Seksi Pelayanan & Pemerintahan',
    'Sekretariat & Keuangan',
    'Kewilayahan & BPD'
  ];

  const getCategoryOfPerangkat = (jabatan: string) => {
    const job = jabatan.toLowerCase();
    if (job.includes('kepala desa') || job.includes('sekretaris')) {
      return 'Pimpinan';
    }
    if (job.includes('kasi')) {
      return 'Seksi Pelayanan & Pemerintahan';
    }
    if (job.includes('kaur') || job.includes('keuangan')) {
      return 'Sekretariat & Keuangan';
    }
    if (job.includes('dusun') || job.includes('bpd') || job.includes('permusyawaratan')) {
      return 'Kewilayahan & BPD';
    }
    return 'Lainnya';
  };

  const filteredStaff = PERANGKAT_DESA.filter((staff) => {
    const matchesSearch = staff.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          staff.jabatan.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedRole === 'Semua') return matchesSearch;
    return matchesSearch && getCategoryOfPerangkat(staff.jabatan) === selectedRole;
  });

  return (
    <section id="pemerintahan" className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-desa-emas/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Struktur Organisasi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Pemerintahan Desa Tinggarjaya
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Perangkat desa berkomitmen penuh memberikan pelayanan administratif yang cepat, jujur, transparan, dan berorientasi pada kemakmuran warga.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 bg-desa-abu p-4 rounded-2xl border border-slate-100 max-w-5xl mx-auto">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Cari nama perangkat / jabatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-sm focus:outline-none transition-all shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedRole(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 focus:outline-none ${
                  selectedRole === cat
                    ? 'bg-desa-hijau text-desa-putih shadow-sm'
                    : 'bg-white text-slate-600 hover:text-desa-hijau hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Board of Directors / Leader Cards (Showcase) */}
        {selectedRole === 'Semua' && searchTerm === '' && (
          <div className="mb-16">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8 font-mono">
              Pimpinan Tertinggi Desa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {PERANGKAT_DESA.slice(0, 2).map((leader) => (
                <div 
                  key={leader.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-150 shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col sm:flex-row h-full group"
                >
                  <div className="sm:w-2/5 relative h-64 sm:h-auto min-h-[220px]">
                    <img 
                      src={leader.foto} 
                      alt={leader.nama} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-desa-emas text-desa-hijau font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-full shadow-sm flex items-center space-x-1">
                      <UserCheck className="w-3 h-3" />
                      <span>{leader.jabatan === 'Kepala Desa' ? 'KADES' : 'SEKDES'}</span>
                    </div>
                  </div>
                  <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-desa-navy leading-tight">{leader.nama}</h4>
                      <p className="text-sm font-medium text-desa-hijau mt-1">{leader.jabatan}</p>
                      {leader.nip && (
                        <p className="text-[11px] font-mono text-slate-400 mt-1">NIP. {leader.nip}</p>
                      )}
                      <p className="text-xs text-slate-500 mt-4 leading-relaxed line-clamp-4">
                        {leader.deskripsi}
                      </p>
                    </div>
                    <div className="border-t border-slate-100 pt-3 mt-4 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-desa-hijau" />
                        <span>Masa Jabatan Aktif</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Structure Grid */}
        <div>
          {selectedRole === 'Semua' && searchTerm === '' && (
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8 font-mono">
              Jajaran Perangkat & Kelembagaan Desa
            </h3>
          )}

          {filteredStaff.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStaff.map((staff) => {
                const isLeader = staff.jabatan.includes('Kepala Desa') || staff.jabatan.includes('Sekretaris');
                return (
                  <div 
                    key={staff.id}
                    id={`staff-card-${staff.id}`}
                    className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 ${
                      isLeader 
                        ? 'border-desa-hijau/35 ring-1 ring-desa-hijau/20 shadow-md' 
                        : 'border-slate-100 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Photo Header */}
                      <div className="h-60 relative overflow-hidden bg-slate-100">
                        <img 
                          src={staff.foto} 
                          alt={staff.nama} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-[10px] font-bold bg-desa-hijau/90 text-white uppercase px-2 py-0.5 rounded-full tracking-wider shadow-sm">
                            {staff.jabatan}
                          </span>
                        </div>
                      </div>

                      {/* Info Body */}
                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-desa-navy leading-tight line-clamp-1 hover:text-desa-hijau cursor-default">
                          {staff.nama}
                        </h4>
                        {staff.nip ? (
                          <p className="text-[10px] font-mono text-slate-400">NIP. {staff.nip}</p>
                        ) : (
                          <p className="text-[10px] font-mono text-slate-300">NIP: Non-PNS / Mitra</p>
                        )}
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 pt-1">
                          {staff.deskripsi}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions / Badges */}
                    <div className="px-4 py-3 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center space-x-1">
                        <Award className="w-3 h-3 text-desa-emas" />
                        <span>Pemerintah Desa</span>
                      </span>
                      <span className="text-desa-hijau hover:underline cursor-pointer">
                        Lihat Tupoksi
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 max-w-xl mx-auto">
              <p className="text-sm text-slate-500">Tidak ada perangkat desa yang cocok dengan pencarian Anda.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedRole('Semua'); }}
                className="mt-3 px-4 py-2 bg-desa-hijau text-white text-xs font-semibold rounded-lg hover:bg-desa-hijau-light transition-colors"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
