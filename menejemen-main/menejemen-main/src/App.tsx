import React, { useState, useEffect, useMemo, Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// @ts-ignore
import html2pdf from 'html2pdf.js';

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
const Search = createIcon(<><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>); 
const Menu = createIcon(<><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>);
const LogOut = createIcon(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>);

type TimeframeCategory = 'Harian' | 'Mingguan' | 'Bulanan' | 'Tahunan';
type NavigationTab = 'dashboard' | 'ceklis' | 'laporan' | 'rekap_absensi' | 'pengaturan' | 'monitoring_kebersihan' | 'pelanggaran' | 'perizinan';

interface PerizinanRecord {
  id: number;
  santri_id: string;
  nama_santri: string;
  jenjang: string;
  kelas: string;
  halaqoh: string;
  jenis_izin: string;
  pj: string;
  tanggal_izin: string;
  tanggal_kembali: string;
  keterangan: string;
  status: string;
  created_at?: string;
}

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

interface PresensiJamaahRecord {
  id?: string | number;
  tanggal: string; // Format: YYYY-MM-DD
  guru_id: string;
  nama_guru: string;
  waktu_sholat: 'Asar' | 'Magrib' | 'Isya' | 'Subuh';
  status: 'H' | 'A' | 'I' | 'P' | 'T'; // Hadir, Alpa, Izin, Diperlukan Lembaga, Terlambat
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
  const [inputAbsensiTanggal, setInputAbsensiTanggal] = useState<string>(() => new Date().toISOString().slice(0, 10));
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
  const [laporanBulan, setLaporanBulan] = useState<string>(() => new Date().toISOString().slice(0, 7));
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

// State Modul Presensi Jamaah Asatidz
const [presensiGuruList, setPresensiGuruList] = useState<PresensiJamaahRecord[]>([]);
  // === TAMBAHKAN KODE INI ===
const [editingPresensiCell, setEditingPresensiCell] = useState<{
  guru_id: string;
  nama_guru: string;
  tanggal: string;
  waktu_sholat: 'Asar' | 'Magrib' | 'Isya' | 'Subuh';
  status: string;
} | null>(null);
// ==========================
const [presensiSubTab, setPresensiSubTab] = useState<'ledger' | 'input' | 'import'>('ledger');
const [presensiBulan, setPresensiBulan] = useState<string>(() => new Date().toISOString().slice(0, 7));
const [presensiWaktuFilter, setPresensiWaktuFilter] = useState<'Semua' | 'Asar' | 'Magrib' | 'Isya' | 'Subuh'>('Semua');

// State untuk Fitur Import Presensi Asatidz
const [importAsatidzPreview, setImportAsatidzPreview] = useState<PresensiJamaahRecord[]>([]);
const [isImportingAsatidz, setIsImportingAsatidz] = useState(false);
// State untuk Form Input Presensi Asatidz
const [inputAsatidzTanggal, setInputAsatidzTanggal] = useState<string>(() => new Date().toISOString().slice(0, 10));
const [inputAsatidzWaktu, setInputAsatidzWaktu] = useState<'Asar' | 'Magrib' | 'Isya' | 'Subuh'>('Asar');
const [inputAsatidzStatus, setInputAsatidzStatus] = useState<Record<string, 'H' | 'A' | 'I' | 'P' | 'T'>>({});
const [isSavingAsatidz, setIsSavingAsatidz] = useState(false);
 
  // State khusus E-Kebersihan
const [kebersihanSubTab, setKebersihanSubTab] = useState<'dashboard' | 'input' | 'riwayat' | 'rekap'>('dashboard');
const [kebersihanFilterMode, setKebersihanFilterMode] = useState<'hari_ini' | 'bulan' | 'rentang'>('hari_ini');
const [kebersihanBulan, setKebersihanBulan] = useState<string>(() => new Date().toISOString().slice(0, 7));
const [kebersihanStartDate, setKebersihanStartDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
const [kebersihanEndDate, setKebersihanEndDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
const [isRiwayatKotorModalOpen, setIsRiwayatKotorModalOpen] = useState(false);
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
  
 // State untuk Filter & Sort Laporan Rekap Kebersihan
  const [rekapFilterMode, setRekapFilterMode] = useState<'hari_ini' | 'bulan' | 'rentang'>('bulan');
  const [rekapBulanTahun, setRekapBulanTahun] = useState<string>(() => new Date().toISOString().slice(0, 7));
  const [rekapStartDate, setRekapStartDate] = useState<string>(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
  });
  const [rekapEndDate, setRekapEndDate] = useState<string>(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().slice(0, 10);
  });

  // State untuk menentukan Kolom apa yang disortir & Arahnya (Naik/Turun)
  const [rekapSortConfig, setRekapSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'kasus', direction: 'desc' });

  // Efek Sinkronisasi Tanggal Otomatis
  useEffect(() => {
    if (rekapFilterMode === 'hari_ini') {
      const today = new Date().toISOString().slice(0, 10);
      setRekapStartDate(today);
      setRekapEndDate(today);
    } else if (rekapFilterMode === 'bulan') {
      const [year, month] = rekapBulanTahun.split('-');
      const firstDay = new Date(Number(year), Number(month) - 1, 1);
      const lastDay = new Date(Number(year), Number(month), 0);
      setRekapStartDate(`${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-01`);
      setRekapEndDate(`${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`);
    }
  }, [rekapFilterMode, rekapBulanTahun]);

  // Fungsi Toggle Sortir
  const handleSortRekap = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (rekapSortConfig && rekapSortConfig.key === key && rekapSortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setRekapSortConfig({ key, direction });
  };

  // State untuk Modal Riwayat Kotor di Rekap
  const [detailKamarModal, setDetailKamarModal] = useState<string | null>(null);
  
  // Data rekapitulasi kamar yang sudah diproses (Filter Rentang Waktu & Sortir Dinamis)
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

    // 2. Gabungkan data dengan daftar kamar dan hitung persentase
    let mapped = kamarList.map(k => {
      const riwayat = filteredLaporan.filter(l => l.kamar === k.nama_kamar);
      const asumsiTotalHari = 31;
      const persentase = Math.max(0, ((asumsiTotalHari - riwayat.length) / asumsiTotalHari) * 100);
      return {
        ...k,
        totalKasus: riwayat.length,
        persentase: persentase, // Disimpan untuk sorting
        riwayatKasus: riwayat
      };
    });

    // 3. Sortir data dinamis berdasarkan klik kolom
    mapped.sort((a, b) => {
      const { key, direction } = rekapSortConfig;
      let valA, valB;

      switch (key) {
        case 'kamar':
          const numA = parseInt((a.nama_kamar || '').replace(/\D/g, '')) || 0;
          const numB = parseInt((b.nama_kamar || '').replace(/\D/g, '')) || 0;
          if (numA !== numB) { valA = numA; valB = numB; } 
          else { valA = a.nama_kamar; valB = b.nama_kamar; }
          break;
        case 'jenjang':
          valA = a.jenjang; valB = b.jenjang; break;
        case 'wali':
          valA = a.wali_halaqoh; valB = b.wali_halaqoh; break;
        case 'kasus':
          valA = a.totalKasus; valB = b.totalKasus; break;
        case 'persentase':
          valA = a.persentase; valB = b.persentase; break;
        default:
          valA = a.totalKasus; valB = b.totalKasus;
      }

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return mapped;
  }, [kamarList, laporanKebersihanList, rekapStartDate, rekapEndDate, rekapSortConfig]);
  
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

  // --- STATE & LOGIKA SISTEM PERIZINAN SANTRI ---
  const [perizinanList, setPerizinanList] = useState<PerizinanRecord[]>([]);
  const [perizinanSubTab, setPerizinanSubTab] = useState<'ringkasan' | 'semua' | 'aktif' | 'input'>('ringkasan');
  
  // State Filter Laporan
  const [filterIzinSearch, setFilterIzinSearch] = useState('');
  const [filterIzinStatus, setFilterIzinStatus] = useState('Semua Status');
  const [filterIzinJenis, setFilterIzinJenis] = useState('Semua Jenis Izin');
  const [filterIzinBulan, setFilterIzinBulan] = useState('Semua Bulan');

  // State Form Input Izin
  const [formIzinKelas, setFormIzinKelas] = useState('Semua Kelas');
  const [formIzinHalaqoh, setFormIzinHalaqoh] = useState('Semua Halaqoh');
  const [formIzinSantriId, setFormIzinSantriId] = useState('');
  const [formIzinPJ] = useState('Pondok');
  const [formIzinTgl, setFormIzinTgl] = useState(() => new Date().toISOString().slice(0, 10));
  const [formIzinTglKembali, setFormIzinTglKembali] = useState(() => new Date().toISOString().slice(0, 10));
  const [formIzinJenis, setFormIzinJenis] = useState('Izin Pulang');
  const [formIzinJenisLainnya, setFormIzinJenisLainnya] = useState('');
  const [formIzinStatus, setFormIzinStatus] = useState('Aktif (masih di luar)');
  const [formIzinKeterangan, setFormIzinKeterangan] = useState('');
  const [formIzinSearchSantri, setFormIzinSearchSantri] = useState('');
  const [detailIzinModal, setDetailIzinModal] = useState<PerizinanRecord | null>(null);
  
  // State untuk Perpanjangan Izin
  const [perpanjangIzinModal, setPerpanjangIzinModal] = useState<PerizinanRecord | null>(null);
  const [perpanjangTglKembali, setPerpanjangTglKembali] = useState('');

  const handleSavePerpanjang = async () => {
    if (!perpanjangIzinModal || !perpanjangTglKembali) return;
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/perizinan_santri?id=eq.${perpanjangIzinModal.id}`, {
        method: 'PATCH',
        headers: reqHeaders,
        body: JSON.stringify({ tanggal_kembali: perpanjangTglKembali })
      });
      if (res.ok) {
        showToast('Masa perizinan berhasil diperpanjang!', 'success');
        setPerpanjangIzinModal(null);
        fetchSupabaseData(); // Refresh tabel
      } else {
        showToast('Gagal memperpanjang izin', 'error');
      }
    } catch (err) {
      showToast('Kesalahan koneksi', 'error');
    }
  };

  // Logika Filter Tabel Perizinan
  const filteredPerizinan = useMemo(() => {
      return perizinanList.filter(p => {
         const matchSearch = (p.nama_santri || '').toLowerCase().includes(filterIzinSearch.toLowerCase()) || 
                             (p.keterangan || '').toLowerCase().includes(filterIzinSearch.toLowerCase());
         const matchStatus = filterIzinStatus === 'Semua Status' ? true : p.status === filterIzinStatus;
         const matchJenis = filterIzinJenis === 'Semua Jenis Izin' ? true : p.jenis_izin === filterIzinJenis;
         
         let matchBulan = true;
         if (filterIzinBulan !== 'Semua Bulan' && p.tanggal_izin) {
           const [y, m] = p.tanggal_izin.split('-');
           const pBulan = `${y}-${m}`;
           matchBulan = filterIzinBulan === pBulan;
         }

         return matchSearch && matchStatus && matchJenis && matchBulan;
      });
  }, [perizinanList, filterIzinSearch, filterIzinStatus, filterIzinJenis, filterIzinBulan]);

  // Hitung Data Analitik Dashboard Perizinan
  const izinStats = useMemo(() => {
      const total = perizinanList.length;
      const sedangIzin = perizinanList.filter(p => p.status === 'Aktif').length;
      const sudahKembali = perizinanList.filter(p => p.status === 'Kembali').length;

      const pulang = perizinanList.filter(p => p.jenis_izin === 'Izin Pulang').length;
      const medis = perizinanList.filter(p => p.jenis_izin === 'Kontrol Kesehatan').length;
      const lainnya = perizinanList.filter(p => p.jenis_izin !== 'Izin Pulang' && p.jenis_izin !== 'Kontrol Kesehatan').length;

      const byKelas: Record<string, number> = {};
      perizinanList.forEach(p => {
          if (p.kelas && p.kelas !== '-') {
            byKelas[p.kelas] = (byKelas[p.kelas] || 0) + 1;
          }
      });
      const kelasChart = Object.entries(byKelas).sort((a,b) => b[1] - a[1]).slice(0, 3); // Ambil 3 kelas terbanyak

      return { total, sedangIzin, sudahKembali, pulang, medis, lainnya, kelasChart };
  }, [perizinanList]);

  const handleSubmitPerizinan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIzinSantriId) return showToast('Silakan pilih santri dari dropdown!', 'error');

    setIsLoading(true);
    const s = santriList.find(x => String(x.id) === formIzinSantriId);
    
    const payload = {
      santri_id: formIzinSantriId,
      nama_santri: s?.nama || '-',
      jenjang: s?.kelas?.includes('SMA') ? 'SMA' : 'SMP', 
      kelas: s?.kelas || '-',
      halaqoh: s?.halaqoh || '-',
      jenis_izin: formIzinJenis === 'Lainnya' && formIzinJenisLainnya.trim() !== '' ? formIzinJenisLainnya.trim() : formIzinJenis,
      pj: formIzinPJ,
      tanggal_izin: formIzinTgl,
      tanggal_kembali: formIzinTglKembali,
      keterangan: formIzinKeterangan,
      status: formIzinStatus === 'Aktif (masih di luar)' ? 'Aktif' : 'Kembali'
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/perizinan_santri`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify([payload])
      });
      if (res.ok) {
        showToast('Izin berhasil disimpan!', 'success');
        setFormIzinSantriId('');
        setFormIzinKeterangan('');
        setPerizinanSubTab('semua');
        fetchSupabaseData(); // Refresh Data Server
      } else {
        showToast('Gagal menyimpan izin!', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan jaringan', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetIzinKembali = async (id: number) => {
      if (!window.confirm('Tandai santri ini sudah kembali ke pondok?')) return;
      try {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/perizinan_santri?id=eq.${id}`, {
              method: 'PATCH',
              headers: reqHeaders,
              body: JSON.stringify({ status: 'Kembali' })
          });
          if (res.ok) {
              showToast('Status berhasil diubah menjadi Kembali!', 'success');
              fetchSupabaseData();
          } else {
              showToast('Gagal mengubah status', 'error');
          }
      } catch (err) {
          showToast('Kesalahan koneksi', 'error');
      }
  };
  
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
  const [dashPlgFilterMode, setDashPlgFilterMode] = useState<'hari_ini' | 'bulan' | 'rentang'>('bulan');
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
  if (dashPlgFilterMode === 'hari_ini') {
    const today = new Date().toISOString().slice(0, 10);
    setDashPlgMulai(today);
    setDashPlgSampai(today);
  } else if (dashPlgFilterMode === 'bulan') {
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

  // --- KODE BARU: LOGIKA PENGELOMPOKAN SP TERTINGGI PER SANTRI ---
  const dashboardStatsPlg = useMemo(() => {
    const totalSantri = santriList.length;
    const totalKasus = filteredDashboardPelanggaran.length; // Total Kasus tetap menghitung semua kejadian

    // 1. Kelompokkan berdasarkan santri dan cari SP tertingginya
    const spHierarchy = ['Tanpa SP', 'Surat Pernyataan', 'SP 1', 'SP 2', 'SP 3', 'SP Terakhir', 'Dikeluarkan'];
    const studentWorstSpMap = new Map<string, any>();

    filteredDashboardPelanggaran.forEach(p => {
        const santriKey = p.santri_id || p.nama;
        if (!santriKey) return;

        const existingRecord = studentWorstSpMap.get(santriKey);
        if (!existingRecord) {
            studentWorstSpMap.set(santriKey, p);
        } else {
            // Bandingkan bobot SP saat ini dengan SP yang sudah tersimpan
            const currentSpIndex = spHierarchy.indexOf(p.sp) > -1 ? spHierarchy.indexOf(p.sp) : 0;
            const existingSpIndex = spHierarchy.indexOf(existingRecord.sp) > -1 ? spHierarchy.indexOf(existingRecord.sp) : 0;
            
            // Ganti data jika SP lebih tinggi, ATAU jika bobot SP sama tapi tanggalnya lebih baru
            if (currentSpIndex > existingSpIndex) {
                studentWorstSpMap.set(santriKey, p);
            } else if (currentSpIndex === existingSpIndex) {
                if (new Date(p.tanggal) > new Date(existingRecord.tanggal)) {
                    studentWorstSpMap.set(santriKey, p);
                }
            }
        }
    });

    // Array berisi daftar santri unik beserta 1 pelanggaran dengan SP terberatnya
    const uniqueWorstViolations = Array.from(studentWorstSpMap.values());

    // 2. Hitung metrics berdasarkan SP tertinggi per santri
    const totalSPAktif = uniqueWorstViolations.filter(p => p.sp && p.sp !== 'Tanpa SP' && p.sp !== 'Dikeluarkan').length;
    const totalSP3Terakhir = uniqueWorstViolations.filter(p => p.sp === 'SP 3' || p.sp === 'SP Terakhir').length;
    const totalDikeluarkan = uniqueWorstViolations.filter(p => p.sp === 'Dikeluarkan').length;

    // 3. Update Chart Donut berdasarkan SP tertinggi per santri
    const spColors: Record<string, string> = {
        'Tanpa SP': '#94a3b8', 'Surat Pernyataan': '#38bdf8', 'SP 1': '#fbbf24', 
        'SP 2': '#f97316', 'SP 3': '#ef4444', 'SP Terakhir': '#9f1239', 'Dikeluarkan': '#450a0a' 
    };
    const spCounts: Record<string, number> = {
        'Tanpa SP': 0, 'Surat Pernyataan': 0, 'SP 1': 0, 'SP 2': 0, 'SP 3': 0, 'SP Terakhir': 0, 'Dikeluarkan': 0
    };
    
    uniqueWorstViolations.forEach(p => {
        if (spCounts[p.sp] !== undefined) spCounts[p.sp]++;
        else spCounts['Tanpa SP']++;
    });

    const totalSPForChart = uniqueWorstViolations.length || 1; 
    let accumulatedPct = 0;
    const gradientStops = Object.entries(spCounts).map(([key, count]) => {
        const pct = (count / totalSPForChart) * 100;
        const start = accumulatedPct;
        accumulatedPct += pct;
        return `${spColors[key]} ${start}% ${accumulatedPct}%`;
    }).join(', ');
    
    const donutStyle = { background: `conic-gradient(${gradientStops})` };

    // Kasus Per Halaqoh (Tetap menggunakan raw data karena ini menghitung kejadian)
    const halaqohStats: Record<string, number> = {};
    filteredDashboardPelanggaran.forEach(p => {
        const h = p.halaqoh || 'Lainnya';
        halaqohStats[h] = (halaqohStats[h] || 0) + 1;
    });
    const halaqohChartData = Object.entries(halaqohStats).map(([halaqoh, total]) => ({ halaqoh, total }));
    const maxHalaqohChart = Math.max(...halaqohChartData.map(d => d.total), 5);

    return {
        totalSantri, totalKasus, totalSPAktif, totalSP3Terakhir, totalDikeluarkan,
        donutStyle, spColors, halaqohChartData, maxHalaqohChart,
        uniqueWorstViolations // <--- Ini diexport agar bisa dipakai oleh Modal saat kartu diklik
    };
  }, [filteredDashboardPelanggaran, santriList]);
  // ----------------------------------------------------------------

  // --- STATE UNTUK GRAFIK KASUS PER BULAN ---
  // Format bulan untuk memastikan kita menampilkan bulan-bulan terkini
  const [dataKasusPerBulan, setDataKasusPerBulan] = useState<any[]>([]);

  useEffect(() => {
    // Mengolah data pelanggaran untuk membuat grafik per bulan
    const stats: Record<string, number> = {};
    
    // Ambil data 6 bulan terakhir sebagai template default (agar grafik tidak kosong)
    for(let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleDateString('id-ID', { month: 'short' });
      const yearStr = d.getFullYear().toString().slice(-2);
      stats[`${monthName} '${yearStr}`] = 0;
    }

    // Hitung dari raw data
    pelanggaranList.forEach(p => {
      if(p.tanggal) {
        const d = new Date(p.tanggal);
        const monthName = d.toLocaleDateString('id-ID', { month: 'short' });
        const yearStr = d.getFullYear().toString().slice(-2);
        const key = `${monthName} '${yearStr}`;
        
        if(stats[key] !== undefined) {
           stats[key] += 1;
        }
      }
    });

    const chartData = Object.entries(stats).map(([bulan, total]) => ({ bulan, total }));
    setDataKasusPerBulan(chartData);
  }, [pelanggaranList]);
  // ------------------------------------------
  
  // --- STATE UNTUK GRAFIK KEBERSIHAN PER BULAN ---
  const [dataKebersihanPerBulan, setDataKebersihanPerBulan] = useState<any[]>([]);

  useEffect(() => {
    const stats: Record<string, number> = {};
    
    // Siapkan wadah untuk 6 bulan terakhir sebagai default
    for(let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleDateString('id-ID', { month: 'short' });
      const yearStr = d.getFullYear().toString().slice(-2);
      stats[`${monthName} '${yearStr}`] = 0;
    }

    // Hitung data kebersihan dari laporanKebersihanList
    laporanKebersihanList.forEach(k => {
      if(k.tanggal) {
        const d = new Date(k.tanggal);
        const monthName = d.toLocaleDateString('id-ID', { month: 'short' });
        const yearStr = d.getFullYear().toString().slice(-2);
        const key = `${monthName} '${yearStr}`;
        
        if(stats[key] !== undefined) {
           stats[key] += 1;
        }
      }
    });

    const chartData = Object.entries(stats).map(([bulan, total]) => ({ bulan, total }));
    setDataKebersihanPerBulan(chartData);
  }, [laporanKebersihanList]);
  // ------------------------------------------------
  
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
      // Menggabungkan tanggal dari input manual dengan jam saat submit
      let finalSubmissionDate = new Date().toISOString();
      if (formKelas) { // formKelas adalah state untuk field 'Tanggal'
        const timePart = new Date().toISOString().substring(10); // Ambil format T00:00:00.000Z
        finalSubmissionDate = `${formKelas}${timePart}`;
      }
      
      const payload = {
        template_id: selectedTemplateId,
        pj_name: formPetugas,
        submission_date: finalSubmissionDate, // Gunakan variabel yang sudah disesuaikan
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
        fetch(`${SUPABASE_URL}/rest/v1/data_kamar?select=*`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/laporan_kebersihan?select=*&order=tanggal.desc`, { headers: reqHeaders }),
        fetch(`${SUPABASE_URL}/rest/v1/pelanggaran_santri?select=*&order=tanggal.desc`, { headers: reqHeaders })
      ]);

     const [divRes, ikuRes, tplRes, secRes, itRes, subRes, guruRes, mapelRes, waliRes, santriRes, kamarRes, laporanKebersihanRes, pelanggaranRes] = results;

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
    // Fetch Data Sistem Perizinan Santri
      try {
        const pzRes = await fetch(`${SUPABASE_URL}/rest/v1/perizinan_santri?select=*&order=tanggal_izin.desc`, { headers: reqHeaders });
        if (pzRes.ok) {
           const data = await pzRes.json();
           if (Array.isArray(data)) setPerizinanList(data);
        }
      } catch(e) { console.warn('Tabel perizinan_santri belum tersedia di database'); }
      
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
    // Fetch data Presensi Asatidz
    try {
      const pRes = await fetch(`${SUPABASE_URL}/rest/v1/presensi_asatidz?select=*&order=tanggal.desc&limit=100000`, { headers: reqHeaders });
      if (pRes.ok) {
        const data = await pRes.json();
        if (Array.isArray(data)) setPresensiGuruList(data);
      }
    } catch (e) {
      console.warn('Belum ada tabel presensi_asatidz');
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

    // Cek apakah template ini menggunakan target berbentuk 'count'
    const tpl = templates.find(t => t.id === templateId);
    const isCountFormat = tpl?.target_format === 'count';

    // --- TAMBAHKAN KODE INI UNTUK MENGECEK STATUS FIELD (AKTIF/TIDAK) ---
    const tplConfig = pengawasConfigMap[templateId] || DEFAULT_PENGAWAS_CONFIG;
    const isJamActive = tplConfig.jam; 
    const fieldDetails = fieldDetailsMap[templateId] || DEFAULT_FIELD_DETAILS;
    const labelPemimpin = fieldDetails.jam?.label || 'Pemimpin';
    // ---------------------------------------------------------------------

    const notesList: string[] = [];

    matchedSubs.forEach(s => {
      const note = String(s.general_notes || '').trim();
      const pengampu = String(s.target_time_slot || '').trim();

      // 1. Ambil dari isian form "Tanggal" (tersimpan di target_class)
      const isianTanggal = String(s.target_class || '').trim();
      let dateToUse = '';
      if (isianTanggal && isianTanggal !== '-' && isianTanggal.length >= 10) {
        dateToUse = isianTanggal.slice(0, 10);
      } else {
        // 2. Fallback ke waktu bawaan sistem / Supabase
        dateToUse = String(s.submission_date || s.created_at || '').slice(0, 10);
      }

      // 3. Format dari YYYY-MM-DD menjadi DD/MM/YYYY
      const [year, month, day] = dateToUse.split('-');
      const formattedDate = (day && month && year) ? `${day}/${month}/${year}` : dateToUse;

      const hasValidNote = note && note !== '-' && note.toLowerCase() !== 'nihil';
      
      // --- UBAH BARIS INI: Tambahkan isJamActive ---
      const hasPengampu = isJamActive && pengampu && pengampu !== '-' && pengampu.toLowerCase() !== 'nihil';

      // 4. Menyusun format baris log
      let logEntry = `• ${formattedDate}`;

      // Jika field aktif dan ada namanya, sisipkan menggunakan label yang sesuai
      if (hasPengampu) {
        logEntry += ` (${labelPemimpin}: ${pengampu})`;
      }

      if (hasValidNote) {
        // Jika ada catatan khusus yang ditulis, gabungkan
        logEntry += ` - ${note}`;
        notesList.push(logEntry);
      } else if (isCountFormat) {
        // KHUSUS untuk form 'Count': Jika tidak ada catatan khusus yang ditulis,
        // tetap tarik lognya sebagai bukti kegiatan telah "Terlaksana"
        logEntry += ` - Terlaksana`;
        notesList.push(logEntry);
      }
    });

    return notesList;
  };
 // --- LOGIKA REKAP PRESENSI ASATIDZ (LEDGER 1-31) ---
const presensiAsatidzLedger = useMemo(() => {
  const [year, month] = presensiBulan.split('-');
  const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Filter berdasarkan waktu (Asar/Magrib/Isya/Subuh) jika tidak 'Semua'
  const filteredList = presensiWaktuFilter === 'Semua'
    ? presensiGuruList
    : presensiGuruList.filter(p => p.waktu_sholat === presensiWaktuFilter);

  return guruList.map((guru, index) => {
    // PERBAIKAN 1: Logika pencocokan guru yang lebih robust (ID atau Nama)
    const guruRecords = filteredList.filter(p => {
      const matchId = String(p.guru_id) === String(guru.id);
      const matchName = String(p.nama_guru || '').trim().toLowerCase() === String(guru.nama_guru || '').trim().toLowerCase();
      return matchId || matchName;
    });

    const dailyStatus: Record<number, Record<string, string>> = {};
    let h = 0, a = 0, i = 0, p_stat = 0, t = 0;

    daysArray.forEach(day => {
      const dateStr = `${year}-${month}-${String(day).padStart(2, '0')}`;
      const recordsForDay = guruRecords.filter(r => r.tanggal === dateStr);
      
      // Deteksi hari: 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
      const dayOfWeek = new Date(Number(year), Number(month) - 1, day).getDay(); 
      
      let slotsForDay = ['Asar', 'Magrib', 'Isya', 'Subuh'];
      if (dayOfWeek === 6) slotsForDay = ['Subuh']; // Khusus Sabtu
      if (dayOfWeek === 0) slotsForDay = ['Magrib', 'Isya']; // Khusus Minggu

      const daySlotsStatus: Record<string, string> = {};

      slotsForDay.forEach(slot => {
        // Jika filter sedang aktif dan BUKAN slot ini, lewati pengecekan
        if (presensiWaktuFilter !== 'Semua' && presensiWaktuFilter !== slot) {
          daySlotsStatus[slot] = '-';
          return;
        }

        // PERBAIKAN 2: Pencocokan waktu sholat yang case-insensitive
        const record = recordsForDay.find(r => String(r.waktu_sholat || '').toLowerCase() === slot.toLowerCase());
        const st = record ? record.status : '-';
        daySlotsStatus[slot] = st;

        if (st === 'H') h++;
        else if (st === 'A') a++;
        else if (st === 'I') i++;
        else if (st === 'P') p_stat++;
        else if (st === 'T') t++;
      });

      dailyStatus[day] = daySlotsStatus;
    });

    const total = h + a + i + p_stat + t;
    // Rumus: (h + p_stat) digabung sebagai nilai positif / pembilang
    const pct = total > 0 ? (((h + p_stat) / total) * 100).toFixed(1) : '0.0';
    
    return {
        id: guru.id || guru.nama_guru, 
        no: index + 1,
        nama: guru.nama_guru,
        dailyStatus,
        h, a, i, p: p_stat, t, pct
      };
    });
  }, [presensiGuruList, presensiBulan, presensiWaktuFilter, guruList]);

  // --- FUNGSI & LOGIKA PRESENSI ASATIDZ ---
useEffect(() => {
  const existing = presensiGuruList.filter(p => p.tanggal === inputAsatidzTanggal && p.waktu_sholat === inputAsatidzWaktu);
  const initialMap: Record<string, 'H' | 'A' | 'I' | 'P' | 'T'> = {};
  guruList.forEach(g => {
    const key = String(g.id || g.nama_guru);
    const match = existing.find(e => String(e.guru_id) === key);
    initialMap[key] = match ? match.status : 'H'; // Default Hadir
  });
  setInputAsatidzStatus(initialMap);
}, [inputAsatidzTanggal, inputAsatidzWaktu, guruList, presensiGuruList]);

const handleSavePresensiAsatidz = async () => {
  if (guruList.length === 0) return showToast('Data guru masih kosong!', 'error');
  setIsSavingAsatidz(true);
  try {
    const recordsToInsert = guruList.map(g => ({
      tanggal: inputAsatidzTanggal,
      waktu_sholat: inputAsatidzWaktu,
      guru_id: String(g.id || g.nama_guru),
      nama_guru: g.nama_guru,
      status: inputAsatidzStatus[String(g.id || g.nama_guru)] || 'H'
    }));

    const encDate = encodeURIComponent(inputAsatidzTanggal);
    const encWaktu = encodeURIComponent(inputAsatidzWaktu);

    // 1. Hapus data presensi lama di waktu & tanggal yang sama (mencegah duplikat)
    await fetch(`${SUPABASE_URL}/rest/v1/presensi_asatidz?tanggal=eq.${encDate}&waktu_sholat=eq.${encWaktu}`, {
      method: 'DELETE', headers: reqHeaders
    }).catch(() => {});

    // 2. Simpan data baru
    const res = await fetch(`${SUPABASE_URL}/rest/v1/presensi_asatidz`, {
      method: 'POST', headers: reqHeaders, body: JSON.stringify(recordsToInsert)
    });

    if (res.ok) {
      showToast('Presensi Asatidz berhasil disimpan!', 'success');
      fetchSupabaseData(); // Refresh data dari server
      setPresensiSubTab('ledger'); // Balik ke halaman buku besar
    } else {
      showToast('Gagal! Pastikan tabel "presensi_asatidz" sudah dibuat di Supabase', 'error');
    }
  } catch (err) {
    showToast('Terjadi kesalahan jaringan', 'error');
  } finally {
    setIsSavingAsatidz(false);
  }
};
  
// === TAMBAHKAN FUNGSI INI DI BAWAH handleSavePresensiAsatidz ===
const handleUpdateSinglePresensi = async (newStatus: 'H' | 'A' | 'I' | 'P' | 'T' | 'DELETE') => {
  if (!editingPresensiCell) return;

  const encDate = encodeURIComponent(editingPresensiCell.tanggal);
  const encWaktu = encodeURIComponent(editingPresensiCell.waktu_sholat);
  const encGuruId = encodeURIComponent(editingPresensiCell.guru_id);

  try {
    // Selalu hapus data lama terlebih dahulu agar tidak duplikat
    await fetch(`${SUPABASE_URL}/rest/v1/presensi_asatidz?tanggal=eq.${encDate}&waktu_sholat=eq.${encWaktu}&guru_id=eq.${encGuruId}`, {
      method: 'DELETE', headers: reqHeaders
    }).catch(() => {});

    // Jika aksinya bukan DELETE (Kosongkan), simpan data baru
    if (newStatus !== 'DELETE') {
      const payload = [{
        tanggal: editingPresensiCell.tanggal,
        waktu_sholat: editingPresensiCell.waktu_sholat,
        guru_id: editingPresensiCell.guru_id,
        nama_guru: editingPresensiCell.nama_guru,
        status: newStatus
      }];

      const res = await fetch(`${SUPABASE_URL}/rest/v1/presensi_asatidz`, {
        method: 'POST', headers: reqHeaders, body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Gagal simpan');
    }

    // Refresh Data & Tutup Modal
    await fetchSupabaseData(); 
    setEditingPresensiCell(null);
    showToast(newStatus === 'DELETE' ? 'Data berhasil dikosongkan' : 'Presensi berhasil diperbarui!', 'success');

  } catch (err) {
    showToast('Terjadi kesalahan jaringan', 'error');
  }
};
// ================================================================
  
// --- 1. FUNGSI DOWNLOAD TEMPLATE ---
const handleDownloadTemplateAsatidz = () => {
  // Tambahkan kolom ID Guru di paling depan
  const headers = ['ID Guru', 'Nama Guru', 'Tanggal (YYYY-MM-DD)', 'Waktu Sholat (Asar/Magrib/Isya/Subuh)', 'Status (H/A/I/P/T)'];
  
  // Masukkan id dan nama ke dalam template, dibungkus kutip agar aman dari koma
  const sampleData = guruList.map(g => `"${g.id}","${g.nama_guru}",${new Date().toISOString().slice(0, 10)},Asar,H`);
  
  const csvContent = '\uFEFF' + [headers.join(','), ...sampleData].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Template_Import_Presensi_Asatidz.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- 2. FUNGSI PEMBACA FILE CSV (Lebih Cerdas Anti-Error) ---
const handleFileImportAsatidz = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (evt) => {
    try {
      const content = evt.target?.result;
      if (typeof content === 'string') {
        const lines = content.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
          const parsed: PresensiJamaahRecord[] = [];
          for (let i = 1; i < lines.length; i++) {
            const separator = lines[i].includes(';') ? ';' : ',';
            const regex = new RegExp(`${separator}(?=(?:[^"]*"[^"]*")*[^"]*$)`);
            const cols = lines[i].split(regex).map(c => c.replace(/^"|"$/g, '').trim());

            // Ubah pengecekan menjadi 5 kolom (karena ada ID)
            if (cols.length >= 5) {
              const id_guru = cols[0]; // Kolom 1: ID Guru
              const nama = cols[1];    // Kolom 2: Nama Guru
              let tgl = cols[2];       // Kolom 3: Tanggal
              
              if (!tgl || tgl.length < 8) continue; 

              if (tgl.includes('/')) {
                const parts = tgl.split('/');
                if (parts.length === 3 && parts[2].length === 4) {
                  tgl = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
                }
              }

              const wkt = ['Asar', 'Magrib', 'Isya', 'Subuh'].includes(cols[3]) ? cols[3] : 'Asar';
              const stat = ['H', 'A', 'I', 'P', 'T'].includes(cols[4].toUpperCase()) ? cols[4].toUpperCase() : 'H';

              // Langsung dorong data menggunakan ID dari CSV tanpa perlu mencocokkan nama lagi
              parsed.push({
                tanggal: tgl,
                waktu_sholat: wkt as any,
                guru_id: id_guru, 
                nama_guru: nama,
                status: stat as any
              });
            }
          }
          setImportAsatidzPreview(parsed);
          showToast(`${parsed.length} baris data siap diimpor!`, 'success');
        }
      }
    } catch (err) {
      showToast('Gagal memproses file CSV.', 'error');
    }
  };
  reader.readAsText(file);
};

