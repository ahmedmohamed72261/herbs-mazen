import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Building2,
  Globe2,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/Breadcrumb';

export const ContactPage: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 4000);
  };

  const faqs = [
    {
      q_en: 'What is your Minimum Order Quantity (MOQ)?',
      q_ar: 'ما هو الحد الأدنى للطلب (MOQ) في شحنات التصدير؟',
      a_en:
        'Our standard export MOQ is one 20ft Full Container Load (FCL), which carries approximately 6-8 Metric Tons of dried leafy herbs or 16-19 Metric Tons of heavy seeds. Consolidated trial orders can also be arranged.',
      a_ar:
        'الحد الأدنى النموذجي للتصدير هو حاوية 20 قدم كاملة (FCL)، تتسع لحوالي 6 إلى 8 أطنان من أوراق الأعشاب المجففة أو 16 إلى 19 طناً من البذور العطرية. كما نقبل شحنات تجريبية مجمعة.',
    },
    {
      q_en: 'Do you provide lab analysis samples prior to contract signing?',
      q_ar: 'هل توفرون عينات فحص معملية معتمدة قبل توقيع عقود التوريد؟',
      a_en:
        'Yes, we regularly dispatch commercial harvest samples worldwide via DHL or FedEx alongside full Certificates of Analysis (COA) specifying moisture, volatile oils, and pesticide residue limits.',
      a_ar:
        'نعم، نرسل عينات تجارية رسمية عبر البريد السريع الدولي (DHL / FedEx) مصحوبة بشهادة التحليل المعملي الكاملة (COA) التي توضح الرطوبة، النقاء، ونسب الزيوت العطرية.',
    },
    {
      q_en: 'What international payment terms and Incoterms do you support?',
      q_ar: 'ما هي طرق وشروط الدفع المعتمدة في التعاملات الدولية؟',
      a_en:
        'We support standard trade instruments including Irrevocable Letter of Credit at Sight (L/C at Sight) through prime banks, T/T advance deposits, CAD, and FOB/CIF delivery terms.',
      a_ar:
        'ندعم الاعتماد المستندي غير القابل للإلغاء والمعزز (L/C at Sight)، والتحويل البنكي T/T، والدفع مقابل المستندات (CAD)، وشروط الشحن FOB و CIF.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. SolarGlow Page Banner & Breadcrumb */}
      <Breadcrumb
        title={language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
        subtitle={language === 'ar' ? 'نور الإسلام للأعشاب • مكتب التصدير' : 'Noureslam Herbs • Export Desk'}
        items={[{ label: language === 'ar' ? 'اتصل بنا' : 'Contact Us' }]}
        bgImage="/images/breadcrumb.jpg"
      />

      {/* 2. SolarGlow 3 Single Contact Cards */}
      <section className="contact-page-wrap section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Card 1: Email Address */}
            <div className="single-contact-card">
              <div className="top-part">
                <div className="icon">
                  <Mail className="w-7 h-7 text-[#5B9B37]" />
                </div>
                <div className="title">
                  <h4>{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</h4>
                  <span>{language === 'ar' ? 'راسلنا على مدار 24 ساعة' : 'Sent mail asap anytime'}</span>
                </div>
              </div>

              <div className="bottom-part">
                <div className="info">
                  <p>
                    <a href="mailto:ceo@noureslamherbs.com">ceo@noureslamherbs.com</a>
                  </p>
                  <p>
                    <a href="mailto:sales@noureslamherbs.com">sales@noureslamherbs.com</a>
                  </p>
                </div>
                <div className="icon">
                  <Arrow className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 2: Phone Number */}
            <div className="single-contact-card">
              <div className="top-part">
                <div className="icon">
                  <Phone className="w-7 h-7 text-[#5B9B37]" />
                </div>
                <div className="title">
                  <h4>{language === 'ar' ? 'أرقام الهاتف' : 'Phone Number'}</h4>
                  <span>{language === 'ar' ? 'اتصل بنا أو عبر واتساب' : 'Call us asap anytime'}</span>
                </div>
              </div>

              <div className="bottom-part">
                <div className="info">
                  <p>
                    <a href="tel:+201554780003">+20 15 54780003</a>
                  </p>
                  <p>
                    <a href="https://wa.me/201554780003" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-bold">
                      WhatsApp: +20 15 54780003
                    </a>
                  </p>
                </div>
                <div className="icon">
                  <Arrow className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Card 3: Office & Plant Address */}
            <div className="single-contact-card">
              <div className="top-part">
                <div className="icon">
                  <MapPin className="w-7 h-7 text-[#5B9B37]" />
                </div>
                <div className="title">
                  <h4>{language === 'ar' ? 'مقر الإدارة والمصنع' : 'Office Address'}</h4>
                  <span>{language === 'ar' ? 'المنطقة الصناعية ببني سويف' : 'Sumusta Al Waqf, Beni Suef'}</span>
                </div>
              </div>

              <div className="bottom-part">
                <div className="info">
                  <p>{language === 'ar' ? 'سمسطا الوقف - محافظة بني سويف' : 'Industrial Zone, Beni Suef'}</p>
                  <p>{language === 'ar' ? 'جمهورية مصر العربية' : 'Egypt, North Africa'}</p>
                </div>
                <div className="icon">
                  <Arrow className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map Wrapper */}
          <div className="office-google-map-wrapper rounded-md overflow-hidden shadow-xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111244.64696045618!2d30.957591343749997!3d28.919246899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a1e7bb2f97973%3A0x6b77242ba4930d63!2sBeni%20Suef%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Noureslam Herbs Map"
            />
          </div>
        </div>
      </section>

      {/* 3. SolarGlow Contact Section 2 (Image + Form) */}
      <section className="contact-section-2 fix section-padding pt-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8F8F8] rounded-md border border-gray-200 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Contact Image */}
              <div className="lg:col-span-6 relative min-h-[400px]">
                <img
                  src="/images/agriculture-healthy-food.jpg"
                  alt="Noureslam Herbs Processing"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1F242C]/40 p-8 flex items-end">
                  <div className="bg-[#1F242C]/90 p-6 rounded-md backdrop-blur-sm border border-[#5B9B37] text-white">
                    <span className="text-[#F8BC26] font-bold text-xs uppercase tracking-widest block mb-1">
                      {language === 'ar' ? 'خدمة سريعة للمستوردين' : 'Direct Export Sourcing'}
                    </span>
                    <h4 className="text-lg font-bold font-heading">
                      {language === 'ar'
                        ? 'عقود حاويات وشحنات تجريبية لجميع دول العالم'
                        : 'Container Shipments & Lab Certified Batches'}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-6 p-8 sm:p-12">
                <div className="section-title mb-6">
                  <span className="sub-title">
                    {language === 'ar' ? 'راسلنا الآن' : 'Get In Touch'}
                  </span>
                  <h2 className="!text-3xl">
                    {language === 'ar' ? 'طلب عرض سعر فوري' : 'Request A Formal Quote'}
                  </h2>
                </div>

                {submitted ? (
                  <div className="p-8 bg-emerald-50 border border-[#5B9B37] rounded-md text-center text-[#5B9B37]">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[#5B9B37]" />
                    <h4 className="font-bold text-lg">
                      {language === 'ar' ? 'تم استلام رسالتكم بنجاح!' : 'Inquiry Submitted Successfully!'}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      {language === 'ar'
                        ? 'سيتواصل معكم مسؤول المبيعات الدولية لتقديم عرض الأسعار الرسمي وشهادة التحليل.'
                        : 'Our export sales desk will review your requirements and respond promptly.'}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder={language === 'ar' ? 'الاسم بالكامل' : 'Your Name'}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-[#1F242C] focus:border-[#5B9B37] outline-none"
                      />
                      <input
                        type="email"
                        required
                        placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-[#1F242C] focus:border-[#5B9B37] outline-none"
                      />
                    </div>

                    <input
                      type="text"
                      required
                      placeholder={language === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-[#1F242C] focus:border-[#5B9B37] outline-none"
                    />

                    <textarea
                      required
                      rows={4}
                      placeholder={
                        language === 'ar'
                          ? 'تفاصيل الطلب: المحاصيل المطلوبة، الكميات (طن)، ميناء الوصول والشروط...'
                          : 'Your requirements: crops, tonnage, destination port, and delivery terms...'
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-[#1F242C] focus:border-[#5B9B37] outline-none resize-none"
                    />

                    <button type="submit" className="theme-btn w-full !py-3.5">
                      <span>{language === 'ar' ? 'إرسال الرسالة' : 'Submit Now'}</span>
                      <Arrow className="w-4 h-4 text-[#F8BC26]" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SolarGlow FAQ Accordion Section */}
      <section className="faq-section fix section-padding section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="section-title text-center mb-12">
            <span className="sub-title">
              {language === 'ar' ? 'الأسئلة الشائعة' : 'B2B Export FAQ'}
            </span>
            <h2>
              {language === 'ar'
                ? 'استفسارات متكررة حول التعاقد والشحن الدولي'
                : 'Frequently Asked Questions by Importers'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-md border border-gray-200 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-start font-bold text-sm sm:text-base text-[#1F242C] flex items-center justify-between gap-4 hover:text-[#5B9B37] transition-colors"
                  >
                    <span>{language === 'ar' ? faq.q_ar : faq.q_en}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#5B9B37] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {language === 'ar' ? faq.a_ar : faq.a_en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
