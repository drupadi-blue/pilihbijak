import React from 'react';
import { GameStage, ParticipantInfo } from '../types/game';
import { BrandLogo } from './BrandLogo';
import { Play, HelpCircle, UserPlus, Sparkles, Compass, ArrowRight, HeartHandshake, GraduationCap, Users } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (stage: GameStage) => void;
  onOpenLoanCalc: () => void;
  onOpenFacilitatorDashboard: () => void;
  hasPreQuiz: boolean;
  participant: ParticipantInfo | null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenFacilitatorDashboard,
  hasPreQuiz,
  participant
}) => {
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Hero Banner in BSI Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#005E54] via-[#00827B] to-[#00A39D] text-white p-6 sm:p-8 shadow-xl border-2 border-emerald-600/40">
        {/* Background glow accents */}
        <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-16 w-60 h-60 rounded-full bg-[#F99D1C]/25 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4 text-center">
          {/* Logo with Rp Symbol */}
          <div className="flex justify-center pb-1">
            <BrandLogo size="lg" showText={false} />
          </div>

          {/* Badge BSI & PKK */}
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Lomba Literasi Keuangan Syariah • BSI & PKK</span>
          </div>

          {/* Title & Tagline with CRISP CONTRAST (NO GOLD ON GREEN) */}
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-xs">
              PILIH BIJAK!
            </h1>
            <div className="pt-1 pb-1">
              <span className="text-sm sm:text-base font-extrabold text-white tracking-wide bg-white/20 px-4 py-1 rounded-full inline-block border border-white/30 shadow-xs">
                “Bukan Sekadar Hemat, tetapi Tepat.”
              </span>
            </div>
            <p className="text-sm text-emerald-100 font-medium leading-relaxed max-w-md mx-auto pt-1">
              Simulasi Keputusan Keuangan Keluarga Berbasis Nilai Syariah untuk Ibu-Ibu PKK Cerdas Finansial
            </p>
          </div>

          {/* Greeting if registered */}
          {participant ? (
            <div className="bg-white/20 rounded-2xl p-4 border border-white/30 text-white text-base font-bold flex items-center justify-center gap-2">
              <span className="text-2xl">{participant.avatarEmoji}</span>
              <span>Halo, {participant.name}! Siap membantu 3 keluarga hari ini?</span>
            </div>
          ) : (
            <div className="bg-white/15 rounded-2xl p-4 text-sm text-emerald-50 border border-white/20 text-left flex items-start gap-3">
              <div className="p-2.5 bg-white text-[#005E54] rounded-2xl shrink-0 mt-0.5 shadow-xs font-black">
                <Compass className="w-5 h-5" />
              </div>
              <p className="leading-relaxed font-medium">
                Setiap ibu mengerjakan mandiri lewat HP masing-masing. Ibu akan membantu 3 keluarga (Bu Nania, Bu Eva, dan Bu Frista). Daftarkan nama Ibu di tombol tengah sebagai langkah awal!
              </p>
            </div>
          )}

          {/* PROMINENT CENTRAL REGISTRATION BUTTON (Langkah Awal Semua Orang) */}
          <div className="pt-2 sm:pt-3 max-w-md mx-auto space-y-2.5 sm:space-y-3">
            {!participant ? (
              <button
                onClick={() => onNavigate('participant_profile')}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#F99D1C] to-[#e89018] hover:from-[#e89018] text-slate-950 font-black text-base sm:text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer ring-4 ring-white/30 text-center"
              >
                <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] shrink-0" />
                <span>DAFTAR NAMA IBU (Langkah Awal)</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5] shrink-0" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate(hasPreQuiz ? 'simulation' : 'pre_quiz')}
                className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#F99D1C] to-[#e89018] hover:from-[#e89018] text-slate-950 font-black text-base sm:text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer ring-4 ring-white/30 text-center"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" />
                <span>{hasPreQuiz ? 'Mulai Simulasi 3 Karakter (9 Soal)' : 'Mulai Kuis Awal (Pre-Test 10 Soal)'}</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              </button>
            )}

            <button
              onClick={() => onNavigate('how_to_play')}
              className="w-full py-3 px-4 bg-white/20 hover:bg-white/30 text-white font-extrabold text-sm sm:text-base rounded-2xl border border-white/30 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-emerald-100" />
              <span>Cara Bermain & Panduan</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Karakter Keluarga Preview */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-emerald-100 shadow-sm space-y-3.5">
        <div className="flex items-center gap-2 text-[#00675B] font-black text-base sm:text-lg">
          <Users className="w-5 h-5 text-[#00827B]" />
          <h3>3 Kasus Karakter yang Akan Ibu Bantu</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧕</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Bu Nania</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Pedagang Mie Ayam</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-snug font-medium pt-1">
              Kas awal Rp1,5 jt. Kulkas mati, stok ayam jualan cair, & buku LKS anak.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Bu Eva</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Penjahit Rumahan</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-snug font-medium pt-1">
              Kas awal Rp2 jt. Dinamo jahit berasap saat ada pesanan seragam pengajian.
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👵</span>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">Bu Frista</h4>
                <p className="text-[11px] text-slate-500 font-semibold">Keluarga Petani</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 leading-snug font-medium pt-1">
              Kas awal Rp2,5 jt. Daftar ulang SMK Doni & pupuk sawah sebelum panen.
            </p>
          </div>
        </div>
      </div>

      {/* Facilitator Quick Callout */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00827B] text-white rounded-2xl shrink-0 font-black shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm sm:text-base text-emerald-950">Fasilitator & Pengurus Lomba?</h4>
            <p className="text-xs text-slate-700 font-medium">Pantau peringkat, laporan 3 karakter, dan unduh rekap nilai.</p>
          </div>
        </div>
        <button
          onClick={onOpenFacilitatorDashboard}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#00675B] hover:bg-[#005E54] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer text-center"
        >
          Buka Pantauan
        </button>
      </div>

      {/* 4-Step User Journey with Large Fonts */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#00675B] font-black text-lg">
          <HeartHandshake className="w-6 h-6 text-[#00A39D]" />
          <h3>Alur Permainan Mandiri di HP</h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-[#00827B] text-white font-black text-base flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Daftar Nama Ibu</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Ketik nama panggilan Ibu untuk identitas di papan skor lomba.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-[#00827B] text-white font-black text-base flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Kuis Awal (Pre-Test 10 Soal)</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">10 pertanyaan kritis seputar promo belanja, cashback, dan pinjol.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-[#00827B] text-white font-black text-base flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Studi Kasus 3 Karakter (Total 9 Soal)</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">POV dompet karakter: Bu Nania (3 soal), Bu Eva (3 soal), Bu Frista (3 soal).</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3.5">
            <span className="w-9 h-9 rounded-xl bg-[#00827B] text-white font-black text-base flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">Kuis Akhir (Post-Test 10 Soal) & Laporan</h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Ukur peningkatan wawasan Ibu dan buka bedah tinjauan syariah BSI!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
