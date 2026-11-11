import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Clock, 
  Compass, 
  ShieldCheck, 
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/siteData';
import { PageId } from '../components/Navbar';
import { WhatsAppIcon } from '../components/FloatingActions';
import { smoothScrollIntoView } from '../utils/smoothScroll';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  selectedItemId?: string | null;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, selectedItemId }) => {
  const [selectedService, setSelectedService] = useState<string>(() => {
    if (selectedItemId && SERVICES.some(s => s.id === selectedItemId)) {
      return selectedItemId;
    }
    return SERVICES[0].id;
  });

  useEffect(() => {
    if (selectedItemId && SERVICES.some(s => s.id === selectedItemId)) {
      setSelectedService(selectedItemId);
      const timer = setTimeout(() => {
        const el = document.getElementById('service-details-section');
        if (el) {
          smoothScrollIntoView(el);
        }
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [selectedItemId]);

  const activeService = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* 1. Header Banner matching About Us */}
      <div className="relative py-14 sm:py-18 bg-slate-900 overflow-hidden text-center">
        <img
          src="/assets/achievements_bg.jpg"
          alt="Our Services Header"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

        <div className="relative z-10 space-y-1 px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Our Services
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400 select-none">•</span>
            <span className="text-white font-bold select-none">Our Services</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">

        {/* Section Subtitle */}
        <div className="max-w-3xl reveal-word">
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Engineered metal solutions fabricated directly in our Vasai workshop. From high-end titanium PVD decorative partitions to heavy industrial plant staircases.
          </p>
        </div>

        {/* Services Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 reveal-on-scroll delay-75">
          {SERVICES.map((serv) => {
            const isActive = serv.id === selectedService;
            return (
              <button
                key={serv.id}
                onClick={() => setSelectedService(serv.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {serv.title.split('&')[0]}
              </button>
            );
          })}
        </div>

        {/* Active Featured Service Detail Card */}
        <div id="service-details-section" className="scroll-mt-24 lg:scroll-mt-32 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm reveal-on-scroll">
          <div key={activeService.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
            
            {/* Left: Image & Category Badge */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md bg-slate-100 border border-slate-200">
                <img 
                  src={activeService.heroImage} 
                  alt={activeService.title} 
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-slate-900/95 md:backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-md">
                  {activeService.category}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Fabricated Projects Track Record</span>
                  <div className="text-lg font-extrabold text-slate-900 font-mono">
                    {activeService.sampleProjectsCount}+ Executed Sites
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('projects')}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Case Studies</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Technical Details & Specifications */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-amber-600 font-bold text-xs uppercase tracking-wider">
                  Technical Specifications
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  {activeService.title}
                </h2>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Engineering Features:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {activeService.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs Table */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Material Grades:</span>
                  <span className="font-semibold text-white text-right">{activeService.specifications.materialGrades}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Available Finishes:</span>
                  <span className="font-semibold text-amber-400 text-right">{activeService.specifications.finishOptions}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Typical Lead Time:</span>
                  <span className="font-semibold text-white text-right">{activeService.specifications.standardLeadTime}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400">Application Areas:</span>
                  <span className="font-semibold text-slate-200 text-right">{activeService.specifications.applicationArea}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('enquiry')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Request Quote For This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/919029555233?text=${encodeURIComponent(`Hi Pioneer Fab Tech, I am interested in ${activeService.title}. Can we discuss drawing & pricing?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