// --- 3. FUNGSI PENYIMPAN KE SUPABASE (Cegah Duplikat) ---
const handleSaveImportAsatidz = async () => {
  if (importAsatidzPreview.length === 0) return showToast('Belum ada data untuk diimpor', 'error');
  setIsImportingAsatidz(true);
  
  try {
    // Langkah 1: Hapus data lama yang tanggal & waktunya sama persis (agar tidak tumpang tindih/duplikat)
    const uniqueKeys = Array.from(new Set(importAsatidzPreview.map(p => `${p.tanggal}|${p.waktu_sholat}`)));
    for (const key of uniqueKeys) {
      const [tgl, wkt] = key.split('|');
      await fetch(`${SUPABASE_URL}/rest/v1/presensi_asatidz?tanggal=eq.${tgl}&waktu_sholat=eq.${wkt}`, {
        method: 'DELETE',
        headers: reqHeaders
      }).catch(() => {});
    }

    // Langkah 2: Kirim data baru menggunakan metode batching (mencegah error jika data terlalu banyak)
    const batchSize = 100;
    let isSuccess = true;
    for (let i = 0; i < importAsatidzPreview.length; i += batchSize) {
      const chunk = importAsatidzPreview.slice(i, i + batchSize);
      const res = await fetch(`${SUPABASE_URL}/rest/v1/presensi_asatidz`, {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(chunk)
      });
      if (!res.ok) isSuccess = false;
    }

    if (isSuccess) {
      showToast(`Berhasil mengimpor ${importAsatidzPreview.length} data presensi!`, 'success');
      setImportAsatidzPreview([]);
      await fetchSupabaseData(); // Tunggu data selesai di-refresh
      setPresensiSubTab('ledger'); // Arahkan kembali ke buku besar
    } else {
      showToast('Sebagian data gagal disimpan. Periksa kembali isi file Anda!', 'error');
    }
  } catch (err) {
    showToast('Terjadi kesalahan jaringan saat impor', 'error');
  } finally {
    setIsImportingAsatidz(false);
  }
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


    const handleSubmitCeklis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplateId) {
      showToast('Pilih template kegiatan terlebih dahulu', 'error');
      return;
    }

    // --- TAMBAHKAN LOGIKA INI ---
    // Menggabungkan tanggal dari input manual dengan jam saat submit
    let finalSubmissionDate = new Date().toISOString();
    if (formKelas) { // formKelas adalah state untuk field 'Tanggal'
      const timePart = finalSubmissionDate.substring(10); // Ambil format jam T00:00:00.000Z
      finalSubmissionDate = `${formKelas}${timePart}`;
    }
    // ----------------------------

    const payload = {
      template_id: selectedTemplateId,
      pj_name: formPetugas,
      submission_date: finalSubmissionDate, // <--- UBAH BAGIAN INI
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

    // ... sisa kode tidak perlu diubah ...

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

  // ==========================================
   // FUNGSI EDIT RIWAYAT CEKLIS (DIVISI IKU)
  // ==========================================
  const [isEditSubmissionModalOpen, setIsEditSubmissionModalOpen] = useState(false);
  const [editSubmissionData, setEditSubmissionData] = useState<any>({});
  
  // State tambahan untuk menyimpan jawaban saat di-edit
  const [editCheckedItems, setEditCheckedItems] = useState<Record<number, boolean>>({});
  const [editFormAnswers, setEditFormAnswers] = useState<Record<number, string>>({});
  const [isEditLoadingDetails, setIsEditLoadingDetails] = useState(false);

  // Fungsi hitung skor dinamis saat mengedit form
  const editFormScore = useMemo(() => {
    let totalItemsCount = 0;
    let totalPointsEarned = 0;
    let defectCount = 0;

    if (!editSubmissionData.template_id) return { percentage: 100, scale3: 3.0, totalViolations: 0 };

    const sectionsForEdit = sections.filter(s => Number(s.template_id) === Number(editSubmissionData.template_id));

    sectionsForEdit.forEach(sec => {
      const secItems = getSectionItems(sec.id);
      const isPositif = (sectionTypeMap[sec.id] || (sec as any).section_type) === 'positif';

      secItems.forEach(it => {
        totalItemsCount += 1;
        const isChecked = !!editCheckedItems[it.id];

        if (isPositif) {
          if (isChecked) totalPointsEarned += 1;
          else defectCount += 1;
        } else {
          if (!isChecked) totalPointsEarned += 1;
          else defectCount += 1;
        }
      });
    });

    if (totalItemsCount === 0) return { percentage: 100, scale3: 3.0, totalViolations: 0 };
    const percentage = Math.max(0, Math.min(100, Math.round((totalPointsEarned / totalItemsCount) * 100)));
    const scale3 = parseFloat(((percentage / 100) * 3).toFixed(2));
    return { percentage, scale3, totalViolations: defectCount };
  }, [sections, items, editSubmissionData.template_id, editCheckedItems, sectionTypeMap]);

  const handleOpenEditSubmission = async (sub: Submission) => {
    setEditSubmissionData({
      id: sub.id,
      template_id: sub.template_id, // Penting untuk memanggil ulang template form
      pj_name: sub.pj_name || '',
      target_class: sub.target_class || '',
      target_person: sub.target_person || '',
      target_time_slot: sub.target_time_slot || '',
      absent_students: sub.absent_students || '',
      general_notes: sub.general_notes || '',
      submission_date: sub.submission_date || sub.created_at || new Date().toISOString()
    });
    
    setIsEditSubmissionModalOpen(true);
    setIsEditLoadingDetails(true);
    setEditCheckedItems({});
    setEditFormAnswers({});

    // Ambil data ceklis yang pernah diisi sebelumnya dari database
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/submission_details?submission_id=eq.${sub.id}`, { headers: reqHeaders });
      if (res.ok) {
        const details = await res.json();
        const newChecked: Record<number, boolean> = {};
        const newAnswers: Record<number, string> = {};
        
        details.forEach((d: any) => {
           const matchedItem = items.find(it => it.id === d.item_id);
           if (matchedItem && (!matchedItem.input_type || matchedItem.input_type === 'checkbox')) {
              newChecked[d.item_id] = d.answer_value === 'true';
           } else {
              newAnswers[d.item_id] = d.answer_value || '';
           }
        });
        setEditCheckedItems(newChecked);
        setEditFormAnswers(newAnswers);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEditLoadingDetails(false);
    }
  };

  const handleUpdateSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const oldTime = editSubmissionData.submission_date ? editSubmissionData.submission_date.substring(10) : 'T00:00:00.000Z';
      const newSubmissionDate = editSubmissionData.target_class 
        ? `${editSubmissionData.target_class.slice(0, 10)}${oldTime}` 
        : editSubmissionData.submission_date;

      const payload = {
        pj_name: editSubmissionData.pj_name,
        target_class: editSubmissionData.target_class,
        target_person: editSubmissionData.target_person,
        target_time_slot: editSubmissionData.target_time_slot,
        absent_students: editSubmissionData.absent_students,
        general_notes: editSubmissionData.general_notes,
        submission_date: newSubmissionDate,
        rate: editFormScore.percentage,
        rata_rata: editFormScore.scale3
      };

      const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions?id=eq.${editSubmissionData.id}`, {
        method: 'PATCH',
        headers: reqHeaders,
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        // Hapus detail form ceklis lama
        await fetch(`${SUPABASE_URL}/rest/v1/submission_details?submission_id=eq.${editSubmissionData.id}`, {
            method: 'DELETE',
            headers: reqHeaders
        });

        // Simpan detail form ceklis yang baru (yang di-edit)
        const sectionsForEdit = sections.filter(s => Number(s.template_id) === Number(editSubmissionData.template_id));
        const detailRecords: any[] = [];

        sectionsForEdit.forEach(sec => {
            const secItems = getSectionItems(sec.id);
            secItems.forEach(it => {
              let answerValue = '';
              if (!it.input_type || it.input_type === 'checkbox') {
                answerValue = editCheckedItems[it.id] ? 'true' : 'false';
              } else {
                answerValue = editFormAnswers[it.id] || '';
              }
              detailRecords.push({
                submission_id: editSubmissionData.id,
                item_id: it.id,
                answer_value: answerValue
              });
            });
        });

        if (detailRecords.length > 0) {
            await fetch(`${SUPABASE_URL}/rest/v1/submission_details`, {
                method: 'POST',
                headers: reqHeaders,
                body: JSON.stringify(detailRecords)
            });
        }

        showToast('Data riwayat & form ceklis berhasil diperbarui!', 'success');
        setIsEditSubmissionModalOpen(false);
        fetchSupabaseData(); // Refresh data
      } else {
        showToast('Gagal memperbarui data', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi', 'error');
    }
  };
  // ==========================================

  const handleDeleteSubmission = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data riwayat ini?')) return;

    try {
      // Hapus detail laporan terlebih dahulu (mencegah error foreign key)
      await fetch(`${SUPABASE_URL}/rest/v1/submission_details?submission_id=eq.${id}`, {
        method: 'DELETE',
        headers: reqHeaders
      });

      // Hapus data utama
      const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions?id=eq.${id}`, {
        method: 'DELETE',
        headers: reqHeaders
      });

      if (res.ok) {
        showToast('Data riwayat berhasil dihapus!', 'success');
        setSubmissions(prev => prev.filter(s => s.id !== id));
      } else {
        showToast('Gagal menghapus data riwayat', 'error');
      }
    } catch (err) {
      showToast('Terjadi kesalahan koneksi', 'error');
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
    
    // --- PERBAIKAN DI SINI ---
    const sanksiList = formPlgSanksiChecked.map(s => {
      // Jika opsi yang dipilih adalah "Lainnya (diisi sendiri)", ganti dengan isi dari input custom
      if (s === 'Lainnya (diisi sendiri)') {
        return formPlgSanksiCustom.trim() !== '' ? formPlgSanksiCustom.trim() : null;
      }
      return s;
    }).filter(Boolean).join('; ');
    // -------------------------

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
        setSelectedSantriPlgIds([]);
        setFormPlgBentuk('');
        setFormPlgSanksiChecked([]);
        setFormPlgSanksiCustom('');
        setFormPlgSP('Tanpa SP');
        setPelanggaranSubTab('laporan');
        fetchSupabaseData();
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

 // Fungsi Ekspor PDF Langsung Download
  const handleEksporPDF = () => {
    const element = document.getElementById('area-cetak-pdf');
    if (!element) return;

    // 1. Buat nama file dinamis sesuai filter
    let namaFile = 'Laporan_Kebersihan';
    if (rekapFilterMode === 'bulan') {
      const [year, month] = rekapBulanTahun.split('-');
      const namaBulan = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }).replace(' ', '_');
      namaFile += `_Bulan_${namaBulan}`;
    } else if (rekapFilterMode === 'hari_ini') {
      namaFile += `_${rekapStartDate}`;
    } else {
      namaFile += `_Rentang_${rekapStartDate}_sd_${rekapEndDate}`;
    }
    namaFile += '.pdf';

    // 2. Manipulasi DOM sementara (Tampilkan Kop, Sembunyikan Tombol)
    const headerEl = document.getElementById('header-cetak-pdf');
    if (headerEl) {
      headerEl.classList.remove('hidden', 'print:block');
      headerEl.classList.add('block');
    }
    
    const hiddenElements = element.querySelectorAll('.print\\:hidden');
    hiddenElements.forEach(el => el.classList.add('hidden'));

    // --- TRIK: HILANGKAN WARNA KAPSUL KHUSUS DI PDF AGAR RAPI SEPERTI EXCEL ---
    const pillElements = element.querySelectorAll('.pill-pdf-clean');
    pillElements.forEach(el => {
      el.classList.add('bg-transparent', 'text-black', 'p-0', 'shadow-none', 'font-black');
      el.classList.remove('bg-rose-100', 'text-rose-700', 'bg-emerald-100', 'text-emerald-700', 'rounded-full', 'px-3', 'py-1');
    });
    // ---------------------------------------------------------------------

    // 3. Opsi html2pdf
    const opt = {
      margin:       [0.4, 0.4, 0.4, 0.4], 
      filename:     namaFile,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' },
      pagebreak:    { mode: ['css', 'legacy'], avoid: 'tr' }
    };

    // 4. Eksekusi Download
    html2pdf().set(opt).from(element).save().then(() => {
      // 5. Kembalikan DOM seperti semula
      if (headerEl) {
        headerEl.classList.add('hidden', 'print:block');
        headerEl.classList.remove('block');
      }
      hiddenElements.forEach(el => el.classList.remove('hidden'));
      
      // Kembalikan kelas warna seperti semula di layar web
      pillElements.forEach(el => {
        el.classList.remove('bg-transparent', 'text-black', 'p-0', 'shadow-none', 'font-black');
        // Warna akan otomatis kembali dibaca dari state dinamis
      });
      window.location.reload(); // Refresh ringan untuk mengembalikan state tampilan web
    });
  };
  
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
                onClick={() => {
                  setNavTab('rekap_absensi'); // Tetap gunakan state ini atau ganti nama statenya nanti
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'rekap_absensi' 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <UserCheck className="w-5 h-5 shrink-0" />
                  {(isSidebarExpanded || isMobileMenuOpen) && <span className="truncate">Presensi Guru & Tendik</span>}
                </div>
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

              {/* ===== PASTE KODE LANGKAH 3 TEPAT DI SINI ===== */}
              <button
                onClick={() => {
                  setNavTab('perizinan');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  navTab === 'perizinan'
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <LogOut className={`w-5 h-5 shrink-0 ${navTab === 'perizinan' ? 'text-white' : 'text-teal-400'}`} />
                  {(isSidebarExpanded || isMobileMenuOpen) && (
                    <span className="truncate">Perizinan Santri</span>
                  )}
                </div>
              </button>
              {/* ============================================== */}
              
           
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
            <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 px-1 sm:px-0">
              
              {/* Header & Filter Ringkas 1 Baris (Responsif Mobile) */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full max-w-[100vw] sm:max-w-none">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight truncate">
                    Divisi {activeDivision.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                    Koordinator: <strong className="text-slate-700">{activeDivision.coordinator_name || 'Belum diatur'}</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                  {/* Timeframe Selector Pills */}
                  <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-between sm:justify-start overflow-x-auto scrollbar-none">
                    {(['Harian', 'Mingguan', 'Bulanan', 'Tahunan'] as TimeframeCategory[]).map(tf => (
                      <button
                        key={tf}
                        onClick={() => setActiveTimeframe(tf)}
                        className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center shrink-0 ${
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
                      className="flex-1 sm:flex-initial w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-xs truncate cursor-pointer disabled:opacity-50"
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
                <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-300 text-xs text-slate-400 w-full max-w-[100vw]">
                  Belum ada program kegiatan yang terdaftar pada timeframe {activeTimeframe}. Silakan tambahkan melalui menu <strong>Kelola Divisi, IKU & Program</strong>.
                </div>
              )}

              {/* Sub-Tab Navigasi (Input, Riwayat, Hasil, Customize) */}
              {selectedTemplate && (
                <div className="space-y-4 sm:space-y-6">
                  
                  <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 overflow-hidden w-full max-w-[100vw] sm:max-w-none">
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto">
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
                    <form onSubmit={handleSubmitCeklis} className="space-y-4 sm:space-y-6 w-full max-w-[100vw] sm:max-w-none overflow-x-hidden sm:overflow-visible px-1 sm:px-0">
                      
                      {/* Box Informasi Pengawasan (Tampil sesuai centangan customize) */}
                      {hasAnyPengawasFieldActive && (
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                            <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                            <span className="truncate">Informasi Pengawasan</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            
                            {/* 1. TANGGAL */}
                            {currentPengawasConfig.kelas && (
                              <div className="min-w-0">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 truncate">
                                  {currentFieldDetails.kelas?.label || 'Tanggal'}:
                                </label>
                                <input
                                  type="date"
                                  value={formKelas}
                                  onChange={(e) => setFormKelas(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                />
                              </div>
                            )}
                      
                            {/* 2. PETUGAS (PJ) */}
                            {currentPengawasConfig.pj && (() => {
                              const detail = currentFieldDetails.pj;
                              return (
                                <div className="min-w-0">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 truncate">
                                    {detail.label}:
                                  </label>
                                  {detail.type === 'dropdown' ? (
                                    <select
                                      value={formPetugas}
                                      onChange={(e) => setFormPetugas(e.target.value)}
                                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer truncate"
                                    >
                                      <option value="">-- Pilih --</option>
                                      {safeParseOptions(detail.options).map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
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
                      
                            {/* 3. USTADZ (GURU) */}
                            {currentPengawasConfig.guru && (
                              <div className="min-w-0">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 truncate">
                                  {currentFieldDetails.guru?.label || 'Ustadz'}:
                                </label>
                                <input
                                  type="text"
                                  value={formGuru}
                                  onChange={(e) => setFormGuru(e.target.value)}
                                  placeholder="Masukkan nama ustadz..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            )}
                      
                            {/* 4. TEMPAT (MAPEL) */}
                            {currentPengawasConfig.mapel && (
                              <div className="min-w-0">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 truncate">
                                  {currentFieldDetails.mapel?.label || 'Tempat'}:
                                </label>
                                <input
                                  type="text"
                                  value={formMapel}
                                  onChange={(e) => setFormMapel(e.target.value)}
                                  placeholder="Masukkan tempat..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            )}
                      
                            {/* 5. PENGAMPU/PEMIMPIN (JAM) */}
                            {currentPengawasConfig.jam && (
                              <div className="min-w-0">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 truncate">
                                  {currentFieldDetails.jam?.label || 'Pengampu/Pemimpin'}:
                                </label>
                                <input
                                  type="text"
                                  value={formJam}
                                  onChange={(e) => setFormJam(e.target.value)}
                                  placeholder="Masukkan nama pemimpin..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            )}
                      
                            {/* 6. KETERANGAN (ABSEN) */}
                            {currentPengawasConfig.absen && (
                              <div className="min-w-0">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 truncate">
                                  {currentFieldDetails.absen?.label || 'Keterangan'}:
                                </label>
                                <input
                                  type="text"
                                  value={formSiswaAbsen}
                                  onChange={(e) => setFormSiswaAbsen(e.target.value)}
                                  placeholder="Tambahkan keterangan..."
                                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            )}
                      
                          </div>
                        </div>
                      )}

                      {/* Sections & Checklist Items */}
                      {templateSections.length === 0 ? (
                        <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center border border-dashed border-slate-300">
                          <p className="text-xs text-slate-400">
                            Belum ada instrumen ceklis untuk kegiatan ini. Klik tab <strong>Customize Form</strong> untuk membuat indikator.
                          </p>
                        </div>
                      ) : (
                        templateSections.map(sec => {
                          const secItems = getSectionItems(sec.id);
                          const isPositif = (sectionTypeMap[sec.id] || (sec as any).section_type) === 'positif';

                          return (
                            <div key={sec.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 min-w-0">
                                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isPositif ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                  <span className="truncate">{sec.name}</span>
                                  <span className="text-[10px] font-normal text-slate-400 shrink-0">
                                    ({secItems.length} Item)
                                  </span>
                                </h4>

                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border text-center shrink-0 w-fit ${
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
                                      <div key={it.id} className="p-3 rounded-xl sm:rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5 min-w-0">
                                        <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                        <input
                                          type="text"
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          placeholder="Ketik jawaban..."
                                          className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  if (inputType === 'textarea') {
                                    return (
                                      <div key={it.id} className="sm:col-span-2 p-3 rounded-xl sm:rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5 min-w-0">
                                        <label className="block text-xs font-semibold text-slate-700 break-words">{it.item_text}</label>
                                        <textarea
                                          rows={2}
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          placeholder="Tulis uraian lengkap..."
                                          className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl p-3 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  if (inputType === 'number') {
                                    return (
                                      <div key={it.id} className="p-3 rounded-xl sm:rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5 min-w-0">
                                        <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                        <input
                                          type="number"
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          placeholder="0"
                                          className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  if (inputType === 'select') {
                                    const optionsList = safeParseOptions(it.options);
                                    return (
                                      <div key={it.id} className="p-3 rounded-xl sm:rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5 min-w-0">
                                        <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                        <select
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer font-medium truncate"
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
                                      <div key={it.id} className="p-3 rounded-xl sm:rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-2 min-w-0">
                                        <label className="block text-xs font-semibold text-slate-700 break-words">{it.item_text}</label>
                                        <div className="flex flex-wrap gap-2">
                                          {radioOptions.map((opt: string) => {
                                            const isSelected = formAnswers[it.id] === opt;
                                            return (
                                              <label
                                                key={opt}
                                                className={`px-3 py-1.5 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-medium cursor-pointer transition select-none ${
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
                                      <div key={it.id} className="p-3 rounded-xl sm:rounded-2xl border bg-slate-50/70 border-slate-200/70 space-y-1.5 min-w-0">
                                        <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                        <input
                                          type="date"
                                          value={formAnswers[it.id] || ''}
                                          onChange={(e) => setFormAnswers({ ...formAnswers, [it.id]: e.target.value })}
                                          className="w-full bg-white border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                      </div>
                                    );
                                  }

                                  return (
                                    <label
                                      key={it.id}
                                      className={`p-3 rounded-xl sm:rounded-2xl border flex items-start gap-3 cursor-pointer transition select-none min-w-0 ${
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
                                        className={`mt-0.5 rounded cursor-pointer shrink-0 ${
                                          isPositif
                                            ? 'text-emerald-600 focus:ring-emerald-500'
                                            : 'text-rose-600 focus:ring-rose-500'
                                        }`}
                                      />
                                      <span className="text-xs font-semibold leading-relaxed break-words flex-1">
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
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-3">
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
                            <span className="text-[11px] sm:text-xs text-slate-500 font-semibold">
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
                            <Save className="w-4 h-4 shrink-0" />
                            Simpan Laporan Ceklis
                          </button>
                        </div>
                      </div>

                    </form>
                  )}

                  {/* TAB 2: RIWAYAT INPUT */}
                  {activeSubTab === 'riwayat' && (
                    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden w-full max-w-[100vw] sm:max-w-none">
                      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Log Riwayat Pengawasan ({programSubmissions.length} Data)
                        </h4>
                        <button
                          onClick={() => window.print()}
                          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0"
                        >
                          <FileText className="w-3.5 h-3.5" /> Cetak
                        </button>
                      </div>

                      {programSubmissions.length === 0 ? (
                        <div className="p-12 text-center text-slate-400 text-xs italic">
                          Belum ada data riwayat pengisian untuk program ini.
                        </div>
                      ) : (
                        <div className="overflow-x-auto w-full custom-scrollbar">
                          <table className="w-full text-left text-xs border-collapse min-w-[900px]">
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
                                  {/* Kolom aksi dibuat sticky agar menempel di sisi kanan layar saat di-scroll */}
                                  <td className="py-3 px-4 text-center sticky right-0 bg-white group-hover:bg-blue-50/60 shadow-[-4px_0_10px_rgba(0,0,0,0.03)] transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-center gap-1.5">
                                      {/* Tombol Detail */}
                                      <button 
                                        onClick={() => handleOpenSubmissionDetail(sub)}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition shadow-2xs"
                                        title="Lihat Detail Hasil Pengawasan"
                                      >
                                        <Eye className="w-3.5 h-3.5" />
                                        <span className="hidden xl:inline">Detail</span>
                                      </button>
                                      
                                      {/* Tombol Edit */}
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenEditSubmission(sub);
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-600 hover:text-white font-bold text-[11px] transition shadow-2xs"
                                        title="Edit Data Riwayat"
                                      >
                                        <Edit className="w-3.5 h-3.5" />
                                        <span className="hidden xl:inline">Edit</span>
                                      </button>
                                      
                                      {/* Tombol Hapus */}
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteSubmission(sub.id);
                                        }}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-[11px] transition shadow-2xs"
                                        title="Hapus Riwayat Pengawasan"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span className="hidden xl:inline">Hapus</span>
                                      </button>
                                    </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-[100vw] sm:max-w-none px-1 sm:px-0">
                      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          TARGET RESMI IKU
                        </span>
                        <div className="text-3xl font-black text-slate-900">
                          {selectedTemplate.target_teks || (selectedTemplate.target ? `${selectedTemplate.target}%` : '100%')}
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400">Target indikator kinerja utama divisi</p>
                      </div>

                      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          REALISASI TERCAPAI
                        </span>
                        <div className="text-3xl font-black text-blue-600">
                          {getProgramRealisasi(selectedTemplate)}
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400">Rata-rata kepatuhan dari {programSubmissions.length} sesi</p>
                      </div>

                      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          KETERISIAN DATA
                        </span>
                        <div className="text-3xl font-black text-emerald-600">
                          {programSubmissions.length} Laporan
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400">Total formulir ceklis berhasil diinput</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CUSTOMIZE FORM */}
                  {activeSubTab === 'customize' && (
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-5 sm:space-y-6 w-full max-w-[100vw] sm:max-w-none overflow-x-hidden sm:overflow-visible">

                      {/* ===== PENGATURAN BENTUK TARGET REALISASI ===== */}
                      <div className="p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                        <div>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 break-words">
                            <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
                            Pengaturan Bentuk Target Realisasi
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                            Pilih apakah hasil akhir target realisasi pada program ini ditampilkan dalam bentuk Persentase (%) atau Count (Hitungan Frekuensi Pengisian).
                          </p>
                        </div>
                        
                        <div className="pt-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            Pilih Bentuk Target Realisasi:
                          </label>
                          <select 
                            value={selectedTemplate?.target_format || targetFormat} 
                            onChange={(e) => {
                              const newValue = e.target.value as 'persentase' | 'count';
                              if (selectedTemplate?.id) updateTargetFormat(selectedTemplate.id, newValue);
                              else setTargetFormat(newValue);
                            }}
                            className="w-full sm:w-1/2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          >
                            <option value="persentase">Persentase (%)</option>
                            <option value="count">Count (Hitungan Berapa Kali Diisi)</option>
                          </select>
                        </div>
                      </div>
                      
                      {/* Panel Centangan Modul Informasi Pengawasan */}
                      <div className="p-4 rounded-xl sm:rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                              <span className="break-words">Kolom Informasi Pengawasan</span>
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                              Centang modul yang ingin ditampilkan pada form
                            </p>
                          </div>
                          <div className="flex items-center justify-start sm:justify-end gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setAllPengawasFields(selectedTemplate.id, true)}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline px-1"
                            >
                              Centang Semua
                            </button>
                            <span className="text-slate-300">|</span>
                            <button
                              type="button"
                              onClick={() => setAllPengawasFields(selectedTemplate.id, false)}
                              className="text-[10px] font-bold text-slate-500 hover:text-slate-700 underline px-1"
                            >
                              Kosongkan Semua
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-3 pt-1">
                          {[
                            { key: 'kelas', defaultLabel: 'Tanggal' },
                            { key: 'pj', defaultLabel: 'Petugas (PJ)' },
                            { key: 'guru', defaultLabel: 'Ustadz' },
                            { key: 'mapel', defaultLabel: 'Tempat' },
                            { key: 'jam', defaultLabel: 'Pengampu/Pemimpin' },
                            { key: 'absen', defaultLabel: 'Keterangan' }
                          ].map(f => {
                            const fieldKey = f.key as PengawasFieldKey;
                            const isChecked = currentPengawasConfig[fieldKey];
                            const fieldDetail = currentFieldDetails[fieldKey] || DEFAULT_FIELD_DETAILS[fieldKey];
                          
                            return (
                              <div key={f.key} className={`relative flex items-center justify-between p-3 rounded-xl border transition min-w-0 ${isChecked ? 'bg-white border-blue-400 shadow-sm' : 'bg-slate-50 border-slate-200 opacity-70'}`}>
                                <label className="flex items-center gap-2.5 cursor-pointer select-none flex-1 min-w-0">
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked} 
                                    onChange={() => togglePengawasField(selectedTemplate!.id, fieldKey)} 
                                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 shrink-0" 
                                  />
                                  <div className="flex flex-col min-w-0">
                                    <span className={`text-xs font-bold truncate ${isChecked ? 'text-blue-900' : 'text-slate-500'}`}>{fieldDetail.label || f.defaultLabel}</span>
                                    {isChecked && (
                                      <span className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">{fieldDetail.type === 'dropdown' ? 'Dropdown' : 'Teks'}</span>
                                    )}
                                  </div>
                                </label>
                                
                                {isChecked && (
                                  <button 
                                    type="button"
                                    onClick={() => {
                                      setEditFieldKey(fieldKey);
                                      setEditFieldForm(fieldDetail);
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition shrink-0 ml-1"
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
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mt-4">
                        <div className="min-w-0">
                          <h4 className="text-sm font-black text-slate-900 break-words">Pengaturan Kategori & Indikator</h4>
                          <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 break-words">
                            Sesuaikan butir ceklis untuk program ini
                          </p>
                        </div>
                      </div>

                      {/* Tambah Section / Kategori Baru */}
                      <div className="flex flex-col md:flex-row gap-2.5">
                        <input
                          type="text"
                          value={newSectionName}
                          onChange={(e) => setNewSectionName(e.target.value)}
                          placeholder="Nama Kategori Baru (misal: Kebersihan)..."
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                          value={newSectionType}
                          onChange={(e) => setNewSectionType(e.target.value as 'positif' | 'negatif')}
                          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="negatif">🔴 Tipe Negatif (Temuan)</option>
                          <option value="positif">🟢 Tipe Positif (Terlaksana)</option>
                        </select>
                        <button
                          onClick={handleAddSection}
                          className="px-4 py-2.5 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                        >
                          <Plus className="w-4 h-4 shrink-0" /> Tambah Kategori
                        </button>
                      </div>

                      {/* List Sections */}
                      <div className="space-y-4 pt-2">
                        {templateSections.map(sec => {
                          const secItems = getSectionItems(sec.id);
                          const isPositif = (sectionTypeMap[sec.id] || (sec as any).section_type) === 'positif';

                          return (
                            <div key={sec.id} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className={`w-2 h-2 rounded-full shrink-0 ${isPositif ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                  <span className="font-bold text-xs sm:text-sm text-slate-800 break-words">
                                    {sec.name}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                    ({secItems.length} Item)
                                  </span>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-2 shrink-0">
                                  <select
                                    value={isPositif ? 'positif' : 'negatif'}
                                    onChange={(e) => updateSectionType(sec.id, e.target.value as 'positif' | 'negatif')}
                                    className={`text-[10px] font-bold rounded-lg px-2 py-1.5 sm:py-1 border cursor-pointer outline-none flex-1 md:flex-none ${
                                      isPositif
                                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                                        : 'bg-rose-50 border-rose-300 text-rose-700'
                                    }`}
                                  >
                                    <option value="negatif">🔴 Negatif</option>
                                    <option value="positif">🟢 Positif</option>
                                  </select>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteSection(sec.id, sec.name)}
                                    className="p-1.5 sm:p-1 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition border border-rose-200/80 bg-white shadow-2xs shrink-0"
                                    title={`Hapus kategori "${sec.name}"`}
                                  >
                                    <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {secItems.map(it => (
                                  <div key={it.id} className="p-2.5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                                      <span className="font-medium text-slate-700 break-words leading-snug">{it.item_text}</span>
                                      <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 w-fit shrink-0">
                                        {it.input_type === 'text' ? 'Teks' :
                                         it.input_type === 'number' ? 'Angka' :
                                         it.input_type === 'textarea' ? 'Uraian' :
                                         it.input_type === 'select' ? 'Dropdown' :
                                         it.input_type === 'radio' ? 'Radio' :
                                         it.input_type === 'date' ? 'Tanggal' : 'Ceklis'}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() => handleDeleteItem(it.id)}
                                      className="text-rose-500 hover:text-rose-700 p-1.5 sm:p-1 bg-rose-50 sm:bg-transparent rounded-lg sm:rounded-none shrink-0 self-end sm:self-auto"
                                      title="Hapus Indikator"
                                    >
                                      <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              {newItemSectionId === sec.id ? (
                                <div className="p-3 bg-white border border-slate-200 rounded-xl sm:rounded-2xl space-y-2.5 pt-2">
                                  <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
                                    <input
                                      type="text"
                                      value={newItemText}
                                      onChange={(e) => setNewItemText(e.target.value)}
                                      placeholder={isPositif ? "Teks standar..." : "Teks temuan..."}
                                      className="sm:col-span-2 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 sm:py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <select
                                      value={newItemInputType}
                                      onChange={(e) => setNewItemInputType(e.target.value)}
                                      className="bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 sm:py-1.5 text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                      <option value="checkbox">☑️ Ceklis</option>
                                      <option value="text">📝 Teks</option>
                                      <option value="textarea">📄 Uraian</option>
                                      <option value="number">🔢 Angka</option>
                                      <option value="select">🔽 Dropdown</option>
                                      <option value="radio">🔘 Radio</option>
                                      <option value="date">📅 Tanggal</option>
                                    </select>
                                  </div>

                                  {(newItemInputType === 'select' || newItemInputType === 'radio') && (
                                    <div>
                                      <input
                                        type="text"
                                        value={newItemOptions}
                                        onChange={(e) => setNewItemOptions(e.target.value)}
                                        placeholder="Ketik opsi (contoh: Baik, Cukup, Kurang)"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 sm:py-1.5 text-xs text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
                                      />
                                      <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1 italic">
                                        * Pisahkan tiap pilihan dengan tanda koma (,).
                                      </p>
                                    </div>
                                  )}

                                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNewItemSectionId(null);
                                        setNewItemText('');
                                        setNewItemInputType('checkbox');
                                        setNewItemOptions('');
                                      }}
                                      className="px-4 py-2 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg sm:rounded-xl text-xs font-bold transition flex-1 sm:flex-none"
                                    >
                                      Batal
                                    </button>
                                    <button
                                      onClick={() => handleAddItem(sec.id)}
                                      className="px-4 py-2 sm:py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg sm:rounded-xl text-xs font-bold transition shadow-xs flex-1 sm:flex-none"
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
                                  className="w-full py-2.5 sm:py-2 border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 rounded-lg sm:rounded-xl text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1.5 transition"
                                >
                                  <Plus className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> Tambah Indikator
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
                   
                    {/* Opsi Tab Mode Filter kebersihan*/}
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
      
     {/* Kartu 1: Total Kasus Kotor (Sekarang bisa diklik) */}
      <div 
        onClick={() => setIsRiwayatKotorModalOpen(true)}
        className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-rose-300 hover:shadow-md transition-all group"
      >
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-100 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5 group-hover:text-rose-600 transition-colors">Total Kasus Kotor</p>
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
          <h3 className="text-xl font-black text-slate-800 leading-none flex items-end gap-1.5">
            <span>{maxKamar}</span>
            {/* Memunculkan nama Wali Halaqoh jika ada kamar yang kotor */}
            {maxKamar !== '-' && (
              <span className="text-xs font-semibold text-slate-500 pb-0.5">
                ({kamarList.find(k => k.nama_kamar === maxKamar)?.wali_halaqoh || 'Belum diatur'})
              </span>
            )}
          </h3>
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

      {/* Modal Riwayat Total Kasus Kotor */}
          {isRiwayatKotorModalOpen && (
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setIsRiwayatKotorModalOpen(false)}>
              <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                
                {/* Header Modal */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl">
                      <History className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Detail Riwayat Kasus Kotor</h3>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Daftar kamar kotor berdasarkan rentang waktu filter saat ini</p>
                    </div>
                  </div>
                  <button onClick={() => setIsRiwayatKotorModalOpen(false)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabel Riwayat */}
                <div className="flex-1 overflow-y-auto p-0">
                  {filteredLaporanKebersihan.length === 0 ? (
                    <div className="p-12 text-center text-slate-400 text-sm italic">
                      Tidak ada kasus kotor pada rentang waktu ini.
                    </div>
                  ) : (
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-50 text-slate-500 sticky top-0 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-5 uppercase tracking-wider font-bold w-32">Tanggal</th>
                          <th className="py-3 px-5 uppercase tracking-wider font-bold w-24">Kamar</th>
                          <th className="py-3 px-5 uppercase tracking-wider font-bold">Keterangan Kondisi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredLaporanKebersihan.map((item, idx) => (
                          <tr key={item.id || idx} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-5 font-mono text-slate-600">{item.tanggal}</td>
                            <td className="py-3 px-5 font-bold text-emerald-700">{item.kamar}</td>
                            <td className="py-3 px-5 text-slate-700 font-medium">{item.wali_halaqoh || '-'}</td>
                            <td className="py-3 px-5 text-slate-700">{item.keterangan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

              </div>
            </div>
          )}
      
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
          // Layout diubah jadi 2 kolom: Kamar di atas penuh, Donat & Bar Bulan di bawah
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* --- KARTU BAR CHART KAMAR (ATAS, LEBAR PENUH) --- */}
            <div className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col">
              <h4 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-600">
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                Kasus Ketidakbersihan Per Kamar
              </h4>
              
              <div className="relative flex-1 min-h-[260px] w-full overflow-x-auto overflow-y-hidden pb-8 pt-2 custom-scrollbar">
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

                <div className="absolute left-6 top-2 bottom-12 flex items-end gap-1.5 sm:gap-2 px-2 min-w-max">
                  {kamarChartData.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">Belum ada data</div>
                  ) : (
                    kamarChartData.map((d, i) => (
                      <div key={i} className="flex flex-col items-center h-full justify-end group w-6 relative">
                        <div className="w-full bg-[#4ade80] rounded-t-sm relative transition-all duration-300 hover:bg-emerald-500"
                             style={{ height: `${Math.max((d.total / maxChartBar) * 100, 2)}%` }}>
                          <span className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-0.5 px-2 rounded font-bold transition-opacity z-20">
                            {d.total}
                          </span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 -rotate-45 origin-top-left mt-3 absolute -bottom-5 left-1/2">
                          {d.kamar}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* --- KARTU DONUT CHART KATEGORI (KIRI BAWAH) --- */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col items-center">
              <h4 className="font-bold text-slate-800 text-sm w-full mb-6 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-600">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                </svg>
                Kategori Berdasarkan Keterangan
              </h4>
              
              <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full">
                <div className="relative w-44 h-44 rounded-full flex items-center justify-center shadow-inner" style={donutStyle}>
                  <div className="w-24 h-24 bg-white rounded-full shadow-sm flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-800">{filteredLaporanKebersihan.length}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Total</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-bold text-slate-500 px-2">
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#f59e0b]"></span>Sampah</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#3b82f6]"></span>Pakaian</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#ec4899]"></span>Kasur</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#10b981]"></span>Lantai</div>
                  <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#94a3b8]"></span>Lain-lain</div>
                </div>
              </div>
            </div>

            {/* --- KARTU GRAFIK KASUS PER BULAN (KANAN BAWAH) --- */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col">
              <h4 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Total Kasus Per Bulan
              </h4>
              
              <div className="relative flex-1 min-h-[220px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataKebersihanPerBulan} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="bulan" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} 
                    />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                      itemStyle={{ color: '#0f172a' }}
                    />
                    <Bar 
                      dataKey="total" 
                      name="Jumlah Kamar Kotor" 
                      fill="#10b981" 
                      radius={[4, 4, 0, 0]} 
                      barSize={28} 
                    />
                  </BarChart>
                </ResponsiveContainer>
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
                <div className="space-y-4 print:space-y-0" id="area-cetak-pdf">
                  
                  {/* --- HEADER KHUSUS CETAK (Hanya Tampil di PDF) --- */}
                  <div id="header-cetak-pdf" className="hidden print:block mb-6 p-6 bg-emerald-700 text-white rounded-t-xl print:m-0 print:rounded-none">
                    <h1 className="text-xl font-black uppercase tracking-wider leading-snug">
                      LAPORAN MONITORING KETIDAKBERSIHAN KAMAR SANTRI {
                        rekapFilterMode === 'bulan' 
                          ? `BULAN ${new Date(Number(rekapBulanTahun.split('-')[0]), Number(rekapBulanTahun.split('-')[1]) - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }).toUpperCase()}`
                          : rekapFilterMode === 'hari_ini'
                          ? `TANGGAL ${rekapStartDate.split('-').reverse().join('/')}`
                          : `PERIODE ${rekapStartDate.split('-').reverse().join('/')} - ${rekapEndDate.split('-').reverse().join('/')}`
                      }
                    </h1>
                    <h2 className="text-sm font-bold mt-1 text-emerald-50">
                      Sistem Kontrol Disiplin & Kebersihan Lingkungan Asrama Pesantren
                    </h2>
                    <div className="text-xs font-medium mt-3 flex flex-col gap-0.5 text-emerald-100">
                      <p>Periode Pemeriksaan: {rekapStartDate.split('-').reverse().join('/')} s/d {rekapEndDate.split('-').reverse().join('/')}</p>
                    </div>
                  </div>

                  {/* --- HEADER & TOMBOL CETAK (Sembunyikan saat cetak) --- */}
                  <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
                    <h3 className="font-bold text-sm text-slate-800">Data Rekapitulasi Kebersihan</h3>
                    
                    <div className="flex items-center gap-2">
                      {/* Tombol Cetak Browser Lama */}
                      <button onClick={() => window.print()} className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-sm">
                        <FileText className="w-4 h-4" /> Cetak (Dialog)
                      </button>
                      
                      {/* Tombol Ekspor PDF Langsung Download Baru */}
                      <button onClick={handleEksporPDF} className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-md">
                        <FileText className="w-4 h-4" /> Ekspor PDF
                      </button>
                    </div>
                  </div>

                  {/* --- FILTER WAKTU (Sembunyikan saat cetak) --- */}
                  <div className="bg-white p-4 sm:p-5 rounded-3xl shadow-xs border border-slate-200 flex flex-col lg:flex-row lg:items-center gap-4 mt-4 print:hidden">
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                        <History className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs uppercase">Filter Waktu</h4>
                        <p className="text-[10px] text-slate-400">Rentang data rekapitulasi</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                      <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 w-full sm:w-auto">
                        <button onClick={() => setRekapFilterMode('hari_ini')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${rekapFilterMode === 'hari_ini' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                          Hari Ini
                        </button>
                        <button onClick={() => setRekapFilterMode('bulan')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${rekapFilterMode === 'bulan' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                          Bulan
                        </button>
                        <button onClick={() => setRekapFilterMode('rentang')} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${rekapFilterMode === 'rentang' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                          Rentang Waktu
                        </button>
                      </div>
                      
                      <div className="flex-1 w-full flex items-center justify-end gap-3">
                        {rekapFilterMode === 'hari_ini' && (
                          <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold w-full sm:w-auto text-center">
                            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                        )}
                        {rekapFilterMode === 'bulan' && (
                          <input type="month" value={rekapBulanTahun} onChange={(e) => setRekapBulanTahun(e.target.value)} className="w-full sm:w-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
                        )}
                        {rekapFilterMode === 'rentang' && (
                          <div className="flex items-center gap-2 w-full">
                            <input type="date" value={rekapStartDate} onChange={(e) => setRekapStartDate(e.target.value)} className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
                            <span className="text-slate-400 font-bold">-</span>
                            <input type="date" value={rekapEndDate} onChange={(e) => setRekapEndDate(e.target.value)} className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* --- TABEL DATA & SORTIR (Dengan Grid ala Excel di PDF) --- */}
                  {(() => {
                    const getSortIcon = (key: string) => {
                      if (rekapSortConfig.key !== key) return <span className="text-slate-300 opacity-50 ml-1 print:hidden">↕</span>;
                      return rekapSortConfig.direction === 'asc' ? <span className="text-emerald-600 ml-1 font-black print:hidden">↑</span> : <span className="text-emerald-600 ml-1 font-black print:hidden">↓</span>;
                    };

                    return (
                      <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm mt-4 print:border-none print:shadow-none print:mt-0 print:pt-4">
                          <table className="w-full text-sm text-left print:text-black print:border-collapse">
                              <thead className="text-xs uppercase bg-slate-50 text-slate-500 print:bg-white print:text-black">
                                  <tr>
                                      <th className="px-4 py-3 text-center border-b border-slate-200 print:border print:border-black print:font-black">No</th>
                                      <th className="px-4 py-3 cursor-pointer hover:bg-slate-200 transition select-none group border-b border-slate-200 print:border print:border-black" onClick={() => handleSortRekap('kamar')}>
                                          <div className="flex items-center gap-1 group-hover:text-emerald-700 print:text-black print:font-black">Nama Kamar {getSortIcon('kamar')}</div>
                                      </th>
                                      <th className="px-4 py-3 cursor-pointer hover:bg-slate-200 transition select-none group border-b border-slate-200 print:hidden" onClick={() => handleSortRekap('jenjang')}>
                                          <div className="flex items-center gap-1 group-hover:text-emerald-700">Jenjang {getSortIcon('jenjang')}</div>
                                      </th>
                                      <th className="px-4 py-3 cursor-pointer hover:bg-slate-200 transition select-none group border-b border-slate-200 print:border print:border-black" onClick={() => handleSortRekap('wali')}>
                                          <div className="flex items-center gap-1 group-hover:text-emerald-700 print:text-black print:font-black">Wali Halaqoh {getSortIcon('wali')}</div>
                                      </th>
                                      <th className="px-4 py-3 cursor-pointer hover:bg-slate-200 transition select-none group border-b border-slate-200 text-center print:border print:border-black" onClick={() => handleSortRekap('kasus')}>
                                          <div className="flex items-center justify-center gap-1 group-hover:text-emerald-700 print:text-black print:font-black">Tidak Bersih {getSortIcon('kasus')}</div>
                                      </th>
                                      <th className="px-4 py-3 cursor-pointer hover:bg-slate-200 transition select-none group border-b border-slate-200 text-center print:border print:border-black" onClick={() => handleSortRekap('persentase')}>
                                          <div className="flex items-center justify-center gap-1 group-hover:text-emerald-700 print:text-black print:font-black">% Kebersihan {getSortIcon('persentase')}</div>
                                      </th>
                                      <th className="px-4 py-3 border-b border-slate-200 print:border print:border-black print:font-black">Keterangan / Catatan Ketidakbersihan</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-xs">
                                  {processedRekapKamar.length === 0 ? (
                                      <tr><td colSpan={7} className="px-4 py-6 text-center text-slate-400">Belum ada data kamar.</td></tr>
                                  ) : (
                                      processedRekapKamar.map((k, idx) => {
                                          return (
                                              <tr key={k.nama_kamar || idx} className="hover:bg-slate-50 print:break-inside-avoid">
                                                  <td className="px-4 py-3 text-center font-mono text-slate-500 print:text-black print:border print:border-black">{idx + 1}</td>
                                                  <td className="px-4 py-3 font-bold text-slate-900 print:text-black print:border print:border-black">{k.nama_kamar}</td>
                                                  <td className="px-4 py-3 print:hidden">
                                                      <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-[10px]">{k.jenjang}</span>
                                                  </td>
                                                  <td className="px-4 py-3 text-slate-600 print:text-black print:border print:border-black">{k.wali_halaqoh}</td>
                                                  
                                                  <td className="px-4 py-3 text-center align-middle print:border print:border-black">
                                                      {/* Ditambahkan class "pill-pdf-clean" */}
                                                      <button onClick={() => setDetailKamarModal(k.nama_kamar)} className={`pill-pdf-clean inline-block min-w-[60px] px-3 py-1 rounded-full font-bold text-[10px] text-center transition shadow-sm cursor-pointer ${k.totalKasus > 0 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`} title="Klik untuk melihat rincian kasus">
                                                          {k.totalKasus} Kali
                                                      </button>
                                                  </td>
                                                  
                                                  <td className="px-4 py-3 text-center align-middle print:border print:border-black">
                                                      {/* Ditambahkan class "pill-pdf-clean" */}
                                                      <span className={`pill-pdf-clean inline-block min-w-[60px] px-3 py-1 rounded-full font-bold text-[10px] text-center ${k.persentase < 70 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                          {k.persentase.toFixed(1)}%
                                                      </span>
                                                  </td>
                                                  
                                                  <td className="px-4 py-3 text-slate-700 print:text-black text-[11px] leading-relaxed print:border print:border-black">
                                                      {k.riwayatKasus && k.riwayatKasus.length > 0 ? (
                                                          <ul className="space-y-1 pl-3 list-disc">
                                                              {k.riwayatKasus.map((riwayat: any, i: number) => {
                                                                  const formatTanggal = riwayat.tanggal.split('-').reverse().join('/');
                                                                  return (
                                                                      <li key={i}>
                                                                          <span className="font-bold">[{formatTanggal}]</span> {riwayat.keterangan}
                                                                      </li>
                                                                  );
                                                              })}
                                                          </ul>
                                                      ) : (
                                                          <span className="italic text-slate-400 print:text-black font-bold">Bersih</span>
                                                      )}
                                                  </td>
                                              </tr>
                                          );
                                      })
                                  )}
                              </tbody>
                          </table>
                      </div>
                    );
                  })()}
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
                            onClick={() => setDashPlgFilterMode('hari_ini')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[11px] font-bold transition-all ${dashPlgFilterMode === 'hari_ini' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            Hari Ini
                          </button>
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
                          
                          {/* Tampilan jika Hari Ini */}
                          {dashPlgFilterMode === 'hari_ini' && (
                            <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold w-full sm:w-auto text-center">
                              {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                          )}
                        
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
                            // Pakai data uniqueWorstViolations agar tidak ada santri dobel
                            const dataAktif = dashboardStatsPlg.uniqueWorstViolations.filter(p => p.sp && p.sp !== 'Tanpa SP' && p.sp !== 'Dikeluarkan');
                            setDashCardModal({
                                title: "Rincian Status SP Aktif",
                                subtitle: "Menampilkan santri dengan status SP tertinggi yang masih aktif",
                                data: dataAktif
                            });
                            setSearchDashCardModal('');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-orange-400 hover:shadow-md transition-all group"
                      >
                         {/* Isinya tetap sama, tidak berubah */}
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
                            // Pakai data uniqueWorstViolations agar tidak ada santri dobel
                            const dataBerat = dashboardStatsPlg.uniqueWorstViolations.filter(p => p.sp === 'SP 3' || p.sp === 'SP Terakhir');
                            setDashCardModal({
                                title: "Rincian Kasus SP 3 / SP Terakhir",
                                subtitle: "Menampilkan santri dengan tingkat pelanggaran berat tertinggi saat ini",
                                data: dataBerat
                            });
                            setSearchDashCardModal('');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-rose-400 hover:shadow-md transition-all group"
                      >
                         {/* Isinya tetap sama, tidak berubah */}
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
                            // Pakai data uniqueWorstViolations agar tidak ada santri dobel
                            const dataOut = dashboardStatsPlg.uniqueWorstViolations.filter(p => p.sp === 'Dikeluarkan');
                            setDashCardModal({
                                title: "Rincian Santri Dikeluarkan",
                                subtitle: "Menampilkan daftar santri yang telah dikenakan sanksi dikeluarkan",
                                data: dataOut
                            });
                            setSearchDashCardModal('');
                        }}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-red-400 hover:shadow-md transition-all group"
                      >
                         {/* Isinya tetap sama, tidak berubah */}
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
                    {/* Mengubah layout agar grafik Per Bulan bisa masuk */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Donut Chart: Distribusi Status SP (Kolom 1) */}
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

                      {/* Bar Chart: Kasus Per Halaqoh (Kolom 2) */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-emerald-700">
                            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                          </svg>
                          Kasus Per Halaqoh
                        </h4>
                        
                        <div className="relative flex-1 min-h-[260px] w-full overflow-x-auto overflow-y-hidden pb-8 pt-2">
                          {/* SISA KODE Kasus Per Halaqoh SAMA SEPERTI ASLINYA */}
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

                      {/* --- KARTU BARU: GRAFIK KASUS PER BULAN (Kolom 3) --- */}
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                        <h4 className="font-bold text-slate-800 text-sm mb-6 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-emerald-700" />
                          Total Kasus Per Bulan
                        </h4>
                        
                        <div className="relative flex-1 min-h-[260px] w-full pt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataKasusPerBulan} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis 
                                dataKey="bulan" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} 
                                dy={10} 
                              />
                              <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} 
                              />
                              <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                itemStyle={{ color: '#0f172a' }}
                              />
                              <Bar 
                                dataKey="total" 
                                name="Jumlah Pelanggaran" 
                                fill="#0ea5e9" // Menggunakan warna biru muda agar kontras dengan hijau halaqoh
                                radius={[4, 4, 0, 0]} 
                                barSize={28} 
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      {/* --- AKHIR KARTU BARU --- */}

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
          {/* MENU SISTEM PERIZINAN SANTRI                              */}
          {/* ========================================================= */}
          {navTab === 'perizinan' && (
            <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6">
              
              {/* --- HEADER KHUSUS PERIZINAN (Mirip Referensi Gambar) --- */}
              <div className="bg-white rounded-t-xl sm:rounded-t-2xl p-5 sm:p-6 border-b border-slate-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
                  <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        PONDOK <span className="text-slate-300">•</span> LAYANAN SANTRI
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Sistem Perizinan Santri</h2>
                      <p className="text-xs text-slate-500 mt-1">Kelola izin pulang, kontrol kesehatan, dan pemantauan kepulangan santri.</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-[10px] font-bold text-emerald-600 mr-1 sm:mr-2 shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Supabase Online
                      </div>
                      <button onClick={fetchSupabaseData} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-xs">Muat Ulang</button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-xs hidden sm:block">Export CSV</button>
                      <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition shadow-xs hidden sm:block">Import CSV</button>
                      <button onClick={() => setPerizinanSubTab('input')} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 transition">+ Input Izin</button>
                  </div>
              </div>

              {/* --- NAVIGASI SUB-MENU --- */}
              <div className="px-4 sm:px-6 -mt-2 sm:-mt-3 w-full">
                <div className="flex items-center gap-1 bg-white border border-slate-200 p-1.5 rounded-2xl w-full sm:w-fit shadow-xs overflow-x-auto custom-scrollbar">
                    <button onClick={() => setPerizinanSubTab('ringkasan')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${perizinanSubTab === 'ringkasan' ? 'border border-slate-800 text-slate-800 bg-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>Ringkasan</button>
                    <button onClick={() => setPerizinanSubTab('semua')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${perizinanSubTab === 'semua' ? 'border border-slate-800 text-slate-800 bg-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
                      Semua Perizinan <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${perizinanSubTab === 'semua' ? 'bg-slate-100 text-slate-600' : 'bg-slate-100 text-slate-400'}`}>{izinStats.total}</span>
                    </button>
                    <button onClick={() => setPerizinanSubTab('aktif')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${perizinanSubTab === 'aktif' ? 'border border-slate-800 text-slate-800 bg-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
                      Sedang Izin <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${perizinanSubTab === 'aktif' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>{izinStats.sedangIzin}</span>
                    </button>
                    <button onClick={() => setPerizinanSubTab('input')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${perizinanSubTab === 'input' ? 'border border-slate-800 text-slate-800 bg-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>Input Izin</button>
                </div>
              </div>

              {/* === KONTEN 1: RINGKASAN DASHBOARD === */}
              {perizinanSubTab === 'ringkasan' && (
                <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 w-full">
                  {/* Kartu KPI / Angka */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Total Perizinan</p>
                      <h3 className="text-3xl font-black text-slate-800 leading-none">{izinStats.total}</h3>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Data terintegrasi</p>
                    </div>
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sedang Izin</p>
                      <h3 className="text-3xl font-black text-orange-500 leading-none">{izinStats.sedangIzin}</h3>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Belum kembali ke pondok</p>
                    </div>
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Sudah Kembali</p>
                      <h3 className="text-3xl font-black text-emerald-600 leading-none">{izinStats.sudahKembali}</h3>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Perizinan selesai</p>
                    </div>
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pulang / Medis / Lainnya</p>
                      <h3 className="text-xl sm:text-2xl font-black text-purple-700 leading-none">{izinStats.pulang} <span className="text-slate-300">/</span> {izinStats.medis} <span className="text-slate-300">/</span> {izinStats.lainnya}</h3>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 mt-2 font-medium">Izin pulang / kontrol / jenis lain</p>
                    </div>
                  </div>

                  {/* Grafik Sederhana dan Kotak Peringatan */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Jenis Perizinan */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                       <h4 className="font-bold text-sm text-slate-800 mb-5">Jenis Perizinan</h4>
                       <div className="space-y-4">
                         <div>
                           <div className="flex justify-between text-xs font-semibold mb-1"><span className="text-slate-700">Izin Pulang</span> <span className="text-slate-500">{izinStats.pulang} izin &middot; {izinStats.total ? Math.round((izinStats.pulang/izinStats.total)*100) : 0}%</span></div>
                           <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${izinStats.total ? (izinStats.pulang/izinStats.total)*100 : 0}%` }}></div></div>
                         </div>
                         <div>
                           <div className="flex justify-between text-xs font-semibold mb-1"><span className="text-slate-700">Kontrol Kesehatan</span> <span className="text-slate-500">{izinStats.medis} izin &middot; {izinStats.total ? Math.round((izinStats.medis/izinStats.total)*100) : 0}%</span></div>
                           <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${izinStats.total ? (izinStats.medis/izinStats.total)*100 : 0}%` }}></div></div>
                         </div>
                         <div>
                           <div className="flex justify-between text-xs font-semibold mb-1"><span className="text-slate-700">Lainnya</span> <span className="text-slate-500">{izinStats.lainnya} izin &middot; {izinStats.total ? Math.round((izinStats.lainnya/izinStats.total)*100) : 0}%</span></div>
                           <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-slate-400 h-1.5 rounded-full" style={{ width: `${izinStats.total ? (izinStats.lainnya/izinStats.total)*100 : 0}%` }}></div></div>
                         </div>
                       </div>
                    </div>
                    {/* Kelas */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                       <h4 className="font-bold text-sm text-slate-800 mb-5">Perizinan Berdasarkan Kelas</h4>
                       <div className="space-y-4">
                         {izinStats.kelasChart.map((k, i) => (
                           <div key={i}>
                             <div className="flex justify-between text-xs font-semibold mb-1"><span className="text-slate-700">Kelas {k[0]}</span> <span className="text-slate-500">{k[1]} izin</span></div>
                             <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${(k[1]/izinStats.total)*100}%` }}></div></div>
                           </div>
                         ))}
                         {izinStats.kelasChart.length === 0 && <p className="text-xs text-slate-400 italic">Belum ada data</p>}
                       </div>
                       <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-bold">Santri unik terdata: {new Set(perizinanList.map(p => p.santri_id)).size}</div>
                    </div>
                    {/* Peringatan */}
                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-amber-900 mb-2">Perhatian Perizinan Aktif</h4>
                        <p className="text-xs text-amber-800 leading-relaxed font-medium">Terdapat <strong>{izinStats.sedangIzin} santri</strong> yang saat ini masih dalam masa perizinan. Catat kepulangan saat santri kembali ke pondok.</p>
                      </div>
                      <button onClick={() => setPerizinanSubTab('aktif')} className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition shadow-sm">Periksa Santri Sedang Izin</button>
                    </div>
                  </div>

                  {/* Tabel Perizinan Terbaru (Ringkasan) */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
                          <div>
                              <h4 className="font-bold text-sm text-slate-800">Perizinan Terbaru</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5">Riwayat terakhir yang tercatat</p>
                          </div>
                          <button onClick={() => setPerizinanSubTab('semua')} className="text-xs font-bold text-emerald-600 hover:text-emerald-800 transition">Lihat semua</button>
                      </div>
                      <div className="overflow-x-auto custom-scrollbar">
                          <table className="w-full text-left text-xs min-w-[900px]">
                              <thead className="bg-white text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                                  <tr>
                                      <th className="px-5 py-3">Tanggal Izin</th>
                                      <th className="px-5 py-3">Santri</th>
                                      <th className="px-5 py-3">Jenis Izin</th>
                                      <th className="px-5 py-3">PJ</th>
                                      <th className="px-5 py-3">Kembali</th>
                                      <th className="px-5 py-3">Keterangan</th>
                                      <th className="px-5 py-3">Status</th>
                                      <th className="px-5 py-3 text-right">Aksi</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                  {perizinanList.slice(0, 5).map((p, i) => (
                                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                                          <td className="px-5 py-3 whitespace-nowrap text-slate-500">{p.tanggal_izin.split('-').reverse().join('/')}</td>
                                          <td className="px-5 py-3">
                                            <div className="font-bold text-slate-800 uppercase">{p.nama_santri}</div>
                                            <div className="text-[10px] text-slate-400 font-normal">Kelas {p.kelas}</div>
                                          </td>
                                          <td className="px-5 py-3 whitespace-nowrap">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${p.jenis_izin === 'Izin Pulang' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{p.jenis_izin}</span>
                                          </td>
                                          <td className="px-5 py-3 text-slate-500">{p.pj}</td>
                                          <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{p.tanggal_kembali.split('-').reverse().join('/')}</td>
                                          <td className="px-5 py-3 text-slate-500 truncate max-w-[150px]">{p.keterangan || '-'}</td>
                                          <td className="px-5 py-3 font-bold">
                                            <span className={p.status === 'Aktif' ? 'text-orange-500' : 'text-emerald-600'}>{p.status}</span>
                                          </td>
                                         <td className="px-5 py-3 text-right whitespace-nowrap">
                                              <button onClick={() => setDetailIzinModal(p)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 mr-3 transition">Detail</button>
                                              {p.status === 'Aktif' && (
                                                <>
                                                  <button onClick={() => { setPerpanjangIzinModal(p); setPerpanjangTglKembali(p.tanggal_kembali); }} className="text-[10px] font-bold text-blue-500 hover:text-blue-700 mr-3 transition">Perpanjang</button>
                                                  <button onClick={() => handleSetIzinKembali(p.id)} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 transition">Kembali</button>
                                                </>
                                              )}
                                          </td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
                </div>
              )}

              {/* === KONTEN 2 & 3: TABEL SEMUA & SEDANG IZIN === */}
              {(perizinanSubTab === 'semua' || perizinanSubTab === 'aktif') && (() => {
                  
                  // Paksa filter status jika di tab Aktif
                  const isAktifTab = perizinanSubTab === 'aktif';
                  const displayList = isAktifTab ? filteredPerizinan.filter(p => p.status === 'Aktif') : filteredPerizinan;

                  return (
                    <div className="space-y-4 px-4 sm:px-6 w-full">
                       <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
                          {/* Filter Inputs */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 border-b border-slate-100 pb-5">
                             <div>
                                <input type="text" placeholder="Cari nama atau keterangan..." value={filterIzinSearch} onChange={(e) => setFilterIzinSearch(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                             </div>
                             <div>
                                <select value={isAktifTab ? 'Aktif' : filterIzinStatus} onChange={(e) => setFilterIzinStatus(e.target.value)} disabled={isAktifTab} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50">
                                  <option value="Semua Status">Semua Status</option>
                                  <option value="Aktif">Aktif</option>
                                  <option value="Kembali">Sudah Kembali</option>
                                </select>
                             </div>
                             <div>
                                <select value={filterIzinJenis} onChange={(e) => setFilterIzinJenis(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500">
                                  <option value="Semua Jenis Izin">Semua Jenis Izin</option>
                                  <option value="Izin Pulang">Izin Pulang</option>
                                  <option value="Kontrol Kesehatan">Kontrol Kesehatan</option>
                                  <option value="Lainnya">Lainnya</option>
                                </select>
                             </div>
                             <div>
                                <input type="month" value={filterIzinBulan === 'Semua Bulan' ? '' : filterIzinBulan} onChange={(e) => setFilterIzinBulan(e.target.value || 'Semua Bulan')} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-600 cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500" />
                             </div>
                          </div>

                          <div className="flex justify-between items-center mb-3 px-1">
                             <div className="text-[10px] text-slate-400 font-medium">Menampilkan <strong className="text-slate-600">{displayList.length}</strong> dari {isAktifTab ? izinStats.sedangIzin : perizinanList.length} data</div>
                             <button onClick={() => { setFilterIzinSearch(''); setFilterIzinStatus('Semua Status'); setFilterIzinJenis('Semua Jenis Izin'); setFilterIzinBulan('Semua Bulan'); }} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 transition">Reset Filter</button>
                          </div>

                          <div className="overflow-x-auto custom-scrollbar border border-slate-100 rounded-xl">
                              <table className="w-full text-left text-xs min-w-[900px]">
                                  <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                                      <tr>
                                          <th className="px-5 py-4">TANGGAL IZIN</th>
                                          <th className="px-5 py-4">SANTRI</th>
                                          <th className="px-5 py-4">JENIS IZIN</th>
                                          <th className="px-5 py-4">PJ</th>
                                          <th className="px-5 py-4">KEMBALI</th>
                                          <th className="px-5 py-4">KETERANGAN</th>
                                          <th className="px-5 py-4">STATUS</th>
                                          <th className="px-5 py-4 text-right">AKSI</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                                      {displayList.map((p, i) => (
                                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                                              <td className="px-5 py-4 whitespace-nowrap text-slate-500">{p.tanggal_izin.split('-').reverse().join('/')}</td>
                                              <td className="px-5 py-4">
                                                <div className="font-bold text-slate-800 uppercase">{p.nama_santri}</div>
                                                <div className="text-[10px] text-slate-400 font-normal">Kelas {p.kelas} - {p.halaqoh}</div>
                                              </td>
                                              <td className="px-5 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${p.jenis_izin === 'Izin Pulang' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{p.jenis_izin}</span>
                                              </td>
                                              <td className="px-5 py-4 text-slate-500">{p.pj}</td>
                                              <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{p.tanggal_kembali.split('-').reverse().join('/')}</td>
                                              <td className="px-5 py-4 text-slate-500 max-w-[200px] truncate">{p.keterangan || '-'}</td>
                                              <td className="px-5 py-4 font-bold">
                                                <span className={p.status === 'Aktif' ? 'text-orange-500' : 'text-emerald-600'}>{p.status}</span>
                                              </td>
                                              <td className="px-5 py-4 text-right whitespace-nowrap">
                                                  <button onClick={() => setDetailIzinModal(p)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 mr-3 transition">Detail</button>
                                                  {p.status === 'Aktif' && (
                                                    <>
                                                      <button onClick={() => { setPerpanjangIzinModal(p); setPerpanjangTglKembali(p.tanggal_kembali); }} className="text-[10px] font-bold text-blue-500 hover:text-blue-700 mr-3 transition">Perpanjang</button>
                                                      <button onClick={() => handleSetIzinKembali(p.id)} className="text-[10px] font-bold text-emerald-600 hover:text-emerald-800 transition">Kembali</button>
                                                    </>
                                                  )}
                                              </td>
                                          </tr>
                                      ))}
                                      {displayList.length === 0 && (
                                          <tr><td colSpan={8} className="text-center py-10 text-slate-400 italic">Data perizinan tidak ditemukan.</td></tr>
                                      )}
                                  </tbody>
                              </table>
                          </div>
                       </div>
                    </div>
                  );
              })()}

             {/* === KONTEN 4: INPUT FORM PERIZINAN === */}
              {perizinanSubTab === 'input' && (
                <div className="px-4 sm:px-6 w-full pb-10">
                   <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl">
                      <div className="mb-6 border-b border-slate-100 pb-4">
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">FORMULIR PERIZINAN</div>
                        <h3 className="text-lg font-black text-slate-800">Input Izin Santri</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Data izin akan disimpan langsung ke database.</p>
                      </div>

                      <form onSubmit={handleSubmitPerizinan} className="space-y-5">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-1">Filter Kelas</label>
                              <select value={formIzinKelas} onChange={e => setFormIzinKelas(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                                <option value="Semua Kelas">Semua Kelas</option>
                                <option value="7">Kelas 7</option>
                                <option value="8">Kelas 8</option>
                                <option value="9">Kelas 9</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 mb-1">Filter Halaqoh</label>
                              <select value={formIzinHalaqoh} onChange={e => setFormIzinHalaqoh(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                                <option value="Semua Halaqoh">Semua Halaqoh</option>
                                {guruList.map(g => (
                                  <option key={g.id} value={g.nama_guru}>{g.nama_guru}</option>
                                ))}
                              </select>
                            </div>
                         </div>

                         <div>
                            <label className="block text-[10px] font-bold text-slate-800 mb-1">Cari & Pilih Nama Santri *</label>
                            <div className="space-y-2">
                               {/* Kotak Pencarian */}
                               <input 
                                 type="text" 
                                 placeholder="Ketik nama santri untuk mencari dengan cepat..." 
                                 value={formIzinSearchSantri} 
                                 onChange={e => setFormIzinSearchSantri(e.target.value)} 
                                 className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                               />
                               {/* Dropdown Pilihan Santri Terfilter */}
                               <select value={formIzinSantriId} onChange={e => setFormIzinSantriId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" required>
                                  <option value="">-- Pilih santri dari daftar di bawah ini --</option>
                                  {santriList
                                    .filter(s => (formIzinKelas === 'Semua Kelas' || s.kelas === formIzinKelas))
                                    .filter(s => (formIzinHalaqoh === 'Semua Halaqoh' || s.halaqoh === formIzinHalaqoh))
                                    .filter(s => s.nama.toLowerCase().includes(formIzinSearchSantri.toLowerCase()))
                                    .map(s => <option key={s.id} value={s.id}>{s.nama} ({s.kelas} - {s.halaqoh || 'Tanpa Halaqoh'})</option>)
                                  }
                               </select>
                            </div>
                         </div>

                         <div>
                            <label className="block text-[10px] font-bold text-slate-800 mb-1">PJ *</label>
                            <input 
                              type="text" 
                              value={formIzinPJ} 
                              readOnly 
                              className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl px-3 py-2.5 text-xs font-bold cursor-not-allowed focus:outline-none" 
                            />
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-800 mb-1">Tanggal Izin *</label>
                              <input type="date" value={formIzinTgl} onChange={e => setFormIzinTgl(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" required />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-800 mb-1">Rencana Tanggal Kembali *</label>
                              <input type="date" value={formIzinTglKembali} onChange={e => setFormIzinTglKembali(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer" required />
                            </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-[10px] font-bold text-slate-800 mb-1">Jenis Izin *</label>
                              <select value={formIzinJenis} onChange={e => setFormIzinJenis(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                                <option value="Izin Pulang">Izin Pulang</option>
                                <option value="Kontrol Kesehatan">Kontrol Kesehatan</option>
                                <option value="Lainnya">Lainnya (Tulis Manual)</option>
                              </select>
                              
                              {/* Akan muncul otomatis jika memilih 'Lainnya' */}
                              {formIzinJenis === 'Lainnya' && (
                                <input
                                  type="text"
                                  value={formIzinJenisLainnya}
                                  onChange={e => setFormIzinJenisLainnya(e.target.value)}
                                  placeholder="Ketikkan jenis izin spesifik di sini..."
                                  className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                                  required
                                />
                              )}
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-800 mb-1">Status *</label>
                              <select value={formIzinStatus} onChange={e => setFormIzinStatus(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                                <option>Aktif (masih di luar)</option>
                                <option>Kembali (sudah di pondok)</option>
                              </select>
                            </div>
                         </div>

                         <div>
                            <label className="block text-[10px] font-bold text-slate-800 mb-1">Keterangan / Alasan</label>
                            <textarea rows={3} value={formIzinKeterangan} onChange={e => setFormIzinKeterangan(e.target.value)} placeholder="Tuliskan alasan perizinan..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                         </div>

                         <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                            <button type="button" onClick={() => setPerizinanSubTab('ringkasan')} className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition">Batal</button>
                            <button type="submit" disabled={isLoading} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition disabled:opacity-50">
                               {isLoading ? 'Menyimpan...' : 'Simpan Perizinan'}
                            </button>
                         </div>
                      </form>
                   </div>
                </div>
              )}

            </div>
          )}

        {/* MODAL PERPANJANG IZIN */}
              {perpanjangIzinModal && (
                <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                  <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
                    
                    <div className="p-5 border-b border-blue-500 bg-blue-600 text-white flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg leading-tight">Perpanjang Izin</h3>
                        <p className="text-[10px] text-blue-100 mt-1 uppercase tracking-wider">{perpanjangIzinModal.nama_santri}</p>
                      </div>
                      <button onClick={() => setPerpanjangIzinModal(null)} className="text-blue-200 hover:text-white bg-blue-700/50 p-2 rounded-xl transition">
                        <X className="w-4 h-4"/>
                      </button>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Tanggal Kembali Baru</label>
                        <input 
                          type="date" 
                          value={perpanjangTglKembali} 
                          onChange={(e) => setPerpanjangTglKembali(e.target.value)} 
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer" 
                        />
                        <p className="text-[10px] text-slate-400 mt-2">
                          Tanggal kembali sebelumnya: <strong className="text-slate-600">{perpanjangIzinModal.tanggal_kembali}</strong>
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                      <button onClick={() => setPerpanjangIzinModal(null)} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition shadow-sm">
                        Batal
                      </button>
                      <button onClick={handleSavePerpanjang} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 shadow-md transition">
                        Simpan Perubahan
                      </button>
                    </div>
                  
                  </div>
                </div>
              )}
        
        {/* MODAL DETAIL PERIZINAN */}
              {detailIzinModal && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
                    
                    {/* Header Modal */}
                    <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between bg-white relative">
                      <div>
                        <div className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">
                          DETAIL PERIZINAN SANTRI
                        </div>
                        <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase">
                          {detailIzinModal.nama_santri}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Kelas {detailIzinModal.kelas} - {detailIzinModal.halaqoh || 'Tanpa Halaqoh'}
                        </p>
                      </div>
                      <button 
                        onClick={() => setDetailIzinModal(null)} 
                        className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Konten Grid */}
                    <div className="p-5 sm:p-6 bg-slate-50/50 flex-1 overflow-y-auto">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        
                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Tanggal Izin</span>
                          <span className="text-sm font-bold text-slate-800">{detailIzinModal.tanggal_izin.split('-').reverse().join('/')}</span>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Rencana Kembali</span>
                          <span className="text-sm font-bold text-slate-800">{detailIzinModal.tanggal_kembali.split('-').reverse().join('/')}</span>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Jenis Izin</span>
                          <span className="text-sm font-bold text-slate-800">{detailIzinModal.jenis_izin}</span>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Bulan Rekap</span>
                          <span className="text-sm font-bold text-slate-800">
                            {new Date(detailIzinModal.tanggal_izin).toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })}
                          </span>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">ID Santri</span>
                          <span className="text-xs font-mono font-bold text-slate-600 truncate block">{detailIzinModal.santri_id}</span>
                        </div>
                        
                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">PJ</span>
                          <span className="text-sm font-bold text-slate-800">{detailIzinModal.pj}</span>
                        </div>

                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm sm:col-span-2">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Status</span>
                          <span className={`text-sm font-bold ${detailIzinModal.status === 'Aktif' ? 'text-orange-500' : 'text-emerald-600'}`}>
                            {detailIzinModal.status} {detailIzinModal.status === 'Aktif' ? '• Masih di luar' : '• Sudah kembali'}
                          </span>
                        </div>

                        <div className="bg-white p-4 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm sm:col-span-2">
                          <span className="text-[10px] font-bold text-slate-400 block mb-1">Keterangan</span>
                          <p className="text-sm text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                            {detailIzinModal.keterangan || '-'}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Footer Tombol */}
                    <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex justify-end gap-3">
                      {detailIzinModal.status === 'Aktif' && (
                        <button 
                          onClick={() => {
                            handleSetIzinKembali(detailIzinModal.id);
                            setDetailIzinModal(null);
                          }}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-md"
                        >
                          Tandai Sudah Kembali
                        </button>
                      )}
                      <button 
                        onClick={() => setDetailIzinModal(null)} 
                        className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition"
                      >
                        Tutup
                      </button>
                    </div>

                  </div>
                </div>
              )}
        
          {/* ========================================================= */}
          {/* MENU DASHBOARD UTAMA (JANGAN DIHAPUS)                       */}
          {/* ========================================================= */}
          {navTab === 'dashboard' && (
            <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 px-1 sm:px-0 overflow-x-hidden sm:overflow-visible">
              
              {/* Header Dashboard Responsif */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full max-w-[100vw] sm:max-w-none">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight truncate">Dashboard Pantauan Pondok</h2>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">Pantau kepatuhan input kegiatan harian seluruh divisi dan keaktifan guru secara real-time</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 sm:py-2 flex-1 sm:flex-none">
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tanggal:</span>
                    <input
                      type="date"
                      value={inputAbsensiTanggal}
                      onChange={(e) => setInputAbsensiTanggal(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-800 outline-none w-full sm:w-auto cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={() => setInputAbsensiTanggal(new Date().toISOString().slice(0, 10))}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition shrink-0 w-full sm:w-auto"
                  >
                    Hari Ini
                  </button>
                </div>
              </div>

             {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full max-w-[100vw] sm:max-w-none">
                {/* Kartu Kamar Kotor */}
                <div 
                  onClick={() => {
                    setNavTab('monitoring_kebersihan');
                    setKebersihanSubTab('dashboard'); // <-- Diubah menjadi dashboard
                  }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 cursor-pointer hover:shadow-md hover:border-emerald-300 group transition-all"
                >
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-600 uppercase tracking-wider mb-1 truncate transition-colors">Kasus Kamar Kotor</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">{filteredLaporanKebersihan.length}</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-500">Kasus</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">Berdasarkan filter tanggal dashboard</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center shrink-0 transition-colors">
                    <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                </div>

                {/* Kartu Pelanggaran */}
                <div 
                  onClick={() => {
                    setNavTab('pelanggaran');
                    setPelanggaranSubTab('dashboard'); // <-- Diubah menjadi dashboard
                  }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 cursor-pointer hover:shadow-md hover:border-rose-300 group transition-all"
                >
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-bold text-slate-400 group-hover:text-rose-600 uppercase tracking-wider mb-1 truncate transition-colors">Kasus Pelanggaran</h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-rose-700 transition-colors">{filteredDashboardPelanggaran?.length || dashboardStatsPlg?.totalKasus || 0}</span>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-500">Kasus</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1 truncate">Berdasarkan filter tanggal dashboard</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center shrink-0 transition-colors">
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                  </div>
                </div>
              </div>

              {/* TABEL PANTAUAN HARIAN */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xs overflow-hidden w-full max-w-[100vw] sm:max-w-none">
                <div className="p-4 sm:p-6 bg-slate-50/50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                    <h4 className="text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wider truncate">
                      Pantauan Kegiatan Harian ({inputAbsensiTanggal})
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg w-fit shrink-0">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-600">
                      Total Kegiatan Harian: <strong className="text-slate-900">{templates.filter(t => t.timeframe.toLowerCase().includes('hari')).length} Program</strong>
                    </span>
                  </div>
                </div>

                {/* WRAPPER SCROLL HORIZONTAL */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse min-w-[850px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                        <th className="py-3 px-4 w-12 text-center">NO</th>
                        <th className="py-3 px-4 min-w-[140px]">DIVISI</th>
                        <th className="py-3 px-4 min-w-[200px]">KEGIATAN</th>
                        <th className="py-3 px-4 text-center min-w-[100px]">KETERANGAN</th>
                        <th className="py-3 px-4 text-center min-w-[80px]">NILAI</th>
                        <th className="py-3 px-4 min-w-[180px]">CATATAN / TEMUAN</th>
                        <th className="py-3 px-4 text-center min-w-[80px]">AKSI</th>
                      </tr>
                    </thead>
                   <tbody className="divide-y divide-slate-100 text-slate-700">
                        {templates.filter(t => String(t.timeframe).toLowerCase().includes('hari')).length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-400 italic text-xs">
                              Belum ada program kegiatan yang disetel dengan timeframe 'Harian'.
                            </td>
                          </tr>
                        ) : (
                          templates
                            .filter(t => String(t.timeframe).toLowerCase().includes('hari'))
                            .sort((a, b) => Number(a.division_id || 0) - Number(b.division_id || 0))
                            .map((tpl, idx) => {
                            const todayStr = inputAbsensiTanggal; 
                            const divName = divisions.find(d => Number(d.id) === Number(tpl.division_id))?.name || `Divisi #${tpl.division_id}`;

                            const subsForTplDate = submissions.filter(s => {
                              const dt = String(s.submission_date || s.created_at || '').slice(0, 10);
                              return s.template_id === tpl.id && dt === todayStr;
                            });

                            const isInputted = subsForTplDate.length > 0;

                            let scoreText = '-';
                            if (isInputted) {
                              const totalScore = subsForTplDate.reduce((acc, curr) => acc + getSubmissionPercentage(curr), 0);
                              scoreText = `${Math.round(totalScore / subsForTplDate.length)}%`;
                            }

                            const catatanHarian = subsForTplDate
                              .map(s => String(s.general_notes || '').trim())
                              .filter(note => note && note !== '-' && note.toLowerCase() !== 'nihil')
                              .join(' • ');
                            
                            const catatanTpl = catatanHarian || '-';
                            
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
                                
                                {/* Kolom Aksi yang sudah dinormalkan kembali (TIDAK STICKY) */}
                                <td className="py-2.5 sm:py-3 px-3 text-center">
                                  <button
                                    onClick={() => {
                                      setActiveDivisionId(tpl.division_id);
                                      setActiveTimeframe(tpl.timeframe as TimeframeCategory); 
                                      setSelectedTemplateId(tpl.id); 
                                      setActiveSubTab('input'); 
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
            )}

          {navTab === 'laporan' && (
            <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 px-1 sm:px-0">
              
              {/* Header Banner - Disesuaikan agar responsif di HP */}
              <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-black tracking-tight flex items-center gap-2.5">
                    <FileSpreadsheet className="w-5 h-5 sm:w-6 sm:h-6" />
                    Dashboard Laporan Pondok
                  </h2>
                  <p className="text-[11px] sm:text-xs text-purple-100 mt-1">
                    Pantau capaian IKU dan tuliskan catatan evaluasi per kegiatan tiap bulan
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                  {/* Pemilih Bulan */}
                  <div className="flex items-center justify-between sm:justify-start gap-2 bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 sm:py-1.5 border border-white/30 text-white text-xs font-bold w-full sm:w-auto">
                    <span className="text-[10px] uppercase tracking-wider text-purple-200">BULAN:</span>
                    <input
                      type="month"
                      value={laporanBulan}
                      onChange={(e) => setLaporanBulan(e.target.value)}
                      className="bg-transparent text-white font-bold outline-none cursor-pointer [color-scheme:dark] w-auto text-right sm:text-left"
                    />
                  </div>

                  {/* Tombol Cetak */}
                  <a
                    href="cetak.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition border border-white/20 flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" /> Cetak
                  </a>

                  {/* Pemilih Unit */}
                  <div className="flex items-center justify-between sm:justify-start gap-2 bg-white rounded-xl px-3 py-2 sm:py-1.5 text-slate-800 text-xs font-bold shadow-md w-full sm:w-auto">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">UNIT:</span>
                    <select
                      value={activeDivisionId}
                      onChange={(e) => setActiveDivisionId(Number(e.target.value))}
                      className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer flex-1 sm:flex-none text-right sm:text-left truncate max-w-[180px] sm:max-w-[200px]"
                    >
                      {divisions.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Spreadsheet Table with RowSpan - Dilengkapi pembatasan lebar dan Scroll untuk HP */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden w-full max-w-[100vw] sm:max-w-none">
                {/* overflow-x-auto memungkinkan tabel di-scroll ke samping secara mandiri tanpa menarik layar HP */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                  {/* min-w-[768px] memastikan kolom tidak tergencet/gepeng saat layar HP kecil */}
                  <table className="w-full text-left text-xs border-collapse min-w-[768px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border-b border-slate-200">
                        <th className="py-2.5 px-2 w-8 text-center">NO</th>
                        <th className="py-2.5 px-2 w-[125px] min-w-[115px] max-w-[130px]">INDIKATOR (IKU)</th>
                        <th className="py-2.5 px-1 text-center w-14 min-w-[50px]">TARGET</th>
                        <th className="py-2.5 px-1 text-center w-14 min-w-[50px] bg-blue-50/70 text-blue-800">REALISASI</th>
                        <th className="py-2.5 px-1 text-center w-14 min-w-[50px] bg-emerald-50/70 text-emerald-800">YAYASAN</th>
                        <th className="py-2.5 px-2 w-[125px] min-w-[115px] max-w-[130px]">KEGIATAN</th>
                        <th className="py-2.5 px-1 text-center w-16 min-w-[55px]">WAKTU</th>
                        <th className="py-2.5 px-3 min-w-[240px] sm:min-w-[340px]">CATATAN ({laporanBulan})</th>
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
                                <td className="py-2.5 px-3 min-w-[240px] sm:min-w-[340px]">
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
       {navTab === 'rekap_absensi' && (() => {
      const [year, month] = presensiBulan.split('-');
      const daysInMonth = new Date(Number(year), Number(month), 0).getDate();
      const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
      return (
        <div className="space-y-4 sm:space-y-6 max-w-[100vw] sm:max-w-7xl mx-auto overflow-hidden">
          
          {/* Header & Tab Sub-Menu */}
          <div className="bg-[#0f172a] p-4 sm:p-5 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-blue-400" /> Presensi Jamaah Asatidz
              </h2>
              <p className="text-xs text-slate-400 mt-1">Sistem rekapitulasi sholat jamaah guru dan tendik</p>
            </div>
            <div className="flex bg-slate-800 p-1.5 rounded-2xl">
              <button
                onClick={() => setPresensiSubTab('ledger')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${presensiSubTab === 'ledger' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Buku Besar
              </button>
              <button
                onClick={() => setPresensiSubTab('input')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${presensiSubTab === 'input' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Catat Presensi
              </button>
              <button
                onClick={() => setPresensiSubTab('import')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${presensiSubTab === 'import' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                Import Data
              </button>
            </div>
          </div>
    
          {/* --- HALAMAN BUKU BESAR (LEDGER) --- */}
          {presensiSubTab === 'ledger' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700">Laporan Kehadiran Bulanan</h3>
                <div className="flex items-center gap-3">
                  <select
                    value={presensiWaktuFilter}
                    onChange={(e) => setPresensiWaktuFilter(e.target.value as any)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Semua">Semua Waktu</option>
                    <option value="Asar">Asar</option>
                    <option value="Magrib">Magrib</option>
                    <option value="Isya">Isya</option>
                    <option value="Subuh">Subuh</option>
                  </select>
                  <input
                    type="month"
                    value={presensiBulan}
                    onChange={(e) => setPresensiBulan(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>
    
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto pb-4 custom-scrollbar">
                  <table className="w-full text-left border-collapse min-w-max">
                    <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[10px] uppercase font-bold text-center">
                      {/* Baris Header ke-1: Tanggal & Total */}
                      <tr>
                        <th rowSpan={2} className="py-3 px-3 sticky left-0 top-0 bg-slate-50 z-20 border-r border-b border-slate-200 align-middle">No</th>
                        <th rowSpan={2} className="py-3 px-4 sticky left-[42px] sm:left-[45px] top-0 bg-slate-50 z-20 border-r border-b border-slate-200 text-left min-w-[200px] align-middle">Nama Guru</th>
                        
                        {daysArray.map(d => {
                          const dayOfWeek = new Date(Number(year), Number(month) - 1, d).getDay();
                          let colSpan = 4;
                          if (dayOfWeek === 6) colSpan = 1; // Sabtu
                          if (dayOfWeek === 0) colSpan = 2; // Minggu
                          
                          return (
                            <th key={d} colSpan={colSpan} className={`py-1.5 px-1 border-r border-b border-slate-200 ${dayOfWeek === 0 ? 'bg-rose-50 text-rose-600' : ''}`}>
                              {d}
                            </th>
                          );
                        })}
                        
                        <th rowSpan={2} className="py-3 px-2 border-r border-b border-slate-200 bg-emerald-50 text-emerald-700 align-middle">H</th>
                        <th rowSpan={2} className="py-3 px-2 border-r border-b border-slate-200 bg-rose-50 text-rose-700 align-middle">A</th>
                        <th rowSpan={2} className="py-3 px-2 border-r border-b border-slate-200 bg-amber-50 text-amber-700 align-middle">I</th>
                        <th rowSpan={2} className="py-3 px-2 border-r border-b border-slate-200 bg-purple-50 text-purple-700 align-middle">P</th>
                        <th rowSpan={2} className="py-3 px-2 border-r border-b border-slate-200 bg-orange-50 text-orange-700 align-middle">T</th>
                        <th rowSpan={2} className="py-3 px-3 bg-blue-50 text-blue-700 border-b border-slate-200 align-middle">%</th>
                      </tr>
                      {/* Baris Header ke-2: Kode Waktu (A, M, I, S) */}
                      <tr>
                        {daysArray.map(d => {
                          const dayOfWeek = new Date(Number(year), Number(month) - 1, d).getDay();
                          let slots = ['A', 'M', 'I', 'S'];
                          if (dayOfWeek === 6) slots = ['S']; // Sabtu
                          if (dayOfWeek === 0) slots = ['M', 'I']; // Minggu
                          
                          return slots.map((s, idx) => (
                            <th key={`${d}-${s}-${idx}`} className={`py-1 px-1 border-r border-b border-slate-200 min-w-[20px] text-[8px] ${dayOfWeek === 0 ? 'bg-rose-50 text-rose-600' : 'text-slate-400'}`}>
                              {s}
                            </th>
                          ));
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[10px] font-medium text-center">
                      {presensiAsatidzLedger.map((row) => (
                        <tr key={row.no} className="hover:bg-slate-50 transition-colors">
                          <td className="py-1 px-3 sticky left-0 bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100 text-slate-400 shadow-[1px_0_0_0_#f1f5f9]">{row.no}</td>
                          <td className="py-1 px-4 sticky left-[42px] sm:left-[45px] bg-white group-hover:bg-slate-50 z-10 border-r border-slate-100 text-left font-bold text-slate-700 shadow-[1px_0_0_0_#f1f5f9] text-xs">{row.nama}</td>
                          
                          {/* Sel Tanggal & Waktu */}
                          {daysArray.map(d => {
                            const dayOfWeek = new Date(Number(year), Number(month) - 1, d).getDay();
                            let slots = ['Asar', 'Magrib', 'Isya', 'Subuh'];
                            if (dayOfWeek === 6) slots = ['Subuh'];
                            if (dayOfWeek === 0) slots = ['Magrib', 'Isya'];
    
                            return slots.map((slot, idx) => {
                            const st = row.dailyStatus[d]?.[slot] || '-';
                            let colorClass = "text-slate-200 bg-transparent"; // Strip default
                            if (st === 'H') colorClass = "bg-emerald-100 text-emerald-700 font-bold shadow-xs";
                            else if (st === 'A') colorClass = "bg-rose-100 text-rose-700 font-bold shadow-xs";
                            else if (st === 'I') colorClass = "bg-amber-100 text-amber-700 font-bold shadow-xs";
                            else if (st === 'P') colorClass = "bg-purple-100 text-purple-700 font-bold shadow-xs";
                            else if (st === 'T') colorClass = "bg-orange-100 text-orange-700 font-bold shadow-xs";
                          
                            // === UBAH BAGIAN RETURN TD INI ===
                            return (
                              <td 
                                key={`${d}-${slot}-${idx}`} 
                                onClick={() => setEditingPresensiCell({
                                  guru_id: String(row.id),
                                  nama_guru: row.nama,
                                  tanggal: `${year}-${month}-${String(d).padStart(2, '0')}`,
                                  waktu_sholat: slot as any,
                                  status: st
                                })}
                                title={`Klik untuk ubah presensi ${slot}`}
                                className={`py-1 px-0.5 border-r border-slate-100 cursor-pointer hover:bg-blue-100/50 transition-colors ${dayOfWeek === 0 ? 'bg-rose-50/30 hover:bg-rose-100/50' : ''}`}
                              >
                                <div className={`w-4 h-4 mx-auto rounded flex items-center justify-center text-[8px] transition-transform hover:scale-110 ${colorClass}`}>
                                  {st}
                                </div>
                              </td>
                            );
                            // ==================================
                          });
                          })}
    
                          {/* Sel Rekap Total */}
                          <td className="py-1.5 px-2 border-r border-slate-100 text-emerald-600 font-bold text-xs">{row.h}</td>
                          <td className="py-1.5 px-2 border-r border-slate-100 text-rose-600 font-bold text-xs">{row.a}</td>
                          <td className="py-1.5 px-2 border-r border-slate-100 text-amber-600 font-bold text-xs">{row.i}</td>
                          <td className="py-1.5 px-2 border-r border-slate-100 text-purple-600 font-bold text-xs">{row.p}</td>
                          <td className="py-1.5 px-2 border-r border-slate-100 text-orange-600 font-bold text-xs">{row.t}</td>
                          <td className="py-1.5 px-3 text-blue-600 font-black text-xs">{row.pct}%</td>
                        </tr>
                      ))}
                      
                      {/* Jika data guru kosong */}
                      {presensiAsatidzLedger.length === 0 && (
                        <tr>
                            <td colSpan={130} className="py-8 text-slate-400 italic text-center text-xs">Data guru tidak ditemukan.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
    
          {/* --- HALAMAN FORM INPUT PRESENSI --- */}
          {presensiSubTab === 'input' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Tanggal Presensi:</label>
                  <input
                    type="date"
                    value={inputAsatidzTanggal}
                    onChange={(e) => setInputAsatidzTanggal(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Waktu Sholat:</label>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {['Asar', 'Magrib', 'Isya', 'Subuh'].map(wkt => (
                      <button
                        key={wkt}
                        onClick={() => setInputAsatidzWaktu(wkt as any)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold transition border ${inputAsatidzWaktu === wkt ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                      >
                        {wkt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {guruList.map((guru) => {
                  const key = String(guru.id || guru.nama_guru);
                  const currentStatus = inputAsatidzStatus[key] || 'H';
                  
                  return (
                    <div key={key} className={`p-3 rounded-2xl border transition-colors ${currentStatus === 'H' ? 'bg-white border-slate-200' : 'bg-rose-50 border-rose-200'}`}>
                      <h4 className="text-xs font-bold text-slate-800 mb-2.5 truncate">{guru.nama_guru}</h4>
                      <div className="flex items-center justify-between gap-1 bg-slate-100 p-1 rounded-xl">
                        {[
                          { v: 'H', l: 'Hadir', c: 'text-emerald-700 bg-emerald-100' },
                          { v: 'A', l: 'Alpa', c: 'text-rose-700 bg-rose-100' },
                          { v: 'I', l: 'Izin', c: 'text-amber-700 bg-amber-100' },
                          { v: 'P', l: 'Lbg', c: 'text-purple-700 bg-purple-100' },
                          { v: 'T', l: 'Telat', c: 'text-orange-700 bg-orange-100' }
                        ].map(st => (
                          <button
                            key={st.v}
                            onClick={() => setInputAsatidzStatus(prev => ({...prev, [key]: st.v as any}))}
                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${currentStatus === st.v ? `${st.c} shadow-sm border border-black/5` : 'text-slate-500 hover:bg-slate-200'}`}
                          >
                            {st.v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
    
              <div className="sticky bottom-0 bg-white/80 backdrop-blur-md pt-4 pb-2 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleSavePresensiAsatidz}
                  disabled={isSavingAsatidz}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-600/30 transition flex items-center gap-2 disabled:opacity-50"
                >
                  {isSavingAsatidz ? <RotateCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {isSavingAsatidz ? 'Menyimpan...' : `Simpan Presensi ${inputAsatidzWaktu}`}
                </button>
              </div>
            </div>
          )}
    
          {/* --- HALAMAN IMPORT PRESENSI (CSV) --- */}
          {presensiSubTab === 'import' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div>
                  <h3 className="text-sm font-bold text-blue-900 mb-1">Import Data Presensi via CSV</h3>
                  <p className="text-xs text-blue-700/70">Unduh template, isi data, dan unggah kembali untuk mencatat presensi secara massal.</p>
                </div>
                <button
                  onClick={handleDownloadTemplateAsatidz}
                  className="px-4 py-2 bg-white border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Unduh Template CSV
                </button>
              </div>
    
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 transition relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileImportAsatidz}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <FileText className="w-10 h-10 text-slate-400 mb-3" />
                <p className="text-sm font-bold text-slate-700">Klik atau seret file CSV ke sini</p>
                <p className="text-xs text-slate-500 mt-1">Pastikan format sesuai dengan template yang diunduh</p>
              </div>
    
              {importAsatidzPreview.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pratinjau Data ({importAsatidzPreview.length} Baris)</h4>
                    <button
                      onClick={handleSaveImportAsatidz}
                      disabled={isImportingAsatidz}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition flex items-center gap-2 disabled:opacity-50"
                    >
                      {isImportingAsatidz ? <RotateCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {isImportingAsatidz ? 'Menyimpan...' : 'Simpan Data ke Database'}
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-[400px] custom-scrollbar">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 sticky top-0 z-10 border-b border-slate-200 text-slate-500 font-bold uppercase">
                        <tr>
                          <th className="py-2.5 px-4">Tanggal</th>
                          <th className="py-2.5 px-4">Waktu</th>
                          <th className="py-2.5 px-4">Nama Guru</th>
                          <th className="py-2.5 px-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {importAsatidzPreview.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-4 font-mono text-slate-600">{row.tanggal}</td>
                            <td className="py-2 px-4 font-bold text-blue-600">{row.waktu_sholat}</td>
                            <td className="py-2 px-4 text-slate-700">{row.nama_guru}</td>
                            <td className="py-2 px-4 text-center">
                              <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                                row.status === 'H' ? 'bg-emerald-100 text-emerald-700' :
                                row.status === 'A' ? 'bg-rose-100 text-rose-700' :
                                row.status === 'I' ? 'bg-amber-100 text-amber-700' :
                                row.status === 'P' ? 'bg-purple-100 text-purple-700' :
                                'bg-orange-100 text-orange-700'
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
      );
    })()}
      
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
                          // --- TAMBAHKAN BLOK SORTING INI ---
                          .sort((a, b) => {
                            // 1. Urutkan berdasarkan ID Divisi terlebih dahulu
                            if (a.division_id !== b.division_id) {
                              return Number(a.division_id || 0) - Number(b.division_id || 0);
                            }
                            
                            // 2. Jika Divisi sama, urutkan berdasarkan rentang waktu (Timeframe)
                            const tfOrder: Record<string, number> = { 'Harian': 1, 'Mingguan': 2, 'Bulanan': 3, 'Tahunan': 4 };
                            const tfA = tfOrder[a.timeframe || ''] || 5;
                            const tfB = tfOrder[b.timeframe || ''] || 5;
                            
                            return tfA - tfB;
                          })
                          // ----------------------------------
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

        {/* ================================================= */}
      {/* MODAL EDIT RIWAYAT PENGAWASAN (DIVISI IKU)        */}
      {/* ================================================= */}
      {isEditSubmissionModalOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-amber-500 px-6 py-4 flex items-center justify-between text-white shrink-0">
              <div>
                <h3 className="font-bold text-base">Edit Data Laporan & Ceklis</h3>
                <p className="text-xs text-amber-100">Perbarui rincian metadata dan jawaban form ceklis</p>
              </div>
              <button onClick={() => setIsEditSubmissionModalOpen(false)} className="text-amber-100 hover:text-white transition bg-amber-600/50 p-1.5 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto custom-scrollbar flex-1 bg-slate-50">
              {isEditLoadingDetails ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <RotateCw className="w-8 h-8 text-amber-500 animate-spin mb-3" />
                  <p className="text-sm font-bold text-slate-500">Memuat data ceklis...</p>
                </div>
              ) : (
                <form id="edit-submission-form" onSubmit={handleUpdateSubmission} className="p-4 sm:p-6 space-y-6">
                  
                  {/* Bagian Metadata (Informasi Pengawasan) */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                      <BookOpen className="w-4 h-4 text-amber-500 shrink-0" /> Metadata Laporan
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tanggal</label>
                        <input type="date" value={editSubmissionData.target_class ? editSubmissionData.target_class.slice(0,10) : ''} onChange={(e) => setEditSubmissionData({...editSubmissionData, target_class: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Petugas (PJ)</label>
                        <input type="text" value={editSubmissionData.pj_name} onChange={(e) => setEditSubmissionData({...editSubmissionData, pj_name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Ustadz / Target</label>
                        <input type="text" value={editSubmissionData.target_person} onChange={(e) => setEditSubmissionData({...editSubmissionData, target_person: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Pengampu / Jam</label>
                        <input type="text" value={editSubmissionData.target_time_slot} onChange={(e) => setEditSubmissionData({...editSubmissionData, target_time_slot: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Keterangan / Absen</label>
                        <input type="text" value={editSubmissionData.absent_students} onChange={(e) => setEditSubmissionData({...editSubmissionData, absent_students: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" />
                      </div>
                    </div>
                  </div>

                  {/* Bagian Ceklis Form */}
                  <div className="space-y-4">
                    {sections.filter(s => Number(s.template_id) === Number(editSubmissionData.template_id)).map(sec => {
                        const secItems = getSectionItems(sec.id);
                        const isPositif = (sectionTypeMap[sec.id] || (sec as any).section_type) === 'positif';

                        return (
                          <div key={sec.id} className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 gap-2">
                              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isPositif ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                <span className="truncate">{sec.name}</span>
                              </h4>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                              {secItems.map(it => {
                                const inputType = it.input_type || 'checkbox';
                                const isChecked = !!editCheckedItems[it.id];

                                if (inputType === 'text') {
                                  return (
                                    <div key={it.id} className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 space-y-1">
                                      <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                      <input type="text" value={editFormAnswers[it.id] || ''} onChange={(e) => setEditFormAnswers({ ...editFormAnswers, [it.id]: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-amber-500" />
                                    </div>
                                  );
                                }
                                if (inputType === 'textarea') {
                                  return (
                                    <div key={it.id} className="sm:col-span-2 p-2.5 rounded-xl border bg-slate-50 border-slate-200 space-y-1">
                                      <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                      <textarea rows={2} value={editFormAnswers[it.id] || ''} onChange={(e) => setEditFormAnswers({ ...editFormAnswers, [it.id]: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-amber-500" />
                                    </div>
                                  );
                                }
                                if (inputType === 'number') {
                                  return (
                                    <div key={it.id} className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 space-y-1">
                                      <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                      <input type="number" value={editFormAnswers[it.id] || ''} onChange={(e) => setEditFormAnswers({ ...editFormAnswers, [it.id]: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-amber-500" />
                                    </div>
                                  );
                                }
                                if (inputType === 'select') {
                                  const optionsList = safeParseOptions(it.options);
                                  return (
                                    <div key={it.id} className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 space-y-1">
                                      <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                      <select value={editFormAnswers[it.id] || ''} onChange={(e) => setEditFormAnswers({ ...editFormAnswers, [it.id]: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer" >
                                        <option value="">Pilih Opsi...</option>
                                        {optionsList.map((opt: string) => (<option key={opt} value={opt}>{opt}</option>))}
                                      </select>
                                    </div>
                                  );
                                }
                                if (inputType === 'radio') {
                                  const radioOptions = safeParseOptions(it.options);
                                  return (
                                    <div key={it.id} className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 space-y-1">
                                      <label className="block text-xs font-semibold text-slate-700">{it.item_text}</label>
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {radioOptions.map((opt: string) => {
                                          const isSelected = editFormAnswers[it.id] === opt;
                                          return (
                                            <label key={opt} className={`px-2 py-1 rounded-lg border text-[10px] font-bold cursor-pointer transition select-none ${isSelected ? 'bg-amber-500 text-white border-amber-500' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                              <input type="radio" name={`edit-radio-${it.id}`} value={opt} checked={isSelected} onChange={() => setEditFormAnswers({ ...editFormAnswers, [it.id]: opt })} className="hidden" />
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
                                    <div key={it.id} className="p-2.5 rounded-xl border bg-slate-50 border-slate-200 space-y-1">
                                      <label className="block text-xs font-semibold text-slate-700 truncate">{it.item_text}</label>
                                      <input type="date" value={editFormAnswers[it.id] || ''} onChange={(e) => setEditFormAnswers({ ...editFormAnswers, [it.id]: e.target.value })} className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-amber-500" />
                                    </div>
                                  );
                                }

                                return (
                                  <label key={it.id} className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition select-none ${isChecked ? isPositif ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`} >
                                    <input type="checkbox" checked={isChecked} onChange={(e) => setEditCheckedItems({ ...editCheckedItems, [it.id]: e.target.checked })} className={`mt-0.5 rounded cursor-pointer ${isPositif ? 'text-emerald-500 focus:ring-emerald-500' : 'text-rose-500 focus:ring-rose-500'}`} />
                                    <span className="text-[11px] font-semibold leading-snug flex-1">
                                      {it.item_text}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        );
                    })}
                  </div>

                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Catatan Tambahan</label>
                    <textarea rows={2} value={editSubmissionData.general_notes} onChange={(e) => setEditSubmissionData({...editSubmissionData, general_notes: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  </div>

                </form>
              )}
            </div>

            <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-slate-100 shrink-0">
               <div className="flex items-center gap-3">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Perubahan Skor:</span>
                 <span className="font-mono font-bold text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-lg border border-amber-200">
                   {editFormScore.percentage}% ({editFormScore.scale3})
                 </span>
               </div>
               <div className="flex items-center gap-3">
                 <button type="button" onClick={() => setIsEditSubmissionModalOpen(false)} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
                   Batal
                 </button>
                 <button type="submit" form="edit-submission-form" disabled={isEditLoadingDetails} className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-50">
                   Simpan Perubahan
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
      {/* ================================================= */}
        
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

      {/* ========================================= */}
      {/* MODAL EDIT PRESENSI CEPAT (KLIK DARI SEL) */}
      {/* ========================================= */}
      {editingPresensiCell && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col transform transition-all animate-in zoom-in-95 duration-200">
            
            {/* Header Modal */}
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
                  <Edit className="w-4 h-4 text-blue-600"/> Ubah Kehadiran
                </h3>
                <p className="text-[10px] font-semibold text-slate-500 mt-1">
                  {editingPresensiCell.nama_guru} • <span className="text-blue-600">{editingPresensiCell.tanggal} ({editingPresensiCell.waktu_sholat})</span>
                </p>
              </div>
              <button onClick={() => setEditingPresensiCell(null)} className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
      
            {/* Tombol Pilihan Status */}
            <div className="p-5 grid grid-cols-5 gap-2">
              {[
                { v: 'H', l: 'Hadir', c: 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200 border-emerald-300' },
                { v: 'A', l: 'Alpa', c: 'text-rose-700 bg-rose-100 hover:bg-rose-200 border-rose-300' },
                { v: 'I', l: 'Izin', c: 'text-amber-700 bg-amber-100 hover:bg-amber-200 border-amber-300' },
                { v: 'P', l: 'Lembaga', c: 'text-purple-700 bg-purple-100 hover:bg-purple-200 border-purple-300' },
                { v: 'T', l: 'Telat', c: 'text-orange-700 bg-orange-100 hover:bg-orange-200 border-orange-300' }
              ].map(st => {
                const isSelected = editingPresensiCell.status === st.v;
                return (
                  <button
                    key={st.v}
                    onClick={() => handleUpdateSinglePresensi(st.v as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-b-[3px] transition-all cursor-pointer ${st.c} ${
                      isSelected ? 'ring-2 ring-offset-2 ring-slate-400 scale-105 opacity-100' : 'opacity-70 hover:opacity-100 hover:-translate-y-1'
                    }`}
                  >
                    <span className="font-black text-lg mb-0.5">{st.v}</span>
                    <span className="text-[8px] uppercase tracking-wider font-bold">{st.l}</span>
                  </button>
                );
              })}
            </div>
      
            {/* Footer / Kosongkan Data */}
            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button 
                onClick={() => handleUpdateSinglePresensi('DELETE')}
                className="text-[10px] font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 transition"
              >
                <Trash2 className="w-3 h-3"/> Kosongkan (-)
              </button>
              <button onClick={() => setEditingPresensiCell(null)} className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition">
                Batal
              </button>
            </div>
            
          </div>
        </div>
      )}
            
  </div>
  );
}
