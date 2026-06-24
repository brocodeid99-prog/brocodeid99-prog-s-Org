import { 
  PerangkatDesa, 
  LayananDesa, 
  BeritaDesa, 
  PengumumanDesa, 
  AgendaKegiatan, 
  PotensiDesa, 
  GaleriFoto, 
  TransparansiAnggaran 
} from './types';

export const PROFIL_DESA = {
  sejarah: `Desa Tinggarjaya memiliki sejarah panjang yang kaya akan nilai-nilai luhur gotong royong dan kebersamaan. Terletak di wilayah subur Kecamatan Sidareja, Kabupaten Cilacap, desa ini awalnya terbentuk dari pemukiman agraris kecil yang dihuni oleh para petani tangguh. Kata "Tinggarjaya" secara etimologis berasal dari perpaduan kata dalam bahasa Jawa kuno; "Tinggar" yang melambangkan kesiapan atau kesiagaan (senjata laras panjang/keberanian) dan "Jaya" yang berarti kemenangan, kesuksesan, atau kemakmuran yang abadi. Berdasarkan penuturan para tokoh adat, kepemimpinan desa ini telah diwariskan dari generasi ke generasi dengan komitmen kuat menjaga keharmonisan alam, budaya luhur Jawa Cilacapan, dan pelayanan yang tulus kepada masyarakat. Seiring perkembangan zaman dan modernisasi administrasi pemerintahan, Tinggarjaya kini bertransformasi menjadi desa mandiri yang dinamis dengan tetap memegang teguh kearifan lokal.`,
  
  visi: "Mewujudkan Desa Tinggarjaya yang Mandiri, Sejahtera, Berakhlak Mulia, dan Transparan melalui Tata Kelola Pemerintahan yang Bersih, Pelayanan Prima, serta Optimalisasi Sektor Pertanian dan UMKM.",
  
  misi: [
    "Meningkatkan kualitas pelayanan publik berbasis digital yang cepat, tepat, ramah, dan bebas dari pungutan liar.",
    "Mewujudkan tata kelola keuangan desa yang transparan, akuntabel, dan dapat dipertanggungjawabkan kepada masyarakat.",
    "Mendorong produktivitas sektor pertanian melalui penyediaan infrastruktur irigasi yang memadai, penyuluhan teknologi tani, dan kemudahan akses pupuk.",
    "Mengembangkan potensi UMKM lokal dan ekonomi kreatif melalui program pelatihan terpadu, fasilitasi legalitas, serta pemasaran digital.",
    "Meningkatkan kualitas infrastruktur jalan desa, jembatan, sarana kesehatan dasar, dan fasilitas umum yang merata.",
    "Melestarikan nilai-nilai keagamaan, seni budaya tradisional Cilacapan, serta memperkuat solidaritas sosial dan kerukunan warga."
  ],

  geografis: {
    luasWilayah: "421,5 Hektar (Ha)",
    batasUtara: "Desa Sidareja",
    batasSelatan: "Desa Kunci",
    batasTimur: "Desa Sudagaran",
    batasBarat: "Desa Tegalsari",
    topografi: "Dataran rendah dengan ketinggian rata-rata 15 meter di atas permukaan laut. Sebagian besar wilayah merupakan lahan pertanian produktif (persawahan basah) dan pemukiman warga.",
    suhuRataRata: "26°C - 32°C",
    curahHujan: "3.200 mm/tahun"
  },

  dataWilayah: {
    jumlahDusun: 5,
    jumlahRw: 12,
    jumlahRt: 48,
    totalPenduduk: 7420,
    jumlahLakiLaki: 3745,
    jumlahPerempuan: 3675,
    jumlahKk: 2315
  }
};

