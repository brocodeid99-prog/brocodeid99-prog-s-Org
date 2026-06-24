export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  foto: string;
  deskripsi: string;
  nip?: string;
}

export interface LayananDesa {
  id: string;
  nama: string;
  deskripsi: string;
  persyaratan: string[];
  kategori: string;
  estimasiWaktu: string;
}

export interface BeritaDesa {
  id: string;
  judul: string;
  slug: string;
  kategori: string;
  tanggal: string;
  ringkasan: string;
  konten: string;
  gambar: string;
  penulis: string;
  dibaca: string;
}

export interface PengumumanDesa {
  id: string;
  judul: string;
  tanggal: string;
  konten: string;
  kategori: 'Penting' | 'Pelayanan' | 'Kegiatan' | 'Informasi Umum';
  oleh: string;
}

export interface AgendaKegiatan {
  id: string;
  nama: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  keterangan: string;
  penyelenggara: string;
}

export interface PotensiDesa {
  id: string;
  judul: string;
  deskripsi: string;
  gambar: string;
  kategori: 'Pertanian' | 'UMKM' | 'Kegiatan Masyarakat' | 'Pendidikan' | 'Budaya & Tradisi' | 'Pembangunan';
}

export interface GaleriFoto {
  id: string;
  judul: string;
  kategori: 'Pemerintahan' | 'Masyarakat' | 'Pembangunan' | 'PKK' | 'Pemuda' | 'Pelayanan';
  url: string;
  deskripsi: string;
}

export interface AnggaranItem {
  kategori: string;
  nominal: number;
  persentase: number;
}

export interface TransparansiAnggaran {
  tahun: string;
  totalPendapatan: number;
  totalBelanja: number;
  totalPembiayaan: number;
  pendapatan: AnggaranItem[];
  belanja: AnggaranItem[];
}
