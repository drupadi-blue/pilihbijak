import React from 'react';
import { GameStage } from '../types/game';
import { ArrowRight, Smartphone, Target, HelpCircle, FileCheck, Award } from 'lucide-react';

interface HowToPlayViewProps {
  onNavigate: (stage: GameStage) => void;
  hasPreQuiz: boolean;
}

export const HowToPlayView: React.FC<HowToPlayViewProps> = ({ onNavigate, hasPreQuiz }) => {
  const steps = [
    {
      num: 1,
      title: "Mengerjakan Mandiri Lewat HP Masing-Masing",
      desc: "Setiap ibu membuka website di layar HP sendiri. Tidak perlu berebut dan tidak perlu khawatir salah, pilih murni sesuai pertimbangan Ibu.",
      icon: Smartphone,
      color: "bg-emerald-100 text-[#00675B]"
    },
    {
      num: 2,
      title: "Langkah Pertama: Kuis Awal (Pre-Test 10 Soal)",
      desc: "Menjawab 10 pertanyaan singkat untuk mengukur pengetahuan awal seputar belanja keluarga, promo, cicilan, dan pinjol.",
      icon: FileCheck,
      color: "bg-sky-100 text-sky-900"
    },
    {
      num: 3,
      title: "Membantu 3 Karakter Keluarga (Total 9 Soal)",
      desc: "POV dompet karakter: Bu Nania (3 soal), Bu Eva (3 soal), dan Bu Frista (3 soal). Setiap keputusan memengaruhi sisa kas di dompet karakter.",
      icon: Target,
      color: "bg-teal-100 text-teal-900"
    },
    {
      num: 4,
      title: "Langkah Berikutnya: Kuis Akhir (Post-Test 10 Soal)",
      desc: "Menjawab 10 pertanyaan evaluasi akhir untuk melihat peningkatan wawasan Ibu setelah menyelesaikan 9 soal studi kasus.",
      icon: HelpCircle,
      color: "bg-indigo-100 text-indigo-900"
    },
    {
      num: 5,
      title: "Buka Laporan Hasil & Tinjauan Fiqih Muamalah",
      desc: "Melihat skor 100 poin BSI, bedah konsekuensi 9 keputusan, status dompet kas 3 keluarga, sertifikat digital, dan kirim ke WhatsApp.",
      icon: Award,
      color: "bg-[#F99D1C]/20 text-slate-900"
    }
  ];

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300 max-w-xl mx-auto">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-sm text-center space-y-2">
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#00675B] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
          Panduan Praktis Ibu-Ibu PKK
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Cara Mengikuti "PILIH BIJAK!"
        </h2>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Simulasi interaktif untuk melatih ketepatan keputusan keuangan keluarga berbasis nilai syariah bersama BSI.
        </p>
      </div>

      {/* Steps Cards */}
      <div className="space-y-3.5">
        {steps.map((item) => {
          return (
            <div 
              key={item.num}
              className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs flex items-start gap-4 hover:border-[#00827B] transition-colors"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center font-black text-lg shrink-0 mt-0.5`}>
                {item.num}
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-base sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Note */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-5 text-sm sm:text-base text-slate-900 space-y-1.5 font-medium">
        <p className="font-black text-[#005E54] text-base sm:text-lg">
          💡 Tips Penting dari BSI:
        </p>
        <p className="leading-relaxed">
          Slogan utama kita adalah <strong>“Bukan Sekadar Hemat, tetapi Tepat.”</strong> Pilihan terbaik bukan selalu yang paling murah, melainkan yang paling proporsional, berkah, dan tidak menimbulkan jeratan utang bagi keluarga di kemudian hari.
        </p>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={() => onNavigate(hasPreQuiz ? 'simulation' : 'pre_quiz')}
          className="w-full py-4 bg-gradient-to-r from-[#00675B] via-[#00827B] to-[#00A39D] hover:opacity-95 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
        >
          <span>{hasPreQuiz ? 'Lanjut ke Kuis Simulasi 3 Karakter' : 'Mulai dari Kuis Awal (Pre-Test)'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
