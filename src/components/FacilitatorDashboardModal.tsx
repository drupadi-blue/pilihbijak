import React, { useState } from 'react';
import { CompletedSession } from '../types/game';
import { formatRupiah } from '../utils/scoring';
import { 
  X, 
  GraduationCap, 
  Search, 
  Share2, 
  Printer, 
  Eye, 
  Trash2, 
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Wallet
} from 'lucide-react';

interface FacilitatorDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: CompletedSession[];
  onDeleteSession: (sessionId: string) => void;
  onResetAllSessions: () => void;
}

export const FacilitatorDashboardModal: React.FC<FacilitatorDashboardModalProps> = ({
  isOpen,
  onClose,
  sessions,
  onDeleteSession,
  onResetAllSessions
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectedSession, setInspectedSession] = useState<CompletedSession | null>(null);
  const [sessionToDelete, setSessionToDelete] = useState<CompletedSession | null>(null);
  const [showResetAllConfirm, setShowResetAllConfirm] = useState<boolean>(false);

  if (!isOpen) return null;

  // Aggregate stats
  const totalParticipants = sessions.length;
  const avgPre = totalParticipants > 0 
    ? Math.round(sessions.reduce((acc, s) => acc + s.preQuizScore, 0) / totalParticipants) 
    : 0;
  const avgPost = totalParticipants > 0 
    ? Math.round(sessions.reduce((acc, s) => acc + (s.postQuizScore || 0), 0) / totalParticipants) 
    : 0;
  const avgGain = avgPost - avgPre;
  const highestScore = totalParticipants > 0 
    ? Math.max(...sessions.map(s => s.scoreBreakdown.totalScore)) 
    : 0;

  const filtered = sessions.filter(s => 
    s.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.participant.rtRwVillage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyFacilitatorReport = () => {
    let text = `*REKAPITULASI FASILITATOR LOMBA LITERASI KEUANGAN BSI & PKK*\n\n`;
    text += `Studi Kasus 3 Karakter: Bu Nania, Bu Eva, dan Bu Frista (Total 9 Soal)\n`;
    text += `Total Peserta Ibu-Ibu: ${totalParticipants} Orang\n`;
    text += `Rata-rata Skor Pre-Test: ${avgPre}/100\n`;
    text += `Rata-rata Skor Post-Test: ${avgPost}/100\n`;
    text += `Rata-rata Peningkatan Wawasan: +${avgGain} Poin\n`;
    text += `Skor Tertinggi Kasus: ${highestScore}/100 Poin\n\n`;
    text += `*Daftar Peringkat Peserta:*\n`;
    sessions.slice(0, 15).forEach((s, i) => {
      text += `${i + 1}. ${s.participant.name} (${s.participant.rtRwVillage}) - Skor Kasus: ${s.scoreBreakdown.totalScore} Poin (Pre: ${s.preQuizScore} ➔ Post: ${s.postQuizScore})\n`;
    });
    text += `\n_“Bukan Sekadar Hemat, tetapi Tepat.”_\nDiselenggarakan oleh Bank Syariah Indonesia (BSI) & PKK`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border-2 border-emerald-300 my-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header in Deep BSI Teal */}
        <div className="bg-gradient-to-r from-[#005E54] via-[#00827B] to-[#00A39D] p-5 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F99D1C] rounded-2xl text-slate-950 font-black shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">Dashboard Fasilitator BSI</h3>
                <span className="text-[10px] font-extrabold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase">
                  Pantau & Kelola Peserta
                </span>
              </div>
              <p className="text-xs text-emerald-100 font-semibold">
                Monitoring Hasil & Manajemen Peserta Lomba PKK
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 text-center shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Total Peserta</span>
              <span className="text-2xl sm:text-3xl font-black text-[#00675B] mt-1 block">
                {totalParticipants}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Ibu Terdaftar</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 text-center shadow-xs">
              <span className="text-xs text-slate-500 font-bold block">Rata-rata Pre-Test</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-700 mt-1 block">
                {avgPre}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">10 Soal Awal</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 text-center shadow-xs">
              <span className="text-xs text-emerald-800 font-bold block">Rata-rata Post-Test</span>
              <span className="text-2xl sm:text-3xl font-black text-[#00827B] mt-1 block">
                {avgPost}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">+{avgGain} Poin Gain</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-emerald-400 text-center shadow-xs">
              <span className="text-xs text-emerald-950 font-bold block">Skor Kasus Tertinggi</span>
              <span className="text-2xl sm:text-3xl font-black text-[#00675B] mt-1 block">
                {highestScore}
              </span>
              <span className="text-[10px] text-emerald-700 font-extrabold">Ibu Pilih Bijak ⭐</span>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-2.5 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama ibu atau RT/RW..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white rounded-2xl border-2 border-slate-300 text-xs sm:text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#00A39D]"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={copyFacilitatorReport}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Kirim Rekap WA</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2.5 bg-white border-2 border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cetak</span>
              </button>
              {sessions.length > 0 && (
                <button
                  onClick={() => setShowResetAllConfirm(true)}
                  className="px-3 py-2.5 text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  title="Hapus semua peserta"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Semua</span>
                </button>
              )}
            </div>
          </div>

          {/* IN-MODAL CONFIRMATION DIALOG: DELETE SINGLE USER */}
          {sessionToDelete && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-4 sm:p-5 space-y-3 animate-in fade-in duration-200 shadow-md">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-600 text-white rounded-2xl shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-rose-950 text-base">
                    Konfirmasi Hapus Peserta: {sessionToDelete.participant.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-rose-900 mt-1 font-semibold leading-relaxed">
                    Apakah Bapak/Ibu Fasilitator yakin ingin menghapus peserta <strong>{sessionToDelete.participant.name}</strong> ({sessionToDelete.participant.rtRwVillage}) dari sistem laporan dan papan skor lomba?
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
                    onDeleteSession(sessionToDelete.id);
                    if (inspectedSession?.id === sessionToDelete.id) {
                      setInspectedSession(null);
                    }
                    setSessionToDelete(null);
                  }}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Ya, Hapus Data Peserta</span>
                </button>
              </div>
            </div>
          )}

          {/* IN-MODAL CONFIRMATION DIALOG: RESET ALL SESSIONS */}
          {showResetAllConfirm && (
            <div className="bg-rose-50 border-2 border-rose-400 rounded-3xl p-4 sm:p-5 space-y-3 animate-in fade-in duration-200 shadow-md">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-rose-600 text-white rounded-2xl shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-rose-950 text-base">
                    Konfirmasi Reset Seluruh Data Peserta
                  </h4>
                  <p className="text-xs sm:text-sm text-rose-900 mt-1 font-semibold leading-relaxed">
                    Tindakan ini akan mengosongkan seluruh riwayat peserta lomba ({sessions.length} orang) untuk memulai acara baru dari awal.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowResetAllConfirm(false)}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetAllSessions();
                    setShowResetAllConfirm(false);
                    setInspectedSession(null);
                  }}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ya, Kosongkan Semua Data</span>
                </button>
              </div>
            </div>
          )}

          {/* Participants Table with Individual DELETE USER BUTTON */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between">
              <span className="text-xs sm:text-sm font-extrabold text-[#00675B]">
                Daftar Peserta & Analisis Peningkatan Wawasan
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Menampilkan {filtered.length} peserta
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm font-semibold">
                  Tidak ada data peserta yang cocok.
                </div>
              ) : (
                filtered.map((item, idx) => (
                  <div 
                    key={item.id} 
                    className="p-3.5 sm:p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xl shrink-0">{item.participant.avatarEmoji || '🧕'}</span>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                          {item.participant.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">
                          {item.participant.rtRwVillage}
                          {item.characterWallets ? (
                            <span> • Nania: {formatRupiah(item.characterWallets.nania?.remaining || 0)}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {/* Pre to Post Gain */}
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-bold text-slate-700 block">
                          Pre: {item.preQuizScore} ➔ Post: {item.postQuizScore || 0}
                        </span>
                        <span className={`text-[11px] font-extrabold ${
                          (item.postQuizScore || 0) - item.preQuizScore >= 0 ? 'text-emerald-700' : 'text-slate-500'
                        }`}>
                          Gain: +{(item.postQuizScore || 0) - item.preQuizScore}
                        </span>
                      </div>

                      {/* Simulation Score Badge */}
                      <div className="text-right">
                        <span className="text-base sm:text-lg font-black text-[#00675B] block leading-tight">
                          {item.scoreBreakdown.totalScore}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold block">Poin Kasus</span>
                      </div>

                      {/* Detail Inspection Button */}
                      <button
                        type="button"
                        onClick={() => setInspectedSession(item)}
                        className="p-2 bg-slate-100 hover:bg-[#00827B] hover:text-white rounded-xl text-slate-600 transition-colors cursor-pointer"
                        title="Lihat Pilihan Kasus Ibu"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* DELETE INDIVIDUAL USER BUTTON (Opens safe in-modal confirm) */}
                      <button
                        type="button"
                        onClick={() => setSessionToDelete(item)}
                        className="p-2 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-xl text-rose-600 transition-colors cursor-pointer"
                        title={`Hapus peserta ${item.participant.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Inspected Session Detail Modal / Box */}
          {inspectedSession && (
            <div className="bg-emerald-50/90 border-2 border-[#00827B] rounded-3xl p-5 space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{inspectedSession.participant.avatarEmoji}</span>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">
                      Audit 9 Keputusan: {inspectedSession.participant.name}
                    </h4>
                    <p className="text-xs text-slate-600">
                      Skor 5 Pilar: {inspectedSession.scoreBreakdown.totalScore} Poin ({inspectedSession.scoreBreakdown.verdictTitle})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedSession(null)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
                >
                  Tutup Audit
                </button>
              </div>

              {/* Character Wallets Summary if available */}
              {inspectedSession.characterWallets && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold block">1. Bu Nania:</span>
                    <span className="text-slate-900 font-extrabold">
                      Sisa: {formatRupiah(inspectedSession.characterWallets.nania?.remaining || 0)}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold block">2. Bu Eva:</span>
                    <span className="text-slate-900 font-extrabold">
                      Sisa: {formatRupiah(inspectedSession.characterWallets.eva?.remaining || 0)}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold block">3. Bu Frista:</span>
                    <span className="text-slate-900 font-extrabold">
                      Sisa: {formatRupiah(inspectedSession.characterWallets.frista?.remaining || 0)}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs sm:text-sm max-h-64 overflow-y-auto pr-1">
                {inspectedSession.decisions.map((d, i) => (
                  <div key={i} className="bg-white p-3 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#00675B]">
                      <span>{d.questionTitle || `Soal ${i + 1}`}</span>
                      <span className="text-slate-500 font-semibold">{d.characterName}</span>
                    </div>
                    <p className="font-bold text-slate-900">
                      {d.selectedOption.title}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Kategori: </strong>{d.selectedOption.solutionCategory} • <strong>Biaya: </strong>{formatRupiah(d.selectedOption.cost)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00827B] hover:bg-[#00675B] text-white rounded-2xl text-sm font-extrabold transition-colors cursor-pointer"
          >
            Tutup Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
