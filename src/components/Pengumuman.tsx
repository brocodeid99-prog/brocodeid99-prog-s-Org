import React, { useState } from 'react';
import { Bell, Megaphone, Calendar, User, FileDown, X, Info } from 'lucide-react';
import { useDb } from '../context/DbContext';
import { PengumumanDesa } from '../types';

export default function Pengumuman() {
  const { pengumumanDesa: PENGUMUMAN_DESA } = useDb();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<PengumumanDesa | null>(null);

  const getLabelColors = (category: string) => {
    switch (category) {
      case 'Penting':
        return 'bg-red-50 text-red-600 border-red-150';
      case 'Pelayanan':
        return 'bg-blue-50 text-blue-600 border-blue-150';
      case 'Kegiatan':
        return 'bg-emerald-50 text-emerald-600 border-emerald-150';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-150';
    }
  };

  const getLabelEmoji = (category: string) => {
    switch (category) {
      case 'Penting': return '🚨';
      case 'Pelayanan': return '📋';
      case 'Kegiatan': return '📅';
      default: return '📢';
    }
  };

  const handleDownloadAttachment = () => {
    alert('Simulasi Unduh: Berkas lampiran pengumuman PDF berhasil diunduh ke perangkat Anda.');
  };

  return (
    <section id="pengumuman" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100 inline-flex items-center gap-1.5 mb-3">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            Papan Informasi Digital
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Pengumuman Desa Resmi
          </h2>
          <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Dapatkan informasi penting secara cepat terkait kebijakan kesehatan, kerja bakti massal, jaminan sosial kependudukan, serta beasiswa langsung dari balai desa.
          </p>
        </div>

        {/* Announcements Bento Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {PENGUMUMAN_DESA.map((notice) => {
            const badgeClasses = getLabelColors(notice.kategori);
            const emoji = getLabelEmoji(notice.kategori);
            
            return (
              <div 
                key={notice.id}
                id={`announcement-card-${notice.id}`}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-desa-hijau/20"
              >
                <div className="space-y-4">
                  {/* Category badge & date */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold border px-2.5 py-1 rounded-full uppercase tracking-wider font-mono flex items-center gap-1 ${badgeClasses}`}>
                      <span>{emoji}</span>
                      <span>{notice.kategori}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
                      {new Date(notice.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-bold text-desa-navy group-hover:text-desa-hijau transition-colors leading-snug">
                    {notice.judul}
                  </h3>

                  {/* Content snippet */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {notice.konten}
                  </p>
                </div>

                {/* Footer and trigger action */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-50 text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1 font-medium min-w-0 max-w-[200px]">
                    <User className="w-3.5 h-3.5 text-slate-350 shrink-0" />
                    <span className="truncate">Oleh: {notice.oleh}</span>
                  </span>

                  <button
                    onClick={() => setSelectedAnnouncement(notice)}
                    id={`announcement-btn-${notice.id}`}
                    className="text-xs font-bold text-desa-hijau hover:text-desa-hijau-light flex items-center space-x-1 focus:outline-none"
                  >
                    <span>Lihat Detail</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Announcement Detail Modal */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
              
              {/* Modal Header */}
              <div className="bg-desa-navy text-white px-6 py-5 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Megaphone className="w-5 h-5 text-desa-emas" />
                  <span className="text-[10px] text-desa-emas font-bold tracking-widest uppercase font-mono">
                    Detail Pengumuman Resmi
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedAnnouncement(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 max-h-[75vh]">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className={`text-[10px] font-bold border px-3 py-1 rounded-full uppercase tracking-wider font-mono ${getLabelColors(selectedAnnouncement.kategori)}`}>
                    {getLabelEmoji(selectedAnnouncement.kategori)} {selectedAnnouncement.kategori}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(selectedAnnouncement.tanggal).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-desa-navy leading-snug">
                    {selectedAnnouncement.judul}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                    {selectedAnnouncement.konten}
                  </p>
                </div>

                {/* Meta details */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs text-slate-500">
                  <div className="flex justify-between">
                    <span className="font-semibold">Penerbit:</span>
                    <span className="font-bold text-desa-navy">{selectedAnnouncement.oleh}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Lingkup:</span>
                    <span>Seluruh Warga Desa Tinggarjaya</span>
                  </div>
                </div>

                {/* Action Attachment */}
                <div 
                  onClick={handleDownloadAttachment}
                  className="p-4 border border-dashed border-desa-hijau/30 bg-desa-hijau-soft rounded-2xl flex items-center justify-between cursor-pointer group hover:bg-desa-hijau/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-desa-hijau/15 rounded-xl text-desa-hijau">
                      <FileDown className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-desa-navy">Unduh Lampiran Resmi PDF</p>
                      <p className="text-[10px] text-slate-400">Ukuran: 1.4 MB · Format: PDF Digital</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-desa-hijau group-hover:underline">Unduh</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="px-6 py-2.5 bg-desa-navy hover:bg-desa-navy-light text-white font-bold text-xs rounded-xl shadow-md transition-colors focus:outline-none"
                >
                  Selesai Membaca
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
