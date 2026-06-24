import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ChevronRight, Award, Bell } from 'lucide-react';
import { useDb } from '../context/DbContext';
import { AgendaKegiatan } from '../types';

export default function Agenda() {
  const { agendaKegiatan: AGENDA_KEGIATAN } = useDb();
  const [selectedAgendaId, setSelectedAgendaId] = useState<string>('1');

  const selectedAgenda = AGENDA_KEGIATAN.find(a => a.id === selectedAgendaId) || AGENDA_KEGIATAN[0] || {
    id: '',
    tanggal: '',
    nama: 'Belum Ada Kegiatan',
    keterangan: 'Belum ada agenda kegiatan yang terdaftar.',
    waktu: '-',
    lokasi: '-',
    penyelenggara: '-'
  };

  // Simulated calendar highlights
  const calendarDays = [
    { date: 21, active: false },
    { date: 22, active: false },
    { date: 23, active: false },
    { date: 24, active: false },
    { date: 25, active: true, agendaId: '1' }, // Musrenbang
    { date: 26, active: false },
    { date: 27, active: false },
    { date: 28, active: false },
    { date: 29, active: false },
    { date: 30, active: true, agendaId: '2' }, // PMT Stunting
    { date: 1, active: false, nextMonth: true },
    { date: 2, active: false, nextMonth: true },
    { date: 3, active: false, nextMonth: true },
    { date: 4, active: true, agendaId: '3', nextMonth: true }, // Pemasaran Digital
    { date: 5, active: false, nextMonth: true },
    { date: 6, active: false, nextMonth: true },
    { date: 7, active: false, nextMonth: true },
    { date: 8, active: false, nextMonth: true },
    { date: 9, active: false, nextMonth: true },
    { date: 10, active: false, nextMonth: true },
    { date: 11, active: false, nextMonth: true },
    { date: 12, active: true, agendaId: '4', nextMonth: true }, // Senam Lansia
  ];

  return (
    <section id="agenda" className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Kalender Kegiatan
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Agenda Kegiatan Desa
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Berpartisipasi aktif dalam memajukan lingkungan. Ikuti musyawarah pembangunan, penyuluhan gizi stunting balita, pelatihan digitalisasi ekonomi, serta pemeriksaan kesehatan warga.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Calendar UI Grid */}
          <div className="lg:col-span-5 bg-desa-navy text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-desa-emas flex items-center gap-1.5 uppercase tracking-wider">
                  <Calendar className="w-5 h-5" />
                  Juni - Juli 2026
                </h3>
                <span className="text-[10px] font-bold font-mono text-gray-400">AKTIF</span>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-400 uppercase mb-3">
                <span>Sn</span><span>Sl</span><span>Rb</span><span>Km</span><span>Jm</span><span>Sb</span><span>Mg</span>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {calendarDays.map((day, idx) => {
                  const isSelected = day.agendaId === selectedAgendaId;
                  return (
                    <button
                      key={idx}
                      disabled={!day.active}
                      onClick={() => day.agendaId && setSelectedAgendaId(day.agendaId)}
                      className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold transition-all focus:outline-none ${
                        day.active
                          ? isSelected
                            ? 'bg-desa-emas text-desa-navy scale-110 shadow-lg ring-2 ring-white/50'
                            : 'bg-desa-hijau text-white hover:bg-desa-emas hover:text-desa-navy'
                          : day.nextMonth
                            ? 'text-gray-600'
                            : 'text-gray-400'
                      }`}
                    >
                      {day.date}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-desa-hijau inline-block" />
                  <span>Tanggal Berwarna Hijau Memiliki Jadwal Agenda</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-desa-emas inline-block" />
                  <span>Tanggal Berwarna Emas adalah Agenda Terpilih</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 flex items-start gap-2.5">
              <Bell className="w-5 h-5 text-desa-emas shrink-0 mt-0.5 animate-swing" />
              <p className="text-[11px] text-gray-300 leading-relaxed">
                <strong>Ingat:</strong> Warga yang hadir diwajibkan tetap tertib menjaga kebersihan tempat acara dan datang tepat waktu sesuai jadwal.
              </p>
            </div>
          </div>

          {/* Right Column: Timeline & Detailed Viewer */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Timeline Selection List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                Daftar Agenda Terjadwal
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {AGENDA_KEGIATAN.map((agenda) => {
                  const isSelected = agenda.id === selectedAgendaId;
                  return (
                    <div
                      key={agenda.id}
                      onClick={() => setSelectedAgendaId(agenda.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                        isSelected
                          ? 'border-desa-hijau bg-desa-hijau-soft shadow-sm'
                          : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          isSelected ? 'bg-desa-hijau text-white' : 'bg-slate-100 text-slate-400 group-hover:text-desa-hijau'
                        }`}>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-semibold text-slate-400 font-mono">{agenda.tanggal}</p>
                          <h4 className={`text-xs md:text-sm font-bold truncate leading-tight mt-0.5 ${
                            isSelected ? 'text-desa-hijau' : 'text-desa-navy'
                          }`}>
                            {agenda.nama}
                          </h4>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-desa-hijau translate-x-0.5' : 'text-slate-400'
                      }`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Info Card of Selected Agenda */}
            <div className="bg-slate-50 border border-slate-150 p-6 rounded-3xl space-y-4 animate-fadeIn" id="agenda-detail-konten">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold text-desa-hijau bg-white border border-desa-hijau/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                    Detail Agenda terpilih
                  </span>
                  <h3 className="text-base font-bold text-desa-navy mt-2 leading-tight">
                    {selectedAgenda.nama}
                  </h3>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-500 leading-relaxed text-justify">
                {selectedAgenda.keterangan}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-desa-emas shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-400 text-[10px] uppercase font-mono">Waktu</p>
                    <p className="font-medium text-desa-navy">{selectedAgenda.waktu}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-400 text-[10px] uppercase font-mono">Lokasi</p>
                    <p className="font-medium text-desa-navy line-clamp-1" title={selectedAgenda.lokasi}>{selectedAgenda.lokasi}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-400 text-[10px] uppercase font-mono">Penyelenggara</p>
                    <p className="font-medium text-desa-navy">{selectedAgenda.penyelenggara}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-400 text-[10px] uppercase font-mono">Lingkup</p>
                    <p className="font-medium text-desa-navy">Umum (Warga Desa)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
