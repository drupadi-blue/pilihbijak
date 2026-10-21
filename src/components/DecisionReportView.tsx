import React, { useEffect } from 'react';
import { GameStage, ParticipantInfo, DecisionRecord, ScoreBreakdown } from '../types/game';
import { formatRupiah } from '../utils/scoring';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  Wallet, 
  ShieldCheck, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Share2,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface DecisionReportViewProps {
  participant: ParticipantInfo;
  decisions: DecisionRecord[];
  scoreBreakdown: ScoreBreakdown;
  characterWallets: {
    nania: { initial: number; spent: number; remaining: number; monthly: number };
    eva: { initial: number; spent: number; remaining: number; monthly: number };
    frista: { initial: number; spent: number; remaining: number; monthly: number };
  };
  preQuizScore: number;
  postQuizScore: number;
  onNavigate: (stage: GameStage) => void;
}

export const DecisionReportView: React.FC<DecisionReportViewProps> = ({
  participant,
  decisions,
  scoreBreakdown,
  characterWallets,
  preQuizScore,
  postQuizScore,
  onNavigate
}) => {
  useEffect(() => {
    if (scoreBreakdown.isChampion || scoreBreakdown.totalScore >= 75) {
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [scoreBreakdown]);

  const handlePrint = () => {
    window.print();
  };

  const shareToWhatsApp = () => {
    const text = `*SERTIFIKAT LITERASI KEUANGAN SYARIAH BSI & PKK*\n\n` +
      `Nama Ibu: ${participant.name} (${participant.rtRwVillage})\n` +
      `Total Skor Keputusan: ${scoreBreakdown.totalScore}/100 Poin\n` +
      `Predikat: ${scoreBreakdown.verdictTitle}\n\n` +
      `*Hasil Akhir Dompet 3 Keluarga:*\n` +
      `1. Bu Nania: Sisa Kas ${formatRupiah(characterWallets.nania.remaining)} (Cicilan: ${characterWallets.nania.monthly > 0 ? formatRupiah(characterWallets.nania.monthly) + '/bln' : 'Rp0 Aman'})\n` +
      `2. Bu Eva: Sisa Kas ${formatRupiah(characterWallets.eva.remaining)} (Cicilan: ${characterWallets.eva.monthly > 0 ? formatRupiah(characterWallets.eva.monthly) + '/bln' : 'Rp0 Aman'})\n` +
      `3. Bu Frista: Sisa Kas ${formatRupiah(characterWallets.frista.remaining)} (Cicilan: ${characterWallets.frista.monthly > 0 ? formatRupiah(characterWallets.frista.monthly) + '/bln' : 'Rp0 Aman'})\n\n` +
      `Skor Pre-Test: ${preQuizScore} ➔ Post-Test: ${postQuizScore} (+${postQuizScore - preQuizScore} Poin)\n\n` +
      `*PILIH BIJAK! - “Bukan Sekadar Hemat, tetapi Tepat.”*\n` +
      `Diselenggarakan oleh Bank Syariah Indonesia (BSI) & PKK`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Group 9 decisions by character
  const naniaDecisions = decisions.filter(d => d.characterId === 'bu-nania' || d.questionNumber <= 3);
  const evaDecisions = decisions.filter(d => d.characterId === 'bu-eva' || (d.questionNumber >= 4 && d.questionNumber <= 6));
  const fristaDecisions = decisions.filter(d => d.characterId === 'bu-frista' || d.questionNumber >= 7);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300 max-w-2xl mx-auto">
      {/* Big Hero Banner in BSI Green & Orange */}
      <div className="bg-gradient-to-br from-[#005E54] via-[#00827B] to-[#00A39D] text-white rounded-3xl p-6 sm:p-8 text-center border-2 border-emerald-600/40 shadow-xl relative overflow-hidden">
        <div className="space-y-3 relative z-10 max-w-lg mx-auto">
          {scoreBreakdown.isChampion ? (
            <div className="inline-flex items-center gap-2 bg-[#F99D1C] text-slate-950 font-black px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-md">
              <Award className="w-4 h-4" />
              <span>IBU PILIH BIJAK UTAMA BSI ⭐</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-white/20 text-white font-extrabold px-3.5 py-1 rounded-full text-xs sm:text-sm">
              <Trophy className="w-4 h-4 text-emerald-100" />
              <span>Laporan Hasil Keputusan Keuangan</span>
            </div>
          )}

          {/* Participant Name in BIG TEXT */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-3xl">{participant.avatarEmoji || '🧕'}</span>
            <h2 className="text-2xl sm:text-3xl font-black">{participant.name}</h2>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 font-semibold">{participant.rtRwVillage}</p>

          {/* Score in GIANT NUMBERS */}
          <div className="py-2">
            <span className="text-6xl sm:text-7xl font-black text-[#F99D1C] tracking-tight drop-shadow-sm">
              {scoreBreakdown.totalScore}
            </span>
            <span className="text-xl sm:text-2xl text-emerald-100 font-bold"> / 100 Poin</span>
            
            <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
              {scoreBreakdown.verdictTitle}
            </h3>
            <p className="text-sm sm:text-base text-emerald-50 max-w-md mx-auto mt-1 leading-relaxed font-medium">
              {scoreBreakdown.verdictDescription}
            </p>
          </div>

          {/* Pre to Post Gain */}
          <div className="bg-white/15 rounded-2xl p-3 max-w-xs mx-auto border border-white/20 text-xs sm:text-sm font-bold flex items-center justify-around">
            <div>
              <span className="text-emerald-200 block text-[11px]">Pre-Test:</span>
              <span className="text-white text-base">{preQuizScore}/100</span>
            </div>
            <div className="text-white text-lg font-black">➔</div>
            <div>
              <span className="text-emerald-200 block text-[11px]">Post-Test:</span>
              <span className="text-white text-base">{postQuizScore}/100</span>
            </div>
            <div>
              <span className="text-emerald-200 block text-[11px]">Gain:</span>
              <span className="text-white font-black text-base">+{postQuizScore - preQuizScore}</span>
            </div>
          </div>

          {/* WhatsApp & Print buttons */}
          <div className="pt-3 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={shareToWhatsApp}
              className="px-5 py-3 bg-[#F99D1C] hover:bg-[#e89018] text-slate-950 font-black text-sm rounded-2xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Kirim Sertifikat ke WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-2xl transition-colors flex items-center gap-1.5 border border-white/30 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Hasil</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rincian Arus Kas Nyata 3 Karakter Keluarga (Bu Nania, Bu Eva, Bu Frista) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-6 h-6 text-[#00827B]" />
          <div>
            <h3 className="font-black text-slate-900 text-lg sm:text-xl">
              Status Kas 3 Karakter Keluarga
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Kondisi dompet akhir Bu Nania, Bu Eva, dan Bu Frista setelah Ibu bantu.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Bu Nania */}
          <div className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-[#00675B] text-sm">1. Bu Nania 🧕</span>
              <span className="text-[11px] font-bold text-slate-500">Mie Ayam</span>
            </div>
            <div className="space-y-1 text-xs font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Kas Awal:</span>
                <span className="font-bold">{formatRupiah(characterWallets.nania.initial)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Terpakai:</span>
                <span className="font-bold">-{formatRupiah(characterWallets.nania.spent)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 font-extrabold text-sm text-[#00675B]">
                <span>Sisa Kas:</span>
                <span>{formatRupiah(characterWallets.nania.remaining)}</span>
              </div>
              <div className="flex justify-between pt-0.5 text-[11px] text-slate-600">
                <span>Cicilan/bln:</span>
                <span className={characterWallets.nania.monthly > 0 ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
                  {characterWallets.nania.monthly > 0 ? formatRupiah(characterWallets.nania.monthly) : 'Rp0 Aman'}
                </span>
              </div>
            </div>
          </div>

          {/* Bu Eva */}
          <div className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-[#00675B] text-sm">2. Bu Eva 👩</span>
              <span className="text-[11px] font-bold text-slate-500">Penjahit</span>
            </div>
            <div className="space-y-1 text-xs font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Kas Awal:</span>
                <span className="font-bold">{formatRupiah(characterWallets.eva.initial)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Terpakai:</span>
                <span className="font-bold">-{formatRupiah(characterWallets.eva.spent)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 font-extrabold text-sm text-[#00675B]">
                <span>Sisa Kas:</span>
                <span>{formatRupiah(characterWallets.eva.remaining)}</span>
              </div>
              <div className="flex justify-between pt-0.5 text-[11px] text-slate-600">
                <span>Cicilan/bln:</span>
                <span className={characterWallets.eva.monthly > 0 ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
                  {characterWallets.eva.monthly > 0 ? formatRupiah(characterWallets.eva.monthly) : 'Rp0 Aman'}
                </span>
              </div>
            </div>
          </div>

          {/* Bu Frista */}
          <div className="bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-[#00675B] text-sm">3. Bu Frista 👵</span>
              <span className="text-[11px] font-bold text-slate-500">Petani</span>
            </div>
            <div className="space-y-1 text-xs font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>Kas Awal:</span>
                <span className="font-bold">{formatRupiah(characterWallets.frista.initial)}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>Terpakai:</span>
                <span className="font-bold">-{formatRupiah(characterWallets.frista.spent)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 font-extrabold text-sm text-[#00675B]">
                <span>Sisa Kas:</span>
                <span>{formatRupiah(characterWallets.frista.remaining)}</span>
              </div>
              <div className="flex justify-between pt-0.5 text-[11px] text-slate-600">
                <span>Cicilan/bln:</span>
                <span className={characterWallets.frista.monthly > 0 ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
                  {characterWallets.frista.monthly > 0 ? formatRupiah(characterWallets.frista.monthly) : 'Rp0 Aman'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Skor 5 Pilar BSI */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm space-y-4">
        <h3 className="font-black text-slate-900 text-lg sm:text-xl flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#F99D1C]" />
          <span>Rincian 5 Kategori Penilaian BSI (Total 100 Poin)</span>
        </h3>

        <div className="space-y-3.5 text-sm font-bold text-slate-800">
          {/* Pillar 1 */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span>1. Pemenuhan Kebutuhan Utama</span>
              <span className="text-[#00675B] font-black">{scoreBreakdown.needFulfillment} / 25 Poin</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#00827B] h-full rounded-full" style={{ width: `${(scoreBreakdown.needFulfillment / 25) * 100}%` }} />
            </div>
          </div>

          {/* Pillar 2 */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span>2. Kewajaran Biaya & Anggaran</span>
              <span className="text-[#00675B] font-black">{scoreBreakdown.budgetSuitability} / 20 Poin</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${(scoreBreakdown.budgetSuitability / 20) * 100}%` }} />
            </div>
          </div>

          {/* Pillar 3 */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span>3. Kesiapan Risiko & Beban Mendatang</span>
              <span className="text-[#00675B] font-black">{scoreBreakdown.riskPreparedness} / 15 Poin</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(scoreBreakdown.riskPreparedness / 15) * 100}%` }} />
            </div>
          </div>

          {/* Pillar 4 */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span>4. Penerapan Prinsip Keuangan Syariah</span>
              <span className="text-[#00675B] font-black">{scoreBreakdown.syariahPrinciples} / 25 Poin</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: `${(scoreBreakdown.syariahPrinciples / 25) * 100}%` }} />
            </div>
          </div>

          {/* Pillar 5 */}
          <div>
            <div className="flex justify-between mb-1.5">
              <span>5. Kualitas Keputusan Mandiri & Rasional</span>
              <span className="text-[#00675B] font-black">{scoreBreakdown.decisionQuality} / 15 Poin</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-[#00A39D] h-full rounded-full" style={{ width: `${(scoreBreakdown.decisionQuality / 15) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Strength & Improvement Callouts */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl space-y-1">
            <span className="font-black text-[#00675B] block flex items-center gap-1.5 text-sm sm:text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              Kekuatan Utama Ibu:
            </span>
            <p className="text-slate-800 leading-relaxed font-semibold">
              {scoreBreakdown.keyStrength}
            </p>
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl space-y-1">
            <span className="font-black text-[#00675B] block flex items-center gap-1.5 text-sm sm:text-base">
              <HelpCircle className="w-5 h-5 text-[#00827B] shrink-0" />
              Saran Edukasi BSI:
            </span>
            <p className="text-slate-800 leading-relaxed font-semibold">
              {scoreBreakdown.improvementTip}
            </p>
          </div>
        </div>
      </div>

      {/* REVIEW MENDALAM SETIAP KEPUTUSAN (KONSEKUENSI & FIQIH MUAMALAH) PER KARAKTER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-sm space-y-5">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-[#00675B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Bedah Tuntas 9 Keputusan
          </span>
          <h3 className="font-black text-slate-900 text-lg sm:text-xl">
            Review Konsekuensi & Tinjauan Fiqih Muamalah 3 Karakter
          </h3>
          <p className="text-sm text-slate-600">
            Berikut adalah penjelasan lengkap dari setiap keputusan yang Ibu sarankan untuk Bu Nania, Bu Eva, dan Bu Frista.
          </p>
        </div>

        {/* SECTION 1: BU NANIA */}
        <div className="space-y-3.5 pt-2">
          <div className="flex items-center gap-2 border-b-2 border-emerald-200 pb-2">
            <span className="text-2xl">🧕</span>
            <h4 className="font-black text-slate-900 text-base sm:text-lg">
              Kasus 1: Bu Nania (Pedagang Makanan)
            </h4>
          </div>

          <div className="space-y-4">
            {naniaDecisions.map((dec, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-200 space-y-3 text-sm text-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className="font-black text-[#00675B] text-base">
                    {dec.questionTitle}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${dec.selectedOption.verdictBadgeColor}`}>
                    {dec.selectedOption.verdictBadge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    Saran yang Ibu Pilih:
                  </span>
                  <h5 className="font-extrabold text-slate-950 text-base mt-0.5 leading-snug">
                    {dec.selectedOption.title}
                  </h5>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Kategori: <strong>{dec.selectedOption.solutionCategory}</strong> • Biaya: <strong>{formatRupiah(dec.selectedOption.cost)}</strong>
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Konsekuensi Nyata bagi Bu Nania:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {dec.selectedOption.detailedConsequence}
                  </p>
                </div>

                <div className="bg-emerald-50/90 p-3.5 rounded-2xl border-2 border-emerald-200 space-y-1">
                  <span className="font-extrabold text-[#005E54] text-xs sm:text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00827B] shrink-0" />
                    Tinjauan Nilai Syariah & Fiqih Muamalah:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                    {dec.selectedOption.syariahReview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: BU EVA */}
        <div className="space-y-3.5 pt-4">
          <div className="flex items-center gap-2 border-b-2 border-teal-200 pb-2">
            <span className="text-2xl">👩</span>
            <h4 className="font-black text-slate-900 text-base sm:text-lg">
              Kasus 2: Bu Eva (Penjahit Rumahan)
            </h4>
          </div>

          <div className="space-y-4">
            {evaDecisions.map((dec, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-200 space-y-3 text-sm text-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className="font-black text-[#00675B] text-base">
                    {dec.questionTitle}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${dec.selectedOption.verdictBadgeColor}`}>
                    {dec.selectedOption.verdictBadge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    Saran yang Ibu Pilih:
                  </span>
                  <h5 className="font-extrabold text-slate-950 text-base mt-0.5 leading-snug">
                    {dec.selectedOption.title}
                  </h5>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Kategori: <strong>{dec.selectedOption.solutionCategory}</strong> • Biaya: <strong>{formatRupiah(dec.selectedOption.cost)}</strong>
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Konsekuensi Nyata bagi Bu Eva:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {dec.selectedOption.detailedConsequence}
                  </p>
                </div>

                <div className="bg-emerald-50/90 p-3.5 rounded-2xl border-2 border-emerald-200 space-y-1">
                  <span className="font-extrabold text-[#005E54] text-xs sm:text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00827B] shrink-0" />
                    Tinjauan Nilai Syariah & Fiqih Muamalah:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                    {dec.selectedOption.syariahReview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: BU FRISTA */}
        <div className="space-y-3.5 pt-4">
          <div className="flex items-center gap-2 border-b-2 border-amber-200 pb-2">
            <span className="text-2xl">👵</span>
            <h4 className="font-black text-slate-900 text-base sm:text-lg">
              Kasus 3: Bu Frista (Keluarga Petani)
            </h4>
          </div>

          <div className="space-y-4">
            {fristaDecisions.map((dec, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 rounded-3xl p-5 border-2 border-slate-200 space-y-3 text-sm text-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <span className="font-black text-[#00675B] text-base">
                    {dec.questionTitle}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${dec.selectedOption.verdictBadgeColor}`}>
                    {dec.selectedOption.verdictBadge}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    Saran yang Ibu Pilih:
                  </span>
                  <h5 className="font-extrabold text-slate-950 text-base mt-0.5 leading-snug">
                    {dec.selectedOption.title}
                  </h5>
                  <p className="text-xs font-semibold text-slate-600 mt-1">
                    Kategori: <strong>{dec.selectedOption.solutionCategory}</strong> • Biaya: <strong>{formatRupiah(dec.selectedOption.cost)}</strong>
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Konsekuensi Nyata bagi Bu Frista:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {dec.selectedOption.detailedConsequence}
                  </p>
                </div>

                <div className="bg-emerald-50/90 p-3.5 rounded-2xl border-2 border-emerald-200 space-y-1">
                  <span className="font-extrabold text-[#005E54] text-xs sm:text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#00827B] shrink-0" />
                    Tinjauan Nilai Syariah & Fiqih Muamalah:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                    {dec.selectedOption.syariahReview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('leaderboard')}
          className="py-4 px-6 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-black text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Trophy className="w-5 h-5 text-white" />
          <span>Lihat Papan Skor Seluruh Ibu Peserta</span>
        </button>

        <button
          onClick={() => onNavigate('discussion')}
          className="py-4 px-6 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base rounded-2xl border-2 border-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-[#00827B]" />
          <span>Bahas Bersama Fasilitator & BSI</span>
        </button>
      </div>
    </div>
  );
};
