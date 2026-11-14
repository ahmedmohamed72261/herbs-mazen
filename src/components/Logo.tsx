import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const isLight = variant === 'light';

  // Size configurations
  const dimensions = {
    sm: { height: 38, iconSize: 34, titleSize: 'text-base', badgeSize: 'text-[9px] px-1.5 py-0.5' },
    md: { height: 46, iconSize: 42, titleSize: 'text-lg', badgeSize: 'text-[10px] px-2 py-0.5' },
    lg: { height: 56, iconSize: 50, titleSize: 'text-2xl', badgeSize: 'text-xs px-2.5 py-1' },
  }[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.01] ${className}`}
      aria-label="Noureslam Herbs - Home"
    >
      {/* Visual Logo Emblem Icon */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-500 group-hover:rotate-6"
        style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
      >
        <svg
          viewBox="0 0 64 64"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          <defs>
            <linearGradient id="nhGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6DB343" />
              <stop offset="100%" stopColor="#3F7A20" />
            </linearGradient>
            <linearGradient id="nhGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8BC26" />
              <stop offset="100%" stopColor="#D99B0F" />
            </linearGradient>
            <linearGradient id="nhLeafAccent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5B9B37" />
              <stop offset="100%" stopColor="#8BD85B" />
            </linearGradient>
          </defs>

          {/* Golden Radiant Sunburst Ring (Nour / Light) */}
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="url(#nhGoldGrad)"
            strokeWidth="2.2"
            strokeDasharray="4 3"
            opacity="0.9"
          />

          {/* Outer Botanical Ring Arc */}
          <path
            d="M 12 38 C 10 24, 20 10, 36 8 C 48 7, 58 14, 60 26"
            fill="none"
            stroke="url(#nhGreenGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Top Golden Light Starlet */}
          <circle cx="32" cy="6" r="3" fill="url(#nhGoldGrad)" />

          {/* Left Sprouting Herbal Leaf */}
          <path
            d="M 32 54 C 20 50, 12 40, 14 26 C 24 24, 34 34, 32 54 Z"
            fill="url(#nhGreenGrad)"
          />
          <path
            d="M 20 34 C 24 38, 28 44, 32 54"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Right Sprouting Herbal Leaf */}
          <path
            d="M 32 54 C 44 48, 52 36, 48 20 C 36 20, 28 32, 32 54 Z"
            fill="url(#nhLeafAccent)"
          />
          <path
            d="M 44 28 C 40 36, 36 44, 32 54"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Center Sprout Shoot & Golden Seed */}
          <path
            d="M 32 54 L 32 25 C 32 21, 34 17, 36 15"
            fill="none"
            stroke="url(#nhGoldGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="37" cy="14" r="2.2" fill="url(#nhGoldGrad)" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-extrabold tracking-tight font-sans ${dimensions.titleSize} ${
              isLight ? 'text-white' : 'text-[#1F242C]'
            }`}
          >
            NOURESLAM
          </span>
          <span
            className={`bg-[#5B9B37] text-white font-extrabold tracking-wider rounded font-sans uppercase shadow-sm ${dimensions.badgeSize}`}
          >
            HERBS
          </span>
        </div>

        {showSubtitle && (
          <div className="hidden sm:flex items-center gap-1.5 mt-1 leading-none">
            <span
              className={`text-[10px] tracking-widest uppercase font-semibold font-sans ${
                isLight ? 'text-[#F8BC26]' : 'text-[#5B9B37]'
              }`}
            >
              EGYPTIAN BOTANICAL EXPORT
            </span>
            <span className={isLight ? 'text-gray-500 text-[10px]' : 'text-gray-300 text-[10px]'}>
              •
            </span>
            <span
              className={`text-[10px] font-bold font-cairo ${
                isLight ? 'text-gray-300' : 'text-gray-500'
              }`}
            >
              نور الإسلام للأعشاب
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

