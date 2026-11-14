import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Preloader: React.FC = () => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Smooth initial load timer
    const timer = setTimeout(() => {
      setIsFading(true);
      const removeTimer = setTimeout(() => {
        setIsLoading(false);
      }, 600); // 600ms fade transition
      return () => clearTimeout(removeTimer);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1F242C] transition-opacity duration-600 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading Noureslam Herbs"
    >
      {/* Radiant Glow in Background */}
      <div className="absolute w-72 h-72 rounded-full bg-[#5B9B37]/15 blur-3xl pointer-events-none animate-pulse" />

      {/* Center Branding Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Botanical Emblem */}
        <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            className="w-full h-full drop-shadow-[0_4px_20px_rgba(91,155,55,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="preloaderGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6DB343" />
                <stop offset="100%" stopColor="#3F7A20" />
              </linearGradient>
              <linearGradient id="preloaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8BC26" />
                <stop offset="100%" stopColor="#D99B0F" />
              </linearGradient>
            </defs>

            {/* Rotating Radiant Ring */}
            <circle
              cx="32"
              cy="32"
              r="29"
              stroke="url(#preloaderGold)"
              strokeWidth="2"
              strokeDasharray="5 4"
              className="animate-spin origin-center"
              style={{ animationDuration: '10s' }}
            />

            {/* Outer Botanical Ring Arc */}
            <path
              d="M 12 38 C 10 24, 20 10, 36 8 C 48 7, 58 14, 60 26"
              fill="none"
              stroke="url(#preloaderGreen)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Top Golden Light Starlet */}
            <circle cx="32" cy="6" r="3" fill="url(#preloaderGold)" />

            {/* Left Sprouting Herbal Leaf */}
            <path
              d="M 32 54 C 20 50, 12 40, 14 26 C 24 24, 34 34, 32 54 Z"
              fill="url(#preloaderGreen)"
            />
            <path
              d="M 20 34 C 24 38, 28 44, 32 54"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Right Sprouting Herbal Leaf */}
            <path
              d="M 32 54 C 44 48, 52 36, 48 20 C 36 20, 28 32, 32 54 Z"
              fill="#5B9B37"
            />
            <path
              d="M 44 28 C 40 36, 36 44, 32 54"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Center Sprout Stem & Seed */}
            <path
              d="M 32 54 L 32 25 C 32 21, 34 17, 36 15"
              fill="none"
              stroke="url(#preloaderGold)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="37" cy="14" r="2.2" fill="url(#preloaderGold)" />
          </svg>
        </div>

        {/* Brand Name */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            NOURESLAM
          </span>
          <span className="bg-[#5B9B37] text-white text-xs font-extrabold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
            HERBS
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-semibold text-gray-300 tracking-wider mb-6">
          {language === 'ar'
            ? 'نور الإسلام لتصدير الأعشاب والزيوت الطبية'
            : 'Egyptian Botanical Export & Pure Essential Oils'}
        </p>

        {/* Animated Loading Bar */}
        <div className="w-48 sm:w-60 h-1.5 bg-white/10 rounded-full overflow-hidden relative mb-3">
          <div className="h-full bg-gradient-to-r from-[#5B9B37] via-[#F8BC26] to-[#5B9B37] rounded-full animate-[shimmer_1.5s_infinite] w-full" />
        </div>

        {/* Subtle Loading text */}
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          {language === 'ar' ? 'جارٍ التحميل...' : 'Loading Quality Harvests...'}
        </span>
      </div>
    </div>
  );
};

