import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Package,
  MapPin,
  Calendar,
  Layers,
  Droplet,
  Award,
  Send,
  MessageCircle,
  Share2,
  Check,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';

import productsData from '../data/products.json';

interface ProductDetailPageProps {
  onOpenQuote: (productName?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onOpenQuote }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const products: Product[] = productsData as unknown as Product[];

  // Find product by id or slug
  const product = useMemo(() => {
    return products.find(
      (p) => String(p.id) === id || p.slug === id
    );
  }, [products, id]);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Suggested products from the same category
  const suggestedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.category?.slug === product.category?.slug)
      .slice(0, 4);
  }, [products, product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'المحصول غير موجود' : 'Product Not Found'}
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          {language === 'ar'
            ? 'لم نتمكن من العثور على المحصول المطلوب.'
            : 'We could not locate the requested botanical crop.'}
        </p>
        <Link
          to="/products"
          className="px-6 py-2.5 bg-[#5B9B37] text-white font-bold rounded-lg text-sm"
        >
          {language === 'ar' ? 'العودة لفهرس المحاصيل' : 'Back to Products'}
        </Link>
      </div>
    );
  }

  const title = language === 'ar' ? product.name_ar : product.name_en;
  const description = language === 'ar'
    ? product.description_ar || product.short_description_ar
    : product.description_en || product.short_description_en;

  const categoryName = product.category
    ? (language === 'ar' ? product.category.name_ar : product.category.name_en)
    : (language === 'ar' ? 'أعشاب ونباتات' : 'Herbal Botanicals');

  const currentImage = selectedImage || product.image || '/images/hero-section.jpg';

  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(Array.isArray(product.images) ? product.images : []),
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappUrl = `https://wa.me/20109674257?text=${encodeURIComponent(
    language === 'ar'
      ? `مرحباً، أود الاستفسار من شركة نور الإسلام للأعشاب عن عرض سعر وتفاصيل شحن محصول: ${title}`
      : `Hello Noureslam Herbs team, I would like to inquire about specifications and shipping for: ${title}`
  )}`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb Header */}
      <Breadcrumb
        title={title}
        subtitle={categoryName}
        items={[
          { label: language === 'ar' ? 'المنتجات' : 'Products', href: '/products' },
          { label: title },
        ]}
        bgImage="/images/hero-section.jpg"
      />

      {/* Main Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Gallery Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm group">
                <img
                  src={currentImage}
                  alt={title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/hero-section.jpg';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Lightbox Trigger Button */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute bottom-3 right-3 p-2.5 bg-black/60 hover:bg-[#5B9B37] text-white rounded-lg backdrop-blur-sm transition-colors"
                  aria-label="View large image"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Purity Badge */}
                {product.purity && (
                  <span className="absolute top-3 right-3 bg-[#5B9B37] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{language === 'ar' ? `نقاء ${product.purity}` : `${product.purity} Purity`}</span>
                  </span>
                )}
              </div>

              {/* Thumbnails if multiple */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        currentImage === img
                          ? 'border-[#5B9B37] ring-2 ring-[#5B9B37]/30'
                          : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Latin Botanical Nomenclature */}
              {product.latin_name && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-800 block mb-0.5">
                    {language === 'ar' ? 'الاسم النباتي اللاتيني المعتمد:' : 'Botanical Latin Nomenclature:'}
                  </span>
                  <span className="italic font-bold text-sm text-emerald-950">
                    {product.latin_name}
                  </span>
                </div>
              )}
            </div>

            {/* Content & Specifications Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F8BC26] bg-[#1F242C] px-3 py-1 rounded-full">
                  {categoryName}
                </span>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#5B9B37] p-2 bg-gray-100 rounded-lg transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'مشاركة' : 'Share')}</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-heading">
                {title}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50/50">
                <div className="bg-[#1F242C] text-white px-5 py-3 text-xs sm:text-sm font-bold flex items-center justify-between">
                  <span>{language === 'ar' ? 'المواصفات الفنية ومؤشرات الجودة' : 'Technical Specifications & Quality Analysis'}</span>
                  <span className="text-[#5B9B37] text-xs font-semibold">100% Export-Grade</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-xs">
                  <div className="divide-y divide-gray-200">
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'درجة النقاء' : 'Purity Grade'}</span>
                      <span className="font-bold text-gray-900">{product.purity || '99.5% Min'}</span>
                    </div>
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'نسبة الرطوبة' : 'Moisture Content'}</span>
                      <span className="font-bold text-gray-900">{product.moisture || '< 8.0% Max'}</span>
                    </div>
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'الشكل والفرز' : 'Physical Form'}</span>
                      <span className="font-bold text-gray-900">{product.form || 'Leaves & Crushed Cut'}</span>
                    </div>
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'اللون الطبيعي' : 'Natural Color'}</span>
                      <span className="font-bold text-gray-900">{product.color || 'Natural Vibrant Green'}</span>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'بلد المنشأ' : 'Origin'}</span>
                      <span className="font-bold text-gray-900">{product.origin || 'Beni Suef, Nile Valley, Egypt'}</span>
                    </div>
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'فترة الصلاحية' : 'Shelf Life'}</span>
                      <span className="font-bold text-gray-900">{product.shelf_life || '24 Months in cool dry storage'}</span>
                    </div>
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'التعبئة القياسية' : 'Standard Packaging'}</span>
                      <span className="font-bold text-gray-900 text-right">{product.packaging || '20-25 kg Multi-Wall Kraft Sacks'}</span>
                    </div>
                    <div className="p-3.5 flex justify-between">
                      <span className="text-gray-500 font-medium">{language === 'ar' ? 'جاهزية الشحن' : 'Export Availability'}</span>
                      <span className="font-bold text-[#5B9B37]">{product.export_availability || 'Year-Round Bulk Dispatch'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications Badges */}
              {product.certifications && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    {language === 'ar' ? 'شهادات الجودة المعمول بها' : 'Accreditations & Certificates'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-bold"
                      >
                        <Check className="w-3.5 h-3.5 text-[#5B9B37]" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenQuote(title)}
                  className="theme-btn-clip flex-1 min-w-[200px] py-4 px-6 bg-[#5B9B37] hover:bg-[#4b822c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-[#5B9B37]/30 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#F8BC26]" />
                  <span>{language === 'ar' ? 'طلب عرض سعر FOB / CIF' : 'Request Official FOB/CIF Quote'}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{language === 'ar' ? 'محادثة واتساب سريعة' : 'Chat on WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Suggested / Related Products */}
          {suggestedProducts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[#5B9B37] text-xs font-bold uppercase tracking-wider block mb-1">
                    {language === 'ar' ? 'محاصيل ذات صلة' : 'Related Botanicals'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 font-heading">
                    {language === 'ar' ? 'محاصيل أخرى من نفس الفئة' : 'More Crops in this Category'}
                  </h3>
                </div>
                <Link
                  to="/products"
                  className="text-xs sm:text-sm font-bold text-[#5B9B37] hover:underline flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'عرض كل المحاصيل' : 'View Full Catalog'}</span>
                  <Arrow className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={(selected) => navigate(`/products/${selected.slug || selected.id}`)}
                    onRequestQuote={(name) => onOpenQuote(name)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-gray-300 p-2"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={currentImage}
            alt={title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

