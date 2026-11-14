import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhatsAppFloat: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNumber = '201554780003';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً، أود الاستفسار من شركة نور الإسلام للأعشاب عن تصدير الأعشاب والبذور العطرية وقائمة الأسعار.'
      : 'Hello Noureslam Herbs team, I would like to inquire about Egyptian botanical herbs, seeds, and export pricing.'
  )}`;

  return (
    <div
      className={`fixed bottom-6 z-40 flex items-end gap-3 ${
        isRTL ? 'left-6 flex-row' : 'right-6 flex-row-reverse'
      }`}
    >
      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 group-hover:opacity-40" />
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>

      {/* Greeting Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 max-w-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-gray-900">
              {language === 'ar' ? 'فريق التصدير متاح الآن' : 'Export Desk Active'}
            </p>
            <p className="text-gray-500">
              {language === 'ar' ? 'تحدث معنا مباشرة عبر واتساب' : 'Chat directly with sales on WhatsApp'}
            </p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

