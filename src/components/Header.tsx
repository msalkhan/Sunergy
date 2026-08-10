import React, { useState, useEffect } from 'react';
import { Sun, Phone, MapPin, Clock, Menu, X, ShieldCheck, Star } from 'lucide-react';
import { SUNERGY_BUSINESS } from '../data/sunergyData';

interface HeaderProps {
  onOpenQuote: () => void;
  onOpenAiAdvisor: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuote,
  onOpenAiAdvisor,
  activeSection,
  setActiveSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Compute live Florida status (Mon-Sat 9am-6pm)
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    const hour = now.getHours();
    if (day === 0) {
      setIsOpenNow(false);
    } else if (day === 6) {
      setIsOpenNow(hour >= 9 && hour < 16);
    } else {
      setIsOpenNow(hour >= 9 && hour < 18);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'calculator', label: 'Savings Calculator' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews (138)' },
    { id: 'about', label: 'About & Directions' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#3A3A2F] text-[#FCFAF7] shadow-md transition-all duration-300">
      {/* Top Utility Contact Bar */}
      <div className="bg-[#2A2A20] border-b border-[#4A4A3B] text-xs py-2 px-4 sm:px-8 text-[#E8E2D9]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="tel:+17273759375" 
              className="flex items-center gap-1.5 hover:text-[#F2B035] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#F2B035]" />
              <span>+1 727-375-9375</span>
            </a>
            <span className="hidden sm:inline text-[#5A5A4A]">|</span>
            <div className="hidden sm:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F2B035] shrink-0" />
              <span className="truncate max-w-xs md:max-w-md">540 NW University Blvd Ste 108, Port St. Lucie, FL 34986</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C8C2B8]" />
              <span className={`inline-block w-2 h-2 rounded-full ${isOpenNow ? 'bg-[#008A3D] animate-pulse' : 'bg-rose-400'}`} />
              <span className="font-semibold">{isOpenNow ? 'Open · Closes 6 PM' : 'Closed · Opens 9 AM'}</span>
            </div>
            <a 
              href="https://maps.google.com/?q=540+NW+University+Blvd+Ste+108,+Port+St.+Lucie,+FL+34986" 
              target="_blank" 
              rel="noreferrer"
              className="hidden md:inline-block text-[#F2B035] hover:underline text-xs font-semibold"
            >
              Directions ↗
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className={`px-4 sm:px-8 transition-all ${scrolled ? 'py-3 bg-[#3A3A2F]/95 backdrop-blur-md border-b border-[#4A4A3B]' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Branding */}
          <div 
            onClick={() => handleNavClick('overview')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F2B035] p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#3A3A2F] rounded-[10px] flex items-center justify-center">
                <Sun className="w-6 h-6 text-[#F2B035] animate-spin-slow" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl tracking-tight text-[#FCFAF7] group-hover:text-[#F2B035] transition-colors">
                  SUNERGY
                </span>
                <span className="text-[10px] font-bold bg-[#F2B035]/20 text-[#F2B035] border border-[#F2B035]/30 px-1.5 py-0.5 rounded">
                  FLORIDA
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#E8E2D9]">
                <div className="flex items-center text-[#F2B035]">
                  <Star className="w-3 h-3 fill-[#F2B035]" />
                  <span className="font-bold ml-0.5 text-[#FCFAF7]">4.3</span>
                  <span className="text-[#C8C2B8] ml-1">(138 reviews)</span>
                </div>
                <span>·</span>
                <span>Port St. Lucie</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#2A2A20]/80 p-1 rounded-full border border-[#4A4A3B]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#F2B035] text-[#3D3D37] shadow-sm'
                      : 'text-[#E8E2D9] hover:text-[#FCFAF7] hover:bg-[#4A4A3B]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAiAdvisor}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#F2B035]/50 text-[#F2B035] hover:bg-[#F2B035]/10 transition-all flex items-center gap-1.5"
            >
              <Sun className="w-3.5 h-3.5 text-[#F2B035]" />
              <span>AI Solar Assistant</span>
            </button>

            <button
              onClick={onOpenQuote}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] shadow-sm transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-[#3D3D37]" />
              <span>Get Free Solar Quote</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F2B035] text-[#3D3D37]"
            >
              Free Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#E8E2D9] hover:text-white rounded-lg bg-[#2A2A20]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#3A3A2F] border-b border-[#4A4A3B] px-4 py-4 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-[#F2B035] text-[#3D3D37] font-bold'
                    : 'text-[#E8E2D9] hover:bg-[#4A4A3B]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#4A4A3B] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiAdvisor();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-semibold border border-[#F2B035]/50 text-[#F2B035] bg-[#F2B035]/10 flex items-center justify-center gap-2"
            >
              <Sun className="w-4 h-4 text-[#F2B035]" />
              <span>Ask AI Solar Assistant</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 rounded-xl text-sm font-bold bg-[#F2B035] text-[#3D3D37] flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Get Free Solar Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

