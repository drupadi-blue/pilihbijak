import React, { useState } from 'react';
import { GameStage, ParticipantInfo, QuizResult } from '../types/game';
import { POST_QUIZ_QUESTIONS } from '../data/quizData';
import { CheckCircle, AlertCircle, ArrowRight, TrendingUp, RotateCcw } from 'lucide-react';

interface PostQuizViewProps {
  participant: ParticipantInfo | null;
  preQuizResult: QuizResult | null;
  postQuizResult: QuizResult | null;
  onCompletePostQuiz: (result: QuizResult) => void;
  onNavigate: (stage: GameStage) => void;
}

export const PostQuizView: React.FC<PostQuizViewProps> = ({
  participant,
  preQuizResult,
  postQuizResult,
  onCompletePostQuiz,
  onNavigate
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    postQuizResult?.answers || {}
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(!!postQuizResult);

  const question = POST_QUIZ_QUESTIONS[currentIdx];
  const total = POST_QUIZ_QUESTIONS.length;

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
      POST_QUIZ_QUESTIONS.forEach((q) => {
        const chosen = selectedAnswers[q.id];
        const correctOpt = q.options.find((o) => o.isCorrect);
        if (chosen === correctOpt?.id) correct += 1;
      });
      const score = Math.round((correct / total) * 100);
      const result: QuizResult = {
        totalQuestions: total,
        correctAnswers: correct,
        score,
        answers: selectedAnswers
      };
      onCompletePostQuiz(result);
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
    let postCorrect = 0;
    POST_QUIZ_QUESTIONS.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const correctOpt = q.options.find((o) => o.isCorrect);
      if (chosen === correctOpt?.id) postCorrect += 1;
    });
    const postScore = Math.round((postCorrect / total) * 100);
    const preScore = preQuizResult ? preQuizResult.score : 60;
    const scoreDiff = postScore - preScore;

    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-300 max-w-xl mx-auto">
        {/* Comparison Result Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-emerald-100 text-[#00675B] rounded-2xl flex items-center justify-center font-bold text-3xl">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Evaluasi Kuis Akhir Selesai
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1">
              Perbandingan Wawasan Ibu
            </h2>
            <p className="text-sm text-slate-600">
              Hasil kuis sebelum dan sesudah mempelajari studi kasus 3 keluarga: Bu Nania, Bu Eva, dan Bu Frista.
            </p>
          </div>

          {/* 3 Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-center">
            {/* Pre Quiz */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
              <span className="text-xs text-slate-500 font-bold block">Kuis Awal</span>
              <span className="text-3xl sm:text-4xl font-black text-slate-700 mt-1 block">
                {preScore}
              </span>
              <span className="text-[11px] text-slate-500 block">Sebelum Simulasi</span>
            </div>

            {/* Post Quiz */}
            <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-[#00827B]">
              <span className="text-xs text-emerald-800 font-bold block">Kuis Akhir</span>
              <span className="text-3xl sm:text-4xl font-black text-[#00675B] mt-1 block">
                {postScore}
              </span>
              <span className="text-[11px] text-emerald-700 block font-semibold">Sesudah Simulasi</span>
            </div>

            {/* Delta */}
            <div className="col-span-2 sm:col-span-1 bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-300">
              <span className="text-xs text-emerald-950 font-black block">Peningkatan</span>
              <div className="flex items-center justify-center gap-1 text-3xl sm:text-4xl font-black text-[#00675B] mt-1">
                <TrendingUp className="w-6 h-6 text-[#00675B]" />
                <span>{scoreDiff >= 0 ? `+${scoreDiff}` : scoreDiff}</span>
              </div>
              <span className="text-[11px] text-emerald-800 font-bold block">Poin Wawasan</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-700 max-w-md mx-auto leading-relaxed pt-1">
            {scoreDiff > 0
              ? `Alhamdulillah! Terjadi peningkatan pemahaman sebesar +${scoreDiff} poin. Ibu kini lebih jeli membedakan kebutuhan riil, bahaya pinjol bunga harian, dan berkahnya pembiayaan syariah BSI & Pegadaian Syariah.`
              : 'Pemahaman awal Ibu sudah sangat hebat! Mari kita lihat laporan lengkap dan evaluasi mendalam atas setiap keputusan yang Ibu pilih.'}
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <button
              onClick={() => onNavigate('report')}
              className="flex-1 py-4 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Buka Laporan & Review Lengkap</span>
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

  return (
    <div className="space-y-5 pb-16 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Progress & Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-600">
          <span className="text-[#00675B] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Langkah 3: Kuis Akhir (Post-Test)
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

        {/* Question Topic & Text with LARGE READABLE FONT */}
        <div className="pt-1">
          <span className="text-xs font-black text-[#005E54] uppercase tracking-wide bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
            Topik: {question.context}
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1.5 leading-snug">
            {question.question}
          </h3>
        </div>
      </div>

      {/* Options List */}
      <div className="space-y-3.5">
        {question.options.map((opt) => {
          const isSelected = selectedAnswers[question.id] === opt.id;
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
      {showExplanation && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-md space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            {question.options.find(o => o.id === selectedAnswers[question.id])?.isCorrect ? (
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
            {question.options.find(o => o.id === selectedAnswers[question.id])?.explanation}
          </p>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentIdx < total - 1 ? 'Soal Berikutnya' : 'Buka Laporan & Hasil Akhir'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