export const PERANGKAT_DESA: PerangkatDesa[] = [
  {
    id: '1',
    nama: 'H. Sartono, S.Sos.',
    jabatan: 'Kepala Desa',
    nip: '19740512 200801 1 002',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Memimpin penyelenggaraan pemerintahan desa, menetapkan kebijakan pembangunan, membina kemasyarakatan, serta mengoordinasikan seluruh perangkat desa demi kemajuan Tinggarjaya.'
  },
  {
    id: '2',
    nama: 'Drs. Akhmad Fauzi',
    jabatan: 'Sekretaris Desa',
    nip: '19810314 201002 1 003',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Mengkoordinasikan administrasi pemerintahan desa, menyusun perencanaan program pembangunan, mengelola keuangan, serta memberikan pelayanan teknis administratif kepada seluruh jajaran desa.'
  },
  {
    id: '3',
    nama: 'Budi Raharjo',
    jabatan: 'Kasi Pemerintahan',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Menyusun rancangan regulasi desa, mengelola administrasi pertanahan, kependudukan, pembinaan ketertiban wilayah, keamanan lingkungan, serta fasilitasi pemilu.'
  },
  {
    id: '4',
    nama: 'Siti Aminah, S.Pd.',
    jabatan: 'Kasi Kesejahteraan',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Mengelola program sosial, penyaluran bantuan masyarakat, pembinaan kepemudaan, sarana pendidikan usia dini, keagamaan, serta pelestarian kebudayaan lokal.'
  },
  {
    id: '5',
    nama: 'Heri Kurniawan',
    jabatan: 'Kasi Pelayanan',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Mengoordinasikan permohonan surat-menyurat warga, mengelola sistem informasi desa, memfasilitasi pelayanan nikah, kelahiran, kematian, serta pengaduan warga.'
  },
  {
    id: '6',
    nama: 'Rina Wijayanti',
    jabatan: 'Kaur Umum & Perencanaan',
    foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Mengelola tata naskah dinas, inventarisasi aset desa, urusan rumah tangga kantor desa, serta merumuskan rencana pembangunan jangka menengah desa (RPJMDes).'
  },
  {
    id: '7',
    nama: 'Agus Triyono, S.E.',
    jabatan: 'Kaur Keuangan',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Mengelola administrasi keuangan desa, melakukan pembayaran belanja desa, menyusun laporan APBDes, serta mempersiapkan laporan pajak desa secara berkala.'
  },
  {
    id: '8',
    nama: 'Slamet Riyadi',
    jabatan: 'Kepala Dusun (Kadus) I',
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Membantu tugas Kepala Desa dalam pelaksanaan kegiatan pemerintahan, pembangunan, serta pembinaan ketertiban masyarakat di lingkup wilayah Dusun I Tinggarjaya.'
  },
  {
    id: '9',
    nama: 'Sugeng Prasetyo',
    jabatan: 'Ketua BPD (Badan Permusyawaratan Desa)',
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=400',
    deskripsi: 'Membahas dan menyepakati Rancangan Peraturan Desa bersama Kepala Desa, menampung serta menyalurkan aspirasi masyarakat, dan melakukan pengawasan kinerja Pemerintah Desa.'
  }
];

