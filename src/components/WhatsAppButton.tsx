import React from 'react';
import { MessageSquareShare } from 'lucide-react';
import { useDb } from '../context/DbContext';

export default function WhatsAppButton() {
  const { kontakDesa: KONTAK_DESA } = useDb();
  const sanitizedPhone = KONTAK_DESA.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${sanitizedPhone}?text=Halo%20Admin%20Desa%20Tinggarjaya%2C%20saya%20ingin%20bertanya%20mengenai%20layanan%20surat%20administrasi...`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group focus:outline-none"
      title="Hubungi Admin Desa via WhatsApp"
      id="floating-whatsapp-btn"
    >
      <MessageSquareShare className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-in-out whitespace-nowrap">
        Chat WA Admin
      </span>
    </a>
  );
}
