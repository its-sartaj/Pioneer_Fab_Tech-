import React from 'react';
import { 
  MapPin,
  Mail, 
  Smartphone 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { PageId } from '../components/Navbar';
import { ReachOutSection } from '../components/ReachOutSection';

interface ContactPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Top Industrial Banner matching image_eba6d34a.png */}
      <div className="relative h-44 sm:h-52 lg:h-56 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-center px-4">
        {/* Background industrial workshop image with overlay */}
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.03_PM_2f9ff5e2.jpeg"
          alt="Contact Industrial Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        {/* Blue/black gradient overlay matching reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

        {/* Content */}
        <div className="relative z-10 space-y-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Contact
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button
              onClick={() => onNavigate?.('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400 select-none">&gt;</span>
            <span className="text-white font-bold select-none">Contact Us</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* 2. Contact Cards Row (Address, Email & Phone) */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-6 sm:gap-8 mb-14">

          {/* Card 1: Address */}
          <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center justify-start shadow-xs hover:shadow-md transition-shadow">
            <div className="mb-3 text-[#d95c18]">
              <MapPin className="w-10 h-10 stroke-[1.7]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#d95c18] mb-2 tracking-wide">
              Address
            </h3>

            <p className="text-xs font-medium text-slate-700 leading-relaxed max-w-[260px]">
              {COMPANY_INFO.address}
            </p>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center justify-start shadow-xs hover:shadow-md transition-shadow">
            <div className="mb-3 text-[#d95c18]">
              <Mail className="w-10 h-10 stroke-[1.7]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#d95c18] mb-2 tracking-wide">
              Email
            </h3>

            <div className="space-y-1.5 pt-1">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="block text-xs font-medium text-[#d95c18] hover:underline break-all"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          {/* Card 3: Phone No */}
          <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center justify-start shadow-xs hover:shadow-md transition-shadow">
            <div className="mb-3 text-[#d95c18]">
              <Smartphone className="w-10 h-10 stroke-[1.7]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#d95c18] mb-2 tracking-wide">
              Phone No
            </h3>

            <div className="space-y-1 pt-1 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="block font-medium text-[#d95c18] hover:underline"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>

            <h4 className="text-xs font-bold text-[#d95c18] mt-4 mb-1">
              WhatsApp & Mobile
            </h4>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#d95c18] hover:underline"
            >
              +91 90295 55233
            </a>
          </div>

        </div>

        {/* 3 & 4. Shared Reach Out Now! Section (Get A Quote Form + Google Map) */}
        <ReachOutSection className="mt-10 sm:mt-12" />

      </div>

    </div>
  );
};