export const LAYANAN_DESA: LayananDesa[] = [
  {
    id: '1',
    nama: 'Surat Keterangan Domisili',
    deskripsi: 'Surat resmi yang menerangkan bahwa pemohon bertempat tinggal secara sah di wilayah Desa Tinggarjaya.',
    persyaratan: [
      'Surat Pengantar dari RT dan RW setempat.',
      'Fotokopi Kartu Tanda Penduduk (KTP) pemohon.',
      'Fotokopi Kartu Keluarga (KK).',
      'Pas foto berwarna ukuran 3x4 (jika diperlukan untuk instansi khusus).'
    ],
    kategori: 'Administrasi Kependudukan',
    estimasiWaktu: '10 - 15 Menit'
  },
  {
    id: '2',
    nama: 'Surat Keterangan Usaha (SKU)',
    deskripsi: 'Surat keterangan untuk warga yang memiliki usaha mikro, kecil, atau menengah sebagai syarat pengajuan bantuan atau kredit perbankan.',
    persyaratan: [
      'Surat Pengantar RT/RW dengan menyebutkan jenis usaha yang dimiliki.',
      'Fotokopi KTP dan KK pemilik usaha.',
      'Foto tempat atau kegiatan usaha.',
      'Pernyataan kesanggupan menjaga ketertiban lingkungan tempat usaha.'
    ],
    kategori: 'Izin Usaha',
    estimasiWaktu: '15 - 20 Menit'
  },
  {
    id: '3',
    nama: 'Surat Pengantar KTP',
    deskripsi: 'Surat rujukan untuk perekaman kartu tanda penduduk baru atau penggantian KTP rusak/hilang di tingkat Kecamatan.',
    persyaratan: [
      'Surat Pengantar RT/RW.',
      'Fotokopi Kartu Keluarga (KK).',
      'Surat keterangan kehilangan dari kepolisian (jika KTP hilang).',
      'KTP lama yang rusak (jika KTP rusak).'
    ],
    kategori: 'Administrasi Kependudukan',
    estimasiWaktu: '5 - 10 Menit'
  },
  {
    id: '4',
    nama: 'Surat Pengantar KK (Kartu Keluarga)',
    deskripsi: 'Layanan administrasi untuk membuat kartu keluarga baru, penambahan anggota keluarga, atau pemisahan KK mandiri.',
    persyaratan: [
      'Surat Pengantar RT/RW.',
      'Kartu Keluarga (KK) asli yang lama.',
      'Surat nikah / kutipan akta perkawinan (bagi yang baru menikah).',
      'Akta kelahiran anggota baru / Surat keterangan pindah masuk.'
    ],
    kategori: 'Administrasi Kependudukan',
    estimasiWaktu: '15 Menit'
  },
  {
    id: '5',
    nama: 'Surat Keterangan Tidak Mampu (SKTM)',
    deskripsi: 'Surat pernyataan untuk mendapatkan keringanan biaya kesehatan, pendidikan (KIP/Beasiswa), atau bantuan sosial khusus.',
    persyaratan: [
      'Surat Pengantar RT/RW yang menyatakan status ekonomi keluarga.',
      'Fotokopi KTP (orang tua & anak jika untuk sekolah).',
      'Fotokopi KK asli.',
      'Surat pernyataan tidak mampu bermaterai Rp10.000 diketahui RT/RW.'
    ],
    kategori: 'Kesejahteraan Sosial',
    estimasiWaktu: '15 Menit'
  },
  {
    id: '6',
    nama: 'Surat Pengantar Nikah (N1, N2, N4)',
    deskripsi: 'Berkas resmi pengantar pernikahan warga untuk didaftarkan ke Kantor Urusan Agama (KUA) atau Dinas Kependudukan Sipil.',
    persyaratan: [
      'Surat Pengantar RT/RW.',
      'Fotokopi KTP dan KK kedua calon mempelai.',
      'Fotokopi akta kelahiran kedua calon mempelai.',
      'Surat pernyataan status (belum menikah/duda/janda).',
      'Pas foto ukuran 2x3 (4 lembar) dan 3x4 (4 lembar) dengan latar biru.'
    ],
    kategori: 'Sosial & Pernikahan',
    estimasiWaktu: '20 - 30 Menit'
  },
  {
    id: '7',
    nama: 'Surat Keterangan Kelahiran',
    deskripsi: 'Surat keterangan kelahiran bayi sebagai dasar utama pengurusan Akta Kelahiran anak di Dinas Dukcapil Kabupaten Cilacap.',
    persyaratan: [
      'Surat Pengantar RT/RW.',
      'Surat keterangan kelahiran asli dari bidan/dokter/rumah sakit.',
      'Fotokopi KTP orang tua dan KTP saksi kelahiran (2 orang).',
      'Fotokopi Buku Nikah orang tua.',
      'Fotokopi Kartu Keluarga (KK) tempat bayi akan didaftarkan.'
    ],
    kategori: 'Kelahiran & Kematian',
    estimasiWaktu: '10 Menit'
  },
  {
    id: '8',
    nama: 'Surat Keterangan Kematian',
    deskripsi: 'Surat keterangan yang menerangkan peristiwa kematian warga demi keperluan pembaruan data keluarga dan asuransi.',
    persyaratan: [
      'Surat Pengantar RT/RW.',
      'Surat keterangan kematian asli dari dokter (jika meninggal di RS).',
      'Fotokopi KTP almarhum/almarhumah & KTP pelapor.',
      'Fotokopi KK tempat almarhum terdaftar.'
    ],
    kategori: 'Kelahiran & Kematian',
    estimasiWaktu: '10 Menit'
  },
  {
    id: '9',
    nama: 'Pengaduan Masyarakat',
    deskripsi: 'Layanan penyampaian aspirasi, saran, keluhan, serta laporan ketertiban umum dari warga langsung kepada kepala desa.',
    persyaratan: [
      'Identitas diri pelapor yang valid (KTP/KK).',
      'Deskripsi kronologi kejadian atau saran pembangunan yang jelas.',
      'Bukti dukung (foto kejadian/lokasi) jika ada.',
      'Nomor kontak WhatsApp aktif yang dapat dihubungi.'
    ],
    kategori: 'Aspirasi & Laporan',
    estimasiWaktu: 'Ditindaklanjuti maks. 3x24 Jam'
  }
];

