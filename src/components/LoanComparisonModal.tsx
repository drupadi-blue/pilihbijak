import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, Calculator, Info } from 'lucide-react';
import { formatRupiah } from '../utils/scoring';

interface LoanComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoanComparisonModal: React.FC<LoanComparisonModalProps> = ({ isOpen, onClose }) => {
  const [borrowAmount, setBorrowAmount] = useState<number>(1000000);
  const [durationDays, setDurationDays] = useState<number>(30);

  if (!isOpen) return null;

  // Real Indonesian calculations:
  // 1. Pinjol Bunga Harian 0.4% per hari + Potongan Admin Awal 15%
  const pinjolAdminFee = borrowAmount * 0.15;
  const pinjolCashReceived = borrowAmount - pinjolAdminFee;
  const pinjolDailyInterest = borrowAmount * 0.004; // 0.4% per hari
  const pinjolTotalInterest = pinjolDailyInterest * durationDays;
  const pinjolTotalReturn = borrowAmount + pinjolTotalInterest;
  const pinjolRealEffectiveRate = ((pinjolTotalReturn - pinjolCashReceived) / pinjolCashReceived) * 100;

  // 2. Pegadaian Syariah (Rahn) - Barang jaminan emas ditaksir aman
  // Tarif resmi biaya pemeliharaan/mu'nah jasa titip per 15 hari ~0.75% s/d 0.8%
  const rahnAdminFee = 15000;
  const rahnCashReceived = borrowAmount - rahnAdminFee;
  const munahPer15Days = borrowAmount * 0.0075;
  const rahnPeriods = Math.ceil(durationDays / 15);
  const rahnTotalMunah = munahPer15Days * rahnPeriods;
  const rahnTotalReturn = borrowAmount + rahnTotalMunah;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border-2 border-emerald-200 my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header in BSI Green */}
        <div className="bg-gradient-to-r from-[#005E54] via-[#00827B] to-[#00A39D] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <Calculator className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black">Kalkulator Simulasi Keuangan</h3>
              <p className="text-xs text-emerald-100 font-semibold">Bandingkan Pinjol Bunga Harian vs Pegadaian Syariah</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content with LARGE READABLE FONTS */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm text-slate-900 font-medium">
            <Info className="w-5 h-5 text-[#00675B] shrink-0 mt-0.5" />
            <p>
              Ibu-ibu sering terkecoh: <strong>"Bunga hanya 0,4% per hari kok, murah kan?"</strong> Mari kita hitung uang aslinya yang keluar dari dompet!
            </p>
          </div>

          {/* Sliders */}
          <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-slate-800 mb-2">
                <span>Rencana Pinjaman Uang:</span>
                <span className="text-[#00675B] font-black text-lg">{formatRupiah(borrowAmount)}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="5000000"
                step="250000"
                value={borrowAmount}
                onChange={(e) => setBorrowAmount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#00827B]"
              />
              <div className="flex justify-between text-xs text-slate-500 font-bold mt-1.5">
                <span>Rp500.000</span>
                <span>Rp2.500.000</span>
                <span>Rp5.000.000</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm sm:text-base font-bold text-slate-800 mb-2">
                <span>Jangka Waktu Pengembalian:</span>
                <span className="text-[#00675B] font-black text-lg">{durationDays} Hari</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 60, 90].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setDurationDays(days)}
                    className={`py-2.5 px-2 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                      durationDays === days
                        ? 'bg-[#00827B] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {days} Hari
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Pinjol */}
            <div className="border-2 border-rose-300 bg-rose-50/60 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h4 className="font-black text-rose-950 text-sm sm:text-base">Pinjol / Bunga Harian</h4>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-semibold mb-3">
                  <div className="flex justify-between">
                    <span>Uang Diterima Bersih:</span>
                    <span className="text-slate-900 font-bold">{formatRupiah(pinjolCashReceived)}</span>
                  </div>
                  <div className="flex justify-between text-rose-800 font-bold">
                    <span>Bunga {durationDays} Hari:</span>
                    <span>+{formatRupiah(pinjolTotalInterest)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Potongan Admin Awal:</span>
                    <span>-{formatRupiah(pinjolAdminFee)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-rose-200 text-right">
                <span className="text-xs text-slate-500 block font-semibold">Total Wajib Dikembalikan:</span>
                <span className="text-lg sm:text-xl font-black text-rose-700">
                  {formatRupiah(pinjolTotalReturn)}
                </span>
                <span className="text-xs text-rose-800 font-extrabold block mt-0.5">
                  Beban Tambahan: ~{pinjolRealEffectiveRate.toFixed(1)}% !
                </span>
              </div>
            </div>

            {/* Pegadaian Syariah (Rahn) */}
            <div className="border-2 border-emerald-400 bg-emerald-50/70 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#00827B]" />
                  <h4 className="font-black text-emerald-950 text-sm sm:text-base">Pegadaian Syariah (Rahn)</h4>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 font-semibold mb-3">
                  <div className="flex justify-between">
                    <span>Uang Diterima Bersih:</span>
                    <span className="text-slate-900 font-bold">{formatRupiah(rahnCashReceived)}</span>
                  </div>
                  <div className="flex justify-between text-[#00675B] font-bold">
                    <span>Biaya Titip Mu'nah:</span>
                    <span>+{formatRupiah(rahnTotalMunah)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Biaya Admin Resmi:</span>
                    <span>{formatRupiah(rahnAdminFee)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-emerald-200 text-right">
                <span className="text-xs text-slate-500 block font-semibold">Total Tebus Emas:</span>
                <span className="text-lg sm:text-xl font-black text-[#00675B]">
                  {formatRupiah(rahnTotalReturn)}
                </span>
                <span className="text-xs text-emerald-800 font-extrabold block mt-0.5">
                  Hemat Rp{formatRupiah(pinjolTotalReturn - rahnTotalReturn).replace('Rp', '')} & Bebas Riba
                </span>
              </div>
            </div>
          </div>

          {/* Educational Conclusion */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 space-y-1 font-medium">
            <p className="font-black text-[#005E54] flex items-center gap-1.5 text-sm sm:text-base">
              💡 Kesimpulan BSI untuk Ibu-Ibu:
            </p>
            <p className="leading-relaxed">
              Meminjam di Pinjol membuat ibu membayar lebih mahal <strong>{formatRupiah(pinjolTotalReturn - rahnTotalReturn)}</strong> dibanding Pegadaian Syariah. Selain itu, Pegadaian Syariah resmi diawasi OJK dan Dewan Pengawas Syariah, tanpa teror penagihan kasar.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-[#00827B] hover:bg-[#00675B] text-white rounded-2xl text-sm font-extrabold shadow-md transition-colors cursor-pointer"
          >
            Tutup Kalkulator
          </button>
        </div>
      </div>
    </div>
  );
};
