import React, { useState, useEffect } from 'react';
import { 
  GameStage, 
  ParticipantInfo, 
  QuizResult, 
  DecisionRecord, 
  ScoreBreakdown, 
  CompletedSession
} from './types/game';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { HowToPlayView } from './components/HowToPlayView';
import { PreQuizView } from './components/PreQuizView';
import { ParticipantProfileView } from './components/ParticipantProfileView';
import { SimulationGameView } from './components/SimulationGameView';
import { DecisionReportView } from './components/DecisionReportView';
import { LeaderboardView } from './components/LeaderboardView';
import { DiscussionGuideView } from './components/DiscussionGuideView';
import { PostQuizView } from './components/PostQuizView';
import { GlossaryModal } from './components/GlossaryModal';
import { LoanComparisonModal } from './components/LoanComparisonModal';
import { FacilitatorDashboardModal } from './components/FacilitatorDashboardModal';
import { calculateScore } from './utils/scoring';
import { CHARACTER_CASES } from './data/scenarioData';

// Initial realistic demo sessions for individual participants with 3-character data
const INITIAL_DEMO_SESSIONS: CompletedSession[] = [
  {
    id: 'demo-ibu-1',
    timestamp: Date.now() - 3600000,
    participant: {
      name: 'Bu Siti Rahayu',
      rtRwVillage: 'RT 02 / RW 04',
      avatarEmoji: '🧕'
    },
    preQuizScore: 60,
    postQuizScore: 100,
    scoreBreakdown: {
      needFulfillment: 25,
      budgetSuitability: 20,
      riskPreparedness: 14,
      syariahPrinciples: 25,
      decisionQuality: 15,
      totalScore: 99,
      verdictTitle: 'Ibu Pilih Bijak Utama ⭐',
      verdictDescription: 'Luar biasa! Ibu berhasil membimbing ketiga keluarga (Bu Nania, Bu Eva, dan Bu Frista) memenuhi kebutuhan esensial dan selamat dari jeratan riba/pinjol.',
      keyStrength: 'Sangat cerdas memprioritaskan pangan, pendidikan anak, dan alat kerja, serta memilih alternatif syariah resmi yang aman.',
      improvementTip: 'Pertahankan prinsip bijak ini dan bagikan ilmu bermanfaat ini kepada keluarga serta tetangga sekitar.',
      isChampion: true
    },
    characterWallets: {
      nania: { initial: 1500000, spent: 700000, remaining: 1600000, monthly: 16000 },
      eva: { initial: 2000000, spent: 700000, remaining: 1700000, monthly: 0 },
      frista: { initial: 2500000, spent: 1900000, remaining: 1800000, monthly: 24000 }
    },
    decisions: [
      {
        characterId: 'bu-nania',
        characterName: 'Bu Nania (38 tahun)',
        questionNumber: 1,
        questionTitle: 'Masalah 1: Mengatasi Kulkas Bu Nania yang Tiba-tiba Mati',
        selectedOption: CHARACTER_CASES[0].questions[0].options[0]
      },
      {
        characterId: 'bu-nania',
        characterName: 'Bu Nania (38 tahun)',
        questionNumber: 2,
        questionTitle: 'Masalah 2: Prioritas Belanja Makanan Keluarga Bu Nania & Sekolah Rian',
        selectedOption: CHARACTER_CASES[0].questions[1].options[1]
      },
      {
        characterId: 'bu-nania',
        characterName: 'Bu Nania (38 tahun)',
        questionNumber: 3,
        questionTitle: 'Masalah 3: Mengelola Ketahanan Kas & Cadangan Modal Bu Nania',
        selectedOption: CHARACTER_CASES[0].questions[2].options[1]
      },
      {
        characterId: 'bu-eva',
        characterName: 'Bu Eva (34 tahun)',
        questionNumber: 4,
        questionTitle: 'Masalah 1: Mesin Jahit Bu Eva Rusak Dinamo Saat Ada Pesanan Seragam',
        selectedOption: CHARACTER_CASES[1].questions[0].options[1]
      },
      {
        characterId: 'bu-eva',
        characterName: 'Bu Eva (34 tahun)',
        questionNumber: 5,
        questionTitle: 'Masalah 2: Ajakan Arisan Get Online & Belanja Konsumtif',
        selectedOption: CHARACTER_CASES[1].questions[1].options[0]
      },
      {
        characterId: 'bu-eva',
        characterName: 'Bu Eva (34 tahun)',
        questionNumber: 6,
        questionTitle: 'Masalah 3: Kebutuhan Modal Kain & Arus Kas Usaha Jahit Bu Eva',
        selectedOption: CHARACTER_CASES[1].questions[2].options[0]
      },
      {
        characterId: 'bu-frista',
        characterName: 'Bu Frista (45 tahun)',
        questionNumber: 7,
        questionTitle: 'Masalah 1: Biaya Daftar Ulang & Seragam Praktik SMK Doni',
        selectedOption: CHARACTER_CASES[2].questions[0].options[0]
      },
      {
        characterId: 'bu-frista',
        characterName: 'Bu Frista (45 tahun)',
        questionNumber: 8,
        questionTitle: 'Masalah 2: Operasional Pupuk Tanaman vs Belanja Dapur Bu Frista',
        selectedOption: CHARACTER_CASES[2].questions[1].options[0]
      },
      {
        characterId: 'bu-frista',
        characterName: 'Bu Frista (45 tahun)',
        questionNumber: 9,
        questionTitle: 'Masalah 3: Ketahanan Kas Bu Frista Selama 3 Minggu Menunggu Panen',
        selectedOption: CHARACTER_CASES[2].questions[2].options[0]
      }
    ]
  },
  {
    id: 'demo-ibu-2',
    timestamp: Date.now() - 1800000,
    participant: {
      name: 'Bu Endang Kusuma',
      rtRwVillage: 'RT 04 / RW 05',
      avatarEmoji: '👵'
    },
    preQuizScore: 50,
    postQuizScore: 90,
    scoreBreakdown: {
      needFulfillment: 23,
      budgetSuitability: 19,
      riskPreparedness: 13,
      syariahPrinciples: 24,
      decisionQuality: 13,
      totalScore: 92,
      verdictTitle: 'Ibu Cermat & Bertanggung Jawab',
      verdictDescription: 'Sangat bagus! Mengambil langkah taktis servis dinamo jahit dan menerapkan sistem DP pesanan pelanggan tanpa terjerat rentenir.',
      keyStrength: 'Mampu menahan diri dari utang konsumtif dan menjaga ketenteraman ketiga keluarga.',
      improvementTip: 'Pertahankan penerapan uang muka kerja pada setiap pesanan usaha.',
      isChampion: false
    },
    characterWallets: {
      nania: { initial: 1500000, spent: 490000, remaining: 1310000, monthly: 0 },
      eva: { initial: 2000000, spent: 700000, remaining: 1700000, monthly: 0 },
      frista: { initial: 2500000, spent: 1900000, remaining: 1800000, monthly: 24000 }
    },
    decisions: [
      {
        characterId: 'bu-nania',
        characterName: 'Bu Nania (38 tahun)',
        questionNumber: 1,
        questionTitle: 'Masalah 1: Mengatasi Kulkas Bu Nania yang Tiba-tiba Mati',
        selectedOption: CHARACTER_CASES[0].questions[0].options[2]
      },
      {
        characterId: 'bu-nania',
        characterName: 'Bu Nania (38 tahun)',
        questionNumber: 2,
        questionTitle: 'Masalah 2: Prioritas Belanja Makanan Keluarga Bu Nania & Sekolah Rian',
        selectedOption: CHARACTER_CASES[0].questions[1].options[1]
      },
      {
        characterId: 'bu-nania',
        characterName: 'Bu Nania (38 tahun)',
        questionNumber: 3,
        questionTitle: 'Masalah 3: Mengelola Ketahanan Kas & Cadangan Modal Bu Nania',
        selectedOption: CHARACTER_CASES[0].questions[2].options[1]
      },
      {
        characterId: 'bu-eva',
        characterName: 'Bu Eva (34 tahun)',
        questionNumber: 4,
        questionTitle: 'Masalah 1: Mesin Jahit Bu Eva Rusak Dinamo Saat Ada Pesanan Seragam',
        selectedOption: CHARACTER_CASES[1].questions[0].options[1]
      },
      {
        characterId: 'bu-eva',
        characterName: 'Bu Eva (34 tahun)',
        questionNumber: 5,
        questionTitle: 'Masalah 2: Ajakan Arisan Get Online & Belanja Konsumtif',
        selectedOption: CHARACTER_CASES[1].questions[1].options[0]
      },
      {
        characterId: 'bu-eva',
        characterName: 'Bu Eva (34 tahun)',
        questionNumber: 6,
        questionTitle: 'Masalah 3: Kebutuhan Modal Kain & Arus Kas Usaha Jahit Bu Eva',
        selectedOption: CHARACTER_CASES[1].questions[2].options[0]
      },
      {
        characterId: 'bu-frista',
        characterName: 'Bu Frista (45 tahun)',
        questionNumber: 7,
        questionTitle: 'Masalah 1: Biaya Daftar Ulang & Seragam Praktik SMK Doni',
        selectedOption: CHARACTER_CASES[2].questions[0].options[0]
      },
      {
        characterId: 'bu-frista',
        characterName: 'Bu Frista (45 tahun)',
        questionNumber: 8,
        questionTitle: 'Masalah 2: Operasional Pupuk Tanaman vs Belanja Dapur Bu Frista',
        selectedOption: CHARACTER_CASES[2].questions[1].options[0]
      },
      {
        characterId: 'bu-frista',
        characterName: 'Bu Frista (45 tahun)',
        questionNumber: 9,
        questionTitle: 'Masalah 3: Ketahanan Kas Bu Frista Selama 3 Minggu Menunggu Panen',
        selectedOption: CHARACTER_CASES[2].questions[2].options[0]
      }
    ]
  }
];

