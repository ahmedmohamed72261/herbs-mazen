import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Plus,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { language, isRTL, t } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  // 6 Real Egyptian crop images from herbs-sultan-v2
  const galleryImages = [
    { src: '/images/products/basil.jpg', alt: 'Sweet Basil' },
    { src: '/images/products/chamomile.jpg', alt: 'Golden Chamomile' },
    { src: '/images/products/peppermint.jpg', alt: 'Peppermint' },
    { src: '/images/products/fennel.jpg', alt: 'Fennel Seeds' },
    { src: '/images/products/anise.jpg', alt: 'Aniseed' },
    { src: '/images/products/hibiscus.jpg', alt: 'Hibiscus Flowers' },
  ];

  return (
    <footer className="footer-section footer-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-widgets-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Widget 1: Logo & Company Bio */}
            <div className="single-footer-widget">
              <div className="widget-head mb-6">
                <Logo variant="light" size="lg" />
              </div>

              <div className="footer-content">
                <p>
                  {language === 'ar'
                    ? 'نقدم حلول توريد الأعشاب والزيوت العطرية والنباتات الطبية والبذور بأسعار تنافسية تلبي اشتراطات الجودة ودساتير الأدوية العالمية من مزارع النيل إلى موانئ العالم.'
                    : 'To deliver botanical herbs, pure essential oils, and seeds that are competitively priced and meet worldwide pharmacopoeial quality standards, sourced from sustainable Egyptian farmlands.'}
                </p>

                {/* SolarGlow Circular Social Icons */}
                <div className="social-icon">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/20109674257" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Widget 2: Our Company Links */}
            <div className="single-footer-widget">
              <div className="widget-head">
                <h4>{language === 'ar' ? 'شركتنا' : 'Our Company'}</h4>
              </div>
              <ul className="list-area">
                <li>
                  <Link to="/about">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{t.nav.about || 'About Us'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{t.nav.products || 'Botanical Products'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/certificates">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{t.nav.certificates || (language === 'ar' ? 'الشهادات والاعتمادات' : 'Certificates & Quality')}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/export">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{t.nav.export || 'Worldwide Logistics'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{language === 'ar' ? 'التواصل وطلب الأسعار' : 'Contact & Inquiries'}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Widget 3: Categories & Oils */}
            <div className="single-footer-widget">
              <div className="widget-head">
                <h4>{language === 'ar' ? 'فئات المنتجات' : 'Product Categories'}</h4>
              </div>
              <ul className="list-area">
                <li>
                  <Link to="/products?category=oils">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span className="text-[#F8BC26] font-bold">{language === 'ar' ? 'الزيوت العطرية والطبية' : 'Essential & Pure Oils'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=herbs">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{language === 'ar' ? 'أعشاب ونباتات طبية' : 'Culinary & Medicinal Herbs'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=seeds">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{language === 'ar' ? 'بذور عطرية وزيتية' : 'Aromatic & Oil Seeds'}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=spices">
                    <Arrow className="w-3.5 h-3.5 text-[#5B9B37]" />
                    <span>{language === 'ar' ? 'توابل وبهارات كاملة' : 'Whole Dehydrated Spices'}</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Widget 4: SolarGlow 6-Image Thumbnail Gallery */}
            <div className="single-footer-widget">
              <div className="widget-head">
                <h4>{language === 'ar' ? 'معرض المحاصيل' : 'Crop Gallery'}</h4>
              </div>
              <div className="footer-gallery">
                <div className="gallery-wrap">
                  {galleryImages.map((img, idx) => (
                    <Link
                      to="/products"
                      key={idx}
                      className="gallery-item group block"
                      title={img.alt}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/breadcrumb.jpg';
                        }}
                      />
                      <div className="icon">
                        <Plus className="w-5 h-5" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SolarGlow Exact Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="footer-bottom-wrapper">
            <p>
              © <span className="font-bold">{language === 'ar' ? 'نور الإسلام للأعشاب' : 'NOURESLAM HERBS'}</span> {new Date().getFullYear()} |{' '}
              <span>{language === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</span>.
            </p>

            <ul className="footer-menu">
              <li>
                <Link to="/contact">{language === 'ar' ? 'الشروط والأحكام' : 'Terms'}</Link>
              </li>
              <li>
                <Link to="/certificates">{language === 'ar' ? 'سياسة الجودة' : 'Quality Policy'}</Link>
              </li>
              <li>
                <Link to="/export">{language === 'ar' ? 'الموانئ والتصدير' : 'Ocean Ports'}</Link>
              </li>
              <li>
                <Link to="/contact">{language === 'ar' ? 'المساعدة والدعم' : 'Need Help ?'}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