export const BERITA_DESA: BeritaDesa[] = [
  {
    id: '1',
    judul: 'Desa Tinggarjaya Sukses Salurkan Bantuan Langsung Tunai (BLT-DD) Tahap II',
    slug: 'penyaluran-blt-dd-tahap-ii',
    kategori: 'Bantuan Sosial',
    tanggal: '2026-06-18',
    ringkasan: 'Sebanyak 125 Keluarga Penerima Manfaat (KPM) di Desa Tinggarjaya menerima bantuan langsung tunai dana desa yang disalurkan secara tertib di aula balai desa.',
    konten: `Pemerintah Desa Tinggarjaya secara resmi menyalurkan Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap II untuk tahun anggaran berjalan. Kegiatan penyaluran ini berlangsung dengan tertib dan lancar di Aula Balai Desa Tinggarjaya sejak pagi hari.\n\nKepala Desa Tinggarjaya, H. Sartono, S.Sos., dalam sambutannya menyampaikan bahwa bantuan ini ditujukan khusus bagi warga miskin ekstrem, lansia mandiri, dan warga yang mengidap penyakit menahun. "Kami berharap uang stimulan sebesar Rp300.000 per bulan ini dimanfaatkan sebaik-baiknya untuk memenuhi kebutuhan pangan pokok rumah tangga, bukan untuk hal-hal yang sifatnya konsumtif non-primer," tuturnya.\n\nProses verifikasi data dilakukan secara ketat oleh pendamping desa dan perwakilan BPD untuk menjamin tidak adanya tumpang tindih dengan bantuan sosial lainnya seperti PKH dan BPNT. Penyaluran dihadiri langsung oleh camat Sidareja, perwakilan Koramil, serta kepolisian sektor Sidareja sebagai bentuk transparansi dan pengamanan lapangan. Warga lansia yang berhalangan hadir secara fisik karena kendala kesehatan dikunjungi langsung ke rumah masing-masing oleh kepala dusun bersama tim medis desa untuk penyerahan langsung di tempat.`,
    gambar: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    penulis: 'Heri Kurniawan',
    dibaca: '4 Menit'
  },
  {
    id: '2',
    judul: 'Pembangunan Jalan Rabat Beton Dusun II Rampung Lebih Cepat dari Target',
    slug: 'rabat-beton-dusun-ii-selesai',
    kategori: 'Pembangunan',
    tanggal: '2026-06-10',
    ringkasan: 'Akses transportasi pertanian kini semakin lancar berkat kerja bakti warga menyelesaikan jalan rabat beton sepanjang 450 meter di wilayah Dusun II.',
    konten: `Kabar gembira datang dari Dusun II Desa Tinggarjaya. Proyek pembangunan infrastruktur jalan usaha tani berupa rabat beton yang didanai oleh alokasi Dana Desa akhirnya rampung dikerjakan. Hebatnya, proyek padat karya ini selesai satu minggu lebih cepat dari target estimasi kerja awal.\n\nSeketaris Desa, Drs. Akhmad Fauzi, menjelaskan bahwa kelancaran ini dipicu oleh tingginya antusiasme gotong royong warga dusun setempat. Setiap hari, puluhan warga bergantian secara sukarela menyumbangkan tenaga dan logistik konsumsi bagi para pekerja konstruksi. "Inilah esensi pembangunan desa, dana dari pemerintah, dikerjakan bersama warga, dan hasilnya dinikmati bersama oleh para petani kita," ungkapnya.\n\nJalan sepanjang 450 meter dengan lebar 3 meter ini merupakan urat nadi vital bagi distribusi hasil panen padi dan sayuran warga menuju jalur utama Sidareja. Sebelum dicor beton, jalan tanah liat ini kerap berlumpur parah saat musim hujan, menghambat aktivitas ekonomi dan mobilitas anak-anak sekolah. Kini, kendaraan roda empat sudah bisa masuk langsung ke area sawah, menghemat ongkos angkut pertanian hingga 30%.`,
    gambar: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    penulis: 'Drs. Akhmad Fauzi',
    dibaca: '3 Menit'
  },
  {
    id: '3',
    judul: 'Kelompok Wanita Tani (KWT) Sri Rejeki Lakukan Panen Raya Cabai Organik',
    slug: 'panen-raya-cabai-organik-kwt',
    kategori: 'Pertanian',
    tanggal: '2026-06-03',
    ringkasan: 'Ibu-ibu KWT Sri Rejeki sukses memanen 250 kg cabai merah keriting dari pekarangan pangan lestari desa yang dikelola secara organik.',
    konten: `Kelompok Wanita Tani (KWT) Sri Rejeki Desa Tinggarjaya melakukan panen raya cabai merah keriting organik di lahan Pekarangan Pangan Lestari (P2L) binaan Dinas Pertanian Kabupaten Cilacap. Dari total lahan seluas 150 meter persegi, KWT berhasil mengumpulkan hasil panen perdana seberat kurang lebih 250 kilogram.\n\nKetua KWT Sri Rejeki mengungkapkan rasa syukurnya atas pendampingan berkala yang diberikan oleh PPL (Penyuluh Pertanian Lapangan) desa. Warga diajarkan membuat pupuk cair organik sendiri dari limbah dapur rumah tangga dan pupuk kandang. Hal ini menekan biaya operasional penanaman hingga 60%.\n\nHasil panen ini selain dijual ke pasar tradisional Sidareja untuk menambah kas kelompok, juga didistribusikan secara gratis kepada ibu hamil dan menyusui di sekitar dusun sebagai bentuk kepedulian bersama terhadap pencegahan stunting melalui asupan gizi segar. Kepala Desa sangat mengapresiasi inovasi ini dan berencana menganggarkan dana pengadaan bibit hortikultura untuk 4 dusun lainnya pada APBDes perubahan mendatang.`,
    gambar: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800',
    penulis: 'Siti Aminah, S.Pd.',
    dibaca: '5 Menit'
  },
  {
    id: '4',
    judul: 'Sosialisasi Pencegahan Demam Berdarah dan Pembagian Abate Massal',
    slug: 'sosialisasi-pencegahan-dbd-abate',
    kategori: 'Kesehatan',
    tanggal: '2026-05-25',
    ringkasan: 'Kader Posyandu bersama Puskesmas Sidareja mengadakan penyuluhan gerakan 3M Plus dan pembagian bubuk abate gratis dari pintu ke pintu.',
    konten: `Mengantisipasi pancaroba yang rawan memicu lonjakan kasus Demam Berdarah Dengue (DBD), Pemerintah Desa Tinggarjaya bekerja sama dengan Puskesmas Sidareja menggelar Sosialisasi Gerakan 3M Plus (Menguras, Menutup, Mendaur ulang, serta menghindari gigitan nyamuk). Acara ini diiringi pembagian bubuk larvasida (abate) gratis ke pemukiman warga.\n\nPenyuluhan dipusatkan di Aula Balai Desa dengan sasaran utama ibu-ibu PKK dan ketua RT. Narasumber dari Puskesmas menegaskan pentingnya pemeriksaan jentik berkala secara mandiri di bak mandi, vas bunga, serta dispenser air. Setelah sesi materi, kader kesehatan melakukan aksi gerilya pemeriksaan jentik nyamuk dan membagikan abate ke rumah-rumah warga secara door-to-door.\n\nDesa Tinggarjaya berkomitmen mewujudkan zero-case DBD di tahun ini dengan mengaktifkan kembali kader Jumantik (Juru Pemantau Jentik) di tingkat RT yang laporannya disinkronkan setiap minggu via grup WhatsApp warga.`,
    gambar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    penulis: 'Siti Aminah, S.Pd.',
    dibaca: '4 Menit'
  }
];

