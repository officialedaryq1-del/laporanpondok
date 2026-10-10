import React, { useState, useEffect, useMemo, Component } from 'react';

// ============================================================================
// KOMPONEN IKON NATIVE SVG (Mencegah Blank Screen & Ketergantungan Eksternal)
// ============================================================================
const createIcon = (d: React.ReactNode) => ({ className = 'w-4 h-4', ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {d}
  </svg>
);

const LayoutDashboard = createIcon(<><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></>);
const ClipboardCheck = createIcon(<><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></>);
const FileSpreadsheet = createIcon(<><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></>);
const RotateCw = createIcon(<><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></>);
const Award = createIcon(<><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>);
const UserCheck = createIcon(<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></>);
const GraduationCap = createIcon(<><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></>);
const BookOpen = createIcon(<><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>);
const FileText = createIcon(<><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></>);
const CheckCircle2 = createIcon(<><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>);
const Pin = createIcon(<><line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></>);
const PinOff = createIcon(<><line x1="2" x2="22" y1="2" y2="22"/><line x1="12" x2="12" y1="17" y2="22"/><path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17h12"/><path d="M15 9.34V6h1a2 2 0 0 0 0-4H7.89"/></>);
const History = createIcon(<><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></>);
const TrendingUp = createIcon(<><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>);
const AlertCircle = createIcon(<><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></>);
const Plus = createIcon(<><path d="M5 12h14"/><path d="M12 5v14"/></>);
const Trash2 = createIcon(<><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></>);
const Layers = createIcon(<><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.84Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></>);
const Save = createIcon(<><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></>);
const Eye = createIcon(<><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></>);
const X = createIcon(<><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>);
const Settings = createIcon(<><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>);
const Edit = createIcon(<><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>);
const Search = createIcon(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>); // <--- TEMPEL DI SINI
const Menu = createIcon(<><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>);


type TimeframeCategory = 'Harian' | 'Mingguan' | 'Bulanan' | 'Tahunan';
type NavigationTab = 'dashboard' | 'ceklis' | 'laporan' | 'rekap_absensi' | 'pengaturan' | 'monitoring_kebersihan' | 'pelanggaran';

interface Division {
  id: number;
  name: string;
  code: string;
  coordinator_name?: string;
}

interface Guru {
  id: string;
  nama_guru: string;
  nip?: string;
}

interface Mapel {
  id: string;
  kode_mapel?: string;
  nama_mapel: string;
  kategori?: string;
  kkm_7?: number;
  kkm_8?: number;
  kkm_9?: number;
}

interface WaliKelas {
  kelas: string;
  nama_guru: string;
  nip?: string;
  tahun_ajaran?: string;
}

interface Santri {
  id?: string;
  nis?: string;
  nama: string;
  kelas: string;
  halaqoh?: string;
}

interface NilaiSiswa {
  id: string;
  nama_ujian: string;
  bulan: string;
  nama_mapel: string;
  nama_guru: string;
  nis: string;
  nama_siswa: string;
  nilai: number | string;
  tahun: string;
}

interface PresensiRecord {
  id?: string | number;
  tanggal: string;
  kelas: string;
  nis: string;
  nama_siswa: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha';
  created_at?: string;
}

interface LaporanCatatan {
  id?: number;
  template_id: number;
  bulan: string;
  catatan: string;
}

interface IKUItem {
  id: number;
  division_id: number;
  kode_iku: string;
  title: string;
}

interface ChecklistTemplate {
  id: number;
  division_id: number;
  timeframe: string;
  title: string;
  target?: number;
  target_teks?: string;
  iku_id?: number | null;
  is_active?: boolean;
  pengawas_field_details?: Record<string, FieldDetail>;
  pengawas_config?: any; // <--- TAMBAHKAN BARIS INI
  target_format?: 'persentase' | 'count'; // Tambahkan baris ini
}

interface ChecklistSection {
  id: number;
  template_id: number;
  name: string;
  order_num: number;
}

interface ChecklistItem {
  id: number;
  section_id: number;
  item_text: string;
  input_type: string;
  options?: any;
  is_required?: boolean;
  order_num?: number;
  is_active?: boolean;
}

interface Submission {
  id: number;
  template_id: number;
  pj_name?: string;
  submission_date?: string;
  target_person?: string;
  target_subject?: string;
  target_class?: string;
  target_time_slot?: string;
  absent_students?: string | number | null;
  general_notes?: string;
  n_kebersihan?: number;
  n_kerapan?: number;
  n_kondusif?: number;
  rata_rata?: number;
  rate?: number;
  created_at?: string;
}

const SUPABASE_URL = 'https://uswyqskcrrhqxwebeakz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzd3lxc2tjcnJocXh3ZWJlYWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NjkzNzIsImV4cCI6MjEwNjI0NTM3Mn0.YiDGxufCcIuNfAMNwcyDjTfkokfynPg5r55glF1OgTk';

const reqHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};

const safeParseOptions = (rawOptions: any): string[] => {
  if (!rawOptions) return [];
  if (Array.isArray(rawOptions)) {
    return rawOptions.map(String).map(s => s.trim()).filter(Boolean);
  }
  return String(rawOptions).split(',').map(s => s.trim()).filter(Boolean);
};

const INITIAL_DIVISIONS: Division[] = [
  { id: 1, name: 'Kurikulum', code: 'KUR', coordinator_name: 'Ella Setyana, S.Pd.' },
  { id: 2, name: 'Kesiswaan', code: 'KES', coordinator_name: 'Siti Muslikhatul Nuryah, S.Pd.' },
  { id: 3, name: 'Humas', code: 'HUM', coordinator_name: 'Nur Malisa Qotrunada, S.Pd.' },
  { id: 4, name: 'Sarpras dan Bendahara', code: 'SAR', coordinator_name: 'Laila Mahfudloh Zain, S.Pd.' },
  { id: 5, name: 'Bahasa & Prestasi', code: 'BAH', coordinator_name: 'Ainun Putri Nurvitasari, S.Ag' },
  { id: 6, name: 'Tata Usaha', code: 'TU', coordinator_name: 'Dewi Setiyani, S.Pd' },
  { id: 7, name: 'Bidang Pendidikan', code: 'PND', coordinator_name: 'Ainun Putri Nurvitasari, S.Ag' },
  { id: 8, name: 'Bidang Keamanan', code: 'KMN', coordinator_name: 'Fathimah Az Zahra' },
  { id: 9, name: 'Bidang Jamiyyah', code: 'JAM', coordinator_name: 'Ummi Mukhoyyaroh, M.Pd.' },
  { id: 10, name: 'Murobbiyah', code: 'MRB', coordinator_name: 'Atik Mahmudatin, S.Pd.' },
  { id: 11, name: 'Bidang Kabersos', code: 'KBR', coordinator_name: 'Serly Anggraeni, S.Pd.' }
];

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary captured error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Terjadi Kesalahan Tampilan</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              {this.state.error?.message || 'Gagal memuat beberapa komponen antarmuka.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-blue-600/30"
            >
              Muat Ulang Aplikasi
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

 type InputType = 'dropdown' | 'text' | 'date';
  interface FieldDetail {
    label: string;
    type: InputType;
    options: string;
  }
  type ExtendedFieldConfig = Record<PengawasFieldKey, FieldDetail>;
  
  const DEFAULT_FIELD_DETAILS: ExtendedFieldConfig = {
    pj: { label: 'Petugas (PJ)', type: 'dropdown', options: '' },
    guru: { label: 'Ustadz', type: 'text', options: '' },
    mapel: { label: 'Tempat', type: 'text', options: '' },
    kelas: { label: 'Tanggal', type: 'date', options: '' }, // Type diubah jadi date
    jam: { label: 'Pengampu/Pemimpin', type: 'text', options: '' },
    absen: { label: 'Keterangan', type: 'text', options: '' }
  };
  
  type PengawasFieldKey = 'pj' | 'guru' | 'mapel' | 'kelas' | 'jam' | 'absen';
  type PengawasConfig = Record<PengawasFieldKey, boolean>;

  const DEFAULT_PENGAWAS_CONFIG: PengawasConfig = {
    pj: true,
    guru: true,
    mapel: true,
    kelas: true,
    jam: true,
    absen: true
  };

export default function App() {
  return (
    <ErrorBoundary>
      <MainAppContent />
    </ErrorBoundary>
  );
}

function MainAppContent() {
  const [navTab, setNavTab] = useState<NavigationTab>('dashboard');
  const [isSidebarPinned, setIsSidebarPinned] = useState<boolean>(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const [divisions, setDivisions] = useState<Division[]>(INITIAL_DIVISIONS);
  const [activeDivisionId, setActiveDivisionId] = useState<number>(1);
  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeCategory>('Harian');
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'input' | 'riwayat' | 'hasil' | 'customize'>('input');

  const [ikus, setIkus] = useState<IKUItem[]>([]);
  const [templates, setTemplates] = useState<ChecklistTemplate[]>([]);
  const [sections, setSections] = useState<ChecklistSection[]>([]);
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [, setMapelList] = useState<Mapel[]>([]);
  const [, setWaliKelasList] = useState<WaliKelas[]>([]);
  const [santriList, setSantriList] = useState<Santri[]>([]);

  // State khusus Catatan Laporan IKU per Kegiatan per Bulan
  const [laporanBulan, setLaporanBulan] = useState<string>('2026-09');
  const [laporanCatatanMap, setLaporanCatatanMap] = useState<Record<number, string>>({});
  const [modalCatatanTpl, setModalCatatanTpl] = useState<ChecklistTemplate | null>(null);
  const [inputCatatanTeks, setInputCatatanTeks] = useState<string>('');
  const [isSavingCatatan, setIsSavingCatatan] = useState<boolean>(false);

  // State untuk menyimpan konfigurasi custom field
 const [fieldDetailsMap, setFieldDetailsMap] = useState<Record<number, ExtendedFieldConfig>>({});
  
  // State untuk Modal Edit
  const [editFieldKey, setEditFieldKey] = useState<PengawasFieldKey | null>(null);
  const [editFieldForm, setEditFieldForm] = useState<FieldDetail>({ label: '', type: 'dropdown', options: '' });
  
  const currentFieldDetails: ExtendedFieldConfig = useMemo(() => {
    if (!selectedTemplateId) return DEFAULT_FIELD_DETAILS;
    return fieldDetailsMap[selectedTemplateId] || DEFAULT_FIELD_DETAILS;
  }, [selectedTemplateId, fieldDetailsMap]);

  // State modul Presensi Siswa
  const [presensiSiswaList, setPresensiSiswaList] = useState<PresensiRecord[]>([]);
  const [absensiSubTab, setAbsensiSubTab] = useState<'input' | 'harian' | 'detail' | 'rekap' | 'import'>('input');
  const [inputAbsensiKelas, setInputAbsensiKelas] = useState<string>('7-A');
  const [inputAbsensiTanggal, setInputAbsensiTanggal] = useState<string>(() => {
    return new Date().toISOString().slice(0, 10);
  });
  const [inputStatuses, setInputStatuses] = useState<Record<string, 'Hadir' | 'Sakit' | 'Izin' | 'Alpha'>>({});
  const [rekapKelas, setRekapKelas] = useState<string>('7-A');
  const [rekapBulan, setRekapBulan] = useState<string>('2026-09');
  const [importPreviewList, setImportPreviewList] = useState<PresensiRecord[]>([]);
  const [importProgress, setImportProgress] = useState<number>(0);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [isSavingAbsensi, setIsSavingAbsensi] = useState<boolean>(false);

  // State khusus E-Kebersihan
const [kebersihanSubTab, setKebersihanSubTab] = useState<'dashboard' | 'input' | 'riwayat' | 'rekap'>('dashboard');
const [kebersihanFilterMode, setKebersihanFilterMode] = useState<'hari_ini' | 'bulan' | 'rentang'>('hari_ini');
const [kebersihanBulan, setKebersihanBulan] = useState<string>(() => new Date().toISOString().slice(0, 7));
const [kebersihanStartDate, setKebersihanStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
const [kebersihanEndDate, setKebersihanEndDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
const [kamarList, setKamarList] = useState<Array<{nama_kamar: string; jenjang: string; wali_halaqoh: string}>>([]);
const [laporanKebersihanList, setLaporanKebersihanList] = useState<Array<any>>([]);

  // Logika otomatis mengatur tanggal berdasarkan mode filter
useEffect(() => {
  const today = new Date().toISOString().slice(0, 10);
  
  if (kebersihanFilterMode === 'hari_ini') {
    setKebersihanStartDate(today);
    setKebersihanEndDate(today);
  } else if (kebersihanFilterMode === 'bulan') {
    const [year, month] = kebersihanBulan.split('-');
    const firstDay = new Date(Number(year), Number(month) - 1, 1);
    const lastDay = new Date(Number(year), Number(month), 0);
    
    setKebersihanStartDate(`${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-01`);
    setKebersihanEndDate(`${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`);
  }
}, [kebersihanFilterMode, kebersihanBulan]);
  
  // State Khusus Filter Riwayat Kebersihan (Default 1 Minggu Terakhir)
const [riwayatStartDate, setRiwayatStartDate] = useState<string>(() => {
  const date = new Date();
  date.setDate(date.getDate() - 7); // Set 7 hari yang lalu
  return date.toISOString().slice(0, 10);
});
const [riwayatEndDate, setRiwayatEndDate] = useState<string>(() => {
  return new Date().toISOString().slice(0, 10); // Hari ini
});

  // Logika Filter Data Riwayat Kebersihan
const filteredRiwayatKebersihan = useMemo(() => {
  return laporanKebersihanList.filter(item => {
    const itemDate = new Date(item.tanggal);
    const start = riwayatStartDate ? new Date(riwayatStartDate) : null;
    const end = riwayatEndDate ? new Date(riwayatEndDate) : null;

    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });
}, [laporanKebersihanList, riwayatStartDate, riwayatEndDate]);
  
  // State untuk Filter & Sort Laporan Rekap
  const [rekapStartDate, setRekapStartDate] = useState<string>('');
  const [rekapEndDate, setRekapEndDate] = useState<string>('');
  const [rekapSort, setRekapSort] = useState<'kamar' | 'terbanyak'>('kamar');

  // State untuk Modal Riwayat Kotor di Rekap
  const [detailKamarModal, setDetailKamarModal] = useState<string | null>(null);
  
  // Data rekapitulasi kamar yang sudah diproses (Filter Rentang Waktu & Sortir)
  const processedRekapKamar = useMemo(() => {
    let filteredLaporan = laporanKebersihanList;

    // 1. Filter berdasarkan rentang waktu
    if (rekapStartDate || rekapEndDate) {
      filteredLaporan = filteredLaporan.filter(l => {
        const lDate = new Date(l.tanggal);
        const start = rekapStartDate ? new Date(rekapStartDate) : null;
        const end = rekapEndDate ? new Date(rekapEndDate) : null;
        if (start && lDate < start) return false;
        if (end && lDate > end) return false;
        return true;
      });
    }

    // 2. Gabungkan data dengan daftar kamar
    let mapped = kamarList.map(k => {
      const riwayat = filteredLaporan.filter(l => l.kamar === k.nama_kamar);
      return {
        ...k,
        totalKasus: riwayat.length,
        riwayatKasus: riwayat
      };
    });

    // 3. Sortir data
    if (rekapSort === 'terbanyak') {
      mapped.sort((a, b) => b.totalKasus - a.totalKasus);
    }

    return mapped;
  }, [kamarList, laporanKebersihanList, rekapStartDate, rekapEndDate, rekapSort]);
  
  
  // State untuk Edit Laporan Kebersihan
  const [isEditKebersihanModalOpen, setIsEditKebersihanModalOpen] = useState(false);
  const [editKebersihanId, setEditKebersihanId] = useState('');
  const [editKebersihanTgl, setEditKebersihanTgl] = useState('');
  const [editKebersihanKamar, setEditKebersihanKamar] = useState('');
  const [editKebersihanKeterangan, setEditKebersihanKeterangan] = useState('');
  
  // State form input kebersihan
  const [formKebersihanTgl, setFormKebersihanTgl] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [formKebersihanKamar, setFormKebersihanKamar] = useState<string>('');
  const [formKebersihanKeterangan, setFormKebersihanKeterangan] = useState<string>('');

  // --- STATE PELANGGARAN SANTRI ---
const [pelanggaranSubTab, setPelanggaranSubTab] = useState<'dashboard' | 'input' | 'laporan' | 'santri'>('dashboard');
const [laporanPelanggaranSubTab, setLaporanPelanggaranSubTab] = useState<'detail' | 'halaqoh' | 'santri'>('detail');
const [pelanggaranList, setPelanggaranList] = useState<any[]>([]);

  // Tambahkan state untuk filter Laporan Pelanggaran
const [filterPlgKataKunci, setFilterPlgKataKunci] = useState('');
//const [filterPlgJenjang, setFilterPlgJenjang] = useState('Semua Jenjang');
const [filterPlgKelas, setFilterPlgKelas] = useState('Semua Kelas');
const [filterPlgStatusSP, setFilterPlgStatusSP] = useState('Semua Status');
const [filterPlgMulai, setFilterPlgMulai] = useState('');
const [filterPlgSampai, setFilterPlgSampai] = useState('');

  // State Khusus Filter Dashboard Pelanggaran (Default Bulan Ini)
  const [dashPlgFilterMode, setDashPlgFilterMode] = useState<'bulan' | 'rentang'>('bulan');
  const [dashPlgBulanTahun, setDashPlgBulanTahun] = useState<string>(() => new Date().toISOString().slice(0, 7));

  const [dashPlgMulai, setDashPlgMulai] = useState<string>(() => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // Format YYYY-MM-DD menyesuaikan input date HTML
    const year = firstDay.getFullYear();
    const month = String(firstDay.getMonth() + 1).padStart(2, '0');
    const day = String(firstDay.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
});

const [dashPlgSampai, setDashPlgSampai] = useState<string>(() => {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0); // Angka 0 otomatis menunjuk ke hari terakhir bulan tersebut
    const year = lastDay.getFullYear();
    const month = String(lastDay.getMonth() + 1).padStart(2, '0');
    const day = String(lastDay.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
});

  // Logika otomatis mengatur tanggal berdasarkan mode filter pelanggaran
useEffect(() => {
  if (dashPlgFilterMode === 'bulan') {
    const [year, month] = dashPlgBulanTahun.split('-');
    const firstDay = new Date(Number(year), Number(month) - 1, 1);
    const lastDay = new Date(Number(year), Number(month), 0);
    
    setDashPlgMulai(`${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-01`);
    setDashPlgSampai(`${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`);
  }
}, [dashPlgFilterMode, dashPlgBulanTahun]);
  
// Logika Filter Data Dashboard
const filteredDashboardPelanggaran = useMemo(() => {
    return pelanggaranList.filter(p => {
        const pDate = new Date(p.tanggal);
        const matchMulai = !dashPlgMulai || pDate >= new Date(dashPlgMulai);
        const matchSampai = !dashPlgSampai || pDate <= new Date(dashPlgSampai);
        return matchMulai && matchSampai;
    });
}, [pelanggaranList, dashPlgMulai, dashPlgSampai]);

  // --- TAMBAHKAN KODE INI DI BAWAH filteredDashboardPelanggaran ---
const dashboardStatsPlg = useMemo(() => {
    const totalSantri = santriList.length;
    const totalKasus = filteredDashboardPelanggaran.length;
    const totalSPAktif = filteredDashboardPelanggaran.filter(p => p.sp && p.sp !== 'Tanpa SP').length;
    const totalSP3Terakhir = filteredDashboardPelanggaran.filter(p => p.sp === 'SP Terakhir' || p.sp === 'SP 3').length;
    const totalDikeluarkan = filteredDashboardPelanggaran.filter(p => p.sp === 'Dikeluarkan').length;

    const spColors: Record<string, string> = {
        'Tanpa SP': '#94a3b8', 'Surat Pernyataan': '#38bdf8', 'SP 1': '#fbbf24', 
        'SP 2': '#f97316', 'SP 3': '#ef4444', 'SP Terakhir': '#9f1239', 'Dikeluarkan': '#450a0a' 
    };
    const spCounts: Record<string, number> = {
        'Tanpa SP': 0, 'Surat Pernyataan': 0, 'SP 1': 0, 'SP 2': 0, 'SP 3': 0, 'SP Terakhir': 0, 'Dikeluarkan': 0
    };
    
    filteredDashboardPelanggaran.forEach(p => {
        if (spCounts[p.sp] !== undefined) spCounts[p.sp]++;
        else spCounts['Tanpa SP']++;
    });

    const totalSPForChart = totalKasus || 1; 
    let accumulatedPct = 0;
    const gradientStops = Object.entries(spCounts).map(([key, count]) => {
        const pct = (count / totalSPForChart) * 100;
        const start = accumulatedPct;
        accumulatedPct += pct;
        return `${spColors[key]} ${start}% ${accumulatedPct}%`;
    }).join(', ');
    
    const donutStyle = { background: `conic-gradient(${gradientStops})` };

    const halaqohStats: Record<string, number> = {};
    filteredDashboardPelanggaran.forEach(p => {
        const h = p.halaqoh || 'Lainnya';
        halaqohStats[h] = (halaqohStats[h] || 0) + 1;
    });
    const halaqohChartData = Object.entries(halaqohStats).map(([halaqoh, total]) => ({ halaqoh, total }));
    const maxHalaqohChart = Math.max(...halaqohChartData.map(d => d.total), 5);

    return {
        totalSantri, totalKasus, totalSPAktif, totalSP3Terakhir, totalDikeluarkan,
        donutStyle, spColors, halaqohChartData, maxHalaqohChart
    };
}, [filteredDashboardPelanggaran, santriList]);

  // State untuk Modal Klik Kartu Dashboard Pelanggaran
const [dashCardModal, setDashCardModal] = useState<{ title: string; subtitle: string; data: any[] } | null>(null);
const [searchDashCardModal, setSearchDashCardModal] = useState('');
  
  // State untuk Modal Detail Pelanggaran per Halaqoh
const [detailHalaqohModal, setDetailHalaqohModal] = useState<{ustadz: string, kamar: string, riwayat: any[]} | null>(null);
const [searchDetailHalaqoh, setSearchDetailHalaqoh] = useState('');
  
  // State untuk Modal Edit Pelanggaran
const [isEditPlgModalOpen, setIsEditPlgModalOpen] = useState(false);
const [editPlgId, setEditPlgId] = useState('');
const [editPlgTanggal, setEditPlgTanggal] = useState('');
const [editPlgBentuk, setEditPlgBentuk] = useState('');
const [editPlgSanksi, setEditPlgSanksi] = useState('');
const [editPlgSP, setEditPlgSP] = useState('');

/// State untuk Form Input Pelanggaran
const [selectedSantriPlgIds, setSelectedSantriPlgIds] = useState<string[]>([]);
const [formPlgTanggal, setFormPlgTanggal] = useState<string>(() => new Date().toISOString().slice(0, 10));
const [formPlgSP, setFormPlgSP] = useState<string>('Tanpa SP');
const [formPlgBentuk, setFormPlgBentuk] = useState<string>('');
const [formPlgSanksiChecked, setFormPlgSanksiChecked] = useState<string[]>([]);
const [formPlgSanksiCustom, setFormPlgSanksiCustom] = useState<string>('');
const [searchSantriPlg, setSearchSantriPlg] = useState<string>('');
const [spList, setSpList] = useState<any[]>([]); // Menyimpan opsi SP dinamis
  
  // State Lazy Loading untuk mempercepat Initial Load
  const [hasFetchedFullPresensi, setHasFetchedFullPresensi] = useState<boolean>(false);

  // State modal detail rombel rekap nilai
  const [selectedRombelDetail, setSelectedRombelDetail] = useState<{
    nama_guru: string;
    nama_mapel: string;
    kelas: string;
    kkm: number;
    scores: NilaiSiswa[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Detail Modal State untuk Riwayat Submisi
  const [selectedSubmissionForDetail, setSelectedSubmissionForDetail] = useState<Submission | null>(null);
  const [detailItemsLoading, setDetailItemsLoading] = useState<boolean>(false);
  const [submissionDetailList, setSubmissionDetailList] = useState<Array<{ id: number; item_id: number; answer_value: string; item_text?: string }>>([]);

  // Form input state
  const [formPetugas, setFormPetugas] = useState<string>('');
  const [formGuru, setFormGuru] = useState<string>('');
  const [formMapel, setFormMapel] = useState<string>('');
  const [formKelas, setFormKelas] = useState<string>('');
  const [formJam, setFormJam] = useState<string>('');
  const [formSiswaAbsen, setFormSiswaAbsen] = useState<string>('');
  const [formCatatan, setFormCatatan] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [formAnswers, setFormAnswers] = useState<Record<number, string>>({});

  // Customize state
  const [newSectionName, setNewSectionName] = useState<string>('');
  const [newItemText, setNewItemText] = useState<string>('');
  const [newItemSectionId, setNewItemSectionId] = useState<number | null>(null);
  const [newSectionType, setNewSectionType] = useState<'positif' | 'negatif'>('negatif');
  const [newItemInputType, setNewItemInputType] = useState<string>('checkbox');
  const [newItemOptions, setNewItemOptions] = useState<string>('');

  const [sectionTypeMap, setSectionTypeMap] = useState<Record<number, 'positif' | 'negatif'>>(() => {
    try {
      const saved = localStorage.getItem('section_types_config');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const updateSectionType = async (sectionId: number, type: 'positif' | 'negatif') => {
  // 1. Update State Lokal (UI)
  setSectionTypeMap(prev => {
    const updated = { ...prev, [sectionId]: type };
    try {
      localStorage.setItem('section_types_config', JSON.stringify(updated));
    } catch (e) {
      console.warn('Gagal menyimpan tipe kategori ke lokal:', e);
    }
    return updated;
  });

  // 2. Simpan Permanen ke Database Supabase
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/checklist_sections?id=eq.${sectionId}`, {
      method: 'PATCH',
      headers: reqHeaders,
      body: JSON.stringify({ section_type: type })
    });

    if (!res.ok) {
      console.error('Gagal menyimpan tipe kategori ke Supabase');
      showToast('Gagal menyinkronkan tipe kategori ke server', 'error');
    } else {
      showToast('Tipe indikator berhasil diubah dan disimpan!');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('Terjadi kesalahan koneksi saat menyimpan', 'error');
  }
};
  const [activeMasterTab, setActiveMasterTab] = useState<'divisi' | 'iku' | 'program'>('divisi');
  const [filterMasterDivisi, setFilterMasterDivisi] = useState<number | 'all'>('all');

  // Tambahkan di deretan deklarasi state (misal di bawah state terkait customize)
  const [targetFormat, setTargetFormat] = useState<'persentase' | 'count'>('persentase');
  
  // Modal State untuk Master Data
  const [masterModalType, setMasterModalType] = useState<'divisi' | 'iku' | 'program' | null>(null);
  const [editingMasterId, setEditingMasterId] = useState<number | null>(null);
  const [formDivisiData, setFormDivisiData] = useState({ name: '', code: '', coordinator_name: '' });
  const [formIKUData, setFormIKUData] = useState({ division_id: 1, kode_iku: '', title: '' });
  const [formProgramData, setFormProgramData] = useState({
    division_id: 1,
    iku_id: 0,
    title: '',
    timeframe: 'Harian',
    target: 100,
    target_teks: '100%'
  });


  const [pengawasConfigMap, setPengawasConfigMap] = useState<Record<number, PengawasConfig>>(() => {
    try {
      const saved = localStorage.getItem('pengawas_fields_config');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentPengawasConfig: PengawasConfig = useMemo(() => {
    if (!selectedTemplateId) return DEFAULT_PENGAWAS_CONFIG;
    return pengawasConfigMap[selectedTemplateId] || DEFAULT_PENGAWAS_CONFIG;
  }, [selectedTemplateId, pengawasConfigMap]);

  const hasAnyPengawasFieldActive = useMemo(() => {
    return Object.values(currentPengawasConfig).some(Boolean);
  }, [currentPengawasConfig]);

 const updateTargetFormat = async (templateId: number, newFormat: 'persentase' | 'count') => {
  // 1. Update state lokal
  setTargetFormat(newFormat); 
  
  // 2. UPDATE STATE TEMPLATES AGAR UI LANGSUNG BERUBAH (Tambahkan baris ini)
  setTemplates(prev => prev.map(t => t.id === templateId ? { ...t, target_format: newFormat } : t));

  // 3. Update data ke database Supabase
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/checklist_templates?id=eq.${templateId}`, {
      method: 'PATCH',
      headers: reqHeaders,
      body: JSON.stringify({ target_format: newFormat })
    });

    if (!res.ok) {
      console.error('Error updating target format');
      alert('Gagal menyimpan perubahan bentuk target realisasi.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
  
  const togglePengawasField = (templateId: number, fieldKey: PengawasFieldKey) => {
    setPengawasConfigMap(prev => {
      const current = prev[templateId] || { ...DEFAULT_PENGAWAS_CONFIG };
      const updatedConfig = {
        ...current,
        [fieldKey]: !current[fieldKey]
      };
      const updated = {
        ...prev,
        [templateId]: updatedConfig
      };
      try {
        localStorage.setItem('pengawas_fields_config', JSON.stringify(updated));
      } catch (e) {
        console.warn('Gagal menyimpan preferensi modul pengawas:', e);
      }
      savePengawasConfigToDB(templateId, updatedConfig);
      return updated;
    });
  };

  const setAllPengawasFields = (templateId: number, enabled: boolean) => {
    setPengawasConfigMap(prev => {
      const updatedConfig = {
        pj: enabled,
        guru: enabled,
        mapel: enabled,
        kelas: enabled,
        jam: enabled,
        absen: enabled
      };
      const updated = {
        ...prev,
        [templateId]: updatedConfig
      };
      try {
        localStorage.setItem('pengawas_fields_config', JSON.stringify(updated));
      } catch (e) {
        console.warn('Gagal menyimpan preferensi modul pengawas:', e);
      }
      savePengawasConfigToDB(templateId, updatedConfig);
      return updated;
    });
  };

  const savePengawasConfigToDB = async (templateId: number, config: PengawasConfig) => {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/checklist_templates?id=eq.${templateId}`, {
        method: 'PATCH',
        headers: reqHeaders,
        body: JSON.stringify({ pengawas_config: config })
      });
    } catch (err) {
      console.warn('Gagal menyimpan pengawas_config ke Supabase:', err);
    }
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveDivisi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDivisiData.name.trim()) return showToast('Nama divisi wajib diisi', 'error');

    try {
      if (editingMasterId) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/divisions?id=eq.${editingMasterId}`, {
          method: 'PATCH',
          headers: reqHeaders,
          body: JSON.stringify(formDivisiData)
        });
        if (res.ok) {
          const updated = await res.json();
          if (Array.isArray(updated) && updated[0]) {
            setDivisions(prev => prev.map(d => d.id === editingMasterId ? updated[0] : d));
          } else {
            setDivisions(prev => prev.map(d => d.id === editingMasterId ? { ...d, ...formDivisiData } : d));
          }
          showToast('Divisi berhasil diperbarui!');
        }
      } else {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/divisions`, {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(formDivisiData)
        });
        if (res.ok) {
          const created = await res.json();
          if (Array.isArray(created) && created[0]) {
            setDivisions(prev => [...prev, created[0]]);
          }
          showToast('Divisi baru berhasil ditambahkan!');
        }
      }
      setMasterModalType(null);
    } catch (err) {
      showToast('Gagal menyimpan data divisi', 'error');
    }
  };

  const handleDeleteDivisi = async (id: number, name: string) => {
    // Optimistic local state update
    setDivisions(prev => prev.filter(d => d.id !== id));
    showToast(`Divisi ${name} berhasil dihapus`);

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/divisions?id=eq.${id}`, {
        method: 'DELETE',
        headers: reqHeaders
      });
    } catch (err) {
      showToast('Gagal menghapus divisi di server', 'error');
    }
  };

  const handleSaveIKU = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIKUData.title.trim() || !formIKUData.kode_iku.trim()) {
      return showToast('Kode dan judul IKU wajib diisi', 'error');
    }

    try {
      const payload = {
        division_id: Number(formIKUData.division_id),
        kode_iku: formIKUData.kode_iku.trim(),
        title: formIKUData.title.trim()
      };

      if (editingMasterId) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/indikator_kinerja_utama?id=eq.${editingMasterId}`, {
          method: 'PATCH',
          headers: reqHeaders,
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updated = await res.json();
          if (Array.isArray(updated) && updated[0]) {
            setIkus(prev => prev.map(i => i.id === editingMasterId ? updated[0] : i));
          } else {
            setIkus(prev => prev.map(i => i.id === editingMasterId ? { ...i, ...payload } : i));
          }
          showToast('Indikator IKU berhasil diperbarui!');
        }
      } else {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/indikator_kinerja_utama`, {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const created = await res.json();
          if (Array.isArray(created) && created[0]) {
            setIkus(prev => [...prev, created[0]]);
          }
          showToast('Indikator IKU baru berhasil ditambahkan!');
        }
      }
      setMasterModalType(null);
    } catch (err) {
      showToast('Gagal menyimpan indikator IKU', 'error');
    }
  };

  const handleDeleteIKU = async (id: number, kode: string) => {
    // Optimistic local state update
    setIkus(prev => prev.filter(i => i.id !== id));
    showToast(`IKU ${kode} berhasil dihapus`);

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/indikator_kinerja_utama?id=eq.${id}`, {
        method: 'DELETE',
        headers: reqHeaders
      });
    } catch (err) {
      showToast('Gagal menghapus IKU di server', 'error');
    }
  };

  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProgramData.title.trim()) return showToast('Judul program kegiatan wajib diisi', 'error');

    try {
      const payload = {
        division_id: Number(formProgramData.division_id),
        iku_id: formProgramData.iku_id ? Number(formProgramData.iku_id) : null,
        title: formProgramData.title.trim(),
        timeframe: formProgramData.timeframe,
        target: Number(formProgramData.target) || 100,
        target_teks: formProgramData.target_teks.trim() || '100%',
        is_active: true
      };

      if (editingMasterId) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/checklist_templates?id=eq.${editingMasterId}`, {
          method: 'PATCH',
          headers: reqHeaders,
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const updated = await res.json();
          if (Array.isArray(updated) && updated[0]) {
            setTemplates(prev => prev.map(t => t.id === editingMasterId ? updated[0] : t));
          } else {
            setTemplates(prev => prev.map(t => t.id === editingMasterId ? { ...t, ...payload } as ChecklistTemplate : t));
          }
          showToast('Program kegiatan berhasil diperbarui!');
        }
      } else {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/checklist_templates`, {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const created = await res.json();
          if (Array.isArray(created) && created[0]) {
            setTemplates(prev => [...prev, created[0]]);
            if (!selectedTemplateId) setSelectedTemplateId(created[0].id);
          }
          showToast('Program kegiatan baru berhasil ditambahkan!');
        }
      }
      setMasterModalType(null);
    } catch (err) {
      showToast('Gagal menyimpan program kegiatan', 'error');
    }
  };

  const handleDeleteProgram = async (id: number, title: string) => {
    // Optimistic local state update
    setTemplates(prev => prev.filter(t => t.id !== id));
    if (selectedTemplateId === id) setSelectedTemplateId(null);
    showToast(`Program "${title}" berhasil dihapus`);

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/checklist_templates?id=eq.${id}`, {
        method: 'DELETE',
        headers: reqHeaders
      });
    } catch (err) {
      showToast('Gagal menghapus program di server', 'error');
    }
  };


  const fetchFullPresensi = async () => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/presensi_siswa?select=*&order=tanggal.desc&limit=3000`, { headers: reqHeaders });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setPresensiSiswaList(data);
        }
      }
    } catch (e) {
      console.warn('Kendala memuat presensi lengkap:', e);
    } finally {
      setHasFetchedFullPresensi(true);
    }
  };

  const fetchSupabaseData = async () => {
    setIsLoading(true);
    try {
      // Inisialisasi cepat: Memuat master data & prioritas tabel santri
      const results = await Promise.allSettled([
        fetch(`${SUPABASE_URL}/rest/v1/divisions?select=*&order=id.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/indikator_kinerja_utama?select=*&order=id.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/checklist_templates?select=*&order=id.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/checklist_sections?select=*&order=order_num.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/checklist_items?select=*&order=order_num.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/submissions?select=*&order=id.desc&limit=300`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/daftar_guru?select=*&order=nama_guru.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/daftar_mapel?select=*&order=nama_mapel.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/wali_kelas?select=*&order=kelas.asc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/data_santri?select=*&limit=3000`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/presensi_siswa?select=*&order=tanggal.desc&limit=800`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/data_kamar?select=*`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/laporan_kebersihan?select=*&order=tanggal.desc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/pelanggaran_santri?select=*&order=tanggal.desc`, { headers: reqHeaders })
      ]);

     const [divRes, ikuRes, tplRes, secRes, itRes, subRes, guruRes, mapelRes, waliRes, santriRes, presensiRes, kamarRes, laporanKebersihanRes, pelanggaranRes] = results;

      if (divRes.status === 'fulfilled' && divRes.value.ok) {
        const data = await divRes.value.json();
        if (Array.isArray(data) && data.length > 0) setDivisions(data);
      }
      if (ikuRes.status === 'fulfilled' && ikuRes.value.ok) {
        const data = await ikuRes.value.json();
        if (Array.isArray(data)) setIkus(data);
      }
      if (tplRes.status === 'fulfilled' && tplRes.value.ok) {
        const data = await tplRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          setTemplates(data);
          const dbConfigMap: Record<number, PengawasConfig> = {};
          data.forEach((t: ChecklistTemplate) => {
            if (t.pengawas_config && typeof t.pengawas_config === 'object') {
              dbConfigMap[t.id] = t.pengawas_config as PengawasConfig;
            }
          });
          // Tambahkan kode ini untuk memasukkan JSONB ke state:
            const loadedDetailsMap: Record<number, ExtendedFieldConfig> = {};
            data.forEach(template => {
              if (template.pengawas_field_details) {
                loadedDetailsMap[template.id] = template.pengawas_field_details;
              }
            });
            setFieldDetailsMap(loadedDetailsMap);
      
            if (Object.keys(dbConfigMap).length > 0) {
              setPengawasConfigMap(prev => ({ ...prev, ...dbConfigMap }));
            }
          } // <--- KURUNG TUTUPNYA PINDAH KE SINI
        }
          
      if (secRes.status === 'fulfilled' && secRes.value.ok) {
        const data = await secRes.value.json();
        if (Array.isArray(data)) setSections(data);
      }
      if (itRes.status === 'fulfilled' && itRes.value.ok) {
        const data = await itRes.value.json();
        if (Array.isArray(data)) setItems(data);
      }
      if (subRes.status === 'fulfilled' && subRes.value.ok) {
        const data = await subRes.value.json();
        if (Array.isArray(data)) setSubmissions(data);
      }
      if (guruRes.status === 'fulfilled' && guruRes.value.ok) {
        const data = await guruRes.value.json();
        if (Array.isArray(data)) setGuruList(data);
      }
      if (mapelRes.status === 'fulfilled' && mapelRes.value.ok) {
        const data = await mapelRes.value.json();
        if (Array.isArray(data)) setMapelList(data);
      }
      if (waliRes.status === 'fulfilled' && waliRes.value.ok) {
        const data = await waliRes.value.json();
        if (Array.isArray(data)) setWaliKelasList(data);
      }
      if (santriRes.status === 'fulfilled' && santriRes.value.ok) {
            const data = await santriRes.value.json();
            if (Array.isArray(data)) {
                // Urutkan berdasarkan Kamar dulu, baru Abjad Nama
                data.sort((a, b) => {
                    // Ambil data kamar (gunakan a.kamar atau a.halaqoh sesuai kolom database Anda)
                    const kamarA = (a.kamar || a.halaqoh || '').toString();
                    const kamarB = (b.kamar || b.halaqoh || '').toString();

                    // Urutkan kamar (numeric: true memastikan angka diurutkan dengan benar, misal 9 sebelum 10)
                    const compareKamar = kamarA.localeCompare(kamarB, undefined, { numeric: true });

                    // Jika kamarnya berbeda, urutkan berdasarkan kamar
                    if (compareKamar !== 0) {
                        return compareKamar;
                    }

                    // Jika kamarnya sama, urutkan berdasarkan nama
                    return (a.nama || '').localeCompare(b.nama || '');
                });
                
                setSantriList(data);
            }
        }

      if (presensiRes.status === 'fulfilled' && presensiRes.value.ok) {
        const data = await presensiRes.value.json();
        if (Array.isArray(data) && data.length > 0) {
          setPresensiSiswaList(data);
        } else {
          try {
            const localSaved = localStorage.getItem('presensi_local_backup');
            if (localSaved) {
              const parsed = JSON.parse(localSaved);
              if (Array.isArray(parsed) && parsed.length > 0) setPresensiSiswaList(parsed);
            }
          } catch {}
        }
      }

      // 2. LETAKKAN KODE PENGECEKAN E-KEBERSIHAN DI SINI (Di bawah if presensiRes)
      if (kamarRes && kamarRes.status === 'fulfilled' && kamarRes.value.ok) {
        const data = await kamarRes.value.json();
        if (Array.isArray(data)) setKamarList(data);
      }
      if (laporanKebersihanRes && laporanKebersihanRes.status === 'fulfilled' && laporanKebersihanRes.value.ok) {
        const data = await laporanKebersihanRes.value.json();
        if (Array.isArray(data)) setLaporanKebersihanList(data);
      }

      if (pelanggaranRes && pelanggaranRes.status === 'fulfilled' && pelanggaranRes.value.ok) {
  const data = await pelanggaranRes.value.json();
  if (Array.isArray(data)) setPelanggaranList(data);
}
    
      try {
        const catRes = await fetch(`${SUPABASE_URL}/rest/v1/laporan_iku_catatan?bulan=eq.${laporanBulan}`, { headers: reqHeaders });
        if (catRes.ok) {
          const catData: LaporanCatatan[] = await catRes.json();
          if (Array.isArray(catData)) {
            const map: Record<number, string> = {};
            catData.forEach(c => {
              map[c.template_id] = c.catatan || '';
            });
            setLaporanCatatanMap(map);
          }
        }
      } catch (errCat) {
        console.warn('Kendala memuat tabel laporan_iku_catatan:', errCat);
      }

    } catch (error) {
      console.error('Error fetching Supabase data:', error);
      showToast('Gagal memuat beberapa data dari server Supabase', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSupabaseData();
  }, []);

  // Trigger Lazy Load saat tab Presensi pertama kali diklik
  useEffect(() => {
    if (navTab === 'rekap_absensi' && !hasFetchedFullPresensi) {
      fetchFullPresensi();
    }
  }, [navTab, hasFetchedFullPresensi]);

  useEffect(() => {
    const loadCatatanBulan = async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/laporan_iku_catatan?bulan=eq.${laporanBulan}`, { headers: reqHeaders });
        if (res.ok) {
          const data: LaporanCatatan[] = await res.json();
          if (Array.isArray(data)) {
            const map: Record<number, string> = {};
            data.forEach(c => {
              map[c.template_id] = c.catatan || '';
            });
            setLaporanCatatanMap(map);
          }
        }
      } catch (e) {
        console.warn('Gagal memuat catatan per bulan:', e);
      }
    };
    loadCatatanBulan();
  }, [laporanBulan]);

  const handleSaveCatatanKegiatan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalCatatanTpl) return;

    setIsSavingCatatan(true);
    const tplId = modalCatatanTpl.id;
    const newText = inputCatatanTeks.trim();

    try {
      await fetch(
        `${SUPABASE_URL}/rest/v1/laporan_iku_catatan?template_id=eq.${tplId}&bulan=eq.${laporanBulan}`,
        { method: 'DELETE', headers: reqHeaders }
      );

      const res = await fetch(`${SUPABASE_URL}/rest/v1/laporan_iku_catatan`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({
          template_id: tplId,
          bulan: laporanBulan,
          catatan: newText
        })
      });

      if (res.ok) {
        setLaporanCatatanMap(prev => ({ ...prev, [tplId]: newText }));
        showToast(`Catatan untuk ${modalCatatanTpl.title} berhasil disimpan!`);
        setModalCatatanTpl(null);
      } else {
        throw new Error('Gagal simpan ke Supabase');
      }
    } catch (err) {
      console.warn('Fallback penyimpanan lokal catatan:', err);
      setLaporanCatatanMap(prev => {
        const updated = { ...prev, [tplId]: newText };
        try {
          localStorage.setItem(`iku_catatan_${laporanBulan}`, JSON.stringify(updated));
        } catch {}
        return updated;
      });
      showToast('Catatan disimpan (Mode Lokal)');
      setModalCatatanTpl(null);
    } finally {
      setIsSavingCatatan(false);
    }
  };

  const activeDivision = useMemo(() => {
    return divisions.find(d => Number(d.id) === Number(activeDivisionId)) || divisions[0] || { id: 1, name: 'Kurikulum', code: 'KUR' };
  }, [divisions, activeDivisionId]);

  useEffect(() => {
    if (activeDivision?.coordinator_name) {
      setFormPetugas(activeDivision.coordinator_name);
    }
  }, [activeDivision]);

  const groupedLaporanTemplates = useMemo(() => {
    const raw = templates.filter(t => Number(t.division_id) === Number(activeDivisionId));
    const groups: Array<{ iku: IKUItem | undefined; items: ChecklistTemplate[] }> = [];
    const map = new Map<number | string, { iku: IKUItem | undefined; items: ChecklistTemplate[] }>();

    raw.forEach(tpl => {
      const key = tpl.iku_id ? Number(tpl.iku_id) : 'umum';
      if (!map.has(key)) {
        const ikuObj = ikus.find(i => Number(i.id) === Number(tpl.iku_id));
        const newGroup = { iku: ikuObj, items: [] };
        map.set(key, newGroup);
        groups.push(newGroup);
      }
      map.get(key)!.items.push(tpl);
    });

    return groups;
  }, [templates, activeDivisionId, ikus]);

  const activePrograms = useMemo(() => {
    return templates.filter(t => {
      if (Number(t.division_id) !== Number(activeDivisionId)) return false;
      const tf = String(t.timeframe || '').toLowerCase();
      if (activeTimeframe === 'Harian') return tf.includes('hari');
      if (activeTimeframe === 'Mingguan') return tf.includes('minggu');
      if (activeTimeframe === 'Bulanan') return tf.includes('bulan');
      return !tf.includes('hari') && !tf.includes('minggu') && !tf.includes('bulan');
    });
  }, [templates, activeDivisionId, activeTimeframe]);

  useEffect(() => {
    if (activePrograms.length > 0) {
      if (!selectedTemplateId || !activePrograms.some(p => Number(p.id) === Number(selectedTemplateId))) {
        setSelectedTemplateId(activePrograms[0].id);
      }
    } else {
      setSelectedTemplateId(null);
    }
  }, [activePrograms, selectedTemplateId]);

  const selectedTemplate = useMemo(() => {
    return templates.find(t => Number(t.id) === Number(selectedTemplateId)) || null;
  }, [templates, selectedTemplateId]);

  const selectedIKU = useMemo(() => {
    if (!selectedTemplate || !selectedTemplate.iku_id) return null;
    return ikus.find(i => Number(i.id) === Number(selectedTemplate.iku_id)) || null;
  }, [selectedTemplate, ikus]);

  const templateSections = useMemo(() => {
    if (!selectedTemplateId) return [];
    return sections.filter(s => Number(s.template_id) === Number(selectedTemplateId));
  }, [sections, selectedTemplateId]);

  const getSectionItems = (sectionId: number) => {
    return items.filter(it => Number(it.section_id) === Number(sectionId) && it.is_active !== false);
  };

  const programSubmissions = useMemo(() => {
    if (!selectedTemplateId) return [];
    return submissions.filter(s => Number(s.template_id) === Number(selectedTemplateId));
  }, [submissions, selectedTemplateId]);

  const getSubmissionPercentage = (sub: Submission): number => {
    if (sub.rate !== undefined && sub.rate !== null && Number(sub.rate) > 0) {
      return Number(sub.rate);
    }
    if (sub.rata_rata !== undefined && sub.rata_rata !== null && Number(sub.rata_rata) > 0) {
      return Math.round((Number(sub.rata_rata) / 3) * 100);
    }
    return 100;
  };


   const getProgramRealisasi = (tpl: ChecklistTemplate, filterBulan?: string): string => {
  // 1. Ambil semua data submission untuk template ini
  let matchedSubs = submissions.filter(s => s.template_id === tpl.id);

  // 2. Jika parameter filterBulan diberikan, filter datanya sesuai bulan tersebut
  if (filterBulan) {
    matchedSubs = matchedSubs.filter(s => {
      const dStr = String(s.submission_date || s.created_at || '');
      return dStr.startsWith(filterBulan); // Mencocokkan format "YYYY-MM"
    });
  }

  // 3. Jika tidak ada laporan di bulan tersebut, kembalikan strip
  if (matchedSubs.length === 0) return '-';

  // 4. CEK FORMAT TARGET: Jika count, tampilkan jumlah laporan
  if (tpl.target_format === 'count') {
    return `${matchedSubs.length} Kali`;
  }

  // 5. DEFAULT (Persentase): Hitung rata-rata persentase skor
  const totalScore = matchedSubs.reduce((acc, curr) => acc + getSubmissionPercentage(curr), 0);
  const avgScore = Math.round(totalScore / matchedSubs.length);
  return `${avgScore}%`;
};
  const getMonthlySubmissionNotes = (templateId: number, bulan: string): string[] => {
    const matchedSubs = submissions.filter(s => {
      if (Number(s.template_id) !== Number(templateId)) return false;
      const dStr = String(s.submission_date || s.created_at || '');
      return dStr.startsWith(bulan);
    });

    const notesList: string[] = [];
    matchedSubs.forEach(s => {
      const note = String(s.general_notes || '').trim();
      const rawClass = String(s.target_class || '').trim();
      const classLabel = rawClass 
        ? (rawClass.toLowerCase().startsWith('') ? rawClass : `Kelas ${rawClass}`)
        : '';
      const classPrefix = classLabel ? `(${classLabel}) ` : '';

      if (note && note !== '-' && note.toLowerCase() !== 'nihil') {
        notesList.push(`• ${classPrefix}${note}`);
      }
    });

    return notesList;
  };

  const currentFormScore = useMemo(() => {
    let totalItemsCount = 0;
    let totalPointsEarned = 0;
    let defectCount = 0;

    templateSections.forEach(sec => {
      const secItems = getSectionItems(sec.id);
      const isPositif = (sectionTypeMap[sec.id] || (sec as any).section_type) === 'positif';

      secItems.forEach(it => {
        totalItemsCount += 1;
        const isChecked = !!checkedItems[it.id];

        if (isPositif) {
          if (isChecked) {
            totalPointsEarned += 1;
          } else {
            defectCount += 1;
          }
        } else {
          if (!isChecked) {
            totalPointsEarned += 1;
          } else {
            defectCount += 1;
          }
        }
      });
    });

    if (totalItemsCount === 0) return { percentage: 100, scale3: 3.0, totalViolations: 0 };
    const percentage = Math.max(0, Math.min(100, Math.round((totalPointsEarned / totalItemsCount) * 100)));
    const scale3 = parseFloat(((percentage / 100) * 3).toFixed(2));
    return { percentage, scale3, totalViolations: defectCount };
  }, [templateSections, checkedItems, sectionTypeMap, items]);


  const rekapAbsensiList = useMemo(() => {
    return submissions
      .filter(s => {
        const raw = String(s.absent_students ?? '').trim().toLowerCase();
        return raw && raw !== 'nihil' && raw !== '-' && raw !== '0' && raw !== 'none';
      })
      .map(s => ({
        id: s.id,
        date: String(s.submission_date || s.created_at || '').slice(0, 10),
        slot: String(s.target_time_slot || '-'),
        kelas: String(s.target_class || '-'),
        siswa: String(s.absent_students ?? ''),
        mapel: String(s.target_subject || 'KBM Reguler'),
        guru: String(s.target_person || s.pj_name || 'Ustadzah Pengampu'),
        notes: String(s.general_notes || '-')
      }));
  }, [submissions]);

  const normalizeClassCode = (c: string) => {
    return String(c || '')
      .trim()
      .replace(/^VII[\s_-]*/i, '7-')
      .replace(/^VIII[\s_-]*/i, '8-')
      .replace(/^IX[\s_-]*/i, '9-')
      .replace(/^7[\s_]+/i, '7-')
      .replace(/^8[\s_]+/i, '8-')
      .replace(/^9[\s_]+/i, '9-')
      .toUpperCase();
  };

  const studentsInSelectedClass = useMemo(() => {
    const targetNorm = normalizeClassCode(inputAbsensiKelas);
    return santriList.filter(s => normalizeClassCode(s.kelas) === targetNorm);
  }, [santriList, inputAbsensiKelas]);

  useEffect(() => {
    const targetNorm = normalizeClassCode(inputAbsensiKelas);
    const existingForDate = presensiSiswaList.filter(
      p => String(p.tanggal).slice(0, 10) === inputAbsensiTanggal && normalizeClassCode(p.kelas) === targetNorm
    );

    const initialMap: Record<string, 'Hadir' | 'Sakit' | 'Izin' | 'Alpha'> = {};
    studentsInSelectedClass.forEach(s => {
      const nisKey = String(s.nis || s.nama).trim();
      const match = existingForDate.find(e => String(e.nis).trim() === String(s.nis).trim());
      initialMap[nisKey] = match ? match.status : 'Hadir';
    });
    setInputStatuses(initialMap);
  }, [inputAbsensiKelas, inputAbsensiTanggal, studentsInSelectedClass, presensiSiswaList]);

  const handleSaveAbsensiToSupabase = async () => {
    if (studentsInSelectedClass.length === 0) {
      showToast('Tidak ada santri pada kelas ini.', 'error');
      return;
    }

    setIsSavingAbsensi(true);
    try {
      const targetNorm = normalizeClassCode(inputAbsensiKelas);

      const recordsToInsert: PresensiRecord[] = studentsInSelectedClass.map(s => {
        const nisKey = String(s.nis || s.nama).trim();
        return {
          tanggal: inputAbsensiTanggal,
          kelas: inputAbsensiKelas,
          nis: String(s.nis || '-'),
          nama_siswa: s.nama,
          status: inputStatuses[nisKey] || 'Hadir'
        };
      });

      try {
        const encDate = encodeURIComponent(inputAbsensiTanggal);
        const encClass = encodeURIComponent(inputAbsensiKelas);
        await fetch(
          `${SUPABASE_URL}/rest/v1/presensi_siswa?tanggal=eq.${encDate}&kelas=eq.${encClass}`,
          { method: 'DELETE', headers: reqHeaders }
        );
      } catch (delErr) {
        console.warn('Info: Skip delete data lama:', delErr);
      }

      let isSupabaseOk = false;
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/presensi_siswa`, {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(recordsToInsert)
        });

        if (res.ok) {
          isSupabaseOk = true;
        } else {
          const errDetail = await res.text();
          console.warn('Respon Supabase presensi_siswa:', res.status, errDetail);
        }
      } catch (netErr) {
        console.warn('Gagal koneksi ke tabel Supabase presensi_siswa:', netErr);
      }

      const otherRecords = presensiSiswaList.filter(
        p => !(String(p.tanggal).slice(0, 10) === inputAbsensiTanggal && normalizeClassCode(p.kelas) === targetNorm)
      );
      const combined = [...recordsToInsert, ...otherRecords];
      setPresensiSiswaList(combined);

      // Safe cache: Hanya simpan 150 rekaman terbaru untuk menghindari QuotaExceededError
      try {
        localStorage.setItem('presensi_local_backup', JSON.stringify(combined.slice(0, 150)));
      } catch (e) {
        console.warn('Peringatan kuota storage lokal:', e);
      }

      if (isSupabaseOk) {
        showToast('Presensi santri berhasil disimpan ke Supabase!');
      } else {
        showToast('Tersimpan di sistem. Silakan cek tabel presensi_siswa di Supabase.', 'success');
      }
    } catch (err) {
      console.error('Error saat menyimpan presensi:', err);
      showToast('Terjadi kendala memproses presensi', 'error');
    } finally {
      setIsSavingAbsensi(false);
    }
  };

  const dailyAttendanceSummary = useMemo(() => {
    const listClasses = ['7-A', '7-B', '7-C', '7-D', '7-E', '8-A', '8-B', '8-C', '8-D', '9-A', '9-B'];
    const recordsForDate = presensiSiswaList.filter(
      p => String(p.tanggal).slice(0, 10) === inputAbsensiTanggal
    );

    return listClasses.map(cls => {
      const targetNorm = normalizeClassCode(cls);
      const studentsInCls = santriList.filter(s => normalizeClassCode(s.kelas) === targetNorm);
      const rows = recordsForDate.filter(p => normalizeClassCode(p.kelas) === targetNorm);
      const isInputted = rows.length > 0;

      let hadir = 0, sakit = 0, izin = 0, alpha = 0;
      const absentStudentsList: Array<{ nama: string; status: string }> = [];

      rows.forEach(p => {
        const st = String(p.status || '').toLowerCase();
        if (st === 'hadir') hadir++;
        else if (st === 'sakit') {
          sakit++;
          absentStudentsList.push({ nama: p.nama_siswa, status: 'Sakit' });
        } else if (st === 'izin') {
          izin++;
          absentStudentsList.push({ nama: p.nama_siswa, status: 'Izin' });
        } else if (st === 'alpha') {
          alpha++;
          absentStudentsList.push({ nama: p.nama_siswa, status: 'Alpha' });
        }
      });

      const total = hadir + sakit + izin + alpha;
      const pct = total > 0 ? ((hadir / total) * 100).toFixed(1) : '100.0';

      return {
        kelas: cls,
        totalSiswa: studentsInCls.length || rows.length,
        hadir,
        sakit,
        izin,
        alpha,
        total,
        pct,
        isInputted,
        absentStudentsList
      };
    });
  }, [presensiSiswaList, inputAbsensiTanggal, santriList]);

  const dailyGlobalStats = useMemo(() => {
    let hadir = 0, sakit = 0, izin = 0, alpha = 0;
    let classesCompleted = 0;
    let totalInputted = 0;

    dailyAttendanceSummary.forEach(row => {
      if (row.isInputted) {
        classesCompleted++;
        totalInputted += row.total;
        hadir += row.hadir;
        sakit += row.sakit;
        izin += row.izin;
        alpha += row.alpha;
      }
    });

    const total = hadir + sakit + izin + alpha;
    const pct = total > 0 ? ((hadir / total) * 100).toFixed(1) : '100.0';

    return { hadir, sakit, izin, alpha, total, pct, classesCompleted, totalInputted };
  }, [dailyAttendanceSummary]);

  const monthlyFilteredPresensi = useMemo(() => {
    return presensiSiswaList.filter(p => String(p.tanggal).startsWith(rekapBulan));
  }, [presensiSiswaList, rekapBulan]);

  const globalMonthlyStats = useMemo(() => {
    let hadir = 0, sakit = 0, izin = 0, alpha = 0;
    monthlyFilteredPresensi.forEach(p => {
      const st = String(p.status || '').toLowerCase();
      if (st === 'hadir') hadir++;
      else if (st === 'sakit') sakit++;
      else if (st === 'izin') izin++;
      else if (st === 'alpha') alpha++;
    });
    const total = hadir + sakit + izin + alpha;
    const pct = total > 0 ? ((hadir / total) * 100).toFixed(1) : '100.0';
    return { hadir, sakit, izin, alpha, total, pct };
  }, [monthlyFilteredPresensi]);

  const classAttendanceSummary = useMemo(() => {
    const listClasses = ['7-A', '7-B', '7-C', '7-D', '7-E', '8-A', '8-B', '8-C', '8-D', '9-A', '9-B'];
    return listClasses.map(cls => {
      const targetNorm = normalizeClassCode(cls);
      const rows = monthlyFilteredPresensi.filter(p => normalizeClassCode(p.kelas) === targetNorm);
      let hadir = 0, sakit = 0, izin = 0, alpha = 0;
      rows.forEach(p => {
        const st = String(p.status || '').toLowerCase();
        if (st === 'hadir') hadir++;
        else if (st === 'sakit') sakit++;
        else if (st === 'izin') izin++;
        else if (st === 'alpha') alpha++;
      });
      const total = hadir + sakit + izin + alpha;
      const pct = total > 0 ? ((hadir / total) * 100).toFixed(1) : '100.0';
      return { kelas: cls, hadir, sakit, izin, alpha, total, pct };
    });
  }, [monthlyFilteredPresensi]);

  const studentAttendanceInClass = useMemo(() => {
    const targetNorm = normalizeClassCode(rekapKelas);
    const students = santriList.filter(s => normalizeClassCode(s.kelas) === targetNorm);
    const records = monthlyFilteredPresensi.filter(p => normalizeClassCode(p.kelas) === targetNorm);

    return students.map(s => {
      const nisStr = String(s.nis || '').trim();
      const rows = records.filter(r => String(r.nis).trim() === nisStr || r.nama_siswa.toLowerCase() === s.nama.toLowerCase());
      let hadir = 0, sakit = 0, izin = 0, alpha = 0;
      rows.forEach(r => {
        const st = String(r.status || '').toLowerCase();
        if (st === 'hadir') hadir++;
        else if (st === 'sakit') sakit++;
        else if (st === 'izin') izin++;
        else if (st === 'alpha') alpha++;
      });
      const total = hadir + sakit + izin + alpha;
      const pct = total > 0 ? ((hadir / total) * 100).toFixed(1) : '100.0';
      return {
        nis: s.nis || '-',
        nama: s.nama,
        hadir,
        sakit,
        izin,
        alpha,
        total,
        pct
      };
    });
  }, [santriList, monthlyFilteredPresensi, rekapKelas]);

  const handleDownloadRekapCSV = () => {
    const headers = ['No', 'NIS', 'Nama Santri', 'Kelas', 'Hadir (H)', 'Sakit (S)', 'Izin (I)', 'Alpha (A)', 'Persentase'];
    const rows = studentAttendanceInClass.map((s, idx) => [
      idx + 1,
      `"${s.nis}"`,
      `"${s.nama}"`,
      `"${rekapKelas}"`,
      s.hadir,
      s.sakit,
      s.izin,
      s.alpha,
      `"${s.pct}%"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Rekap_Presensi_Kelas_${rekapKelas}_${rekapBulan}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExcelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const content = evt.target?.result;
        if (typeof content === 'string') {
          const lines = content.split('\n').filter(l => l.trim());
          if (lines.length > 1) {
            const parsed: PresensiRecord[] = [];
            for (let i = 1; i < lines.length; i++) {
              const cols = lines[i].split(',').map(c => c.replace(/^"|"$/g, '').trim());
              if (cols.length >= 5) {
                parsed.push({
                  tanggal: cols[0] || new Date().toISOString().slice(0, 10),
                  kelas: cols[1] || '7-A',
                  nis: cols[2] || '-',
                  nama_siswa: cols[3] || 'Santri',
                  status: (['Hadir', 'Sakit', 'Izin', 'Alpha'].includes(cols[4]) ? cols[4] : 'Hadir') as any
                });
              }
            }
            setImportPreviewList(parsed);
            showToast(`${parsed.length} baris data berhasil dibaca dari file!`);
          }
        } else {
          showToast('File dibaca. Format pratinjau siap diunggah.', 'success');
        }
      } catch (err) {
        showToast('Gagal memproses file. Pastikan format CSV/Excel sesuai.', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleUploadImportToSupabase = async () => {
    if (importPreviewList.length === 0) {
      showToast('Belum ada data untuk diunggah.', 'error');
      return;
    }

    setIsImporting(true);
    setImportProgress(10);
    try {
      const batchSize = 100;
      for (let i = 0; i < importPreviewList.length; i += batchSize) {
        const chunk = importPreviewList.slice(i, i + batchSize);
        await fetch(`${SUPABASE_URL}/rest/v1/presensi_siswa`, {
          method: 'POST',
          headers: reqHeaders,
          body: JSON.stringify(chunk)
        });
        setImportProgress(Math.min(100, Math.round(((i + chunk.length) / importPreviewList.length) * 100)));
      }

      showToast(`Berhasil mengunggah ${importPreviewList.length} baris absensi ke Supabase!`);
      fetchSupabaseData();
      setImportPreviewList([]);
      setAbsensiSubTab('rekap');
    } catch (err) {
      showToast('Terjadi kendala saat mengunggah ke Supabase', 'error');
    } finally {
      setIsImporting(false);
      setImportProgress(0);
    }
  };

  const handleSubmitCeklis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplateId) {
      showToast('Pilih template kegiatan terlebih dahulu', 'error');
      return;
    }

    const payload = {
      template_id: selectedTemplateId,
      pj_name: formPetugas,
      submission_date: new Date().toISOString(),
      target_person: formGuru || null,
      target_subject: formMapel || null,
      target_class: formKelas || null,
      target_time_slot: formJam || null,
      absent_students: formSiswaAbsen || 'Nihil',
      general_notes: formCatatan || null,
      rate: currentFormScore.percentage,
      rata_rata: currentFormScore.scale3,
      n_kebersihan: 3,
      n_kerapan: 3,
      n_kondusif: 3
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const created = await res.json();
        const newSubmission = (Array.isArray(created) && created.length > 0) ? created[0] : null;

        // --- TAMBAHAN KODE: Simpan detail item (Rincian Indikator) ke database ---
        if (newSubmission) {
          const detailRecords: any[] = [];

          // Kumpulkan semua jawaban dari form yang tampil
          templateSections.forEach(sec => {
            const secItems = getSectionItems(sec.id);
            secItems.forEach(it => {
              let answerValue = '';
              
              // Cek tipe input, jika checkbox simpan true/false, selain itu simpan teksnya
              if (!it.input_type || it.input_type === 'checkbox') {
                answerValue = checkedItems[it.id] ? 'true' : 'false';
              } else {
                answerValue = formAnswers[it.id] || '';
              }

              // Masukkan ke array penampung
              detailRecords.push({
                submission_id: newSubmission.id,
                item_id: it.id,
                answer_value: answerValue
              });
            });
          });

          // Eksekusi API Post ke tabel submission_details
          if (detailRecords.length > 0) {
            await fetch(`${SUPABASE_URL}/rest/v1/submission_details`, {
              method: 'POST',
              headers: reqHeaders,
              body: JSON.stringify(detailRecords)
            }).catch(err => console.warn('Gagal menyimpan detail laporan:', err));
          }

          // Update State UI
          setSubmissions(prev => [newSubmission, ...prev]);
        }
        // -----------------------------------------------------------------------

        showToast('Laporan monitoring berhasil disimpan!');
        setCheckedItems({});
        setFormAnswers({});
        setFormCatatan('');
        setActiveSubTab('riwayat');
      } else {
        throw new Error('Gagal menyimpan ke server');
      }
    } catch (err) {
      console.error(err);
      showToast('Terjadi kesalahan saat menyimpan', 'error');
    }
  };

  const handleAddSection = async () => {
    if (!newSectionName.trim() || !selectedTemplateId) return;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/checklist_sections`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({
          template_id: selectedTemplateId,
          name: newSectionName.trim(),
          order_num: templateSections.length + 1
        })
      });
      if (res.ok) {
        const createdData = await res.json();
        if (Array.isArray(createdData) && createdData.length > 0) {
          setSections(prev => [...prev, createdData[0]]);
          updateSectionType(createdData[0].id, newSectionType);
        }
        showToast(`Kategori "${newSectionName}" berhasil ditambahkan!`);
        setNewSectionName('');
      }
    } catch (err) {
      showToast('Gagal menambahkan kategori', 'error');
    }
  };

  const handleDeleteSection = async (sectionId: number, sectionName: string) => {
    // Optimistic UI update: langsung hapus section dan item anaknya dari state seketika
    setSections(prev => prev.filter(s => s.id !== sectionId));
    setItems(prev => prev.filter(it => it.section_id !== sectionId));
    showToast(`Kategori "${sectionName}" berhasil dihapus`);

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/checklist_items?section_id=eq.${sectionId}`, {
        method: 'DELETE',
        headers: reqHeaders
      });

      await fetch(`${SUPABASE_URL}/rest/v1/checklist_sections?id=eq.${sectionId}`, {
        method: 'DELETE',
        headers: reqHeaders
      });
    } catch (err) {
      showToast('Gagal menghapus kategori dari server', 'error');
    }
  };

  const handleAddItem = async (sectionId: number) => {
    if (!newItemText.trim()) return;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/checklist_items`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify({
          section_id: sectionId,
          item_text: newItemText.trim(),
          input_type: newItemInputType || 'checkbox',
          options: (newItemInputType === 'select' || newItemInputType === 'radio') ? newItemOptions.trim() : null,
          is_active: true,
          order_num: 99
        })
      });
      if (res.ok) {
        const created = await res.json();
        if (Array.isArray(created) && created.length > 0) {
          setItems(prev => [...prev, created[0]]);
        }
        showToast('Indikator baru berhasil ditambahkan!');
        setNewItemText('');
        setNewItemInputType('checkbox');
        setNewItemOptions('');
        setNewItemSectionId(null);
      }
    } catch (err) {
      showToast('Gagal menambahkan butir ceklis', 'error');
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    // Optimistic UI update: langsung hilangkan dari daftar seketika tanpa loading
    setItems(prev => prev.filter(it => it.id !== itemId));
    showToast('Indikator berhasil dihapus');

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/checklist_items?id=eq.${itemId}`, {
        method: 'DELETE',
        headers: reqHeaders
      });
    } catch (err) {
      showToast('Gagal menghapus indikator di server', 'error');
    }
  };

  const handleOpenSubmissionDetail = async (sub: Submission) => {
  setSelectedSubmissionForDetail(sub);
  setDetailItemsLoading(true);
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/submission_details?submission_id=eq.${sub.id}&select=*`, {
      headers: reqHeaders
    });
    
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        // 1. Petakan data dan deteksi apakah jawaban tersebut termasuk kategori "Masalah/Temuan"
        const enriched = data.map((d: any) => {
          const matchedItem = items.find(it => it.id === d.item_id);
          let isProblem = false;

          if (matchedItem) {
            const matchedSection = sections.find(s => s.id === matchedItem.section_id);
            // Cek apakah kategori indikator ini Tipe Positif atau Tipe Negatif
            const isPositif = matchedSection ? ((sectionTypeMap[matchedSection.id] || (matchedSection as any).section_type) === 'positif') : false;

            // Logika Penentuan Temuan:
            if (!matchedItem.input_type || matchedItem.input_type === 'checkbox') {
              if (isPositif && d.answer_value === 'false') {
                isProblem = true; // Kategori Positif tapi TIDAK dicentang (Berarti Masalah)
              } else if (!isPositif && d.answer_value === 'true') {
                isProblem = true; // Kategori Negatif dan DICENTANG (Berarti Masalah)
              }
            } else {
              // Untuk input text/dropdown, jadikan temuan jika ada teks/isiannya
              if (d.answer_value && d.answer_value.trim() !== '' && d.answer_value !== 'false') {
                isProblem = true;
              }
            }
          }

          return {
            ...d,
            item_text: matchedItem ? matchedItem.item_text : `Indikator #${d.item_id}`,
            is_problem: isProblem
          };
        });

        // 2. FILTER DATA: Hanya ambil data yang terdeteksi sebagai `isProblem = true`
        const onlyProblems = enriched.filter(item => item.is_problem);
        
        // 3. Masukkan ke dalam State (sehingga UI otomatis menyesuaikan jumlah dan listnya)
        setSubmissionDetailList(onlyProblems);

      } else {
        setSubmissionDetailList([]);
      }
    } else {
      setSubmissionDetailList([]);
    }
  } catch (err) {
    console.error('Error fetching submission details:', err);
    setSubmissionDetailList([]);
  } finally {
    setDetailItemsLoading(false);
  }
};
// LETAKKAN FUNGSI handleSubmitKebersihan DI SINI
  const handleSubmitKebersihan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formKebersihanKamar || !formKebersihanKeterangan) {
      showToast('Kamar dan keterangan harus diisi!', 'error');
      return;
    }

    const selectedKamar = kamarList.find(k => k.nama_kamar === formKebersihanKamar);
    
    const payload = {
      tanggal: formKebersihanTgl,
      kamar: formKebersihanKamar,
      jenjang: selectedKamar?.jenjang || '-',
      wali_halaqoh: selectedKamar?.wali_halaqoh || '-',
      keterangan: formKebersihanKeterangan
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/laporan_kebersihan`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast('Laporan kebersihan berhasil disimpan!', 'success');
        setFormKebersihanKeterangan('');
        setFormKebersihanKamar('');
        setKebersihanSubTab('riwayat');
        fetchSupabaseData(); // Refresh data dari server
      } else {
        showToast('Gagal menyimpan laporan kebersihan', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi', 'error');
    }
  };
  
  const filteredLaporanKebersihan = laporanKebersihanList.filter(item => {
    if (!kebersihanStartDate && !kebersihanEndDate) return true;
    const itemDate = new Date(item.tanggal);
    const start = kebersihanStartDate ? new Date(kebersihanStartDate) : null;
    const end = kebersihanEndDate ? new Date(kebersihanEndDate) : null;
    if (start && itemDate < start) return false;
    if (end && itemDate > end) return false;
    return true;
  });
  // FUNGSI MEMBUKA MODAL EDIT
  const handleOpenEditKebersihan = (item: any) => {
    setEditKebersihanId(item.id);
    setEditKebersihanTgl(item.tanggal);
    setEditKebersihanKamar(item.kamar);
    setEditKebersihanKeterangan(item.keterangan);
    setIsEditKebersihanModalOpen(true);
  };

  // FUNGSI UPDATE DATA (EDIT)
  const handleUpdateKebersihan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editKebersihanKamar || !editKebersihanKeterangan) return;

    const selectedKamar = kamarList.find(k => k.nama_kamar === editKebersihanKamar);
    const payload = {
      tanggal: editKebersihanTgl,
      kamar: editKebersihanKamar,
      jenjang: selectedKamar?.jenjang || '-',
      wali_halaqoh: selectedKamar?.wali_halaqoh || '-',
      keterangan: editKebersihanKeterangan
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/laporan_kebersihan?id=eq.${editKebersihanId}`, {
        method: 'PATCH',
        headers: reqHeaders,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast('Data berhasil diperbarui!', 'success');
        setIsEditKebersihanModalOpen(false);
        fetchSupabaseData(); // Refresh data
      } else {
        showToast('Gagal memperbarui data', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi', 'error');
    }
  };

  // FUNGSI HAPUS DATA
  const handleDeleteKebersihan = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data laporan ini?')) return;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/laporan_kebersihan?id=eq.${id}`, {
        method: 'DELETE',
        headers: reqHeaders
      });

      if (res.ok) {
        showToast('Data laporan berhasil dihapus!', 'success');
        fetchSupabaseData(); // Refresh data
      } else {
        showToast('Gagal menghapus data', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi', 'error');
    }
  };

  // Fetch opsi SP dari Supabase secara terpisah agar tidak mengganggu load data lain
  useEffect(() => {
    const fetchSpOptions = async () => {
      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/master_sp_pelanggaran?select=*`, { headers: reqHeaders });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) setSpList(data);
        }
      } catch (e) {
        console.warn("Belum ada tabel master_sp_pelanggaran");
      }
    };
    fetchSpOptions();
  }, []);

  // Fungsi untuk menyimpan data pelanggaran
  const handleSubmitPelanggaran = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSantriPlgIds.length === 0) return showToast('Pilih setidaknya 1 santri!', 'error');
    if (formPlgSanksiChecked.length === 0) return showToast('Pilih setidaknya 1 sanksi!', 'error');
    
    setIsLoading(true);
    
    // Gabungkan sanksi yang dicentang, dan jika ada "Lainnya", tambahkan teks custom-nya
    const sanksiList = formPlgSanksiChecked.map(s => 
      s === '8. Lainnya (diisi sendiri)' ? `Lainnya: ${formPlgSanksiCustom}` : s
    ).join('; ');

    const recordsToInsert = selectedSantriPlgIds.map(id => {
      const s = santriList.find(x => String(x.id) === id);
      return {
        tanggal: formPlgTanggal,
        santri_id: id,
        nama: s?.nama || '-',
        jenjang: s?.kelas?.includes('SMA') ? 'SMA' : 'SMP', 
        kelas: s?.kelas || '-',
        halaqoh: s?.halaqoh || '-',
        kamar: s?.halaqoh || '-', 
        pelanggaran: formPlgBentuk,
        sp: formPlgSP || 'Tanpa SP',
        sanksi: sanksiList
      };
    });

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/pelanggaran_santri`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(recordsToInsert)
      });
      if (res.ok) {
        showToast('Data pelanggaran berhasil disimpan!', 'success');
        // Reset Form
        setSelectedSantriPlgIds([]);
        setFormPlgBentuk('');
        setFormPlgSanksiChecked([]);
        setFormPlgSanksiCustom('');
        setFormPlgSP('Tanpa SP');
        setPelanggaranSubTab('laporan'); // Otomatis pindah ke tab laporan
        fetchSupabaseData(); // Refresh data utama
      } else {
        showToast('Gagal menyimpan data!', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const isSidebarExpanded = isSidebarPinned || isSidebarHovered;

  // Tambahkan state ini di area deklarasi state (Hapus filterPlgJenjang jika masih ada)
const [sortHalaqoh, setSortHalaqoh] = useState<'terbanyak' | 'abjad'>('terbanyak');

// 1. Update Filter (Hapus logika Jenjang)
const filteredPelanggaran = useMemo(() => {
    return pelanggaranList.filter(p => {
        const matchKataKunci = p.nama?.toLowerCase().includes(filterPlgKataKunci.toLowerCase()) || 
                               p.sanksi?.toLowerCase().includes(filterPlgKataKunci.toLowerCase()) || 
                               p.pelanggaran?.toLowerCase().includes(filterPlgKataKunci.toLowerCase());
        const matchKelas = filterPlgKelas === 'Semua Kelas' || p.kelas === filterPlgKelas;
        const matchStatus = filterPlgStatusSP === 'Semua Status' || p.sp === filterPlgStatusSP;

        const pDate = new Date(p.tanggal);
        const matchMulai = !filterPlgMulai || pDate >= new Date(filterPlgMulai);
        const matchSampai = !filterPlgSampai || pDate <= new Date(filterPlgSampai);

        return matchKataKunci && matchKelas && matchStatus && matchMulai && matchSampai;
    });
}, [pelanggaranList, filterPlgKataKunci, filterPlgKelas, filterPlgStatusSP, filterPlgMulai, filterPlgSampai]);

 // FUNGSI MEMBUKA MODAL EDIT PELANGGARAN
const handleOpenEditPelanggaran = (item: any) => {
    setEditPlgId(item.id);
    setEditPlgTanggal(item.tanggal);
    setEditPlgBentuk(item.pelanggaran);
    setEditPlgSanksi(item.sanksi);
    setEditPlgSP(item.sp);
    setIsEditPlgModalOpen(true);
};

// FUNGSI UPDATE DATA PELANGGARAN
const handleUpdatePelanggaran = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPlgBentuk || !editPlgSanksi) return;

    const payload = {
        tanggal: editPlgTanggal,
        pelanggaran: editPlgBentuk,
        sanksi: editPlgSanksi,
        sp: editPlgSP
    };

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/pelanggaran_santri?id=eq.${editPlgId}`, {
            method: 'PATCH',
            headers: reqHeaders,
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            showToast('Data pelanggaran berhasil diperbarui!', 'success');
            setIsEditPlgModalOpen(false);
            fetchSupabaseData(); // Me-refresh tabel otomatis
        } else {
            showToast('Gagal memperbarui data pelanggaran', 'error');
        }
    } catch (err) {
        showToast('Terjadi kesalahan koneksi', 'error');
    }
};

// FUNGSI HAPUS DATA PELANGGARAN
const handleDeletePelanggaran = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus catatan pelanggaran ini?')) return;

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/pelanggaran_santri?id=eq.${id}`, {
            method: 'DELETE',
            headers: reqHeaders
        });

        if (res.ok) {
            showToast('Data pelanggaran berhasil dihapus!', 'success');
            fetchSupabaseData(); // Me-refresh tabel otomatis
        } else {
            showToast('Gagal menghapus data pelanggaran', 'error');
        }
    } catch (err) {
        showToast('Terjadi kesalahan koneksi', 'error');
    }
};
  
