import React, { useState } from 'react';
import { GameStage, ParticipantInfo } from '../types/game';
import { ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface ParticipantProfileViewProps {
  currentParticipant: ParticipantInfo | null;
  existingParticipantNames: string[];
  onSaveParticipant: (info: ParticipantInfo) => void;
  onNavigate: (stage: GameStage) => void;
  hasCompletedPreQuiz: boolean;
}

const PRESET_AVATARS = ['🧕', '👵', '👩', '🌸', '🌹', '🌺', '✨'];

export const ParticipantProfileView: React.FC<ParticipantProfileViewProps> = ({
  currentParticipant,
  existingParticipantNames,
  onSaveParticipant,
  onNavigate,
  hasCompletedPreQuiz
}) => {
  const [name, setName] = useState<string>(currentParticipant?.name || '');
  const [rtRwVillage, setRtRwVillage] = useState<string>(currentParticipant?.rtRwVillage || '');
  const [selectedAvatar, setSelectedAvatar] = useState<string>(
    currentParticipant?.avatarEmoji || '🧕'
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setErrorMessage('Silakan isi nama panggilan Ibu terlebih dahulu.');
      return;
    }

    // Check if name is already registered by another participant (case-insensitive)
    const isDuplicate = existingParticipantNames.some(
      (existing) => 
        existing.toLowerCase() === trimmedName.toLowerCase() &&
        existing.toLowerCase() !== currentParticipant?.name?.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage(
        `Nama panggilan "${trimmedName}" sudah terdaftar oleh peserta lain. Silakan tambahkan inisial atau tanda khusus (contoh: "${trimmedName} A" atau "${trimmedName} RT 02") agar nama Ibu unik di papan skor lomba.`
      );
      return;
    }

    onSaveParticipant({
      name: trimmedName,
      rtRwVillage: rtRwVillage.trim() || 'PKK RW 04',
      avatarEmoji: selectedAvatar
    });

    // Flow: Pre-test first (10 questions), then 3-character case simulation
    if (!hasCompletedPreQuiz) {
      onNavigate('pre_quiz');
    } else {
      onNavigate('simulation');
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Title Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-sm text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-3xl border border-emerald-200">
          <span>{selectedAvatar}</span>
        </div>

        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          Langkah Awal: Pendaftaran Peserta
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          Selamat Datang di PILIH BIJAK!
        </h2>
        
        <p className="text-sm sm:text-base text-slate-700 max-w-md mx-auto leading-relaxed font-medium">
          Silakan isi nama panggilan Ibu. Nama peserta tidak boleh sama dengan ibu lain agar peringkat dan sertifikat tidak tertukar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error Alert if duplicate name */}
        {errorMessage && (
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-start gap-3 text-rose-950 text-sm font-semibold animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* Input Nama Ibu (Wajib Unik) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-xs space-y-3">
          <label className="text-sm sm:text-base font-black text-slate-900 block">
            Nama Panggilan Ibu (Wajib Unik): <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Contoh: Bu Rahayu A / Bu Siti Melati"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            className="w-full px-4 py-3.5 bg-slate-50 rounded-2xl border-2 border-slate-300 text-base sm:text-lg font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#00A39D] focus:border-[#00A39D] focus:bg-white transition-all"
            maxLength={35}
          />
          <p className="text-xs text-slate-500 font-medium">
            *Tips: Jika nama sudah terpakai, tambahkan inisial huruf di belakangnya.
          </p>

          <label className="text-sm font-bold text-slate-700 block pt-2">
            Pilih Lambang / Ikon Profil:
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {PRESET_AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedAvatar(emoji)}
                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center border-2 transition-transform active:scale-95 cursor-pointer ${
                  selectedAvatar === emoji
                    ? 'border-[#00827B] bg-emerald-50 scale-105 shadow-xs ring-2 ring-emerald-300'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Keterangan RT / RW / Dusun (Boleh Sama) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200 shadow-xs space-y-2">
          <label className="text-sm sm:text-base font-bold text-slate-900 block">
            Keterangan RT / RW / Dusun:
          </label>
          <input
            type="text"
            placeholder="Contoh: RT 02 / RW 04 (Boleh sama dengan peserta lain)"
            value={rtRwVillage}
            onChange={(e) => setRtRwVillage(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 rounded-2xl border-2 border-slate-300 text-sm sm:text-base font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#00A39D]"
          />
          <p className="text-xs text-slate-500 leading-relaxed font-medium pt-1">
            *Keterangan RT/RW boleh sama dengan ibu-ibu tetangga lainnya.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>{hasCompletedPreQuiz ? 'Pilih Kasus & Mulai Simulasi' : 'Lanjut ke Kuis Awal (Pre-Test 10 Soal)'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
