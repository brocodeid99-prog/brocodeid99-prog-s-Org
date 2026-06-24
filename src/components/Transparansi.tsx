import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, TrendingDown, Layers, CheckCircle2, 
  HelpCircle, Search, ShieldCheck, Scale, FileText 
} from 'lucide-react';
import { useDb } from '../context/DbContext';

export default function Transparansi() {
  const { transparansiAnggaran: TRANSPARANSI_2026 } = useDb();
  const [activeTab, setActiveTab] = useState<'apbdes' | 'pembangunan' | 'bansos'>('apbdes');
  
  // Bansos lookup states
  const [nikSearch, setNikSearch] = useState('');
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    nama?: string;
    bantuan?: string;
    status?: string;
  } | null>(null);

  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  // Ongoing physical projects list with budgets and progress
  const proyekPembangunan = [
    { nama: 'Pembangunan Jalan Rabat Beton Dusun II', lokasi: 'Dusun II (RT 04/RW 02)', anggaran: 145000000, realisasi: 145000000, progress: 100, status: 'Selesai' },
    { nama: 'Pembuatan Drainase Lingkungan Pemukiman', lokasi: 'Dusun I & III', anggaran: 210500000, realisasi: 210500000, progress: 100, status: 'Selesai' },
    { nama: 'Pembangunan Jembatan Penghubung Ekonomi', lokasi: 'Dusun IV (RT 12/RW 05)', anggaran: 250000000, realisasi: 180000000, progress: 75, status: 'Tahap Finisihing' },
    { nama: 'Pengadaan Fasilitas MCK & Air Bersih Sehat', lokasi: 'Dusun V (Kawasan Rawan Air)', anggaran: 95000000, realisasi: 85000000, progress: 90, status: 'Pemasangan Pompa' },
    { nama: 'Rehabilitasi Balai Kesehatan Desa', lokasi: 'Halaman Balai Desa', anggaran: 53732000, realisasi: 53732000, progress: 100, status: 'Selesai' },
  ];

  // Dummy list of social assistance receivers for simulated search lookup
  const bansosReceivers = [
    { nik: '3301010000000001', nama: 'Warkiman', bantuan: 'BLT Dana Desa (Pangan)', status: 'Tersalurkan Tahap II' },
    { nik: '3301010000000002', nama: 'Saniyem', bantuan: 'PKH (Program Keluarga Harapan)', status: 'Aktif Terdaftar' },
    { nik: '3301010000000003', nama: 'Karsito', bantuan: 'BPNT (Sembako Bulanan)', status: 'Aktif Terdaftar' },
    { nik: '3301010000000004', nama: 'Siti Maryam', bantuan: 'BLT Dana Desa (Lansia Mandiri)', status: 'Tersalurkan Tahap II' },
  ];

  const handleBansosLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (nikSearch.length < 16) {
      alert('NIK harus terdiri dari 16 digit angka kependudukan yang sah.');
      return;
    }
    const match = bansosReceivers.find(r => r.nik === nikSearch);
    if (match) {
      setSearchResult({
        found: true,
        nama: match.nama,
        bantuan: match.bantuan,
        status: match.status
      });
    } else {
      setSearchResult({ found: false });
    }
  };

  return (
    <section id="transparansi" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Akuntabilitas Publik
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Transparansi Realisasi Anggaran
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Wujud komitmen keterbukaan informasi publik Pemerintah Desa Tinggarjaya sesuai amanat Undang-Undang Desa. Laporkan, awasi, dan ikuti alokasi anggaran APBDes 2026.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('apbdes')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 focus:outline-none ${
              activeTab === 'apbdes' ? 'bg-desa-hijau text-white shadow-md' : 'text-slate-600 hover:text-desa-hijau'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>APBDes {TRANSPARANSI_2026.tahun}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('pembangunan')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 focus:outline-none ${
              activeTab === 'pembangunan' ? 'bg-desa-hijau text-white shadow-md' : 'text-slate-600 hover:text-desa-hijau'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Proyek Pembangunan</span>
          </button>

          <button
            onClick={() => setActiveTab('bansos')}
            className={`flex items-center space-x-2 px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 focus:outline-none ${
              activeTab === 'bansos' ? 'bg-desa-hijau text-white shadow-md' : 'text-slate-600 hover:text-desa-hijau'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Cek Bantuan Sosial</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-xl min-h-[450px]">
          
          {/* TAB 1: APBDes Stats & Charts */}
          {activeTab === 'apbdes' && (
            <div className="space-y-10 animate-fadeIn" id="transparansi-apbdes-konten">
              
              {/* Stat Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500 text-white rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider font-mono">Pendapatan Desa</span>
                    <p className="text-lg md:text-xl font-black text-desa-navy mt-1">
                      {formatRupiah(TRANSPARANSI_2026.totalPendapatan)}
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-center space-x-4">
                  <div className="p-3 bg-red-500 text-white rounded-xl">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-red-600 font-bold uppercase tracking-wider font-mono">Belanja Desa</span>
                    <p className="text-lg md:text-xl font-black text-desa-navy mt-1">
                      {formatRupiah(TRANSPARANSI_2026.totalBelanja)}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl flex items-center space-x-4">
                  <div className="p-3 bg-blue-500 text-white rounded-xl">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider font-mono">Pembiayaan Neto</span>
                    <p className="text-lg md:text-xl font-black text-desa-navy mt-1">
                      {formatRupiah(TRANSPARANSI_2026.totalPembiayaan)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Charts Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Income Chart */}
                <div className="space-y-5">
                  <h3 className="text-sm font-extrabold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Rincian Sumber Pendapatan
                  </h3>
                  <div className="space-y-4">
                    {TRANSPARANSI_2026.pendapatan.map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700 truncate max-w-[280px]">{item.kategori}</span>
                          <span className="font-mono text-slate-500">{formatRupiah(item.nominal)} ({item.persentase}%)</span>
                        </div>
                        {/* Progressive Bar */}
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${item.persentase}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expenses Chart */}
                <div className="space-y-5">
                  <h3 className="text-sm font-extrabold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    Rincian Belanja & Pengeluaran
                  </h3>
                  <div className="space-y-4">
                    {TRANSPARANSI_2026.belanja.map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-700 truncate max-w-[280px]">{item.kategori}</span>
                          <span className="font-mono text-slate-500">{formatRupiah(item.nominal)} ({item.persentase}%)</span>
                        </div>
                        {/* Progressive Bar */}
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="bg-red-500 h-full rounded-full transition-all duration-1000"
                            style={{ width: `${item.persentase}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legal Notice */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 text-[11px] text-slate-500 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-desa-hijau shrink-0 mt-0.5" />
                <p>
                  <strong>Laporan Anggaran Sah:</strong> Anggaran di atas telah dievaluasi dan disetujui bersama oleh Pemerintah Desa Tinggarjaya dan Badan Permusyawaratan Desa (BPD) dalam Musyawarah APBDes Perubahan 2026. Laporan ini sah secara hukum dan terbuka untuk seluruh pengawasan publik.
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: Physical Projects list */}
          {activeTab === 'pembangunan' && (
            <div className="space-y-6 animate-fadeIn" id="transparansi-pembangunan-konten">
              <h3 className="text-base font-bold text-desa-navy">Rencana & Realisasi Pembangunan Fisik</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-150">
                      <th className="py-3 px-4 rounded-l-xl">Nama Program</th>
                      <th className="py-3 px-4">Lokasi Wilayah</th>
                      <th className="py-3 px-4 text-right">Pagu Anggaran</th>
                      <th className="py-3 px-4">Progress Fisik</th>
                      <th className="py-3 px-4 rounded-r-xl">Status Kerja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proyekPembangunan.map((proyek, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-4 font-bold text-desa-navy">{proyek.nama}</td>
                        <td className="py-4 px-4 font-medium text-slate-500">{proyek.lokasi}</td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-slate-700">{formatRupiah(proyek.anggaran)}</td>
                        <td className="py-4 px-4 w-40">
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-desa-hijau h-full rounded-full" style={{ width: `${proyek.progress}%` }} />
                            </div>
                            <span className="font-mono font-bold text-[10px] text-desa-hijau">{proyek.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider border ${
                            proyek.progress === 100 
                              ? 'bg-green-50 text-green-700 border-green-100' 
                              : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                          }`}>
                            {proyek.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Bansos Lookup Engine */}
          {activeTab === 'bansos' && (
            <div className="space-y-8 animate-fadeIn" id="transparansi-bansos-konten">
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="text-base font-bold text-desa-navy">Pencarian Penerima Bantuan Sosial Mandiri</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Masukkan 16 Digit Nomor NIK KTP Anda untuk mengecek status kepesertaan jaminan sosial bantuan langsung tunai dana desa, PKH, atau BPNT.
                  </p>
                </div>

                {/* Input form */}
                <form onSubmit={handleBansosLookup} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="Masukkan 16 Digit Nomor NIK KTP..."
                    value={nikSearch}
                    onChange={(e) => setNikSearch(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs font-mono focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center space-x-1 focus:outline-none"
                  >
                    <Search className="w-4 h-4" />
                    <span>Cari NIK</span>
                  </button>
                </form>

                {/* Simulated Results Box */}
                {searchResult && (
                  <div className="animate-fadeIn pt-4">
                    {searchResult.found ? (
                      <div className="p-5 bg-green-50 border border-green-200 rounded-3xl space-y-3">
                        <div className="flex items-center space-x-2 text-green-800">
                          <CheckCircle2 className="w-5 h-5" />
                          <h4 className="text-xs font-extrabold uppercase tracking-wider">Penerima Bantuan Ditemukan</h4>
                        </div>
                        
                        <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                          <div className="flex justify-between border-b border-green-100 pb-1.5">
                            <span className="font-semibold">Nama Penerima:</span>
                            <span className="font-extrabold text-desa-navy uppercase">{searchResult.nama}</span>
                          </div>
                          <div className="flex justify-between border-b border-green-100 pb-1.5">
                            <span className="font-semibold">Skema Bantuan:</span>
                            <span className="font-bold text-desa-hijau">{searchResult.bantuan}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">Status Distribusi:</span>
                            <span className="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                              {searchResult.status}
                            </span>
                          </div>
                        </div>

                        <p className="text-[10px] text-green-800 leading-relaxed pt-2">
                          * Wajib membawa KTP dan KK asli ke balai desa saat pengambilan jatah fisik tunai/sembako.
                        </p>
                      </div>
                    ) : (
                      <div className="p-5 bg-amber-50 border border-amber-100 rounded-3xl text-center space-y-2">
                        <p className="text-xs font-bold text-amber-800">Maaf, Nomor NIK Anda Belum Terdaftar sebagai Penerima Bansos Aktif.</p>
                        <p className="text-[10px] text-slate-500 max-w-sm mx-auto">
                          Jika Anda merasa berhak mendapatkan bantuan sosial, Anda dapat mengajukan usulan baru dengan melampirkan berkas SKTM (Surat Keterangan Tidak Mampu) melalui menu <strong>Layanan Mandiri</strong> website ini.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Helpful list of demo NIKs for sandbox testing */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Sandbox Demo (NIK Uji Coba):</h5>
                  <div className="flex flex-wrap gap-2">
                    {bansosReceivers.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => setNikSearch(r.nik)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-150 text-[10px] font-mono rounded text-slate-600 focus:outline-none"
                      >
                        {r.nik} ({r.nama})
                      </button>
                    ))}
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
