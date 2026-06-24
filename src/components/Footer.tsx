import React from 'react';
import { Building2, Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { useDb } from '../context/DbContext';

interface FooterProps {
  onNavigate: (section: string) => void;
  setSelectedNewsId: (id: string | null) => void;
}

export default function Footer({ onNavigate, setSelectedNewsId }: FooterProps) {
  const { kontakDesa: KONTAK_DESA, layananDesa: LAYANAN_DESA } = useDb();
  const handleFooterNav = (sectionId: string) => {
    setSelectedNewsId(null);
    onNavigate(sectionId);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil Desa' },
    { id: 'pemerintahan', label: 'Pemerintahan' },
    { id: 'berita', label: 'Kabar & Berita' },
    { id: 'pengumuman', label: 'Pengumuman' },
    { id: 'agenda', label: 'Agenda Acara' },
    { id: 'potensi', label: 'Sektor Potensi' },
    { id: 'galeri', label: 'Galeri Foto' },
    { id: 'transparansi', label: 'APBDes & Transparansi' },
    { id: 'kontak', label: 'Hubungi Kami' }
  ];

  return (
    <footer className="bg-desa-navy text-gray-300 pt-16 pb-8 relative overflow-hidden border-t-4 border-desa-emas">
      {/* Visual touch elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-desa-hijau/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10">
          
          {/* Col 1: Village Branding (3 Columns for better spacing in other columns) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-1.5 rounded-xl flex items-center justify-center shadow-md w-10 h-10">
                <img 
                  src="https://disdukcapil.cilacapkab.go.id/wp-content/uploads/2018/12/cropped-Logo-Cilacap.png" 
                  alt="Logo Cilacap" 
                  className="w-7 h-7 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="block text-base font-bold text-white uppercase tracking-wider">
                  Desa Tinggarjaya
                </span>
                <span className="block text-xs text-desa-emas font-medium">
                  Kecamatan Sidareja · Cilacap
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed text-justify">
              Desa Tinggarjaya bertekad mewujudkan sistem pemerintahan desa mandiri dengan mengedepankan akuntabilitas, kemudahan akses pelayanan administrasi publik secara digital, pembangunan infrastruktur merata, dan pemberdayaan ekonomi kreatif warga berbasis gotong-royong.
            </p>

            {/* Social Media icons */}
            <div className="pt-2">
              <p className="text-xs font-bold text-white uppercase tracking-wider mb-2 font-mono">Media Sosial Resmi</p>
              <div className="flex space-x-3">
                <a 
                  href={KONTAK_DESA.socialMedia.facebook} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-white/5 hover:bg-desa-emas hover:text-desa-navy text-gray-400 rounded-xl transition-all"
                  title="Facebook Resmi"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={KONTAK_DESA.socialMedia.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-white/5 hover:bg-desa-emas hover:text-desa-navy text-gray-400 rounded-xl transition-all"
                  title="Instagram Resmi"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href={KONTAK_DESA.socialMedia.youtube} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-white/5 hover:bg-desa-emas hover:text-desa-navy text-gray-400 rounded-xl transition-all"
                  title="YouTube Resmi"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a 
                  href={KONTAK_DESA.socialMedia.twitter} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-white/5 hover:bg-desa-emas hover:text-desa-navy text-gray-400 rounded-xl transition-all"
                  title="Twitter Resmi"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Menu Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterNav(link.id)}
                    className="flex items-center space-x-1.5 text-gray-400 hover:text-desa-emas transition-colors focus:outline-none"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-desa-emas" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Second column of Quick links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider opacity-0 lg:opacity-100 font-sans">
              Menu Lanjutan
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.slice(5).map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleFooterNav(link.id)}
                    className="flex items-center space-x-1.5 text-gray-400 hover:text-desa-emas transition-colors focus:outline-none"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-desa-emas" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Layanan Mandiri links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4 min-w-0">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Layanan Mandiri
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              {LAYANAN_DESA.slice(0, 5).map((svc) => (
                <li key={svc.id} className="min-w-0">
                  <button
                    onClick={() => handleFooterNav('layanan')}
                    className="flex items-start space-x-1.5 text-left hover:text-desa-emas transition-colors focus:outline-none w-full group min-w-0"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-desa-emas shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                    <span className="leading-tight text-[11px] break-words">{svc.nama}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Kontak Resmi (Increased to 3 Columns to prevent overlap & truncation) */}
          <div className="lg:col-span-3 space-y-4 text-xs min-w-0">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
              Kontak Kantor
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-2 min-w-0">
                <MapPin className="w-4 h-4 text-desa-emas shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px]">
                  Jl. Raya Tinggarjaya No. 12, Sidareja, Cilacap 53261
                </span>
              </li>
              <li className="flex items-center space-x-2 min-w-0">
                <Phone className="w-3.5 h-3.5 text-desa-emas shrink-0" />
                <a 
                  href={`tel:${KONTAK_DESA.telepon.replace(/[^0-9+]/g, '')}`} 
                  className="font-mono hover:text-desa-emas text-[11px] transition-colors"
                >
                  {KONTAK_DESA.telepon}
                </a>
              </li>
              <li className="flex items-start space-x-2 min-w-0">
                <Mail className="w-4 h-4 text-desa-emas shrink-0 mt-0.5" />
                <a 
                  href={`mailto:${KONTAK_DESA.email}`} 
                  className="font-mono hover:text-desa-emas break-all text-[11px] leading-relaxed transition-colors"
                  title={KONTAK_DESA.email}
                >
                  {KONTAK_DESA.email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 pt-2 font-medium">
          <p className="text-center md:text-left">
            © 2026 Pemerintah Desa Tinggarjaya. All Rights Reserved.
          </p>
          <p className="text-center md:text-right mt-2 md:mt-0 font-mono text-[10px]">
            Sistem Informasi Desa · Kabupaten Cilacap
          </p>
        </div>

      </div>
    </footer>
  );
}
