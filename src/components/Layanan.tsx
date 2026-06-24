import React, { useState, useRef } from 'react';
import { 
  FileText, Search, BookOpen, Clock, ArrowRight, X, 
  Upload, CheckCircle, Smartphone, MapPin, CheckSquare, Sparkles, MessageSquare 
} from 'lucide-react';
import { useDb } from '../context/DbContext';
import { LayananDesa } from '../types';

export default function Layanan() {
  const { layananDesa: LAYANAN_DESA } = useDb();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  
  // Modal states
  const [activeReqLayanan, setActiveReqLayanan] = useState<LayananDesa | null>(null);
  const [activeApplyLayanan, setActiveApplyLayanan] = useState<LayananDesa | null>(null);

  // Form submission wizard states
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    whatsapp: '',
    email: '',
    alasan: '',
    detailPengaduan: '',
    kategoriPengaduan: 'Infrastruktur'
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    'Semua',
    'Administrasi Kependudukan',
    'Izin Usaha',
    'Kesejahteraan Sosial',
    'Sosial & Pernikahan',
    'Kelahiran & Kematian',
    'Aspirasi & Laporan'
  ];

  const filteredServices = LAYANAN_DESA.filter((service) => {
    const matchesSearch = service.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedCategory === 'Semua') return matchesSearch;
    return matchesSearch && service.kategori === selectedCategory;
  });

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Drag and Drop files handling
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startApplication = (service: LayananDesa) => {
    setActiveApplyLayanan(service);
    setFormStep(1);
    setFormData({
      nama: '',
      nik: '',
      whatsapp: '',
      email: '',
      alasan: '',
      detailPengaduan: '',
      kategoriPengaduan: 'Infrastruktur'
    });
    setUploadedFiles([]);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API submission
    const randomId = 'TJ-' + Math.floor(100000 + Math.random() * 900000);
    setSubmissionId(randomId);
    setFormStep(3);
  };

  return (
    <section id="layanan" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Sistem Informasi Desa Mandiri
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Pelayanan Mandiri Masyarakat
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Tidak perlu antre lama di balai desa. Cek persyaratan administrasi, persiapkan dokumen, atau langsung kirim pengajuan surat secara online melalui portal mandiri ini.
          </p>
        </div>

        {/* Search & Filtering */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-12 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="relative w-full lg:w-96">
            <input
              type="text"
              placeholder="Cari jenis surat / layanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-sm focus:outline-none transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Service Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full lg:w-auto justify-start lg:justify-end overflow-x-auto pb-1.5 lg:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 focus:outline-none ${
                  selectedCategory === cat
                    ? 'bg-desa-hijau text-desa-putih shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:text-desa-hijau hover:bg-slate-100 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
            >
              <div>
                {/* Service Category & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold bg-desa-hijau-soft text-desa-hijau border border-desa-hijau/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                    {service.kategori}
                  </span>
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400 group-hover:text-desa-hijau group-hover:bg-desa-hijau-soft transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-desa-navy mb-2 group-hover:text-desa-hijau transition-colors">
                  {service.nama}
                </h3>

                {/* Short description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3">
                  {service.deskripsi}
                </p>
              </div>

              {/* Requirements & Speed Info */}
              <div>
                <div className="flex items-center space-x-4 mb-5 pb-4 border-b border-slate-50 text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-desa-emas" />
                    <span>Est. {service.estimasiWaktu}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                    <span>{service.persyaratan.length} Syarat</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveReqLayanan(service)}
                    id={`btn-syarat-${service.id}`}
                    className="py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-desa-navy font-semibold text-xs rounded-xl transition-colors border border-slate-100 focus:outline-none"
                  >
                    Cek Syarat
                  </button>
                  <button
                    onClick={() => startApplication(service)}
                    id={`btn-ajukan-${service.id}`}
                    className="py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-1 focus:outline-none"
                  >
                    <span>Ajukan</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Requirements Detail Modal (Cek Syarat) */}
        {activeReqLayanan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
              {/* Modal Header */}
              <div className="bg-desa-hijau text-white px-6 py-5 flex justify-between items-center relative">
                <div>
                  <span className="text-[9px] text-desa-emas font-bold tracking-widest uppercase font-mono">Persyaratan Berkas</span>
                  <h3 className="text-lg font-bold mt-0.5">{activeReqLayanan.nama}</h3>
                </div>
                <button 
                  onClick={() => setActiveReqLayanan(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5 max-h-[70vh]">
                <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {activeReqLayanan.deskripsi}
                </p>

                <div>
                  <h4 className="text-xs font-bold text-desa-navy uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-desa-hijau" />
                    Dokumen yang Harus Disiapkan:
                  </h4>
                  <ul className="space-y-2.5">
                    {activeReqLayanan.persyaratan.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2.5 text-xs text-slate-600 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-desa-hijau-soft text-desa-hijau flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-[11px] text-amber-800 leading-relaxed flex items-start space-x-2.5">
                  <span className="p-1 bg-amber-100 text-amber-700 rounded-lg shrink-0">💡</span>
                  <p>
                    <strong>Tips Pelayanan:</strong> Pastikan seluruh foto/scan berkas di atas terlihat jelas, tidak buram, dan tidak terpotong saat pengunggahan untuk mempercepat proses persetujuan admin desa.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  onClick={() => setActiveReqLayanan(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    const svc = activeReqLayanan;
                    setActiveReqLayanan(null);
                    startApplication(svc);
                  }}
                  className="px-5 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl shadow-md transition-colors focus:outline-none"
                >
                  Ajukan Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Application submission simulation wizard (Ajukan Layanan) */}
        {activeApplyLayanan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
              
              {/* Wizard Header */}
              <div className="bg-desa-navy text-white px-6 py-5 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-desa-emas font-bold tracking-widest uppercase font-mono">
                    Layanan Mandiri Online
                  </span>
                  <h3 className="text-base font-bold mt-0.5">Pengajuan: {activeApplyLayanan.nama}</h3>
                </div>
                <button 
                  onClick={() => setActiveApplyLayanan(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Wizard Progress Bar */}
              <div className="bg-slate-100 px-6 py-2.5 flex items-center justify-between text-xs font-medium text-slate-500 border-b border-slate-200">
                <span className={formStep >= 1 ? 'text-desa-hijau font-bold' : ''}>1. Data Pemohon</span>
                <span className="text-slate-300">/</span>
                <span className={formStep >= 2 ? 'text-desa-hijau font-bold' : ''}>2. Unggah Berkas</span>
                <span className="text-slate-300">/</span>
                <span className={formStep === 3 ? 'text-desa-hijau font-bold' : ''}>3. Selesai & Resi</span>
              </div>

              {/* Wizard Body Form */}
              <form onSubmit={submitApplication} className="flex-1 flex flex-col">
                <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                  
                  {/* STEP 1: Personal Details */}
                  {formStep === 1 && (
                    <div className="space-y-3.5 animate-fadeIn" id="layanan-form-step-1">
                      <div className="p-3 bg-blue-50 text-blue-800 rounded-xl text-[11px] leading-relaxed flex items-start gap-2 border border-blue-100">
                        <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p>Simulasi ini akan mengirimkan formulir permohonan ke sistem admin desa dan menghasilkan resi bukti digital resmi.</p>
                      </div>

                      {activeApplyLayanan.nama === 'Pengaduan Masyarakat' ? (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Pengaduan *</label>
                            <select
                              name="kategoriPengaduan"
                              value={formData.kategoriPengaduan}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                            >
                              <option value="Infrastruktur">Infrastruktur (Jalan, Jembatan, Irigasi)</option>
                              <option value="Pelayanan">Pelayanan Publik (Kinerja Perangkat, Surat Lambat)</option>
                              <option value="Ketertiban">Ketertiban & Keamanan Lingkungan</option>
                              <option value="Sosial">Masalah Sosial & Penyaluran Bansos</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Pengaduan secara Detail *</label>
                            <textarea
                              name="detailPengaduan"
                              value={formData.detailPengaduan}
                              onChange={handleInputChange}
                              placeholder="Ceritakan kronologi, lokasi kejadian, atau permasalahan yang Anda temukan di desa..."
                              rows={4}
                              required
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                            />
                          </div>
                        </>
                      ) : (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Keperluan / Alasan Pengajuan *</label>
                          <textarea
                            name="alasan"
                            value={formData.alasan}
                            onChange={handleInputChange}
                            placeholder="Contoh: Untuk syarat pengajuan modal usaha KUR BRI / syarat pendaftaran beasiswa anak sekolah..."
                            rows={3}
                            required
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Pemohon *</label>
                          <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                            placeholder="Sesuai KTP"
                            required
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">NIK (Nomor Induk Kependudukan) *</label>
                          <input
                            type="text"
                            name="nik"
                            value={formData.nik}
                            onChange={handleInputChange}
                            placeholder="16 Digit Angka NIK"
                            maxLength={16}
                            required
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif *</label>
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            placeholder="Contoh: 0812XXXXXXXX"
                            required
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Email Aktif (Opsional)</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="alamat@email.com"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Drag and Drop File Upload */}
                  {formStep === 2 && (
                    <div className="space-y-4 animate-fadeIn" id="layanan-form-step-2">
                      <div className="p-3 bg-amber-50 text-amber-800 border border-amber-100 rounded-xl text-[11px] leading-relaxed">
                        <strong>Persyaratan Wajib:</strong> Mohon lampirkan scan/foto pendukung (KTP, KK, atau surat pengantar RT). Simulasi memperbolehkan upload file gambar/PDF apa saja.
                      </div>

                      {/* Dropzone Container */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
                          isDragging
                            ? 'border-desa-hijau bg-desa-hijau/10'
                            : 'border-slate-200 hover:border-desa-hijau hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          multiple
                          className="hidden"
                        />
                        <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-700">Drag & Drop berkas di sini atau klik untuk mencari</p>
                        <p className="text-[10px] text-slate-400 mt-1">Mendukung file JPG, PNG, PDF hingga 5MB</p>
                      </div>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs font-bold text-slate-600">Berkas Terunggah ({uploadedFiles.length}):</p>
                          <div className="max-h-36 overflow-y-auto space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
                            {uploadedFiles.map((file, idx) => (
                              <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm text-xs border border-slate-100">
                                <div className="flex items-center space-x-2 min-w-0 pr-2">
                                  <FileText className="w-4 h-4 text-desa-hijau shrink-0" />
                                  <span className="truncate font-medium text-slate-600">{file.name}</span>
                                  <span className="text-[10px] text-slate-300">({(file.size / 1024).toFixed(1)} KB)</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                  className="text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 3: Receipt Success Output */}
                  {formStep === 3 && (
                    <div className="space-y-4 text-center py-4 animate-fadeIn" id="layanan-form-step-3">
                      <div className="w-16 h-16 bg-desa-hijau/15 text-desa-hijau rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h4 className="text-lg font-bold text-desa-navy">Pengajuan Berhasil Terkirim!</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                        Data Anda berhasil terverifikasi oleh sistem integrasi Desa Tinggarjaya. Tim administrasi akan memproses permohonan Anda.
                      </p>

                      {/* Official Proof Receipt */}
                      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-left max-w-md mx-auto relative overflow-hidden shadow-inner font-mono">
                        {/* Decorative bar */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-desa-hijau" />
                        
                        <div className="text-center pb-4 border-b border-dashed border-slate-300">
                          <p className="text-xs font-bold text-desa-navy tracking-wider uppercase">Pemerintah Desa Tinggarjaya</p>
                          <p className="text-[9px] text-slate-400">Jl. Raya Tinggarjaya No.12, Sidareja</p>
                        </div>

                        <div className="py-4 space-y-2 text-[11px] text-slate-600">
                          <div className="flex justify-between">
                            <span className="font-semibold">KODE LAYANAN:</span>
                            <span className="text-desa-hijau font-bold">{submissionId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">NAMA PEMOHON:</span>
                            <span className="text-desa-navy uppercase font-bold">{formData.nama}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">NIK (16 DIGIT):</span>
                            <span>{formData.nik}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">LAYANAN:</span>
                            <span className="text-right max-w-[200px] font-bold">{activeApplyLayanan.nama}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">STATUS:</span>
                            <span className="bg-yellow-100 text-yellow-800 font-bold px-2 py-0.5 rounded text-[9px] uppercase">
                              Sedang Diproses
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-semibold">TANGGAL:</span>
                            <span>{new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</span>
                          </div>
                        </div>

                        {/* Fake Barcode */}
                        <div className="border-t border-dashed border-slate-300 pt-4 flex flex-col items-center">
                          <div className="h-8 bg-slate-800 w-4/5 flex items-center justify-around px-2 mb-1.5">
                            <div className="w-0.5 bg-white h-full" />
                            <div className="w-1 bg-white h-full" />
                            <div className="w-0.5 bg-white h-full" />
                            <div className="w-2 bg-white h-full" />
                            <div className="w-0.5 bg-white h-full" />
                            <div className="w-1.5 bg-white h-full" />
                            <div className="w-0.5 bg-white h-full" />
                            <div className="w-2.5 bg-white h-full" />
                          </div>
                          <span className="text-[8px] text-slate-400 tracking-widest">{submissionId}-TJG</span>
                        </div>
                      </div>

                      <div className="bg-green-50 text-green-800 p-4 rounded-2xl border border-green-100 text-xs leading-relaxed max-w-md mx-auto text-left flex items-start gap-2.5">
                        <Smartphone className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <p>
                          <strong>Notifikasi WhatsApp:</strong> Pemberitahuan status penyelesaian atau instruksi pengambilan fisik surat akan dikirim ke nomor <strong>{formData.whatsapp}</strong> dalam kurun waktu estimasi layanan. Simpan tangkapan layar resi ini sebagai bukti penyerahan.
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Wizard Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between">
                  {formStep < 3 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          if (formStep === 1) {
                            setActiveApplyLayanan(null);
                          } else {
                            setFormStep(1);
                          }
                        }}
                        className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none"
                      >
                        {formStep === 1 ? 'Batalkan' : 'Sebelumnya'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          // Validate first step form required fields
                          if (formStep === 1) {
                            if (!formData.nama || !formData.nik || !formData.whatsapp || (activeApplyLayanan.nama === 'Pengaduan Masyarakat' ? !formData.detailPengaduan : !formData.alasan)) {
                              alert('Mohon lengkapi seluruh kolom wajib bertanda bintang (*)');
                              return;
                            }
                            setFormStep(2);
                          } else if (formStep === 2) {
                            // Automatically submit on next step
                            // Simulate form submission
                            const randomId = 'TJ-' + Math.floor(100000 + Math.random() * 900000);
                            setSubmissionId(randomId);
                            setFormStep(3);
                          }
                        }}
                        className="px-5 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl shadow-md transition-colors focus:outline-none"
                      >
                        {formStep === 1 ? 'Lanjutkan Berkas' : 'Kirim Permohonan'}
                      </button>
                    </>
                  ) : (
                    <div className="w-full flex justify-center">
                      <button
                        type="button"
                        onClick={() => setActiveApplyLayanan(null)}
                        className="px-6 py-2.5 bg-desa-navy hover:bg-desa-navy-light text-white font-bold text-xs rounded-xl shadow-md transition-colors focus:outline-none"
                      >
                        Kembali ke Layanan
                      </button>
                    </div>
                  )}
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
