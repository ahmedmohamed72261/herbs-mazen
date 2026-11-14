import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  FileCheck,
  Search,
  ExternalLink,
  X,
  Maximize2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/Breadcrumb';
import certificatesData from '../data/certificates.json';

interface Certificate {
  id: string;
  title_en: string;
  title_ar: string;
  badge: string;
  issuer_en: string;
  issuer_ar: string;
  scope_en: string;
  scope_ar: string;
  validity: string;
  description_en: string;
  description_ar: string;
  accent: string;
  gold: string;
  image: string;
  icon?: string;
}

interface CertificatesPageProps {
  onOpenQuote: () => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ onOpenQuote }) => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const certificates = certificatesData as Certificate[];
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const tabs = [
    { id: 'all', name_en: 'All Certifications', name_ar: 'كافة الشهادات والاعتمادات' },
    { id: 'safety', name_en: 'Food Safety & Quality', name_ar: 'سلامة الغذاء والجودة' },
    { id: 'organic', name_en: 'Organic Agriculture', name_ar: 'الزراعة العضوية' },
    { id: 'compliance', name_en: 'Global Trade & Compliance', name_ar: 'الامتثال الدولي والتصدير' },
  ];

  const filteredCerts = useMemo(() => {
    if (activeTab === 'all') return certificates;
    if (activeTab === 'safety') {
      return certificates.filter((c) =>
        ['iso-9001', 'iso-22000', 'fssc-22000', 'haccp', 'brcgs', 'ifs-food'].includes(c.id)
      );
    }
    if (activeTab === 'organic') {
      return certificates.filter((c) =>
        ['organic-nop', 'organic-usaid'].includes(c.id)
      );
    }
    if (activeTab === 'compliance') {
      return certificates.filter((c) =>
        ['fda', 'halal', 'kosher'].includes(c.id)
      );
    }
    return certificates;
  }, [certificates, activeTab]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. SolarGlow Breadcrumb Banner */}
      <Breadcrumb
        title={language === 'ar' ? 'شهادات الجودة والاعتمادات الدولية' : 'Quality Certifications & Accreditations'}
        subtitle={
          language === 'ar'
            ? 'نور الإسلام للأعشاب • أعلى معايير سلامة الأغذية ودساتير الأدوية العالمية'
            : 'Noureslam Herbs • Pharmacopoeial Food Safety & Worldwide Compliance'
        }
        items={[{ label: language === 'ar' ? 'الشهادات' : 'Certificates' }]}
        bgImage="/images/breadcrumb.jpg"
      />

      {/* 2. Overview / Standards Section */}
      <section className="py-16 bg-[#F8F9FA] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <div className="section-title mb-4">
                <span className="sub-title">
                  {language === 'ar' ? 'معايير الجودة العالمية' : 'Certified Global Benchmarks'}
                </span>
                <h2>
                  {language === 'ar'
                    ? 'اعتمادات دولية موثقة تضمن سلامة ونقاء كل حاوية شحن'
                    : 'Internationally Verified Integrity in Every Marine Container'}
                </h2>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {language === 'ar'
                  ? 'تلتزم شركة نور الإسلام للأعشاب والزيوت بأرقى معايير إدارة سلامة الغذاء (ISO 22000 و FSSC 22000 v6.0)، وتخضع منشآتنا لفحوصات دورية معتمدة من هيئة الغذاء والدواء الأمريكية (FDA)، بالإضافة إلى المعايير العضوية الأوروبية والأمريكية (USDA Organic / EU Organic).'
                  : 'Noureslam Herbs operates under strict GFSI food safety frameworks (ISO 22000, FSSC 22000 v6.0), US FDA facility registration, and certified organic production protocols (EU Organic & USDA NOP), ensuring seamless customs clearance at ports worldwide.'}
              </p>
            </div>

            {/* Quick Stats Box */}
            <div className="lg:col-span-4 bg-white p-6 rounded-md border border-[#E3E3E3] shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-[#5B9B37]">
                <ShieldCheck className="w-8 h-8" />
                <h4 className="font-extrabold text-[#1F242C] text-base font-heading">
                  {language === 'ar' ? 'ضمان الامتثال التام' : '100% Compliance'}
                </h4>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm font-bold text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37] shrink-0" />
                  <span>{language === 'ar' ? 'تحاليل كروماتوغرافيا SGS و Eurofins' : 'Independent SGS / Eurofins COA'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37] shrink-0" />
                  <span>{language === 'ar' ? 'مطابقة لدساتير الأدوية الأوروبية EP' : 'European Pharmacopoeia (EP) Specs'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#5B9B37] shrink-0" />
                  <span>{language === 'ar' ? 'تسجيل رسمي لدى هيئة الغذاء الأمريكية FDA' : 'US FDA FSMA & FSVP Compliant'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Certificates Grid (Exact SolarGlow news-box-items Style) */}
      <section className="news-section-2 fix section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-[4px] text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#5B9B37] text-white shadow-md'
                    : 'bg-[#F4F4F4] text-[#1F242C] hover:bg-gray-200'
                }`}
              >
                {language === 'ar' ? tab.name_ar : tab.name_en}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.map((cert) => {
              const title = language === 'ar' ? cert.title_ar : cert.title_en;
              const issuer = language === 'ar' ? cert.issuer_ar : cert.issuer_en;
              const description = language === 'ar' ? cert.description_ar : cert.description_en;

              return (
                <div key={cert.id} className="news-box-items flex flex-col h-full group">
                  {/* Certificate Image Box */}
                  <div
                    className="news-image relative cursor-pointer"
                    onClick={() => setSelectedCert(cert)}
                  >
                    <img
                      src={cert.image}
                      alt={title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/breadcrumb.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 bg-white text-[#1F242C] rounded-full shadow-lg">
                        <Maximize2 className="w-5 h-5" />
                      </span>
                    </div>
                  </div>

                  {/* SolarGlow Overlapping Content */}
                  <div className="news-content flex flex-col flex-grow">
                    <div className="cat">
                      {cert.badge || (language === 'ar' ? 'اعتماد دولي' : 'Certified')}
                    </div>

                    <div className="text-xs text-gray-500 font-bold mb-2 flex items-center justify-between">
                      <span className="truncate">{issuer}</span>
                      <span className="text-[#5B9B37] shrink-0 font-extrabold">{cert.validity}</span>
                    </div>

                    <h3 className="line-clamp-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="text-start font-bold hover:text-[#5B9B37] transition-colors"
                      >
                        {title}
                      </button>
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-6 flex-grow">
                      {description}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(cert)}
                        className="link-btn font-extrabold text-xs uppercase"
                      >
                        <span>{language === 'ar' ? 'عرض تفاصيل الاعتماد' : 'View Certificate'}</span>
                        <Arrow className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenQuote()}
                        className="text-xs font-bold text-[#5B9B37] hover:underline"
                      >
                        {language === 'ar' ? 'طلب نسخة COA' : 'Request COA'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quality Audit CTA Section */}
      <section className="cta-contact-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
        <div className="cta-contact-wrapper flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="cta-contact-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug mb-4 font-heading">
              {language === 'ar' ? (
                <>
                  هل تحتاج لملف تحليل معملي COA <br />
                  أو تدقيق رسمي لشحنتك القادمة؟
                </>
              ) : (
                <>
                  Need a full laboratory COA dossier <br />
                  or compliance audit for your order?
                </>
              )}
            </h2>
            <p className="text-sm text-white/90 mb-6 leading-relaxed">
              {language === 'ar'
                ? 'فريق توكيد الجودة لدينا جاهز لإرسال عينات الحصاد المعتمدة، وملفات التحاليل الكروماتوغرافية، وشهادات التعقيم بالبخار لكل لوت تصديري.'
                : 'Our QA team provides comprehensive batch chromatographic records, steam sterilization certificates, and independent third-party laboratory audits.'}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="theme-btn theme-color-2"
              >
                <span>{language === 'ar' ? 'طلب ملف الجودة والاعتمادات' : 'Request Audit Dossier'}</span>
                <Arrow className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/20109674257"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-btn bg-white !text-[#1F242C] hover:!bg-[#F8BC26] hover:!text-[#1F242C]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{language === 'ar' ? 'تواصل مع قسم الجودة واتساب' : 'WhatsApp QA Desk'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Lightbox Modal for Certificate Preview */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-md max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200"
          >
            {/* Modal Header */}
            <div className="p-4 bg-[#1F242C] text-white flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#F8BC26] uppercase tracking-wider block">
                  {selectedCert.badge}
                </span>
                <h4 className="text-base font-extrabold text-white">
                  {language === 'ar' ? selectedCert.title_ar : selectedCert.title_en}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[60vh] overflow-auto bg-gray-50 p-4 flex items-center justify-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.title_en}
                className="max-h-[55vh] object-contain rounded shadow-md border border-gray-200"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/breadcrumb.jpg';
                }}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-white border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-600">
                <span className="font-bold text-[#1F242C] block">
                  {language === 'ar' ? 'الجهة المانحة:' : 'Accredited Issuer:'}{' '}
                  {language === 'ar' ? selectedCert.issuer_ar : selectedCert.issuer_en}
                </span>
                <span>
                  {language === 'ar' ? 'سريان التدقيق:' : 'Audit Status:'} {selectedCert.validity}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCert(null);
                    onOpenQuote();
                  }}
                  className="theme-btn !py-2.5 !px-5 text-xs uppercase"
                >
                  <span>{language === 'ar' ? 'طلب نسخة معتمدة' : 'Request Certified Copy'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