// 2. Update Rekap Halaqoh (Dengan penambahan array riwayat)
const rekapHalaqohData = useMemo(() => {
    // Tambahkan 'riwayat: any[]' pada definisi tipe
    const stats: Record<string, { ustadz: string, kamar: string, totalSantri: number, totalKasus: number, spAktif: number, riwayat: any[] }> = {};

    kamarList.forEach(k => {
        const ustadzName = k.wali_halaqoh && k.wali_halaqoh !== '-' ? k.wali_halaqoh : '-';
        const kamarName = k.nama_kamar || '-';

        const realTotalSantri = santriList.filter(s => 
            (s.halaqoh && s.halaqoh.toLowerCase() === kamarName.toLowerCase()) || 
            (s.halaqoh && s.halaqoh.toLowerCase() === ustadzName.toLowerCase())
        ).length;

        const key = `${ustadzName}_${kamarName}`.toUpperCase();
        
        stats[key] = { 
            ustadz: ustadzName, 
            kamar: kamarName, 
            totalSantri: realTotalSantri,
            totalKasus: 0, 
            spAktif: 0,
            riwayat: [] // Inisialisasi array kosong
        };
    });

    filteredPelanggaran.forEach(p => {
        let ustadzName = p.halaqoh || '-';
        let kamarName = p.kamar || '-';
        let key = `${ustadzName}_${kamarName}`.toUpperCase();

        const pHalaqohStr = p.halaqoh ? p.halaqoh.toLowerCase() : '';
        const pKamarStr = p.kamar ? p.kamar.toLowerCase() : '';

        const kMatch = kamarList.find(k => 
            (k.nama_kamar && k.nama_kamar.toLowerCase() === pHalaqohStr) || 
            (k.wali_halaqoh && k.wali_halaqoh.toLowerCase() === pHalaqohStr) || 
            (k.nama_kamar && k.nama_kamar.toLowerCase() === pKamarStr)
        );
        
        if (kMatch) {
            ustadzName = kMatch.wali_halaqoh && kMatch.wali_halaqoh !== '-' ? kMatch.wali_halaqoh : '-';
            kamarName = kMatch.nama_kamar || '-';
            key = `${ustadzName}_${kamarName}`.toUpperCase();
        }

        if (!stats[key]) {
            stats[key] = { ustadz: ustadzName, kamar: kamarName, totalSantri: 0, totalKasus: 0, spAktif: 0, riwayat: [] };
        }

        stats[key].totalKasus += 1;
        stats[key].riwayat.push(p); // Masukkan data pelanggaran ke dalam riwayat
        if (p.sp && p.sp !== 'Tanpa SP') stats[key].spAktif += 1;
    });

    let result = Object.values(stats).map(data => ({
        halaqoh: data.ustadz,
        kamar: data.kamar,
        totalSantri: data.totalSantri,
        totalKasus: data.totalKasus,
        spAktif: data.spAktif,
        riwayat: data.riwayat // Bawa data riwayat ke hasil akhir
    }));

    if (sortHalaqoh === 'terbanyak') {
        result.sort((a, b) => b.totalKasus - a.totalKasus);
    } else {
        result.sort((a, b) => a.halaqoh.localeCompare(b.halaqoh));
    }

    return result;
}, [filteredPelanggaran, kamarList, sortHalaqoh, santriList]);