export const PENGUMUMAN_DESA: PengumumanDesa[] = [
  {
    id: '1',
    judul: 'Pelaksanaan Imunisasi Polio Tambahan (PIN) di Posyandu Melati 1-5',
    tanggal: '2026-06-22',
    konten: 'Diberitahukan kepada seluruh warga Desa Tinggarjaya yang memiliki balita usia 0 - 59 bulan, wajib membawa anaknya ke Posyandu terdekat untuk mendapatkan tetes imunisasi polio tambahan pada hari Kamis, 25 Juni 2026 mulai pukul 08.00 WIB. Harap membawa buku KIA/KMS.',
    kategori: 'Penting',
    oleh: 'Bidan Desa & Kasi Kesejahteraan'
  },
  {
    id: '2',
    judul: 'Kerja Bakti Massal Pembersihan Saluran Air Menghadapi Musim Hujan',
    tanggal: '2026-06-19',
    konten: 'Dalam rangka menjaga kebersihan lingkungan dan mengantisipasi genangan air, seluruh Ketua RT (RT 01 - RT 48) diinstruksikan menggerakkan warganya untuk melakukan kerja bakti membersihkan selokan, rumput liar, dan gorong-gorong di lingkungan masing-masing pada hari Minggu, 28 Juni 2026.',
    kategori: 'Kegiatan',
    oleh: 'Kepala Desa Tinggarjaya'
  },
  {
    id: '3',
    judul: 'Pembaruan Data Penerima Bantuan Sosial Kemensos RI',
    tanggal: '2026-06-15',
    konten: 'Bagi warga yang ingin mengajukan usulan baru DTKS (Data Terpadu Kesejahteraan Sosial) atau memperbaiki data kartu bantuan sosial yang tidak aktif, silakan mengumpulkan fotokopi KTP, KK, dan foto kondisi rumah ke loket pelayanan balai desa paling lambat tanggal 30 Juni 2026.',
    kategori: 'Pelayanan',
    oleh: 'Kasi Kesejahteraan'
  },
  {
    id: '4',
    judul: 'Informasi Pendaftaran Beasiswa Pendidikan Anak Berprestasi Tingkat Desa',
    tanggal: '2026-06-12',
    konten: 'Pemerintah desa membuka pendaftaran beasiswa stimulan bagi siswa SD, SMP, dan SMA berprestasi dari keluarga kurang mampu yang berdomisili di Tinggarjaya. Formulir pendaftaran dapat diambil di ruang staf pelayanan umum pada jam kerja.',
    kategori: 'Informasi Umum',
    oleh: 'Kaur Umum & Perencanaan'
  }
];

