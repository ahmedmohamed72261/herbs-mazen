import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  Globe,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t.nav.home || 'Home', path: '/' },
    { name: t.nav.about || 'About Us', path: '/about' },
    { name: t.nav.products || 'Products', path: '/products' },
    { name: t.nav.certificates || (language === 'ar' ? 'الشهادات' : 'Certificates'), path: '/certificates' },
    { name: t.nav.export || 'Export', path: '/export' },
    { name: t.nav.contact || 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="w-full z-40">
      {/* Top Bar - SolarGlow Header Top Style */}
      <div className="bg-[#1F242C] text-gray-300 text-xs border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          {/* Contact Details */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+201554780003"
              className="flex items-center gap-1.5 hover:text-[#5B9B37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#5B9B37]" />
              <span>+20 15 54780003</span>
            </a>
            <a
              href="mailto:sales@noureslamherbs.com"
              className="flex items-center gap-1.5 hover:text-[#5B9B37] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#5B9B37]" />
              <span>sales@noureslamherbs.com</span>
            </a>
            <div className="flex items-center gap-1.5 text-gray-400 hidden lg:flex">
              <MapPin className="w-3.5 h-3.5 text-[#F8BC26]" />
              <span>{language === 'ar' ? 'بني سويف والقاهرة، جمهورية مصر العربية' : 'Beni Suef & Cairo, Egypt'}</span>
            </div>
          </div>

          {/* Top Right: Working Hours & Language Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-400 hidden xl:flex">
              <Clock className="w-3.5 h-3.5 text-[#5B9B37]" />
              <span>{language === 'ar' ? 'الإثنين - الجمعة: 09:00 ص - 05:00 م' : 'Mon - Fri: 09am - 05pm (GMT+2)'}</span>
            </div>

            {/* Language Switcher Button */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/10">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${language === 'en'
                    ? 'bg-[#5B9B37] text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2.5 py-0.5 rounded-full font-bold transition-all ${language === 'ar'
                    ? 'bg-[#5B9B37] text-white shadow-sm'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <nav
        className={`w-full bg-white transition-all duration-300 ${isScrolled
            ? 'sticky top-0 shadow-lg border-b border-gray-100 py-3'
            : 'border-b border-gray-100 py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo variant="dark" size="md" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${isActive
                      ? 'text-[#5B9B37] font-bold bg-[#5B9B37]/10'
                      : 'text-gray-700 hover:text-[#5B9B37] hover:bg-gray-50'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#5B9B37] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Language switch */}
            <div className="md:hidden flex items-center bg-gray-100 rounded-full p-0.5 text-xs">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="px-2 py-1 font-bold text-gray-700 hover:text-[#5B9B37] flex items-center gap-1"
              >
                <Globe className="w-3.5 h-3.5 text-[#5B9B37]" />
                <span>{language === 'en' ? 'عربي' : 'EN'}</span>
              </button>
            </div>

            {/* SolarGlow Get A Quote CTA button (Desktop only, mobile has it inside drawer) */}
            <div className="hidden lg:block">
              <button
                onClick={onOpenQuote}
                className="theme-btn !py-2.5 !px-5 !text-xs sm:!text-sm uppercase tracking-wider"
              >
                <span>{language === 'ar' ? 'طلب عرض سعر' : 'Get A Quote'}</span>
                <Arrow className="w-4 h-4 text-[#F8BC26]" />
              </button>
            </div>

            {/* Hamburger Toggle - Always visible and prominent on mobile & tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-lg bg-[#5B9B37] hover:bg-[#4a802d] text-white flex items-center justify-center transition-all shadow-md shrink-0 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Drawer - SolarGlow style */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
          />

          {/* Drawer Menu */}
          <div
            className="fixed inset-y-0 end-0 w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 p-6 overflow-y-auto animate-in fade-in duration-300"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <Logo variant="dark" size="sm" showSubtitle={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="py-4 space-y-1 flex-grow">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${isActive
                        ? 'bg-[#5B9B37] text-white shadow-sm'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-[#5B9B37]'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="theme-btn-clip w-full py-3 bg-[#5B9B37] hover:bg-[#4b822c] text-white rounded-lg text-sm font-bold shadow-md shadow-[#5B9B37]/30 flex items-center justify-center gap-2"
              >
                <span>{language === 'ar' ? 'طلب عرض سعر سريع' : 'Get A Quote'}</span>
                <Arrow className="w-4 h-4 text-[#F8BC26]" />
              </button>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold ${language === 'en'
                      ? 'bg-[#1F242C] text-white'
                      : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('ar')}
                  className={`px-4 py-1.5 rounded-md text-xs font-bold ${language === 'ar'
                      ? 'bg-[#1F242C] text-white'
                      : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  العربية
                </button>
              </div>

              <div className="text-[11px] text-gray-500 text-center pt-2">
                <p>+20 15 54780003</p>
                <p>sales@noureslamherbs.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

