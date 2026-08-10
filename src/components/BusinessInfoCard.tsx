import React, { useState } from 'react';
import { 
  MapPin, Phone, Clock, Navigation, Bookmark, Share2, 
  Smartphone, Star, ExternalLink, Building, ChevronDown, ChevronUp, Copy, Check 
} from 'lucide-react';
import { SUNERGY_BUSINESS, NEARBY_COMPETITORS } from '../data/sunergyData';
import installerPhoto from '../assets/images/sunergy_solar_installation_1786352746946.jpg';

interface BusinessInfoCardProps {
  onOpenQuote: () => void;
}

export const BusinessInfoCard: React.FC<BusinessInfoCardProps> = ({ onOpenQuote }) => {
  const [showHours, setShowHours] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(SUNERGY_BUSINESS.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: SUNERGY_BUSINESS.name,
        text: 'Sunergy Solar Energy Systems - Port St. Lucie, FL',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <section id="about" className="py-12 bg-[#FCFAF7] border-y border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] bg-[#5A5A40]/10 border border-[#5A5A40]/20 px-3 py-1 rounded-full">
            Official Google Maps Business Listing
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D3D37] mt-3">
            Visit Our Port St. Lucie Office
          </h2>
          <p className="text-[#7A7A6B] text-sm mt-1">
            Conveniently located on NW University Blvd in WestPark, serving St. Lucie, Martin, and Indian River counties.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Google Place Card */}
          <div className="lg:col-span-8 bg-white border border-[#E8E2D9] rounded-2xl shadow-sm overflow-hidden">
            
            {/* Header / Business Name */}
            <div className="p-6 border-b border-[#E8E2D9] bg-[#F7F5F0]">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#3D3D37]">{SUNERGY_BUSINESS.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-[#F2B035]">
                      <span className="font-bold text-lg text-[#3D3D37] mr-1">{SUNERGY_BUSINESS.rating}</span>
                      <div className="flex text-[#F2B035]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-[#F2B035]' : 'fill-[#F2B035]/30'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-[#7A7A6B] text-sm">({SUNERGY_BUSINESS.totalReviews})</span>
                    <span className="text-[#C8C2B8]">·</span>
                    <span className="text-[#5A5A40] text-sm font-medium">{SUNERGY_BUSINESS.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                      saved ? 'bg-[#5A5A40] text-[#FCFAF7] border-[#5A5A40]' : 'bg-white text-[#3D3D37] border-[#E8E2D9] hover:bg-[#FCFAF7]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#3D3D37] border border-[#E8E2D9] hover:bg-[#FCFAF7] flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{shareSuccess ? 'Copied!' : 'Share'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Action Navigation Bar */}
              <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-[#E8E2D9] text-xs font-semibold">
                <a
                  href="https://maps.google.com/?q=540+NW+University+Blvd+Ste+108,+Port+St.+Lucie,+FL+34986"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-[#F2B035] hover:bg-[#d99c2b] text-[#3D3D37] rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Directions</span>
                </a>

                <a
                  href="tel:+17273759375"
                  className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4A4A35] text-[#FCFAF7] rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F2B035]" />
                  <span>Call Now</span>
                </a>

                <button
                  onClick={onOpenQuote}
                  className="px-4 py-2 bg-white hover:bg-[#FCFAF7] text-[#3D3D37] border border-[#E8E2D9] rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-[#5A5A40]" />
                  <span>Send to Phone / Quote</span>
                </button>
              </div>
            </div>

            {/* Business Details Grid */}
            <div className="p-6 space-y-5 text-sm">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-[#3D3D37]">{SUNERGY_BUSINESS.address}</div>
                  <div className="text-xs text-[#5A5A40] font-medium flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{SUNERGY_BUSINESS.addressExtra}</span>
                  </div>
                </div>
              </div>

              {/* Hours dropdown */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#5A5A40] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#008A3D] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#008A3D] animate-pulse" />
                      Closed · Opens 9 AM Mon-Sat
                    </span>
                    <button
                      onClick={() => setShowHours(!showHours)}
                      className="text-xs text-[#7A7A6B] hover:text-[#3D3D37] flex items-center gap-1 font-medium"
                    >
                      <span>See more hours</span>
                      {showHours ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {showHours && (
                    <div className="mt-2 bg-[#F7F5F0] p-3 rounded-xl border border-[#E8E2D9] text-xs space-y-1.5">
                      {Object.entries(SUNERGY_BUSINESS.hours).map(([day, hrs]) => (
                        <div key={day} className="flex justify-between text-[#3D3D37]">
                          <span className="font-medium text-[#7A7A6B]">{day}</span>
                          <span className="font-semibold">{hrs}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#5A5A40] shrink-0" />
                <div className="flex-1 flex justify-between items-center">
                  <a href="tel:+17273759375" className="font-semibold text-[#3D3D37] hover:text-[#5A5A40]">
                    {SUNERGY_BUSINESS.phone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="text-xs text-[#7A7A6B] hover:text-[#3D3D37] flex items-center gap-1 bg-[#F7F5F0] border border-[#E8E2D9] px-2 py-1 rounded"
                  >
                    {copied ? <Check className="w-3 h-3 text-[#008A3D]" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Plus Code */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#E8E2D9] text-xs">
                <span className="bg-[#F7F5F0] text-[#3D3D37] border border-[#E8E2D9] px-2 py-1 rounded font-mono font-bold">
                  {SUNERGY_BUSINESS.plusCode}
                </span>
                <span className="text-[#7A7A6B]">Google Maps Plus Code</span>
              </div>

              {/* Embedded Interactive Map Frame Placeholder */}
              <div className="pt-2">
                <div className="relative w-full h-48 bg-[#F7F5F0] rounded-xl overflow-hidden border border-[#E8E2D9] flex items-center justify-center group">
                  <iframe
                    title="Sunergy Port St Lucie Location Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src="https://maps.google.com/maps?q=540+NW+University+Blvd+Ste+108,+Port+St.+Lucie,+FL+34986&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Right Sidebar: Photos & People Also Search For */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Photos & Videos Box */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-[#3D3D37] text-sm">Photos & Videos</h4>
                <span className="text-xs text-[#5A5A40] font-semibold cursor-pointer">All (12)</span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-[#E8E2D9] group">
                <img
                  src={installerPhoto}
                  alt="Sunergy Professional Solar Installation"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3D3D37]/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 text-[11px] font-semibold text-[#FCFAF7]">
                  Port St. Lucie Rooftop Installation
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-[#F7F5F0] p-2 rounded-lg text-[#3D3D37] border border-[#E8E2D9] font-medium">Inside</div>
                <div className="bg-[#F7F5F0] p-2 rounded-lg text-[#3D3D37] border border-[#E8E2D9] font-medium">By Owner</div>
                <div className="bg-[#F7F5F0] p-2 rounded-lg text-[#3D3D37] border border-[#E8E2D9] font-medium">Street View</div>
              </div>
            </div>

            {/* People Also Search For (Competitors comparison mentioned in prompt) */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-3">
              <h4 className="font-serif font-bold text-[#3D3D37] text-sm">People also search for</h4>
              <div className="space-y-2.5">
                {NEARBY_COMPETITORS.map((comp, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-[#F7F5F0] p-2.5 rounded-xl border border-[#E8E2D9] text-xs">
                    <div>
                      <div className="font-bold text-[#3D3D37]">{comp.name}</div>
                      <div className="text-[#7A7A6B] text-[11px]">{comp.category}</div>
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-[#E8E2D9] px-2 py-1 rounded text-[#F2B035] font-bold">
                      <Star className="w-3 h-3 fill-[#F2B035]" />
                      <span className="text-[#3D3D37]">{comp.rating}</span>
                      <span className="text-[#7A7A6B] font-normal">({comp.reviewsCount})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

