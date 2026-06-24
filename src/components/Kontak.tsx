import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Smartphone } from 'lucide-react';
import { useDb } from '../context/DbContext';

export default function Kontak() {
  const { kontakDesa: KONTAK_DESA } = useDb();
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    email: '',
    pesan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        nama: '',
        whatsapp: '',
        email: '',
        pesan: ''
      });
      
      // Auto-hide success alert after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="kontak" className="py-20 md:py-28 bg-white relative">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Hubungi Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Hubungi Pemerintah Desa
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Punya pertanyaan, saran pembangunan, atau butuh bantuan darurat? Silakan isi formulir aspirasi atau kunjungi langsung kantor balai desa kami.
          </p>
        </div>

        {/* Double-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Contact info & Map Embed */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Cards Info */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-5">
              <h3 className="text-base font-bold text-desa-navy border-b border-slate-250 pb-3">
                Sekretariat Balai Desa
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="p-2 bg-white rounded-xl text-red-500 shadow-sm shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-desa-navy font-mono text-[10px] uppercase tracking-wider">Alamat Fisik</p>
                    <p className="mt-0.5 leading-relaxed">{KONTAK_DESA.alamat}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="p-2 bg-white rounded-xl text-desa-hijau shadow-sm shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-desa-navy font-mono text-[10px] uppercase tracking-wider">Telepon & WhatsApp</p>
                    <p className="mt-0.5 leading-relaxed">
                      WA: <a href={`https://wa.me/${KONTAK_DESA.whatsapp.replace('+', '')}`} target="_blank" rel="noreferrer" className="text-desa-hijau font-bold hover:underline">{KONTAK_DESA.whatsapp}</a> <br />
                      Kantor: {KONTAK_DESA.telepon}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="p-2 bg-white rounded-xl text-blue-500 shadow-sm shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-desa-navy font-mono text-[10px] uppercase tracking-wider">Surat Elektronik (Email)</p>
                    <p className="mt-0.5 leading-relaxed font-mono">{KONTAK_DESA.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 text-xs text-slate-600">
                  <div className="p-2 bg-white rounded-xl text-amber-500 shadow-sm shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-desa-navy font-mono text-[10px] uppercase tracking-wider">Jam Kerja Pelayanan</p>
                    <p className="mt-0.5 leading-relaxed">{KONTAK_DESA.jamKerja}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Iframe */}
            <div className="h-64 rounded-3xl overflow-hidden border border-slate-150 shadow-sm relative">
              {/* Actual Google Maps embed representing Sidareja, Cilacap area for a high fidelity feel */}
              <iframe 
                title="Peta Lokasi Desa Tinggarjaya"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.733190875955!2d108.97157833502808!3d-7.445037996500424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65653b6fa8e9df%3A0xe673ec48a0dc3140!2sTinggarjaya%2C%20Sidareja%2C%20Cilacap%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1719234567890!5m2!1sen!2sid" 
                className="w-full h-full border-0 filter grayscale hover:grayscale-0 transition-all duration-500"
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-desa-navy">
                  Formulir Hubungi Kami & Aspirasi Online
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Layanan pesan ini terhubung langsung dengan bagian pengaduan masyarakat sekertariat desa. Pengaduan akan dijawab melalui WhatsApp atau Email Anda.
                </p>
              </div>

              {isSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed animate-fadeIn">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold">Aspirasi Berhasil Terkirim!</p>
                    <p className="text-green-700 font-medium">Terima kasih atas kepedulian Anda. Pesan telah diarsipkan oleh admin sekertariat desa untuk ditindaklanjuti sesegera mungkin.</p>
                  </div>
                </div>
              )}

              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Anda *</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Contoh: Achmad Kurniawan"
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp Aktif *</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="Contoh: 0812XXXXXXXX"
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="contoh@email.com"
                      required
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pesan, Saran, atau Aspirasi Anda *</label>
                  <textarea
                    name="pesan"
                    value={formData.pesan}
                    onChange={handleInputChange}
                    placeholder="Tuliskan secara lengkap pesan, masukan pembangunan, atau kendala pelayanan desa yang Anda hadapi..."
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                id="contact-form-submit-btn"
                className={`w-full py-3.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 focus:outline-none ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span>Mengirimkan Pesan...</span>
                ) : (
                  <>
                    <span>Kirim Pesan Aspirasi</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