export const AGENDA_KEGIATAN: AgendaKegiatan[] = [
  {
    id: '1',
    nama: 'Musyawarah Rencana Pembangunan Desa (Musrenbangdes) APBDes Tahun Anggaran 2027',
    tanggal: 'Kamis, 25 Juni 2026',
    waktu: '09.00 WIB - Selesai',
    lokasi: 'Aula Pertemuan Utama Balai Desa Tinggarjaya',
    keterangan: 'Membahas prioritas usulan pembangunan fisik, pemberdayaan ekonomi masyarakat, dan pelayanan publik yang akan didanai pada tahun anggaran berikutnya. Mengundang perwakilan RT, RW, tokoh masyarakat, PKK, BPD, dan organisasi kepemudaan.',
    penyelenggara: 'Pemerintah Desa & BPD'
  },
  {
    id: '2',
    nama: 'Pemberian Makanan Tambahan (PMT) Pencegahan Stunting Serentak',
    tanggal: 'Selasa, 30 Juni 2026',
    waktu: '08.00 - 11.30 WIB',
    lokasi: 'Balai Kesehatan Desa & Posyandu Dusun I - V',
    keterangan: 'Penyaluran telur, susu, bubur kacang hijau, biskuit gizi, dan buah segar kepada balita kurang gizi, ibu hamil KEK (Kekurangan Energi Kronis) se-Desa Tinggarjaya sekaligus edukasi gizi piring makan sehat oleh dokter puskesmas.',
    penyelenggara: 'Kader PKK & Kader Kesehatan Desa'
  },
  {
    id: '3',
    nama: 'Pelatihan Pemasaran Digital bagi Pelaku UMKM Lokal Tinggarjaya',
    tanggal: 'Sabtu, 4 Juli 2026',
    waktu: '13.00 - 16.00 WIB',
    lokasi: 'Laboratorium Komputer SD Negeri 1 Tinggarjaya',
    keterangan: 'Pelatihan praktis cara membuat toko online, mendaftarkan usaha ke Google Maps, berjualan lewat media sosial (Instagram & TikTok), serta pengemasan produk yang menarik demi memperluas pangsa pasar UMKM desa.',
    penyelenggara: 'Kaur Umum & Karang Taruna'
  },
  {
    id: '4',
    nama: 'Senam Sehat Lansia dan Cek Kesehatan Gratis',
    tanggal: 'Minggu, 12 Juli 2026',
    waktu: '06.00 - 09.00 WIB',
    lokasi: 'Halaman Kantor Balai Desa Tinggarjaya',
    keterangan: 'Rangkaian senam bugar lansia dilanjutkan pemeriksaan tekanan darah, kadar gula darah sewaktu, kolesterol, serta konsultasi obat gratis dengan dokter spesialis dari RSUD Cilacap.',
    penyelenggara: 'Pemerintah Desa & Puskesmas Sidareja'
  }
];

