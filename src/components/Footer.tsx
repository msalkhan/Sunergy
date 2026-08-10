import React from 'react';
import { Sun, Phone, MapPin, Clock, Star, ShieldCheck } from 'lucide-react';
import { SUNERGY_BUSINESS } from '../data/sunergyData';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenAiAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenAiAdvisor }) => {
  return (
    <footer className="bg-[#3A3A2F] text-[#C8C2B8] border-t border-[#5A5A4A] text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#5A5A40] border border-[#7A7A6B] flex items-center justify-center shadow-sm">
                <Sun className="w-4 h-4 text-[#F2B035]" />
              </div>
              <span className="font-serif font-bold text-lg text-white">SUNERGY</span>
            </div>

            <p className="text-[#C8C2B8] text-xs leading-relaxed">
              Port St. Lucie&apos;s premier local solar energy system service. Delivering high-quality rooftop solar installations, 160+ MPH hurricane-rated panel engineering, battery backup storage, and flexible financing.
            </p>

            <div className="flex items-center gap-2 bg-[#2A2A20] p-2.5 rounded-xl border border-[#5A5A4A] w-fit">
              <Star className="w-4 h-4 text-[#F2B035] fill-[#F2B035]" />
              <span className="font-bold text-white">4.3 Rating</span>
              <span className="text-[#7A7A6B]">·</span>
              <span className="text-[#E8E2D9]">138 Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Port St. Lucie Office</h4>
            
            <div className="space-y-2 text-[#E8E2D9]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F2B035] shrink-0 mt-0.5" />
                <div>
                  <div>{SUNERGY_BUSINESS.address}</div>
                  <div className="text-[11px] text-[#F2B035] font-semibold">{SUNERGY_BUSINESS.addressExtra}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F2B035] shrink-0" />
                <a href="tel:+17273759375" className="font-bold text-white hover:text-[#F2B035]">
                  {SUNERGY_BUSINESS.phone}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#F2B035] shrink-0 mt-0.5" />
                <div>
                  <div>Mon–Sat: 9:00 AM – 6:00 PM</div>
                  <div className="text-[11px] text-[#A8A298]">Sunday: Closed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Treasure Coast Service Areas */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Service Areas</h4>
            <ul className="grid grid-cols-2 gap-1.5 text-[#C8C2B8]">
              <li>Port St. Lucie (34986)</li>
              <li>Tradition (34952)</li>
              <li>St. Lucie West</li>
              <li>Fort Pierce</li>
              <li>Stuart</li>
              <li>Jensen Beach</li>
              <li>Palm City</li>
              <li>Vero Beach</li>
            </ul>
          </div>

          {/* Col 4: Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-white text-sm">Solar Consultation</h4>
            <p className="text-[#C8C2B8] text-xs">
              Get an accurate rooftop survey and FPL electricity bill savings estimate.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Get Free Solar Quote</span>
              </button>

              <button
                onClick={onOpenAiAdvisor}
                className="w-full py-2 bg-[#2A2A20] hover:bg-[#1A1A10] text-[#E8E2D9] border border-[#5A5A4A] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Sun className="w-3.5 h-3.5 text-[#F2B035]" />
                <span>Ask AI Advisor</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#5A5A4A] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#A8A298]">
          <div>
            © {new Date().getFullYear()} Sunergy Solar Energy Systems. All rights reserved.
          </div>
          <div className="flex gap-4">
            <span>Florida Licensed Solar Contractor</span>
            <span>·</span>
            <span>30% Federal ITC Clean Energy Credit Eligible</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

