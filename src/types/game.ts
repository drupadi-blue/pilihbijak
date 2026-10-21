/**
 * Types and interfaces for PILIH BIJAK!
 * Simulasi Keputusan Keuangan Keluarga Berbasis Nilai Syariah
 * Diselenggarakan bersama Bank Syariah Indonesia (BSI) & PKK
 */

export type GameStage = 
  | 'home' 
  | 'how_to_play' 
  | 'pre_quiz' 
  | 'participant_profile' 
  | 'simulation' 
  | 'post_quiz' 
  | 'report' 
  | 'leaderboard' 
  | 'discussion';

export interface QuizQuestion {
  id: number;
  question: string;
  context?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number; // 0 - 100
  answers: Record<number, string>;
}

export interface DecisionOption {
  id: string;
  title: string;
  neutralActionText: string;
  cost: number;
  monthlyLiability?: number;
  liabilityMonths?: number;
  additionalFund?: number;
  
  // Detail untuk laporan akhir
  solutionCategory: string;
  shortConsequence: string;
  detailedConsequence: string;
  riskEvaluation: string;
  syariahReview: string;
  verdictBadge: 'Pilihan Tepat & Bijak' | 'Perlu Waspada' | 'Berisiko Tinggi' | 'Solusi Sementara Tepat';
  verdictBadgeColor: string;
  
  // Bobot nilai
  syariahScore: number; // 0 - 25
  budgetScore: number; // 0 - 20
  riskScore: number; // 0 - 15
  needScore: number; // 0 - 25
}

export interface CharacterCase {
  id: string;
  caseNumber: number;
  characterName: string; // "Bu Nania", "Bu Eva", "Bu Frista"
  characterBio: string;
  familyMembers: string;
  initialCash: number;
  initialCashFormatted: string;
  avatarIcon: string;
  urgencySummary: string;
  questions: CaseQuestion[];
}

export interface CaseQuestion {
  questionNumber: number; // 1 to 9 global index
  stepNumber?: number;
  localQuestionNumber: number; // 1 to 3 within the character
  title: string;
  subtitle: string;
  dilemma: string;
  options: DecisionOption[];
}

export interface ParticipantInfo {
  name: string; // Nama Ibu (wajib unik)
  rtRwVillage: string; // RT / RW / Dusun
  avatarEmoji: string;
}

export interface DecisionRecord {
  characterId: string;
  characterName: string;
  questionNumber: number;
  questionTitle: string;
  selectedOption: DecisionOption;
}

export interface ScoreBreakdown {
  needFulfillment: number; // max 25
  budgetSuitability: number; // max 20
  riskPreparedness: number; // max 15
  syariahPrinciples: number; // max 25
  decisionQuality: number; // max 15
  totalScore: number; // max 100
  verdictTitle: string;
  verdictDescription: string;
  keyStrength: string;
  improvementTip: string;
  isChampion: boolean;
}

export interface CompletedSession {
  id: string;
  timestamp: number;
  participant: ParticipantInfo;
  preQuizScore: number;
  postQuizScore: number;
  scoreBreakdown: ScoreBreakdown;
  characterWallets: {
    nania: { initial: number; spent: number; remaining: number; monthly: number };
    eva: { initial: number; spent: number; remaining: number; monthly: number };
    frista: { initial: number; spent: number; remaining: number; monthly: number };
  };
  decisions: DecisionRecord[];
}
