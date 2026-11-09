import React from 'react';
import { OurClientsSlider } from '../components/OurClientsSlider';
import { PageId } from '../components/Navbar';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. Header Banner matching reference design (Arrows removed as requested) */}
      <div className="relative py-14 sm:py-18 bg-slate-900 overflow-hidden text-center">
        {/* Background photo */}
        <img
          src="/assets/achievements_bg.jpg"
          alt="About Us Header"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        {/* Blue/black gradient overlay matching reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

        {/* Content - Clean breadcrumbs without arrow symbol */}
        <div className="relative z-10 space-y-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            About Us
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400 select-none">•</span>
            <span className="text-white font-bold select-none">About Us</span>
          </div>
        </div>
      </div>

      {/* 2. Front Page Company Profile & About Us Section - Placed here exactly as requested */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Official Profile Text & About Us */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  PIONEER FAB TECH
                </h2>
              </div>

              <div className="pt-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight border-b-2 border-amber-500 pb-1.5 inline-block">
                  ABOUT US
                </h3>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Pioneer Fab Tech is a professionally driven architectural and industrial metal fabrication company specializing in delivering high-quality, precision-engineered fabrication solutions for modern infrastructure, commercial developments and industrial applications.
                </p>
                <p>
                  With a strong focus on innovation, craftsmanship and technical excellence, we provide comprehensive fabrication services that combine structural strength, functional performance and contemporary aesthetics.
                </p>
                <p>
                  Our expertise spans architectural metalwork, customized steel fabrication, advanced laser cutting, glass and stainless-steel installations, and specialized industrial fabrication. From concept development and customized manufacturing to fabrication and installation, we aim to deliver solutions that meet the unique requirements of every project.
                </p>
                <p>
                  At Pioneer Fab Tech, we believe that every structure deserves precision, durability and attention to detail. Our commitment is to provide dependable workmanship, quality materials and professional service at every stage of execution.
                </p>
              </div>

              {/* Action buttons (Arrows removed as requested) */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  Explore Our Services
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/80 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Contact Our Workshop
                </button>
              </div>
            </div>

            {/* Right Column: Industrial Fabrication Photo with Technical Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group bg-slate-100">
                <img 
                  src="/assets/images/about_ss_pipe_fittings_1794245348614.jpg" 
                  alt="Pioneer Fab Tech Precision Industrial Stainless Steel Pipe Fittings & Fabrication" 
                  className="w-full h-[460px] sm:h-[520px] lg:h-[560px] object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Client Section - Pura Box Smoothly Slides Horizontally on timer, No Dots, No Arrows */}
      <OurClientsSlider />



    </div>
  );
};