export const POTENSI_DESA: PotensiDesa[] = [
  {
    id: '1',
    judul: 'Lahan Pertanian Padi Organik Unggulan',
    deskripsi: 'Desa Tinggarjaya dianugerahi area persawahan irigasi teknis seluas 280 hektar yang memproduksi padi varietas unggul seperti Ciherang dan Inpari. Beberapa kelompok tani kini sukses mengekspor beras organik bersertifikat dengan cita rasa pulen alami.',
    gambar: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=600',
    kategori: 'Pertanian'
  },
  {
    id: '2',
    judul: 'Sentra UMKM Keripik Tempe & Olahan Singkong',
    deskripsi: 'Lebih dari 40 ibu rumah tangga memproduksi keripik tempe renyah Cilacapan dan lanting singkong aneka rasa. Produk kemasan lokal ini telah menembus pasar ritel modern di Kabupaten Cilacap, Purwokerto, hingga Jabodetabek.',
    gambar: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
    kategori: 'UMKM'
  },
  {
    id: '3',
    judul: 'Pemberdayaan Masyarakat Melalui Posyandu Terintegrasi',
    deskripsi: 'Kegiatan gotong-royong masyarakat yang aktif tecermin dari berjalannya 5 Posyandu Balita dan Posbindu Lansia secara konsisten. Kader kesehatan menggalang iuran dana jimpitan ronda malam untuk jaminan sosial kesehatan darurat.',
    gambar: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=600',
    kategori: 'Kegiatan Masyarakat'
  },
  {
    id: '4',
    judul: 'Pendidikan Karakter Sejak Dini',
    deskripsi: 'Tersedia 3 PAUD/TK, 4 SD Negeri, dan pondok pesantren lokal yang memberikan jaminan pendidikan karakter, literasi teknologi dasar, dan pemahaman agama yang damai bagi seluruh anak-anak generasi penerus Tinggarjaya.',
    gambar: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600',
    kategori: 'Pendidikan'
  },
  {
    id: '5',
    judul: 'Pelestarian Seni Ebeg & Karawitan Cilacapan',
    deskripsi: 'Kesenian kuda lumping tradisional (Ebeg) dan grup karawitan ibu-ibu PKK aktif berlatih di sangkar seni desa. Tradisi sedekah bumi tahunan juga konsisten digelar sebagai wujud syukur atas hasil bumi berlimpah.',
    gambar: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600',
    kategori: 'Budaya & Tradisi'
  },
  {
    id: '6',
    judul: 'Pembangunan Drainase Beton Bebas Genangan',
    deskripsi: 'Melalui sinergi dana desa, pembangunan drainase keliling pemukiman sepanjang 1.200 meter telah mereduksi titik rawan banjir hingga 95%. Tata ruang jalan desa dipercantik dengan plang nama jalan beraksara Jawa.',
    gambar: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600',
    kategori: 'Pembangunan'
  }
];

