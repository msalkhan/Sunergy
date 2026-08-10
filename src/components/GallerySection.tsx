import React from 'react';
import heroImage from '../assets/images/sunergy_hero_solar_1786352720414.jpg';
import installerPhoto from '../assets/images/sunergy_solar_installation_1786352746946.jpg';

export const GallerySection: React.FC = () => {
  const galleryItems = [
    {
      url: heroImage,
      title: "Rooftop Solar Installation - Port St. Lucie",
      subtitle: "Custom monocrystalline array engineered for 160+ MPH wind loads"
    },
    {
      url: installerPhoto,
      title: "Certified Professional Installation Team",
      subtitle: "Local technicians ensuring double-sealed waterproof roof penetrations"
    },
    {
      url: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
      title: "Florida Clean Energy Power Systems",
      subtitle: "Seamless connection to FPL grid with net metering active"
    },
    {
      url: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=800&q=80",
      title: "Tesla Powerwall & Battery Backup Unit",
      subtitle: "Whole-home power protection during storm season"
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-[#FCFAF7] border-t border-[#E8E2D9] text-[#3D3D37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] bg-[#5A5A40]/10 border border-[#5A5A40]/20 px-3 py-1 rounded-full">
            Local Installations
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#3D3D37] mt-3">
            Recent Sunergy Projects in Port St. Lucie
          </h2>
          <p className="text-[#7A7A6B] text-sm mt-1">
            Over 1,200+ rooftop solar energy systems installed across St. Lucie and Martin County.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm group h-64 sm:h-80"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D3D37]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-white/95 backdrop-blur-md rounded-xl border border-[#E8E2D9] shadow-sm">
                <h3 className="font-serif font-bold text-[#3D3D37] text-sm">{item.title}</h3>
                <p className="text-[#7A7A6B] text-xs mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

