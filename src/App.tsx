import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Profile from './components/Profile';
import Pemerintahan from './components/Pemerintahan';
import Layanan from './components/Layanan';
import Berita from './components/Berita';
import Pengumuman from './components/Pengumuman';
import Agenda from './components/Agenda';
import Potensi from './components/Potensi';
import Galeri from './components/Galeri';
import Transparansi from './components/Transparansi';
import Kontak from './components/Kontak';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminDashboard from './components/AdminDashboard';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Monitor scroll positioning to update active section in sticky Navbar
  useEffect(() => {
    const handleScrollIntersection = () => {
      const sections = [
        'beranda', 'profil', 'pemerintahan', 'layanan', 
        'berita', 'pengumuman', 'agenda', 'potensi', 
        'galeri', 'transparansi', 'kontak'
      ];
      
      const scrollPosition = window.scrollY + 180; // offset trigger

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollIntersection);
    return () => window.removeEventListener('scroll', handleScrollIntersection);
  }, []);

  // Handler for custom navigations from CTA buttons or footer links
  const navigateToSection = (sectionId: string) => {
    setSelectedNewsId(null);
    setActiveSection(sectionId);
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

  if (isAdminOpen) {
    return <AdminDashboard onClose={() => setIsAdminOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-desa-abu text-desa-navy flex flex-col font-sans" id="app-root-container">
      {/* 1. Header Navigation bar */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        selectedNewsId={selectedNewsId}
        setSelectedNewsId={setSelectedNewsId}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Sections Body */}
      <main className="flex-grow">
        
        {/* 2. Hero Section */}
        <Hero onNavigate={navigateToSection} />

        {/* 3. Profil Desa Section (Sejarah, Visi Misi, Geografis, Demografi) */}
        <Profile />

        {/* 4. Pemerintahan Desa Section (Card profil perangkat desa) */}
        <Pemerintahan />

        {/* 5. Layanan Mandiri Kependudukan */}
        <Layanan />

        {/* 6. Kabar Desa & Detail Berita */}
        <Berita 
          selectedNewsId={selectedNewsId} 
          setSelectedNewsId={setSelectedNewsId} 
        />

        {/* 7. Pengumuman Resmi Desa */}
        <Pengumuman />

        {/* 8. Agenda Kegiatan & Timeline */}
        <Agenda />

        {/* 9. Potensi Desa (Pertanian, UMKM, dll) */}
        <Potensi />

        {/* 10. Galeri Dokumentasi Foto */}
        <Galeri />

        {/* 11. Transparansi APBDes */}
        <Transparansi />

        {/* 12. Hubungi Kami & Peta Lokasi */}
        <Kontak />

      </main>

      {/* 13. Footer Section */}
      <Footer 
        onNavigate={navigateToSection} 
        setSelectedNewsId={setSelectedNewsId} 
      />

      {/* 14. Floating WhatsApp Chat Support */}
      <WhatsAppButton />

      {/* 15. Floating Color Palette Selector */}
      <ThemeSelector />
    </div>
  );
}
