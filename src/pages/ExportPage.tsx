import React, { useState } from 'react';
import {
  Globe2,
  Ship,
  Plane,
  Package,
  ShieldCheck,
  CheckCircle2,
  Anchor,
  FileCheck,
  ArrowRight,
  ArrowLeft,
  Truck,
  Layers,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/Breadcrumb';
import type { Country } from '../types';

import countriesData from '../data/countries.json';

interface ExportPageProps {
  onOpenQuote: () => void;
}

export const ExportPage: React.FC<ExportPageProps> = ({ onOpenQuote }) => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const countries: Country[] = countriesData as Country[];
  const [activeRegion, setActiveRegion] = useState<string>('all');

  const regions = [
    { id: 'all', name_en: 'All Destinations', name_ar: 'جميع الأسواق' },
    { id: 'Europe', name_en: 'Europe', name_ar: 'أوروبا' },
    { id: 'North America', name_en: 'North America', name_ar: 'أمريكا الشمالية' },
    { id: 'GCC & Middle East', name_en: 'Middle East & GCC', name_ar: 'الخليج والشرق الأوسط' },
  ];

  const filteredCountries = countries.filter((c) => {
    if (activeRegion === 'all') return true;
    return c.region.toLowerCase().includes(activeRegion.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb Header */}
      <Breadcrumb
        title={language === 'ar' ? 'التصدير والخدمات اللوجستية الدولية' : 'Worldwide Export & Global Logistics'}
        subtitle={language === 'ar' ? 'شحن بحري وجوي لأكثر من 50 دولة' : 'Ocean & Air Freight Dispatch to 50+ Countries'}
        items={[{ label: language === 'ar' ? 'التصدير' : 'Export' }]}
        bgImage="/images/export/export1.jpeg"
      />

      {/* Overview & Key Logistics Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div className="section-title">
                <span className="sub-title">
                  {language === 'ar' ? 'شبكة التصدير اللوجستية' : 'Direct Export Operations'}
                </span>
                <h2>
                  {language === 'ar'
                    ? 'من الموانئ المصرية إلى كبرى الموانئ البحرية العالمية'
                    : 'Ocean Transit via Alexandria & Damietta'}
                </h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {language === 'ar'
                  ? 'تتمتع مصر بموقع استراتيجي استثنائي يربط بين الشرق والغرب، مما يتيح لنا تصدير شحنات الأعشاب والبذور إلى الموانئ الأوروبية في غضون 4 إلى 7 أيام فقط، وإلى أمريكا الشمالية في غضون 14 إلى 20 يوماً.'
                  : 'Strategically situated along the Mediterranean, Noureslam Herbs provides swift transit to major European ports (Hamburg, Rotterdam, Genoa) within 4-7 days and to North American gateways within 14-20 days.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                    <Ship className="w-5 h-5 text-[#5B9B37]" />
                    <span>{language === 'ar' ? 'الموانئ البحرية الرئيسية' : 'Key Departure Ports'}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {language === 'ar'
                      ? 'ميناء الإسكندرية، ميناء الدخيلة، ميناء دمياط، وميناء بورسعيد.'
                      : 'Alexandria, Dekheila, Damietta & Port Said ocean terminals.'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-1">
                    <Plane className="w-5 h-5 text-[#F8BC26]" />
                    <span>{language === 'ar' ? 'الشحن الجوي السريع' : 'Air Cargo Options'}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {language === 'ar'
                      ? 'مطار القاهرة الدولي للعينات والشحنات العاجلة والزهور الحساسة.'
                      : 'Direct air cargo via Cairo International for urgent harvest batches.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Logistics Card */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-50">
              <img
                src="/images/export/export1.jpeg"
                alt="Global Export Hub"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/breadcrumb.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[#F8BC26] text-xs font-bold uppercase tracking-wider block">
                    {language === 'ar' ? 'حضور تصديري موثوق' : 'Global Export Reach'}
                  </span>
                  <h3 className="text-lg font-bold">
                    {language === 'ar' ? 'شحنات حاويات دورية لأكثر من 50 ميناء' : 'Regular FCL Shipments to 50+ Global Ports'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incoterms & Packaging Standards */}
      <section className="py-20 bg-[#F7F7F7] border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center max-w-2xl mx-auto mb-16">
            <span className="sub-title">
              {language === 'ar' ? 'المعايير التجارية والتعبئة' : 'Trade Terms & Packaging'}
            </span>
            <h2>
              {language === 'ar' ? 'شروط التوريد وحلول التعبئة المحكمة' : 'Incoterms & Hermetic Packaging Options'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Incoterms Supported */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#5B9B37] flex items-center justify-center">
                <Anchor className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'ar' ? 'شروط التجارة الدولية (Incoterms)' : 'Supported Incoterms 2020'}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span><strong>FOB:</strong> Alexandria / Damietta / Port Said</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span><strong>CIF:</strong> Any Named Discharge Destination Port</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span><strong>CFR:</strong> Ocean Freight Included</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span><strong>EXW:</strong> Atfih, Giza Plant Dispatch</span>
                </li>
              </ul>
            </div>

            {/* Packaging Standard */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#F8BC26] flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'ar' ? 'خيارات التعبئة والحماية' : 'Export Grade Packaging'}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'أكياس كرافت 20/25 كجم متعددة الطبقات' : '20-25kg Multi-Ply Kraft Sacks with PE'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'أكياس بولي بروبلين (PP) للبذور' : 'PP Woven Bags for Bulk Aromatic Seeds'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'أكياس جامبو (Big Bags) 500-1000 كجم' : 'Big Bags (500-1000kg) on Pallets'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'تغليف خاص للعلامات التجارية (Private Label)' : 'Custom Private Label Retail Packaging'}</span>
                </li>
              </ul>
            </div>

            {/* Container Load Capacities */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {language === 'ar' ? 'سعة الحاويات البحرية' : 'Container Payload Capacity'}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'حاوية 20 قدم (أعشاب): 6 - 8 طن' : '20ft FCL (Fluffy Leaves): 6 - 8 MT'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'حاوية 20 قدم (بذور): 16 - 19 طن' : '20ft FCL (Heavy Seeds): 16 - 19 MT'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'حاوية 40 قدم عالية (HQ): 14 - 18 طن' : '40ft HQ (Herb Leaves): 14 - 18 MT'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'حاوية 40 قدم عالية (بذور): 24 - 26 طن' : '40ft HQ (Heavy Seeds): 24 - 26 MT'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Countries Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center max-w-2xl mx-auto mb-12">
            <span className="sub-title">
              {language === 'ar' ? 'شركاؤنا التجاريون' : 'Export Destinations'}
            </span>
            <h2>
              {language === 'ar' ? 'وجهات الشحن والأسواق الرئيسية' : 'Key Countries We Regularly Export To'}
            </h2>

            {/* Region Filter Buttons */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setActiveRegion(reg.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeRegion === reg.id
                      ? 'bg-[#5B9B37] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {language === 'ar' ? reg.name_ar : reg.name_en}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredCountries.map((country) => (
              <div
                key={country._id}
                className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm hover:border-[#5B9B37] hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                <div className="w-12 h-8 rounded shadow-sm overflow-hidden mb-3 border border-gray-100 flex items-center justify-center bg-gray-50">
                  <img
                    src={country.flag}
                    alt={country.name_en}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/breadcrumb.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#5B9B37] transition-colors">
                  {language === 'ar' ? country.name_ar : country.name_en}
                </h4>
                <span className="text-[10px] text-gray-400 mt-0.5">{country.region}</span>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-[#1F242C] text-white p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[#F8BC26] text-xs font-bold uppercase tracking-widest block mb-1">
                {language === 'ar' ? 'تسعير الحاويات والشحن' : 'Container Pricing & Port Inquiries'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                {language === 'ar'
                  ? 'اطلب عرض سعر CIF متضمن مصاريف الشحن البحري لمينائك'
                  : 'Request a Competitive CIF Ocean Freight Quote for Your Port'}
              </h3>
            </div>
            <button
              onClick={onOpenQuote}
              className="theme-btn theme-color-2 !py-3.5 !px-7 text-xs sm:text-sm font-bold uppercase tracking-wider flex-shrink-0"
            >
              <span>{language === 'ar' ? 'طلب تسعير الحاوية' : 'Request Container Quote'}</span>
              <Arrow className="w-4 h-4 text-[#F8BC26]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

