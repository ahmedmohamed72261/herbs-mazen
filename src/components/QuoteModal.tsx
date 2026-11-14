import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Phone, Building2, Globe2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, productName = '' }) => {
  const { language, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    product: productName,
    quantity: '',
    message: '',
  });

  // Update product if prop changes
  React.useEffect(() => {
    if (productName) {
      setFormData(prev => ({ ...prev, product: productName }));
    }
  }, [productName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header - SolarGlow style dark with green accent */}
        <div className="bg-[#1F242C] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#5B9B37]">
          <div>
            <span className="inline-block text-[#F8BC26] text-xs font-semibold uppercase tracking-wider mb-1">
              {language === 'ar' ? 'طلب عرض أسعار فوري' : 'Direct Export Quotation'}
            </span>
            <h3 className="text-xl font-bold tracking-tight">
              {language === 'ar' ? 'طلب تسعير وشحنات الأعشاب' : 'Request a Custom Wholesale Quote'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#5B9B37] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">
                {language === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Quotation Request Received!'}
              </h4>
              <p className="text-gray-600 max-w-md mx-auto">
                {language === 'ar'
                  ? 'سيتواصل معك فريق التصدير الدولي في غضون ساعتين مع عرض السعر والمواصفات الفنية.'
                  : 'Our international sales desk will contact you within 2 hours with official FOB/CIF pricing and lab specification sheets.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'ar' ? 'مثال: أحمد محمد' : 'e.g. John Miller'}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'البريد الإلكتروني للعمل *' : 'Corporate Email *'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="buyer@company.com"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm"
                    />
                    <Mail className={`w-4 h-4 text-gray-400 absolute top-3.5 ${isRTL ? 'left-3' : 'right-3'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'رقم الهاتف / واتساب *' : 'Phone / WhatsApp *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm"
                    />
                    <Phone className={`w-4 h-4 text-gray-400 absolute top-3.5 ${isRTL ? 'left-3' : 'right-3'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'اسم الشركة *' : 'Company Name *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder={language === 'ar' ? 'شركة الاستيراد أو التصنيع' : 'Trading / Packing Co.'}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm"
                    />
                    <Building2 className={`w-4 h-4 text-gray-400 absolute top-3.5 ${isRTL ? 'left-3' : 'right-3'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'بلد الوصول / ميناء التفريغ *' : 'Destination Country / Port *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      placeholder={language === 'ar' ? 'مثال: ألمانيا (ميناء هامبورغ)' : 'e.g. Germany (Hamburg Port)'}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm"
                    />
                    <Globe2 className={`w-4 h-4 text-gray-400 absolute top-3.5 ${isRTL ? 'left-3' : 'right-3'}`} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    {language === 'ar' ? 'الكمية التقديرية (طن / حاوية)' : 'Estimated Quantity (MT / FCL)'}
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder={language === 'ar' ? 'مثال: 1 حاوية 40 قدم (18 طن)' : 'e.g. 1x 40ft HQ Container (18 MT)'}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {language === 'ar' ? 'المحصول أو المنتجات المطلوبة' : 'Botanical Products of Interest'}
                </label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={e => setFormData({ ...formData, product: e.target.value })}
                  placeholder={language === 'ar' ? 'مثال: ريحان مجفف، بابونج، ينسون، شمر' : 'e.g. Organic Basil Leaves, Chamomile, Aniseed, Fennel'}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  {language === 'ar' ? 'المتطلبات الخاصة أو الاستفسار' : 'Specific Requirements / Inquiries'}
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'ar' ? 'المواصفات المطلوبة، شهادات التحليل، التعبئة، إلخ...' : 'Purity specs, mesh size, packing preference (sacks/bulk), required certificates...'}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5B9B37] focus:ring-2 focus:ring-[#5B9B37]/20 text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#5B9B37]" />
                <span>
                  {language === 'ar'
                    ? 'جميع المحاصيل حاصلة على شهادات فحص وتحليل معتمدة (ISO 22000, Organic EU/USDA).'
                    : '100% Certified Organic & Conventional crops with full COA and Phytosanitary certificates.'}
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="theme-btn w-full !py-3.5 !px-6 text-sm font-bold shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إرسال طلب التسعير المباشر' : 'Submit Quotation Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

