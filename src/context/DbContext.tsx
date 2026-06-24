import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { 
  PROFIL_DESA, 
  PERANGKAT_DESA, 
  LAYANAN_DESA, 
  BERITA_DESA, 
  PENGUMUMAN_DESA, 
  AGENDA_KEGIATAN, 
  POTENSI_DESA, 
  GALERI_DESA, 
  TRANSPARANSI_2026, 
  KONTAK_DESA 
} from '../data';
import { 
  PerangkatDesa, 
  LayananDesa, 
  BeritaDesa, 
  PengumumanDesa, 
  AgendaKegiatan, 
  PotensiDesa, 
  GaleriFoto, 
  TransparansiAnggaran 
} from '../types';

interface DbContextType {
  profilDesa: typeof PROFIL_DESA;
  perangkatDesa: PerangkatDesa[];
  layananDesa: LayananDesa[];
  beritaDesa: BeritaDesa[];
  pengumumanDesa: PengumumanDesa[];
  agendaKegiatan: AgendaKegiatan[];
  potensiDesa: PotensiDesa[];
  galeriDesa: GaleriFoto[];
  transparansiAnggaran: TransparansiAnggaran;
  kontakDesa: typeof KONTAK_DESA;
  
  // Authentication state
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // CRUD Profil Desa
  updateProfilDesa: (data: typeof PROFIL_DESA) => void;

  // CRUD Perangkat Desa
  addPerangkatDesa: (item: Omit<PerangkatDesa, 'id'>) => void;
  updatePerangkatDesa: (id: string, item: Partial<PerangkatDesa>) => void;
  deletePerangkatDesa: (id: string) => void;

  // CRUD Layanan Desa
  addLayananDesa: (item: Omit<LayananDesa, 'id'>) => void;
  updateLayananDesa: (id: string, item: Partial<LayananDesa>) => void;
  deleteLayananDesa: (id: string) => void;

  // CRUD Berita Desa
  addBeritaDesa: (item: Omit<BeritaDesa, 'id' | 'slug'>) => void;
  updateBeritaDesa: (id: string, item: Partial<BeritaDesa>) => void;
  deleteBeritaDesa: (id: string) => void;

  // CRUD Pengumuman Desa
  addPengumumanDesa: (item: Omit<PengumumanDesa, 'id'>) => void;
  updatePengumumanDesa: (id: string, item: Partial<PengumumanDesa>) => void;
  deletePengumumanDesa: (id: string) => void;

  // CRUD Agenda Kegiatan
  addAgendaKegiatan: (item: Omit<AgendaKegiatan, 'id'>) => void;
  updateAgendaKegiatan: (id: string, item: Partial<AgendaKegiatan>) => void;
  deleteAgendaKegiatan: (id: string) => void;

  // CRUD Potensi Desa
  addPotensiDesa: (item: Omit<PotensiDesa, 'id'>) => void;
  updatePotensiDesa: (id: string, item: Partial<PotensiDesa>) => void;
  deletePotensiDesa: (id: string) => void;

  // CRUD Galeri
  addGaleriFoto: (item: Omit<GaleriFoto, 'id'>) => void;
  updateGaleriFoto: (id: string, item: Partial<GaleriFoto>) => void;
  deleteGaleriFoto: (id: string) => void;

  // CRUD Transparansi
  updateTransparansiAnggaran: (item: TransparansiAnggaran) => void;

