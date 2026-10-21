import { DecisionRecord, ScoreBreakdown } from '../types/game';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateScore(decisions: DecisionRecord[]): ScoreBreakdown {
  if (decisions.length === 0) {
    return {
      needFulfillment: 0,
      budgetSuitability: 0,
      riskPreparedness: 0,
      syariahPrinciples: 0,
      decisionQuality: 0,
      totalScore: 0,
      verdictTitle: 'Belum Selesai',
      verdictDescription: 'Silakan selesaikan seluruh 9 soal studi kasus 3 karakter keluarga.',
      keyStrength: '-',
      improvementTip: '-',
      isChampion: false
    };
  }

  // Across the 9 questions (or however many completed)
  const totalDecisions = decisions.length;
  
  let totalNeed = 0;
  let totalBudget = 0;
  let totalRisk = 0;
  let totalSyariah = 0;
  let dangerousDebtCount = 0;

  decisions.forEach((d) => {
    const opt = d.selectedOption;
    totalNeed += opt.needScore;
    totalBudget += opt.budgetScore;
    totalRisk += opt.riskScore;
    totalSyariah += opt.syariahScore;
    if (opt.verdictBadge === 'Berisiko Tinggi') {
      dangerousDebtCount += 1;
    }
  });

  // Scale to the 5 categories (Total 100)
  // Max possible per decision: Need 25, Budget 20, Risk 15, Syariah 25
  const avgNeed = totalNeed / totalDecisions;
  const avgBudget = totalBudget / totalDecisions;
  const avgRisk = totalRisk / totalDecisions;
  const avgSyariah = totalSyariah / totalDecisions;

  const needFulfillment = Math.min(25, Math.max(5, Math.round(avgNeed)));
  const budgetSuitability = Math.min(20, Math.max(4, Math.round(avgBudget)));
  const riskPreparedness = Math.min(15, Math.max(3, Math.round(avgRisk)));
  const syariahPrinciples = Math.min(25, Math.max(0, Math.round(avgSyariah)));

  // 5. Decision Quality (max 15)
  let decisionQuality = 15 - (dangerousDebtCount * 4);
  decisionQuality = Math.min(15, Math.max(2, decisionQuality));

  const totalScore = needFulfillment + budgetSuitability + riskPreparedness + syariahPrinciples + decisionQuality;

  let keyStrength = 'Ibu memiliki kepekaan tinggi dalam membimbing Bu Nania, Bu Eva, dan Bu Frista menjaga amanah rezeki keluarga.';
  let improvementTip = 'Perhatikan selalu rincian biaya tak terduga dan hindari tergiur promo sesaat.';
  let verdictTitle = 'Konsultan Keuangan Keluarga Berkah BSI';
  let verdictDescription = 'Keputusan Ibu mencerminkan kecermatan seorang ibu rumah tangga dalam menjaga amanah rezeki ketiga keluarga.';

  if (totalScore >= 88) {
    verdictTitle = 'Ibu Pilih Bijak Utama ⭐';
    verdictDescription = 'Luar biasa! Ibu berhasil membimbing ketiga keluarga (Bu Nania, Bu Eva, dan Bu Frista) memenuhi kebutuhan esensial dan selamat dari jeratan riba/pinjol.';
    keyStrength = 'Sangat cerdas memprioritaskan pangan, pendidikan anak, dan alat kerja, serta memilih alternatif syariah resmi yang aman.';
    improvementTip = 'Pertahankan prinsip bijak ini dan bagikan ilmu bermanfaat ini kepada keluarga serta tetangga sekitar.';
  } else if (totalScore >= 75) {
    verdictTitle = 'Ibu Cermat & Bertanggung Jawab';
    verdictDescription = 'Bagus sekali! Ibu telah mengutamakan kebutuhan esensial ketiga keluarga dan berhasil meminimalkan risiko utang berbahaya.';
    keyStrength = 'Kebutuhan pokok ketiga keluarga terlindungi dengan baik tanpa membebani keuangan masa depan.';
    improvementTip = 'Bisa ditingkatkan dengan selalu memeriksa opsi perbaikan barang terlebih dahulu sebelum memikirkan cicilan baru.';
  } else if (totalScore >= 60) {
    verdictTitle = 'Ibu Pembelajar Bijak';
    verdictDescription = 'Keputusan sudah cukup baik, namun masih ada potensi beban cicilan atau pengeluaran ekstra pada beberapa karakter keluarga.';
    keyStrength = 'Ibu berani mengambil keputusan cepat di saat kondisi mendesak.';
    improvementTip = 'Waspadai tawaran cicilan panjang atau promo arisan online yang memuat barang-barang kurang dibutuhkan.';
  } else {
    verdictTitle = 'Perlu Pendampingan Literasi';
    verdictDescription = 'Beberapa keputusan untuk ketiga keluarga membawa beban cicilan bulanan yang berat atau risiko bunga harian pinjaman.';
    keyStrength = 'Ibu bertekad kuat menyelesaikan masalah keluarga.';
    improvementTip = 'Tolak pinjaman berbunga harian tanpa izin OJK dan utamakan pembiayaan syariah seperti Pegadaian Syariah atau Bank Syariah.';
  }

  return {
    needFulfillment,
    budgetSuitability,
    riskPreparedness,
    syariahPrinciples,
    decisionQuality,
    totalScore,
    verdictTitle,
    verdictDescription,
    keyStrength,
    improvementTip,
    isChampion: totalScore >= 88
  };
}
