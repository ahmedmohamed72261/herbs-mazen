import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NotFoundPage: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-7xl lg:text-9xl font-black text-[#5B9B37] font-heading drop-shadow-sm">
          404
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-heading">
          {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          {language === 'ar'
            ? 'عذراً، الصفحة التي تحاول الوصول إليها قد تم نقلها أو أنها غير متوفرة حالياً.'
            : 'The page you are looking for might have been moved or is temporarily unavailable.'}
        </p>
        <div>
          <Link
            to="/"
            className="theme-btn bg-color !py-3 !px-6 text-xs uppercase tracking-wider"
          >
            <Home className="w-4 h-4 text-[#F8BC26]" />
            <span>{language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Return to Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

