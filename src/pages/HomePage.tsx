import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  Globe,
  Award,
  Play,
  Layers,
  ChevronDown,
  Droplet,
  Leaf,
  Boxes,
  Send,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import productsData from '../data/products.json';
import type { Product } from '../types';

interface HomePageProps {
  onOpenQuote: (productName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuote }) => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedHomeCat, setSelectedHomeCat] = useState<string>('all');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const allProducts: Product[] = productsData as unknown as Product[];

  const homeCategories = [
    { id: 'all', name_en: 'All Crops', name_ar: 'جميع المحاصيل' },
    { id: 'oils', name_en: 'Essential Oils', name_ar: 'الزيوت العطرية' },
    { id: 'herbs', name_en: 'Medicinal Herbs', name_ar: 'الأعشاب الطبية' },
    { id: 'seeds', name_en: 'Aromatic Seeds', name_ar: 'البذور العطرية' },
    { id: 'spices', name_en: 'Spices', name_ar: 'التوابل' },
  ];

  const displayedProducts = useMemo(() => {
    if (selectedHomeCat === 'all') {
      return allProducts.slice(0, 8);
    }
    return allProducts.filter((p) => p.category?.slug === selectedHomeCat).slice(0, 8);
  }, [allProducts, selectedHomeCat]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  const faqItems = [
    {
      q_en: 'Can we request commercial harvest samples before contracting?',
      q_ar: 'هل يمكننا طلب عينات تجارية قبل التعاقد الرسمي؟',
      a_en: 'Yes, we regularly air-freight certified lab samples (100g - 500g) via DHL or FedEx alongside full Certificates of Analysis (COA) specifying moisture, purity, volatile oil percentages, and pesticide limits.',
      a_ar: 'نعم، نشحن عينات معتمدة ومطابقة لشحنات الحصاد الجارية جواً عبر DHL أو FedEx مع شهادة تحليل معملية كاملة (COA) توضح النقاء، الرطوبة، نسب الزيوت، وخلوها من متبقيات المبيدات.',
    },
    {
      q_en: 'What export packaging options are available for bulk orders?',
      q_ar: 'ما هي خيارات التعبئة والتغليف المتاحة للشحنات التصديرية الكبيرة؟',
      a_en: 'We pack herbs in 15kg-25kg multi-ply hermetic kraft paper bags with food-grade poly liners, 25kg-50kg PP woven bags for seeds, and 25kg/190kg epoxy-coated steel drums or IBC totes for essential oils.',
      a_ar: 'نوفر أكياس كرافت متعددة الطبقات مبطنة (15-25 كجم)، وأكياس بولي بروبيلين محكمة للبذور (25-50 كجم)، وبراميل حديدية مجلفنة ومطلية بالإيبوكسي الغذائي للزيوت العطرية.',
    },
    {
      q_en: 'What are your standard export shipping terms (Incoterms)?',
      q_ar: 'ما هي شروط الشحن الدولية المعتمدة لديكم؟',
      a_en: 'We operate primarily on FOB Alexandria, Port Said, and Damietta, as well as CIF, CFR, and CIP to all major global container seaports across Europe, North America, Asia, and the Arab Gulf.',
      a_ar: 'نعمل بمرونة تامة وفق شروط FOB موانئ الإسكندرية ودمياط وبورسعيد والسخنة، وشروط CIF / CFR إلى كافة الموانئ العالمية في أوروبا وأمريكا الشمالية وآسيا والخليج العربي.',
    },
    {
      q_en: 'Are your botanical products and pure oils certified organic?',
      q_ar: 'هل محاصيلكم وزيوتكم معتمدة وفق المعايير العضوية الدولية؟',
      a_en: 'Yes, our contracted farmlands and processing plants comply with EU Organic (Regulation 2018/848), USDA Organic (NOP), ISO 22000, HACCP, HALAL, and US FDA facility registration.',
      a_ar: 'نعم، مزارعنا التعاقدية ومحطاتنا معتمدة وفق المعايير الأوروبية والأمريكية العضوية EU/USDA NOP، بالإضافة إلى شهادات ISO 22000 وHACCP والتسجيل لدى هيئة الغذاء والدواء الأمريكية FDA.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ========================================================
          1. HERO SECTION (Exact SolarGlow Home 2 - hero-section hero-1 hero-2)
      ======================================================== */}
      <section
        className="hero-section hero-1 hero-2 relative"
        style={{ backgroundImage: `url('/images/hero-section.jpg')` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 sm:py-24 md:py-36 relative z-10">
          <div className="max-w-3xl">
            <div className="hero-content">
              {/* SolarGlow Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#5B9B37]/35 border border-[#F8BC26]/70 rounded-full mb-5 backdrop-blur-md shadow-lg max-w-full">
                <Sparkles className="w-4 h-4 text-[#F8BC26] shrink-0" />
                <span className="text-[11px] sm:text-sm font-extrabold uppercase tracking-wider text-[#F8BC26] truncate">
                  {language === 'ar'
                    ? 'أكثر من 35 عاماً من الخبرة الزراعية والتصديرية'
                    : 'We have 35+ years of agricultural export experience'}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[62px] font-extrabold text-white tracking-tight leading-[1.14] mb-6 font-heading drop-shadow-md">
                {language === 'ar' ? (
                  <>
                    نقاء الطبيعة المصرية <br />
                    وجودة تصديرية <span className="text-[#F8BC26]">عالمية</span>
                  </>
                ) : (
                  <>
                    Keep calm <br />
                    and choose <span>Noureslam Herbs</span>
                  </>
                )}
              </h1>

              {/* Sub-text */}
              <p className="text-base sm:text-lg text-gray-100 max-w-2xl mb-8 leading-relaxed drop-shadow">
                {language === 'ar'
                  ? 'مزارع ومعامل نور الإسلام: الرائد المصري في زراعة وتجهيز وتصدير الأعشاب الطبية، الزيوت العطرية النقية، البذور، والتوابل لكبرى الأسواق العالمية.'
                  : 'Cultivating, steam-distilling, and bulk exporting certified organic Egyptian herbs, 100% pure botanical essential oils, and seeds to 35+ countries.'}
              </p>

              {/* Hero Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenQuote()}
                  className="theme-btn"
                >
                  <span>{language === 'ar' ? 'طلب عرض سعر فوري' : "Let's Talk"}</span>
                  <Arrow className="w-4 h-4 text-[#F8BC26]" />
                </button>

                <Link
                  to="/products"
                  className="theme-btn theme-color-2"
                >
                  <span>{language === 'ar' ? 'استعراض المحاصيل والزيوت' : 'Explore Catalog'}</span>
                  <Arrow className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Trust Bar (SolarGlow 4 Key Metrics Bar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20 mb-12">
        <div className="hero-trust-bar grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-7">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#5B9B37]/10 text-[#5B9B37] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#1F242C] text-sm">
                {language === 'ar' ? 'زراعة خالية من المبيدات' : '100% Pesticide-Free'}
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                {language === 'ar' ? 'عضوية معتمدة EU & USDA' : 'EU & USDA Organic Purity'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#F8BC26]/15 text-[#F8BC26] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#5B9B37]" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#1F242C] text-sm">
                {language === 'ar' ? 'تحاليل معملية COA' : 'ISO 17025 Tested'}
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                {language === 'ar' ? 'شهادات SGS & Eurofins' : 'Independent SGS / Eurofins'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#5B9B37]/10 text-[#5B9B37] flex items-center justify-center shrink-0">
              <Droplet className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#1F242C] text-sm">
                {language === 'ar' ? 'زيوت نقية 100%' : 'Pure Distilled Oils'}
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                {language === 'ar' ? 'تقطير بخاري وعصر بارد' : 'Steam & Cold-Pressed Potency'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#1F242C]/10 text-[#1F242C] flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-[#5B9B37]" />
            </div>
            <div>
              <h5 className="font-extrabold text-[#1F242C] text-sm">
                {language === 'ar' ? 'تصدير لأكثر من 35 دولة' : 'Export to 35+ Ports'}
              </h5>
              <p className="text-xs text-gray-500 mt-0.5">
                {language === 'ar' ? 'حاويات FCL و LCL سريعة' : 'Rapid FCL/LCL Marine Freight'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. ABOUT SECTION (Exact SolarGlow Home 2 - about-wrapper-2)
      ======================================================== */}
      <section className="about-section fix section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="about-wrapper-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Image with floating badge & dots */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/about.jpg"
                    alt="Noureslam Nile Valley Agricultural Lands"
                    className="w-full h-[480px] object-cover"
                  />
                  {/* Dark overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Floating Green Badge (Exact SolarGlow Icon-items) */}
                <div className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-6 bg-[#5B9B37] text-white p-6 rounded-xl shadow-2xl max-w-xs border-4 border-white z-20">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                    <Leaf className="w-7 h-7 text-[#F8BC26]" />
                  </div>
                  <h5 className="text-base sm:text-lg font-bold leading-snug">
                    {language === 'ar'
                      ? 'طرق مبتكرة لحصاد ونقاء المحاصيل المصرية'
                      : 'Innovative Ways To Harvest Pure Egyptian Botanicals'}
                  </h5>
                </div>
              </div>

              {/* Right Column: About Content */}
              <div className="lg:col-span-6">
                <div className="section-title mb-6">
                  <span className="sub-title">
                    {language === 'ar' ? 'من نحن' : 'About us'}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight leading-tight">
                    {language === 'ar'
                      ? 'نقاء حوض النيل مباشرة إلى مستودعاتك'
                      : 'Get the pure botanical power of Egyptian farmlands'}
                  </h2>
                </div>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {language === 'ar'
                    ? 'تعتبر شركة نور الإسلام للأعشاب والزيوت العطرية من أعرق الكيانات المصرية المتخصصة في الزراعة والفرز بالليزر والتصدير البحري، حيث نعتمد على مزارعنا الخصبة في بني سويف ومحطات فرز متطورة مطابقة للمعايير الدولية ودساتير الأدوية الأوروبية والأمريكية.'
                    : 'Noureslam Herbs is a prominent Egyptian cultivator, essential oil distiller, and global exporter. Headquartered in Beni Suef and Cairo, our integrated processing lines ensure pharmacopoeial purity, optical grading, and hermetic bulk container dispatch.'}
                </p>

                {/* List items with thumb (SolarGlow list-items) */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-8">
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 shadow-md">
                    <img
                      src="/images/products/chamomile.jpg"
                      alt="Chamomile harvest"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm font-bold text-[#1F242C]">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#5B9B37] shrink-0" />
                      <span>{language === 'ar' ? 'أرقام ومعدلات نقاء قياسية تفوق 99.8%' : 'Digits that define purity & growth'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#5B9B37] shrink-0" />
                      <span>{language === 'ar' ? 'تجهيز احترافي يضمن أقصى ربحية لشركائنا' : 'Our preparation is your profit'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#5B9B37] shrink-0" />
                      <span>{language === 'ar' ? 'مواصفات تضمن تفوقك التام على المنافسين' : 'Edge out the global competition'}</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    to="/about"
                    className="theme-btn theme-color-2 !py-3 !px-6 text-xs font-bold uppercase tracking-wider"
                  >
                    <span>{language === 'ar' ? 'اقرأ المزيد عن شركتنا' : 'Learn More About Us'}</span>
                    <Arrow className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SERVICE SECTION 2 (Exact SolarGlow Home 2 - service-box-items)
      ======================================================== */}
      <section className="service-section-2 fix section-padding pt-0 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center max-w-2xl mx-auto mb-14">
            <span className="sub-title">
              {language === 'ar' ? 'ركائز الإنتاج والمحاصيل' : 'Our Services & Botanical Pillars'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight">
              {language === 'ar'
                ? 'تبدأ بالجودة الفائقة وتنتهي بنجاحك التجاري'
                : 'Start with quality and finish with global success'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Box 1: Certified Culinary & Medicinal Herbs */}
            <div className="service-box-items">
              <div className="service-content">
                <div className="icon-wrap">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3>
                  <Link to="/products?category=herbs">
                    {language === 'ar' ? 'الأعشاب الطبية والطهوية' : 'Certified Culinary Herbs'}
                  </Link>
                </h3>
                <ul>
                  <li>{language === 'ar' ? 'ريحان عطري مجفف (أوراق وفيرم)' : 'Egyptian Sweet Basil (Whole & Cut)'}</li>
                  <li>{language === 'ar' ? 'نعناع فلفلي ونعناع بلدي فاخر' : 'Peppermint & Spearmint Leaves'}</li>
                  <li>{language === 'ar' ? 'أزهار البابونج الذهبية المنقاة' : 'Pure Golden Chamomile Flowers'}</li>
                  <li>{language === 'ar' ? 'بردقوش وزعتر وروزماري مصري' : 'Marjoram, Thyme & Rosemary'}</li>
                </ul>
                <Link to="/products?category=herbs" className="link-btn">
                  <span>{language === 'ar' ? 'استعراض الأعشاب' : 'View Botanical Herbs'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="service-image">
                <img src="/images/products/basil.jpg" alt="Egyptian Culinary Herbs" />
              </div>
            </div>

            {/* Box 2: 100% Pure Essential & Cold-Pressed Oils */}
            <div className="service-box-items">
              <div className="service-content">
                <div className="icon-wrap">
                  <Droplet className="w-8 h-8" />
                </div>
                <h3>
                  <Link to="/products?category=oils">
                    {language === 'ar' ? 'الزيوت العطرية والطبيعية' : 'Essential & Pure Carrier Oils'}
                  </Link>
                </h3>
                <ul>
                  <li>{language === 'ar' ? 'زيت حبة البركة البكر معصور على البارد' : 'Virgin Cold-Pressed Black Seed Oil'}</li>
                  <li>{language === 'ar' ? 'زيت نعناع فلفلي مقطر بالبخار' : 'Steam-Distilled Peppermint Oil (>45%)'}</li>
                  <li>{language === 'ar' ? 'زيت البابونج الأزرق (كامازولين نقي)' : 'German Blue Chamomile Essential Oil'}</li>
                  <li>{language === 'ar' ? 'زيت اليانسون والجوجوبا الذهبي' : 'Pure Aniseed & Virgin Jojoba Oil'}</li>
                </ul>
                <Link to="/products?category=oils" className="link-btn">
                  <span>{language === 'ar' ? 'استعراض الزيوت' : 'View Essential Oils'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="service-image">
                <img src="/images/products/nigella_sativa.jpg" alt="Pure Essential & Botanical Oils" />
              </div>
            </div>

            {/* Box 3: Aromatic Seeds & Egyptian Spices */}
            <div className="service-box-items">
              <div className="service-content">
                <div className="icon-wrap">
                  <Boxes className="w-8 h-8" />
                </div>
                <h3>
                  <Link to="/products?category=seeds">
                    {language === 'ar' ? 'البذور العطرية والتوابل' : 'Aromatic Seeds & Spices'}
                  </Link>
                </h3>
                <ul>
                  <li>{language === 'ar' ? 'بذور يانسون وشمر وكراوية نقاء 99%' : 'Aniseed, Fennel & Caraway Seeds 99%'}</li>
                  <li>{language === 'ar' ? 'كزبرة بلدي مجففة حب ومجروش' : 'Coriander Seeds (Whole & Split)'}</li>
                  <li>{language === 'ar' ? 'كمون مصري بلدي ذو نكهة فائقة' : 'Premium Egyptian Cumin Seeds'}</li>
                  <li>{language === 'ar' ? 'كركديه أسواني زهور كاملة ومجروش' : 'Aswan Hibiscus Flowers (Calyces & TBC)'}</li>
                </ul>
                <Link to="/products?category=seeds" className="link-btn">
                  <span>{language === 'ar' ? 'استعراض البذور' : 'View Aromatic Seeds'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="service-image">
                <img src="/images/products/fennel.jpg" alt="Aromatic Seeds and Spices" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED BOTANICAL CROPS & OILS SHOWCASE (SolarGlow Style)
      ======================================================== */}
      <section className="featured-products-section fix section-padding bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="section-title">
              <span className="sub-title">
                {language === 'ar' ? 'محاصيلنا ومنتجاتنا الفاخرة' : 'Featured Botanical Harvest & Pure Oils'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight">
                {language === 'ar'
                  ? 'أفضل الأعشاب والزيوت المصرية الجاهزة للتصدير الفوري'
                  : 'Pure Egyptian Nile Harvest Ready for Export'}
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {homeCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedHomeCat(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-300 ${
                    selectedHomeCat === cat.id
                      ? 'bg-[#5B9B37] text-white shadow-md'
                      : 'bg-[#F4F4F4] text-[#1F242C] hover:bg-gray-200'
                  }`}
                >
                  {language === 'ar' ? cat.name_ar : cat.name_en}
                </button>
              ))}
            </div>
          </div>

          {/* SolarGlow Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onRequestQuote={(name) => onOpenQuote(name)}
              />
            ))}
          </div>

          {/* Section Bottom CTA */}
          <div className="text-center mt-12 pt-6 border-t border-gray-100">
            <Link
              to="/products"
              className="theme-btn theme-color-2 inline-flex items-center gap-2 !px-8 !py-3.5"
            >
              <span>
                {language === 'ar'
                  ? 'استعراض فهرس المنتجات والزيوت كاملاً (أكثر من 50 محصولاً)'
                  : 'View Full Botanical & Oils Catalog (50+ Products)'}
              </span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. FEATURE SECTION (Exact SolarGlow Home 2 - feature-section with 2 Circular Bars)
      ======================================================== */}
      <section className="feature-section fix section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="feature-wrapper">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Feature Left Image */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <img
                    src="/images/lab.jpg"
                    alt="Agronomy and Quality Control Laboratory"
                    className="w-full h-[460px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F242C]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-3 py-1 bg-[#F8BC26] text-[#1F242C] text-xs font-extrabold uppercase rounded tracking-wider inline-block mb-2">
                      {language === 'ar' ? 'مختبرات فحص متطورة' : 'Advanced Lab Testing'}
                    </span>
                    <h4 className="text-xl font-bold">
                      {language === 'ar'
                        ? 'فحص شامل للزيوت الطيارة، ومتبقيات المبيدات، والمعادن الثقيلة'
                        : 'Comprehensive testing for active compounds, pesticide residues & heavy metals'}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Feature Right Content */}
              <div className="lg:col-span-6">
                <div className="feature-content">
                  <div className="section-title mb-6">
                    <span className="sub-title">
                      {language === 'ar' ? 'ريادة التصدير' : 'Who we are'}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight leading-tight">
                      {language === 'ar'
                        ? 'شريك التوريد الموثوق لكبرى مصانع الشاي والأدوية'
                        : 'The growth accelerator for global tea packagers & extractors'}
                    </h2>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                    {language === 'ar'
                      ? 'نوفر حلول توريد متكاملة تضمن أعلى تركيزات للمركبات الفعالة وفق دساتير الأدوية الدولية (European Pharmacopoeia / USP)، مع سلاسل إمداد مستقرة ومرونة في التعبئة والتخليص الجمركي.'
                      : 'We provide integrated export solutions ensuring optimal bioactive potency compliant with international pharmacopoeias, offering stable year-round supplies and flexible packing.'}
                  </p>

                  <ul className="list space-y-3 font-bold text-[#1F242C] text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#5B9B37] shrink-0" />
                      <span>{language === 'ar' ? 'زراعة تعاقدية مباشرة في أخصب أراضي حوض النيل' : 'Direct origin contracting from fertile Nile Valley basins'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#5B9B37] shrink-0" />
                      <span>{language === 'ar' ? 'فرز ضوئي بالليزر وغربلة مغناطيسية متعددة المراحل' : 'Multi-stage optical color sorting & magnetic metal separation'}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#5B9B37] shrink-0" />
                      <span>{language === 'ar' ? 'شهادات تحليل COA وشهادات صحية نباتية لكل شحنة' : 'COA lab dossiers & Phytosanitary inspection per container'}</span>
                    </li>
                  </ul>

                  {/* Circular Progress Bars (SolarGlow circle-progress-bar-wrapper) */}
                  <div className="circle-progress-bar-wrapper pt-6 border-t border-gray-100 flex items-center gap-8">
                    {/* Circle 1 */}
                    <div className="single-circle-bar flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-full border-4 border-[#5B9B37] flex items-center justify-center bg-[#5B9B37]/10">
                        <span className="text-lg font-extrabold text-[#1F242C]">99.8%</span>
                      </div>
                      <div>
                        <h6 className="text-sm font-bold text-[#1F242C]">
                          {language === 'ar' ? 'معدل النقاء' : 'Optical Purity'} <br />
                          <span className="text-xs text-gray-500 font-normal">
                            {language === 'ar' ? 'والفرز بالليزر' : '& Cleanliness'}
                          </span>
                        </h6>
                      </div>
                    </div>

                    {/* Circle 2 */}
                    <div className="single-circle-bar flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-full border-4 border-[#F8BC26] flex items-center justify-center bg-[#F8BC26]/10">
                        <span className="text-lg font-extrabold text-[#1F242C]">100%</span>
                      </div>
                      <div>
                        <h6 className="text-sm font-bold text-[#1F242C]">
                          {language === 'ar' ? 'التسليم بالموانئ' : 'Port Delivery'} <br />
                          <span className="text-xs text-gray-500 font-normal">
                            {language === 'ar' ? 'في الموعد المحدد' : 'On-Time Schedule'}
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. PROJECT SECTION (Exact SolarGlow Home 2 - project-section seamless grid)
      ======================================================== */}
      <section className="project-section fix section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Box Header Card */}
            <div className="bg-[#1F242C] p-8 rounded-xl flex flex-col justify-between text-white shadow-xl">
              <div className="section-title mb-6">
                <span className="sub-title !text-[#F8BC26]">
                  {language === 'ar' ? 'مسارات التصدير العالمية' : 'Our Global Routes'}
                </span>
                <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight mt-2">
                  {language === 'ar' ? 'من موانئ مصر إلى العالم' : 'Time to grow with Noureslam'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'نشحن الحاويات الكاملة (FCL) والمجمعة (LCL) عبر موانئ الإسكندرية ودمياط وبورسعيد والسخنة إلى أكثر من 35 دولة.'
                  : 'Dispatching full container loads (FCL) from Alexandria and Damietta ports to 35+ global trading hubs.'}
              </p>
              <Link
                to="/export"
                className="theme-btn theme-color-2 w-fit"
              >
                <span>{language === 'ar' ? 'دليل الشحن واللوجستيات' : 'All Export Routes'}</span>
                <Arrow className="w-4 h-4" />
              </Link>
            </div>

            {/* Project Card 1: European Union */}
            <div className="project-thumb rounded-xl overflow-hidden group">
              <img
                src="/images/products/peppermint.jpg"
                alt="European Union Trade Route"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/category/herbs.jpg';
                }}
              />
              <div className="project-content">
                <p>{language === 'ar' ? 'الاتحاد الأوروبي' : 'European Union'}</p>
                <h4>Hamburg, Rotterdam, Marseille & Antwerp</h4>
              </div>
            </div>

            {/* Project Card 2: North America */}
            <div className="project-thumb rounded-xl overflow-hidden group">
              <img
                src="/images/products/chamomile.jpg"
                alt="North American Export Route"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/products/hibiscus.jpg';
                }}
              />
              <div className="project-content">
                <p>{language === 'ar' ? 'أمريكا الشمالية (FDA)' : 'USA & Canada (FDA)'}</p>
                <h4>New York, New Jersey, Los Angeles & Montreal</h4>
              </div>
            </div>

            {/* Project Card 3: Arab Gulf & Middle East */}
            <div className="project-thumb rounded-xl overflow-hidden group">
              <img
                src="/images/products/black_seeds.jpg"
                alt="Arab Gulf Export Route"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/category/seeds.jpg';
                }}
              />
              <div className="project-content">
                <p>{language === 'ar' ? 'الخليج العربي' : 'Arab Gulf & Middle East'}</p>
                <h4>Jebel Ali, Jeddah Islamic Port & Dammam</h4>
              </div>
            </div>

            {/* Project Card 4: Asian Markets */}
            <div className="project-thumb rounded-xl overflow-hidden group">
              <img
                src="/images/category/oils.jpg"
                alt="Asian Markets Export Route"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/products/lemon_grass.jpg';
                }}
              />
              <div className="project-content">
                <p>{language === 'ar' ? 'الأسواق الآسيوية' : 'Asian Hubs'}</p>
                <h4>Tokyo, Yokohama, Singapore & Port Klang</h4>
              </div>
            </div>

            {/* Project Card 5: UK & Eastern Europe */}
            <div className="project-thumb rounded-xl overflow-hidden group">
              <img
                src="/images/products/basil.jpg"
                alt="UK & Global Bulk Export"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/products/rosemary.jpg';
                }}
              />
              <div className="project-content">
                <p>{language === 'ar' ? 'المملكة المتحدة وشرق أوروبا' : 'United Kingdom & Eastern Europe'}</p>
                <h4>Felixstowe, Southampton & Koper</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. ABOUT COMPANY SECTION (Exact SolarGlow Home 2 - 4 Counters about-card-items)
      ======================================================== */}
      <section className="about-company-section fix section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center max-w-2xl mx-auto mb-14">
            <span className="sub-title">
              {language === 'ar' ? 'حقائق وأرقام' : 'About Our Scale'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight">
              {language === 'ar'
                ? 'أرقام تجسد الثقة والريادة الزراعية'
                : 'Reliable capacity built on decades of trust'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Counter 1 */}
            <div className="about-card-items">
              <div className="icon">
                <Leaf className="w-8 h-8" />
              </div>
              <div className="content">
                <h2>50+</h2>
                <p>{language === 'ar' ? 'محصولاً وزيتاً عِطرياً' : 'Botanical Crops & Oils'}</p>
              </div>
            </div>

            {/* Counter 2 */}
            <div className="about-card-items">
              <div className="icon">
                <Globe className="w-8 h-8" />
              </div>
              <div className="content">
                <h2>35+</h2>
                <p>{language === 'ar' ? 'دولة نصدر إليها بانتظام' : 'Export Destinations'}</p>
              </div>
            </div>

            {/* Counter 3 */}
            <div className="about-card-items">
              <div className="icon">
                <Boxes className="w-8 h-8" />
              </div>
              <div className="content">
                <h2>10,000+</h2>
                <p>{language === 'ar' ? 'طناً سعة تصديرية سنوية' : 'Tons Annual Capacity'}</p>
              </div>
            </div>

            {/* Counter 4 */}
            <div className="about-card-items">
              <div className="icon">
                <Award className="w-8 h-8" />
              </div>
              <div className="content">
                <h2>100%</h2>
                <p>{language === 'ar' ? 'مطابقة للمواصفات الدولية' : 'Organic & Pharmacopoeial Compliance'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CTA CONTACT SECTION (Exact SolarGlow Home 2 - cta-contact-section)
      ======================================================== */}
      <section className="cta-contact-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="cta-contact-wrapper flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="cta-contact-left max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug mb-6">
              {language === 'ar' ? (
                <>
                  جعلنا النقاء والشغف <br />
                  هما مادتنا الخام الأساسية
                </>
              ) : (
                <>
                  We made passion and purity <br />
                  our core raw materials
                </>
              )}
            </h2>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-4">
                <a
                  href="tel:+201554780003"
                  className="w-14 h-14 rounded-full bg-[#F8BC26] text-[#1F242C] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                  aria-label="Call Noureslam Export Desk"
                >
                  <Phone className="w-6 h-6" />
                </a>
                <div>
                  <p className="text-xs uppercase font-bold text-white/80">
                    {language === 'ar' ? 'اتصل بمكتب التصدير' : 'Call our export desk'}
                  </p>
                  <h5 className="text-lg font-extrabold text-white">
                    <a href="tel:+201554780003">+20 15 54780003</a>
                  </h5>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenQuote()}
                className="theme-btn theme-color-2"
              >
                <span>{language === 'ar' ? 'طلب عرض أسعار رسمي' : 'Request Official RFQ'}</span>
                <Arrow className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="contact-image shrink-0 hidden lg:block">
            <img
              src="/images/agriculture-healthy-food.jpg"
              alt="Noureslam Certified Harvest"
              className="w-72 h-72 object-cover rounded-2xl border-4 border-white shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          8. WORK PROCESS SECTION (Exact SolarGlow Home 2 - 4 work-process-box-items)
      ======================================================== */}
      <section className="work-process-section fix section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-title text-center max-w-2xl mx-auto mb-14">
            <span className="sub-title">
              {language === 'ar' ? 'مراحل العمل والتجهيز' : 'Work Process'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight">
              {language === 'ar'
                ? 'رحلة المحصول من التربة الخصبة إلى موانئ التصدير'
                : 'From Egyptian fertile soil to your warehouse'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="work-process-box-items">
              <div className="post-cat">STEP 01</div>
              <div className="icon-items">
                <div className="icon">
                  <Leaf className="w-6 h-6" />
                </div>
                <h5>{language === 'ar' ? 'الزراعة العضوية النظيفة' : 'Contracted Clean Cultivation'}</h5>
              </div>
              <p>
                {language === 'ar'
                  ? 'إشراف زراعي كامل في حوض النيل بمصر بدون مبيدات كيميائية مصنعة للحفاظ على نقاء التربة والمحصول.'
                  : 'Careful agronomy management under clean Egyptian sun, ensuring non-GMO, chemical-free raw harvest.'}
              </p>
              <Link to="/about" className="link-btn">
                <span>{language === 'ar' ? 'معرفة المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="work-process-box-items">
              <div className="post-cat">STEP 02</div>
              <div className="icon-items">
                <div className="icon">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h5>{language === 'ar' ? 'التجفيف الشمسي والآلي' : 'Controlled Curing & Drying'}</h5>
              </div>
              <p>
                {language === 'ar'
                  ? 'تجفيف محكوم يحمي الأوراق والزهور من التكسر، ويحافظ على لونها الأخضر الطبيعي وزيوتها العطرية.'
                  : 'Hygienic sun-curing on raised platforms and gentle mechanical dehydration preserving natural color and aroma.'}
              </p>
              <Link to="/about" className="link-btn">
                <span>{language === 'ar' ? 'معرفة المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="work-process-box-items">
              <div className="post-cat">STEP 03</div>
              <div className="icon-items">
                <div className="icon">
                  <Layers className="w-6 h-6" />
                </div>
                <h5>{language === 'ar' ? 'الفرز الضوئي بالليزر' : 'Optical Laser Grading'}</h5>
              </div>
              <p>
                {language === 'ar'
                  ? 'فرز بأحدث كاميرات الألوان لفصل الشوائب، وغربلة دقيقة للمشاتل والمقاسات المطلوبة مع فحص مخبري شامل.'
                  : 'High-speed optical color sorting, air aspiration, magnetic traps, and rigorous laboratory screening.'}
              </p>
              <Link to="/about" className="link-btn">
                <span>{language === 'ar' ? 'معرفة المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 4 */}
            <div className="work-process-box-items">
              <div className="post-cat">STEP 04</div>
              <div className="icon-items">
                <div className="icon">
                  <Boxes className="w-6 h-6" />
                </div>
                <h5>{language === 'ar' ? 'التعبئة والشحن البحري' : 'Hermetic Ocean Dispatch'}</h5>
              </div>
              <p>
                {language === 'ar'
                  ? 'تعبئة في أكياس كرافت مبطنة ومقاومة للرطوبة، وتجهيز الحاويات وشحنها بأسرع خطوط الملاحة العالمية.'
                  : 'Multi-ply hermetic barrier bags, palletized nitrogen blanketing, and fast vessel dispatch from Alexandria.'}
              </p>
              <Link to="/export" className="link-btn">
                <span>{language === 'ar' ? 'معرفة المزيد' : 'Read More'}</span>
                <Arrow className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. FAQ SECTION 2 (Exact SolarGlow Home 2 - faq-section-2)
      ======================================================== */}
      <section className="faq-section-2 fix section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* FAQ Accordion Left */}
            <div className="lg:col-span-7">
              <div className="section-title mb-8">
                <span className="sub-title">
                  {language === 'ar' ? 'الأسئلة الشائعة' : "Some FAQ's"}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight leading-tight">
                  {language === 'ar'
                    ? 'إجابات مباشرة على استفسارات الاستيراد والتصدير'
                    : 'Clear answers for international botanical buyers'}
                </h2>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1F242C] hover:text-[#5B9B37] bg-gray-50 transition-colors"
                      >
                        <span className={isRTL ? 'text-right' : 'text-left'}>
                          {language === 'ar' ? item.q_ar : item.q_en}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-[#5B9B37]' : 'text-gray-400'
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="p-6 bg-white border-t border-gray-100 text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {language === 'ar' ? item.a_ar : item.a_en}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* FAQ Right Photo */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src="/images/agriculture-healthy-food.jpg"
                  alt="Quality assurance in agriculture"
                  className="w-full h-[480px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. CONTACT SECTION 2 (Exact SolarGlow Home 2 - contact-section-2 Form)
      ======================================================== */}
      <section className="contact-section-2 section-padding bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                <img
                  src="/images/lab.jpg"
                  alt="Contact Noureslam Export Management"
                  className="w-full h-[520px] object-cover"
                />
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="section-title mb-6">
                <span className="sub-title">
                  {language === 'ar' ? 'تواصل معنا' : 'Get in touch'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight">
                  {language === 'ar'
                    ? 'اطلب عرض أسعار رسمي لشحنتك القادمة'
                    : 'Request commercial quotation & harvest specs'}
                </h2>
              </div>

              {formSubmitted ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-bold flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
                  <span>
                    {language === 'ar'
                      ? 'شكراً لك! تم استلام طلبك بنجاح وسيتواصل معك فريق التصدير خلال 24 ساعة.'
                      : 'Thank you! Your quotation request has been received. Our export team will reply within 24 hours.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        {language === 'ar' ? 'الاسم الكامل' : 'Your Name'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5B9B37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Business Email'} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={language === 'ar' ? 'name@company.com' : 'name@company.com'}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5B9B37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        {language === 'ar' ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 890"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5B9B37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        {language === 'ar' ? 'المحصول أو الزيت المطلوب' : 'Botanical Crop or Oil'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={language === 'ar' ? 'مثال: بابونج، حبة البركة، نعناع...' : 'e.g. Chamomile, Black Seed Oil, Basil'}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5B9B37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      {language === 'ar' ? 'تفاصيل الطلب والكمية وميناء الوصول' : 'Order Quantity & Destination Port'} *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        language === 'ar'
                          ? 'اذكر الكمية التقريبية، رتبة النقاء، وشروط الشحن المطلوبة (FOB / CIF)...'
                          : 'Mention required tonnage, purity cut, target delivery date and destination port...'
                      }
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#5B9B37]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="theme-btn"
                  >
                    <span>{language === 'ar' ? 'إرسال طلب التسعير الآن' : 'Submit Quotation Request'}</span>
                    <Send className="w-4 h-4 text-[#F8BC26]" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          12. NEWS SECTION 2 (Exact SolarGlow Home 2 - news-box-items Accreditations)
      ======================================================== */}
      <section className="news-section-2 fix section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="section-title mb-0">
              <span className="sub-title">
                {language === 'ar' ? 'معايير الجودة والاعتمادات' : 'Certifications & News'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F242C] tracking-tight">
                {language === 'ar'
                  ? 'اعتمادات دولية تضمن دخول محاصيلنا لكافة الموانئ'
                  : 'International accreditations supporting every container'}
              </h2>
            </div>

            <Link to="/certificates" className="theme-btn theme-color-2">
              <span>{language === 'ar' ? 'عرض جميع الشهادات' : 'All Certificates'}</span>
              <Arrow className="w-4 h-4 text-[#1F242C]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Box 1 */}
            <div className="news-box-items">
              <div className="news-image">
                <img src="/images/certificates/fssc.jpg" alt="ISO 22000 & HACCP" />
              </div>
              <div className="news-content">
                <div className="cat">{language === 'ar' ? 'سلامة الغذاء' : 'Food Safety'}</div>
                <div className="text-xs text-gray-500 font-bold mb-2">
                  <span>ISO 22000 • HACCP • FSSC</span>
                </div>
                <h3>
                  <Link to="/certificates">
                    {language === 'ar'
                      ? 'نظام إدارة سلامة الغذاء وتحليل المخاطر المعتمد دولياً'
                      : 'Certified Food Safety & HACCP Critical Controls'}
                  </Link>
                </h3>
                <Link to="/certificates" className="link-btn">
                  <span>{language === 'ar' ? 'عرض الاعتماد' : 'Read More'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* News Box 2 */}
            <div className="news-box-items">
              <div className="news-image">
                <img src="/images/certificates/fda.jpg" alt="US FDA Registration" />
              </div>
              <div className="news-content">
                <div className="cat">{language === 'ar' ? 'التسجيل الأمريكي' : 'US FDA'}</div>
                <div className="text-xs text-gray-500 font-bold mb-2">
                  <span>US FDA Registered • FSMA Audited</span>
                </div>
                <h3>
                  <Link to="/certificates">
                    {language === 'ar'
                      ? 'تسجيل رسمي للمنشأة والمحاصيل لدى هيئة الغذاء والدواء الأمريكية'
                      : 'US FDA Facility Registered & FSMA Compliant'}
                  </Link>
                </h3>
                <Link to="/certificates" className="link-btn">
                  <span>{language === 'ar' ? 'عرض الاعتماد' : 'Read More'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* News Box 3 */}
            <div className="news-box-items">
              <div className="news-image">
                <img src="/images/certificates/brcgs.jpg" alt="EU & USDA Organic" />
              </div>
              <div className="news-content">
                <div className="cat">{language === 'ar' ? 'الإنتاج العضوي' : 'EU / USDA Organic'}</div>
                <div className="text-xs text-gray-500 font-bold mb-2">
                  <span>EU 2018/848 • USDA NOP</span>
                </div>
                <h3>
                  <Link to="/certificates">
                    {language === 'ar'
                      ? 'شهادات الزراعة العضوية الأوروبية والأمريكية المعتمدة'
                      : 'Certified Organic Herbs, Oils & Culinary Botanicals'}
                  </Link>
                </h3>
                <Link to="/certificates" className="link-btn">
                  <span>{language === 'ar' ? 'عرض الاعتماد' : 'Read More'}</span>
                  <Arrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
