import React from 'react';
import { GameStage, ParticipantInfo } from '../types/game';
import { BrandLogo } from './BrandLogo';
import { Trophy, BookOpen, RotateCcw, User, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentStage: GameStage;
  onNavigate: (stage: GameStage) => void;
  participant: ParticipantInfo | null;
  onOpenGlossary: () => void;
  onOpenFacilitatorDashboard: () => void;
  onResetGame: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  onNavigate,
  participant,
  onOpenGlossary,
  onOpenFacilitatorDashboard,
  onResetGame
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#005E54] via-[#00827B] to-[#00A39D] text-white shadow-md border-b border-emerald-700/60 w-full">
      <div className="max-w-2xl mx-auto px-2 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-1 sm:gap-2">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer select-none transition-transform active:scale-95 shrink-0"
        >
          <BrandLogo size="sm" showText={true} />
        </div>

        {/* Center/Right tools */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Active participant badge if registered */}
          {participant ? (
            <div 
              onClick={() => onNavigate('participant_profile')}
              title="Profil Peserta"
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 transition-colors px-2 py-1.5 sm:px-2.5 rounded-full cursor-pointer text-xs font-bold border border-white/30 text-white max-w-[80px] sm:max-w-xs truncate"
            >
              <span className="text-xs sm:text-sm">{participant.avatarEmoji || '🧕'}</span>
              <span className="truncate">{participant.name}</span>
            </div>
          ) : (
            <button
              onClick={() => onNavigate('participant_profile')}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2 sm:px-2.5 py-1.5 rounded-full text-xs font-black text-white border border-white/40 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Daftar</span>
            </button>
          )}

          {/* Kamus Istilah */}
          <button
            onClick={onOpenGlossary}
            title="Kamus Istilah Keuangan"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs flex items-center gap-1 border border-white/25 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">Kamus</span>
          </button>

          {/* Papan Peringkat */}
          <button
            onClick={() => onNavigate('leaderboard')}
            title="Papan Skor Peserta"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1 border border-white/25 transition-colors cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-emerald-200" />
            <span className="hidden sm:inline">Skor</span>
          </button>

          {currentStage !== 'home' && (
            <button
              onClick={onResetGame}
              title="Mulai Ulang Sesi"
              className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* FITUR FASILITATOR DI PALING POJOK KANAN ATAS TOOLBAR WEBSITE */}
          <button
            onClick={onOpenFacilitatorDashboard}
            title="Dashboard Pantau & Kelola Peserta"
            className="px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#F99D1C] hover:bg-[#e89018] text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1 shadow-md transition-colors cursor-pointer border border-amber-400 shrink-0"
          >
            <GraduationCap className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
            <span>Fasilitator</span>
          </button>
        </div>
      </div>
    </header>
  );
};
