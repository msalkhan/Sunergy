import React from 'react';
import { Sun, ShieldCheck, Zap, DollarSign, Building2, Headphones, CheckCircle2, ArrowRight } from 'lucide-react';
import { SUNERGY_BUSINESS } from '../data/sunergyData';

interface ServicesSectionProps {
  onOpenQuote: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenQuote }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-6 h-6 text-[#F2B035]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#5A5A40]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#F2B035]" />;
      case 'DollarSign': return <DollarSign className="w-6 h-6 text-[#5A5A40]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#5A5A40]" />;
      case 'Headphones': return <Headphones className="w-6 h-6 text-[#F2B035]" />;
      default: return <Sun className="w-6 h-6 text-[#F2B035]" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-[#FCFAF7] text-[#3D3D37] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] bg-[#5A5A40]/10 border border-[#5A5A40]/20 px-3 py-1 rounded-full">
            Full-Service Solar Energy Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D3D37] mt-3">
            Tailored Solar Energy Services in Port St. Lucie
          </h2>
          <p className="text-[#7A7A6B] text-sm sm:text-base mt-2">
            From initial roof analysis and hurricane-rated engineering to $0 down financing and ongoing maintenance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUNERGY_BUSINESS.services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#E8E2D9] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-5 hover:border-[#5A5A40] transition-all group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F7F5F0] border border-[#E8E2D9] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-bold bg-[#5A5A40]/10 text-[#5A5A40] border border-[#5A5A40]/20 px-2.5 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-[#3D3D37] group-hover:text-[#5A5A40] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#7A7A6B] text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E8E2D9]">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#3D3D37]">
                      <CheckCircle2 className="w-4 h-4 text-[#5A5A40] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#F7F5F0] hover:bg-[#5A5A40] hover:text-[#FCFAF7] text-[#3D3D37] border border-[#E8E2D9] transition-all flex items-center justify-center gap-1.5 mt-4"
              >
                <span>Request Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

