import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BusinessInfoCard } from './components/BusinessInfoCard';
import { SolarCalculator } from './components/SolarCalculator';
import { ReviewsSection } from './components/ReviewsSection';
import { ServicesSection } from './components/ServicesSection';
import { AiAdvisor } from './components/AiAdvisor';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);
  const [calculatorPrefillData, setCalculatorPrefillData] = useState<{
    monthlyBill?: string;
    systemKw?: number;
    savings25Yr?: number;
  }>({});

  const handleOpenQuote = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateCalculator = () => {
    setActiveSection('calculator');
    const calcElement = document.getElementById('calculator');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuoteWithData = (data: { monthlyBill: string; systemKw: number; savings25Yr: number }) => {
    setCalculatorPrefillData(data);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#3D3D37] font-sans selection:bg-[#F2B035] selection:text-[#3D3D37]">
      
      {/* Navigation Header */}
      <Header
        onOpenQuote={handleOpenQuote}
        onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Banner Section */}
        <Hero
          onOpenQuote={handleOpenQuote}
          onNavigateCalculator={handleNavigateCalculator}
        />

        {/* Official Google Place Card & Location Details */}
        <BusinessInfoCard onOpenQuote={handleOpenQuote} />

        {/* Interactive Florida Solar Savings Estimator */}
        <SolarCalculator onOpenQuoteWithData={handleOpenQuoteWithData} />

        {/* Authentic Customer Reviews (4.3 Stars, 138 Reviews) */}
        <ReviewsSection />

        {/* Full Services Breakdown */}
        <ServicesSection onOpenQuote={handleOpenQuote} />

        {/* Photo Gallery */}
        <GallerySection />

        {/* Contact & Consultation Booking Form */}
        <ContactSection initialData={calculatorPrefillData} />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuote={handleOpenQuote}
        onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
      />

      {/* AI Solar Advisor Modal Drawer */}
      <AiAdvisor
        isOpen={aiAdvisorOpen}
        onClose={() => setAiAdvisorOpen(false)}
        onOpenQuote={handleOpenQuote}
      />

    </div>
  );
}
