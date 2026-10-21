import React, { useState } from 'react';
import { GameStage, QuizResult } from '../types/game';
import { PRE_QUIZ_QUESTIONS } from '../data/quizData';
import { CheckCircle, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface PreQuizViewProps {
  onCompleteQuiz: (result: QuizResult) => void;
  onNavigate: (stage: GameStage) => void;
  savedResult: QuizResult | null;
  hasParticipant: boolean;
}

export const PreQuizView: React.FC<PreQuizViewProps> = ({
  onCompleteQuiz,
  onNavigate,
  savedResult,
  hasParticipant
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    savedResult?.answers || {}
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(!!savedResult);

  const question = PRE_QUIZ_QUESTIONS[currentIdx];
  const total = PRE_QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionId: string) => {
    if (showExplanation) return;
    const updated = { ...selectedAnswers, [question.id]: optionId };
    setSelectedAnswers(updated);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      let correct = 0;
      PRE_QUIZ_QUESTIONS.forEach((q) => {
        const chosen = selectedAnswers[q.id];
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (chosen === correctOpt?.id) {
          correct += 1;
        }
      });
      const score = Math.round((correct / total) * 100);
      const result: QuizResult = {
        totalQuestions: total,
        correctAnswers: correct,
        score,
        answers: selectedAnswers
      };
      onCompleteQuiz(result);
      setIsFinished(true);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  if (isFinished) {
    let correct = 0;
    PRE_QUIZ_QUESTIONS.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (chosen === correctOpt?.id) correct += 1;
    });
    const finalScore = Math.round((correct / total) * 100);

    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-300 max-w-xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-emerald-100 text-[#00675B] rounded-2xl flex items-center justify-center font-bold text-3xl">
            📝
          </div>

          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Langkah 1 Selesai
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
              Hasil Kuis Awal Ibu
            </h2>
            <p className="text-sm text-slate-600">
              Skor ini disimpan untuk melihat peningkatan wawasan setelah kuis kasus selesai.
            </p>
          </div>

          {/* Score Box */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6 max-w-xs mx-auto">
            <div className="text-5xl font-black text-[#00675B] tracking-tight">
              {finalScore}
              <span className="text-lg text-slate-500 font-bold"> / 100</span>
            </div>
            <p className="text-sm font-bold text-emerald-900 mt-2">
              {correct} dari {total} pertanyaan terjawab tepat
            </p>
          </div>

          <p className="text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
            Berapapun skor awal ini, mari kita buktikan pemahaman Ibu akan meningkat setelah menyelesaikan kasus 3 keluarga: Bu Nania, Bu Eva, dan Bu Frista (Total 9 Soal)!
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <button
              onClick={() => onNavigate(hasParticipant ? 'simulation' : 'participant_profile')}
              className="flex-1 py-4 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{hasParticipant ? 'Mulai Simulasi 3 Karakter (9 Soal)' : 'Lanjut Isi Nama Ibu'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleRetake}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedOptionId = selectedAnswers[question.id];
  const selectedOption = question.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Progress & Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600">
          <span className="text-[#00675B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Langkah 1: Kuis Awal (Pre-Test)
          </span>
          <span>Soal {currentIdx + 1} dari {total}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className="bg-[#00A39D] h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
          />
        </div>

        {/* Question Topic & Question with LARGE READABLE FONT */}
        <div className="pt-1">
          <span className="text-xs font-black text-[#005E54] uppercase tracking-wide bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Topik: {question.context}
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1.5 leading-snug">
            {question.question}
          </h3>
        </div>
      </div>

      {/* Options List with BIG FONT & CLEAR TAP TARGETS */}
      <div className="space-y-3.5">
        {question.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let btnClass = "bg-white border-slate-300 text-slate-900 hover:border-[#00827B] hover:bg-emerald-50/30";

          if (showExplanation) {
            if (opt.isCorrect) {
              btnClass = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300";
            } else if (isSelected && !opt.isCorrect) {
              btnClass = "bg-rose-50 border-rose-400 text-rose-950 opacity-90";
            } else {
              btnClass = "bg-white border-slate-200 text-slate-400 opacity-60";
            }
          } else if (isSelected) {
            btnClass = "bg-emerald-50 border-[#00675B] text-[#005E54] ring-2 ring-emerald-400 font-bold";
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              disabled={showExplanation}
              className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-4 shadow-xs active:scale-[0.99] cursor-pointer ${btnClass}`}
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-sm shrink-0 mt-0.5 uppercase text-slate-800 border border-slate-200">
                {opt.id}
              </div>
              <span className="text-base sm:text-lg font-semibold leading-relaxed flex-1">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback explanation */}
      {showExplanation && selectedOption && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-md space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            {selectedOption.isCorrect ? (
              <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-base">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>Jawaban Ibu Sangat Tepat!</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-700 font-extrabold text-base">
                <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                <span>Mari Kita Pahami Penjelasannya!</span>
              </div>
            )}
          </div>

          <p className="text-sm sm:text-base text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200 font-medium">
            {selectedOption.explanation}
          </p>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentIdx < total - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis Awal'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
