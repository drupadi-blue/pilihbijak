import React, { useState } from 'react';
import { GameStage, ParticipantInfo, DecisionRecord, ScoreBreakdown } from '../types/game';
import { 
  Tv, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DiscussionGuideViewProps {
  participant: ParticipantInfo | null;
  decisions: DecisionRecord[];
  scoreBreakdown: ScoreBreakdown | null;
  onNavigate: (stage: GameStage) => void;
  onOpenLoanCalc: () => void;
}

export const DiscussionGuideView: React.FC<DiscussionGuideViewProps> = ({
  onNavigate,
  onOpenLoanCalc
}) => {
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [expandedFacilitatorAnswer, setExpandedFacilitatorAnswer] = useState<number | null>(null);

  const reflectionQuestions = [
    {
      id: 1,
      question: "Pada kasus Bu Nania, mengapa servis kulkas Rp250.000 jauh lebih bijak daripada tergiur potongan voucher cicilan Paylater?",
      points: [
        "Apakah karena tergoda iming-iming 'potongan belanja pengguna pertama'?",
        "Bagaimana perbandingan biaya tunai Rp250.000 sekali bayar dengan cicilan Rp350.000 x 12 bulan (Rp4.200.000)?",
        "Apa dampak cicilan bulanan terhadap rezeki dagang mie ayam suami?"
      ],
      facilitatorNotes: "Fasilitator menegaskan tagline 'Bukan Sekadar Hemat, tetapi Tepat.' Diskon voucher pengguna pertama adalah strategi marketing agar konsumen terbiasa berutang. Mengoptimalkan servis barang yang ada menghemat jutaan rupiah kas keluarga Bu Nania dan menjaga ketenteraman hidup."
    },
    {
      id: 2,
      question: "Pada kasus Bu Eva, apa bahaya ikut 'Arisan Get Online' berantai dan bagaimana solusi sehat membiayai modal kain pesanan?",
      points: [
        "Skema arisan online get yang menjanjikan keuntungan kilat tanpa usaha riil adalah tanda pasti penipuan skema ponzi.",
        "Membeli baju baru dengan paylater mengurangi pos tabungan pendidikan anak.",
        "Menerapkan sistem DP (uang muka kerja) 30% kepada pelanggan adalah praktik bisnis syariah (Akad Istishna/Salam) yang melindungi kedua belah pihak."
      ],
      facilitatorNotes: "Fasilitator menjelaskan fiqih muamalah: Dalam Islam, perolehan harta harus jelas perniagaannya dan bebas dari penipuan (Gharar) serta riba. Menerapkan uang muka pesanan adalah hal yang wajar, profesional, dan menghindari utang ke bank keliling / rentenir."
    },
    {
      id: 3,
      question: "Pada kasus Bu Frista, mengapa pendidikan anak dan pupuk resmi wajib didahulukan di atas gengsi motor atau pupuk oplosan?",
      points: [
        "Menunda daftar ulang SMK Doni demi gengsi motor bekas kredit membahayakan masa depan anak.",
        "Pupuk oplosan murah membawa risiko gagal panen fatal yang bisa menghilangkan seluruh pendapatan keluarga petani.",
        "Sistem ijon tengkulak merampas keringat petani berbulan-bulan dengan bunga 20% saat panen."
      ],
      facilitatorNotes: "Fasilitator mengingatkan Maqashid Syariah: Menjaga akal (pendidikan anak) dan menjaga harta (investasi pupuk resmi berkualitas). Menggadaikan emas di Pegadaian Syariah resmi (Akad Rahn) adalah solusi berkah untuk dana siaga hingga masa panen tiba."
    },
    {
      id: 4,
      question: "Bagaimana cara mengenali pinjol ilegal & bank keliling yang sering beredar di lingkungan ibu-ibu?",
      points: [
        "1. Menawarkan pinjaman lewat nomor WhatsApp pribadi atau SMS acak.",
        "2. Menjanjikan cair instan tanpa syarat agunan resmi, namun memotong biaya admin besar di awal.",
        "3. Membebankan bunga harian (misal 0.4% per hari = 146% per tahun!).",
        "4. Menagih dengan intimidasi dan menyebarkan data privasi kontak HP."
      ],
      facilitatorNotes: "Ibu-ibu diingatkan untuk selalu memeriksa izin OJK. Pegadaian Syariah dan Bank Syariah Indonesia (BSI) resmi terdaftar dan diawasi pemerintah serta Dewan Pengawas Syariah (DPS) MUI."
    },
    {
      id: 5,
      question: "Apa kunci utama agar ibu rumah tangga dapat mengelola kas keluarga secara berkah dan bebas utang riba?",
      points: [
        "Membuat catatan anggaran belanja dan membedakan kebutuhan pokok vs keinginan sesaat.",
        "Mengamalkan sifat Qana'ah (merasa cukup dan bersyukur atas rezeki halal yang ada).",
        "Memanfaatkan simpanan emas fisik atau tabungan wadiah syariah untuk dana darurat.",
        "Bermusyawarah dengan suami secara terbuka dalam setiap keputusan keuangan besar."
      ],
      facilitatorNotes: "Keluarga yang bahagia dan sakinah bukanlah yang paling banyak menumpuk barang cicilan, melainkan keluarga yang rezekinya halal, berkah, mencukupi kebutuhan nafkah, dan batin hidup tenang."
    }
  ];

  const toggleFacilitator = (idx: number) => {
    setExpandedFacilitatorAnswer(expandedFacilitatorAnswer === idx ? null : idx);
  };

  return (
    <div className={`space-y-6 pb-20 animate-in fade-in duration-300 max-w-2xl mx-auto ${
      isProjectorMode ? 'bg-slate-900 text-white p-6 rounded-3xl' : ''
    }`}>
      {/* Top Banner with Projector Toggle */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm flex flex-wrap items-center justify-between gap-3 text-slate-800">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#00675B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Panduan Fasilitator BSI & PKK
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
            Refleksi & Diskusi Kasus 3 Karakter
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Pembahasan kasus Bu Nania, Bu Eva, dan Bu Frista di balai pertemuan PKK / kelurahan.
          </p>
        </div>

        <button
          onClick={() => setIsProjectorMode(!isProjectorMode)}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 transition-colors cursor-pointer ${
            isProjectorMode 
              ? 'bg-[#F99D1C] text-slate-950' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>{isProjectorMode ? 'Tampilan Normal' : 'Mode Layar Proyektor'}</span>
        </button>
      </div>

      {/* 5 Reflection Prompts with LARGE READABLE FONTS */}
      <div className="space-y-4">
        <h3 className={`font-black text-base sm:text-lg flex items-center gap-2 ${isProjectorMode ? 'text-white' : 'text-slate-900'}`}>
          <MessageSquare className="w-5 h-5 text-[#00827B]" />
          <span>5 Pertanyaan Kunci Diskusi</span>
        </h3>

        {reflectionQuestions.map((item, idx) => {
          const isExpanded = expandedFacilitatorAnswer === idx;

          return (
            <div 
              key={item.id}
              className={`rounded-3xl p-5 sm:p-6 border-2 transition-all ${
                isProjectorMode 
                  ? 'bg-slate-800/90 border-slate-700 text-white' 
                  : 'bg-white border-slate-200 shadow-xs text-slate-900'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-2xl bg-[#00827B] text-white font-black text-base flex items-center justify-center shrink-0 mt-0.5">
                  {item.id}
                </div>
                <div className="space-y-2.5 flex-1">
                  <h4 className="font-extrabold text-base sm:text-lg leading-snug">
                    {item.question}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-disc list-inside font-medium">
                    {item.points.map((pt, pidx) => (
                      <li key={pidx} className={isProjectorMode ? 'text-slate-300' : 'text-slate-700'}>
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Facilitator Notes Toggle */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleFacilitator(idx)}
                      className={`text-xs sm:text-sm font-black flex items-center gap-2 px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
                        isExpanded
                          ? 'bg-[#00827B] text-white'
                          : isProjectorMode 
                            ? 'bg-slate-700 text-emerald-300 hover:bg-slate-600'
                            : 'bg-emerald-50 text-[#00675B] hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{isExpanded ? 'Tutup Catatan Edukasi' : 'Lihat Penjelasan Fasilitator'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 text-xs sm:text-sm leading-relaxed space-y-1 animate-in fade-in duration-200 font-medium">
                        <span className="font-black text-[#00675B] flex items-center gap-1.5 text-sm">
                          <Sparkles className="w-4 h-4 text-[#00827B]" />
                          Kunci Edukasi BSI untuk Ibu-Ibu:
                        </span>
                        <p>{item.facilitatorNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real Indonesian Banking Comparison Table */}
      <div className={`rounded-3xl p-6 border-2 space-y-3.5 ${isProjectorMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-emerald-100'}`}>
        <h4 className={`font-black text-base sm:text-lg flex items-center gap-2 ${isProjectorMode ? 'text-white' : 'text-slate-900'}`}>
          <ShieldCheck className="w-6 h-6 text-[#00827B]" />
          <span>Panduan Membedakan Lembaga Keuangan di Indonesia</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-medium">
          <div className="bg-emerald-50/80 border-2 border-emerald-200 p-4 rounded-2xl space-y-1 text-slate-900">
            <span className="font-black block text-[#00675B] text-sm">1. Pegadaian Syariah (Rahn)</span>
            <p className="leading-relaxed">
              • Ada barang jaminan emas fisik aman.<br />
              • Biaya sewa titip (Mu'nah) murah & transparan.<br />
              • Resmi OJK & Dewan Pengawas Syariah MUI.
            </p>
          </div>

          <div className="bg-teal-50/80 border-2 border-teal-200 p-4 rounded-2xl space-y-1 text-slate-900">
            <span className="font-black block text-teal-900 text-sm">2. Bank Syariah (BSI)</span>
            <p className="leading-relaxed">
              • Akad Murabahah (margin pasti di awal).<br />
              • Cicilan tetap flat sampai lunas.<br />
              • Tidak ada denda bunga berlipat ganda.
            </p>
          </div>

          <div className="bg-rose-50/80 border-2 border-rose-200 p-4 rounded-2xl space-y-1 text-slate-900">
            <span className="font-black block text-rose-900 text-sm">3. Pinjol Ilegal / Rentenir Keliling</span>
            <p className="leading-relaxed">
              • Bunga harian 0.4% (146% per tahun).<br />
              • Potongan admin besar di awal pencairan.<br />
              • Teror penagihan dan sebar data privasi HP.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={onOpenLoanCalc}
            className="px-5 py-3 bg-[#00827B] hover:bg-[#00675B] text-white font-extrabold text-sm rounded-2xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Buka Simulasi Hitung Pinjol vs Pegadaian Syariah</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Back to Home */}
      <div className="pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-base rounded-2xl transition-colors cursor-pointer border border-slate-300"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};
