import React, { useState } from 'react';
import { GameStage, ParticipantInfo, DecisionRecord, DecisionOption } from '../types/game';
import { ALL_9_QUESTIONS } from '../data/scenarioData';
import { formatRupiah } from '../utils/scoring';
import { 
  Wallet, 
  ArrowRight, 
  ArrowLeft, 
  Calculator,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface SimulationGameViewProps {
  participant: ParticipantInfo;
  onFinishSimulation: (decisions: DecisionRecord[]) => void;
  onNavigate: (stage: GameStage) => void;
  onOpenLoanCalc: () => void;
}

export const SimulationGameView: React.FC<SimulationGameViewProps> = ({
  participant,
  onFinishSimulation,
  onNavigate,
  onOpenLoanCalc
}) => {
  const [currentGlobalIndex, setCurrentGlobalIndex] = useState<number>(0);
  const [selectedDecisions, setSelectedDecisions] = useState<DecisionRecord[]>([]);
  const [currentSelectedOption, setCurrentSelectedOption] = useState<DecisionOption | null>(null);
  const [showingCharacterIntro, setShowingCharacterIntro] = useState<boolean>(true);

  const currentItem = ALL_9_QUESTIONS[currentGlobalIndex] || ALL_9_QUESTIONS[0];
  const currentChar = currentItem.character;
  const currentQ = currentItem.question;
  const localQuestionIndex = (currentGlobalIndex % 3) + 1; // 1, 2, or 3
  const currentCaseNumber = Math.floor(currentGlobalIndex / 3) + 1; // 1, 2, or 3

  // Decisions for Bu Nania: indices 0, 1, 2
  // Decisions for Bu Eva: indices 3, 4, 5
  // Decisions for Bu Frista: indices 6, 7, 8
  const charStartIndex = (currentCaseNumber - 1) * 3;
  const charEndIndex = charStartIndex + 3;

  const activeDecisionsForChar = [...selectedDecisions];
  if (currentSelectedOption) {
    activeDecisionsForChar[currentGlobalIndex] = {
      characterId: currentChar.id,
      characterName: currentChar.characterName,
      questionNumber: currentGlobalIndex + 1,
      questionTitle: currentQ.title,
      selectedOption: currentSelectedOption
    };
  }

  let charSpent = 0;
  let charAdditional = 0;

  for (let i = charStartIndex; i < charEndIndex; i++) {
    const d = activeDecisionsForChar[i];
    if (d) {
      charSpent += d.selectedOption.cost;
      if (d.selectedOption.additionalFund) charAdditional += d.selectedOption.additionalFund;
    }
  }

  const liveRemainingCash = currentChar.initialCash + charAdditional - charSpent;

  const handleSelectOption = (opt: DecisionOption) => {
    setCurrentSelectedOption(opt);
  };

  const handleNextQuestion = () => {
    if (!currentSelectedOption) return;

    const newRecord: DecisionRecord = {
      characterId: currentChar.id,
      characterName: currentChar.characterName,
      questionNumber: currentGlobalIndex + 1,
      questionTitle: currentQ.title,
      selectedOption: currentSelectedOption
    };

    const updated = [...selectedDecisions];
    updated[currentGlobalIndex] = newRecord;
    setSelectedDecisions(updated);

    if (currentGlobalIndex < 8) {
      const nextIndex = currentGlobalIndex + 1;
      const willSwitchCharacter = Math.floor(nextIndex / 3) !== Math.floor(currentGlobalIndex / 3);

      setCurrentGlobalIndex(nextIndex);
      const nextExisting = updated[nextIndex];
      setCurrentSelectedOption(nextExisting ? nextExisting.selectedOption : null);

      if (willSwitchCharacter) {
        setShowingCharacterIntro(true);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all 9 questions across the 3 characters!
      onFinishSimulation(updated);
    }
  };

  const handlePrevQuestion = () => {
    if (showingCharacterIntro && currentGlobalIndex > 0) {
      const prevIdx = currentGlobalIndex - 1;
      setCurrentGlobalIndex(prevIdx);
      setShowingCharacterIntro(false);
      const prevDecision = selectedDecisions[prevIdx];
      setCurrentSelectedOption(prevDecision ? prevDecision.selectedOption : null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentGlobalIndex > 0) {
      const prevIdx = currentGlobalIndex - 1;
      const isSwitchingBack = Math.floor(prevIdx / 3) !== Math.floor(currentGlobalIndex / 3);
      setCurrentGlobalIndex(prevIdx);
      const prevDecision = selectedDecisions[prevIdx];
      setCurrentSelectedOption(prevDecision ? prevDecision.selectedOption : null);
      if (isSwitchingBack) {
        setShowingCharacterIntro(true);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate('pre_quiz');
    }
  };

  // --------------------------------------------------------------------------
  // CHARACTER INTRO SCREEN (Before each case begins)
  // --------------------------------------------------------------------------
  if (showingCharacterIntro) {
    return (
      <div className="space-y-6 pb-20 animate-in fade-in duration-300 max-w-xl mx-auto">
        <div className="bg-gradient-to-br from-[#005E54] via-[#00827B] to-[#00A39D] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-600/40 space-y-4">
          {/* Case indicator */}
          <div className="flex items-center justify-between">
            <span className="bg-white text-[#005E54] font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              Kasus {currentCaseNumber} dari 3
            </span>
            <span className="text-xs text-white font-bold bg-white/20 px-3 py-1 rounded-full border border-white/20">
              3 Masalah (Soal {charStartIndex + 1}–{charStartIndex + 3} dari 9)
            </span>
          </div>

          {/* Character Header */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-white/20 flex items-center justify-center text-4xl sm:text-5xl shrink-0 border-2 border-white/30 shadow-md">
              {currentChar.avatarIcon}
            </div>
            <div>
              <span className="text-xs text-emerald-100 font-extrabold uppercase tracking-wide block">
                Karakter Keluarga Fiktif
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {currentChar.characterName}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-semibold mt-1">
                {currentChar.familyMembers}
              </p>
            </div>
          </div>

          {/* Dompet Awal Karakter - High Contrast Pure White Container */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 text-slate-900 border-2 border-emerald-200 shadow-md space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-slate-700 font-extrabold flex items-center gap-1.5 uppercase tracking-wide">
                <Wallet className="w-4 h-4 text-[#00675B]" />
                Kondisi Dompet Awal {currentChar.characterName.split(' ')[0]}:
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#00675B]">
                {currentChar.initialCashFormatted}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed pt-1">
              *Catatan: Selama 3 masalah ke depan, Ibu akan mengelola uang dompet milik {currentChar.characterName.split(' ')[0]}.
            </p>
          </div>

          {/* Background Story & Kebutuhan / Masalah Pokok */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 text-slate-900 space-y-2 border-2 border-emerald-200 shadow-sm">
            <span className="text-xs font-black uppercase text-[#00675B] tracking-wider block flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#00827B]" />
              Kebutuhan & Masalah Pokok:
            </span>
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-800">
              {currentChar.characterBio}
            </p>
          </div>

          {/* Participant Role Banner */}
          <div className="bg-white/20 rounded-2xl p-3.5 border border-white/30 text-xs sm:text-sm text-white font-medium flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-200 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Peran Ibu ({participant.name}): </strong>
              Bantulah {currentChar.characterName.split(' ')[0]} mengambil 3 keputusan keuangan terbaik yang bijak, hemat tepat sasaran, dan sesuai prinsip syariah.
            </p>
          </div>

          {/* Start Character Questions CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setShowingCharacterIntro(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-4 bg-white hover:bg-emerald-50 text-[#005E54] font-black text-base sm:text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer ring-4 ring-white/30"
            >
              <span>Mulai Bantu</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // QUESTION SCREEN (1 of 9 Questions) - HIGH CONTRAST (NO GOLD ON GREEN)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Top Bar: POV DOMPET KARAKTER (Bukan Dompet User) */}
      <div className="bg-gradient-to-r from-[#005E54] via-[#00827B] to-[#00A39D] text-white rounded-3xl p-3.5 sm:p-5 shadow-lg border-2 border-emerald-600/40 relative sm:sticky sm:top-16 z-20 backdrop-blur-md space-y-2 sm:space-y-2.5">
        {/* Top Meta Row */}
        <div className="flex items-center justify-between text-xs sm:text-sm pb-2 border-b border-white/20 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 font-black text-white truncate">
            <span className="text-lg sm:text-xl shrink-0">{participant.avatarEmoji || '🧕'}</span>
            <span className="text-emerald-100 font-bold shrink-0">Penasihat:</span>
            <span className="text-white font-black underline decoration-emerald-200 decoration-2 truncate">{participant.name}</span>
          </div>
          <span className="bg-white/20 text-white px-2.5 py-1 rounded-full font-extrabold text-[11px] sm:text-xs border border-white/20 shrink-0">
            Kasus {currentCaseNumber}/3 • Soal {currentGlobalIndex + 1}/9
          </span>
        </div>

        {/* Live Wallet Box: High Contrast Pure White Text & Crisp White Container */}
        <div className="flex items-center justify-between pt-1 gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="p-2 sm:p-2.5 bg-white text-[#005E54] rounded-2xl shrink-0 font-black shadow-xs">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-[#00675B]" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs text-emerald-100 font-black uppercase tracking-wider block">
                POV: Dompet {currentChar.characterName.split(' ')[0]}
              </span>
              <span className="text-xl sm:text-3xl font-black text-white tracking-tight drop-shadow-sm">
                {formatRupiah(liveRemainingCash)}
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] sm:text-[11px] text-emerald-100 font-semibold block">Kas Awal Karakter:</span>
            <span className="text-xs sm:text-sm font-black text-white bg-white/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-xl inline-block mt-0.5 border border-white/20">
              {currentChar.initialCashFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Main Dilemma Question Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-sm space-y-4">
        {/* Step Badge & Calculator Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentChar.avatarIcon}</span>
            <span className="text-xs sm:text-sm font-black text-[#00675B] uppercase tracking-wider bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              {currentChar.characterName.split(' ')[0]} • Masalah {localQuestionIndex} dari 3
            </span>
          </div>

          {/* Calculator helper inside question box */}
          <button
            type="button"
            onClick={onOpenLoanCalc}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-[#005E54] text-xs font-bold transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-[#00827B]" />
            <span>Kalkulator Bantuan</span>
          </button>
        </div>

        {/* Question Heading with LARGE, CRISP TEXT for MINUS EYES */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {currentQ.title}
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-800 mt-2 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 leading-relaxed">
            {currentQ.dilemma}
          </p>
        </div>
      </div>

      {/* Balanced Options List (NO spoiler labels, balanced length, no obvious Arabic term bias) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between px-1">
          <label className="text-sm sm:text-base font-extrabold text-slate-900">
            Pilihlah salah satu saran tindakan terbaik untuk {currentChar.characterName.split(' ')[0]}:
          </label>
        </div>

        {currentQ.options.map((option, idx) => {
          const isSelected = currentSelectedOption?.id === option.id;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <div
              key={option.id}
              onClick={() => handleSelectOption(option)}
              className={`rounded-3xl p-5 border-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] select-none ${
                isSelected
                  ? 'border-[#00827B] bg-emerald-50/90 ring-3 ring-emerald-300/40 shadow-md'
                  : 'border-slate-300 bg-white hover:border-[#00827B] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Letter indicator (A, B, C, D) */}
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base shrink-0 mt-0.5 border transition-colors ${
                  isSelected 
                    ? 'bg-[#00827B] text-white border-[#00675B]' 
                    : 'bg-slate-100 text-slate-800 border-slate-300'
                }`}>
                  {letter}
                </div>

                <div className="space-y-2 flex-1">
                  {/* Action Description */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {option.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    {option.neutralActionText}
                  </p>

                  {/* Clean Cost Summary */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm font-bold text-slate-700">
                    <span className="bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                      Biaya Keluar: {formatRupiah(option.cost)}
                    </span>
                    {option.monthlyLiability && option.monthlyLiability > 0 ? (
                      <span className="bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                        Cicilan: {formatRupiah(option.monthlyLiability)} / bln
                      </span>
                    ) : null}
                    {option.additionalFund && option.additionalFund > 0 ? (
                      <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-xl border border-emerald-200">
                        Dana Masuk: +{formatRupiah(option.additionalFund)}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Checkbox Icon */}
                <div className="shrink-0 mt-1">
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-[#00827B] bg-[#00827B] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-5 h-5" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 sm:gap-3 pt-3">
        <button
          type="button"
          onClick={handlePrevQuestion}
          className="px-3.5 sm:px-5 py-3.5 sm:py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base rounded-2xl transition-colors flex items-center gap-1.5 sm:gap-2 cursor-pointer border border-slate-300 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          disabled={!currentSelectedOption}
          onClick={handleNextQuestion}
          className={`flex-1 py-3.5 sm:py-4 px-3 sm:px-6 rounded-2xl font-black text-sm sm:text-lg flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg transition-all active:scale-95 text-center ${
            currentSelectedOption
              ? 'bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] text-white hover:opacity-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
          }`}
        >
          <span>
            {localQuestionIndex < 3
              ? 'Lanjut ke Masalah Berikutnya'
              : currentCaseNumber < 3
                ? `Selesai Kasus ${currentCaseNumber} ➔ Kasus ${currentCaseNumber + 1}`
                : 'Selesai 9 Masalah ➔ Kuis Akhir'}
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        </button>
      </div>
    </div>
  );
};
