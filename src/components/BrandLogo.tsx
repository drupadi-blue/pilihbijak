import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true 
}) => {
  const iconSize = size === 'sm' ? 'w-8 h-8 sm:w-10 sm:h-10' : size === 'lg' ? 'w-14 h-14 sm:w-16 sm:h-16' : 'w-10 h-10 sm:w-12 sm:h-12';

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Icon: Lembaran Uang Rupiah & Koin Berkah dengan lambang 'Rp' */}
      <div className={`relative ${iconSize} shrink-0`}>
        <svg 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md select-none"
        >
          <defs>
            <linearGradient id="bsiMoneyGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A39D" />
              <stop offset="0.6" stopColor="#00827B" />
              <stop offset="1" stopColor="#005E54" />
            </linearGradient>
            <linearGradient id="bsiGoldGrad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFB81C" />
              <stop offset="1" stopColor="#F99D1C" />
            </linearGradient>
          </defs>

          {/* Background card / base */}
          <rect width="64" height="64" rx="18" fill="url(#bsiMoneyGrad)" />
          
          {/* Subtle security line circle */}
          <circle cx="32" cy="32" r="27" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Lembaran Uang Kertas Rupiah (Banknote) */}
          <g transform="rotate(-6 32 32)">
            {/* Bayangan uang */}
            <rect x="10" y="20" width="44" height="26" rx="5" fill="#003832" opacity="0.4" />
            {/* Badan uang kertas */}
            <rect x="9" y="19" width="44" height="26" rx="5" fill="#FFFFFF" stroke="#F99D1C" strokeWidth="1.5" />
            
            {/* Bingkai dalam uang */}
            <rect x="12" y="22" width="38" height="20" rx="3" stroke="#00827B" strokeWidth="1" strokeOpacity="0.5" fill="#F0FDF4" />
            
            {/* Lingkaran cap tengah uang */}
            <circle cx="31" cy="32" r="7.5" fill="#E6FFFA" stroke="#00A39D" strokeWidth="1.2" />
            
            {/* Teks 'Rp' Tegas di tengah uang */}
            <text 
              x="31" 
              y="36" 
              textAnchor="middle" 
              fontFamily="'Plus Jakarta Sans', sans-serif" 
              fontWeight="900" 
              fontSize="10" 
              fill="#00675B"
              letterSpacing="-0.5"
            >
              Rp
            </text>

            {/* Garis ornamen uang */}
            <line x1="15" y1="26" x2="21" y2="26" stroke="#00A39D" strokeWidth="1" strokeLinecap="round" />
            <line x1="15" y1="38" x2="21" y2="38" stroke="#00A39D" strokeWidth="1" strokeLinecap="round" />
            <line x1="41" y1="26" x2="47" y2="26" stroke="#00A39D" strokeWidth="1" strokeLinecap="round" />
            <line x1="41" y1="38" x2="47" y2="38" stroke="#00A39D" strokeWidth="1" strokeLinecap="round" />
          </g>

          {/* Koin Emas Rezeki Berkah di pojok kanan bawah */}
          <circle cx="47" cy="45" r="9" fill="url(#bsiGoldGrad)" stroke="#FFF7ED" strokeWidth="1.5" />
          <circle cx="47" cy="45" r="7" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
          <text 
            x="47" 
            y="48" 
            textAnchor="middle" 
            fontFamily="'Plus Jakarta Sans', sans-serif" 
            fontWeight="900" 
            fontSize="8" 
            fill="#5C2E00"
          >
            Rp
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="text-base sm:text-2xl font-black tracking-tight text-white leading-none">
              PILIH BIJAK!
            </span>
            <span className="text-[9px] sm:text-[10px] font-extrabold bg-[#F99D1C] text-slate-950 px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              BSI
            </span>
          </div>
          <span className="hidden sm:inline text-xs text-emerald-100 font-bold tracking-wide mt-1">
            Bukan Sekadar Hemat, tetapi Tepat.
          </span>
        </div>
      )}
    </div>
  );
};
