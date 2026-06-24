import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, PhoneCall, Building2, Search } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  selectedNewsId: string | null;
  setSelectedNewsId: (id: string | null) => void;
  onOpenAdmin?: () => void;
}

export default function Navbar({ 
  activeSection, 
  setActiveSection, 
  selectedNewsId, 
  setSelectedNewsId,
  onOpenAdmin
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Secret Click and Keyboard triggers for hidden Admin Access
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A to open Admin Panel
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        onOpenAdmin?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenAdmin]);

  const handleLogoClick = () => {
    handleNavClick('beranda');
    
    setLogoClicks((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 5) {
        onOpenAdmin?.();
        return 0;
      }
      
      if (logoClickTimeout.current) clearTimeout(logoClickTimeout.current);
      logoClickTimeout.current = setTimeout(() => {
        setLogoClicks(0);
      }, 2000);
      
      return nextCount;
    });
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil Desa' },
    { id: 'pemerintahan', label: 'Pemerintahan' },
    { id: 'layanan', label: 'Layanan Mandiri' },
    { id: 'berita', label: 'Kabar Desa' },
    { id: 'pengumuman', label: 'Pengumuman' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'potensi', label: 'Potensi' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'transparansi', label: 'Transparansi' },
    { id: 'kontak', label: 'Kontak' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setSelectedNewsId(null); // Clear any open news detail
    setActiveSection(id);
    setIsOpen(false);
    
    // Scroll to section
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 80 : 160; // height of fixed navbar with two rows
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

  return (
    <nav 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-desa-hijau shadow-lg py-3' 
          : 'bg-desa-hijau/95 backdrop-blur-md lg:bg-desa-hijau/60 lg:backdrop-blur-sm py-4 lg:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Row 1: Logo & Title (Left) + Contact/Hamburger (Right) */}
        <div className="flex justify-between items-center">
          {/* Logo Brand (Click 5x to access Admin Panel) */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 text-left focus:outline-none group"
            id="nav-logo-button"
            title="Desa Tinggarjaya"
          >
            <div className="bg-white p-1.5 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300 flex items-center justify-center w-11 h-11">
              <img 
                src="https://disdukcapil.cilacapkab.go.id/wp-content/uploads/2018/12/cropped-Logo-Cilacap.png" 
                alt="Logo Cilacap" 
                className="w-8 h-8 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-lg font-bold text-desa-putih tracking-wide leading-tight uppercase font-sans">
                Tinggarjaya
              </span>
              <span className="block text-xs text-desa-emas/90 font-medium tracking-wider">
                Kec. Sidareja · Cilacap
              </span>
            </div>
          </button>

          {/* Desktop Right Side (Call to Action / Info) */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2.5 bg-desa-emas hover:bg-desa-emas/90 text-desa-hijau font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-1.5 focus:outline-none"
              id="nav-hubungi-wa"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Darurat</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="text-desa-putih hover:text-desa-emas p-2 rounded-lg hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Row 2: Floating Capsule-shaped Navigation Bar (Desktop Only) */}
        <div className="hidden lg:flex justify-center w-full mt-3.5">
          <div className={`flex items-center justify-between px-1.5 py-1.5 rounded-full border shadow-md transition-all duration-300 ${
            scrolled
              ? 'bg-white/10 backdrop-blur-md border-white/15'
              : 'bg-desa-hijau-light/80 backdrop-blur-md border-white/15'
          }`}>
            <div className="flex items-center space-x-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id && !selectedNewsId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    id={`nav-item-${item.id}`}
                    className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-wide transition-all duration-300 uppercase focus:outline-none ${
                      isActive
                        ? 'bg-desa-emas text-desa-hijau shadow-sm font-extrabold scale-[1.03]'
                        : 'text-white/90 hover:text-desa-emas hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        id="mobile-dropdown-menu"
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100 py-4 bg-desa-hijau border-t border-white/10' 
            : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`mobile-nav-${item.id}`}
                className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-desa-emas text-desa-hijau font-bold'
                    : 'text-desa-putih hover:bg-white/10 hover:text-desa-emas'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-4 px-4 space-y-2">
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noreferrer"
              className="block w-full text-center px-4 py-3 bg-desa-emas text-desa-hijau font-bold text-xs uppercase tracking-widest rounded-lg shadow-md"
            >
              Hubungi Layanan Darurat
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
