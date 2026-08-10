import React, { useState } from 'react';
import { ShieldCheck, Star, Zap, Phone, MapPin, Calculator, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import heroImage from '../assets/images/sunergy_hero_solar_1786352720414.jpg';

interface HeroProps {
  onOpenQuote: () => void;
  onNavigateCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onNavigateCalculator }) => {
  const [quickBill, setQuickBill] = useState<number>(250);

  const estimatedYearlySavings = Math.round(quickBill * 12 * 0.75);
  const estimated25YrSavings = Math.round(estimatedYearlySavings * 25);

  return (
    <section id="overview" className="relative bg-[#3D3D37] text-[#FCFAF7] overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background Subtle Organic Texture Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2B035_1px,transparent_1px)] [background-size:28px_28px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-[#2A2A20]/90 border border-[#5A5A4A] px-3.5 py-1.5 rounded-full text-xs font-medium text-[#E8E2D9]">
              <div className="flex items-center text-[#F2B035]">
                <Star className="w-3.5 h-3.5 fill-[#F2B035]" />
                <span className="font-bold ml-1 text-[#FCFAF7]">4.3</span>
              </div>
              <span className="text-[#8A8A7A]">·</span>
              <span className="font-semibold text-[#FCFAF7]">138 Verified Google Reviews</span>
              <span className="text-[#F2B035] font-bold hidden sm:inline">Port St. Lucie, FL</span>
            </div>

            {/* Headline with Serif Font */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FCFAF7] leading-tight tracking-tight">
                Power Your Home with <br className="hidden sm:inline" />
                <span className="text-[#F2B035]">
                  Hurricane-Rated Solar Energy
                </span>
              </h1>
              <p className="text-[#E8E2D9] text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
                Port St. Lucie’s premier local solar company. Custom rooftop installations engineered to withstand <span className="text-[#FCFAF7] font-semibold underline decoration-[#F2B035] decoration-2">160+ MPH hurricane winds</span>, lower your monthly FPL power bill, and qualify for the <span className="text-[#F2B035] font-semibold">30% Federal Clean Energy Tax Credit</span>.
              </p>
            </div>

            {/* Key Differentiators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#2A2A20]/80 border border-[#5A5A4A] p-3 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#F2B035] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#FCFAF7]">160+ MPH Rated</h2>
                  <p className="text-[11px] text-[#C8C2B8]">Hurricane Wind Tough</p>
                </div>
              </div>
              <div className="bg-[#2A2A20]/80 border border-[#5A5A4A] p-3 rounded-xl flex items-start gap-2.5">
                <Zap className="w-5 h-5 text-[#F2B035] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#FCFAF7]">$0 Down Options</h2>
                  <p className="text-[11px] text-[#C8C2B8]">Budget-Friendly Financing</p>
                </div>
              </div>
              <div className="bg-[#2A2A20]/80 border border-[#5A5A4A] p-3 rounded-xl flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <Award className="w-5 h-5 text-[#F2B035] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-xs font-bold text-[#FCFAF7]">25-Yr Warranty</h2>
                  <p className="text-[11px] text-[#C8C2B8]">Local Installation & Service</p>
                </div>
              </div>
            </div>

            {/* Quick Interactive FPL Bill Estimator Preview */}
            <div className="bg-[#2A2A20] border border-[#F2B035]/40 p-4 sm:p-5 rounded-2xl shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[#F2B035] uppercase tracking-wider flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#F2B035]" />
                  Quick Solar Savings Estimator
                </label>
                <span className="text-xs text-[#C8C2B8]">Based on Port St. Lucie FPL Rates</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#E8E2D9]">Your Average Monthly FPL Electric Bill:</span>
                  <span className="text-xl font-extrabold text-[#F2B035]">${quickBill}/mo</span>
                </div>

                <input
                  type="range"
                  min="100"
                  max="700"
                  step="10"
                  value={quickBill}
                  onChange={(e) => setQuickBill(Number(e.target.value))}
                  className="w-full h-2 bg-[#4A4A3B] rounded-lg appearance-none cursor-pointer accent-[#F2B035]"
                />

                <div className="grid grid-cols-2 gap-3 pt-2 text-center bg-[#3D3D37] p-3 rounded-xl border border-[#5A5A4A]">
                  <div>
                    <div className="text-[11px] text-[#C8C2B8] font-medium">Estimated 25-Year Savings</div>
                    <div className="text-lg sm:text-xl font-black text-[#52B788]">
                      ${estimated25YrSavings.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#C8C2B8] font-medium">30% Federal Tax Credit</div>
                    <div className="text-lg sm:text-xl font-black text-[#F2B035]">
                      ${Math.round(quickBill * 12 * 0.3 * 8).toLocaleString()} est.
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    onClick={onNavigateCalculator}
                    className="text-xs text-[#F2B035] hover:underline font-semibold flex items-center gap-1"
                  >
                    Custom system size & battery calculation →
                  </button>
                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-bold text-[#3D3D37] bg-[#F2B035] hover:bg-[#d99c2b] px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    Lock In This Estimate
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenQuote}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Request Free Site Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+17273759375"
                className="px-5 py-3.5 rounded-xl font-semibold text-sm bg-[#2A2A20] hover:bg-[#4A4A3B] border border-[#5A5A4A] text-[#FCFAF7] transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#F2B035]" />
                <span>Call +1 727-375-9375</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset & Floating Info Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-[#5A5A4A] shadow-xl group">
              <img
                src={heroImage}
                alt="Sunergy Solar Installation in Port St. Lucie"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A20] via-[#2A2A20]/20 to-transparent" />

              {/* Floating Google Maps Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#3A3A2F]/95 backdrop-blur-md p-4 rounded-xl border border-[#5A5A4A] text-xs space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-[#FCFAF7] flex items-center gap-1.5">
                      <span>Sunergy Solar Energy</span>
                      <CheckCircle2 className="w-4 h-4 text-[#52B788]" />
                    </h3>
                    <p className="text-[#E8E2D9] text-[11px] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#F2B035] shrink-0" />
                      <span>540 NW University Blvd Ste 108, Port St. Lucie</span>
                    </p>
                  </div>
                  <div className="bg-[#F2B035]/20 text-[#F2B035] font-bold px-2 py-1 rounded text-[11px] border border-[#F2B035]/30">
                    Floor 1 · WestPark
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-[#4A4A3B] text-[11px]">
                  <span className="text-[#52B788] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse" />
                    Open Today · 9 AM - 6 PM
                  </span>
                  <a
                    href="https://maps.google.com/?q=540+NW+University+Blvd+Ste+108,+Port+St.+Lucie,+FL+34986"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F2B035] font-bold hover:underline"
                  >
                    View on Maps ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Customer Quote Floating Snippet */}
            <div className="hidden sm:block absolute -top-4 -left-4 bg-[#2A2A20] border border-[#5A5A4A] p-3 rounded-xl shadow-xl max-w-xs text-xs">
              <p className="text-[#E8E2D9] italic font-serif">
                &quot;The panels are rated against hurricane winds, installation was smooth and professional!&quot;
              </p>
              <div className="mt-1.5 font-bold text-[#F2B035] text-[11px]">
                — Jason Miller, PSL Resident (5★ Review)
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