export default function App() {
  const [currentStage, setCurrentStage] = useState<GameStage>('home');
  const [activeParticipant, setActiveParticipant] = useState<ParticipantInfo | null>(null);
  const [preQuizResult, setPreQuizResult] = useState<QuizResult | null>(null);
  const [postQuizResult, setPostQuizResult] = useState<QuizResult | null>(null);
  const [currentDecisions, setCurrentDecisions] = useState<DecisionRecord[]>([]);
  const [currentScoreBreakdown, setCurrentScoreBreakdown] = useState<ScoreBreakdown | null>(null);

  const [currentCharacterWallets, setCurrentCharacterWallets] = useState<{
    nania: { initial: number; spent: number; remaining: number; monthly: number };
    eva: { initial: number; spent: number; remaining: number; monthly: number };
    frista: { initial: number; spent: number; remaining: number; monthly: number };
  }>({
    nania: { initial: 1500000, spent: 0, remaining: 1500000, monthly: 0 },
    eva: { initial: 2000000, spent: 0, remaining: 2000000, monthly: 0 },
    frista: { initial: 2500000, spent: 0, remaining: 2500000, monthly: 0 }
  });

  // Modals
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isLoanCalcOpen, setIsLoanCalcOpen] = useState<boolean>(false);
  const [isFacilitatorModalOpen, setIsFacilitatorModalOpen] = useState<boolean>(false);

  // Storage
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>(() => {
    try {
      const stored = localStorage.getItem('bsi_pilih_bijak_sessions');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_DEMO_SESSIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bsi_pilih_bijak_sessions', JSON.stringify(completedSessions));
    } catch (e) {}
  }, [completedSessions]);

  const handleNavigate = (stage: GameStage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveParticipant = (info: ParticipantInfo) => {
    setActiveParticipant(info);
  };

  const handleCompletePreQuiz = (result: QuizResult) => {
    setPreQuizResult(result);
  };

  // Called when participant completes all 9 questions across Bu Nania, Bu Eva, and Bu Frista
  const handleFinishSimulation = (decisions: DecisionRecord[]) => {
    setCurrentDecisions(decisions);

    // Compute wallet for Bu Nania (questions 1, 2, 3)
    let naniaSpent = 0;
    let naniaAdditional = 0;
    let naniaMonthly = 0;

    // Compute wallet for Bu Eva (questions 4, 5, 6)
    let evaSpent = 0;
    let evaAdditional = 0;
    let evaMonthly = 0;

    // Compute wallet for Bu Frista (questions 7, 8, 9)
    let fristaSpent = 0;
    let fristaAdditional = 0;
    let fristaMonthly = 0;

    decisions.forEach((d, idx) => {
      const opt = d.selectedOption;
      if (idx < 3) {
        naniaSpent += opt.cost;
        if (opt.additionalFund) naniaAdditional += opt.additionalFund;
        if (opt.monthlyLiability) naniaMonthly += opt.monthlyLiability;
      } else if (idx < 6) {
        evaSpent += opt.cost;
        if (opt.additionalFund) evaAdditional += opt.additionalFund;
        if (opt.monthlyLiability) evaMonthly += opt.monthlyLiability;
      } else {
        fristaSpent += opt.cost;
        if (opt.additionalFund) fristaAdditional += opt.additionalFund;
        if (opt.monthlyLiability) fristaMonthly += opt.monthlyLiability;
      }
    });

    const wallets = {
      nania: {
        initial: 1500000,
        spent: naniaSpent,
        remaining: 1500000 + naniaAdditional - naniaSpent,
        monthly: naniaMonthly
      },
      eva: {
        initial: 2000000,
        spent: evaSpent,
        remaining: 2000000 + evaAdditional - evaSpent,
        monthly: evaMonthly
      },
      frista: {
        initial: 2500000,
        spent: fristaSpent,
        remaining: 2500000 + fristaAdditional - fristaSpent,
        monthly: fristaMonthly
      }
    };

    setCurrentCharacterWallets(wallets);

    const breakdown = calculateScore(decisions);
    setCurrentScoreBreakdown(breakdown);

    // Guide participant to Post-Test next
    handleNavigate('post_quiz');
  };

  const handleCompletePostQuiz = (result: QuizResult) => {
    setPostQuizResult(result);

    const participantInfo = activeParticipant || {
      name: 'Ibu Peserta PKK',
      rtRwVillage: 'PKK RW 04',
      avatarEmoji: '🧕'
    };

    const breakdown = currentScoreBreakdown || calculateScore(currentDecisions);

    const newSession: CompletedSession = {
      id: 'session-' + Date.now(),
      timestamp: Date.now(),
      participant: participantInfo,
      preQuizScore: preQuizResult ? preQuizResult.score : 50,
      postQuizScore: result.score,
      scoreBreakdown: breakdown,
      characterWallets: currentCharacterWallets,
      decisions: currentDecisions
    };

    setCompletedSessions((prev) => {
      const updated = [newSession, ...prev];
      try {
        localStorage.setItem('bsi_pilih_bijak_sessions', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleStartNewParticipant = () => {
    setActiveParticipant(null);
    setCurrentDecisions([]);
    setCurrentScoreBreakdown(null);
    setPreQuizResult(null);
    setPostQuizResult(null);
    setCurrentCharacterWallets({
      nania: { initial: 1500000, spent: 0, remaining: 1500000, monthly: 0 },
      eva: { initial: 2000000, spent: 0, remaining: 2000000, monthly: 0 },
      frista: { initial: 2500000, spent: 0, remaining: 2500000, monthly: 0 }
    });
    handleNavigate('participant_profile');
  };

  const handleResetGame = () => {
    handleStartNewParticipant();
  };

  // Facilitator delete single user session (Immediately updates state & localStorage)
  const handleDeleteSession = (sessionId: string) => {
    setCompletedSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId);
      try {
        localStorage.setItem('bsi_pilih_bijak_sessions', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Facilitator reset all sessions (Immediately updates state & localStorage)
  const handleClearSessions = () => {
    setCompletedSessions([]);
    try {
      localStorage.setItem('bsi_pilih_bijak_sessions', JSON.stringify([]));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-800">
      {/* Top Navbar with Facilitator button at the absolute far-right */}
      <Navbar
        currentStage={currentStage}
        onNavigate={handleNavigate}
        participant={activeParticipant}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenFacilitatorDashboard={() => setIsFacilitatorModalOpen(true)}
        onResetGame={handleResetGame}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 sm:py-6">
        {currentStage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenLoanCalc={() => setIsLoanCalcOpen(true)}
            onOpenFacilitatorDashboard={() => setIsFacilitatorModalOpen(true)}
            hasPreQuiz={!!preQuizResult}
            participant={activeParticipant}
          />
        )}

        {currentStage === 'how_to_play' && (
          <HowToPlayView
            onNavigate={handleNavigate}
            hasPreQuiz={!!preQuizResult}
          />
        )}

        {currentStage === 'participant_profile' && (
          <ParticipantProfileView
            currentParticipant={activeParticipant}
            existingParticipantNames={completedSessions.map(s => s.participant.name)}
            onSaveParticipant={handleSaveParticipant}
            onNavigate={handleNavigate}
            hasCompletedPreQuiz={!!preQuizResult}
          />
        )}

        {currentStage === 'pre_quiz' && (
          <PreQuizView
            onCompleteQuiz={handleCompletePreQuiz}
            onNavigate={handleNavigate}
            savedResult={preQuizResult}
            hasParticipant={!!activeParticipant}
          />
        )}

        {currentStage === 'simulation' && (
          <SimulationGameView
            participant={activeParticipant || { name: 'Ibu Peserta PKK', rtRwVillage: 'PKK RW 04', avatarEmoji: '🧕' }}
            onFinishSimulation={handleFinishSimulation}
            onNavigate={handleNavigate}
            onOpenLoanCalc={() => setIsLoanCalcOpen(true)}
          />
        )}

        {currentStage === 'post_quiz' && (
          <PostQuizView
            participant={activeParticipant}
            preQuizResult={preQuizResult}
            postQuizResult={postQuizResult}
            onCompletePostQuiz={handleCompletePostQuiz}
            onNavigate={handleNavigate}
          />
        )}

        {currentStage === 'report' && currentScoreBreakdown && (
          <DecisionReportView
            participant={activeParticipant || { name: 'Ibu Peserta PKK', rtRwVillage: 'PKK RW 04', avatarEmoji: '🧕' }}
            decisions={currentDecisions}
            scoreBreakdown={currentScoreBreakdown}
            characterWallets={currentCharacterWallets}
            preQuizScore={preQuizResult ? preQuizResult.score : 50}
            postQuizScore={postQuizResult ? postQuizResult.score : 100}
            onNavigate={handleNavigate}
          />
        )}

        {currentStage === 'leaderboard' && (
          <LeaderboardView
            sessions={completedSessions}
            onStartNewParticipant={handleStartNewParticipant}
            onClearSessions={handleClearSessions}
            onNavigate={handleNavigate}
            onDeleteSession={handleDeleteSession}
          />
        )}

        {currentStage === 'discussion' && (
          <DiscussionGuideView
            participant={activeParticipant}
            decisions={currentDecisions}
            scoreBreakdown={currentScoreBreakdown}
            onNavigate={handleNavigate}
            onOpenLoanCalc={() => setIsLoanCalcOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      <LoanComparisonModal
        isOpen={isLoanCalcOpen}
        onClose={() => setIsLoanCalcOpen(false)}
      />

      <FacilitatorDashboardModal
        isOpen={isFacilitatorModalOpen}
        onClose={() => setIsFacilitatorModalOpen(false)}
        sessions={completedSessions}
        onDeleteSession={handleDeleteSession}
        onResetAllSessions={handleClearSessions}
      />

      {/* Footer in Deep BSI Tone */}
      <footer className="bg-[#003832] text-emerald-100 py-6 px-4 border-t border-emerald-900 text-center text-xs mt-auto">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-white font-black text-sm">
            <span>PILIH BIJAK!</span>
            <span>•</span>
            <span className="text-[#F99D1C]">“Bukan Sekadar Hemat, tetapi Tepat.”</span>
          </div>
          <p className="text-xs text-emerald-200 leading-relaxed font-medium">
            Program Literasi Keuangan Keluarga Berbasis Nilai Syariah • Bank Syariah Indonesia (BSI) & PKK.
          </p>
          <p className="text-[11px] text-emerald-300/80">
            Terinspirasi dari solusi nyata Bank Syariah Indonesia & Pegadaian Syariah resmi terdaftar dan diawasi OJK.
          </p>
        </div>
      </footer>
    </div>
  );
}
