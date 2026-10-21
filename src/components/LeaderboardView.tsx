import React, { useState } from 'react';
import { GameStage, CompletedSession } from '../types/game';
import { Trophy, Plus, Trash2, Star, CheckCircle2, AlertCircle, AlertTriangle, Wallet } from 'lucide-react';
import { formatRupiah } from '../utils/scoring';

interface LeaderboardViewProps {
  sessions: CompletedSession[];
  onStartNewParticipant: () => void;
  onClearSessions: () => void;
  onNavigate: (stage: GameStage) => void;
  onDeleteSession?: (sessionId: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  sessions,
  onStartNewParticipant,
  onClearSessions,
  onNavigate,
  onDeleteSession
}) => {
  const [selectedSession, setSelectedSession] = useState<CompletedSession | null>(null);
  const [sessionToDelete, setSessionToDelete] = useState<CompletedSession | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const sortedSessions = [...sessions].sort(
    (a, b) => b.scoreBreakdown.totalScore - a.scoreBreakdown.totalScore
  );

  const highestScore = sortedSessions.length > 0 ? sortedSessions[0].scoreBreakdown.totalScore : 0;

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Title Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-emerald-100 shadow-sm text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-[#F99D1C] flex items-center justify-center font-bold text-3xl border border-amber-200">
          <Trophy className="w-8 h-8" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          Peringkat Lomba BSI & PKK
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Papan Skor Peserta Ibu-Ibu
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Peringkat dinilai berdasarkan ketepatan keputusan membantu Bu Nania, Bu Eva, dan Bu Frista (Total 9 Soal).
        </p>
      </div>

      {/* IN-UI CONFIRMATION: DELETE SINGLE USER */}
      {sessionToDelete && (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-4 sm:p-5 space-y-3 animate-in fade-in duration-200 shadow-md">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-600 text-white rounded-2xl shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-rose-950 text-base">
                Hapus Peserta: {sessionToDelete.participant.name}?
              </h4>
              <p className="text-xs sm:text-sm text-rose-900 mt-1 font-semibold leading-relaxed">
                Apakah Anda yakin ingin menghapus data peserta <strong>{sessionToDelete.participant.name}</strong> ({sessionToDelete.participant.rtRwVillage}) dari papan skor?
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setSessionToDelete(null)}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                if (onDeleteSession) {
                  onDeleteSession(sessionToDelete.id);
                }
                if (selectedSession?.id === sessionToDelete.id) {
                  setSelectedSession(null);
                }
                setSessionToDelete(null);
              }}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Ya, Hapus</span>
            </button>
          </div>
        </div>
      )}

      {/* IN-UI CONFIRMATION: RESET ALL SESSIONS */}
      {showClearConfirm && (
        <div className="bg-rose-50 border-2 border-rose-400 rounded-3xl p-4 sm:p-5 space-y-3 animate-in fade-in duration-200 shadow-md">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-600 text-white rounded-2xl shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-rose-950 text-base">
                Kosongkan Seluruh Papan Skor?
              </h4>
              <p className="text-xs sm:text-sm text-rose-900 mt-1 font-semibold leading-relaxed">
                Tindakan ini akan menghapus semua riwayat sesi peserta ({sessions.length} orang) untuk memulai acara lomba baru dari nol.
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowClearConfirm(false)}
              className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                onClearSessions();
                setShowClearConfirm(false);
                setSelectedSession(null);
              }}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Ya, Reset Papan Skor</span>
            </button>
          </div>
        </div>
      )}

      {/* Leaderboard List with LARGE READABLE FONTS */}
      <div className="space-y-3.5">
        {sortedSessions.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 text-center text-slate-600 space-y-3">
            <p className="text-base font-semibold">Belum ada peserta yang menyelesaikan simulasi.</p>
            <button
              onClick={onStartNewParticipant}
              className="px-6 py-3 bg-[#00827B] text-white rounded-2xl text-sm font-bold shadow-md hover:bg-[#00675B] cursor-pointer"
            >
              Mulai untuk Peserta Pertama
            </button>
          </div>
        ) : (
          sortedSessions.map((item, index) => {
            const isTop1 = index === 0 && item.scoreBreakdown.totalScore === highestScore;
            const isExpanded = selectedSession?.id === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-3xl border-2 transition-all overflow-hidden ${
                  isTop1
                    ? 'border-[#F99D1C] bg-gradient-to-r from-amber-50/70 via-white to-emerald-50/30 shadow-md ring-2 ring-amber-300/40'
                    : 'border-slate-300 bg-white shadow-xs'
                }`}
              >
                {/* Header row */}
                <div 
                  onClick={() => setSelectedSession(isExpanded ? null : item)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-base shrink-0 ${
                      index === 0
                        ? 'bg-[#F99D1C] text-slate-950 shadow-xs'
                        : index === 1
                          ? 'bg-slate-200 text-slate-800'
                          : index === 2
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-100 text-slate-700'
                    }`}>
                      #{index + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.participant.avatarEmoji || '🧕'}</span>
                        <h3 className="font-black text-slate-900 text-base sm:text-lg">
                          {item.participant.name}
                        </h3>
                        {isTop1 && (
                          <span className="text-[10px] font-black bg-[#F99D1C] text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                            <Star className="w-3 h-3 fill-current" />
                            <span>Pilih Bijak</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
                        {item.participant.rtRwVillage} • Pre: {item.preQuizScore} ➔ Post: {item.postQuizScore || 0}
                      </p>
                    </div>
                  </div>

                  {/* Total Score & Delete Action */}
                  <div className="flex items-center gap-2.5">
                    <div className="text-right shrink-0">
                      <span className="text-3xl sm:text-4xl font-black text-[#00675B] block leading-none">
                        {item.scoreBreakdown.totalScore}
                      </span>
                      <span className="text-[11px] text-slate-500 font-bold">Poin / 100</span>
                    </div>

                    {onDeleteSession && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSessionToDelete(item);
                        }}
                        className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Hapus peserta"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 border-t border-slate-100 space-y-3.5 text-xs sm:text-sm animate-in fade-in duration-200">
                    {/* 3 Character Wallets Status */}
                    {item.characterWallets && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200 space-y-0.5">
                          <span className="text-xs font-bold text-[#00675B] block">1. Dompet Bu Nania</span>
                          <span className="text-slate-900 font-extrabold text-sm block">
                            Sisa: {formatRupiah(item.characterWallets.nania?.remaining || 0)}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Terpakai: {formatRupiah(item.characterWallets.nania?.spent || 0)}
                          </span>
                        </div>

                        <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-200 space-y-0.5">
                          <span className="text-xs font-bold text-teal-900 block">2. Dompet Bu Eva</span>
                          <span className="text-slate-900 font-extrabold text-sm block">
                            Sisa: {formatRupiah(item.characterWallets.eva?.remaining || 0)}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Terpakai: {formatRupiah(item.characterWallets.eva?.spent || 0)}
                          </span>
                        </div>

                        <div className="bg-sky-50/70 p-3 rounded-2xl border border-sky-200 space-y-0.5">
                          <span className="text-xs font-bold text-sky-900 block">3. Dompet Bu Frista</span>
                          <span className="text-slate-900 font-extrabold text-sm block">
                            Sisa: {formatRupiah(item.characterWallets.frista?.remaining || 0)}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            Terpakai: {formatRupiah(item.characterWallets.frista?.spent || 0)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Pillars Mini Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center font-bold">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Kebutuhan</span>
                        <span className="text-slate-900">{item.scoreBreakdown.needFulfillment}/25</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Anggaran</span>
                        <span className="text-slate-900">{item.scoreBreakdown.budgetSuitability}/20</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Risiko</span>
                        <span className="text-slate-900">{item.scoreBreakdown.riskPreparedness}/15</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 block">Syariah</span>
                        <span className="text-slate-900">{item.scoreBreakdown.syariahPrinciples}/25</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-500 block">Keputusan</span>
                        <span className="text-slate-900">{item.scoreBreakdown.decisionQuality}/15</span>
                      </div>
                    </div>

                    {/* Feedback Callouts */}
                    <div className="space-y-2 pt-1 font-semibold text-xs sm:text-sm">
                      <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-950 flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Kekuatan: </strong>
                          <span>{item.scoreBreakdown.keyStrength}</span>
                        </div>
                      </div>

                      <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 text-teal-950 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Saran BSI: </strong>
                          <span>{item.scoreBreakdown.improvementTip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onStartNewParticipant}
          className="flex-1 py-4 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-black text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Mulai Simulasi Peserta Baru</span>
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="py-3 px-5 bg-white border-2 border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm rounded-2xl transition-colors cursor-pointer"
        >
          Kembali ke Beranda
        </button>

        {sortedSessions.length > 0 && (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="py-3 px-4 text-slate-400 hover:text-rose-600 text-xs font-semibold rounded-2xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Reset Data Papan Skor"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset Data</span>
          </button>
        )}
      </div>
    </div>
  );
};
