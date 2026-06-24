import React, { useState } from 'react';
import { 
  Building2, Users, FileText, Megaphone, Calendar, Leaf, Image, 
  DollarSign, Phone, LogOut, Settings, Plus, Edit, Trash2, Save, 
  X, Menu, Activity, Check, BookOpen, HeartHandshake, Eye, ShieldCheck, ChevronRight
} from 'lucide-react';
import { useDb } from '../context/DbContext';
import { PerangkatDesa, LayananDesa, BeritaDesa, PengumumanDesa, AgendaKegiatan, PotensiDesa, GaleriFoto, AnggaranItem } from '../types';
import ImageUpload from './ImageUpload';

interface AdminDashboardProps {
  onClose: () => void;
}

type AdminTab = 
  | 'overview' 
  | 'profil' 
  | 'perangkat' 
  | 'layanan' 
  | 'berita' 
  | 'pengumuman' 
  | 'agenda' 
  | 'potensi' 
  | 'galeri' 
  | 'transparansi' 
  | 'kontak';

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const db = useDb();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Login Local States
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Modals / Form editing states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // --- Dynamic Form state holders ---
  // Profil
  const [profilForm, setProfilForm] = useState(db.profilDesa);
  const [newMisiText, setNewMisiText] = useState('');

  // Perangkat
  const [perangkatForm, setPerangkatForm] = useState<Partial<PerangkatDesa>>({});
  // Layanan
  const [layananForm, setLayananForm] = useState<Partial<LayananDesa>>({});
  const [newLayananSyarat, setNewLayananSyarat] = useState('');
  // Berita
  const [beritaForm, setBeritaForm] = useState<Partial<BeritaDesa>>({});
  // Pengumuman
  const [pengumumanForm, setPengumumanForm] = useState<Partial<PengumumanDesa>>({});
  // Agenda
  const [agendaForm, setAgendaForm] = useState<Partial<AgendaKegiatan>>({});
  // Potensi
  const [potensiForm, setPotensiForm] = useState<Partial<PotensiDesa>>({});
  // Galeri
  const [galeriForm, setGaleriForm] = useState<Partial<GaleriFoto>>({});
  // Transparansi
  const [anggaranForm, setAnggaranForm] = useState(db.transparansiAnggaran);
  const [newPendapatanItem, setNewPendapatanItem] = useState<Partial<AnggaranItem>>({});
  const [newBelanjaItem, setNewBelanjaItem] = useState<Partial<AnggaranItem>>({});
  // Kontak
  const [kontakForm, setKontakForm] = useState(db.kontakDesa);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = db.loginAdmin(passwordInput);
    if (success) {
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Sandi admin salah! Silakan coba lagi.');
    }
  };

  const handleLogout = () => {
    db.logoutAdmin();
    setActiveTab('overview');
  };

  // Format Helper
  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  // Render Login Panel if not logged in
  if (!db.isAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-100 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-desa-hijau via-desa-emas to-desa-navy" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mx-auto p-2 shadow-sm">
              <img 
                src="https://disdukcapil.cilacapkab.go.id/wp-content/uploads/2018/12/cropped-Logo-Cilacap.png" 
                alt="Logo Cilacap" 
                className="w-12 h-12 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-xl font-extrabold text-desa-navy">Login Admin Tinggarjaya</h2>
            <p className="text-xs text-slate-500">Silakan masukkan kata sandi administrator untuk mengelola sistem data desa.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Kata Sandi Admin</label>
              <input 
                type="password"
                placeholder="Masukkan kata sandi..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">Petunjuk: Gunakan sandi <strong>admin123</strong> untuk uji coba</span>
            </div>

            {loginError && (
              <p className="text-xs text-red-600 font-bold bg-red-50 p-3 rounded-xl border border-red-100">{loginError}</p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all uppercase tracking-wider"
              >
                Kembali
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl transition-all shadow-md uppercase tracking-wider"
              >
                Masuk Sistem
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Sidebar Items
  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Statistik Ringkas', icon: <Activity className="w-4 h-4" /> },
    { id: 'profil', label: 'Profil & Visi Misi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'perangkat', label: 'Perangkat Desa', icon: <Users className="w-4 h-4" /> },
    { id: 'layanan', label: 'Layanan Masyarakat', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'berita', label: 'Berita Desa', icon: <FileText className="w-4 h-4" /> },
    { id: 'pengumuman', label: 'Pengumuman', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'agenda', label: 'Agenda Kegiatan', icon: <Calendar className="w-4 h-4" /> },
    { id: 'potensi', label: 'Potensi Desa', icon: <Leaf className="w-4 h-4" /> },
    { id: 'galeri', label: 'Galeri Foto', icon: <Image className="w-4 h-4" /> },
    { id: 'transparansi', label: 'Transparansi Anggaran', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'kontak', label: 'Kontak & Medsos', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col md:flex-row font-sans text-desa-navy overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <aside className={`bg-desa-navy text-slate-300 w-64 flex flex-col justify-between transition-all duration-300 border-r border-slate-800 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } fixed md:relative h-full z-40 shrink-0`}>
        
        <div className="overflow-y-auto flex-1">
          {/* Sidebar Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1 rounded-lg flex items-center justify-center shadow-md w-8 h-8">
                <img 
                  src="https://disdukcapil.cilacapkab.go.id/wp-content/uploads/2018/12/cropped-Logo-Cilacap.png" 
                  alt="Logo Cilacap" 
                  className="w-6 h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h1 className="text-sm font-black text-white uppercase tracking-wider leading-none">TINGGARJAYA</h1>
                <p className="text-[10px] text-desa-emas font-semibold mt-0.5">Dashboard Admin</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setEditingId(null);
                  setIsAdding(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeTab === item.id 
                    ? 'bg-desa-hijau text-white shadow-md' 
                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Logout button */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all uppercase tracking-wider"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2.5 bg-rose-950/40 hover:bg-rose-900 text-rose-300 font-bold text-xs rounded-xl transition-all uppercase tracking-wider"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN WORKING CANVAS AREA */}
      <div className="flex-grow flex flex-col min-w-0 overflow-hidden h-full">
        {/* Header toolbar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-50 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            <h2 className="text-base font-extrabold text-desa-navy uppercase tracking-wide">
              {menuItems.find(x => x.id === activeTab)?.label}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 px-3 py-1.5 rounded-full flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sesi Aktif: Perangkat Desa</span>
            </span>
          </div>
        </header>

        {/* Dynamic Canvas with tab routing */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto bg-slate-50">
          
          {/* TAB 1: OVERVIEW / STATS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-2">
                <h3 className="text-lg font-black text-desa-navy">Selamat Datang di Sistem Informasi Desa (SID)</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                  Sistem manajemen data ini memungkinkan perangkat desa mengelola, merubah, menambah, atau menghapus informasi kependudukan, pengumuman darurat, potensi pariwisata/ekonomi, perangkat kerja, dan rincian realisasi APBDes secara langsung dan real-time.
                </p>
              </div>

              {/* Grid Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><FileText className="w-5 h-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Berita</span>
                    <p className="text-xl font-black mt-0.5">{db.beritaDesa.length}</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Megaphone className="w-5 h-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pengumuman</span>
                    <p className="text-xl font-black mt-0.5">{db.pengumumanDesa.length}</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><HeartHandshake className="w-5 h-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Layanan Aktif</span>
                    <p className="text-xl font-black mt-0.5">{db.layananDesa.length}</p>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex items-center space-x-4">
                  <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Users className="w-5 h-5" /></div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Perangkat Desa</span>
                    <p className="text-xl font-black mt-0.5">{db.perangkatDesa.length}</p>
                  </div>
                </div>
              </div>

              {/* Double Column Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Daftar Agenda Kegiatan Mendatang</h4>
                  <div className="divide-y divide-slate-100">
                    {db.agendaKegiatan.slice(0, 3).map((item) => (
                      <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-extrabold text-desa-navy">{item.nama}</p>
                          <p className="text-slate-500 mt-0.5">{item.tanggal} · {item.waktu}</p>
                        </div>
                        <span className="text-[10px] bg-slate-50 font-bold text-slate-500 px-2 py-1 rounded-md border border-slate-100">{item.penyelenggara}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-sm space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Realisasi Anggaran Pendapatan & Belanja</h4>
                  <div className="space-y-4 text-xs">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Tahun Anggaran</span>
                      <span className="font-black text-desa-navy">{db.transparansiAnggaran.tahun}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Total Pendapatan Desa</span>
                      <span className="font-black text-emerald-600 font-mono">{formatRupiah(db.transparansiAnggaran.totalPendapatan)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2">
                      <span className="font-medium text-slate-500">Total Belanja Desa</span>
                      <span className="font-black text-red-600 font-mono">{formatRupiah(db.transparansiAnggaran.totalBelanja)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFIL DESA & VISI MISI */}
          {activeTab === 'profil' && (
            <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-3xl shadow-sm space-y-6 animate-fadeIn">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 font-mono">Sejarah Singkat Desa</h3>
                <textarea 
                  value={profilForm.sejarah}
                  onChange={(e) => setProfilForm({ ...profilForm, sejarah: e.target.value })}
                  rows={6}
                  className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-2xl text-xs leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 font-mono">Visi Desa</h3>
                <input 
                  type="text"
                  value={profilForm.visi}
                  onChange={(e) => setProfilForm({ ...profilForm, visi: e.target.value })}
                  className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-2xl text-xs font-bold text-slate-700"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 font-mono">Misi Desa (Daftar Poin)</h3>
                <div className="space-y-2">
                  {profilForm.misi.map((m, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text"
                        value={m}
                        onChange={(e) => {
                          const updated = [...profilForm.misi];
                          updated[idx] = e.target.value;
                          setProfilForm({ ...profilForm, misi: updated });
                        }}
                        className="flex-grow p-3 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = profilForm.misi.filter((_, i) => i !== idx);
                          setProfilForm({ ...profilForm, misi: updated });
                        }}
                        className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-100"
                        title="Hapus Misi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new mission input */}
                <div className="flex gap-2 pt-2">
                  <input 
                    type="text"
                    placeholder="Tulis misi baru di sini..."
                    value={newMisiText}
                    onChange={(e) => setNewMisiText(e.target.value)}
                    className="flex-grow p-3 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newMisiText.trim()) {
                        setProfilForm({ ...profilForm, misi: [...profilForm.misi, newMisiText.trim()] });
                        setNewMisiText('');
                      }
                    }}
                    className="px-4 py-3 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Misi</span>
                  </button>
                </div>
              </div>

              {/* Data Geografis & Demografis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 font-mono">Data Geografis</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Luas Wilayah</label>
                      <input 
                        type="text" 
                        value={profilForm.geografis.luasWilayah}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          geografis: { ...profilForm.geografis, luasWilayah: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Batas Utara</label>
                      <input 
                        type="text" 
                        value={profilForm.geografis.batasUtara}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          geografis: { ...profilForm.geografis, batasUtara: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Batas Selatan</label>
                      <input 
                        type="text" 
                        value={profilForm.geografis.batasSelatan}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          geografis: { ...profilForm.geografis, batasSelatan: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Batas Timur</label>
                      <input 
                        type="text" 
                        value={profilForm.geografis.batasTimur}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          geografis: { ...profilForm.geografis, batasTimur: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 font-mono">Demografi Penduduk</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Total Penduduk</label>
                      <input 
                        type="number" 
                        value={profilForm.dataWilayah.totalPenduduk}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          dataWilayah: { ...profilForm.dataWilayah, totalPenduduk: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Total Laki-Laki</label>
                      <input 
                        type="number" 
                        value={profilForm.dataWilayah.jumlahLakiLaki}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          dataWilayah: { ...profilForm.dataWilayah, jumlahLakiLaki: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Total Perempuan</label>
                      <input 
                        type="number" 
                        value={profilForm.dataWilayah.jumlahPerempuan}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          dataWilayah: { ...profilForm.dataWilayah, jumlahPerempuan: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-bold mb-1">Total KK</label>
                      <input 
                        type="number" 
                        value={profilForm.dataWilayah.jumlahKk}
                        onChange={(e) => setProfilForm({
                          ...profilForm,
                          dataWilayah: { ...profilForm.dataWilayah, jumlahKk: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button for Profil */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    db.updateProfilDesa(profilForm);
                    alert('Data Profil & Visi Misi Desa berhasil disimpan!');
                  }}
                  className="px-6 py-3 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Semua Profil</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PERANGKAT DESA */}
          {activeTab === 'perangkat' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">Kelola daftar kepala desa, sekretaris, kepala urusan, dan kepala dusun.</p>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setPerangkatForm({ nama: '', jabatan: '', nip: '', foto: '', deskripsi: '' });
                    }}
                    className="px-4 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Perangkat</span>
                  </button>
                )}
              </div>

              {/* Form panel for adding or editing */}
              {(isAdding || editingId) && (
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {isAdding ? 'Tambah Perangkat Baru' : 'Edit Perangkat Desa'}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Nama Lengkap & Gelar *</label>
                      <input 
                        type="text"
                        value={perangkatForm.nama || ''}
                        onChange={(e) => setPerangkatForm({ ...perangkatForm, nama: e.target.value })}
                        placeholder="Contoh: H. Sartono, S.Sos."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-desa-hijau"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Jabatan *</label>
                      <input 
                        type="text"
                        value={perangkatForm.jabatan || ''}
                        onChange={(e) => setPerangkatForm({ ...perangkatForm, jabatan: e.target.value })}
                        placeholder="Contoh: Kasi Pemerintahan"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-desa-hijau"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">NIP (Opsional)</label>
                      <input 
                        type="text"
                        value={perangkatForm.nip || ''}
                        onChange={(e) => setPerangkatForm({ ...perangkatForm, nip: e.target.value })}
                        placeholder="Contoh: 19810314 201002 1 003"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-desa-hijau"
                      />
                    </div>
                    <div>
                      <ImageUpload
                        value={perangkatForm.foto || ''}
                        onChange={(val) => setPerangkatForm({ ...perangkatForm, foto: val })}
                        label="Foto Perangkat Desa *"
                        placeholder="Contoh: https://images.unsplash.com/..."
                        id="perangkat-foto"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Tupoksi / Deskripsi Kerja *</label>
                      <textarea 
                        value={perangkatForm.deskripsi || ''}
                        onChange={(e) => setPerangkatForm({ ...perangkatForm, deskripsi: e.target.value })}
                        placeholder="Tuliskan tugas pokok dan fungsi jabatan ini secara ringkas..."
                        rows={3}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-desa-hijau"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!perangkatForm.nama || !perangkatForm.jabatan || !perangkatForm.foto || !perangkatForm.deskripsi) {
                          alert('Nama, Jabatan, Foto, dan Deskripsi wajib diisi!');
                          return;
                        }
                        if (isAdding) {
                          db.addPerangkatDesa(perangkatForm as Omit<PerangkatDesa, 'id'>);
                        } else if (editingId) {
                          db.updatePerangkatDesa(editingId, perangkatForm);
                        }
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold rounded-lg transition-all"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Table List of Perangkat */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold">
                      <th className="p-4 w-16">Foto</th>
                      <th className="p-4">Nama / NIP</th>
                      <th className="p-4">Jabatan</th>
                      <th className="p-4 max-w-xs">Deskripsi Kerja</th>
                      <th className="p-4 text-right w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {db.perangkatDesa.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <img src={p.foto} alt={p.nama} className="w-10 h-12 object-cover rounded-lg" />
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-desa-navy">{p.nama}</div>
                          {p.nip && <div className="text-[10px] text-slate-400 font-mono mt-0.5">NIP. {p.nip}</div>}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-slate-100 border border-slate-200 text-slate-600 rounded font-bold text-[10px]">{p.jabatan}</span>
                        </td>
                        <td className="p-4 text-slate-500 max-w-xs truncate" title={p.deskripsi}>{p.deskripsi}</td>
                        <td className="p-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingId(p.id);
                              setIsAdding(false);
                              setPerangkatForm(p);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-desa-emas hover:text-desa-navy transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus perangkat desa ${p.nama}?`)) {
                                db.deletePerangkatDesa(p.id);
                              }
                            }}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors border border-red-100"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LAYANAN MASYARAKAT */}
          {activeTab === 'layanan' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">Kelola rujukan, berkas pengantar domisili, SKU, SKTM, dsb.</p>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setLayananForm({ nama: '', kategori: '', estimasiWaktu: '', deskripsi: '', persyaratan: [] });
                    }}
                    className="px-4 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Layanan</span>
                  </button>
                )}
              </div>

              {(isAdding || editingId) && (
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {isAdding ? 'Tambah Layanan Baru' : 'Edit Layanan Kependudukan'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Nama Layanan *</label>
                      <input 
                        type="text"
                        value={layananForm.nama || ''}
                        onChange={(e) => setLayananForm({ ...layananForm, nama: e.target.value })}
                        placeholder="Contoh: Surat Keterangan Usaha (SKU)"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Kategori Layanan *</label>
                      <input 
                        type="text"
                        value={layananForm.kategori || ''}
                        onChange={(e) => setLayananForm({ ...layananForm, kategori: e.target.value })}
                        placeholder="Contoh: Izin Usaha / Administrasi Kependudukan"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Estimasi Waktu Penyelesaian *</label>
                      <input 
                        type="text"
                        value={layananForm.estimasiWaktu || ''}
                        onChange={(e) => setLayananForm({ ...layananForm, estimasiWaktu: e.target.value })}
                        placeholder="Contoh: 15 Menit / Maks. 3x24 Jam"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Keterangan Singkat *</label>
                      <textarea 
                        value={layananForm.deskripsi || ''}
                        onChange={(e) => setLayananForm({ ...layananForm, deskripsi: e.target.value })}
                        placeholder="Tulis ringkasan penjelasan layanan ini..."
                        rows={2}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>

                    {/* Persyaratan array builder */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-slate-700 font-bold">Daftar Persyaratan Administratif *</label>
                      <div className="space-y-1.5">
                        {(layananForm.persyaratan || []).map((p, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input 
                              type="text"
                              value={p}
                              onChange={(e) => {
                                const list = [...(layananForm.persyaratan || [])];
                                list[idx] = e.target.value;
                                setLayananForm({ ...layananForm, persyaratan: list });
                              }}
                              className="flex-grow p-2 bg-slate-50 border border-slate-150 rounded-lg text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const list = (layananForm.persyaratan || []).filter((_, i) => i !== idx);
                                setLayananForm({ ...layananForm, persyaratan: list });
                              }}
                              className="p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Masukkan persyaratan baru..."
                          value={newLayananSyarat}
                          onChange={(e) => setNewLayananSyarat(e.target.value)}
                          className="flex-grow p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newLayananSyarat.trim()) {
                              const list = [...(layananForm.persyaratan || []), newLayananSyarat.trim()];
                              setLayananForm({ ...layananForm, persyaratan: list });
                              setNewLayananSyarat('');
                            }
                          }}
                          className="px-3 py-2 bg-slate-800 text-white font-bold rounded-lg text-xs flex items-center gap-1 shrink-0"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!layananForm.nama || !layananForm.kategori || !layananForm.estimasiWaktu || !layananForm.deskripsi) {
                          alert('Nama, Kategori, Estimasi, dan Deskripsi wajib diisi!');
                          return;
                        }
                        if (isAdding) {
                          db.addLayananDesa(layananForm as Omit<LayananDesa, 'id'>);
                        } else if (editingId) {
                          db.updateLayananDesa(editingId, layananForm);
                        }
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold rounded-lg transition-all"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Table List */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold">
                      <th className="p-4">Nama Layanan</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Estimasi</th>
                      <th className="p-4">Jumlah Syarat</th>
                      <th className="p-4 text-right w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {db.layananDesa.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-desa-navy">{l.nama}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 max-w-xs truncate">{l.deskripsi}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[10px] font-bold font-sans">{l.kategori}</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-500">{l.estimasiWaktu}</td>
                        <td className="p-4 font-bold text-slate-700">{l.persyaratan.length} Berkas</td>
                        <td className="p-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingId(l.id);
                              setIsAdding(false);
                              setLayananForm(l);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-desa-emas hover:text-desa-navy transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus layanan ${l.nama}?`)) {
                                db.deleteLayananDesa(l.id);
                              }
                            }}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors border border-red-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BERITA DESA */}
          {activeTab === 'berita' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">Kelola artikel portal kabar dan publikasi berita desa Tinggarjaya.</p>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setBeritaForm({ judul: '', kategori: '', ringkasan: '', konten: '', gambar: '', penulis: 'Admin Desa', dibaca: '3 Menit', tanggal: new Date().toISOString().split('T')[0] });
                    }}
                    className="px-4 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Berita</span>
                  </button>
                )}
              </div>

              {(isAdding || editingId) && (
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {isAdding ? 'Tulis Berita Baru' : 'Edit Berita Desa'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Judul Berita *</label>
                      <input 
                        type="text"
                        value={beritaForm.judul || ''}
                        onChange={(e) => setBeritaForm({ ...beritaForm, judul: e.target.value })}
                        placeholder="Contoh: Kegiatan Sosialisasi Ketahanan Pangan Mandiri Dusun III"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-desa-hijau text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Kategori Berita *</label>
                      <input 
                        type="text"
                        value={beritaForm.kategori || ''}
                        onChange={(e) => setBeritaForm({ ...beritaForm, kategori: e.target.value })}
                        placeholder="Contoh: Pembangunan / Bantuan Sosial / Pertanian"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Tanggal Publikasi *</label>
                      <input 
                        type="date"
                        value={beritaForm.tanggal || ''}
                        onChange={(e) => setBeritaForm({ ...beritaForm, tanggal: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Penulis / Sumber *</label>
                      <input 
                        type="text"
                        value={beritaForm.penulis || ''}
                        onChange={(e) => setBeritaForm({ ...beritaForm, penulis: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <ImageUpload
                        value={beritaForm.gambar || ''}
                        onChange={(val) => setBeritaForm({ ...beritaForm, gambar: val })}
                        label="Foto Utama Berita *"
                        placeholder="https://images.unsplash.com/..."
                        id="berita-gambar"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Ringkasan Berita (Tampil di grid utama) *</label>
                      <input 
                        type="text"
                        value={beritaForm.ringkasan || ''}
                        onChange={(e) => setBeritaForm({ ...beritaForm, ringkasan: e.target.value })}
                        placeholder="Masukkan cuplikan ringkas isi berita..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Konten Lengkap Berita *</label>
                      <textarea 
                        value={beritaForm.konten || ''}
                        onChange={(e) => setBeritaForm({ ...beritaForm, konten: e.target.value })}
                        placeholder="Tuliskan berita lengkap secara mendalam di sini..."
                        rows={8}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!beritaForm.judul || !beritaForm.kategori || !beritaForm.ringkasan || !beritaForm.konten || !beritaForm.gambar) {
                          alert('Judul, Kategori, Ringkasan, Konten, dan Gambar wajib diisi!');
                          return;
                        }
                        if (isAdding) {
                          db.addBeritaDesa(beritaForm as Omit<BeritaDesa, 'id' | 'slug'>);
                        } else if (editingId) {
                          db.updateBeritaDesa(editingId, beritaForm);
                        }
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold rounded-lg transition-all"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Table list */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold">
                      <th className="p-4 w-20">Gambar</th>
                      <th className="p-4">Berita</th>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4 text-right w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {db.beritaDesa.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <img src={b.gambar} alt={b.judul} className="w-14 h-10 object-cover rounded-lg" />
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-desa-navy max-w-sm md:max-w-md truncate">{b.judul}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">Oleh: {b.penulis}</div>
                        </td>
                        <td className="p-4 font-mono text-slate-500">{b.tanggal}</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded font-bold text-[10px]">{b.kategori}</span>
                        </td>
                        <td className="p-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingId(b.id);
                              setIsAdding(false);
                              setBeritaForm(b);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-desa-emas hover:text-desa-navy transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus berita ini?`)) {
                                db.deleteBeritaDesa(b.id);
                              }
                            }}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors border border-red-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: PENGUMUMAN */}
          {activeTab === 'pengumuman' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">Kirim pemberitahuan mendesak, imbauan posyandu, atau jadwal kerja bakti desa.</p>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setPengumumanForm({ judul: '', konten: '', kategori: 'Penting', oleh: 'Sekretariat Desa', tanggal: new Date().toISOString().split('T')[0] });
                    }}
                    className="px-4 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Pengumuman</span>
                  </button>
                )}
              </div>

              {(isAdding || editingId) && (
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {isAdding ? 'Tulis Pengumuman Baru' : 'Edit Pengumuman'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Judul / Hal Pengumuman *</label>
                      <input 
                        type="text"
                        value={pengumumanForm.judul || ''}
                        onChange={(e) => setPengumumanForm({ ...pengumumanForm, judul: e.target.value })}
                        placeholder="Contoh: Kerja Bakti Massal Mengantisipasi Genangan Musim Hujan"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Kategori Pengumuman *</label>
                      <select
                        value={pengumumanForm.kategori || 'Penting'}
                        onChange={(e) => setPengumumanForm({ ...pengumumanForm, kategori: e.target.value as any })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      >
                        <option value="Penting">Penting / Darurat</option>
                        <option value="Pelayanan">Administrasi & Pelayanan</option>
                        <option value="Kegiatan">Aktivitas & Kegiatan</option>
                        <option value="Informasi Umum">Informasi Umum</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Dikeluarkan Oleh *</label>
                      <input 
                        type="text"
                        value={pengumumanForm.oleh || ''}
                        onChange={(e) => setPengumumanForm({ ...pengumumanForm, oleh: e.target.value })}
                        placeholder="Contoh: Kepala Desa Tinggarjaya"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Isi Detail Pengumuman *</label>
                      <textarea 
                        value={pengumumanForm.konten || ''}
                        onChange={(e) => setPengumumanForm({ ...pengumumanForm, konten: e.target.value })}
                        placeholder="Tuliskan isi pengumuman secara rinci..."
                        rows={4}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!pengumumanForm.judul || !pengumumanForm.konten || !pengumumanForm.oleh) {
                          alert('Judul, Konten, dan Penerbit wajib diisi!');
                          return;
                        }
                        if (isAdding) {
                          db.addPengumumanDesa(pengumumanForm as Omit<PengumumanDesa, 'id'>);
                        } else if (editingId) {
                          db.updatePengumumanDesa(editingId, pengumumanForm);
                        }
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold rounded-lg transition-all"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Table list */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold">
                      <th className="p-4">Judul Pengumuman</th>
                      <th className="p-4">Tanggal</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">Penerbit</th>
                      <th className="p-4 text-right w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {db.pengumumanDesa.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-desa-navy max-w-sm md:max-w-md truncate">{p.judul}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{p.konten}</div>
                        </td>
                        <td className="p-4 font-mono text-slate-500">{p.tanggal}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 text-[9px] rounded font-bold border uppercase ${
                            p.kategori === 'Penting' 
                              ? 'bg-red-50 text-red-700 border-red-100' 
                              : p.kategori === 'Pelayanan'
                              ? 'bg-blue-50 text-blue-700 border-blue-100'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>{p.kategori}</span>
                        </td>
                        <td className="p-4 text-slate-500 font-bold">{p.oleh}</td>
                        <td className="p-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingId(p.id);
                              setIsAdding(false);
                              setPengumumanForm(p);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-desa-emas hover:text-desa-navy transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus pengumuman ini?`)) {
                                db.deletePengumumanDesa(p.id);
                              }
                            }}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors border border-red-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: AGENDA KEGIATAN */}
          {activeTab === 'agenda' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">Kelola jadwal musrenbang, posyandu bumil, senam sehat lansia, dsb.</p>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setAgendaForm({ nama: '', tanggal: '', waktu: '09.00 WIB - Selesai', lokasi: 'Balai Desa', keterangan: '', penyelenggara: '' });
                    }}
                    className="px-4 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Agenda</span>
                  </button>
                )}
              </div>

              {(isAdding || editingId) && (
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {isAdding ? 'Tambah Agenda Baru' : 'Edit Agenda Kegiatan'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Nama Agenda Kegiatan *</label>
                      <input 
                        type="text"
                        value={agendaForm.nama || ''}
                        onChange={(e) => setAgendaForm({ ...agendaForm, nama: e.target.value })}
                        placeholder="Contoh: Rapat Koordinasi Posyandu Se-Desa Tinggarjaya"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-desa-hijau"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Hari & Tanggal *</label>
                      <input 
                        type="text"
                        value={agendaForm.tanggal || ''}
                        onChange={(e) => setAgendaForm({ ...agendaForm, tanggal: e.target.value })}
                        placeholder="Contoh: Kamis, 25 Juni 2026"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Waktu Pelaksanaan *</label>
                      <input 
                        type="text"
                        value={agendaForm.waktu || ''}
                        onChange={(e) => setAgendaForm({ ...agendaForm, waktu: e.target.value })}
                        placeholder="Contoh: 09.00 WIB - Selesai"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Tempat / Lokasi *</label>
                      <input 
                        type="text"
                        value={agendaForm.lokasi || ''}
                        onChange={(e) => setAgendaForm({ ...agendaForm, lokasi: e.target.value })}
                        placeholder="Contoh: Aula Pertemuan Balai Desa"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Penyelenggara / Panitia *</label>
                      <input 
                        type="text"
                        value={agendaForm.penyelenggara || ''}
                        onChange={(e) => setAgendaForm({ ...agendaForm, penyelenggara: e.target.value })}
                        placeholder="Contoh: PKK & Kader Kesehatan"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Deskripsi / Keterangan Agenda *</label>
                      <textarea 
                        value={agendaForm.keterangan || ''}
                        onChange={(e) => setAgendaForm({ ...agendaForm, keterangan: e.target.value })}
                        placeholder="Jelaskan ringkasan agenda musyawarah atau pelatihan ini..."
                        rows={3}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!agendaForm.nama || !agendaForm.tanggal || !agendaForm.waktu || !agendaForm.lokasi || !agendaForm.penyelenggara) {
                          alert('Nama, Tanggal, Waktu, Lokasi, dan Panitia wajib diisi!');
                          return;
                        }
                        if (isAdding) {
                          db.addAgendaKegiatan(agendaForm as Omit<AgendaKegiatan, 'id'>);
                        } else if (editingId) {
                          db.updateAgendaKegiatan(editingId, agendaForm);
                        }
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold rounded-lg transition-all"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Table list */}
              <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-150 text-slate-500 font-bold">
                      <th className="p-4">Agenda Acara</th>
                      <th className="p-4">Tanggal & Waktu</th>
                      <th className="p-4">Lokasi</th>
                      <th className="p-4">Penyelenggara</th>
                      <th className="p-4 text-right w-28">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {db.agendaKegiatan.map((a) => (
                      <tr key={a.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-desa-navy max-w-sm md:max-w-md truncate">{a.nama}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{a.keterangan}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold">{a.tanggal}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{a.waktu}</div>
                        </td>
                        <td className="p-4 text-slate-500 font-medium">{a.lokasi}</td>
                        <td className="p-4"><span className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[10px] font-bold">{a.penyelenggara}</span></td>
                        <td className="p-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setEditingId(a.id);
                              setIsAdding(false);
                              setAgendaForm(a);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-desa-emas hover:text-desa-navy transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Apakah Anda yakin ingin menghapus agenda ${a.nama}?`)) {
                                db.deleteAgendaKegiatan(a.id);
                              }
                            }}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors border border-red-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: POTENSI DESA */}
          {activeTab === 'potensi' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">Kelola sektor unggulan pariwisata, UMKM, pertanian padi organik, kebudayaan, dsb.</p>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setPotensiForm({ judul: '', kategori: 'Pertanian', deskripsi: '', gambar: '' });
                    }}
                    className="px-4 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Potensi</span>
                  </button>
                )}
              </div>

              {(isAdding || editingId) && (
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {isAdding ? 'Tambah Potensi Baru' : 'Edit Sektor Potensi'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Judul Sektor Potensi *</label>
                      <input 
                        type="text"
                        value={potensiForm.judul || ''}
                        onChange={(e) => setPotensiForm({ ...potensiForm, judul: e.target.value })}
                        placeholder="Contoh: Sentra Pengrajin Gula Merah Kelapa"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Kategori Sektor *</label>
                      <select
                        value={potensiForm.kategori || 'Pertanian'}
                        onChange={(e) => setPotensiForm({ ...potensiForm, kategori: e.target.value as any })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      >
                        <option value="Pertanian">Pertanian</option>
                        <option value="UMKM">UMKM</option>
                        <option value="Kegiatan Masyarakat">Kegiatan Masyarakat</option>
                        <option value="Pendidikan">Pendidikan</option>
                        <option value="Budaya & Tradisi">Budaya & Tradisi</option>
                        <option value="Pembangunan">Pembangunan</option>
                      </select>
                    </div>
                    <div>
                      <ImageUpload
                        value={potensiForm.gambar || ''}
                        onChange={(val) => setPotensiForm({ ...potensiForm, gambar: val })}
                        label="Foto Representatif Potensi *"
                        placeholder="https://images.unsplash.com/..."
                        id="potensi-gambar"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Deskripsi Detail Sektor Potensi *</label>
                      <textarea 
                        value={potensiForm.deskripsi || ''}
                        onChange={(e) => setPotensiForm({ ...potensiForm, deskripsi: e.target.value })}
                        placeholder="Jelaskan kontribusi, jumlah KK terlibat, atau omset potensi ekonomi lokal ini..."
                        rows={4}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!potensiForm.judul || !potensiForm.deskripsi || !potensiForm.gambar) {
                          alert('Judul, Deskripsi, dan Foto wajib diisi!');
                          return;
                        }
                        if (isAdding) {
                          db.addPotensiDesa(potensiForm as Omit<PotensiDesa, 'id'>);
                        } else if (editingId) {
                          db.updatePotensiDesa(editingId, potensiForm);
                        }
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold rounded-lg transition-all"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Grid cards listing */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {db.potensiDesa.map((p) => (
                  <div key={p.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <img src={p.gambar} alt={p.judul} className="h-36 w-full object-cover bg-slate-150" />
                      <div className="p-4 space-y-2">
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-500 border border-slate-150 px-2 py-0.5 rounded uppercase tracking-wider">{p.kategori}</span>
                        <h4 className="text-xs font-bold text-desa-navy leading-snug line-clamp-1">{p.judul}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed text-justify">{p.deskripsi}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setEditingId(p.id);
                          setIsAdding(false);
                          setPotensiForm(p);
                        }}
                        className="px-2.5 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-[10px] font-bold flex items-center gap-1 hover:bg-desa-emas hover:text-desa-navy hover:border-desa-emas transition-all"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Apakah Anda yakin ingin menghapus potensi ${p.judul}?`)) {
                            db.deletePotensiDesa(p.id);
                          }
                        }}
                        className="px-2.5 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded text-[10px] font-bold flex items-center gap-1 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: GALERI FOTO */}
          {activeTab === 'galeri' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500">Rekam visual rapat desa, kerja bakti, pembagian BLT, semarak PKK, dsb.</p>
                {!isAdding && !editingId && (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setGaleriForm({ judul: '', kategori: 'Pemerintahan', url: '', deskripsi: '' });
                    }}
                    className="px-4 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Dokumentasi</span>
                  </button>
                )}
              </div>

              {(isAdding || editingId) && (
                <div className="bg-white p-6 border border-slate-100 rounded-3xl shadow-md space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                    {isAdding ? 'Tambah Foto Dokumentasi' : 'Edit Dokumentasi Foto'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Judul Foto / Kegiatan *</label>
                      <input 
                        type="text"
                        value={galeriForm.judul || ''}
                        onChange={(e) => setGaleriForm({ ...galeriForm, judul: e.target.value })}
                        placeholder="Contoh: Senam Lansia Bugar Dusun I"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Kategori Dokumentasi *</label>
                      <select
                        value={galeriForm.kategori || 'Pemerintahan'}
                        onChange={(e) => setGaleriForm({ ...galeriForm, kategori: e.target.value as any })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      >
                        <option value="Pemerintahan">Pemerintahan</option>
                        <option value="Masyarakat">Masyarakat</option>
                        <option value="Pembangunan">Pembangunan</option>
                        <option value="PKK">PKK</option>
                        <option value="Pemuda">Pemuda</option>
                        <option value="Pelayanan">Pelayanan</option>
                      </select>
                    </div>
                    <div>
                      <ImageUpload
                        value={galeriForm.url || ''}
                        onChange={(val) => setGaleriForm({ ...galeriForm, url: val })}
                        label="Sumber Foto Galeri *"
                        placeholder="https://images.unsplash.com/..."
                        id="galeri-url"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-bold mb-1">Deskripsi Keterangan Foto *</label>
                      <input 
                        type="text"
                        value={galeriForm.deskripsi || ''}
                        onChange={(e) => setGaleriForm({ ...galeriForm, deskripsi: e.target.value })}
                        placeholder="Tulis ringkasan jalannya kegiatan atau hasil dari program kerja ini..."
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-all"
                    >
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!galeriForm.judul || !galeriForm.url || !galeriForm.deskripsi) {
                          alert('Judul, Url, dan Deskripsi wajib diisi!');
                          return;
                        }
                        if (isAdding) {
                          db.addGaleriFoto(galeriForm as Omit<GaleriFoto, 'id'>);
                        } else if (editingId) {
                          db.updateGaleriFoto(editingId, galeriForm);
                        }
                        setIsAdding(false);
                        setEditingId(null);
                      }}
                      className="px-4 py-2 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold rounded-lg transition-all"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              )}

              {/* Grid list of pictures */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {db.galeriDesa.map((g) => (
                  <div key={g.id} className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm aspect-4/3 flex flex-col justify-between">
                    <img src={g.url} alt={g.judul} className="w-full h-full object-cover" />
                    
                    {/* Hover controls */}
                    <div className="absolute inset-0 bg-slate-900/80 p-3 text-white flex flex-col justify-between opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="space-y-1">
                        <span className="text-[8px] bg-desa-emas text-desa-navy px-1.5 py-0.5 rounded font-bold font-mono uppercase">{g.kategori}</span>
                        <h5 className="text-[10px] font-bold leading-tight">{g.judul}</h5>
                        <p className="text-[9px] text-slate-300 line-clamp-3 leading-relaxed">{g.deskripsi}</p>
                      </div>

                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setEditingId(g.id);
                            setIsAdding(false);
                            setGaleriForm(g);
                          }}
                          className="p-1 bg-white/20 text-white rounded hover:bg-desa-emas hover:text-desa-navy transition-all"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Apakah Anda yakin ingin menghapus dokumentasi ${g.judul}?`)) {
                              db.deleteGaleriFoto(g.id);
                            }
                          }}
                          className="p-1 bg-red-600/40 text-red-200 rounded hover:bg-red-600 hover:text-white transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: TRANSPARANSI ANGGARAN */}
          {activeTab === 'transparansi' && (
            <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-3xl shadow-sm space-y-8 animate-fadeIn">
              
              {/* Year & Totals Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Tahun Anggaran APBDes *</label>
                  <input 
                    type="text"
                    value={anggaranForm.tahun}
                    onChange={(e) => setAnggaranForm({ ...anggaranForm, tahun: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Total Pendapatan (IDR) *</label>
                  <input 
                    type="number"
                    value={anggaranForm.totalPendapatan}
                    onChange={(e) => setAnggaranForm({ ...anggaranForm, totalPendapatan: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Total Belanja (IDR) *</label>
                  <input 
                    type="number"
                    value={anggaranForm.totalBelanja}
                    onChange={(e) => setAnggaranForm({ ...anggaranForm, totalBelanja: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Pembiayaan Neto (IDR) *</label>
                  <input 
                    type="number"
                    value={anggaranForm.totalPembiayaan}
                    onChange={(e) => setAnggaranForm({ ...anggaranForm, totalPembiayaan: parseInt(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Pendapatan array manager */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Sumber Pendapatan Desa
                  </h3>

                  <div className="space-y-2">
                    {anggaranForm.pendapatan.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs">
                        <input 
                          type="text" 
                          value={item.kategori}
                          onChange={(e) => {
                            const list = [...anggaranForm.pendapatan];
                            list[idx].kategori = e.target.value;
                            setAnggaranForm({ ...anggaranForm, pendapatan: list });
                          }}
                          className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                        <input 
                          type="number" 
                          value={item.nominal}
                          onChange={(e) => {
                            const list = [...anggaranForm.pendapatan];
                            list[idx].nominal = parseInt(e.target.value) || 0;
                            setAnggaranForm({ ...anggaranForm, pendapatan: list });
                          }}
                          className="w-28 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                        />
                        <input 
                          type="number" 
                          value={item.persentase}
                          onChange={(e) => {
                            const list = [...anggaranForm.pendapatan];
                            list[idx].persentase = parseFloat(e.target.value) || 0;
                            setAnggaranForm({ ...anggaranForm, pendapatan: list });
                          }}
                          className="w-14 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const list = anggaranForm.pendapatan.filter((_, i) => i !== idx);
                            setAnggaranForm({ ...anggaranForm, pendapatan: list });
                          }}
                          className="p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Pendapatan row */}
                  <div className="flex gap-2 text-xs">
                    <input 
                      type="text"
                      placeholder="Kategori baru..."
                      value={newPendapatanItem.kategori || ''}
                      onChange={(e) => setNewPendapatanItem({ ...newPendapatanItem, kategori: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input 
                      type="number"
                      placeholder="Nominal..."
                      value={newPendapatanItem.nominal || ''}
                      onChange={(e) => setNewPendapatanItem({ ...newPendapatanItem, nominal: parseInt(e.target.value) || 0 })}
                      className="w-28 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input 
                      type="number"
                      placeholder="%"
                      value={newPendapatanItem.persentase || ''}
                      onChange={(e) => setNewPendapatanItem({ ...newPendapatanItem, persentase: parseFloat(e.target.value) || 0 })}
                      className="w-14 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newPendapatanItem.kategori && newPendapatanItem.nominal) {
                          setAnggaranForm({
                            ...anggaranForm,
                            pendapatan: [...anggaranForm.pendapatan, {
                              kategori: newPendapatanItem.kategori,
                              nominal: newPendapatanItem.nominal,
                              persentase: newPendapatanItem.persentase || 0
                            }]
                          });
                          setNewPendapatanItem({});
                        }
                      }}
                      className="px-3 py-2 bg-slate-800 text-white font-bold rounded-lg"
                    >
                      Tambah
                    </button>
                  </div>
                </div>

                {/* Belanja array manager */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 flex items-center gap-1.5 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    Belanja & Pengeluaran Desa
                  </h3>

                  <div className="space-y-2">
                    {anggaranForm.belanja.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center text-xs">
                        <input 
                          type="text" 
                          value={item.kategori}
                          onChange={(e) => {
                            const list = [...anggaranForm.belanja];
                            list[idx].kategori = e.target.value;
                            setAnggaranForm({ ...anggaranForm, belanja: list });
                          }}
                          className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                        />
                        <input 
                          type="number" 
                          value={item.nominal}
                          onChange={(e) => {
                            const list = [...anggaranForm.belanja];
                            list[idx].nominal = parseInt(e.target.value) || 0;
                            setAnggaranForm({ ...anggaranForm, belanja: list });
                          }}
                          className="w-28 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                        />
                        <input 
                          type="number" 
                          value={item.persentase}
                          onChange={(e) => {
                            const list = [...anggaranForm.belanja];
                            list[idx].persentase = parseFloat(e.target.value) || 0;
                            setAnggaranForm({ ...anggaranForm, belanja: list });
                          }}
                          className="w-14 p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const list = anggaranForm.belanja.filter((_, i) => i !== idx);
                            setAnggaranForm({ ...anggaranForm, belanja: list });
                          }}
                          className="p-2 text-red-600 bg-red-50 border border-red-100 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Belanja row */}
                  <div className="flex gap-2 text-xs">
                    <input 
                      type="text"
                      placeholder="Kategori baru..."
                      value={newBelanjaItem.kategori || ''}
                      onChange={(e) => setNewBelanjaItem({ ...newBelanjaItem, kategori: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input 
                      type="number"
                      placeholder="Nominal..."
                      value={newBelanjaItem.nominal || ''}
                      onChange={(e) => setNewBelanjaItem({ ...newBelanjaItem, nominal: parseInt(e.target.value) || 0 })}
                      className="w-28 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <input 
                      type="number"
                      placeholder="%"
                      value={newBelanjaItem.persentase || ''}
                      onChange={(e) => setNewBelanjaItem({ ...newBelanjaItem, persentase: parseFloat(e.target.value) || 0 })}
                      className="w-14 p-2 bg-slate-50 border border-slate-200 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newBelanjaItem.kategori && newBelanjaItem.nominal) {
                          setAnggaranForm({
                            ...anggaranForm,
                            belanja: [...anggaranForm.belanja, {
                              kategori: newBelanjaItem.kategori,
                              nominal: newBelanjaItem.nominal,
                              persentase: newBelanjaItem.persentase || 0
                            }]
                          });
                          setNewBelanjaItem({});
                        }
                      }}
                      className="px-3 py-2 bg-slate-800 text-white font-bold rounded-lg"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    db.updateTransparansiAnggaran(anggaranForm);
                    alert('Laporan Transparansi APBDes berhasil diupdate secara real-time!');
                  }}
                  className="px-6 py-3 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Realisasi Anggaran</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 11: KONTAK & MEDSOS */}
          {activeTab === 'kontak' && (
            <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-3xl shadow-sm space-y-6 animate-fadeIn">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                
                {/* Kantor Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 font-mono">Sekretariat Kantor</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Nama Instansi Resmi *</label>
                      <input 
                        type="text" 
                        value={kontakForm.namaInstansi}
                        onChange={(e) => setKontakForm({ ...kontakForm, namaInstansi: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Alamat Fisik Lengkap *</label>
                      <textarea 
                        value={kontakForm.alamat}
                        onChange={(e) => setKontakForm({ ...kontakForm, alamat: e.target.value })}
                        rows={2}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Alamat Email Resmi *</label>
                      <input 
                        type="email" 
                        value={kontakForm.email}
                        onChange={(e) => setKontakForm({ ...kontakForm, email: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Nomor WhatsApp Pelayanan (Sertakan kode negara) *</label>
                      <input 
                        type="text" 
                        value={kontakForm.whatsapp}
                        onChange={(e) => setKontakForm({ ...kontakForm, whatsapp: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Nomor Telepon Kantor *</label>
                      <input 
                        type="text" 
                        value={kontakForm.telepon}
                        onChange={(e) => setKontakForm({ ...kontakForm, telepon: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Hari & Jam Kerja Pelayanan *</label>
                      <input 
                        type="text" 
                        value={kontakForm.jamKerja}
                        onChange={(e) => setKontakForm({ ...kontakForm, jamKerja: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Sosial Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-desa-navy uppercase tracking-widest border-b border-slate-100 pb-2 font-mono">Pranala Media Sosial Resmi</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Facebook URL</label>
                      <input 
                        type="text" 
                        value={kontakForm.socialMedia.facebook}
                        onChange={(e) => setKontakForm({
                          ...kontakForm,
                          socialMedia: { ...kontakForm.socialMedia, facebook: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Instagram URL</label>
                      <input 
                        type="text" 
                        value={kontakForm.socialMedia.instagram}
                        onChange={(e) => setKontakForm({
                          ...kontakForm,
                          socialMedia: { ...kontakForm.socialMedia, instagram: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">YouTube Channel URL</label>
                      <input 
                        type="text" 
                        value={kontakForm.socialMedia.youtube}
                        onChange={(e) => setKontakForm({
                          ...kontakForm,
                          socialMedia: { ...kontakForm.socialMedia, youtube: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 font-bold mb-1">Twitter / X URL</label>
                      <input 
                        type="text" 
                        value={kontakForm.socialMedia.twitter}
                        onChange={(e) => setKontakForm({
                          ...kontakForm,
                          socialMedia: { ...kontakForm.socialMedia, twitter: e.target.value }
                        })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Save Button for Kontak */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    db.updateKontakDesa(kontakForm);
                    alert('Informasi Kontak & Media Sosial Sekretariat berhasil diperbarui!');
                  }}
                  className="px-6 py-3 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Kontak & Medsos</span>
                </button>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
