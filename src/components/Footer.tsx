import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ChevronRight, 
  ChevronsRight,
  ArrowUp
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { PageId } from './Navbar';
import { WhatsAppIcon } from './FloatingActions';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

/* =========================================================================
   CUSTOM CRISP TECHNICAL BLUEPRINT ICONS (MATCHING REFERENCE IMAGE BADGES)
   ========================================================================= */

// 1. Architectural Spiral & Helical Staircases
const StairsIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path d="M4 19h4v-4h4v-4h4V7h4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 19v-4" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 2. CNC Laser Cut Jali & Decorative Partitions (Laser nozzle with beam/flame)
const LaserCutIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path d="M12 2v6" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M8 8h8l-2 5h-4l-2-5z" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M12 13v3" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 20h16" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

// 3. Commercial Glass Facades, Doors & Structural Glazing
const FacadeIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" strokeWidth="2" />
    <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1.5" />
    <line x1="4" y1="9" x2="20" y2="9" strokeWidth="1.5" />
    <line x1="4" y1="15" x2="20" y2="15" strokeWidth="1.5" />
    <circle cx="9" cy="18" r="0.8" fill="currentColor" />
    <circle cx="15" cy="18" r="0.8" fill="currentColor" />
  </svg>
);

// 4. Elevator Portal Cladding & Lift Door Architraves
const ElevatorIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <rect x="4" y="3" width="16" height="18" rx="2" strokeWidth="2" />
    <line x1="12" y1="3" x2="12" y2="21" strokeWidth="1.5" strokeDasharray="2 2" />
    <polyline points="7 9 9 7 11 9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="13 15 15 17 17 15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 5. SS & Glass Balcony Railings & Handrails
const RailingIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2.4" strokeLinecap="round" />
    <line x1="6" y1="6" x2="6" y2="20" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="6" x2="12" y2="20" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="6" x2="18" y2="20" strokeWidth="2" strokeLinecap="round" />
    <line x1="3" y1="18" x2="21" y2="18" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 6. Heavy Industrial Fabrication & Safety
const SafetyIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
    <path d="M12 3l8 3.5v5.5c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V6.5L12 3z" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.5" strokeWidth="1.8" />
    <path d="M12 9.5v1M12 13.5v1M9.5 12h1M13.5 12h1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050f20] text-white overflow-hidden font-sans border-t border-slate-800">
      
      {/* Clean Midnight Deep Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#06142a] to-[#030a17] pointer-events-none" />

      {/* Steel Warehouse Framework Truss SVG (Right Side Background Silhouette) */}
      <div className="absolute bottom-0 right-0 w-[480px] h-[260px] pointer-events-none opacity-20 hidden md:block">
        <svg viewBox="0 0 480 260" fill="none" className="w-full h-full text-blue-400">
          {/* Vertical Columns */}
          <line x1="80" y1="260" x2="80" y2="100" stroke="currentColor" strokeWidth="3" />
          <line x1="160" y1="260" x2="160" y2="70" stroke="currentColor" strokeWidth="3" />
          <line x1="240" y1="260" x2="240" y2="40" stroke="currentColor" strokeWidth="3.5" />
          <line x1="320" y1="260" x2="320" y2="40" stroke="currentColor" strokeWidth="3.5" />
          <line x1="400" y1="260" x2="400" y2="60" stroke="currentColor" strokeWidth="3" />
          <line x1="470" y1="260" x2="470" y2="90" stroke="currentColor" strokeWidth="3" />

          {/* Roof Rafters & Beams */}
          <line x1="60" y1="110" x2="240" y2="40" stroke="currentColor" strokeWidth="3" />
          <line x1="240" y1="40" x2="480" y2="100" stroke="currentColor" strokeWidth="3" />
          
          {/* Floor Girders */}
          <line x1="60" y1="160" x2="480" y2="160" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
          <line x1="60" y1="210" x2="480" y2="210" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />

          {/* Diagonal Cross Braces */}
          <line x1="80" y1="260" x2="160" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="160" y1="260" x2="80" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="160" y1="260" x2="240" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="240" y1="260" x2="160" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="240" y1="260" x2="320" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="320" y1="260" x2="240" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="320" y1="260" x2="400" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="400" y1="260" x2="320" y2="160" stroke="currentColor" strokeWidth="1.5" />

          {/* Upper Trusses */}
          <line x1="80" y1="160" x2="160" y2="70" stroke="currentColor" strokeWidth="1.5" />
          <line x1="160" y1="160" x2="240" y2="40" stroke="currentColor" strokeWidth="1.5" />
          <line x1="240" y1="40" x2="320" y2="160" stroke="currentColor" strokeWidth="1.5" />
          <line x1="320" y1="160" x2="400" y2="60" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* =========================================================================
          MAIN 4-COLUMN FOOTER CONTENT
         ========================================================================= */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-start">
          
          {/* =====================================================================
              COLUMN 1: BRAND LOGO BADGE & COMPANY PROFILE (Cols 1-3.5)
             ===================================================================== */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-4 reveal-on-scroll">
            
            {/* Clean White Logo Card - Crisp & Shadow-Free */}
            <div className="inline-block bg-white rounded-xl p-3 border border-slate-200">
              <img 
                src={COMPANY_INFO.logoUrl} 
                alt="Pioneer Fab Tech - Innovation Precision Excellence" 
                loading="lazy"
                decoding="async"
                className="h-12 sm:h-14 w-auto object-contain max-w-full"
              />
            </div>

            {/* Clean Subtle Orange Accent Line */}
            <div className="h-[2px] w-14 bg-[#ff7a00] rounded-full my-2" />

            {/* Company Description */}
            <p className="text-[13px] text-slate-300 leading-relaxed font-normal pr-2">
              Pioneer Fab Tech is a premier architectural and industrial metal fabrication company specializing in precision spiral staircases, SS & glass balustrades, laser cut decorative partitions, commercial facades, and elevator portal cladding.
            </p>

          </div>

          {/* =====================================================================
              COLUMN 2: QUICK PAGES (Cols 4-6)
             ===================================================================== */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-3.5 reveal-on-scroll delay-75">
            
            {/* Header: >> QUICK PAGES with Orange Double Chevron & Clean Accent */}
            <div>
              <div className="flex items-center gap-1.5">
                <ChevronsRight className="w-5 h-5 text-[#ff7a00] stroke-[3]" />
                <h4 className="text-[15px] font-black text-white uppercase tracking-wider">
                  QUICK PAGES
                </h4>
              </div>
              <div className="h-[2px] w-12 bg-[#ff7a00] rounded-full mt-2" />
            </div>

            {/* 8 Links with Circular Chevron Icons */}
            <ul className="space-y-2 pt-1 text-[13px]">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Our Services' },
                { id: 'projects', label: 'Our Projects' },
                { id: 'gallery', label: 'Project Gallery' },
                { id: 'materials', label: 'Material Supply' },
                { id: 'certificates', label: 'Certificates' },
                { id: 'contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id as PageId)}
                    className="group flex items-center gap-3 text-slate-200 hover:text-[#ff9500] transition-colors text-left cursor-pointer w-full"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700/80 text-slate-400 group-hover:border-[#ff7a00] group-hover:text-[#ff7a00] flex items-center justify-center shrink-0 transition-colors">
                      <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <div className="relative inline-block">
                      <span className="font-medium tracking-wide pb-0.5 block">{link.label}</span>
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8B2E1D] transition-transform duration-[550ms] ease-out origin-left pointer-events-none scale-x-0 group-hover:scale-x-100" />
                    </div>
                  </button>
                </li>
              ))}
            </ul>

          </div>

          {/* =====================================================================
              COLUMN 3: SPECIALIZED SERVICES (Cols 7-9)
             ===================================================================== */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-3.5 reveal-on-scroll delay-150">
            
            {/* Header: >> SPECIALIZED SERVICES with Clean Accent */}
            <div>
              <div className="flex items-center gap-1.5">
                <ChevronsRight className="w-5 h-5 text-[#ff7a00] stroke-[3]" />
                <h4 className="text-[15px] font-black text-white uppercase tracking-wider">
                  SPECIALIZED SERVICES
                </h4>
              </div>
              <div className="h-[2px] w-12 bg-[#ff7a00] rounded-full mt-2" />
            </div>

            {/* 6 Services with Clean Blueprint Icon Badges */}
            <ul className="space-y-3 pt-1 text-[13px]">
              {[
                {
                  title: 'Architectural Spiral & Helical Staircases',
                  fullTitle: 'Architectural Spiral & Helical Staircases',
                  icon: StairsIcon,
                },
                {
                  title: 'CNC Laser Cut Jali & Decorative...',
                  fullTitle: 'CNC Laser Cut Jali & Decorative Partitions',
                  icon: LaserCutIcon,
                },
                {
                  title: 'Commercial Glass Facades, Doors &...',
                  fullTitle: 'Commercial Glass Facades, Doors & Structural Glazing',
                  icon: FacadeIcon,
                },
                {
                  title: 'Elevator Portal Cladding & Lift Door...',
                  fullTitle: 'Elevator Portal Cladding & Lift Door Architraves',
                  icon: ElevatorIcon,
                },
                {
                  title: 'SS & Glass Balcony Railings & Handrails',
                  fullTitle: 'SS & Glass Balcony Railings & Architectural Handrails',
                  icon: RailingIcon,
                },
                {
                  title: 'Heavy Industrial Fabrication & Safety...',
                  fullTitle: 'Heavy Industrial Fabrication & Machine Safety Enclosures',
                  icon: SafetyIcon,
                },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate('services')}
                      title={item.fullTitle}
                      className="group flex items-center gap-3 text-slate-200 hover:text-[#ff9500] transition-colors text-left cursor-pointer w-full"
                    >
                      <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-700/80 text-slate-300 group-hover:border-[#ff7a00] group-hover:text-[#ff7a00] flex items-center justify-center shrink-0 transition-colors">
                        <IconComponent className="w-3.5 h-3.5 stroke-[2]" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="relative inline-block max-w-full">
                          <span className="font-medium tracking-wide block truncate pb-0.5">{item.title}</span>
                          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8B2E1D] transition-transform duration-[550ms] ease-out origin-left pointer-events-none scale-x-0 group-hover:scale-x-100" />
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>

          </div>

          {/* =====================================================================
              COLUMN 4: WORKSHOP & OFFICE (Cols 10-12)
             ===================================================================== */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-3.5 reveal-on-scroll delay-200">
            
            {/* Header: >> WORKSHOP & OFFICE with Clean Accent */}
            <div>
              <div className="flex items-center gap-1.5">
                <ChevronsRight className="w-5 h-5 text-[#ff7a00] stroke-[3]" />
                <h4 className="text-[15px] font-black text-white uppercase tracking-wider">
                  WORKSHOP & OFFICE
                </h4>
              </div>
              <div className="h-[2px] w-12 bg-[#ff7a00] rounded-full mt-2" />
            </div>

            {/* Address, Phone and Email */}
            <div className="space-y-4 pt-1 text-[13px] text-slate-200">
              
              {/* Location with Orange Map Pin Badge */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#ff7a00] text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 fill-slate-950 text-slate-950 stroke-[2.2]" />
                </div>
                <div className="leading-snug text-slate-200 font-medium">
                  <p>S. No.233 H.No.2 Shop No.03 Jay</p>
                  <p>Ambe Chawl Lake Vasai virar, Palghar</p>
                  <p>Maharashtra 401208</p>
                </div>
              </div>

              {/* Large Bold Phone Number with Solid Orange Phone Icon */}
              <div className="flex items-center gap-3 pt-1">
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#ff7a00] fill-[#ff7a00]" />
                </div>
                <a 
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="group relative inline-block text-base sm:text-lg font-black text-white hover:text-[#ff9500] tracking-wide transition-colors"
                >
                  <span className="pb-0.5 block">{COMPANY_INFO.phone}</span>
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8B2E1D] transition-transform duration-[550ms] ease-out origin-left pointer-events-none scale-x-0 group-hover:scale-x-100" />
                </a>
              </div>

              {/* Emails with Solid Orange Mail Icon */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-[#ff7a00] fill-[#ff7a00]/30" />
                </div>
                <div className="space-y-1.5 flex flex-col items-start">
                  {COMPANY_INFO.emails.map((emailAddr) => (
                    <a
                      key={emailAddr}
                      href={`mailto:${emailAddr}`}
                      className="group relative inline-block text-[13px] text-slate-200 hover:text-[#ff9500] transition-colors break-all font-medium"
                    >
                      <span className="pb-0.5 block">{emailAddr}</span>
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8B2E1D] transition-transform duration-[550ms] ease-out origin-left pointer-events-none scale-x-0 group-hover:scale-x-100" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Clean Divider Line */}
      <div className="w-full h-px bg-slate-800/80" />

      {/* Bottom Copyright Bar & Action Dock */}
      <div className="relative z-10 bg-[#030914] py-3.5 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="text-xs sm:text-[13px] text-slate-400 tracking-wide font-normal text-center md:text-left">
            © 2026 Pioneer Fab Tech. All Rights Reserved. &nbsp;|&nbsp; Designed & Developed by Sajid Web Solution
          </div>

          {/* Clean Curved Capsule Housing 3 Buttons */}
          <div className="flex items-center gap-2.5 p-1.5 rounded-full bg-slate-900 border border-slate-800">
            {/* Button 1: Scroll to top */}
            <button
              onClick={scrollToTop}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
              title="Scroll to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Button 2: Call */}
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-xs"
              title="Call Pioneer Fab Tech"
              aria-label={`Call ${COMPANY_INFO.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-white" />
            </a>

            {/* Button 3: WhatsApp */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center transition-colors shadow-xs"
              title="Chat on WhatsApp"
              aria-label="WhatsApp Us Direct"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};
