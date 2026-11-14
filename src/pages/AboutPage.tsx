import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Award,
  Globe2,
  Sprout,
  Users,
  Target,
  Eye,
  HeartHandshake,
  ArrowRight,
  ArrowLeft,
  Factory,
  Sparkles,
  ChevronDown,
  Ship,
  PhoneCall,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/Breadcrumb';

interface AboutPageProps {
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const aboutFaqs = [
    {
      q_en: 'Where are your primary farms and processing facilities located?',
      q_ar: 'أين تقع مزارعكم ومجمع التجهيز الرئيسي لشركة نور الإسلام؟',
      a_en: 'Our primary agricultural lands are concentrated in Beni Suef and Middle Egypt along the Nile Valley, supported by our central sorting, laser grading, and steam sterilization plant in Sumusta Al Waqf, Beni Suef.',
      a_ar: 'تتركز أراضينا الزراعية الرئيسية في محافظة بني سويف ومصر الوسطى على ضفاف النيل، ويدعمها مجمع التجهيز والغربلة والفرز الليزري والتعقيم في سمسطا الوقف، بني سويف.',
    },
    {
      q_en: 'How do you guarantee batch pesticide-free and organic status?',
      q_ar: 'كيف تضمنون خلو المحاصيل من متبقيات المبيدات ومطابقتها للمعايير العضوية؟',
      a_en: 'Every harvested lot undergoes comprehensive chromatographic multi-residue pesticide screens and heavy metal tests at ISO 17025 accredited labs (Eurofins, SGS) before ocean dispatch.',
      a_ar: 'يخضع كل لوت محصود لتحاليل كروماتوغرافيا شاملة لمتبقيات المبيدات والمعادن الثقيلة في معامل دولية معتمدة وفقاً لـ ISO 17025 (مثل Eurofins و SGS) قبل الشحن البحري.',
    },
    {
      q_en: 'What incoterms and ocean delivery options do you offer?',
      q_ar: 'ما هي شروط التجارة الدولية (Incoterms) وطرق الشحن التي توفرونها؟',
      a_en: 'We ship FOB Alexandria / Damietta, CIF to any global destination port, CFR, and EXW from our factory floor. Both 20ft and 40ft High Cube containers are available with rapid transit times.',
      a_ar: 'نوفر الشحن وفق شروط FOB موانئ الإسكندرية ودمياط، وCIF إلى كافة الموانئ العالمية، وCFR وEXW من المصنع. نشحن حاويات 20 و40 قدم بحمولة كاملة وأسرع خطوط ملاحة.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. SolarGlow Exact Page Banner & Breadcrumb */}
      <Breadcrumb
        title={language === 'ar' ? 'من نحن' : 'About Us'}
        subtitle={language === 'ar' ? 'نور الإسلام للأعشاب • الريادة الزراعية' : 'Noureslam Herbs • Agricultural Heritage'}
        items={[{ label: language === 'ar' ? 'من نحن' : 'About Us' }]}
        bgImage="/images/breadcrumb.jpg"
      />

      {/* 2. SolarGlow About Section (about-wrapper-2) */}
      <section className="about-section fix section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Image with Floating Green Box */}
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="overflow-hidden rounded-md shadow-2xl">
                  <img
                    src="/assets/images/about-main.jpg"
                    alt="Noureslam Herbs Farmland"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/about.jpg';
                    }}
                    className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* SolarGlow Floating Green Box Badge */}
                <div
                  className={`absolute -bottom-8 ${
                    isRTL ? '-right-6' : '-left-6'
                  } bg-[#5B9B37] text-white p-7 rounded-md shadow-2xl border-4 border-white max-w-[290px] z-10`}
                >
                  <div className="w-12 h-12 rounded-full bg-white text-[#5B9B37] flex items-center justify-center mb-3 shadow-md">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h5 className="text-sm sm:text-base font-bold leading-snug font-heading">
                    {language === 'ar'
                      ? 'زراعة مصرية نظيفة تستغل خيرات النيل الطبيعية'
                      : 'Innovative Ways To Harness Nile Botanical Renewable Purity'}
                  </h5>
                </div>
              </div>
            </div>

            {/* Right About Content */}
            <div className="lg:col-span-6">
              <div className="section-title mb-6">
                <span className="sub-title">
                  {language === 'ar' ? 'نبذة عن الشركة' : 'About Us'}
                </span>
                <h2>
                  {language === 'ar'
                    ? 'من ضفاف نيل مصر المبارك إلى موائد ومصانع العالم'
                    : 'Get The Pure Power of Egyptian Nile Botanicals'}
                </h2>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {language === 'ar'
                  ? 'تأسست شركة نور الإسلام للأعشاب لتكون الجسر المباشر والموثوق بين المزارعين المصريين في محافظات بني سويف، الفيوم، والمنيا، وبين كبرى شركات استيراد وتعبئة الشاي والأعشاب الطبية في أوروبا، أمريكا الشمالية، وآسيا.'
                  : 'Noureslam Herbs was established to serve as the direct, uncompromising link between certified contract growers along the fertile Nile Valley and premier tea, spice, and botanical extractors across Europe, North America, and the Middle East.'}
              </p>

              {/* SolarGlow list-items with small thumb image & checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center p-4 bg-[#F7F7F7] rounded-md mb-8 border border-gray-200/70">
                <div className="sm:col-span-4">
                  <div className="overflow-hidden rounded-md aspect-square shadow-sm">
                    <img
                      src="/images/1.jpg"
                      alt="Crop Sorting"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="sm:col-span-8">
                  <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-[#1F242C]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5B9B37] flex-shrink-0" />
                      <span>{language === 'ar' ? 'زراعة خالية 100% من المبيدات' : 'Pesticide-Free Guarantee'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5B9B37] flex-shrink-0" />
                      <span>{language === 'ar' ? 'تحاليل SGS و Eurofins المعملية' : 'Independent SGS / Eurofins COA'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#5B9B37] flex-shrink-0" />
                      <span>{language === 'ar' ? 'تتبع كامل للحقل واللوت' : 'Complete Batch Traceability'}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-6 border-t border-gray-200 flex items-center justify-start">
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="theme-btn"
                >
                  <span>{language === 'ar' ? 'طلب عرض سعر' : 'Get a Quote'}</span>
                  <Arrow className="w-4 h-4 text-[#F8BC26]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SolarGlow Work Process Section with 4 STEP Cards */}
      <section className="work-process-section fix section-padding section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center max-w-3xl mx-auto mb-16">
            <span className="sub-title">
              {language === 'ar' ? 'مراحل العمل والإنتاج' : 'Work Process'}
            </span>
            <h2>
              {language === 'ar'
                ? 'من أرض مصر المباركة إلى موانئ العالم بدقة متناهية'
                : 'Think Beyond The Wave • Four Precision Export Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="work-process-card-items">
              <span className="inline-block px-3 py-1 bg-[#5B9B37] text-white text-[11px] font-bold uppercase rounded tracking-wider mb-4 w-fit">
                STEP 01
              </span>
              <h2 className="step-number">01</h2>
              <h5>{language === 'ar' ? 'الزراعة التعاقدية' : 'Contract Farming'}</h5>
              <p>
                {language === 'ar'
                  ? 'إشراف كامل على التربة، بذور عضوية نقية، ومتابعة نمو المحاصيل في بني سويف ومصر الوسطى.'
                  : 'Direct agronomic monitoring across Beni Suef feddans ensuring organic purity.'}
              </p>
              <Link to="/contact" className="link-btn">
                <span>{language === 'ar' ? 'المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="work-process-card-items">
              <span className="inline-block px-3 py-1 bg-[#1F242C] text-[#F8BC26] text-[11px] font-bold uppercase rounded tracking-wider mb-4 w-fit">
                STEP 02
              </span>
              <h2 className="step-number">02</h2>
              <h5>{language === 'ar' ? 'التجفيف الصحي' : 'Solar Hygienic Drying'}</h5>
              <p>
                {language === 'ar'
                  ? 'تجفيف طبيعي محكوم في ساحات معزولة يضمن الحفاظ على اللون الأخضر الزاهي ونقاء الرائحة.'
                  : 'Controlled dehydration protecting natural leaf aroma, color, and volatile oils.'}
              </p>
              <Link to="/contact" className="link-btn">
                <span>{language === 'ar' ? 'المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="work-process-card-items">
              <span className="inline-block px-3 py-1 bg-[#5B9B37] text-white text-[11px] font-bold uppercase rounded tracking-wider mb-4 w-fit">
                STEP 03
              </span>
              <h2 className="step-number">03</h2>
              <h5>{language === 'ar' ? 'الفرز بالليزر والتحليل' : 'Laser Grading & Lab COA'}</h5>
              <p>
                {language === 'ar'
                  ? 'غربلة اهتزازية وفرز ضوئي بالليزر لفصل الشوائب، تليها تحاليل الكروماتوغرافيا الشاملة.'
                  : 'Optical color sorting, magnetic traps, and rigorous chromatography screening.'}
              </p>
              <Link to="/export" className="link-btn">
                <span>{language === 'ar' ? 'المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 4 */}
            <div className="work-process-card-items">
              <span className="inline-block px-3 py-1 bg-[#1F242C] text-[#F8BC26] text-[11px] font-bold uppercase rounded tracking-wider mb-4 w-fit">
                STEP 04
              </span>
              <h2 className="step-number">04</h2>
              <h5>{language === 'ar' ? 'التعبئة والشحن البحري' : 'Hermetic Ocean Dispatch'}</h5>
              <p>
                {language === 'ar'
                  ? 'تعبئة في أكياس كرافت مبطنة متعددة الطبقات وشحن بحري سريع عبر موانئ الإسكندرية ودمياط.'
                  : 'Poly-lined kraft sacks loaded in marine containers for fast port-to-port delivery.'}
              </p>
              <Link to="/export" className="link-btn">
                <span>{language === 'ar' ? 'المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SolarGlow Faq Section 2 */}
      <section className="faq-section-2 fix section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left FAQ Content */}
            <div className="lg:col-span-6">
              <div className="section-title mb-8">
                <span className="sub-title">
                  {language === 'ar' ? 'استفسارات الجودة والتوريد' : 'Some FAQ’s'}
                </span>
                <h2>
                  {language === 'ar'
                    ? 'إجابات مباشرة حول مزارعنا ومعايير الجودة'
                    : 'Let Botanical Sunshine Inside Your Business'}
                </h2>
              </div>

              <div className="space-y-4">
                {aboutFaqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-[#F8F8F8] rounded-md border border-gray-200 overflow-hidden shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-start font-bold text-sm sm:text-base text-[#1F242C] flex items-center justify-between gap-4 hover:text-[#5B9B37] transition-colors"
                      >
                        <span>{language === 'ar' ? faq.q_ar : faq.q_en}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#5B9B37] flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60">
                          {language === 'ar' ? faq.a_ar : faq.a_en}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6">
              <div className="overflow-hidden rounded-md shadow-2xl relative aspect-[4/3]">
                <img
                  src="/images/lab.jpg"
                  alt="Laboratory and QA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
