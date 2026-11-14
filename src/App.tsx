import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { QuoteModal } from './components/QuoteModal';
import { Preloader } from './components/Preloader';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ExportPage } from './pages/ExportPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top upon page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState('');

  const handleOpenQuote = (productName = '') => {
    setSelectedQuoteProduct(productName);
    setQuoteModalOpen(true);
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Preloader />
        <div className="flex flex-col min-h-screen bg-white font-sans text-[#1F242C]">
          <Navbar onOpenQuote={() => handleOpenQuote()} />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
              <Route path="/about" element={<AboutPage onOpenQuote={() => handleOpenQuote()} />} />
              <Route path="/products" element={<ProductsPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/products/:id" element={<ProductDetailPage onOpenQuote={handleOpenQuote} />} />
              <Route path="/export" element={<ExportPage onOpenQuote={() => handleOpenQuote()} />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Legacy route redirects */}
              <Route path="/certificates" element={<CertificatesPage onOpenQuote={() => handleOpenQuote()} />} />
              <Route path="/catalog" element={<Navigate to="/products" replace />} />
              <Route path="/team" element={<Navigate to="/about" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating WhatsApp Action Button */}
          <WhatsAppFloat />

          {/* Global Quote Request Modal */}
          <QuoteModal
            isOpen={quoteModalOpen}
            onClose={() => setQuoteModalOpen(false)}
            productName={selectedQuoteProduct}
          />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
