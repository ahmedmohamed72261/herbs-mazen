import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Eye, Send, CheckCircle2 } from 'lucide-react';
import type { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  onRequestQuote: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onRequestQuote }) => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const title = language === 'ar' ? product.name_ar : product.name_en;
  const description = language === 'ar'
    ? product.short_description_ar || product.description_ar
    : product.short_description_en || product.description_en;

  const categoryName = product.category
    ? (language === 'ar' ? product.category.name_ar : product.category.name_en)
    : (language === 'ar' ? 'أعشاب ونباتات' : 'Herbal Botanicals');

  const detailUrl = `/products/${product.slug || product.id}`;

  return (
    <div className="group relative bg-white rounded-md border border-[#E3E3E3] hover:border-[#5B9B37] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_rgba(91,155,55,0.16)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
      {/* 1. SolarGlow Product Image Area */}
      <div className="relative aspect-[4/3] bg-[#F7F7F7] overflow-hidden">
        <Link to={detailUrl} className="block w-full h-full">
          <img
            src={product.image || '/images/hero-section.jpg'}
            alt={title}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/hero-section.jpg';
            }}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Category Pill - SolarGlow Vibrant Green */}
        <span className="absolute top-3 start-3 bg-[#5B9B37] text-white text-[11px] font-extrabold px-3 py-1 uppercase tracking-wider rounded-[3px] shadow-sm">
          {categoryName}
        </span>

        {/* Purity / Organic Badge - SolarGlow Dark + Gold */}
        <span className="absolute top-3 end-3 bg-[#1F242C]/90 backdrop-blur-sm text-[#F8BC26] text-[11px] font-bold px-2.5 py-1 rounded-[3px] shadow-sm flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5B9B37]" />
          <span>{product.purity || (language === 'ar' ? 'نقاء 99%' : '99% Purity')}</span>
        </span>

        {/* Bottom subtle gradient on image */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
      </div>

      {/* 2. SolarGlow Card Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow bg-white">
        {/* Botanical Latin Name */}
        {product.latin_name ? (
          <span className="text-xs text-[#5B9B37] font-semibold italic mb-1.5 block truncate">
            {product.latin_name}
          </span>
        ) : (
          <span className="text-xs text-[#5B9B37] font-semibold tracking-wider uppercase mb-1.5 block">
            {language === 'ar' ? 'محصول تصديري مصري' : 'Egyptian Export Grade'}
          </span>
        )}

        {/* Title */}
        <h3 className="text-lg font-bold font-heading text-[#1F242C] group-hover:text-[#5B9B37] transition-colors mb-2.5 line-clamp-1">
          <Link to={detailUrl}>
            {title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {description}
        </p>

        {/* SolarGlow Specs Pills */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8F9FA] p-3 rounded-[4px] border border-gray-100 mb-5">
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
              {language === 'ar' ? 'هيئة المحصول' : 'Cut / Form'}
            </span>
            <span className="font-bold text-[#1F242C] truncate block text-[11px] sm:text-xs">
              {product.form || (language === 'ar' ? 'كامل / مجروش' : 'Whole / Crushed')}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">
              {language === 'ar' ? 'بلد المنشأ' : 'Origin'}
            </span>
            <span className="font-bold text-[#1F242C] truncate block text-[11px] sm:text-xs">
              {language === 'ar' ? 'مصر (النيل)' : 'Egypt (Nile)'}
            </span>
          </div>
        </div>

        {/* 3. SolarGlow Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
          <Link
            to={detailUrl}
            className="py-2.5 px-3 bg-[#F4F4F4] hover:bg-[#1F242C] text-[#1F242C] hover:text-white text-xs font-bold rounded-[3px] transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'التفاصيل' : 'Details'}</span>
          </Link>

          <button
            type="button"
            onClick={() => onRequestQuote(title)}
            className="py-2.5 px-3 bg-[#5B9B37] hover:bg-[#4b822c] text-white text-xs font-extrabold rounded-[3px] transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'طلب تسعير' : 'Get Quote'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
