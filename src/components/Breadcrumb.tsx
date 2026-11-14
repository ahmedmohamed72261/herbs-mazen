import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BreadcrumbProps {
  title: string;
  subtitle?: string;
  items?: { label: string; href?: string }[];
  bgImage?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  title,
  subtitle,
  items = [],
  bgImage = '/images/breadcrumb.jpg',
}) => {
  const { language, isRTL } = useLanguage();
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  return (
    <div
      className="relative bg-cover bg-center py-16 md:py-20 text-white overflow-hidden border-b border-[#5B9B37]/30"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15, 28, 20, 0.92) 0%, rgba(31, 36, 44, 0.90) 100%), url(${bgImage})`,
      }}
    >
      {/* Subtle Botanical Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#5B9B37]/25 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-3">
          {/* Subtitle / Category Badge */}
          {subtitle && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5B9B37]/25 text-[#F8BC26] border border-[#F8BC26]/40 text-xs font-bold uppercase tracking-wider rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F8BC26] animate-pulse" />
              {subtitle}
            </span>
          )}

          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {title}
          </h1>

          {/* Single Unified Breadcrumb Trail */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-300 pt-1"
          >
            <Link
              to="/"
              className="flex items-center gap-1.5 text-gray-300 hover:text-[#F8BC26] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
            </Link>

            {items.map((item, idx) => (
              <React.Fragment key={idx}>
                <Chevron className="w-3.5 h-3.5 text-gray-400" />
                {item.href ? (
                  <Link
                    to={item.href}
                    className="text-gray-300 hover:text-[#F8BC26] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[#F8BC26] font-semibold">{item.label}</span>
                )}
              </React.Fragment>
            ))}

            {items.length === 0 && (
              <>
                <Chevron className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[#F8BC26] font-semibold">{title}</span>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};