// 3. Update Rekap Santri (Perbaikan Bug Riwayat Tercampur)
const rekapSantriData = useMemo(() => {
    const stats: Record<string, { nama: string, jenjang: string, kelas: string, halaqoh: string, totalKasus: number, spTertinggi: string, riwayat: any[] }> = {};
    const spHierarchy = ['Tanpa SP', 'Surat Pernyataan', 'SP 1', 'SP 2', 'SP 3', 'SP Terakhir', 'Dikeluarkan'];

    filteredPelanggaran.forEach(p => {
        // PERBAIKAN: Jika santri_id kosong, gunakan 'nama' sebagai pemisah agar tidak nyampur!
        const id = p.santri_id || p.nama; 
        if (!id) return;

        if (!stats[id]) {
            stats[id] = { nama: p.nama, jenjang: p.jenjang, kelas: p.kelas, halaqoh: p.halaqoh, totalKasus: 0, spTertinggi: 'Tanpa SP', riwayat: [] };
        }
        stats[id].totalKasus += 1;
        stats[id].riwayat.push(p);

        const currentSpIndex = spHierarchy.indexOf(p.sp);
        const highestSpIndex = spHierarchy.indexOf(stats[id].spTertinggi);
        if (currentSpIndex > highestSpIndex) {
            stats[id].spTertinggi = p.sp;
        }
    });
    
    return Object.values(stats).sort((a, b) => b.totalKasus - a.totalKasus);
}, [filteredPelanggaran]);
  
  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-white text-xs font-bold transition-all transform animate-bounce ${
          toastMessage.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
        }`}>
          {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {toastMessage.text}
        </div>
      )}

      {/* Backdrop Overlay untuk Smartphone */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* SIDEBAR NAVIGATION (Desktop & Drawer Mobile) */}
      <aside
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
        className={`fixed top-0 left-0 bottom-0 z-50 bg-[#0b132b] text-slate-300 transition-all duration-300 flex flex-col justify-between shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        } ${isSidebarExpanded ? 'md:w-72' : 'md:w-20'}`}
      >
        <div className="flex flex-col h-full">
          
          {/* Header Brand */}
          <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 p-2 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              {(isSidebarExpanded || isMobileMenuOpen) && (
                <div className="min-w-0">
                  <div className="font-black text-white text-sm tracking-tight truncate">
                    PTYQ 1 PUTRA
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    UNIT SMP
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsSidebarPinned(!isSidebarPinned)}
                title={isSidebarPinned ? 'Buka Kunci Sidebar' : 'Kunci Sidebar Terbuka'}
                className="hidden md:block p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
              >
                {isSidebarPinned ? <Pin className="w-4 h-4 text-blue-400" /> : <PinOff className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Nav Items Menu */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            
            {/* Group 1: Menu Utama */}
            <div className="space-y-1">
              <button
                onClick={() => { setNavTab('dashboard'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-5 h-5 shrink-0" />
                {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">Dashboard Pantauan</span>}
              </button>

              <button
                onClick={() => { setNavTab('laporan'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'laporan'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <FileSpreadsheet className="w-5 h-5 shrink-0" />
                {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">Laporan IKU Unit</span>}
              </button>


              <button
                onClick={() => { setNavTab('rekap_absensi'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'rekap_absensi'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <UserCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">Presensi & Absensi</span>}
                </div>
                {(isSidebarExpanded || isMobileMenuOpen) && (
                  <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full">
                    {rekapAbsensiList.length} Absen
                  </span>
                )}
              </button>

              <a
                href="https://tahfidh-chi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-amber-400 hover:text-white hover:bg-amber-950/40 border border-amber-500/20 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BookOpen className="w-5 h-5 text-amber-400 group-hover:scale-110 transition shrink-0" />
                  {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">Monitoring Hafalan</span>}
                </div>
              </a>

              <button
                onClick={() => { setNavTab('monitoring_kebersihan'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'monitoring_kebersihan'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ClipboardCheck className="w-5 h-5 shrink-0" />
                  {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">Monitoring Kebersihan</span>}
                </div>
              </button>

              <button
                onClick={() => {
                  setNavTab('pelanggaran');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'pelanggaran'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  {(isSidebarExpanded || isMobileMenuOpen) && (
                    <span className="truncate">Pelanggaran Santri</span>
                  )}
                </div>
              </button>
              
              {/* Tombol Menu Pengaturan Master Data */}
              <button
                onClick={() => { setNavTab('pengaturan'); setIsMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'pengaturan'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Settings className="w-5 h-5 text-indigo-400 shrink-0" />
                {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">Kelola Divisi, IKU & Program</span>}
              </button>
            </div>

            {/* Group 2: Divisi Unit Kerja */}
            <div className="space-y-1">
              {(isSidebarExpanded || isMobileMenuOpen) && (
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 pb-1">
                  DIVISI KERJA (IKU)
                </div>
              )}
              {divisions.map(div => {
                const isActive = navTab === 'ceklis' && activeDivisionId === div.id;
                return (
                  <button
                    key={div.id}
                    onClick={() => {
                      setActiveDivisionId(div.id);
                      setNavTab('ceklis');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-slate-800 text-blue-400 font-bold border border-blue-500/30 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">{div.name}</span>}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Footer User Info */}
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                AD
              </div>
              {(isSidebarExpanded || isMobileMenuOpen) && (
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate">Administrator</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">Akses Penuh</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </aside>

      {/* MAIN CONTENT WORKSPACE */}
      <main className={`flex-1 min-w-0 h-screen overflow-y-auto transition-all duration-300 pb-24 ml-0 ${
          isSidebarExpanded ? 'md:ml-72' : 'md:ml-20' }`}
        
      >
        {/* Mobile Top Navigation Header */}
        <div className="md:hidden sticky top-0 z-30 bg-[#0b132b] text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shadow-md">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-400 p-1.5 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs truncate">PTYQ 1 PUTRA SMP</div>
              <div className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold truncate">
                {navTab === 'dashboard' ? 'Dashboard Pantauan' : navTab === 'laporan' ? 'Laporan IKU' : navTab === 'monitoring_kebersihan' ? 'Monitoring Kebersihan' : navTab === 'rekap_absensi' ? 'Presensi' : activeDivision.name}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="p-2.5 sm:p-6 lg:p-8 space-y-3.5 sm:space-y-6 max-w-full overflow-x-hidden">
        </div>
          {}
          {navTab === 'ceklis' && (
            <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
              
              {/* Header & Filter Ringkas 1 Baris (Responsif Mobile) */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate">
                    Divisi {activeDivision.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                    Koordinator: <strong className="text-slate-700">{activeDivision.coordinator_name || 'Belum diatur'}</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2.5 w-full md:w-auto">
                  {/* Timeframe Selector Pills */}
                  <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
                    {(['Harian', 'Mingguan', 'Bulanan', 'Tahunan'] as TimeframeCategory[]).map(tf => (
                      <button
                        key={tf}
                        onClick={() => setActiveTimeframe(tf)}
                        className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                          activeTimeframe === tf
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>

                  {/* Dropdown Pemilihan Program & Tombol Reload */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                      value={selectedTemplateId ?? ''}
                      onChange={(e) => setSelectedTemplateId(Number(e.target.value))}
                      disabled={activePrograms.length === 0}
                      className="flex-1 sm:flex-initial bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-xs truncate cursor-pointer disabled:opacity-50"
                    >
                      {activePrograms.length === 0 ? (
                        <option value="">(Tidak ada program {activeTimeframe})</option>
                      ) : (
                        activePrograms.map(p => {
                          const subCount = submissions.filter(s => s.template_id === p.id).length;
                          return (
                            <option key={p.id} value={p.id}>
                              {p.title} ({subCount} data)
                            </option>
                          );
                        })
                      )}
                    </select>

                    <button
                      onClick={fetchSupabaseData}
                      disabled={isLoading}
                      title="Muat Ulang Data"
                      className="p-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 shadow-2xs transition shrink-0"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {activePrograms.length === 0 && (
                <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-300 text-xs text-slate-400">
                  Belum ada program kegiatan yang terdaftar pada timeframe {activeTimeframe}. Silakan tambahkan melalui menu <strong>Kelola Divisi, IKU & Program</strong>.
                </div>
              )}

              {/* Sub-Tab Navigasi (Input, Riwayat, Hasil, Customize) */}
              {selectedTemplate && (
                <div className="space-y-4 sm:space-y-6">
                  
                  <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 overflow-hidden">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                      <button
                        onClick={() => setActiveSubTab('input')}
                        className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 ${
                          activeSubTab === 'input'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <ClipboardCheck className="w-4 h-4" /> Form Ceklis
                      </button>

                      <button
                        onClick={() => setActiveSubTab('riwayat')}
                        className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 ${
                          activeSubTab === 'riwayat'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <History className="w-4 h-4" /> Riwayat ({programSubmissions.length})
                      </button>

                      <button
                        onClick={() => setActiveSubTab('hasil')}
                        className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 ${
                          activeSubTab === 'hasil'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <TrendingUp className="w-4 h-4" /> Hasil Realisasi
                      </button>

                      <button
                        onClick={() => setActiveSubTab('customize')}
                        className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 sm:gap-2 ${
                          activeSubTab === 'customize'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Layers className="w-4 h-4" /> Customize Form
                      </button>
                    </div>

                    {selectedIKU && (
                      <span className="hidden lg:inline-flex text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-xl border border-slate-200 truncate">
                        {selectedIKU.kode_iku}: {selectedIKU.title}
                      </span>
                    )}
                  </div>

                  {/* TAB 1: FORM INPUT CEKLIS */}
                  {activeSubTab === 'input' && (
                    <form onSubmit={handleSubmitCeklis} className="space-y-4 sm:space-y-6">
                      
                      {/* Box Informasi Pengawasan (Tampil sesuai centangan customize) */}
                      {hasAnyPengawasFieldActive && (
                        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                            Informasi Pengawasan & Guru Terkait
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {}
                            {currentPengawasConfig.pj && (() => {
                              const detail = currentFieldDetails.pj;
                              return (
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    {detail.label}:
                                  </label>
                                  {detail.type === 'dropdown' ? (
                                    <select 
                                      value={formPetugas} 
                                      onChange={(e) => setFormPetugas(e.target.value)} 
                                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                      <option value="">-- Pilih --</option>
                                      {safeParseOptions(detail.options).map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                      {/* Opsi default fallback guru */}
                                      {detail.options.length === 0 && guruList.map(g => (
                                        <option key={g.id} value={g.nama_guru}>{g.nama_guru}</option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input 
                                      type="text" 
                                      value={formPetugas} 
                                      onChange={(e) => setFormPetugas(e.target.value)} 
                                      placeholder={`Masukkan ${detail.label}...`}
                                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    />
                                  )}
                                </div>
                              );
                            })()}

                            {currentPengawasConfig.guru && (
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                  {currentFieldDetails.guru?.label || 'Ustadz'}:
                                </label>
                                <input type="text" value={formGuru} onChange={(e) => setFormGuru(e.target.value)} placeholder="Masukkan nama ustadz..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                            )}
                            
                            {currentPengawasConfig.mapel && (
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                  {currentFieldDetails.mapel?.label || 'Tempat'}:
                                </label>
                                <input type="text" value={formMapel} onChange={(e) => setFormMapel(e.target.value)} placeholder="Masukkan tempat..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                            )}
                            
                            {currentPengawasConfig.kelas && (
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                  {currentFieldDetails.kelas?.label || 'Tanggal'}:
                                </label>
                                {/* Input type diubah menjadi date agar muncul kalender */}
                                <input type="date" value={formKelas} onChange={(e) => setFormKelas(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
                              </div>
                            )}
                            
                            {currentPengawasConfig.jam && (
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                  {currentFieldDetails.jam?.label || 'Pengampu/Pemimpin'}:
                                </label>
                                <input type="text" value={formJam} onChange={(e) => setFormJam(e.target.value)} placeholder="Masukkan nama pemimpin..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                            )}
                            
                            {currentPengawasConfig.absen && (
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                  {currentFieldDetails.absen?.label || 'Keterangan'}:
                                </label>
                                <input type="text" value={formSiswaAbsen} onChange={(e) => setFormSiswaAbsen(e.target.value)} placeholder="Tambahkan keterangan..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Sections & Checklist Items */}
                      {templateSections.length === 0 ? (
                        <div className="bg-white rounded-3xl p-8 sm:p-10 text-center border border-dashed border-slate-300">
                          <p className="text-xs text-slate-400">
                            Belum ada instrumen ceklis untuk kegiatan ini. Klik tab <strong>Customize Form</strong> untuk membuat indikator.
                          </p>
                        </div>
                      ) : (
                        templateSections.map(sec => {
                          const secItems = getSectionItems(sec.id);
                          const isPositif = (sectionTypeMap[sec.id] || (sec as any).section_type) === 'positif';

                          return (
                            <div key={sec.id} className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                  <span className={`w-2.5 h-2.5 rounded-full ${isPositif ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                  <span>{sec.name}</span>
                                  <span className="text-[10px] font-normal text-slate-400">
                                    ({secItems.length} Indikator)
                                  </span>
                                </h4>

                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                  isPositif
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}>
                                  {isPositif ? 'Tipe Positif (Terlaksana)' : 'Tipe Negatif (Temuan)'}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                                {secItems.map(it => {
                                  const inputType = it.input_type || 'checkbox';
                                  const isChecked = !!checkedItems[it.id];

                                  if (inputType === 'text') {
                                    return (
                                      <div key={it.id} className="p-3 rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                        <input
                                          type="text"
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          placeholder="Ketik jawaban..."
                                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  if (inputType === 'textarea') {
                                    return (
                                      <div key={it.id} className="sm:col-span-2 p-3 rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                        <textarea
                                          rows={2}
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          placeholder="Tulis uraian lengkap..."
                                          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  if (inputType === 'number') {
                                    return (
                                      <div key={it.id} className="p-3 rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                        <input
                                          type="number"
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          placeholder="0"
                                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  if (inputType === 'select') {
                                    const optionsList = safeParseOptions(it.options);
                                    return (
                                      <div key={it.id} className="p-3 rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                        <select
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium"
                                        >
                                          <option value="">Pilih Opsi...</option>
                                          {optionsList.map((opt: string) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                          ))}
                                        </select>
                                      </div>
                                    );
                                  }

                                  if (inputType === 'radio') {
                                    const radioOptions = safeParseOptions(it.options);
                                    return (
                                      <div key={it.id} className="p-3 rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-2">
                                        <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                        <div className="flex flex-wrap gap-2">
                                          {radioOptions.map((opt: string) => {
                                            const isSelected = formAnswers[it.id] === opt;
                                            return (
                                              <label
                                                key={opt}
                                                className={`px-3 py-1.5 rounded-xl border text-xs font-medium cursor-pointer transition select-none ${
                                                  isSelected
                                                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                                                }`}
                                              >
                                                <input
                                                  type="radio"
                                                  name={`radio-${it.id}`}
                                                  value={opt}
                                                  checked={isSelected}
                                                  onChange={() => setFormAnswers({ ...formAnswers, [it.id]: opt })}
                                                  className="hidden"
                                                />
                                                <span>{opt}</span>
                                              </label>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    );
                                  }

                                  if (inputType === 'date') {
                                    return (
                                      <div key={it.id} className="p-3 rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5">
                                        <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                        <input
                                          type="date"
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  return (
                                    <label
                                      key={it.id}
                                      className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition select-none ${
                                        isChecked
                                          ? isPositif
                                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                                            : 'bg-rose-50/80 border-rose-200 text-rose-950'
                                          : 'bg-slate-50/70 border-slate-200/70 text-slate-700 hover:bg-slate-100/70'
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => setCheckedItems({ ...checkedItems, [it.id]: e.target.checked })}
                                        className={`mt-0.5 rounded cursor-pointer ${
                                          isPositif
                                            ? 'text-emerald-600 focus:ring-emerald-500'
                                            : 'text-rose-600 focus:ring-rose-500'
                                        }`}
                                      />
                                      <span className="text-xs font-semibold leading-relaxed">
                                        {it.item_text}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })
                      )}

                      {/* Catatan Form & Submit Bar */}
                      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Catatan Tambahan / Rekomendasi:
                        </label>
                        <textarea
                          rows={3}
                          value={formCatatan}
                          onChange={(e) => setFormCatatan(e.target.value)}
                          placeholder="Tuliskan temuan atau catatan evaluasi lainnya..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                          <div className="flex items-center justify-between sm:justify-start gap-3">
                            <span className="text-xs text-slate-500 font-semibold">
                              Skor Terkalkulasi:
                            </span>
                            <span className="font-mono font-bold text-sm sm:text-base text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                              {currentFormScore.percentage}% ({currentFormScore.scale3} / 3.0)
                            </span>
                          </div>

                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center justify-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Simpan Laporan Ceklis
                          </button>
                        </div>
                      </div>

                    </form>
                  )}

                  {/* TAB 2: RIWAYAT INPUT */}
                  {activeSubTab === 'riwayat' && (
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Log Riwayat Pengawasan ({programSubmissions.length} Data)
                        </h4>
                        <button
                          onClick={() => window.print()}
                          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5" /> Cetak
                        </button>
                      </div>

                      {programSubmissions.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 text-xs italic">
                          Belum ada data riwayat pengisian untuk program ini.
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            {/* ===== HEADER TABEL DINAMIS ===== */}
                            {/* ===== HEADER TABEL DINAMIS ===== */}
                            <thead>
                              <tr className="bg-slate-50/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                                <th className="py-3 px-4 w-12 text-center">NO</th>
                                <th className="py-3 px-4 min-w-[130px]">WAKTU</th>
                                
                                {/* Kolom PJ (Muncul jika dicentang) */}
                                {currentPengawasConfig.pj && (
                                  <th className="py-3 px-4 min-w-[150px]">{currentFieldDetails.pj?.label?.toUpperCase() || 'PETUGAS (PJ)'}</th>
                                )}
                                
                                <th className="py-3 px-4 min-w-[200px]">PROGRAM</th>
                                
                                {/* Kolom Ustadz (Muncul jika dicentang) */}
                                {currentPengawasConfig.guru && (
                                  <th className="py-3 px-4 min-w-[150px]">{currentFieldDetails.guru?.label?.toUpperCase() || 'USTADZ'}</th>
                                )}
                                
                                {/* Kolom Pemimpin (Muncul jika dicentang) */}
                                {currentPengawasConfig.jam && (
                                  <th className="py-3 px-4 min-w-[130px]">{currentFieldDetails.jam?.label?.toUpperCase() || 'PENGAMPU/PEMIMPIN'}</th>
                                )}
                                
                                {/* Kolom Tempat & Tanggal (Muncul jika salah satu atau keduanya dicentang) */}
                                {(currentPengawasConfig.mapel || currentPengawasConfig.kelas) && (
                                  <th className="py-3 px-4 min-w-[160px]">
                                    {currentPengawasConfig.mapel ? (currentFieldDetails.mapel?.label?.toUpperCase() || 'TEMPAT') : ''}
                                    {currentPengawasConfig.mapel && currentPengawasConfig.kelas ? ' & ' : ''}
                                    {currentPengawasConfig.kelas ? (currentFieldDetails.kelas?.label?.toUpperCase() || 'TANGGAL') : ''}
                                  </th>
                                )}
                                
                                {/* Kolom Keterangan (Muncul jika dicentang) */}
                                {currentPengawasConfig.absen && (
                                  <th className="py-3 px-4 min-w-[140px]">{currentFieldDetails.absen?.label?.toUpperCase() || 'KETERANGAN'}</th>
                                )}
                                
                                <th className="py-3 px-4 text-center min-w-[90px]">SKOR</th>
                                <th className="py-3 px-5 min-w-[200px]">CATATAN</th>
                                <th className="py-3 px-4 text-center min-w-[80px]">AKSI</th>
                              </tr>
                            </thead>
                            
                            {/* ===== ISI TABEL (DATA) ===== */}
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                              {programSubmissions.map((sub, idx) => (
                                <tr key={sub.id} onClick={() => handleOpenSubmissionDetail(sub)} className="hover:bg-blue-50/60 transition-colors cursor-pointer group" >
                                  <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                                  <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                                    {String(sub.submission_date || sub.created_at || '').slice(0, 16)}
                                  </td>
                                  
                                  {/* Isi Kolom PJ */}
                                  {currentPengawasConfig.pj && (
                                    <td className="py-3 px-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                      {sub.pj_name}
                                    </td>
                                  )}
                                  
                                  <td className="py-3 px-4 text-slate-800 font-medium">
                                    <div className="line-clamp-2 text-[11px]" title={selectedTemplate?.title}>
                                      {selectedTemplate?.title || '-'}
                                    </div>
                                  </td>
                                  
                                  {/* Isi Kolom Ustadz */}
                                  {currentPengawasConfig.guru && (
                                    <td className="py-3 px-4 text-slate-700">{sub.target_person || '-'}</td>
                                  )}
                                  
                                  {/* Isi Kolom Pemimpin */}
                                  {currentPengawasConfig.jam && (
                                    <td className="py-3 px-4 text-slate-700">{sub.target_time_slot || '-'}</td>
                                  )}
                                  
                                  {/* Isi Kolom Tempat & Tanggal */}
                                  {(currentPengawasConfig.mapel || currentPengawasConfig.kelas) && (
                                    <td className="py-3 px-4 font-medium text-slate-800">
                                      {currentPengawasConfig.mapel ? ((!sub.target_subject || sub.target_subject === selectedTemplate?.title) ? '-' : sub.target_subject) : ''}
                                      {currentPengawasConfig.mapel && currentPengawasConfig.kelas ? ' (' : ''}
                                      {currentPengawasConfig.kelas ? (sub.target_class || '-') : ''}
                                      {currentPengawasConfig.mapel && currentPengawasConfig.kelas ? ')' : ''}
                                    </td>
                                  )}
                                  
                                  {/* Isi Kolom Keterangan */}
                                  {currentPengawasConfig.absen && (
                                    <td className="py-3 px-4 text-rose-600 font-semibold">
                                      {String(sub.absent_students ?? 'Nihil')}
                                    </td>
                                  )}
                                  
                                  <td className="py-3 px-4 text-center">
                                    <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                                      {getSubmissionPercentage(sub)}%
                                    </span>
                                  </td>
                                  <td className="py-3 px-5 text-slate-500 text-[11px] italic truncate max-w-xs">
                                    {sub.general_notes || '-'}
                                  </td>
                                  <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => handleOpenSubmissionDetail(sub)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition shadow-2xs" title="Lihat Detail Hasil Pengawasan" >
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Detail</span>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: HASIL REALISASI TARGET */}
                  {activeSubTab === 'hasil' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          TARGET RESMI IKU
                        </span>
                        <div className="text-3xl font-black text-slate-900">
                          {selectedTemplate.target_teks || (selectedTemplate.target ? `${selectedTemplate.target}%` : '100%')}
                        </div>
                        <p className="text-xs text-slate-400">Target indikator kinerja utama divisi</p>
                      </div>

                      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          REALISASI TERCAPAI
                        </span>
                        <div className="text-3xl font-black text-blue-600">
                          {getProgramRealisasi(selectedTemplate)}
                        </div>
                        <p className="text-xs text-slate-400">Rata-rata kepatuhan dari {programSubmissions.length} sesi</p>
                      </div>

                      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          KETERISIAN DATA
                        </span>
                        <div className="text-3xl font-black text-emerald-600">
                          {programSubmissions.length} Laporan
                        </div>
                        <p className="text-xs text-slate-400">Total formulir ceklis berhasil diinput</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CUSTOMIZE FORM */}
                  {activeSubTab === 'customize' && (
                    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-6">

                      {/* ===== KODE BARU: PENGATURAN BENTUK TARGET REALISASI ===== */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                        <div>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                            {/* Anda bisa mengganti ikon ini dengan ikon chart/bar yang sesuai */}
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            Pengaturan Bentuk Target Realisasi
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Pilih apakah hasil akhir target realisasi pada program ini ditampilkan dalam bentuk Persentase (%) atau Count (Hitungan Frekuensi Pengisian).
                          </p>
                        </div>
                        
                        <div className="pt-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            Pilih Bentuk Target Realisasi:
                          </label>
                          <select 
                          // Gunakan nilai dari database jika ada, jika tidak gunakan state fallback
                          value={selectedTemplate?.target_format || targetFormat} 
                          onChange={(e) => {
                            const newValue = e.target.value as 'persentase' | 'count';
                            // Panggil fungsi update yang sudah kita buat jika ada template yang sedang dipilih
                            if (selectedTemplate?.id) {
                              updateTargetFormat(selectedTemplate.id, newValue);
                            } else {
                              // Jika karena suatu hal tidak ada id, sekadar update state lokal
                              setTargetFormat(newValue);
                            }
                          }}
                          className="w-full sm:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="persentase">Persentase (%)</option>
                          <option value="count">Count (Hitungan Berapa Kali Diisi)</option>
                          </select>
                        </div>
                      </div>
                      {/* ========================================================= */}
                      
                      {/* Panel Centangan Modul Informasi Pengawasan */}
                      <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-blue-600" />
                              Pengaturan Kolom Informasi Pengawasan
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Centang modul yang ingin ditampilkan pada form kegiatan ini
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setAllPengawasFields(selectedTemplate.id, true)}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline"
                            >
                              Centang Semua
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => setAllPengawasFields(selectedTemplate.id, false)}
                              className="text-[10px] font-bold text-slate-500 hover:text-slate-700 underline"
                            >
                              Kosongkan Semua
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
                        {[
                          { key: 'pj', defaultLabel: 'Petugas (PJ)' },
                          { key: 'guru', defaultLabel: 'Ustadz' },
                          { key: 'mapel', defaultLabel: 'Tempat' },
                          { key: 'kelas', defaultLabel: 'Tanggal' },
                          { key: 'jam', defaultLabel: 'Pengampu/Pemimpin' },
                          { key: 'absen', defaultLabel: 'Keterangan' }
                        ].map(f => {
                          
                            const fieldKey = f.key as PengawasFieldKey;
                            const isChecked = currentPengawasConfig[fieldKey];
                            const fieldDetail = currentFieldDetails[fieldKey] || DEFAULT_FIELD_DETAILS[fieldKey];
                          
                            return (
                              <div key={f.key} className={`relative flex items-center justify-between p-3 rounded-xl border transition ${isChecked ? 'bg-white border-blue-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                                <label className="flex items-center gap-3 cursor-pointer select-none flex-1">
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked} 
                                    onChange={() => togglePengawasField(selectedTemplate!.id, fieldKey)} 
                                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" 
                                  />
                                  <div className="flex flex-col">
                                    <span className={`text-xs font-bold ${isChecked ? 'text-blue-900' : 'text-slate-500'}`}>{fieldDetail.label || f.defaultLabel}</span>
                                    {isChecked && (
                                      <span className="text-[10px] text-slate-400 mt-0.5">Tipe: {fieldDetail.type === 'dropdown' ? 'Dropdown Pilihan' : 'Teks Singkat'}</span>
                                    )}
                                  </div>
                                </label>
                                
                                {/* Tombol Edit (Hanya aktif jika dicentang) */}
                                {isChecked && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setEditFieldKey(fieldKey);
                                      setEditFieldForm(fieldDetail);
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Header Pengaturan Kategori */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="text-sm font-black text-slate-900">Pengaturan Kategori & Indikator</h4>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Sesuaikan butir ceklis untuk program "{selectedTemplate.title}"
                          </p>
                        </div>
                      </div>

                      {/* Tambah Section / Kategori Baru (Dengan Pilihan Positif / Negatif) */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={newSectionName}
                          onChange={(e) => setNewSectionName(e.target.value)}
                          placeholder="Nama Kategori Baru (misal: Kebersihan, Ketertiban)..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800"
                        />
                        <select
                          value={newSectionType}
                          onChange={(e) => setNewSectionType(e.target.value as 'positif' | 'negatif')}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700"
                        >
                          <option value="negatif">🔴 Tipe Negatif (Temuan/Pelanggaran)</option>
                          <option value="positif">🟢 Tipe Positif (Keterlaksanaan/Standar)</option>
                        </select>
                        <button
                          onClick={handleAddSection}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Plus className="w-4 h-4" /> Tambah Kategori
                        </button>
                      </div>

                      {/* List Sections */}
                      <div className="space-y-4 pt-2">
                        {templateSections.map(sec => {
                          const secItems = getSectionItems(sec.id);
                          const isPositif = (sectionTypeMap[sec.id] || (sec as any).section_type) === 'positif';

                          return (
                            <div key={sec.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className={`w-2 h-2 rounded-full shrink-0 ${isPositif ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                  <span className="font-bold text-xs text-slate-800 truncate">
                                    {sec.name}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    ({secItems.length} Indikator)
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <select
                                    value={isPositif ? 'positif' : 'negatif'}
                                    onChange={(e) => updateSectionType(sec.id, e.target.value as 'positif' | 'negatif')}
                                    className={`text-[10px] font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                                      isPositif
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                        : 'bg-rose-50 border-rose-300 text-rose-700'
                                    }`}
                                  >
                                    <option value="negatif">🔴 Negatif (Dicentang jika bermasalah)</option>
                                    <option value="positif">🟢 Positif (Dicentang jika terlaksana)</option>
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSection(sec.id, sec.name)}
                                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition border border-rose-200/80 bg-white shadow-2xs"
                                    title={`Hapus kategori "${sec.name}" beserta seluruh indikator di dalamnya`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {secItems.map(it => (
                                  <div key={it.id} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span className="font-medium text-slate-700 truncate">{it.item_text}</span>
                                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                                        {it.input_type === 'text' ? 'Teks Singkat' :
                                         it.input_type === 'number' ? 'Angka' :
                                         it.input_type === 'textarea' ? 'Uraian' :
                                         it.input_type === 'select' ? 'Dropdown' :
                                         it.input_type === 'radio' ? 'Radio' :
                                         it.input_type === 'date' ? 'Tanggal' : 'Ceklis'}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteItem(it.id)}
                                      className="text-rose-500 hover:text-rose-700 p-1 shrink-0"
                                      title="Hapus Indikator"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {newItemSectionId === sec.id ? (
                                <div className="p-3 bg-white border border-slate-200 rounded-2xl space-y-2.5 pt-2">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                      type="text"
                                      value={newItemText}
                                      onChange={(e) => setNewItemText(e.target.value)}
                                      placeholder={isPositif ? "Teks standar / nama indikator..." : "Teks temuan / pelanggaran..."}
                                      className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <select
                                      value={newItemInputType}
                                      onChange={(e) => setNewItemInputType(e.target.value)}
                                      className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                      <option value="checkbox">☑️ Ceklis (Checkbox)</option>
                                      <option value="text">📝 Teks Singkat</option>
                                      <option value="textarea">📄 Uraian (Textarea)</option>
                                      <option value="number">🔢 Angka / Nilai</option>
                                      <option value="select">🔽 Pilihan Dropdown</option>
                                      <option value="radio">🔘 Pilihan Radio</option>
                                      <option value="date">📅 Tanggal</option>
                                    </select>
                                  </div>

                                  {(newItemInputType === 'select' || newItemInputType === 'radio') && (
                                    <div>
                                      <input
                                        type="text"
                                        value={newItemOptions}
                                        onChange={(e) => setNewItemOptions(e.target.value)}
                                        placeholder="Ketik opsi pilihan pisahkan dengan koma (contoh: Sangat Baik, Baik, Cukup, Kurang)"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                      <p className="text-[10px] text-slate-400 mt-1 italic">
                                        * Pisahkan tiap pilihan dengan tanda koma (,).
                                      </p>
                                    </div>
                                  )}

                                  <div className="flex justify-end gap-2 pt-1 border-t border-slate-100">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNewItemSectionId(null);
                                        setNewItemText('');
                                        setNewItemInputType('checkbox');
                                        setNewItemOptions('');
                                      }}
                                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                                    >
                                      Batal
                                    </button>
                                    <button
                                      onClick={() => handleAddItem(sec.id)}
                                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
                                    >
                                      Simpan
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setNewItemSectionId(sec.id);
                                    setNewItemText('');
                                    setNewItemInputType('checkbox');
                                    setNewItemOptions('');
                                  }}
                                  className="w-full py-2 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1.5 transition"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Tambah Indikator Baru
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {}
         {/* TAB: MONITORING KEBERSIHAN NATIVE */}
          {navTab === 'monitoring_kebersihan' && (
            <div className="max-w-7xl mx-auto w-full space-y-4">
              
              {/* Header E-Kebersihan & Tab Navigasi Lengkap */}
              <div className="bg-emerald-700 rounded-3xl p-4 sm:p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-white text-emerald-700 p-2 sm:p-3 rounded-xl shadow-inner flex-shrink-0">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold tracking-tight leading-none">E-Kebersihan Asrama</h1>
                    <p className="text-xs text-emerald-100 mt-1">Sistem Kontrol Ketidakbersihan Kamar Santri</p>
                  </div>
                </div>
                
                {/* Tombol Sub-Tab Lengkap */}
                <div className="flex bg-emerald-800/50 backdrop-blur-md p-1 rounded-2xl overflow-x-auto scrollbar-none border border-emerald-600/50">
                  <button
                    onClick={() => setKebersihanSubTab('dashboard')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      kebersihanSubTab === 'dashboard' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setKebersihanSubTab('input')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      kebersihanSubTab === 'input' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Input Laporan
                  </button>
                  <button
                    onClick={() => setKebersihanSubTab('riwayat')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      kebersihanSubTab === 'riwayat' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Riwayat Input
                  </button>
                  <button
                    onClick={() => setKebersihanSubTab('rekap')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      kebersihanSubTab === 'rekap' ? 'bg-white text-emerald-700 shadow-sm' : 'text-emerald-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Laporan Rekap
                  </button>
                </div>
              </div>

             {/* === KONTEN 1: DASHBOARD === */}
            {kebersihanSubTab === 'dashboard' && (
              <div className="space-y-4">
                {/* Filter Analytics Kebersihan (Hari Ini, Bulan, Rentang) */}
                <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-slate-200 flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <History className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs uppercase">Filter Waktu</h4>
                      <p className="text-[10px] text-slate-400">Rentang data dashboard</p>
                    </div>
                  </div>
                
                  <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                    {/* Opsi Tab Mode Filter */}
                    <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => setKebersihanFilterMode('hari_ini')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${kebersihanFilterMode === 'hari_ini' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Hari Ini
                      </button>
                      <button
                        onClick={() => setKebersihanFilterMode('bulan')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${kebersihanFilterMode === 'bulan' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Bulan
                      </button>
                      <button
                        onClick={() => setKebersihanFilterMode('rentang')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${kebersihanFilterMode === 'rentang' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        Rentang Waktu
                      </button>
                    </div>
                
                    {/* Input Dinamis Berdasarkan Mode yang Dipilih */}
                    <div className="flex-1 w-full flex items-center justify-end gap-3">
                      
                      {/* Tampilan jika Hari Ini */}
                      {kebersihanFilterMode === 'hari_ini' && (
                        <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold w-full sm:w-auto text-center">
                          {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      )}
                
                      {/* Tampilan jika Pemilihan Bulan */}
                      {kebersihanFilterMode === 'bulan' && (
                        <input
                          type="month"
                          value={kebersihanBulan}
                          onChange={(e) => setKebersihanBulan(e.target.value)}
                          className="w-full sm:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                        />
                      )}
                
                      {/* Tampilan jika Rentang Waktu */}
                      {kebersihanFilterMode === 'rentang' && (
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="date"
                            value={kebersihanStartDate}
                            onChange={(e) => setKebersihanStartDate(e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span className="text-slate-400 font-bold">-</span>
                          <input
                            type="date"
                            value={kebersihanEndDate}
                            onChange={(e) => setKebersihanEndDate(e.target.value)}
                            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                    {/* Stat Cards (Sesuai Desain UI Baru) */}
{(() => {
  // Hitung jumlah pelanggaran per kamar
  const kamarStats: Record<string, number> = {};
  filteredLaporanKebersihan.forEach(item => {
    kamarStats[item.kamar] = (kamarStats[item.kamar] || 0) + 1;
  });

  let maxKamar = '-';
  let maxPelanggaran = 0;
  let minKamar = '-';
  let isBebasPelanggaran = true;

  // Cari kamar paling sering kotor
  Object.entries(kamarStats).forEach(([kamar, jumlah]) => {
    if (jumlah > maxPelanggaran) {
      maxPelanggaran = jumlah;
      maxKamar = kamar;
    }
  });

  // Cari kamar terbersih (tidak ada di data pelanggaran atau paling sedikit)
  const kamarBersihList = kamarList.filter(k => !kamarStats[k.nama_kamar]);
  if (kamarBersihList.length > 0) {
    minKamar = kamarBersihList[0].nama_kamar;
  } else if (kamarList.length > 0) {
    let minPelanggaran = Infinity;
    Object.entries(kamarStats).forEach(([kamar, jumlah]) => {
      if (jumlah < minPelanggaran) {
        minPelanggaran = jumlah;
        minKamar = kamar;
      }
    });
    isBebasPelanggaran = minPelanggaran === 0;
  }

  // Hitung persentase Rata-Rata Kebersihan seluruh kamar
  const asumsiTotalHari = 31;
  const totalKamar = kamarList.length || 1;
  let totalPersentase = 0;
  kamarList.forEach(k => {
    const kasus = kamarStats[k.nama_kamar] || 0;
    const persentase = Math.max(0, ((asumsiTotalHari - kasus) / asumsiTotalHari) * 100);
    totalPersentase += persentase;
  });
  const rataRataKebersihan = (totalPersentase / totalKamar).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Kartu 1: Total Kasus Kotor */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Total Kasus Kotor</p>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-none">{filteredLaporanKebersihan.length}</h3>
        </div>
      </div>

      {/* Kartu 2: Kamar Paling Sering */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">Kamar Paling Sering</p>
          <div className="flex flex-col items-start gap-1.5">
            <h3 className="text-xl font-black text-slate-800 leading-none">{maxKamar}</h3>
            <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md">{maxPelanggaran} Pelanggaran</span>
          </div>
        </div>
      </div>

      {/* Kartu 3: Kamar Terbersih */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
            <path d="M4 22h16"/>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">Kamar Terbersih</p>
          <div className="flex flex-col items-start gap-1.5">
            <h3 className="text-xl font-black text-slate-800 leading-none">{minKamar}</h3>
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">{isBebasPelanggaran ? 'Bebas Pelanggaran' : 'Min. Pelanggaran'}</span>
          </div>
        </div>
      </div>

      {/* Kartu 4: Rata-rata Kebersihan */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <line x1="19" x2="5" y1="5" y2="19"></line>
            <circle cx="6.5" cy="6.5" r="2.5"></circle>
            <circle cx="17.5" cy="17.5" r="2.5"></circle>
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Rata-Rata Kebersihan</p>
          <h3 className="text-xl sm:text-2xl font-black text-blue-600 leading-none">{rataRataKebersihan}%</h3>
        </div>
      </div>

    </div>
  );
})()}

                  {/* ================= GRAFIK STATISTIK (NATIVE) ================= */}
      {(() => {
        // 1. Proses Data untuk Bar Chart (Kasus per Kamar)
        const kamarChartData = (() => {
          const stats: Record<string, number> = {};
          filteredLaporanKebersihan.forEach(item => {
            stats[item.kamar] = (stats[item.kamar] || 0) + 1;
          });
          // Mengurutkan nomor kamar secara numerik agar rapi
          return Object.entries(stats)
            .map(([kamar, total]) => ({ kamar, total }))
            .sort((a, b) => {
              const numA = parseInt(a.kamar.replace(/\D/g, '')) || 0;
              const numB = parseInt(b.kamar.replace(/\D/g, '')) || 0;
              return numA - numB;
            });
        })();

        // Cari batas nilai tertinggi Y-Axis untuk chart (minimal 5 jika kosong)
        const maxChartBar = Math.max(...kamarChartData.map(d => d.total), 5); 

        // 2. Proses Data untuk Donut Chart (Kategori Pelanggaran)
        const kategoriChartData = (() => {
          let sampah = 0, pakaian = 0, kasur = 0, lantai = 0, lain = 0;
          
          filteredLaporanKebersihan.forEach(item => {
            const ket = String(item.keterangan || '').toLowerCase();
            if (ket.includes('sampah') || ket.includes('plastik') || ket.includes('kotoran')) sampah++;
            else if (ket.includes('pakaian') || ket.includes('baju') || ket.includes('sarung') || ket.includes('handuk') || ket.includes('tas') || ket.includes('lemari')) pakaian++;
            else if (ket.includes('kasur') || ket.includes('ranjang') || ket.includes('bantal') || ket.includes('selimut')) kasur++;
            else if (ket.includes('lantai') || ket.includes('sapu') || ket.includes('debu') || ket.includes('teras')) lantai++;
            else lain++;
          });

          const total = sampah + pakaian + kasur + lantai + lain || 1; // Cegah pembagian 0

          return {
            sampah: { count: sampah, pct: (sampah / total) * 100, color: '#f59e0b' }, // Amber/Orange
            pakaian: { count: pakaian, pct: (pakaian / total) * 100, color: '#3b82f6' }, // Biru
            kasur: { count: kasur, pct: (kasur / total) * 100, color: '#ec4899' }, // Pink
            lantai: { count: lantai, pct: (lantai / total) * 100, color: '#10b981' }, // Hijau
            lain: { count: lain, pct: (lain / total) * 100, color: '#94a3b8' } // Abu-abu
          };
        })();

        // Kalkulasi sudut background donut chart (menggunakan conic-gradient CSS)
        let accumulatedPct = 0;
        const gradientStops = Object.values(kategoriChartData).map(cat => {
          const start = accumulatedPct;
          accumulatedPct += cat.pct;
          return `${cat.color} ${start}% ${accumulatedPct}%`;
        }).join(', ');
        
        const donutStyle = { background: `conic-gradient(${gradientStops})` };

        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* --- KARTU BAR CHART (KIRI) --- */}
            <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col">
              <h4 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-600">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                Kasus Ketidakbersihan Per Kamar
              </h4>
              
              <div className="relative flex-1 min-h-[260px] w-full overflow-x-auto overflow-y-hidden pb-8 pt-2">
                {/* Label Y-Axis & Garis Latar */}
                <div className="absolute left-0 top-2 bottom-12 w-6 flex flex-col justify-between text-[10px] font-bold text-slate-400 text-right pr-2">
                  <span>{maxChartBar}</span>
                  <span>{Math.ceil(maxChartBar * 0.75)}</span>
                  <span>{Math.ceil(maxChartBar * 0.5)}</span>
                  <span>{Math.ceil(maxChartBar * 0.25)}</span>
                  <span>0</span>
                </div>
                
                <div className="absolute left-6 right-0 top-2 bottom-12 flex flex-col justify-between pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-b border-slate-100 w-full h-0"></div>
                  ))}
                </div>

                {/* Container Balok Bar Chart */}
                <div className="absolute left-6 top-2 bottom-12 flex items-end gap-1.5 sm:gap-2 px-2 min-w-max">
                  {kamarChartData.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">Belum ada data</div>
                  ) : (
                    kamarChartData.map((d, i) => (
                      <div key={i} className="flex flex-col items-center h-full justify-end group w-5 sm:w-6 relative">
                        {/* Balok Grafik */}
                        <div className="w-full bg-[#4ade80] rounded-t-sm relative transition-all duration-300 hover:bg-emerald-500"
                             style={{ height: `${Math.max((d.total / maxChartBar) * 100, 2)}%` }}>
                          {/* Tooltip Hover */}
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-2 rounded font-bold transition-opacity z-20">
                            {d.total}
                          </span>
                        </div>
                        {/* Label X-Axis (Kamar) */}
                        <span className="text-[9px] font-bold text-slate-500 -rotate-45 origin-top-left mt-3 absolute -bottom-5 left-1/2">
                          {d.kamar}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* --- KARTU DONUT CHART (KANAN) --- */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col items-center">
              <h4 className="font-bold text-slate-800 text-sm w-full mb-6 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-600">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                </svg>
                Kategori Berdasarkan Keterangan
              </h4>
              
              <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
                {/* Donut Shape */}
                <div className="relative w-44 h-44 rounded-full flex items-center justify-center shadow-inner" style={donutStyle}>
                  {/* Lingkaran Putih Tengah */}
                  <div className="w-24 h-24 bg-white rounded-full shadow-sm flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-800">{filteredLaporanKebersihan.length}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Total</span>
                  </div>
                </div>

                {/* Legend Kategori */}
                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-slate-500 px-2">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#f59e0b]"></span>Sampah</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#3b82f6]"></span>Pakaian</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#ec4899]"></span>Kasur</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#10b981]"></span>Lantai</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#94a3b8]"></span>Lain-lain</div>
                </div>
              </div>
            </div>

          </div>
        );
      })()}
      {/* ============================================================= */}
                  
                  {/* Tabel Laporan Terkini */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                        <History className="w-4 h-4 text-emerald-600" />
                        Laporan Pelanggaran Terkini
                      </h4>
                    </div>
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-sm text-left">
                        <thead className="text-[11px] text-slate-500 uppercase tracking-wider bg-white border-b border-slate-100">
                          <tr>
                            <th className="px-5 py-3">Tanggal</th>
                            <th className="px-5 py-3">Jenjang</th>
                            <th className="px-5 py-3">Kamar</th>
                            <th className="px-5 py-3">Wali Halaqoh</th>
                            <th className="px-5 py-3 max-w-[200px]">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                          {filteredLaporanKebersihan.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-5 py-10 text-center text-slate-400 italic">
                                Belum ada laporan pada rentang tanggal ini.
                              </td>
                            </tr>
                          ) : (
                            filteredLaporanKebersihan.slice(0, 5).map((item, idx) => (
                              <tr key={item.id || idx} className="hover:bg-slate-50">
                                <td className="px-5 py-3 font-mono">{item.tanggal}</td>
                                <td className="px-5 py-3"><span className="bg-slate-100 px-2 py-0.5 rounded font-bold">{item.jenjang}</span></td>
                                <td className="px-5 py-3 font-bold text-emerald-800">{item.kamar}</td>
                                <td className="px-5 py-3">{item.wali_halaqoh}</td>
                                <td className="px-5 py-3 text-slate-500">{item.keterangan}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
              
              {/* === KONTEN 2: INPUT LAPORAN === */}
              {kebersihanSubTab === 'input' && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                  <h3 className="font-bold text-sm text-slate-800 mb-4">Form Input Ketidakbersihan Kamar</h3>
                  <form onSubmit={handleSubmitKebersihan} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Sidak</label>
                      <input 
                        type="date" 
                        value={formKebersihanTgl} 
                        onChange={(e) => setFormKebersihanTgl(e.target.value)} 
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kamar Santri</label>
                      <select 
                        value={formKebersihanKamar} 
                        onChange={(e) => setFormKebersihanKamar(e.target.value)} 
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold cursor-pointer"
                      >
                        <option value="">-- Pilih Kamar --</option>
                        {kamarList.map((k, idx) => (
                          <option key={idx} value={k.nama_kamar}>
                            {k.nama_kamar} ({k.wali_halaqoh && k.wali_halaqoh !== '-' ? k.wali_halaqoh : 'Belum diatur'})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Detail Keterangan</label>
                      <textarea 
                        rows={3} 
                        value={formKebersihanKeterangan} 
                        onChange={(e) => setFormKebersihanKeterangan(e.target.value)} 
                        placeholder="Contoh: Sampah menumpuk di belakang pintu..." 
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <button type="submit" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md">
                      Simpan Laporan
                    </button>
                  </form>
                </div>
              )}
              
              {/* === KONTEN 3: RIWAYAT INPUT === */}
              {kebersihanSubTab === 'riwayat' && (
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  
                  {/* Header dengan Filter Tanggal ditambahkan di sini */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h3 className="font-bold text-sm text-slate-800">Riwayat Data Laporan Tersimpan</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={riwayatStartDate}
                        onChange={(e) => setRiwayatStartDate(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className="text-slate-400 text-xs font-bold">-</span>
                      <input
                        type="date"
                        value={riwayatEndDate}
                        onChange={(e) => setRiwayatEndDate(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-4 py-3">Tanggal</th>
                          <th className="px-4 py-3">Kamar</th>
                          <th className="px-4 py-3">Wali Halaqoh</th>
                          <th className="px-4 py-3">Keterangan</th>
                          <th className="px-4 py-3 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {/* laporanKebersihanList diganti menjadi filteredRiwayatKebersihan */}
                        {filteredRiwayatKebersihan.length === 0 ? (
                          <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-400">Belum ada riwayat laporan pada rentang tanggal ini.</td></tr>
                        ) : (
                          filteredRiwayatKebersihan.map((item, idx) => (
                            <tr key={item.id || idx} className="hover:bg-slate-50">
                              <td className="px-4 py-3 font-mono">{item.tanggal}</td>
                              <td className="px-4 py-3 font-bold text-emerald-800">{item.kamar} <span className="text-[10px] bg-slate-100 px-1 rounded ml-1 font-normal text-slate-500">{item.jenjang}</span></td>
                              <td className="px-4 py-3">{item.wali_halaqoh}</td>
                              <td className="px-4 py-3 text-slate-600">{item.keterangan}</td>
                              <td className="px-4 py-3 text-center whitespace-nowrap space-x-2">
                                <button 
                                  onClick={() => handleOpenEditKebersihan(item)} 
                                  className="text-[10px] font-bold text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteKebersihan(item.id)} 
                                  className="text-[10px] font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* === KONTEN 4: LAPORAN REKAP === */}
{kebersihanSubTab === 'rekap' && (
    <div className="space-y-4">
        {/* --- TAMBAHKAN HEADER & TOMBOL CETAK DI SINI --- */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-sm text-slate-800">Data Rekapitulasi Kebersihan</h3>
            <button onClick={() => window.print()} className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-md" >
                <FileText className="w-4 h-4" /> {/* Gunakan ikon yang sudah ada */}
                Cetak PDF
            </button>
        </div>
        {/* ---------------------------------------------- */}
        
        {/* Filter & Sortir Controls */}
        <div className="flex flex-col md:flex-row gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Mulai Tanggal</label>
                <input type="date" value={rekapStartDate} onChange={(e) => setRekapStartDate(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
            </div>
            <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sampai Tanggal</label>
                <input type="date" value={rekapEndDate} onChange={(e) => setRekapEndDate(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
            </div>
            <div className="flex-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sortir Berdasarkan</label>
                <select value={rekapSort} onChange={(e) => setRekapSort(e.target.value as 'kamar' | 'terbanyak')} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" >
                    <option value="kamar">Urutan Kamar</option>
                    <option value="terbanyak">Kasus Terbanyak</option>
                </select>
            </div>
        </div>

        {/* Tabel Rekapitulasi Utama */}
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                    <tr>
                        <th className="px-4 py-3 text-center">No</th>
                        <th className="px-4 py-3">Nama Kamar</th>
                        <th className="px-4 py-3">Jenjang</th>
                        <th className="px-4 py-3">Wali Halaqoh</th>
                        <th className="px-4 py-3 text-center">Jumlah Tidak Bersih</th>
                        <th className="px-4 py-3 text-center">Persentase Kebersihan</th>
                        <th className="px-4 py-3">Keterangan / Catatan Ketidakbersihan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                    {processedRekapKamar.length === 0 ? (
                        <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-400">Belum ada data kamar.</td></tr>
                    ) : (
                        processedRekapKamar.map((k, idx) => {
                            const asumsiTotalHari = 31;
                            const persentase = Math.max(0, ((asumsiTotalHari - k.totalKasus) / asumsiTotalHari) * 100).toFixed(1);
                            
                            return (
                                <tr key={k.nama_kamar || idx} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 text-center font-mono text-slate-500">{idx + 1}</td>
                                    <td className="px-4 py-3 font-bold text-slate-900">{k.nama_kamar}</td>
                                    <td className="px-4 py-3">
                                        <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-[10px]">{k.jenjang}</span>
                                    </td>
                                    <td className="px-4 py-3 text-slate-600">{k.wali_halaqoh}</td>
                                    
                                    {/* Kolom Jumlah Tidak Bersih */}
                                    <td className="px-4 py-3 text-center">
                                        <button onClick={() => setDetailKamarModal(k.nama_kamar)} className={`px-3 py-1 rounded-full font-bold text-[10px] transition shadow-sm hover:shadow-md cursor-pointer ${k.totalKasus > 0 ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`} title="Klik untuk melihat rincian kasus">
                                            {k.totalKasus} Kasus
                                        </button>
                                    </td>
                                    
                                    {/* Kolom Persentase Kebersihan */}
                                    <td className="px-4 py-3 text-center">
                                        <span className={`px-3 py-1 rounded-full font-bold text-[10px] ${Number(persentase) < 70 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                            {persentase}%
                                        </span>
                                    </td>
                                    
                                    {/* Kolom Keterangan / Catatan Ketidakbersihan */}
                                    <td className="px-4 py-3 text-slate-700 text-[11px] leading-relaxed">
                                        {k.riwayatKasus && k.riwayatKasus.length > 0 ? (
                                            <ul className="space-y-1 pl-3 list-disc">
                                                {k.riwayatKasus.map((riwayat: any, i: number) => {
                                                    // Kode yang sebelumnya terpotong sudah diperbaiki di sini
                                                    const formatTanggal = riwayat.tanggal.split('-').reverse().join('/');
                                                    return (
                                                        <li key={i}>
                                                            <span className="font-bold">[{formatTanggal}]</span> {riwayat.keterangan}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : (
                                            <span className="italic text-slate-400">Tidak ada catatan</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    </div>
)}
              {/* MODAL EDIT LAPORAN KEBERSIHAN */}
              {isEditKebersihanModalOpen && (
                <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                  <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
                    <div className="bg-blue-600 px-6 py-4 flex items-center justify-between text-white">
                      <div>
                        <h3 className="font-bold text-base">Edit Laporan Kebersihan</h3>
                        <p className="text-xs text-blue-100">Perbarui data laporan yang salah</p>
                      </div>
                      <button onClick={() => setIsEditKebersihanModalOpen(false)} className="text-blue-200 hover:text-white">
                        Tutup
                      </button>
                    </div>
                    
                    <form onSubmit={handleUpdateKebersihan} className="p-6 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Sidak</label>
                        <input 
                          type="date" 
                          value={editKebersihanTgl} 
                          onChange={(e) => setEditKebersihanTgl(e.target.value)} 
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kamar Santri</label>
                        <select 
                          value={editKebersihanKamar} 
                          onChange={(e) => setEditKebersihanKamar(e.target.value)} 
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold cursor-pointer"
                        >
                          <option value="">-- Pilih Kamar --</option>
                          {kamarList.map(k => (
                            <option key={k.nama_kamar} value={k.nama_kamar}>{k.nama_kamar}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Detail Keterangan</label>
                        <textarea 
                          rows={3} 
                          value={editKebersihanKeterangan} 
                          onChange={(e) => setEditKebersihanKeterangan(e.target.value)} 
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setIsEditKebersihanModalOpen(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl">
                          Batal
                        </button>
                        <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md">
                          Simpan Perubahan
                        </button>
                      </div>
                    </form>
                  </div>
                </div> 
              )}
{/* MODAL DETAIL RIWAYAT KOTOR KAMAR */}
        {detailKamarModal && (
          <div className="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
              <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between text-white">
                <div>
                  <h3 className="font-bold text-base">Riwayat Pelanggaran: Kamar {detailKamarModal}</h3>
                  <p className="text-xs text-emerald-100">Detail catatan kebersihan berdasarkan filter tanggal aktif</p>
                </div>
                <button onClick={() => setDetailKamarModal(null)} className="text-emerald-200 hover:text-white p-1 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
                {(() => {
                  const kamarData = processedRekapKamar.find(k => k.nama_kamar === detailKamarModal);
                  if (!kamarData || kamarData.riwayatKasus.length === 0) {
                    return (
                      <div className="text-center text-slate-400 text-xs italic py-8 border border-dashed border-slate-200 rounded-2xl">
                        Tidak ada catatan kasus kotor untuk kamar ini.
                      </div>
                    );
                  }
                  
                  return kamarData.riwayatKasus.map((riwayat: any, i: number) => (
                    <div key={i} className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex gap-3">
                      <div className="bg-rose-500 text-white p-2 rounded-xl shrink-0 h-fit shadow-sm">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-800 mb-1">{riwayat.tanggal}</div>
                        <div className="text-xs text-slate-600 leading-relaxed">{riwayat.keterangan}</div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
                 <button onClick={() => setDetailKamarModal(null)} className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition">
                   Tutup
                 </button>
              </div>
            </div>
          </div>
        )}
            </div>
          )}

          {/* ========================================================= */}
          {/* BATAS MENU KEBERSIHAN BERAKHIR - MULAI MENU DASHBOARD       */}
          {/* ========================================================= */}
         {navTab === 'pelanggaran' && (
            <div className="max-w-7xl mx-auto w-full space-y-4">
              {/* Header Aplikasi Pelanggaran */}
              <div className="bg-emerald-900 rounded-3xl p-4 sm:p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-600 text-white p-2 sm:p-3 rounded-xl shadow-inner flex-shrink-0">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold tracking-tight leading-none">SIPENG SANTRI</h1>
                    <p className="text-xs text-emerald-300 mt-1">Sistem Pencatatan Pelanggaran Santri</p>
                  </div>
                </div>

                {/* Navigasi Sub-Menu */}
                <div className="flex bg-emerald-950/50 p-1 rounded-2xl overflow-x-auto scrollbar-none">
                <button onClick={() => setPelanggaranSubTab('dashboard')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${pelanggaranSubTab === 'dashboard' ? 'bg-emerald-800 text-white' : 'text-emerald-200 hover:bg-emerald-800/60'}`}>Dashboard</button>
                <button onClick={() => setPelanggaranSubTab('input')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${pelanggaranSubTab === 'input' ? 'bg-emerald-800 text-white' : 'text-emerald-200 hover:bg-emerald-800/60'}`}>Input Pelanggaran</button>
                <button onClick={() => setPelanggaranSubTab('laporan')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${pelanggaranSubTab === 'laporan' ? 'bg-emerald-800 text-white' : 'text-emerald-200 hover:bg-emerald-800/60'}`}>Laporan & Rekap</button>
  
                {/* Baris <button> Database Santri telah dihapus dari sini */}
                </div>
              </div>

             {/* === KONTEN 0: DASHBOARD PELANGGARAN === */}
              {pelanggaranSubTab === 'dashboard' && (
                  <div className="space-y-6">
                    {/* Filter Analytics Pelanggaran (Bulan & Rentang) */}
                    <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-slate-200 flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                          <History className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-xs uppercase">Filter Waktu</h4>
                          <p className="text-[10px] text-slate-400">Rentang data dashboard</p>
                        </div>
                      </div>
                    
                      <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                        {/* Opsi Tab Mode Filter */}
                        <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 w-full sm:w-auto">
                          <button
                            onClick={() => setDashPlgFilterMode('bulan')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${dashPlgFilterMode === 'bulan' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            Bulan
                          </button>
                          <button
                            onClick={() => setDashPlgFilterMode('rentang')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${dashPlgFilterMode === 'rentang' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            Rentang Waktu
                          </button>
                        </div>
                    
                        {/* Input Dinamis Berdasarkan Mode yang Dipilih */}
                        <div className="flex-1 w-full flex items-center justify-end gap-3">
                          
                          {/* Tampilan jika Pemilihan Bulan */}
                          {dashPlgFilterMode === 'bulan' && (
                            <input
                              type="month"
                              value={dashPlgBulanTahun}
                              onChange={(e) => setDashPlgBulanTahun(e.target.value)}
                              className="w-full sm:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                            />
                          )}
                    
                          {/* Tampilan jika Rentang Waktu */}
                          {dashPlgFilterMode === 'rentang' && (
                            <div className="flex items-center gap-2 w-full">
                              <input
                                type="date"
                                value={dashPlgMulai}
                                onChange={(e) => setDashPlgMulai(e.target.value)}
                                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                              />
                              <span className="text-slate-400 font-bold">-</span>
                              <input
                                type="date"
                                value={dashPlgSampai}
                                onChange={(e) => setDashPlgSampai(e.target.value)}
                                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* --- BAGIAN KARTU STATISTIK (KPI CARDS) --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* Kartu 1: Total Santri (Tidak Berubah) */}
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Total Santri</p>
                          <h3 className="text-2xl font-black text-slate-800 leading-none">{dashboardStatsPlg.totalSantri}</h3>
                        </div>
                      </div>

                      {/* Kartu 2: Total Kasus (Bisa Diklik) */}
                      <div 
                        onClick={() => {
                            setDashCardModal({
                                title: "Rincian Seluruh Kasus",
                                subtitle: "Menampilkan daftar seluruh pelanggaran pada rentang waktu terpilih",
                                data: filteredDashboardPelanggaran
                            });
                            setSearchDashCardModal('');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-amber-400 hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5 flex items-center gap-1">Total Kasus <span className="text-[9px] text-amber-600 font-normal">(Klik)</span></p>
                          <h3 className="text-2xl font-black text-slate-800 leading-none">{dashboardStatsPlg.totalKasus}</h3>
                        </div>
                      </div>

                      {/* Kartu 3: Total SP Aktif (Bisa Diklik) */}
                      <div 
                        onClick={() => {
                            const dataAktif = filteredDashboardPelanggaran.filter(p => p.sp && p.sp !== 'Tanpa SP');
                            setDashCardModal({
                                title: "Rincian Status SP Aktif",
                                subtitle: "Menampilkan santri yang memiliki status Surat Peringatan aktif",
                                data: dataAktif
                            });
                            setSearchDashCardModal('');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-orange-400 hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-4"/><path d="M12 10h.01"/></svg>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Total SP Aktif <span className="text-[9px] text-orange-600 font-normal">(Klik)</span></p>
                          <h3 className="text-2xl font-black text-slate-800 leading-none">{dashboardStatsPlg.totalSPAktif}</h3>
                        </div>
                      </div>

                      {/* Kartu 4: SP Terakhir / SP 3 (Bisa Diklik) */}
                      <div 
                        onClick={() => {
                            const dataBerat = filteredDashboardPelanggaran.filter(p => p.sp === 'SP Terakhir' || p.sp === 'SP 3');
                            setDashCardModal({
                                title: "Rincian Kasus SP 3 / SP Terakhir",
                                subtitle: "Menampilkan santri dengan tingkat pelanggaran berat",
                                data: dataBerat
                            });
                            setSearchDashCardModal('');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-rose-400 hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="10" r="4"/><path d="M8 14v1a4 4 0 0 0 8 0v-1"/><path d="M15.5 17 18 20"/><path d="M8.5 17 6 20"/></svg>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5 flex items-center gap-1">SP Terakhir / SP 3 <span className="text-[9px] text-rose-600 font-normal">(Klik)</span></p>
                          <h3 className="text-2xl font-black text-slate-800 leading-none">{dashboardStatsPlg.totalSP3Terakhir}</h3>
                        </div>
                      </div>

                      {/* Kartu 5: Dikeluarkan (Bisa Diklik) */}
                      <div 
                        onClick={() => {
                            const dataOut = filteredDashboardPelanggaran.filter(p => p.sp === 'Dikeluarkan');
                            setDashCardModal({
                                title: "Rincian Santri Dikeluarkan",
                                subtitle: "Menampilkan daftar santri yang telah dikenakan sanksi dikeluarkan",
                                data: dataOut
                            });
                            setSearchDashCardModal('');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-red-400 hover:shadow-md transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="17" y1="8" x2="22" y2="13"/><line x1="22" y1="8" x2="17" y2="13"/></svg>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5 flex items-center gap-1">Dikeluarkan <span className="text-[9px] text-red-700 font-normal">(Klik)</span></p>
                          <h3 className="text-2xl font-black text-slate-800 leading-none">{dashboardStatsPlg.totalDikeluarkan}</h3>
                        </div>
                      </div>
                    </div>

                    {/* --- BAGIAN GRAFIK (CHARTS) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Donut Chart: Distribusi Status SP */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
                        <h4 className="font-bold text-slate-800 text-sm w-full mb-6 flex items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-700">
                            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                          </svg>
                          Distribusi Status SP
                        </h4>
                        
                        <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full mt-4">
                          <div className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-inner" style={dashboardStatsPlg.donutStyle}>
                            <div className="w-24 h-24 bg-white rounded-full shadow-sm flex flex-col items-center justify-center">
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-bold text-slate-500 px-2 mt-2">
                            {Object.entries(dashboardStatsPlg.spColors).map(([label, color]) => (
                              <div key={label} className="flex items-center gap-1.5">
                                <span className="w-8 h-2.5 rounded-sm" style={{ backgroundColor: color as string }}></span>
                                {label}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bar Chart: Kasus Per Halaqoh */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-700">
                            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                          </svg>
                          Kasus Per Halaqoh
                        </h4>
                        
                        <div className="relative flex-1 min-h-[260px] w-full overflow-x-auto overflow-y-hidden pb-8 pt-2">
                          <div className="absolute left-0 top-2 bottom-12 w-6 flex flex-col justify-between text-[10px] font-bold text-slate-400 text-right pr-2">
                            <span>{dashboardStatsPlg.maxHalaqohChart}</span>
                            <span>{Math.ceil(dashboardStatsPlg.maxHalaqohChart * 0.75)}</span>
                            <span>{Math.ceil(dashboardStatsPlg.maxHalaqohChart * 0.5)}</span>
                            <span>{Math.ceil(dashboardStatsPlg.maxHalaqohChart * 0.25)}</span>
                            <span>0</span>
                          </div>

                          <div className="absolute left-6 right-0 top-2 bottom-12 flex flex-col justify-between pointer-events-none">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="border-b border-slate-100 w-full h-0"></div>
                            ))}
                          </div>

                          <div className="absolute left-6 top-2 bottom-12 flex items-end justify-around px-4 min-w-max w-full">
                            {dashboardStatsPlg.halaqohChartData.length === 0 ? (
                              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">Belum ada kasus</div>
                            ) : (
                              dashboardStatsPlg.halaqohChartData.map((d: any, i: number) => (
                                <div key={i} className="flex flex-col items-center h-full justify-end group relative w-16 sm:w-20">
                                  <div 
                                    className="w-full max-w-[60px] bg-[#10b981] rounded-t-sm relative transition-all duration-300 hover:bg-emerald-500"
                                    style={{ height: `${Math.max((d.total / dashboardStatsPlg.maxHalaqohChart) * 100, 2)}%` }}
                                  >
                                    <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-2 rounded font-bold transition-opacity z-20">
                                      {d.total}
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-medium text-slate-600 mt-2 absolute -bottom-6 w-32 text-center truncate">
                                    {d.halaqoh}
                                  </span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
              )}
              
              {/* ========================================= */}
              {/* MODAL EDIT DATA PELANGGARAN               */}
              {/* ========================================= */}
              {isEditPlgModalOpen && (
                  <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
                      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
                          <div className="bg-teal-700 px-6 py-4 flex items-center justify-between text-white">
                              <div>
                                  <h3 className="font-bold text-base">Edit Data Pelanggaran</h3>
                                  <p className="text-xs text-teal-100">Perbarui rincian kasus pelanggaran santri</p>
                              </div>
                              <button onClick={() => setIsEditPlgModalOpen(false)} className="text-teal-200 hover:text-white transition">
                                  Tutup
                              </button>
                          </div>
                          <form onSubmit={handleUpdatePelanggaran} className="p-6 space-y-4">
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal</label>
                                  <input type="date" value={editPlgTanggal} onChange={(e) => setEditPlgTanggal(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-teal-600" required />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bentuk Pelanggaran</label>
                                  <input type="text" value={editPlgBentuk} onChange={(e) => setEditPlgBentuk(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" required />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sanksi / Tindakan</label>
                                  <textarea rows={3} value={editPlgSanksi} onChange={(e) => setEditPlgSanksi(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" required />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status SP</label>
                                  <select value={editPlgSP} onChange={(e) => setEditPlgSP(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-600">
                                      <option value="Tanpa SP">Tanpa SP</option>
                                      <option value="Surat Pernyataan">Surat Pernyataan</option>
                                      <option value="SP 1">SP 1</option>
                                      <option value="SP 2">SP 2</option>
                                      <option value="SP 3">SP 3</option>
                                      <option value="SP Terakhir">SP Terakhir</option>
                                      <option value="Dikeluarkan">Dikeluarkan</option>
                                  </select>
                              </div>
                              <div className="flex justify-end gap-3 pt-3">
                                  <button type="button" onClick={() => setIsEditPlgModalOpen(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
                                      Batal
                                  </button>
                                  <button type="submit" className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-md transition">
                                      Simpan Perubahan
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
              )}

              {/* ========================================= */}
              {/* MODAL KLIK KARTU STATISTIK DASHBOARD      */}
              {/* ========================================= */}
              {dashCardModal && (
                  <div className="fixed inset-0 z-[999] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                          
                          {/* Header Modal */}
                          <div className="bg-[#1e293b] px-6 py-4 flex items-center justify-between text-white shrink-0">
                              <div className="flex items-center gap-4">
                                  <div className="bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/30 text-amber-400">
                                      <AlertCircle className="w-6 h-6" />
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-base sm:text-lg">{dashCardModal.title}</h3>
                                      <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{dashCardModal.subtitle}</p>
                                  </div>
                              </div>
                              <button onClick={() => setDashCardModal(null)} className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 p-2 rounded-xl">
                                  <X className="w-5 h-5" />
                              </button>
                          </div>
              
                          {/* Kotak Pencarian di Dalam Modal */}
                          <div className="p-4 border-b border-slate-100 bg-white shrink-0">
                              <div className="relative">
                                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                                  <input 
                                      type="text" 
                                      placeholder="Cari nama santri di rincian ini..." 
                                      value={searchDashCardModal} 
                                      onChange={(e) => setSearchDashCardModal(e.target.value)}
                                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                  />
                              </div>
                          </div>
              
                          {/* Daftar Riwayat Santri */}
                          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50 flex-1">
                              {dashCardModal.data
                                  ?.filter((r: any) => r.nama?.toLowerCase().includes(searchDashCardModal.toLowerCase()) || r.pelanggaran?.toLowerCase().includes(searchDashCardModal.toLowerCase()))
                                  .map((r: any, idx: number) => (
                                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                                          
                                          <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
                                              <div>
                                                  <h4 className="font-black text-slate-800 uppercase text-sm sm:text-base">{r.nama}</h4>
                                                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                                                      {r.jenjang} | Kelas {r.kelas} | Halaqoh: {r.halaqoh}
                                                  </p>
                                              </div>
                                              <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                                                  <span className={`font-bold px-3 py-1 rounded-full text-[10px] ${r.sp === 'Dikeluarkan' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                                      {r.sp}
                                                  </span>
                                                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                                                      <History className="w-3.5 h-3.5"/> {r.tanggal}
                                                  </span>
                                              </div>
                                          </div>
              
                                          <div className="space-y-3">
                                              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4">
                                                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Bentuk Pelanggaran:</span>
                                                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{r.pelanggaran}</p>
                                              </div>
                                              <div className="bg-emerald-50/40 border border-emerald-100/60 rounded-xl p-3 sm:p-4">
                                                  <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">Sanksi Diberikan:</span>
                                                  <p className="text-xs sm:text-sm text-emerald-800 font-medium whitespace-pre-wrap leading-relaxed">{r.sanksi}</p>
                                              </div>
                                          </div>
              
                                      </div>
                                  ))}
                                  
                                  {dashCardModal.data?.filter((r: any) => r.nama?.toLowerCase().includes(searchDashCardModal.toLowerCase())).length === 0 && (
                                      <div className="text-center py-10 text-slate-400 text-xs italic">
                                          Tidak ada data pelanggaran yang cocok.
                                      </div>
                                  )}
                          </div>
              
                          {/* Footer Modal */}
                          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-100 shrink-0">
                              <span className="text-xs font-bold text-slate-500">
                                  Total: {dashCardModal.data?.filter((r: any) => r.nama?.toLowerCase().includes(searchDashCardModal.toLowerCase())).length || 0} Data
                              </span>
                              <button onClick={() => setDashCardModal(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
                                  Tutup
                              </button>
                          </div>
              
                      </div>
                  </div>
              )}
                            
              {/* KONTEN 1: INPUT PELANGGARAN */}
              {pelanggaranSubTab === 'input' && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 max-w-4xl mx-auto">
                  <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-3 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-emerald-600" /> Form Input Pelanggaran Santri
                  </h3>
                  
                  <form onSubmit={handleSubmitPelanggaran} className="space-y-6">
                    {/* BAGIAN 1: PILIH SANTRI */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Pilih Santri (Bisa Lebih Dari 1)
                      </label>
                      {/* Box Santri Terpilih */}
                      <div className="min-h-[42px] p-2 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-1.5">
                        {selectedSantriPlgIds.length === 0 ? (
                          <span className="text-xs text-slate-400 p-1">Belum ada santri terpilih...</span>
                        ) : (
                          selectedSantriPlgIds.map(id => {
                            const s = santriList.find(x => String(x.id) === id);
                            return s ? (
                              <span key={id} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-slate-200 shadow-xs text-slate-700 rounded-lg text-xs font-bold">
                                {s.nama}
                                <button type="button" onClick={() => setSelectedSantriPlgIds(prev => prev.filter(x => x !== id))} className="text-rose-500 hover:text-rose-700">
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </span>
                            ) : null;
                          })
                        )}
                      </div>
                      
                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                        <input 
                          type="text" 
                          value={searchSantriPlg}
                          onChange={(e) => setSearchSantriPlg(e.target.value)}
                          placeholder="Ketik nama santri..." 
                          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      
                      {/* Daftar Santri */}
                      <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl p-2 space-y-1 bg-white">
                         {santriList
                           .filter(s => s.nama.toLowerCase().includes(searchSantriPlg.toLowerCase()))
                          // .slice(0, 30) // Dibatasi agar browser tidak lag
                           .map(s => (
                             <label key={s.id} className="flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer border border-transparent hover:border-slate-100 transition">
                               <input 
                                 type="checkbox" 
                                 checked={selectedSantriPlgIds.includes(String(s.id))}
                                 onChange={(e) => {
                                   if (e.target.checked) setSelectedSantriPlgIds([...selectedSantriPlgIds, String(s.id)]);
                                   else setSelectedSantriPlgIds(selectedSantriPlgIds.filter(id => id !== String(s.id)));
                                 }}
                                 className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                               />
                               <div className="flex-1 text-xs">
                                 <span className="font-bold text-slate-800">{s.nama}</span>
                                 <span className="text-[10px] text-slate-400 ml-2">
                                   ({s.kelas?.includes('SMA') ? 'SMA' : 'SMP'} | {s.kelas} | {s.halaqoh})
                                 </span>
                               </div>
                             </label>
                         ))}
                      </div>
                    </div>
                    
                    {/* BAGIAN 2: TANGGAL & SP */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Kasus</label>
                        <input type="date" value={formPlgTanggal} onChange={(e) => setFormPlgTanggal(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Keterangan SP / Status</label>
                        <select value={formPlgSP} onChange={(e) => setFormPlgSP(e.target.value)} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer font-medium" required>
                          {spList.length > 0 ? (
                            spList.map(sp => <option key={sp.id} value={sp.nama_sp}>{sp.nama_sp}</option>)
                          ) : (
                            <>
                              <option value="Tanpa SP">Tanpa SP</option>
                              <option value="Surat Pernyataan">Surat Pernyataan</option>
                              <option value="SP 1">SP 1</option>
                              <option value="SP 2">SP 2</option>
                              <option value="SP 3">SP 3</option>
                              <option value="SP Terakhir">SP Terakhir</option>
                              <option value="Dikeluarkan">Dikeluarkan</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* BAGIAN 3: BENTUK PELANGGARAN */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Bentuk Pelanggaran</label>
                      <textarea rows={3} value={formPlgBentuk} onChange={(e) => setFormPlgBentuk(e.target.value)} placeholder="Contoh: Terlambat shalat" className="w-full px-3 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
                    </div>

                    {/* BAGIAN 4: SANKSI YANG DIBERIKAN */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Sanksi yang Diberikan</label>
                      {/* Box Sanksi Terpilih */}
                      <div className="min-h-[42px] p-2 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap gap-1.5">
                        {formPlgSanksiChecked.length === 0 ? (
                          <span className="text-xs text-slate-400 p-1">Belum ada sanksi dipilih...</span>
                        ) : (
                          formPlgSanksiChecked.map(s => (
                            <span key={s} className="inline-flex items-center px-2.5 py-1 bg-white border border-slate-200 shadow-xs text-slate-700 rounded-lg text-[11px] font-semibold">
                              {s === '8. Lainnya (diisi sendiri)' && formPlgSanksiCustom ? `Lainnya: ${formPlgSanksiCustom}` : s}
                            </span>
                          ))
                        )}
                      </div>
                      
                      {/* Daftar Checkbox Sanksi */}
                      <div className="border border-slate-200 rounded-xl p-3 bg-white space-y-1">
                        {[
                          "Pemanggilan Wali Santri",
                          "Potong Rambut 0,3 cm",
                          "Berdiri setelah dzikir dan jamaah dibelakang imam selama 40 hari",
                          "Berdiri setelah dzikir dan jamaah dibelakang imam selama 2 minggu",
                          "Berdiri setelah dzikir dan jamaah dibelakang imam selama 1 minggu",
                          "Barang disita dan dihibahkan",
                          "Mengundurkan diri",
                          "Lainnya (diisi sendiri)"
                        ].map(opt => (
                          <label key={opt} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition">
                            <input
                              type="checkbox"
                              value={opt}
                              checked={formPlgSanksiChecked.includes(opt)}
                              onChange={(e) => {
                                if (e.target.checked) setFormPlgSanksiChecked([...formPlgSanksiChecked, opt]);
                                else setFormPlgSanksiChecked(formPlgSanksiChecked.filter(x => x !== opt));
                              }}
                              className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                            />
                            <span className="text-xs text-slate-700 font-medium">{opt}</span>
                          </label>
                        ))}
                      </div>

                      {/* Kotak Input Custom "Lainnya" */}
                      {formPlgSanksiChecked.includes("Lainnya (diisi sendiri)") && (
                        <textarea
                          rows={2}
                          value={formPlgSanksiCustom}
                          onChange={(e) => setFormPlgSanksiCustom(e.target.value)}
                          placeholder="Ketik rincian sanksi lainnya di sini..."
                          className="w-full px-4 py-3 mt-2 bg-amber-50/30 border border-amber-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all animate-in fade-in"
                          required
                        />
                      )}
                    </div>

                    {/* Tombol Simpan */}
                    <div className="pt-2">
                      <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-[#10b981] hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md flex justify-center items-center gap-2 transition disabled:opacity-50">
                        {isLoading ? <RotateCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} 
                        {isLoading ? 'Menyimpan Data...' : 'Simpan Record'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {pelanggaranSubTab === 'laporan' && (
              <div className="space-y-4">
                  
                  {/* --- KONTROL SUB-TAB & EXPORT --- */}
                  <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50">
                          <button onClick={() => setLaporanPelanggaranSubTab('detail')} 
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${laporanPelanggaranSubTab === 'detail' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                              Detail Riwayat
                          </button>
                          <button onClick={() => setLaporanPelanggaranSubTab('halaqoh')} 
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${laporanPelanggaranSubTab === 'halaqoh' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                              Rekap Halaqoh
                          </button>
                          <button onClick={() => setLaporanPelanggaranSubTab('santri')} 
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${laporanPelanggaranSubTab === 'santri' ? 'bg-white text-teal-700 shadow-sm border-b-2 border-teal-600' : 'text-slate-500 hover:text-slate-700'}`}>
                              Rekap Santri
                          </button>
                      </div>
                      
                      <div className="flex gap-2">
                          {/* Tombol Ekspor Excel telah dihapus */}
                          
                          {/* Tombol Ekspor PDF ditambahkan fungsi window.print() */}
                          <button 
                              onClick={() => window.print()} 
                              className="flex items-center gap-2 bg-[#e11d48] hover:bg-rose-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition"
                              title="Cetak atau Simpan sebagai PDF"
                          >
                              <FileText className="w-4 h-4" /> Ekspor PDF
                          </button>
                      </div>
                  </div>
          
                  {/* --- FILTER BAR --- */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Cari Nama/Sanksi</label>
                      <input type="text" value={filterPlgKataKunci} onChange={(e) => setFilterPlgKataKunci(e.target.value)} placeholder="Kata kunci..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                  </div>
  
                  {/* Dinamis: Tampil Sortir jika tab Halaqoh, tampil Kelas jika tab lain */}
                  {laporanPelanggaranSubTab === 'halaqoh' ? (
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Sortir Halaqoh</label>
                          <select value={sortHalaqoh} onChange={(e) => setSortHalaqoh(e.target.value as 'terbanyak' | 'abjad')} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs cursor-pointer">
                              <option value="terbanyak">Kasus Terbanyak</option>
                              <option value="abjad">Berdasarkan Abjad Ustadz (A-Z)</option>
                          </select>
                      </div>
                  ) : (
                      <div>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Filter Kelas</label>
                          <select value={filterPlgKelas} onChange={(e) => setFilterPlgKelas(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                              <option>Semua Kelas</option>
                              {/* Tambahkan opsi kelas lainnya jika perlu */}
                          </select>
                      </div>
                  )}

                <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Filter Status SP</label>
                    <select value={filterPlgStatusSP} onChange={(e) => setFilterPlgStatusSP(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                        <option>Semua Status</option>
                        <option>Tanpa SP</option>
                        <option>SP 1</option>
                        <option>SP 2</option>
                        <option>SP 3</option>
                        <option>Dikeluarkan</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Rentang Tanggal</label>
                        <input type="date" value={filterPlgMulai} onChange={(e) => setFilterPlgMulai(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">&nbsp;</label>
                        <input type="date" value={filterPlgSampai} onChange={(e) => setFilterPlgSampai(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs" />
                    </div>
                </div>
            </div>
        </div>
          
                  {/* --- TABEL KONTEN --- */}
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                                  {laporanPelanggaranSubTab === 'detail' && (
                                      <tr>
                                          <th className="px-5 py-4">TANGGAL</th>
                                          <th className="px-5 py-4">NAMA SANTRI</th>
                                          <th className="px-5 py-4">JENJANG</th>
                                          <th className="px-5 py-4">KELAS</th>
                                          <th className="px-5 py-4">HALAQOH</th>
                                          <th className="px-5 py-4">PELANGGARAN</th>
                                          <th className="px-5 py-4 min-w-[200px]">SANKSI</th>
                                          <th className="px-5 py-4">STATUS SP</th>
                                          <th className="px-5 py-4 print:hidden">AKSI</th>
                                      </tr>
                                  )}
                                  {/* 2. KONTEN REKAP HALAQOH */}
                                  {laporanPelanggaranSubTab === 'halaqoh' && (
                                      <tr>
                                          <th className="px-5 py-4">NO</th>
                                          <th className="px-5 py-4 min-w-[220px]">HALAQOH</th>
                                          <th className="px-5 py-4">KAMAR</th>
                                          <th className="px-5 py-4">TOTAL SANTRI</th>
                                          <th className="px-5 py-4">TOTAL PELANGGARAN</th>
                                          <th className="px-5 py-4">JUMLAH SP AKTIF</th>
                                      </tr>
                                  )}
                                  {laporanPelanggaranSubTab === 'santri' && (
                                      <tr>
                                          <th className="px-5 py-4">NO</th>
                                          <th className="px-5 py-4">NAMA SANTRI</th>
                                          <th className="px-5 py-4">JENJANG</th>
                                          <th className="px-5 py-4">KELAS</th>
                                          <th className="px-5 py-4">HALAQOH/KAMAR</th>
                                          <th className="px-5 py-4">TOTAL KASUS</th>
                                          <th className="px-5 py-4">SP TERTINGGI</th>
                                          <th className="px-5 py-4 min-w-[250px]">KETERANGAN</th>
                                      </tr>
                                  )}
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700">
                                  {/* 1. KONTEN DETAIL RIWAYAT */}
                                  {laporanPelanggaranSubTab === 'detail' && filteredPelanggaran.map((p, i) => (
                                      <tr key={i} className="hover:bg-slate-50">
                                          <td className="px-5 py-3 whitespace-nowrap">{p.tanggal}</td>
                                          <td className="px-5 py-3 font-bold">{p.nama}</td>
                                          <td className="px-5 py-3">{p.jenjang}</td>
                                          <td className="px-5 py-3">{p.kelas}</td>
                                          <td className="px-5 py-3">{p.halaqoh}</td>
                                          <td className="px-5 py-3">{p.pelanggaran}</td>
                                          <td className="px-5 py-3 whitespace-pre-wrap">{p.sanksi}</td>
                                          <td className="px-5 py-3">
                                              <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-[10px]">{p.sp}</span>
                                          </td>
                                          <td className="px-5 py-3 whitespace-nowrap print:hidden">
                                          <button onClick={() => handleOpenEditPelanggaran(p)} className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-800 mr-2 p-1.5 rounded-lg transition-colors" title="Edit Data">
                                              <Edit className="w-4 h-4"/>
                                          </button>
                                          <button onClick={() => handleDeletePelanggaran(p.id)} className="text-rose-600 hover:bg-rose-50 hover:text-rose-800 p-1.5 rounded-lg transition-colors" title="Hapus Data">
                                              <Trash2 className="w-4 h-4"/>
                                          </button>
                                      </td>
                                      </tr>
                                  ))}
          
                                  {/* 2. KONTEN REKAP HALAQOH */}
                                  {laporanPelanggaranSubTab === 'halaqoh' && rekapHalaqohData?.map((h, i) => (
                                      <tr key={i} className="hover:bg-slate-50">
                                          {/* Kolom 1: No */}
                                          <td className="px-5 py-4">{i + 1}</td>
                                          
                                          {/* Kolom 2: Halaqoh */}
                                          <td className="px-5 py-4 font-bold text-slate-800">{h.halaqoh}</td>
                                          
                                          {/* Kolom 3: Kamar */}
                                          <td className="px-5 py-4 font-bold text-slate-600">{h.kamar}</td>
                                          
                                          {/* Kolom 4: Total Santri */}
                                          <td className="px-5 py-4">{h.totalSantri} Santri</td>
                                          
                                          {/* Kolom 5: Total Pelanggaran (Tombol Pop-up) */}
                                          <td className="px-5 py-4">
                                              <button 
                                                  onClick={() => {
                                                      if (h.totalKasus > 0) {
                                                          setDetailHalaqohModal({ ustadz: h.halaqoh, kamar: h.kamar, riwayat: h.riwayat });
                                                          setSearchDetailHalaqoh('');
                                                      }
                                                  }}
                                                  disabled={h.totalKasus === 0}
                                                  className={`font-bold px-3 py-1.5 rounded-lg text-[11px] transition-all flex items-center gap-1.5 ${h.totalKasus > 0 ? 'border border-amber-300 text-amber-600 bg-amber-50 hover:bg-amber-100 hover:shadow-sm cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-default'}`}
                                              >
                                                  {h.totalKasus} Kasus
                                              </button>
                                          </td>
          
                                          {/* Kolom 6: Jumlah SP Aktif */}
                                          <td className="px-5 py-4 font-bold">
                                              {h.spAktif > 0 ? <span className="text-rose-600">{h.spAktif} SP</span> : <span className="text-slate-300">-</span>}
                                          </td>
                                      </tr>
                                  ))}
                    
                                  {/* 3. KONTEN REKAP SANTRI */}
                                  {laporanPelanggaranSubTab === 'santri' && rekapSantriData.map((s, i) => (
                                      <tr key={i} className="hover:bg-slate-50 align-top">
                                          <td className="px-5 py-4">{i + 1}</td>
                                          <td className="px-5 py-4 font-bold uppercase">{s.nama}</td>
                                          <td className="px-5 py-4">{s.jenjang}</td>
                                          <td className="px-5 py-4">{s.kelas}</td>
                                          <td className="px-5 py-4">{s.halaqoh}</td>
                                          <td className="px-5 py-4">
                                              <span className="border border-amber-300 text-amber-600 font-bold px-3 py-1 rounded-lg text-[11px] bg-amber-50">
                                                  {s.totalKasus} Kasus
                                              </span>
                                          </td>
                                          <td className="px-5 py-4">
                                              <span className={`font-bold px-3 py-1 rounded-full text-[10px] ${s.spTertinggi === 'Dikeluarkan' ? 'bg-rose-700 text-white' : 'bg-amber-100 text-amber-700'}`}>
                                                  {s.spTertinggi}
                                              </span>
                                          </td>
                                          <td className="px-5 py-4">
                                              <ol className="list-decimal pl-4 space-y-1.5 text-[11px]">
                                                  {s.riwayat.map((r, rIdx) => (
                                                      <li key={rIdx}>
                                                          <span className="font-bold">[{r.tanggal}]</span> {r.pelanggaran} 
                                                          <span className={r.sp === 'Dikeluarkan' ? 'text-rose-600 font-semibold' : 'text-amber-600 font-semibold'}>
                                                              ({r.sp})
                                                          </span>
                                                      </li>
                                                  ))}
                                              </ol>
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>

               {/* ========================================= */}
                {/* MODAL DETAIL KASUS PER HALAQOH            */}
                {/* ========================================= */}
                {detailHalaqohModal && (
                    <div className="fixed inset-0 z-[999] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
                            
                            {/* Header Modal (Warna Gelap) */}
                            <div className="bg-[#1e293b] px-6 py-4 flex items-center justify-between text-white shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="bg-amber-500/20 p-2.5 rounded-xl border border-amber-500/30 text-amber-400">
                                        <AlertCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg">Detail Kasus - {detailHalaqohModal?.ustadz}</h3>
                                        <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">Menampilkan daftar santri yang melanggar di halaqoh {detailHalaqohModal?.ustadz}</p>
                                    </div>
                                </div>
                                <button onClick={() => setDetailHalaqohModal(null)} className="text-slate-400 hover:text-white transition-colors bg-slate-800 hover:bg-slate-700 p-2 rounded-xl">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
        
                            {/* Kotak Pencarian di Dalam Modal */}
                            <div className="p-4 border-b border-slate-100 bg-white shrink-0">
                                <div className="relative">
                                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Cari nama santri di rincian ini..." 
                                        value={searchDetailHalaqoh} 
                                        onChange={(e) => setSearchDetailHalaqoh(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                    />
                                </div>
                            </div>
        
                            {/* Daftar Riwayat Santri (Scrollable) */}
                            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50 flex-1">
                                {detailHalaqohModal?.riwayat
                                    ?.filter((r: any) => r.nama?.toLowerCase().includes(searchDetailHalaqoh.toLowerCase()) || r.pelanggaran?.toLowerCase().includes(searchDetailHalaqoh.toLowerCase()))
                                    .map((r: any, idx: number) => (
                                        <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
                                            
                                            <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-3">
                                                <div>
                                                    <h4 className="font-black text-slate-800 uppercase text-sm sm:text-base">{r.nama}</h4>
                                                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                                                        {r.jenjang} | Kelas {r.kelas} | {r.halaqoh} ({r.kamar})
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                                                    <span className={`font-bold px-3 py-1 rounded-full text-[10px] ${r.sp === 'Dikeluarkan' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {r.sp}
                                                    </span>
                                                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                                                        <History className="w-3.5 h-3.5"/> {r.tanggal}
                                                    </span>
                                                </div>
                                            </div>
        
                                            <div className="space-y-3">
                                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Bentuk Pelanggaran:</span>
                                                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{r.pelanggaran}</p>
                                                </div>
                                                <div className="bg-emerald-50/40 border border-emerald-100/60 rounded-xl p-3 sm:p-4">
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">Sanksi Diberikan:</span>
                                                    <p className="text-xs sm:text-sm text-emerald-800 font-medium whitespace-pre-wrap leading-relaxed">{r.sanksi}</p>
                                                </div>
                                            </div>
        
                                        </div>
                                    ))}
                                    
                                    {detailHalaqohModal?.riwayat?.filter((r: any) => r.nama?.toLowerCase().includes(searchDetailHalaqoh.toLowerCase())).length === 0 && (
                                        <div className="text-center py-10 text-slate-400 text-xs italic">
                                            Tidak ditemukan pelanggaran yang cocok dengan pencarian.
                                        </div>
                                    )}
                            </div>
        
                            {/* Footer Modal */}
                            <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-100 shrink-0">
                                <span className="text-xs font-bold text-slate-500">
                                    Total: {detailHalaqohModal?.riwayat?.filter((r: any) => r.nama?.toLowerCase().includes(searchDetailHalaqoh.toLowerCase())).length || 0} Record Pelanggaran
                                </span>
                                <button onClick={() => setDetailHalaqohModal(null)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
                                    Tutup
                                </button>
                            </div>
        
                        </div>
                    </div>
                )}
                
             </div>
          )}
          
           </div>
          )}
        
          {/* ========================================================= */}
          {/* MENU DASHBOARD UTAMA (JANGAN DIHAPUS)                       */}
          {/* ========================================================= */}
          {navTab === 'dashboard' && (() => {
            const todayStr = inputAbsensiTanggal || new Date().toISOString().slice(0, 10);

            const subsHariIni = submissions.filter(s => {
              const dt = String(s.submission_date || s.created_at || '').slice(0, 10);
              return dt === todayStr;
            });
            const guruJurnalHariIniSet = new Set(subsHariIni.map(s => s.target_person || s.pj_name).filter(Boolean));
            const countGuruJurnalHariIni = guruJurnalHariIniSet.size;

            const totalGuruCount = guruList.length || 23;

            const countSiswaAbsenHariIni = dailyGlobalStats.sakit + dailyGlobalStats.izin + dailyGlobalStats.alpha;

            const dailyTemplates = templates.filter(t => {
              const tf = String(t.timeframe || '').toLowerCase();
              return tf.includes('hari');
            });

            return (
              <div className="space-y-3.5 sm:space-y-6 max-w-7xl mx-auto">
                
                {/* Banner Dashboard Pantauan */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                  <div>
                    <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      Dashboard Pantauan Pondok
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
                      Pantau kepatuhan input kegiatan harian seluruh divisi dan keaktifan guru secara real-time
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 border border-slate-200 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400">TANGGAL:</span>
                      <input
                        type="date"
                        value={inputAbsensiTanggal}
                        onChange={(e) => setInputAbsensiTanggal(e.target.value)}
                        className="text-xs font-bold text-slate-800 bg-transparent outline-none cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={() => setInputAbsensiTanggal(new Date().toISOString().slice(0, 10))}
                      className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold transition"
                    >
                      Hari Ini
                    </button>
                  </div>
                </div>

                {/* 3 Kartu Metrik Utama */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-4">
                  
                  {/* Kartu 1: Jumlah Siswa yang Absen */}
                  <div 
                    onClick={() => {
                      setNavTab('rekap_absensi');
                      setAbsensiSubTab('harian');
                    }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-rose-300 hover:shadow-md transition group"
                  >
                    <div className="space-y-0.5 sm:space-y-1">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        SISWA ABSEN (HARI INI)
                      </span>
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
                          {countSiswaAbsenHariIni}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-400 font-semibold">Santri</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        Sakit: {dailyGlobalStats.sakit} • Izin: {dailyGlobalStats.izin} • Alpha: {dailyGlobalStats.alpha}
                      </p>
                    </div>
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                      <UserCheck className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                  </div>

                  {/* Kartu 2: Jumlah Guru Mengisi Jurnal Hari Ini */}
                  <div 
                    onClick={() => {
                      setNavTab('ceklis');
                      setActiveSubTab('riwayat');
                    }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-200/80 shadow-xs flex items-center justify-between cursor-pointer hover:border-blue-300 hover:shadow-md transition group"
                  >
                    <div className="space-y-0.5 sm:space-y-1">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block">
                        GURU MENGISI JURNAL (HARI INI)
                      </span>
                      <div className="flex items-baseline gap-1.5 sm:gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-blue-600 tracking-tight">
                          {countGuruJurnalHariIni}
                        </span>
                        <span className="text-[11px] sm:text-xs text-slate-400 font-semibold">dari {totalGuruCount} Guru</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-slate-500">
                        Total {subsHariIni.length} sesi jurnal pembelajaran tercatat
                      </p>
                    </div>
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                      <FileText className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                  </div>

                </div>

                {/* Tabel Pantauan Input Kegiatan Harian Semua Divisi */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-3 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-blue-600" />
                        Pantauan Kegiatan Harian ({todayStr})
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                        Status keterisian formulir ceklis harian seluruh unit kerja pondok
                      </p>
                    </div>

                    <div className="text-[11px] sm:text-xs text-slate-600 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500" />
                      <span>
                        Total Kegiatan Harian: <strong>{dailyTemplates.length}</strong> Program
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse min-w-[620px]">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                          <th className="py-2.5 sm:py-3.5 px-3 w-10 text-center">NO</th>
                          <th className="py-2.5 sm:py-3.5 px-3 min-w-[130px]">DIVISI</th>
                          <th className="py-2.5 sm:py-3.5 px-4 min-w-[180px]">KEGIATAN</th>
                          <th className="py-2.5 sm:py-3.5 px-3 text-center min-w-[110px]">KETERANGAN</th>
                          <th className="py-2.5 sm:py-3.5 px-3 text-center min-w-[80px]">NILAI</th>
                          <th className="py-2.5 sm:py-3.5 px-4 min-w-[200px]">CATATAN / TEMUAN</th>
                          <th className="py-2.5 sm:py-3.5 px-3 text-center min-w-[80px]">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {dailyTemplates.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-400 italic text-xs">
                              Belum ada program kegiatan yang disetel dengan timeframe 'Harian'.
                            </td>
                          </tr>
                        ) : (
                          dailyTemplates.map((tpl, idx) => {
                            const divName = divisions.find(d => Number(d.id) === Number(tpl.division_id))?.name || `Divisi #${tpl.division_id}`;

                            const subsForTplDate = submissions.filter(s => {
                              const dt = String(s.submission_date || s.created_at || '').slice(0, 10);
                              return s.template_id === tpl.id && dt === todayStr;
                            });

                            const isInputted = subsForTplDate.length > 0;
                            const latestSub = subsForTplDate[0];

                            let scoreText = '-';
                            if (isInputted) {
                              const totalScore = subsForTplDate.reduce((acc, curr) => acc + getSubmissionPercentage(curr), 0);
                              scoreText = `${Math.round(totalScore / subsForTplDate.length)}%`;
                            }

                            const catatanTpl = latestSub?.general_notes || laporanCatatanMap[tpl.id] || '-';

                            return (
                              <tr key={tpl.id} className="hover:bg-slate-50/80 transition-colors text-xs">
                                <td className="py-2.5 sm:py-3 px-3 text-center font-mono text-slate-400">{idx + 1}</td>
                                <td className="py-2.5 sm:py-3 px-3 font-bold text-slate-900">
                                  {divName}
                                </td>
                                <td className="py-2.5 sm:py-3 px-4 font-semibold text-slate-800">
                                  {tpl.title}
                                </td>
                                <td className="py-2.5 sm:py-3 px-3 text-center">
                                  {isInputted ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                      <span>Diinput ({subsForTplDate.length})</span>
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                      <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                                      <span>Belum</span>
                                    </span>
                                  )}
                                </td>
                                <td className="py-2.5 sm:py-3 px-3 text-center">
                                  {isInputted ? (
                                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                                      {scoreText}
                                    </span>
                                  ) : (
                                    <span className="text-slate-400 font-mono">-</span>
                                  )}
                                </td>
                                <td className="py-2.5 sm:py-3 px-4 text-slate-600 text-[11px] italic leading-relaxed">
                                  {catatanTpl}
                                </td>
                                <td className="py-2.5 sm:py-3 px-3 text-center">
                                  <button
                                    onClick={() => {
                                      // 1. Set Divisi yang sesuai
                                      setActiveDivisionId(tpl.division_id);
                                        
                                      // 2. Set Timeframe (Harian/Mingguan/Bulanan) sesuai kegiatan yang di-klik
                                      setActiveTimeframe(tpl.timeframe as TimeframeCategory); 
                                        
                                       // 3. Set Dropdown ke ID kegiatan yang tepat
                                      setSelectedTemplateId(tpl.id); 
                                        
                                      // 4. Arahkan langsung ke form input (Opsional, agar tidak nyangkut di riwayat)
                                       setActiveSubTab('input'); 
                                        
                                      // 5. Pindah ke halaman form ceklis
                                       setNavTab('ceklis'); 
                                     }}
                                    className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-[11px] transition shadow-2xs"
                                  >
                                    {isInputted ? 'Lihat' : 'Isi'}
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}

          {navTab === 'laporan' && (
            <div className="max-w-7xl mx-auto w-full space-y-6">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight flex items-center gap-2.5">
                    <FileSpreadsheet className="w-6 h-6" />
                    Dashboard Laporan Pondok
                  </h2>
                  <p className="text-xs text-purple-100 mt-1">
                    Pantau capaian IKU dan tuliskan catatan evaluasi per kegiatan tiap bulan
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  {/* Pemilih Bulan Catatan & Laporan */}
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/30 text-white text-xs font-bold">
                    <span className="text-[10px] uppercase tracking-wider text-purple-200">BULAN:</span>
                    <input
                      type="month"
                      value={laporanBulan}
                      onChange={(e) => setLaporanBulan(e.target.value)}
                      className="bg-transparent text-white font-bold outline-none cursor-pointer [color-scheme:dark]"
                    />
                  </div>

                  {/* Tombol Cetak yang mengarah ke berkas public/cetak.html */}
                  <a
                    href="cetak.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition border border-white/20 flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" /> Cetak
                  </a>

                  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5 text-slate-800 text-xs font-bold shadow-md">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">UNIT:</span>
                    <select
                      value={activeDivisionId}
                      onChange={(e) => setActiveDivisionId(Number(e.target.value))}
                      className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
                    >
                      {divisions.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Spreadsheet Table with RowSpan */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                        <th className="py-2.5 px-2 w-8 text-center">NO</th>
                        <th className="py-2.5 px-2 w-[125px] min-w-[115px] max-w-[130px]">INDIKATOR (IKU)</th>
                        <th className="py-2.5 px-1 text-center w-14 min-w-[50px]">TARGET</th>
                        <th className="py-2.5 px-1 text-center w-14 min-w-[50px] bg-blue-50/70 text-blue-800">REALISASI</th>
                        <th className="py-2.5 px-1 text-center w-14 min-w-[50px] bg-emerald-50/70 text-emerald-800">YAYASAN</th>
                        <th className="py-2.5 px-2 w-[125px] min-w-[115px] max-w-[130px]">KEGIATAN</th>
                        <th className="py-2.5 px-1 text-center w-16 min-w-[55px]">WAKTU</th>
                        <th className="py-2.5 px-3 min-w-[340px]">CATATAN ({laporanBulan})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {groupedLaporanTemplates.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-slate-400 italic">
                            Belum ada indikator atau kegiatan yang terdaftar untuk divisi ini.
                          </td>
                        </tr>
                      ) : (
                        groupedLaporanTemplates.map((grp, grpIdx) => {
                          const ikuObj = grp.iku;
                          const itemCount = grp.items.length;

                          return grp.items.map((tpl, itemIdx) => {
                            const realisasiVal = getProgramRealisasi(tpl, laporanBulan);
                            const isFirstRowOfGroup = itemIdx === 0;
                            const catatanTpl = laporanCatatanMap[tpl.id] || '';

                            return (
                              <tr key={tpl.id} className="hover:bg-slate-50/80 transition-colors">
                                {isFirstRowOfGroup && (
                                  <td
                                    rowSpan={itemCount}
                                    className="py-2.5 px-1 text-center font-mono text-slate-400 align-top border-r border-slate-100 bg-slate-50/30 font-bold"
                                  >
                                    {grpIdx + 1}
                                  </td>
                                )}

                                {isFirstRowOfGroup && (
                                  <td
                                    rowSpan={itemCount}
                                    className="py-2.5 px-2 font-semibold text-slate-900 align-top border-r border-slate-100 w-[125px] max-w-[130px]"
                                  >
                                    {ikuObj ? (
                                      <div>
                                        <span className="text-[10px] font-mono font-bold text-blue-600 block">
                                          {ikuObj.kode_iku}
                                        </span>
                                        <span className="text-slate-800 font-bold text-[10px] leading-snug block">{ikuObj.title}</span>
                                      </div>
                                    ) : (
                                      <span className="text-slate-400 italic font-normal text-[10px]">Umum</span>
                                    )}
                                  </td>
                                )}

                                <td className="py-2.5 px-1 text-center font-bold font-mono text-slate-800 text-[10px]">
                                  {tpl.target_teks || (tpl.target ? `${tpl.target}%` : '100%')}
                                </td>
                                <td className="py-2.5 px-1 text-center font-mono font-extrabold text-blue-700 bg-blue-50/30 text-[10px]">
                                  {realisasiVal}
                                </td>
                                <td className="py-2.5 px-1 text-center font-mono font-extrabold text-emerald-700 bg-emerald-50/30 text-[10px]">
                                  {/* Dikosongkan agar diisi manual oleh pihak yayasan */}
                                </td>
                                <td className="py-2.5 px-2 w-[125px] max-w-[130px]">
                                  <button
                                    onClick={() => {
                                      setNavTab('ceklis');
                                      setSelectedTemplateId(tpl.id);
                                      setActiveSubTab('riwayat');
                                    }}
                                    className="font-bold text-blue-600 hover:text-blue-800 hover:underline text-left cursor-pointer text-[10px] leading-snug block"
                                  >
                                    {tpl.title}
                                  </button>
                                </td>
                                <td className="py-2.5 px-1 text-center text-slate-500 font-medium text-[10px]">
                                  {tpl.timeframe || 'Bulanan'}
                                </td>
                                <td className="py-2.5 px-3 min-w-[340px]">
                                  <div className="flex items-start justify-between gap-2 group">
                                    <span className={`text-[11px] leading-relaxed flex-1 ${catatanTpl ? 'text-slate-700 font-medium' : 'text-slate-400 italic'}`}>
                                      {catatanTpl || '(Belum ada catatan)'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setModalCatatanTpl(tpl);
                                        setInputCatatanTeks(catatanTpl);
                                      }}
                                      className="p-1 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition shrink-0"
                                      title="Edit Catatan Kegiatan"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          });
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {}
          {navTab === 'rekap_absensi' && (
            <div className="max-w-7xl mx-auto w-full space-y-6">
              
              {/* Header Box Terpadu */}
              <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg sm:text-xl font-black flex items-center gap-2">
                    <span>📋 Sistem Absensi Santri</span>
                  </h1>
                </div>

                <div className="flex bg-blue-950/40 backdrop-blur-md p-1 rounded-2xl border border-blue-400/30 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setAbsensiSubTab('input')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      absensiSubTab === 'input'
                        ? 'bg-white text-blue-700 shadow-md'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Input Absensi
                  </button>
                  <button
                    onClick={() => setAbsensiSubTab('harian')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      absensiSubTab === 'harian'
                        ? 'bg-white text-blue-700 shadow-md'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Rekap Hari Ini</span>
                  </button>
                  <button
                    onClick={() => setAbsensiSubTab('detail')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      absensiSubTab === 'detail'
                        ? 'bg-white text-blue-700 shadow-md'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Detail Kehadiran
                  </button>
                  <button
                    onClick={() => setAbsensiSubTab('rekap')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      absensiSubTab === 'rekap'
                        ? 'bg-white text-blue-700 shadow-md'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Rekap Bulanan
                  </button>
                  <button
                    onClick={() => setAbsensiSubTab('import')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      absensiSubTab === 'import'
                        ? 'bg-white text-blue-700 shadow-md'
                        : 'text-blue-100 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Import Excel</span>
                  </button>
                </div>
              </header>

              {/* TAB 1: INPUT ABSENSI */}
              {absensiSubTab === 'input' && (
                <div className="space-y-5">
                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Pilih Kelas
                        </label>
                        <select
                          value={inputAbsensiKelas}
                          onChange={(e) => setInputAbsensiKelas(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none cursor-pointer"
                        >
                          {['7-A', '7-B', '7-C', '7-D', '7-E', '8-A', '8-B', '8-C', '8-D', '9-A', '9-B'].map(k => (
                            <option key={k} value={k}>Kelas {k}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                            Tanggal Presensi
                          </label>
                          <button
                            type="button"
                            onClick={() => setInputAbsensiTanggal(new Date().toISOString().slice(0, 10))}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-800"
                          >
                            Set Hari Ini
                          </button>
                        </div>
                        <input
                          type="date"
                          value={inputAbsensiTanggal}
                          onChange={(e) => setInputAbsensiTanggal(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap justify-between items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs sm:text-sm font-medium text-slate-600">
                          Default Otomatis: <strong className="text-emerald-700 font-bold">Hadir</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const allHadir: Record<string, 'Hadir'> = {};
                            studentsInSelectedClass.forEach(s => {
                              allHadir[String(s.nis || s.nama).trim()] = 'Hadir';
                            });
                            setInputStatuses(allHadir);
                          }}
                          className="px-3.5 py-2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition"
                        >
                          Semua Hadir
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveAbsensiToSupabase}
                          disabled={isSavingAbsensi}
                          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-xl text-xs transition shadow-md flex items-center gap-2"
                        >
                          {isSavingAbsensi && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                          <span>Simpan ke Supabase</span>
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                            <th className="p-3 w-12 text-center">No</th>
                            <th className="p-3 w-28">NIS</th>
                            <th className="p-3">Nama Santri</th>
                            <th className="p-3 text-center bg-emerald-50 text-emerald-800 w-24">Hadir</th>
                            <th className="p-3 text-center bg-amber-50 text-amber-800 w-24">Sakit</th>
                            <th className="p-3 text-center bg-blue-50 text-blue-800 w-24">Izin</th>
                            <th className="p-3 text-center bg-rose-50 text-rose-800 w-24">Alpha</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {studentsInSelectedClass.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-xs text-slate-400 italic">
                                Belum ada data santri untuk kelas {inputAbsensiKelas}.
                              </td>
                            </tr>
                          ) : (
                            studentsInSelectedClass.map((s, idx) => {
                              const sKey = String(s.nis || s.nama).trim();
                              const currentStatus = inputStatuses[sKey] || 'Hadir';

                              return (
                                <tr key={sKey} className="hover:bg-slate-50 transition border-b border-slate-100 text-xs">
                                  <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                                  <td className="p-3 font-mono text-slate-500">{s.nis || '-'}</td>
                                  <td className="p-3 font-bold uppercase text-slate-800">{s.nama}</td>
                                  <td className="p-3 text-center bg-emerald-50/40">
                                    <input
                                      type="radio"
                                      name={`status-${sKey}`}
                                      value="Hadir"
                                      checked={currentStatus === 'Hadir'}
                                      onChange={() => setInputStatuses(prev => ({ ...prev, [sKey]: 'Hadir' }))}
                                      className="w-4 h-4 cursor-pointer accent-emerald-600"
                                    />
                                  </td>
                                  <td className="p-3 text-center bg-amber-50/40">
                                    <input
                                      type="radio"
                                      name={`status-${sKey}`}
                                      value="Sakit"
                                      checked={currentStatus === 'Sakit'}
                                      onChange={() => setInputStatuses(prev => ({ ...prev, [sKey]: 'Sakit' }))}
                                      className="w-4 h-4 cursor-pointer accent-amber-600"
                                    />
                                  </td>
                                  <td className="p-3 text-center bg-blue-50/40">
                                    <input
                                      type="radio"
                                      name={`status-${sKey}`}
                                      value="Izin"
                                      checked={currentStatus === 'Izin'}
                                      onChange={() => setInputStatuses(prev => ({ ...prev, [sKey]: 'Izin' }))}
                                      className="w-4 h-4 cursor-pointer accent-blue-600"
                                    />
                                  </td>
                                  <td className="p-3 text-center bg-rose-50/40">
                                    <input
                                      type="radio"
                                      name={`status-${sKey}`}
                                      value="Alpha"
                                      checked={currentStatus === 'Alpha'}
                                      onChange={() => setInputStatuses(prev => ({ ...prev, [sKey]: 'Alpha' }))}
                                      className="w-4 h-4 cursor-pointer accent-rose-600"
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Ringkasan Cepat Semua Kelas pada Tanggal Ini */}
                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <History className="w-4 h-4 text-blue-600" />
                          Rekap Semua Kelas Tanggal {inputAbsensiTanggal}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {dailyGlobalStats.classesCompleted} dari 11 kelas sudah diabsen ({dailyGlobalStats.totalInputted} santri terdata)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAbsensiSubTab('harian')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Buka Rekap Harian Penuh &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                      {dailyAttendanceSummary.map(row => (
                        <div
                          key={row.kelas}
                          onClick={() => setInputAbsensiKelas(row.kelas)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            row.kelas === inputAbsensiKelas
                              ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20'
                              : row.isInputted
                              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                              : 'bg-rose-50/40 hover:bg-rose-50 border-rose-200 text-rose-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800">Kelas {row.kelas}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                              row.isInputted ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {row.isInputted ? `${row.pct}%` : 'Belum'}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1.5">
                            <span className="text-emerald-600 font-bold">H:{row.hadir}</span>
                            <span className="text-amber-600 font-bold">S:{row.sakit}</span>
                            <span className="text-blue-600 font-bold">I:{row.izin}</span>
                            <span className="text-rose-600 font-bold">A:{row.alpha}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: REKAP HARI INI / TANGGAL PRESENSI SEMUA KELAS */}
              {absensiSubTab === 'harian' && (
                <div className="space-y-6">
                  {/* Toolbar Kontrol Tanggal Rekap Harian */}
                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Tanggal Presensi
                        </label>
                        <input
                          type="date"
                          value={inputAbsensiTanggal}
                          onChange={(e) => setInputAbsensiTanggal(e.target.value)}
                          className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 text-slate-800 outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setInputAbsensiTanggal(new Date().toISOString().slice(0, 10))}
                        className="self-end sm:self-auto sm:mt-5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        Hari Ini
                      </button>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-2">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>
                        Progres: <strong className="text-blue-700 font-bold">{dailyGlobalStats.classesCompleted}</strong> dari 11 Rombel Terinput
                      </span>
                    </div>
                  </div>

                  {/* 5 Kartu Indikator Statistik Harian */}
                  <div>
                    <h2 className="text-sm font-black text-slate-800 mb-3">
                      Statistik Kehadiran Seluruh Santri ({inputAbsensiTanggal})
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-emerald-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hadir Hari Ini</p>
                        <p className="text-2xl font-black text-emerald-600 mt-1">{dailyGlobalStats.hadir}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Santri</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-amber-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sakit</p>
                        <p className="text-2xl font-black text-amber-600 mt-1">{dailyGlobalStats.sakit}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Santri</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-blue-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Izin</p>
                        <p className="text-2xl font-black text-blue-600 mt-1">{dailyGlobalStats.izin}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Santri</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-rose-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Alpha</p>
                        <p className="text-2xl font-black text-rose-600 mt-1">{dailyGlobalStats.alpha}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Santri</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-slate-700 col-span-2 sm:col-span-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">% Kehadiran</p>
                        <p className="text-2xl font-black text-emerald-600 mt-1">{dailyGlobalStats.pct}%</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Tingkat Disiplin</p>
                      </div>
                    </div>
                  </div>

                  {/* Tabel Rekapitulasi Presensi Semua Kelas pada Tanggal Ini */}
                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                        Rekap Presensi Harian Per Rombel Kelas ({inputAbsensiTanggal})
                      </h3>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 self-start sm:self-auto"
                      >
                        <FileText className="w-3.5 h-3.5" /> Cetak Lembar Hari Ini
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[750px] text-xs">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                            <th className="p-3 w-12 text-center">No</th>
                            <th className="p-3 w-24">Kelas</th>
                            <th className="p-3 text-center w-24">Total Siswa</th>
                            <th className="p-3 text-center bg-emerald-50 text-emerald-800 w-20">Hadir</th>
                            <th className="p-3 text-center bg-amber-50 text-amber-800 w-20">Sakit</th>
                            <th className="p-3 text-center bg-blue-50 text-blue-800 w-20">Izin</th>
                            <th className="p-3 text-center bg-rose-50 text-rose-800 w-20">Alpha</th>
                            <th className="p-3 text-center bg-slate-200 text-slate-800 w-24">% Hadir</th>
                            <th className="p-3 min-w-[200px]">Santri Tidak Hadir Hari Ini</th>
                            <th className="p-3 text-center w-24">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {dailyAttendanceSummary.map((row, idx) => (
                            <tr key={row.kelas} className="hover:bg-slate-50/80 transition">
                              <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                              <td className="p-3 font-black text-slate-800 text-sm">Kelas {row.kelas}</td>
                              <td className="p-3 text-center font-bold text-slate-600">{row.totalSiswa}</td>
                              <td className="p-3 text-center bg-emerald-50/40 font-mono font-bold text-emerald-700">{row.hadir}</td>
                              <td className="p-3 text-center bg-amber-50/40 font-mono font-bold text-amber-700">{row.sakit}</td>
                              <td className="p-3 text-center bg-blue-50/40 font-mono font-bold text-blue-700">{row.izin}</td>
                              <td className="p-3 text-center bg-rose-50/40 font-mono font-bold text-rose-700">{row.alpha}</td>
                              <td className="p-3 text-center">
                                {row.isInputted ? (
                                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                    Number(row.pct) >= 90
                                      ? 'text-emerald-700 bg-emerald-100'
                                      : Number(row.pct) >= 80
                                      ? 'text-amber-700 bg-amber-100'
                                      : 'text-rose-700 bg-rose-100'
                                  }`}>
                                    {row.pct}%
                                  </span>
                                ) : (
                                  <span className="text-[11px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                    Belum Diabsen
                                  </span>
                                )}
                              </td>
                              <td className="p-3">
                                {row.absentStudentsList.length === 0 ? (
                                  <span className="text-[11px] text-emerald-700 font-semibold italic">
                                    {row.isInputted ? 'Semua Hadir Tertib (Nihil)' : '-'}
                                  </span>
                                ) : (
                                  <div className="flex flex-wrap gap-1">
                                    {row.absentStudentsList.map((st, i) => (
                                      <span
                                        key={i}
                                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                          st.status === 'Sakit'
                                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                                            : st.status === 'Izin'
                                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                                            : 'bg-rose-50 text-rose-800 border-rose-200'
                                        }`}
                                      >
                                        {st.nama} ({st.status})
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setInputAbsensiKelas(row.kelas);
                                    setAbsensiSubTab('input');
                                  }}
                                  className="px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 font-bold text-[11px] transition shadow-2xs"
                                >
                                  {row.isInputted ? 'Edit' : 'Input'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: DETAIL KEHADIRAN PER SANTRI */}
              {absensiSubTab === 'detail' && (
                <div className="space-y-6">
                  {/* Toolbar Filter Detail */}
                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Pilih Kelas
                      </label>
                      <select
                        value={rekapKelas}
                        onChange={(e) => setRekapKelas(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {['7-A', '7-B', '7-C', '7-D', '7-E', '8-A', '8-B', '8-C', '8-D', '9-A', '9-B'].map(k => (
                          <option key={k} value={k}>Kelas {k}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Pilih Bulan
                      </label>
                      <input
                        type="month"
                        value={rekapBulan}
                        onChange={(e) => setRekapBulan(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={handleDownloadRekapCSV}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Unduh Rekap CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Detail Per Siswa */}
                  <div>
                    <h2 className="text-sm font-black text-slate-800 mb-3">
                      Detail Kehadiran Santri - Kelas {rekapKelas} (Bulan {rekapBulan})
                    </h2>
                    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                            <th className="p-3.5 w-12 text-center">No</th>
                            <th className="p-3.5 w-28">NIS</th>
                            <th className="p-3.5">Nama Santri</th>
                            <th className="p-3.5 text-center bg-emerald-50 text-emerald-800 w-16">H</th>
                            <th className="p-3.5 text-center bg-amber-50 text-amber-800 w-16">S</th>
                            <th className="p-3.5 text-center bg-blue-50 text-blue-800 w-16">I</th>
                            <th className="p-3.5 text-center bg-rose-50 text-rose-800 w-16">A</th>
                            <th className="p-3.5 text-center bg-slate-200 text-slate-800 w-28">Persentase</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {studentAttendanceInClass.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-slate-400 italic">
                                Belum ada data santri pada kelas ini.
                              </td>
                            </tr>
                          ) : (
                            studentAttendanceInClass.map((s, idx) => (
                              <tr key={s.nis || idx} className="hover:bg-slate-50 transition">
                                <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                                <td className="p-3 font-mono text-slate-500">{s.nis}</td>
                                <td className="p-3 font-bold uppercase text-slate-800">{s.nama}</td>
                                <td className="p-3 text-center bg-emerald-50/40 font-mono font-bold text-emerald-700">{s.hadir}</td>
                                <td className="p-3 text-center bg-amber-50/40 font-mono font-bold text-amber-700">{s.sakit}</td>
                                <td className="p-3 text-center bg-blue-50/40 font-mono font-bold text-blue-700">{s.izin}</td>
                                <td className="p-3 text-center bg-rose-50/40 font-mono font-bold text-rose-700">{s.alpha}</td>
                                <td className="p-3 text-center">
                                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                    Number(s.pct) >= 90
                                      ? 'text-emerald-700 bg-emerald-100'
                                      : Number(s.pct) >= 80
                                      ? 'text-amber-700 bg-amber-100'
                                      : 'text-rose-700 bg-rose-100'
                                  }`}>
                                    {s.pct}%
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: REKAP BULANAN */}
              {absensiSubTab === 'rekap' && (
                <div className="space-y-6">
                  {/* Toolbar Filter Rekap Bulanan */}
                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="w-full sm:w-72">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Pilih Bulan Rekapitulasi
                      </label>
                      <input
                        type="month"
                        value={rekapBulan}
                        onChange={(e) => setRekapBulan(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="text-xs text-slate-500 font-semibold self-end sm:self-center">
                      Menampilkan akumulasi seluruh rombel pada bulan: <strong className="text-blue-600 font-mono">{rekapBulan}</strong>
                    </div>
                  </div>

                  {/* 5 Kartu Ringkasan Statistik */}
                  <div>
                    <h2 className="text-sm font-black text-slate-800 mb-3">Statistik Absensi Bulan {rekapBulan}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-emerald-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Hadir</p>
                        <p className="text-2xl font-black text-emerald-600 mt-1">{globalMonthlyStats.hadir}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-amber-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Sakit</p>
                        <p className="text-2xl font-black text-amber-600 mt-1">{globalMonthlyStats.sakit}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-blue-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Izin</p>
                        <p className="text-2xl font-black text-blue-600 mt-1">{globalMonthlyStats.izin}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-rose-500">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Alpha</p>
                        <p className="text-2xl font-black text-rose-600 mt-1">{globalMonthlyStats.alpha}</p>
                      </div>
                      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200 border-l-4 border-l-slate-700">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">% Kehadiran</p>
                        <p className="text-2xl font-black text-emerald-600 mt-1">{globalMonthlyStats.pct}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Rekapitulasi Semua Kelas */}
                  <div>
                    <h2 className="text-sm font-black text-slate-800 mb-3">Rekapitulasi Semua Kelas</h2>
                    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[650px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                            <th className="p-3.5 text-center">Kelas</th>
                            <th className="p-3.5 text-center bg-emerald-50 text-emerald-800">Hadir</th>
                            <th className="p-3.5 text-center bg-amber-50 text-amber-800">Sakit</th>
                            <th className="p-3.5 text-center bg-blue-50 text-blue-800">Izin</th>
                            <th className="p-3.5 text-center bg-rose-50 text-rose-800">Alpha</th>
                            <th className="p-3.5 text-center bg-slate-200 text-slate-800">Persentase</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {classAttendanceSummary.map(row => (
                            <tr key={row.kelas} className="hover:bg-slate-50 transition">
                              <td className="p-3 text-center font-bold text-slate-800">Kelas {row.kelas}</td>
                              <td className="p-3 text-center bg-emerald-50/40 font-mono font-bold text-emerald-700">{row.hadir}</td>
                              <td className="p-3 text-center bg-amber-50/40 font-mono font-bold text-amber-700">{row.sakit}</td>
                              <td className="p-3 text-center bg-blue-50/40 font-mono font-bold text-blue-700">{row.izin}</td>
                              <td className="p-3 text-center bg-rose-50/40 font-mono font-bold text-rose-700">{row.alpha}</td>
                              <td className="p-3 text-center">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                  Number(row.pct) >= 90
                                    ? 'text-emerald-700 bg-emerald-100'
                                    : Number(row.pct) >= 80
                                    ? 'text-amber-700 bg-amber-100'
                                    : 'text-rose-700 bg-rose-100'
                                }`}>
                                  {row.pct}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: IMPORT DATA DARI FILE EXCEL / CSV */}
              {absensiSubTab === 'import' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 p-6">
                    <div className="max-w-3xl">
                      <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                        <span>📥 Import Hasil Absensi dari File (.csv / .xlsx)</span>
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Pilih file Excel atau CSV hasil rekap absensi. Data akan dibaca dan dikirim langsung ke tabel Supabase <code>presensi_siswa</code>.
                      </p>
                    </div>

                    {/* Dropzone Area */}
                    <div className="mt-6 border-2 border-dashed border-blue-300 bg-blue-50/50 hover:bg-blue-50 rounded-3xl p-8 text-center transition cursor-pointer relative">
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleExcelFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center pointer-events-none space-y-2">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                          <FileSpreadsheet className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">
                          Klik di sini untuk memilih file <span className="text-blue-600">Excel / CSV (.xlsx, .csv)</span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Format urutan kolom: <strong>Tanggal, Kelas, NIS, Nama Siswa, Status</strong>
                        </p>
                      </div>
                    </div>

                    {/* Opsi Lembar & Tombol Unggah */}
                    {importPreviewList.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-500 uppercase">Jumlah Baris:</span>
                          <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
                            {importPreviewList.length} Baris Siap Unggah
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleUploadImportToSupabase}
                          disabled={isImporting}
                          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-md flex items-center gap-2"
                        >
                          {isImporting && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                          <span>Unggah Semua ke Supabase</span>
                        </button>
                      </div>
                    )}

                    {/* Progress Bar Upload */}
                    {isImporting && (
                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-600">
                          <span>Mengunggah ke tabel presensi_siswa...</span>
                          <span>{importProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${importProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pratinjau Data (10 Baris Pertama) */}
                  {importPreviewList.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-xs font-bold text-slate-700 uppercase">
                          Pratinjau Data (10 Baris Pertama)
                        </h3>
                        <span className="text-xs text-slate-400">Pastikan data sudah sesuai</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[650px] text-xs">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                              <th className="p-3 w-12 text-center">No</th>
                              <th className="p-3 w-28">Tanggal</th>
                              <th className="p-3 w-24">Kelas</th>
                              <th className="p-3 w-28">NIS</th>
                              <th className="p-3">Nama Siswa</th>
                              <th className="p-3 text-center w-24">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {importPreviewList.slice(0, 10).map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="p-3 text-center text-slate-400 font-mono">{idx + 1}</td>
                                <td className="p-3 font-mono text-slate-600">{row.tanggal}</td>
                                <td className="p-3 font-bold text-slate-700">{row.kelas}</td>
                                <td className="p-3 font-mono text-slate-500">{row.nis}</td>
                                <td className="p-3 font-semibold text-slate-800">{row.nama_siswa}</td>
                                <td className="p-3 text-center">
                                  <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                    row.status === 'Hadir'
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : row.status === 'Sakit'
                                      ? 'bg-amber-50 text-amber-700'
                                      : row.status === 'Izin'
                                      ? 'bg-blue-50 text-blue-700'
                                      : 'bg-rose-50 text-rose-700'
                                  }`}>
                                    {row.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          
          {}
          {navTab === 'pengaturan' && (
            <div className="max-w-7xl mx-auto w-full space-y-6">
              
              <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-600" />
                    Manajemen Master Divisi, IKU & Program
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Kelola data master sistem monitoring pendidikan secara langsung ke database Supabase
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (activeMasterTab === 'divisi') {
                        setEditingMasterId(null);
                        setFormDivisiData({ name: '', code: '', coordinator_name: '' });
                        setMasterModalType('divisi');
                      } else if (activeMasterTab === 'iku') {
                        setEditingMasterId(null);
                        setFormIKUData({ division_id: activeDivisionId, kode_iku: '', title: '' });
                        setMasterModalType('iku');
                      } else {
                        setEditingMasterId(null);
                        setFormProgramData({
                          division_id: activeDivisionId,
                          iku_id: 0,
                          title: '',
                          timeframe: 'Harian',
                          target: 100,
                          target_teks: '100%'
                        });
                        setMasterModalType('program');
                      }
                    }}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/30 transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah {activeMasterTab === 'divisi' ? 'Divisi Baru' : activeMasterTab === 'iku' ? 'Indikator IKU' : 'Program Baru'}
                  </button>
                </div>
              </div>

              {/* Tab Selector Master */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-fit gap-1">
                <button
                  onClick={() => setActiveMasterTab('divisi')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeMasterTab === 'divisi' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Divisi Kerja ({divisions.length})
                </button>
                <button
                  onClick={() => setActiveMasterTab('iku')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeMasterTab === 'iku' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Indikator IKU ({ikus.length})
                </button>
                <button
                  onClick={() => setActiveMasterTab('program')}
                  className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeMasterTab === 'program' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Program Kegiatan ({templates.length})
                </button>
              </div>

              {/* Master Divisi Table */}
              {activeMasterTab === 'divisi' && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                          <th className="py-3 px-4 w-12 text-center">NO</th>
                          <th className="py-3 px-4 min-w-[100px]">KODE</th>
                          <th className="py-3 px-6 min-w-[200px]">NAMA DIVISI</th>
                          <th className="py-3 px-6 min-w-[220px]">KOORDINATOR</th>
                          <th className="py-3 px-4 text-center min-w-[100px]">TOTAL IKU</th>
                          <th className="py-3 px-4 text-center min-w-[100px]">TOTAL PROGRAM</th>
                          <th className="py-3 px-4 text-center min-w-[120px]">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {divisions.map((div, idx) => {
                          const divIkus = ikus.filter(i => Number(i.division_id) === Number(div.id)).length;
                          const divTpls = templates.filter(t => Number(t.division_id) === Number(div.id)).length;

                          return (
                            <tr key={div.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                              <td className="py-3 px-4 font-mono font-bold text-blue-600">{div.code}</td>
                              <td className="py-3 px-6 font-bold text-slate-900">{div.name}</td>
                              <td className="py-3 px-6 text-slate-600 font-medium">{div.coordinator_name || '-'}</td>
                              <td className="py-3 px-4 text-center font-bold text-slate-800">{divIkus}</td>
                              <td className="py-3 px-4 text-center font-bold text-slate-800">{divTpls}</td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingMasterId(div.id);
                                      setFormDivisiData({
                                        name: div.name,
                                        code: div.code,
                                        coordinator_name: div.coordinator_name || ''
                                      });
                                      setMasterModalType('divisi');
                                    }}
                                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                                    title="Edit Divisi"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDivisi(div.id, div.name)}
                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                                    title="Hapus Divisi"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master IKU Table */}
              {activeMasterTab === 'iku' && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Filter Divisi:</span>
                      <select
                        value={filterMasterDivisi}
                        onChange={(e) => setFilterMasterDivisi(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
                      >
                        <option value="all">Semua Divisi ({divisions.length})</option>
                        {divisions.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                          <th className="py-3 px-4 w-12 text-center">NO</th>
                          <th className="py-3 px-4 min-w-[120px]">KODE IKU</th>
                          <th className="py-3 px-6 min-w-[300px]">INDIKATOR KINERJA UTAMA</th>
                          <th className="py-3 px-5 min-w-[180px]">DIVISI</th>
                          <th className="py-3 px-4 text-center min-w-[100px]">PROGRAM</th>
                          <th className="py-3 px-4 text-center min-w-[120px]">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {ikus
                          .filter(i => filterMasterDivisi === 'all' || Number(i.division_id) === Number(filterMasterDivisi))
                          .map((iku, idx) => {
                            const divName = divisions.find(d => Number(d.id) === Number(iku.division_id))?.name || 'Divisi #';
                            const progCount = templates.filter(t => Number(t.iku_id) === Number(iku.id)).length;

                            return (
                              <tr key={iku.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                                <td className="py-3 px-4 font-mono font-bold text-blue-600">{iku.kode_iku}</td>
                                <td className="py-3 px-6 font-semibold text-slate-900">{iku.title}</td>
                                <td className="py-3 px-5 font-medium text-slate-600">{divName}</td>
                                <td className="py-3 px-4 text-center font-bold text-slate-800">{progCount}</td>
                                <td className="py-3 px-4 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      onClick={() => {
                                        setEditingMasterId(iku.id);
                                        setFormIKUData({
                                          division_id: iku.division_id,
                                          kode_iku: iku.kode_iku,
                                          title: iku.title
                                        });
                                        setMasterModalType('iku');
                                      }}
                                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                                      title="Edit IKU"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteIKU(iku.id, iku.kode_iku)}
                                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                                      title="Hapus IKU"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master Program Table */}
              {activeMasterTab === 'program' && (
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Filter Divisi:</span>
                      <select
                        value={filterMasterDivisi}
                        onChange={(e) => setFilterMasterDivisi(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800"
                      >
                        <option value="all">Semua Divisi ({divisions.length})</option>
                        {divisions.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                          <th className="py-3 px-4 w-12 text-center">NO</th>
                          <th className="py-3 px-6 min-w-[240px]">NAMA PROGRAM KEGIATAN</th>
                          <th className="py-3 px-5 min-w-[160px]">DIVISI</th>
                          <th className="py-3 px-5 min-w-[200px]">IKU TERKAIT</th>
                          <th className="py-3 px-4 text-center min-w-[100px]">TIMEFRAME</th>
                          <th className="py-3 px-4 text-center min-w-[100px]">TARGET</th>
                          <th className="py-3 px-4 text-center min-w-[120px]">AKSI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {templates
                          .filter(t => filterMasterDivisi === 'all' || Number(t.division_id) === Number(filterMasterDivisi))
                          .map((tpl, idx) => {
                            const divName = divisions.find(d => Number(d.id) === Number(tpl.division_id))?.name || 'Divisi';
                            const ikuObj = ikus.find(i => Number(i.id) === Number(tpl.iku_id));

                            return (
                              <tr key={tpl.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3 px-4 text-center font-mono text-slate-400">{idx + 1}</td>
                                <td className="py-3 px-6 font-bold text-slate-900">{tpl.title}</td>
                                <td className="py-3 px-5 font-medium text-slate-600">{divName}</td>
                                <td className="py-3 px-5 text-slate-600">
                                  {ikuObj ? (
                                    <div>
                                      <span className="font-mono text-[10px] text-blue-600 block">{ikuObj.kode_iku}</span>
                                      <span className="truncate block max-w-xs">{ikuObj.title}</span>
                                    </div>
                                  ) : (
                                    <span className="text-slate-400 italic">Umum Divisi</span>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-center font-semibold text-slate-700">{tpl.timeframe || 'Harian'}</td>
                                <td className="py-3 px-4 text-center font-mono font-bold text-blue-600">
                                  {tpl.target_teks || (tpl.target ? `${tpl.target}%` : '100%')}
                                </td>
                                <td className="py-3 px-4 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      onClick={() => {
                                        setEditingMasterId(tpl.id);
                                        setFormProgramData({
                                          division_id: tpl.division_id,
                                          iku_id: tpl.iku_id || 0,
                                          title: tpl.title,
                                          timeframe: tpl.timeframe || 'Harian',
                                          target: tpl.target || 100,
                                          target_teks: tpl.target_teks || '100%'
                                        });
                                        setMasterModalType('program');
                                      }}
                                      className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                                      title="Edit Program"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteProgram(tpl.id, tpl.title)}
                                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                                      title="Hapus Program"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          )}

      </main>

      {selectedSubmissionForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
            
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  Detail Hasil Pengawasan & Evaluasi
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Program: <strong className="text-slate-800">{selectedTemplate?.title || selectedSubmissionForDetail.target_subject}</strong> • ID #{selectedSubmissionForDetail.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmissionForDetail(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs">
              
             {/* 4 KARTU INFORMASI UTAMA (DINAMIS SESUAI CENTANGAN) */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {/* Kartu 1: Skor (Selalu Tampil) */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">SKOR KEPATUHAN</p>
                  <h4 className="text-xl font-black text-blue-600">{getSubmissionPercentage(selectedSubmissionForDetail)}%</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Skala: {selectedSubmissionForDetail.rata_rata || '3.0'} / 3.0</p>
                </div>
              
                {/* Kartu 2: Tanggal & Pemimpin */}
                {(currentPengawasConfig.kelas || currentPengawasConfig.jam) && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
                      {currentPengawasConfig.kelas ? (currentFieldDetails.kelas?.label?.toUpperCase() || 'TANGGAL') : ''}
                      {currentPengawasConfig.kelas && currentPengawasConfig.jam ? ' & ' : ''}
                      {currentPengawasConfig.jam ? (currentFieldDetails.jam?.label?.toUpperCase() || 'PENGAMPU/PEMIMPIN') : ''}
                    </p>
                    
                    {currentPengawasConfig.kelas && (
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {selectedSubmissionForDetail.target_class || '-'}
                      </h4>
                    )}
                    
                    {currentPengawasConfig.jam && (
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {currentFieldDetails.jam?.label || 'Pengampu/Pemimpin'}: {!selectedSubmissionForDetail.target_time_slot || selectedSubmissionForDetail.target_time_slot === '1-2' ? '-' : selectedSubmissionForDetail.target_time_slot}
                      </p>
                    )}
                  </div>
                )}
              
                {/* Kartu 3: Ustadz & Tempat */}
                {(currentPengawasConfig.guru || currentPengawasConfig.mapel) && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
                      {currentPengawasConfig.guru ? (currentFieldDetails.guru?.label?.toUpperCase() || 'USTADZ') : ''}
                      {currentPengawasConfig.guru && currentPengawasConfig.mapel ? ' / ' : ''}
                      {currentPengawasConfig.mapel ? (currentFieldDetails.mapel?.label?.toUpperCase() || 'TEMPAT') : ''}
                    </p>
                    
                    {currentPengawasConfig.guru && (
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {selectedSubmissionForDetail.target_person || '-'}
                      </h4>
                    )}
                    
                    {currentPengawasConfig.mapel && (
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {(!selectedSubmissionForDetail.target_subject || selectedSubmissionForDetail.target_subject === selectedTemplate?.title) ? '-' : selectedSubmissionForDetail.target_subject}
                      </p>
                    )}
                  </div>
                )}
              
                {/* Kartu 4: Keterangan */}
                {currentPengawasConfig.absen && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">
                      {currentFieldDetails.absen?.label?.toUpperCase() || 'KETERANGAN'}
                    </p>
                    <h4 className="text-sm font-bold text-rose-600 line-clamp-1">
                      {!selectedSubmissionForDetail.absent_students || selectedSubmissionForDetail.absent_students === 'Nihil' ? '-' : selectedSubmissionForDetail.absent_students}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {!selectedSubmissionForDetail.absent_students || selectedSubmissionForDetail.absent_students === 'Nihil' ? '-' : 'Catatan'}
                    </p>
                  </div>
                )}
              </div>
              
              {/* NAMA PETUGAS (PJ) & WAKTU */}
              <div className="flex items-center justify-between text-[11px] bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 mb-6">
                <div>
                  {currentPengawasConfig.pj ? (
                    <>
                      <span className="text-slate-500">{currentFieldDetails.pj?.label || 'Petugas Pemantau (PJ)'}: </span>
                      <span className="font-bold text-slate-900">{selectedSubmissionForDetail.pj_name}</span>
                    </>
                  ) : (
                    <span className="text-slate-500 font-bold">Log Laporan Pengawasan</span>
                  )}
                </div>
                <div className="text-slate-500 font-mono hidden sm:block">
                  {currentPengawasConfig.pj ? 'Waktu: ' : ''}{String(selectedSubmissionForDetail.submission_date || selectedSubmissionForDetail.created_at || '').slice(0, 16).replace('T', ' ')}
                </div>
              </div>

              <div className="space-y-2.5">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Rincian Indikator Masalah / Temuan Dicentang</span>
                  <span className="text-slate-400 font-mono">
                    {submissionDetailList.length} Temuan
                  </span>
                </h5>

                {detailItemsLoading ? (
                  <div className="p-6 text-center text-slate-400 flex items-center justify-center gap-2">
                    <RotateCw className="w-4 h-4 animate-spin text-blue-600" />
                    <span>Memuat rincian ceklis dari database...</span>
                  </div>
                ) : submissionDetailList.length === 0 ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tidak ada temuan pelanggaran (Semua indikator terlaksana dengan tertib / 100% Sesuai Standar).</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {submissionDetailList.map((item, i) => (
                      <div
                        key={item.id || i}
                        className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span className="font-medium">{item.item_text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Catatan Tambahan & Evaluasi Pengawas
              </h5>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 italic leading-relaxed whitespace-pre-line">
                {selectedSubmissionForDetail.general_notes || 'Tidak ada catatan tambahan.'}
              </div>
            </div>

          </div>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setSelectedSubmissionForDetail(null)}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition"
            >
              Tutup
            </button>
          </div>

        </div>
      </div>
    )}

    {/* MODAL DIALOG: RINCIAN NILAI SISWA PER ROMBEL */}
    {selectedRombelDetail && (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Rincian Nilai Siswa
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {selectedRombelDetail.nama_guru} • {selectedRombelDetail.nama_mapel} (Kelas {selectedRombelDetail.kelas}) • KKM: {selectedRombelDetail.kkm}
              </p>
            </div>
            <button
              onClick={() => setSelectedRombelDetail(null)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-3 w-10 text-center">NO</th>
                    <th className="py-2.5 px-3 min-w-[100px]">NIS</th>
                    <th className="py-2.5 px-4 min-w-[200px]">NAMA SISWA</th>
                    <th className="py-2.5 px-4 min-w-[120px]">UJIAN</th>
                    <th className="py-2.5 px-3 text-center min-w-[80px]">NILAI</th>
                    <th className="py-2.5 px-3 text-center min-w-[90px]">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {selectedRombelDetail.scores.map((s, i) => {
                    const val = Number(s.nilai || 0);
                    const isLulus = val >= selectedRombelDetail.kkm;
                    return (
                      <tr key={s.id || i} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-center font-mono text-slate-400">{i + 1}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{s.nis || '-'}</td>
                        <td className="py-2.5 px-4 font-bold text-slate-900">{s.nama_siswa}</td>
                        <td className="py-2.5 px-4 text-slate-500">{s.nama_ujian}</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900">
                          {val.toFixed(1)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isLulus ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}>
                            {isLulus ? 'Tuntas' : 'Remidi'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setSelectedRombelDetail(null)}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    )}

    {/* MODAL DIALOG: EDIT CATATAN BULANAN KEGIATAN IKU */}
    {modalCatatanTpl && (() => {
      const pulledNotes = getMonthlySubmissionNotes(modalCatatanTpl.id, laporanBulan);

      return (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Catatan Evaluasi Kegiatan
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate max-w-sm">
                  {modalCatatanTpl.title} &bull; Periode: <strong className="text-blue-700 font-mono">{laporanBulan}</strong>
                </p>
              </div>
              <button
                onClick={() => setModalCatatanTpl(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCatatanKegiatan} className="p-6 space-y-4">
              {/* Pilihan Mode: Tarik Otomatis dari Log atau Ketik Manual */}
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-900 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-blue-600" />
                    Sumber Isi Catatan:
                  </span>
                  <span className="text-[10px] font-mono font-semibold bg-white px-2 py-0.5 rounded-md border border-blue-200 text-blue-700">
                    {pulledNotes.length} log temuan bulan ini
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (pulledNotes.length === 0) {
                        showToast('Belum ada catatan temuan pada log kegiatan bulan ini.', 'error');
                      } else {
                        const compiled = pulledNotes.join('\n');
                        setInputCatatanTeks(compiled);
                        showToast(`${pulledNotes.length} catatan berhasil ditarik dari log!`);
                      }
                    }}
                    className="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tarik dari Log ({pulledNotes.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputCatatanTeks('')}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition"
                  >
                    Kosongkan
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Isi Catatan / Tindak Lanjut / Kendala Lapangan:
                </label>
                <textarea
                  rows={5}
                  value={inputCatatanTeks}
                  onChange={(e) => setInputCatatanTeks(e.target.value)}
                  placeholder="Tuliskan catatan evaluasi pencapaian target, kendala yang dihadapi, atau klik tombol 'Tarik dari Log' di atas..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed font-sans"
                />
                <p className="text-[10px] text-slate-400 mt-1 italic">
                  * Catatan dapat diedit bebas setelah ditarik otomatis dari log pengawasan.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalCatatanTpl(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingCatatan}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30 flex items-center gap-2"
                >
                  {isSavingCatatan && <RotateCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan Catatan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    })()}

    {masterModalType && (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900">
              {editingMasterId ? 'Edit Data' : 'Tambah Data Baru'}:{' '}
              {masterModalType === 'divisi' ? 'Divisi Kerja' : masterModalType === 'iku' ? 'Indikator IKU' : 'Program Kegiatan'}
            </h3>
            <button
              onClick={() => setMasterModalType(null)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {masterModalType === 'divisi' && (
            <form onSubmit={handleSaveDivisi} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Divisi</label>
                <input
                  type="text"
                  required
                  value={formDivisiData.name}
                  onChange={(e) => setFormDivisiData({ ...formDivisiData, name: e.target.value })}
                  placeholder="Contoh: Kurikulum, Kesiswaan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kode Divisi</label>
                <input
                  type="text"
                  required
                  value={formDivisiData.code}
                  onChange={(e) => setFormDivisiData({ ...formDivisiData, code: e.target.value.toUpperCase() })}
                  placeholder="Contoh: KUR, KES..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Koordinator</label>
                <input
                  type="text"
                  value={formDivisiData.coordinator_name}
                  onChange={(e) => setFormDivisiData({ ...formDivisiData, coordinator_name: e.target.value })}
                  placeholder="Nama lengkap koordinator..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMasterModalType(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30"
                >
                  Simpan Divisi
                </button>
              </div>
            </form>
          )}

          {masterModalType === 'iku' && (
            <form onSubmit={handleSaveIKU} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Divisi Penanggung Jawab</label>
                <select
                  value={formIKUData.division_id}
                  onChange={(e) => setFormIKUData({ ...formIKUData, division_id: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {divisions.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Kode IKU</label>
                <input
                  type="text"
                  required
                  value={formIKUData.kode_iku}
                  onChange={(e) => setFormIKUData({ ...formIKUData, kode_iku: e.target.value.toUpperCase() })}
                  placeholder="Contoh: IKU-KUR-01..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Judul / Rumusan Indikator IKU</label>
                <textarea
                  rows={3}
                  required
                  value={formIKUData.title}
                  onChange={(e) => setFormIKUData({ ...formIKUData, title: e.target.value })}
                  placeholder="Tuliskan indikator sasaran kinerja..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMasterModalType(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30"
                >
                  Simpan IKU
                </button>
              </div>
            </form>
          )}

          {masterModalType === 'program' && (
            <form onSubmit={handleSaveProgram} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Divisi Pelaksana</label>
                <select
                  value={formProgramData.division_id}
                  onChange={(e) => setFormProgramData({ ...formProgramData, division_id: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {divisions.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Indikator IKU Terkait</label>
                <select
                  value={formProgramData.iku_id}
                  onChange={(e) => setFormProgramData({ ...formProgramData, iku_id: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>(Umum Divisi / Tanpa IKU Khusus)</option>
                  {ikus
                    .filter(i => Number(i.division_id) === Number(formProgramData.division_id))
                    .map(i => (
                      <option key={i.id} value={i.id}>{i.kode_iku} - {i.title}</option>
                    ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Judul Program Kegiatan</label>
                <input
                  type="text"
                  required
                  value={formProgramData.title}
                  onChange={(e) => setFormProgramData({ ...formProgramData, title: e.target.value })}
                  placeholder="Contoh: Monitoring KBM, Klinik Belajar..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Timeframe</label>
                  <select
                    value={formProgramData.timeframe}
                    onChange={(e) => setFormProgramData({ ...formProgramData, timeframe: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Tahunan">Tahunan</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Capaian</label>
                  <input
                    type="text"
                    value={formProgramData.target_teks}
                    onChange={(e) => setFormProgramData({ ...formProgramData, target_teks: e.target.value })}
                    placeholder="Contoh: 100%, 80% Tuntas, 4 Kali"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMasterModalType(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-600/30"
                >
                  Simpan Program
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )}

      {editFieldKey && selectedTemplateId && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-black text-slate-800">Edit Konfigurasi Kolom Form</h3>
            <p className="text-[11px] text-slate-500 mt-1">Sesuaikan nama label, jenis inputan (Dropdown / Teks Singkat), serta daftar opsi pilihannya.</p>
          </div>
          
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Judul / Label Kolom:</label>
              <input 
                type="text" 
                value={editFieldForm.label} 
                onChange={e => setEditFieldForm({...editFieldForm, label: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Jenis Inputan:</label>
              <select 
                value={editFieldForm.type} 
                onChange={e => setEditFieldForm({...editFieldForm, type: e.target.value as InputType})}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              >
                <option value="dropdown">Dropdown (Pilihan Menu)</option>
                <option value="text">Teks Singkat (Input Bebas)</option>
              </select>
            </div>
    
            {editFieldForm.type === 'dropdown' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Daftar Opsi Pilihan:</label>
                <textarea 
                  rows={3}
                  value={editFieldForm.options} 
                  onChange={e => setEditFieldForm({...editFieldForm, options: e.target.value})}
                  placeholder="Contoh: Opsi 1, Opsi 2, Opsi 3"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <p className="text-[10px] text-slate-400 mt-1 italic">Ketik pilihan opsi dipisahkan tanda koma ( , ).</p>
              </div>
            )}
          </div>
    
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
            <button 
              onClick={() => setEditFieldKey(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition"
            >
              Batal
            </button>
           <button 
              onClick={async () => {
                // 1. Gabungkan data detail yang lama dengan yang baru diedit
                const currentConfig = fieldDetailsMap[selectedTemplateId] || {};
                const updatedTemplateConfig = { 
                  ...currentConfig, 
                  [editFieldKey]: editFieldForm 
                };
            
                // 2. Simpan permanen ke Supabase menggunakan fetch
                try {
                  const res = await fetch(`${SUPABASE_URL}/rest/v1/checklist_templates?id=eq.${selectedTemplateId}`, {
                    method: 'PATCH',
                    headers: reqHeaders,
                    body: JSON.stringify({ pengawas_field_details: updatedTemplateConfig })
                  });
            
                  if (!res.ok) throw new Error('Gagal memperbarui data');
            
                  // 3. Update state lokal
                  setFieldDetailsMap(prev => ({
                    ...prev,
                    [selectedTemplateId]: updatedTemplateConfig
                  }));
                  
                  setEditFieldKey(null);
                  showToast('Konfigurasi kolom berhasil disimpan permanen!', 'success');
                } catch (error: any) {
                  showToast('Gagal menyimpan ke database', 'error');
                }
              }}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    )}
      
  </div>
  );
}