  // CRUD Kontak
  updateKontakDesa: (item: typeof KONTAK_DESA) => void;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export const DbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profilDesa, setProfilDesa] = useState<typeof PROFIL_DESA>(PROFIL_DESA);
  const [perangkatDesa, setPerangkatDesa] = useState<PerangkatDesa[]>([]);
  const [layananDesa, setLayananDesa] = useState<LayananDesa[]>([]);
  const [beritaDesa, setBeritaDesa] = useState<BeritaDesa[]>([]);
  const [pengumumanDesa, setPengumumanDesa] = useState<PengumumanDesa[]>([]);
  const [agendaKegiatan, setAgendaKegiatan] = useState<AgendaKegiatan[]>([]);
  const [potensiDesa, setPotensiDesa] = useState<PotensiDesa[]>([]);
  const [galeriDesa, setGaleriDesa] = useState<GaleriFoto[]>([]);
  const [transparansiAnggaran, setTransparansiAnggaran] = useState<TransparansiAnggaran>(TRANSPARANSI_2026);
  const [kontakDesa, setKontakDesa] = useState<typeof KONTAK_DESA>(KONTAK_DESA);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Helper to save to local storage
  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const seedDatabase = async () => {
    try {
      console.log("Seeding database to Firestore...");
      // 1. Configs
      await setDoc(doc(db, 'configs', 'profilDesa'), PROFIL_DESA);
      await setDoc(doc(db, 'configs', 'transparansi'), TRANSPARANSI_2026);
      await setDoc(doc(db, 'configs', 'kontak'), KONTAK_DESA);

      // Helper to seed a list of items to a collection
      const seedCollection = async <T extends { id: string }>(colName: string, items: T[]) => {
        for (const item of items) {
          const { id, ...data } = item;
          await setDoc(doc(db, colName, id), data);
        }
      };

      await seedCollection('perangkatDesa', PERANGKAT_DESA);
      await seedCollection('layananDesa', LAYANAN_DESA);
      await seedCollection('beritaDesa', BERITA_DESA);
      await seedCollection('pengumumanDesa', PENGUMUMAN_DESA);
      await seedCollection('agendaKegiatan', AGENDA_KEGIATAN);
      await seedCollection('potensiDesa', POTENSI_DESA);
      await seedCollection('galeriDesa', GALERI_DESA);

      console.log("Database successfully seeded to Firestore!");
      
      // Update UI state with the seeded values
      setProfilDesa(PROFIL_DESA);
      setPerangkatDesa(PERANGKAT_DESA);
      setLayananDesa(LAYANAN_DESA);
      setBeritaDesa(BERITA_DESA);
      setPengumumanDesa(PENGUMUMAN_DESA);
      setAgendaKegiatan(AGENDA_KEGIATAN);
      setPotensiDesa(POTENSI_DESA);
      setGaleriDesa(GALERI_DESA);
      setTransparansiAnggaran(TRANSPARANSI_2026);
      setKontakDesa(KONTAK_DESA);
    } catch (err) {
      console.error("Error seeding Firestore database:", err);
    }
  };

  // Initialize and load data from Firestore, fallback to localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const profilRef = doc(db, 'configs', 'profilDesa');
        const profilSnap = await getDoc(profilRef);

        if (!profilSnap.exists()) {
          // If Firestore is empty, seed the database
          await seedDatabase();
          return;
        }

        // Firestore has data, let's load it
        setProfilDesa(profilSnap.data() as typeof PROFIL_DESA);

        const transparansiSnap = await getDoc(doc(db, 'configs', 'transparansi'));
        if (transparansiSnap.exists()) {
          setTransparansiAnggaran(transparansiSnap.data() as TransparansiAnggaran);
        }

        const kontakSnap = await getDoc(doc(db, 'configs', 'kontak'));
        if (kontakSnap.exists()) {
          setKontakDesa(kontakSnap.data() as typeof KONTAK_DESA);
        }

        // Load collection data
        const loadCollection = async <T,>(colName: string, setter: React.Dispatch<React.SetStateAction<T[]>>) => {
          const snap = await getDocs(collection(db, colName));
          const items: T[] = [];
          snap.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as unknown as T);
          });
          setter(items);
        };

        await Promise.all([
          loadCollection<PerangkatDesa>('perangkatDesa', setPerangkatDesa),
          loadCollection<LayananDesa>('layananDesa', setLayananDesa),
          loadCollection<BeritaDesa>('beritaDesa', setBeritaDesa),
          loadCollection<PengumumanDesa>('pengumumanDesa', setPengumumanDesa),
          loadCollection<AgendaKegiatan>('agendaKegiatan', setAgendaKegiatan),
          loadCollection<PotensiDesa>('potensiDesa', setPotensiDesa),
          loadCollection<GaleriFoto>('galeriDesa', setGaleriDesa),
        ]);

      } catch (err) {
        console.error("Error loading data from Firestore, falling back to localStorage/defaults:", err);
        // Fallback to local storage or defaults if firebase fails or is offline
        loadFromLocalStorage();
      }
    };

    const loadFromLocalStorage = () => {
      const isSeeded = localStorage.getItem('tinggarjaya_seeded') === 'true';
      if (!isSeeded) {
        localStorage.setItem('tinggarjaya_profil', JSON.stringify(PROFIL_DESA));
        localStorage.setItem('tinggarjaya_perangkat', JSON.stringify(PERANGKAT_DESA));
        localStorage.setItem('tinggarjaya_layanan', JSON.stringify(LAYANAN_DESA));
        localStorage.setItem('tinggarjaya_berita', JSON.stringify(BERITA_DESA));
        localStorage.setItem('tinggarjaya_pengumuman', JSON.stringify(PENGUMUMAN_DESA));
        localStorage.setItem('tinggarjaya_agenda', JSON.stringify(AGENDA_KEGIATAN));
        localStorage.setItem('tinggarjaya_potensi', JSON.stringify(POTENSI_DESA));
        localStorage.setItem('tinggarjaya_galeri', JSON.stringify(GALERI_DESA));
        localStorage.setItem('tinggarjaya_transparansi', JSON.stringify(TRANSPARANSI_2026));
        localStorage.setItem('tinggarjaya_kontak', JSON.stringify(KONTAK_DESA));
        localStorage.setItem('tinggarjaya_seeded', 'true');
      }

      setProfilDesa(JSON.parse(localStorage.getItem('tinggarjaya_profil') || JSON.stringify(PROFIL_DESA)));
      setPerangkatDesa(JSON.parse(localStorage.getItem('tinggarjaya_perangkat') || JSON.stringify(PERANGKAT_DESA)));
      setLayananDesa(JSON.parse(localStorage.getItem('tinggarjaya_layanan') || JSON.stringify(LAYANAN_DESA)));
      setBeritaDesa(JSON.parse(localStorage.getItem('tinggarjaya_berita') || JSON.stringify(BERITA_DESA)));
      setPengumumanDesa(JSON.parse(localStorage.getItem('tinggarjaya_pengumuman') || JSON.stringify(PENGUMUMAN_DESA)));
      setAgendaKegiatan(JSON.parse(localStorage.getItem('tinggarjaya_agenda') || JSON.stringify(AGENDA_KEGIATAN)));
      setPotensiDesa(JSON.parse(localStorage.getItem('tinggarjaya_potensi') || JSON.stringify(POTENSI_DESA)));
      setGaleriDesa(JSON.parse(localStorage.getItem('tinggarjaya_galeri') || JSON.stringify(GALERI_DESA)));
      setTransparansiAnggaran(JSON.parse(localStorage.getItem('tinggarjaya_transparansi') || JSON.stringify(TRANSPARANSI_2026)));
      setKontakDesa(JSON.parse(localStorage.getItem('tinggarjaya_kontak') || JSON.stringify(KONTAK_DESA)));
    };

    loadData();

    // Keep logged in if session exists
    const adminSession = localStorage.getItem('tinggarjaya_admin_auth') === 'true';
    setIsAdmin(adminSession);
  }, []);

  const loginAdmin = (password: string) => {
    // Standard secure pin/password for demo purposes
    if (password === 'admin123' || password === 'tinggarjaya2026') {
      localStorage.setItem('tinggarjaya_admin_auth', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    localStorage.removeItem('tinggarjaya_admin_auth');
    setIsAdmin(false);
  };

  // CRUD Profil Desa
  const updateProfilDesa = (data: typeof PROFIL_DESA) => {
    setProfilDesa(data);
    saveToStorage('tinggarjaya_profil', data);
    setDoc(doc(db, 'configs', 'profilDesa'), data).catch(err => console.error(err));
  };

  // CRUD Perangkat Desa
  const addPerangkatDesa = (item: Omit<PerangkatDesa, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: PerangkatDesa = { ...item, id };
    const updated = [...perangkatDesa, newItem];
    setPerangkatDesa(updated);
    saveToStorage('tinggarjaya_perangkat', updated);
    setDoc(doc(db, 'perangkatDesa', id), item).catch(err => console.error(err));
  };

  const updatePerangkatDesa = (id: string, item: Partial<PerangkatDesa>) => {
    const updated = perangkatDesa.map(x => x.id === id ? { ...x, ...item } : x);
    setPerangkatDesa(updated);
    saveToStorage('tinggarjaya_perangkat', updated);
    const { id: _, ...data } = item;
    setDoc(doc(db, 'perangkatDesa', id), data, { merge: true }).catch(err => console.error(err));
  };

  const deletePerangkatDesa = (id: string) => {
    const updated = perangkatDesa.filter(x => x.id !== id);
    setPerangkatDesa(updated);
    saveToStorage('tinggarjaya_perangkat', updated);
    deleteDoc(doc(db, 'perangkatDesa', id)).catch(err => console.error(err));
  };

  // CRUD Layanan Desa
  const addLayananDesa = (item: Omit<LayananDesa, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: LayananDesa = { ...item, id };
    const updated = [...layananDesa, newItem];
    setLayananDesa(updated);
    saveToStorage('tinggarjaya_layanan', updated);
    setDoc(doc(db, 'layananDesa', id), item).catch(err => console.error(err));
  };

  const updateLayananDesa = (id: string, item: Partial<LayananDesa>) => {
    const updated = layananDesa.map(x => x.id === id ? { ...x, ...item } : x);
    setLayananDesa(updated);
    saveToStorage('tinggarjaya_layanan', updated);
    const { id: _, ...data } = item;
    setDoc(doc(db, 'layananDesa', id), data, { merge: true }).catch(err => console.error(err));
  };

  const deleteLayananDesa = (id: string) => {
    const updated = layananDesa.filter(x => x.id !== id);
    setLayananDesa(updated);
    saveToStorage('tinggarjaya_layanan', updated);
    deleteDoc(doc(db, 'layananDesa', id)).catch(err => console.error(err));
  };

  // CRUD Berita Desa
  const addBeritaDesa = (item: Omit<BeritaDesa, 'id' | 'slug'>) => {
    const slug = item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: BeritaDesa = { ...item, id, slug };
    const updated = [newItem, ...beritaDesa];
    setBeritaDesa(updated);
    saveToStorage('tinggarjaya_berita', updated);
    setDoc(doc(db, 'beritaDesa', id), { ...item, slug }).catch(err => console.error(err));
  };

  const updateBeritaDesa = (id: string, item: Partial<BeritaDesa>) => {
    const updated = beritaDesa.map(x => {
      if (x.id === id) {
        const merged = { ...x, ...item };
        if (item.judul) {
          merged.slug = item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }
        return merged;
      }
      return x;
    });
    setBeritaDesa(updated);
    saveToStorage('tinggarjaya_berita', updated);
    const { id: _, ...data } = item;
    if (item.judul) {
      data.slug = item.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    setDoc(doc(db, 'beritaDesa', id), data, { merge: true }).catch(err => console.error(err));
  };

  const deleteBeritaDesa = (id: string) => {
    const updated = beritaDesa.filter(x => x.id !== id);
    setBeritaDesa(updated);
    saveToStorage('tinggarjaya_berita', updated);
    deleteDoc(doc(db, 'beritaDesa', id)).catch(err => console.error(err));
  };

  // CRUD Pengumuman Desa
  const addPengumumanDesa = (item: Omit<PengumumanDesa, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: PengumumanDesa = { ...item, id };
    const updated = [newItem, ...pengumumanDesa];
    setPengumumanDesa(updated);
    saveToStorage('tinggarjaya_pengumuman', updated);
    setDoc(doc(db, 'pengumumanDesa', id), item).catch(err => console.error(err));
  };

  const updatePengumumanDesa = (id: string, item: Partial<PengumumanDesa>) => {
    const updated = pengumumanDesa.map(x => x.id === id ? { ...x, ...item } : x);
    setPengumumanDesa(updated);
    saveToStorage('tinggarjaya_pengumuman', updated);
    const { id: _, ...data } = item;
    setDoc(doc(db, 'pengumumanDesa', id), data, { merge: true }).catch(err => console.error(err));
  };

  const deletePengumumanDesa = (id: string) => {
    const updated = pengumumanDesa.filter(x => x.id !== id);
    setPengumumanDesa(updated);
    saveToStorage('tinggarjaya_pengumuman', updated);
    deleteDoc(doc(db, 'pengumumanDesa', id)).catch(err => console.error(err));
  };

  // CRUD Agenda Kegiatan
  const addAgendaKegiatan = (item: Omit<AgendaKegiatan, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: AgendaKegiatan = { ...item, id };
    const updated = [...agendaKegiatan, newItem];
    setAgendaKegiatan(updated);
    saveToStorage('tinggarjaya_agenda', updated);
    setDoc(doc(db, 'agendaKegiatan', id), item).catch(err => console.error(err));
  };

  const updateAgendaKegiatan = (id: string, item: Partial<AgendaKegiatan>) => {
    const updated = agendaKegiatan.map(x => x.id === id ? { ...x, ...item } : x);
    setAgendaKegiatan(updated);
    saveToStorage('tinggarjaya_agenda', updated);
    const { id: _, ...data } = item;
    setDoc(doc(db, 'agendaKegiatan', id), data, { merge: true }).catch(err => console.error(err));
  };

  const deleteAgendaKegiatan = (id: string) => {
    const updated = agendaKegiatan.filter(x => x.id !== id);
    setAgendaKegiatan(updated);
    saveToStorage('tinggarjaya_agenda', updated);
    deleteDoc(doc(db, 'agendaKegiatan', id)).catch(err => console.error(err));
  };

  // CRUD Potensi Desa
  const addPotensiDesa = (item: Omit<PotensiDesa, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: PotensiDesa = { ...item, id };
    const updated = [...potensiDesa, newItem];
    setPotensiDesa(updated);
    saveToStorage('tinggarjaya_potensi', updated);
    setDoc(doc(db, 'potensiDesa', id), item).catch(err => console.error(err));
  };

  const updatePotensiDesa = (id: string, item: Partial<PotensiDesa>) => {
    const updated = potensiDesa.map(x => x.id === id ? { ...x, ...item } : x);
    setPotensiDesa(updated);
    saveToStorage('tinggarjaya_potensi', updated);
    const { id: _, ...data } = item;
    setDoc(doc(db, 'potensiDesa', id), data, { merge: true }).catch(err => console.error(err));
  };

  const deletePotensiDesa = (id: string) => {
    const updated = potensiDesa.filter(x => x.id !== id);
    setPotensiDesa(updated);
    saveToStorage('tinggarjaya_potensi', updated);
    deleteDoc(doc(db, 'potensiDesa', id)).catch(err => console.error(err));
  };

  // CRUD Galeri
  const addGaleriFoto = (item: Omit<GaleriFoto, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newItem: GaleriFoto = { ...item, id };
    const updated = [newItem, ...galeriDesa];
    setGaleriDesa(updated);
    saveToStorage('tinggarjaya_galeri', updated);
    setDoc(doc(db, 'galeriDesa', id), item).catch(err => console.error(err));
  };

  const updateGaleriFoto = (id: string, item: Partial<GaleriFoto>) => {
    const updated = galeriDesa.map(x => x.id === id ? { ...x, ...item } : x);
    setGaleriDesa(updated);
    saveToStorage('tinggarjaya_galeri', updated);
    const { id: _, ...data } = item;
    setDoc(doc(db, 'galeriDesa', id), data, { merge: true }).catch(err => console.error(err));
  };

  const deleteGaleriFoto = (id: string) => {
    const updated = galeriDesa.filter(x => x.id !== id);
    setGaleriDesa(updated);
    saveToStorage('tinggarjaya_galeri', updated);
    deleteDoc(doc(db, 'galeriDesa', id)).catch(err => console.error(err));
  };

  // CRUD Transparansi
  const updateTransparansiAnggaran = (item: TransparansiAnggaran) => {
    setTransparansiAnggaran(item);
    saveToStorage('tinggarjaya_transparansi', item);
    setDoc(doc(db, 'configs', 'transparansi'), item).catch(err => console.error(err));
  };

  // CRUD Kontak
  const updateKontakDesa = (item: typeof KONTAK_DESA) => {
    setKontakDesa(item);
    saveToStorage('tinggarjaya_kontak', item);
    setDoc(doc(db, 'configs', 'kontak'), item).catch(err => console.error(err));
  };

  return (
    <DbContext.Provider value={{
      profilDesa,
      perangkatDesa,
      layananDesa,
      beritaDesa,
      pengumumanDesa,
      agendaKegiatan,
      potensiDesa,
      galeriDesa,
      transparansiAnggaran,
      kontakDesa,
      isAdmin,
      loginAdmin,
      logoutAdmin,
      updateProfilDesa,
      addPerangkatDesa,
      updatePerangkatDesa,
      deletePerangkatDesa,
      addLayananDesa,
      updateLayananDesa,
      deleteLayananDesa,
      addBeritaDesa,
      updateBeritaDesa,
      deleteBeritaDesa,
      addPengumumanDesa,
      updatePengumumanDesa,
      deletePengumumanDesa,
      addAgendaKegiatan,
      updateAgendaKegiatan,
      deleteAgendaKegiatan,
      addPotensiDesa,
      updatePotensiDesa,
      deletePotensiDesa,
      addGaleriFoto,
      updateGaleriFoto,
      deleteGaleriFoto,
      updateTransparansiAnggaran,
      updateKontakDesa
    }}>
      {children}
    </DbContext.Provider>
  );
};

export const useDb = () => {
  const context = useContext(DbContext);
  if (!context) {
    throw new Error('useDb must be used within a DbProvider');
  }
  return context;
};
