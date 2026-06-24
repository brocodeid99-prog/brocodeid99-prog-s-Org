import React, { useState } from 'react';
import { Calendar, User, Clock, ChevronLeft, ArrowRight, Share2, MessageSquare, ThumbsUp } from 'lucide-react';
import { useDb } from '../context/DbContext';
import { BeritaDesa } from '../types';

interface BeritaProps {
  selectedNewsId: string | null;
  setSelectedNewsId: (id: string | null) => void;
}

export default function Berita({ selectedNewsId, setSelectedNewsId }: BeritaProps) {
  const { beritaDesa: BERITA_DESA } = useDb();
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [comments, setComments] = useState<Record<string, { nama: string; isi: string; tanggal: string }[]>>({
    '1': [
      { nama: 'Budi Santoso', isi: 'Alhamdulillah, penyaluran BLT tertib sekali. Terima kasih Pemdes Tinggarjaya.', tanggal: '18 Juni 2026' },
      { nama: 'Siti Rohmah', isi: 'Bantuannya sangat menolong untuk membeli beras dan kebutuhan dapur harian.', tanggal: '19 Juni 2026' }
    ],
    '2': [
      { nama: 'Wawan S.', isi: 'Jalannya mulus sekali sekarang, bawa hasil sawah jadi lancar tidak guncang-guncang.', tanggal: '11 Juni 2026' }
    ]
  });

  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const categories = ['Semua', 'Bantuan Sosial', 'Pembangunan', 'Pertanian', 'Kesehatan'];

  const filteredNews = BERITA_DESA.filter((news) => {
    if (activeCategory === 'Semua') return true;
    return news.kategori === activeCategory;
  });

  const currentNews = BERITA_DESA.find((n) => n.id === selectedNewsId);

  const handleLike = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleAddComment = (e: React.FormEvent, newsId: string) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment = {
      nama: newCommentName,
      isi: newCommentText,
      tanggal: 'Hari ini'
    };

    setComments(prev => ({
      ...prev,
      [newsId]: [...(prev[newsId] || []), newComment]
    }));

    setNewCommentName('');
    setNewCommentText('');
  };

  // Convert Date string to Indonesian format
  const formatIndoDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  // DETAIL VIEW
  if (currentNews) {
    const currentComments = comments[currentNews.id] || [];
    const relatedNews = BERITA_DESA.filter((n) => n.id !== currentNews.id).slice(0, 2);

    return (
      <section id="berita" className="py-20 md:py-28 bg-white relative animate-fadeIn">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button
            onClick={() => setSelectedNewsId(null)}
            className="inline-flex items-center space-x-2 text-xs font-bold text-desa-hijau hover:text-desa-hijau-light uppercase tracking-wider mb-8 focus:outline-none group"
            id="btn-kembali-berita"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Daftar Berita</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4 mb-8">
            <span className="inline-block text-[10px] font-bold bg-desa-hijau-soft text-desa-hijau border border-desa-hijau/10 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
              {currentNews.kategori}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-desa-navy leading-tight tracking-tight">
              {currentNews.judul}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-2">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-desa-emas" />
                <span>{formatIndoDate(currentNews.tanggal)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <User className="w-4 h-4 text-blue-400" />
                <span>Oleh: {currentNews.penulis}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-green-400" />
                <span>Dibaca {currentNews.dibaca}</span>
              </span>
            </div>
          </div>

          {/* Big Featured Image */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 mb-10 max-h-[480px]">
            <img 
              src={currentNews.gambar} 
              alt={currentNews.judul} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose max-w-none text-slate-600 leading-relaxed text-sm md:text-base space-y-6 text-justify">
            {currentNews.konten.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Interaction Bar */}
          <div className="flex justify-between items-center py-6 my-10 border-y border-slate-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleLike(currentNews.id)}
                className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-desa-hijau bg-slate-50 hover:bg-desa-hijau-soft px-4 py-2 rounded-xl transition-all focus:outline-none"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Sukai ({likes[currentNews.id] || 0})</span>
              </button>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span>{currentComments.length} Komentar</span>
              </span>
            </div>
            
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Tautan berita berhasil disalin ke papan klip!');
              }}
              className="p-2 text-slate-400 hover:text-desa-hijau bg-slate-50 rounded-xl hover:bg-desa-hijau-soft transition-colors focus:outline-none"
              title="Salin Tautan"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Comment Simulator Section */}
          <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 mb-12">
            <h3 className="text-base font-bold text-desa-navy mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-desa-hijau" />
              Tanggapan Warga ({currentComments.length})
            </h3>

            {/* Comments List */}
            {currentComments.length > 0 ? (
              <div className="space-y-4 mb-8">
                {currentComments.map((comment, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-desa-navy">{comment.nama}</span>
                      <span className="text-[10px] text-slate-400">{comment.tanggal}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{comment.isi}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic mb-8">Belum ada tanggapan. Jadilah yang pertama berkomentar!</p>
            )}

            {/* New Comment Form */}
            <form onSubmit={(e) => handleAddComment(e, currentNews.id)} className="space-y-4">
              <h4 className="text-xs font-bold text-slate-600">Berikan Tanggapan Resmi Anda</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nama Lengkap Anda"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Tulis pesan atau masukan positif Anda..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                rows={3}
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-desa-hijau focus:ring-1 focus:ring-desa-hijau rounded-xl text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-desa-hijau hover:bg-desa-hijau-light text-white font-bold text-xs rounded-xl shadow-md transition-colors focus:outline-none"
              >
                Kirim Komentar
              </button>
            </form>
          </div>

          {/* Related News Carousel */}
          <div>
            <h3 className="text-base font-bold text-desa-navy mb-6">Kabar Desa Lainnya</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedNews.map((news) => (
                <div 
                  key={news.id}
                  onClick={() => setSelectedNewsId(news.id)}
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={news.gambar} 
                      alt={news.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[9px] font-bold text-desa-hijau bg-desa-hijau-soft px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {news.kategori}
                    </span>
                    <h4 className="text-xs font-bold text-desa-navy group-hover:text-desa-hijau line-clamp-2 leading-tight">
                      {news.judul}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    );
  }

  // LIST VIEW
  return (
    <section id="berita" className="py-20 md:py-28 bg-white relative">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-desa-hijau/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-desa-hijau uppercase tracking-widest bg-desa-hijau-soft px-3 py-1.5 rounded-full border border-desa-hijau/15 inline-block mb-3">
            Portal Informasi
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-desa-navy tracking-tight">
            Kabar Berita Desa Tinggarjaya
          </h2>
          <div className="w-16 h-1 bg-desa-emas mx-auto mt-4 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed">
            Ikuti perkembangan pembangunan, penyaluran bantuan sosial, kegiatan pertanian kelompok wanita tani, serta aneka sosialisasi kesehatan terkini.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12 bg-slate-50 p-2 rounded-2xl max-w-2xl mx-auto border border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 focus:outline-none ${
                activeCategory === cat
                  ? 'bg-desa-hijau text-white shadow-sm'
                  : 'text-slate-600 hover:text-desa-hijau hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredNews.map((news) => (
              <div 
                key={news.id}
                id={`news-card-${news.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-150 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="h-52 relative overflow-hidden bg-slate-100">
                    <img 
                      src={news.gambar} 
                      alt={news.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-desa-hijau font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 rounded-full shadow-sm">
                      {news.kategori}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-desa-emas" />
                        <span>{formatIndoDate(news.tanggal)}</span>
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-desa-navy line-clamp-2 leading-snug group-hover:text-desa-hijau transition-colors">
                      {news.judul}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {news.ringkasan}
                    </p>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-5 py-4 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Dibaca {news.dibaca}
                  </span>
                  
                  <button
                    onClick={() => setSelectedNewsId(news.id)}
                    id={`news-read-more-${news.id}`}
                    className="text-xs font-bold text-desa-hijau group-hover:text-desa-hijau-light flex items-center space-x-1 transition-colors focus:outline-none"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto">
            <p className="text-sm text-slate-500">Belum ada berita dalam kategori ini.</p>
          </div>
        )}

      </div>
    </section>
  );
}
