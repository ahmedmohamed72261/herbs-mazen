import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Sparkles,
  X,
  ShieldCheck,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  Leaf,
  Sprout,
  Flame,
  Flower2,
  Droplets,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  MessageCircle,
  FileCheck,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import type { Product, Category } from '../types';

import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

interface ProductsPageProps {
  onOpenQuote: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenQuote }) => {
  const { language, isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;
  const Chevron = isRTL ? ChevronLeft : ChevronRight;

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [activeForm, setActiveForm] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  const products: Product[] = productsData as unknown as Product[];
  const categories: Category[] = categoriesData as Category[];

  // Sync category param from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveForm('all');
    setSortBy('default');
    handleCategoryChange('all');
  };

  // Helper icon for category slug
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'all':
        return LayoutGrid;
      case 'oils':
        return Droplets;
      case 'herbs':
        return Leaf;
      case 'seeds':
        return Sprout;
      case 'spices':
        return Flame;
      case 'dried-flowers':
        return Flower2;
      case 'botanicals':
        return ShieldCheck;
      default:
        return Leaf;
    }
  };

  // Calculate dynamic product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const slug = p.category?.slug;
      if (slug) {
        counts[slug] = (counts[slug] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // Form options definitions
  const formOptions = [
    { id: 'all', label_en: 'All Formats', label_ar: 'كافة الأشكال والتجهيزات' },
    { id: 'oil', label_en: 'Pure & Cold-Pressed Oils', label_ar: 'زيوت نقية ومعصورة' },
    { id: 'cut', label_en: 'Cut, Rubbed & T.B.C.', label_ar: 'مفروم ومجروش (T.B.C)' },
    { id: 'seeds', label_en: 'Whole Selected Seeds', label_ar: 'بذور كاملة منتقاة' },
    { id: 'flowers', label_en: 'Whole Flowers & Calyces', label_ar: 'زهور وبراعم كاملة' },
    { id: 'powder', label_en: 'Micronized Powder', label_ar: 'مسحوق ناعم (Powder)' },
  ];

  // Filtered and sorted products logic
  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      // 1. Category check
      const matchesCategory =
        activeCategory === 'all' || item.category?.slug === activeCategory;

      // 2. Search check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name_en.toLowerCase().includes(q) ||
        item.name_ar.toLowerCase().includes(q) ||
        (item.latin_name && item.latin_name.toLowerCase().includes(q)) ||
        (item.short_description_en && item.short_description_en.toLowerCase().includes(q)) ||
        (item.short_description_ar && item.short_description_ar.toLowerCase().includes(q)) ||
        (item.form && item.form.toLowerCase().includes(q));

      // 3. Form check
      let matchesForm = true;
      if (activeForm !== 'all') {
        const itemForm = (item.form || '').toLowerCase();
        const catSlug = item.category?.slug || '';

        if (activeForm === 'oil') {
          matchesForm = catSlug === 'oils' || itemForm.includes('oil');
        } else if (activeForm === 'cut') {
          matchesForm =
            itemForm.includes('cut') ||
            itemForm.includes('rubbed') ||
            itemForm.includes('crushed') ||
            itemForm.includes('t.b.c') ||
            itemForm.includes('flakes');
        } else if (activeForm === 'seeds') {
          matchesForm = catSlug === 'seeds' || itemForm.includes('seed');
        } else if (activeForm === 'flowers') {
          matchesForm =
            catSlug === 'dried-flowers' ||
            itemForm.includes('flower') ||
            itemForm.includes('calyces') ||
            itemForm.includes('bud') ||
            itemForm.includes('petal');
        } else if (activeForm === 'powder') {
          matchesForm = itemForm.includes('powder') || itemForm.includes('mesh');
        }
      }

      return matchesCategory && matchesSearch && matchesForm;
    });

    // Sorting
    if (sortBy === 'name-asc') {
      result = [...result].sort((a, b) => {
        const nameA = language === 'ar' ? a.name_ar : a.name_en;
        const nameB = language === 'ar' ? b.name_ar : b.name_en;
        return nameA.localeCompare(nameB, language === 'ar' ? 'ar' : 'en');
      });
    } else if (sortBy === 'name-desc') {
      result = [...result].sort((a, b) => {
        const nameA = language === 'ar' ? a.name_ar : a.name_en;
        const nameB = language === 'ar' ? b.name_ar : b.name_en;
        return nameB.localeCompare(nameA, language === 'ar' ? 'ar' : 'en');
      });
    } else if (sortBy === 'purity') {
      result = [...result].sort((a, b) => {
        const getPurity = (p: Product) => {
          const match = (p.purity || '').match(/(\d+(\.\d+)?)/);
          return match ? parseFloat(match[0]) : 0;
        };
        return getPurity(b) - getPurity(a);
      });
    }

    return result;
  }, [products, activeCategory, searchQuery, activeForm, sortBy, language]);

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'all') count++;
    if (searchQuery.trim()) count++;
    if (activeForm !== 'all') count++;
    if (sortBy !== 'default') count++;
    return count;
  }, [activeCategory, searchQuery, activeForm, sortBy]);

  // Find active category label
  const activeCategoryObj = useMemo(() => {
    if (activeCategory === 'all') {
      return {
        name_en: 'All Botanical Crops',
        name_ar: 'كافة المحاصيل والزيوت',
      };
    }
    return categories.find((c) => c.slug === activeCategory) || {
      name_en: activeCategory,
      name_ar: activeCategory,
    };
  }, [categories, activeCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFC]">
      {/* 1. SolarGlow Breadcrumb Banner */}
      <Breadcrumb
        title={language === 'ar' ? 'فهرس المحاصيل والزيوت التصديرية' : 'Botanical Crops & Essential Oils'}
        subtitle={
          language === 'ar'
            ? 'أعشاب ونباتات طبية • زيوت نقية • بذور عطرية • زهور مجففة معتمدة دولياً'
            : 'Certified Organic Herbs, Steam-Distilled Essential Oils & Machine-Cleaned Seeds'
        }
        items={[{ label: language === 'ar' ? 'المنتجات' : 'Products' }]}
        bgImage="/images/hero-section.jpg"
      />

      {/* 2. Main Catalog & Filter Section */}
      <section className="py-10 md:py-16 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Quick Horizontal Category Carousel / Chips Bar (Accessible on both Desktop & Mobile) */}
          <div className="mb-8">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#5B9B37]" />
                <span>{language === 'ar' ? 'تصفح سريع حسب التصنيف:' : 'Quick Category Selection:'}</span>
              </span>
              {activeCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className="text-xs font-bold text-[#5B9B37] hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'ar' ? 'عرض الكل' : 'View All'}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin no-scrollbar">
              {/* All Category Pill */}
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2.5 rounded-md text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all duration-200 border ${activeCategory === 'all'
                  ? 'bg-[#5B9B37] text-white border-[#5B9B37] shadow-sm'
                  : 'bg-white text-[#1F242C] border-gray-200 hover:border-[#5B9B37] hover:bg-green-50/40'
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'كافة المنتجات' : 'All Products'}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {categoryCounts['all']}
                </span>
              </button>

              {/* Dynamic Category Pills */}
              {categories.map((cat) => {
                const IconComponent = getCategoryIcon(cat.slug);
                const isActive = activeCategory === cat.slug;
                const count = categoryCounts[cat.slug] || 0;
                const isOils = cat.slug === 'oils';

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`px-4 py-2.5 rounded-md text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all duration-200 border ${isActive
                      ? 'bg-[#5B9B37] text-white border-[#5B9B37] shadow-sm'
                      : isOils
                        ? 'bg-amber-50/60 text-[#1F242C] border-amber-200 hover:border-[#F8BC26] hover:bg-amber-100/50'
                        : 'bg-white text-[#1F242C] border-gray-200 hover:border-[#5B9B37] hover:bg-green-50/40'
                      }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isOils ? 'text-[#F8BC26]' : 'text-[#5B9B37]'
                        }`}
                    />
                    <span>{language === 'ar' ? cat.name_ar : cat.name_en}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-full ${isActive
                        ? 'bg-white/20 text-white'
                        : isOils
                          ? 'bg-amber-200/60 text-amber-900'
                          : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Top Control Bar: Search Input, Processing Form & Sorting */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200/80 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative w-full md:w-80 lg:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'ابحث باسم المحصول أو الاسم اللاتيني...'
                    : 'Search crop, oil or Latin name...'
                }
                className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg py-2.5 ps-10 pe-10 text-xs sm:text-sm text-[#1F242C] focus:outline-none focus:border-[#5B9B37] focus:bg-white transition-all placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute top-3.5 start-3 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-3 end-3 text-gray-400 hover:text-gray-700"
                  aria-label="Clear Search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right: Results Count, Processing Form Dropdown & Sort */}
            <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
              {/* Form Option Selector */}
              <select
                value={activeForm}
                onChange={(e) => setActiveForm(e.target.value)}
                className="bg-[#F8F9FA] border border-gray-200 text-xs font-bold text-[#1F242C] py-2 px-3 rounded-lg focus:outline-none focus:border-[#5B9B37] cursor-pointer"
              >
                {formOptions.map((form) => (
                  <option key={form.id} value={form.id}>
                    {language === 'ar' ? form.label_ar : form.label_en}
                  </option>
                ))}
              </select>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-bold hidden sm:flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#5B9B37]" />
                  <span>{language === 'ar' ? 'الترتيب:' : 'Sort:'}</span>
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F9FA] border border-gray-200 text-xs font-bold text-[#1F242C] py-2 px-3 rounded-lg focus:outline-none focus:border-[#5B9B37] cursor-pointer"
                >
                  <option value="default">{language === 'ar' ? 'المميز والأكثر طلباً' : 'Featured First'}</option>
                  <option value="name-asc">{language === 'ar' ? 'الاسم أبجدياً (أ - ي)' : 'Name (A to Z)'}</option>
                  <option value="name-desc">{language === 'ar' ? 'الاسم أبجدياً (ي - أ)' : 'Name (Z to A)'}</option>
                  <option value="purity">{language === 'ar' ? 'الأعلى نقاءً (99%+)' : 'Highest Purity'}</option>
                </select>
              </div>

              {/* Count Badge */}
              <div className="text-xs font-extrabold flex items-center gap-1.5 px-3 py-2 bg-green-50 text-[#15803D] rounded-lg border border-green-200/60 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#5B9B37]" />
                <span>
                  {language === 'ar'
                    ? `عرض ${filteredProducts.length} من ${products.length}`
                    : `${filteredProducts.length} of ${products.length}`}
                </span>
              </div>
            </div>
          </div>

          {/* Full-Width Catalog Main */}
          <main className="w-full">

              {/* Active Filter Tags Bar (if any filters active) */}
              {activeFiltersCount > 0 && (
                <div className="mb-6 flex flex-wrap items-center gap-2 p-3 bg-white border border-gray-200/80 rounded-md">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider me-1">
                    {language === 'ar' ? 'الفلاتر النشطة:' : 'Active Filters:'}
                  </span>

                  {/* Active Category Tag */}
                  {activeCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-[#15803D] border border-green-200 text-xs font-bold rounded">
                      <span>{language === 'ar' ? activeCategoryObj.name_ar : activeCategoryObj.name_en}</span>
                      <button
                        type="button"
                        onClick={() => handleCategoryChange('all')}
                        className="hover:text-green-900"
                        aria-label="Remove category filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Active Form Tag */}
                  {activeForm !== 'all' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded">
                      <span>
                        {formOptions.find((f) => f.id === activeForm)?.[language === 'ar' ? 'label_ar' : 'label_en']}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveForm('all')}
                        className="hover:text-blue-900"
                        aria-label="Remove form filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Active Search Tag */}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded">
                      <span>&quot;{searchQuery}&quot;</span>
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="hover:text-amber-900"
                        aria-label="Remove search query"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {/* Clear All Button */}
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline ms-auto flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{language === 'ar' ? 'إلغاء كافة الفلاتر' : 'Reset All'}</span>
                  </button>
                </div>
              )}

              {/* Empty State */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-md p-12 sm:p-16 text-center shadow-sm border border-gray-200 max-w-lg mx-auto my-6">
                  <div className="w-16 h-16 bg-green-50 text-[#5B9B37] rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-[#1F242C] mb-2">
                    {language === 'ar' ? 'لم يتم العثور على محاصيل مطابقة' : 'No Botanical Crops Found'}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-6 leading-relaxed">
                    {language === 'ar'
                      ? 'لا توجد محاصيل تطابق معايير البحث أو الفلتر المحددة. جرب كلمة بحث أخرى أو أعد ضبط الفلتر.'
                      : 'No botanical crops match your current filter parameters. Try another keyword or clear the active filters.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="theme-btn theme-color-2 mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{language === 'ar' ? 'إعادة ضبط كل الفلاتر' : 'Reset All Filters'}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRequestQuote={(name) => onOpenQuote(name)}
                    />
                  ))}
                </div>
              )}
            </main>
        </div>
      </section>

    </div>
  );
};
