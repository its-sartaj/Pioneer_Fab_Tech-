import React from 'react';
import { 
  ArrowRight 
} from 'lucide-react';
import { COMPANY_INFO, SERVICES, MATERIAL_SUPPLY_ITEMS } from '../data/siteData';
import { AutoSliderRow } from '../components/AutoSliderRow';
import { PageId } from '../components/Navbar';
import { HeroSlider } from '../components/HeroSlider';
import { OurAchievementsSection } from '../components/OurAchievementsSection';
import { DarkOrangeLiquidFill } from '../components/DarkOrangeLiquidFill';
import { ReachOutSection } from '../components/ReachOutSection';

interface HomePageProps {
  onNavigate: (page: PageId, itemId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. Hero Section with 3 uploaded background images, clean typography, auto slide, no arrows */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Company Profile & About Us Section */}
      <section className="py-16 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm reveal-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Company Profile & About Us Text */}
            <div className="lg:col-span-7 space-y-5">
              <div className="reveal-word">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                  PIONEER FAB TECH
                </h1>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed reveal-word delay-150">
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

              {/* About Us Action Button - Navigates to About page on click */}
              <div className="pt-3 reveal-word delay-200">
                <a
                  href="#about"
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                      e.preventDefault();
                      onNavigate('about');
                    }
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-lg hover:translate-x-0.5 active:translate-x-0 group"
                >
                  <span>About Us</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: Uploaded Image with Architectural Frame - Slides in smoothly from right */}
            <div className="lg:col-span-5 reveal-from-right delay-200">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200 group bg-slate-100">
                <img 
                  src="/assets/images/homepage_architectural_staircase_1794246211574.jpg" 
                  alt="Pioneer Fab Tech Architectural Stainless Steel Spiral & Helical Staircase Engineering" 
                  className="w-full h-[460px] sm:h-[520px] lg:h-[560px] object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="eager"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Core Fabrication Services Section (Exact match to Our Material design) */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#ea6800] via-[#db5d00] to-[#c95100] text-white relative overflow-hidden border-y border-[#b84600]/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,185,95,0.22),transparent_65%)]" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-9 relative z-10">
          
          {/* Centered Heading */}
          <div className="text-center reveal-word">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(120,40,0,0.25)]">
              Our Core Fabrication Services
            </h2>
          </div>

          {/* Horizontal Slider of White Cards Matching Our Material Design */}
          <div className="reveal-on-scroll delay-150">
            <AutoSliderRow intervalMs={3200} className="gap-5 sm:gap-6 py-2">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  onClick={() => onNavigate('services', service.id)}
                  className="group w-[280px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-md p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(120,40,0,0.2)] hover:shadow-[0_14px_32px_rgba(100,35,0,0.32)] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none snap-start flex flex-col justify-between"
                >
                  {/* Clean Rectangular Image Container with White Framing */}
                  <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <img 
                      src={service.heroImage} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>

                  {/* Centered Bold Title in Dark Orange */}
                  <div className="pt-3.5 pb-1 text-center">
                    <h3 className="text-base sm:text-lg font-bold text-[#c94e00] group-hover:text-[#ea6800] transition-colors leading-tight line-clamp-1">
                      {service.title}
                    </h3>
                  </div>
                </div>
              ))}
            </AutoSliderRow>
          </div>

        </div>
      </section>

      {/* 4. Why Choose Us Section (Exact match to reference design image_e64787be.png) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
          
          {/* Header - ONLY "Why Choose Us" */}
          <div className="text-center reveal-word">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D87633] tracking-normal">
              Why Choose Us
            </h2>
          </div>

          {/* 3 Clean Elevated White Cards with Dark Orange Liquid Fill Animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 reveal-on-scroll delay-150">
            {[
              {
                num: '01',
                title: 'Timely Delivery',
                description:
                  'Count on Pioneer Fab Tech for punctual delivery, ensuring your projects stay on schedule.',
                icon: (
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 6h10v6H19z" />
                    <path d="M22 12v3c-6.5 1.5-12 7-12 15h28c0-8-5.5-13.5-12-15v-3" />
                    <path d="M8 30v4h32v-4" />
                    <path d="M6 34h36" />
                    <circle cx="24" cy="23" r="3" />
                    <path d="M13 18h-4v6h4" />
                    <circle cx="9" cy="16" r="2" />
                  </svg>
                ),
              },
              {
                num: '02',
                title: 'Wide Range of Products',
                description:
                  'Explore a diverse spectrum of stainless steel solutions at Pioneer Fab Tech, catering to all your needs.',
                icon: (
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="14" y="6" width="20" height="26" rx="9" />
                    <circle cx="24" cy="17" r="3" />
                    <path d="M24 20v4" />
                    <path d="M14 26h20" />
                    <path d="M16 32l-3 10" />
                    <path d="M32 32l3 10" />
                    <path d="M16 37h16" />
                    <path d="M20 37l4 5 4-5" />
                  </svg>
                ),
              },
              {
                num: '03',
                title: 'Quality Assurance',
                description:
                  'Trust in the quality benchmarks set by Pioneer Fab Tech, ensuring precision and excellence in every product.',
                icon: (
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 10h6l4 18h20l4-14H14" />
                    <path d="M18 17h18" />
                    <path d="M19 22h16" />
                    <circle cx="19" cy="35" r="3" />
                    <circle cx="33" cy="35" r="3" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.num}
                className="group relative isolate overflow-hidden bg-white rounded-none sm:rounded-sm p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100/90 hover:border-[#ea6800] hover:shadow-[0_16px_42px_rgba(184,68,0,0.32)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
              >
                {/* Animated Dark Orange Liquid Fill Layer with Rising Wave */}
                <DarkOrangeLiquidFill />

                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="text-[#D87633] group-hover:text-white transition-all duration-300 group-hover:scale-110 origin-left">
                      {card.icon}
                    </div>
                    <span className="text-6xl sm:text-7xl font-bold text-slate-100/90 group-hover:text-white/25 transition-colors duration-300 select-none leading-none tracking-tighter">
                      {card.num}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#9e3f14] group-hover:text-white transition-colors duration-300 mt-7 mb-3.5 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 group-hover:text-orange-50 transition-colors duration-300 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Our Achievements Section (Moved up before Material) */}
      <OurAchievementsSection />

      {/* 6. Our Material Section (Exact match to reference design image_8a251916.png) */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#ea6800] via-[#db5d00] to-[#c95100] text-white relative overflow-hidden border-y border-[#b84600]/40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,185,95,0.22),transparent_65%)]" />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-9 relative z-10">
          
          {/* Exact Heading - keep name only "Our Material" */}
          <div className="text-center reveal-word">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_2px_4px_rgba(120,40,0,0.25)]">
              Our Material
            </h2>
          </div>

          {/* Horizontal Slider of White Cards Matching image_8a251916.png */}
          <div className="reveal-on-scroll delay-150">
            <AutoSliderRow intervalMs={3200} className="gap-5 sm:gap-6 py-2">
              {[
                {
                  id: 'ss-pipe-fittings',
                  title: 'Forged Fittings',
                  image: '/assets/images/precision_pipe_fittings_1793956287823.jpg',
                },
                {
                  id: 'ss-flange',
                  title: 'Flanges',
                  image: '/assets/images/ss_flange_assortment_1794209392457.jpg',
                },
                {
                  id: 'ss-pipes-tubes',
                  title: 'Pipe & Tubes',
                  image: '/assets/images/ss_pipes_tubes_1794209432429.jpg',
                },
                {
                  id: 'ss-sheet',
                  title: 'SS Sheet',
                  image: '/assets/images/ss_sheet_stack_1794209390147.jpg',
                },
                {
                  id: 'ss-coil',
                  title: 'SS Coil',
                  image: '/assets/images/ss_coil_rolls_1794209391067.jpg',
                },
                {
                  id: 'copper-bars-sheet',
                  title: 'Copper Bars & Sheet',
                  image: '/assets/images/copper_bars_sheet_1794209392520.jpg',
                },
                {
                  id: 'aluminium-sheet-road',
                  title: 'Aluminium Sheet & Rod',
                  image: '/assets/images/aluminium_sheet_rod_1794209409308.jpg',
                },
                {
                  id: 'titanium-product',
                  title: 'Titanium Product',
                  image: '/assets/images/titanium_products_1794209411212.jpg',
                },
                {
                  id: 'ss-rounds-bar',
                  title: 'Stainless Steel Rounds Bar',
                  image: '/assets/images/ss_round_bars_1794209412255.jpg',
                },
                {
                  id: 'ss-flat-bar',
                  title: 'Stainless Steel Flat Bar',
                  image: '/assets/images/ss_flat_bars_1794209411215.jpg',
                },
                {
                  id: 'ss-structure',
                  title: 'Stainless Steel Structure',
                  image: '/assets/images/ss_structure_beams_1794209453745.jpg',
                },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate('materials', item.id)}
                  className="group w-[280px] sm:w-[320px] md:w-[340px] shrink-0 bg-white rounded-md p-3 sm:p-3.5 shadow-[0_8px_24px_rgba(120,40,0,0.2)] hover:shadow-[0_14px_32px_rgba(100,35,0,0.32)] transition-all duration-300 hover:-translate-y-1 cursor-pointer select-none snap-start flex flex-col"
                >
                  {/* Clean Rectangular Image Container with White Framing */}
                  <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>

                  {/* Centered Bold Title in Dark Orange */}
                  <div className="pt-3.5 pb-1 text-center">
                    <h3 className="text-base sm:text-lg font-bold text-[#c94e00] group-hover:text-[#ea6800] transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </AutoSliderRow>
          </div>

        </div>
      </section>

      {/* 7. Reach Out Now! Section (Get A Quote Form + Workshop Map) */}
      <section className="py-14 sm:py-20 bg-white">
        <ReachOutSection containerClassName="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 reveal-on-scroll" />
      </section>

    </div>
  );
};