export const GALERI_DESA: GaleriFoto[] = [
  {
    id: '1',
    judul: 'Rapat Koordinasi Mingguan Perangkat Desa',
    kategori: 'Pemerintahan',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Evaluasi program bulanan dipimpin langsung oleh Kepala Desa Sartono di ruang kerja.'
  },
  {
    id: '2',
    judul: 'Pembangunan Jembatan Dusun IV',
    kategori: 'Pembangunan',
    url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Pengecoran pondasi jembatan penghubung ekonomi antar dusun dibantu swadaya tenaga warga.'
  },
  {
    id: '3',
    judul: 'Kegiatan Posyandu Melati 3 Dusun II',
    kategori: 'Pelayanan',
    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Penimbangan rutin balita, pemantauan kurva tumbuh kembang, dan pemberian vaksin.'
  },
  {
    id: '4',
    judul: 'Lomba Tumpeng Kreasi Ibu-Ibu PKK',
    kategori: 'PKK',
    url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Semarak HUT RI ke-80, ibu PKK menyajikan tumpeng gizi seimbang berbahan sayur organik.'
  },
  {
    id: '5',
    judul: 'Kerja Bakti Pemuda Karang Taruna',
    kategori: 'Pemuda',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Pengecatan lapangan voli dusun dan pemasangan lampu sorot malam hari oleh para pemuda.'
  },
  {
    id: '6',
    judul: 'Penyaluran Bantuan Sembako Dampak Kekeringan',
    kategori: 'Masyarakat',
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Solidaritas gotong royong membagikan sembako aman pangan bagi keluarga buruh tani serabutan.'
  },
  {
    id: '7',
    judul: 'Pelayanan Perekaman KTP Keliling Dukcapil',
    kategori: 'Pelayanan',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Layanan jemput bola Dinas Kependudukan Kabupaten Cilacap di balai desa Tinggarjaya.'
  },
  {
    id: '8',
    judul: 'Penyuluhan Manajemen Keuangan BUMDes',
    kategori: 'Pemerintahan',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
    deskripsi: 'Sosialisasi pengawasan modal usaha BUMDes dari auditor internal Inspektorat Cilacap.'
  }
];

export const TRANSPARANSI_2026: TransparansiAnggaran = {
  tahun: '2026',
  totalPendapatan: 1825450000,
  totalBelanja: 1795800000,
  totalPembiayaan: 29650000,
  pendapatan: [
    { kategori: 'Dana Desa (APBN)', nominal: 985600000, persentase: 54 },
    { kategori: 'Alokasi Dana Desa (ADD - Kabupaten)', nominal: 580250000, persentase: 31.8 },
    { kategori: 'Pendapatan Asli Desa (PADes - Sewa & BUMDes)', nominal: 145800000, persentase: 8 },
    { kategori: 'Bagi Hasil Pajak & Retribusi Daerah', nominal: 74200000, persentase: 4 },
    { kategori: 'Bantuan Provinsi (Banprov Jawa Tengah)', nominal: 39600000, persentase: 2.2 }
  ],
  belanja: [
    { kategori: 'Penyelenggaraan Pemerintahan (Gaji Perangkat & Operasional)', nominal: 538740000, persentase: 30 },
    { kategori: 'Pelaksanaan Pembangunan Fisik (Jalan, Irigasi, Jembatan)', nominal: 754232000, persentase: 42 },
    { kategori: 'Pembinaan Kemasyarakatan (Kegiatan Keagamaan & Adat)', nominal: 143662000, persentase: 8 },
    { kategori: 'Pemberdayaan Masyarakat (Pelatihan Pertanian & UMKM)', nominal: 215496000, persentase: 12 },
    { kategori: 'Penanggulangan Bencana & Mendesak (BLT-DD & Bantuan Sosial)', nominal: 143670000, persentase: 8 }
  ]
};

export const KONTAK_DESA = {
  namaInstansi: 'Pemerintah Desa Tinggarjaya',
  alamat: 'Jl. Raya Tinggarjaya No. 12, Desa Tinggarjaya, Kecamatan Sidareja, Kabupaten Cilacap, Jawa Tengah 53261',
  email: 'pemdes@tinggarjaya-sidareja.desa.id',
  whatsapp: '+6281234567890',
  telepon: '(0282) 567890',
  jamKerja: 'Senin - Kamis: 07.30 - 14.30 WIB | Jumat: 07.30 - 11.30 WIB',
  socialMedia: {
    facebook: 'https://facebook.com/pemdestinggarjaya',
    instagram: 'https://instagram.com/pemdestinggarjaya',
    youtube: 'https://youtube.com/@pemdestinggarjaya',
    twitter: 'https://twitter.com/tinggarjayadesa'
  }
};
