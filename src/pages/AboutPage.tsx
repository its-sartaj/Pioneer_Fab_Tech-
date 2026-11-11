import React from 'react';
import {
  Eye,
  Target,
  ShieldCheck,
  Handshake,
  Crosshair,
  Users,
  TrendingUp,
  Compass,
} from 'lucide-react';
import { OurClientsSlider } from '../components/OurClientsSlider';
import { PageId } from '../components/Navbar';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

const CORE_VALUES = [
  {
    title: 'Quality',
    description: 'Emphasizing suitable material specifications and quality workmanship.',
    icon: ShieldCheck,
  },
  {
    title: 'Reliability',
    description: 'Building trust through professional commitments and dependable service.',
    icon: Handshake,
  },
  {
    title: 'Precision',
    description: 'Giving attention to dimensions, detailing, finishing and project requirements.',
    icon: Crosshair,
  },
  {
    title: 'Customer Focus',
    description: 'Understanding individual requirements and providing appropriate solutions.',
    icon: Users,
  },
  {
    title: 'Continuous Improvement',
    description: 'Striving to enhance our products, services and business capabilities.',
    icon: TrendingUp,
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* 1. Header Banner */}
      <div className="relative py-14 sm:py-18 bg-slate-900 overflow-hidden text-center">
        <img
          src="/assets/achievements_bg.jpg"
          alt="About Us Header"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

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

      {/* 2. Company Profile & About Us Overview */}
      <section className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: About Us Text */}
            <div className="lg:col-span-7 space-y-5 reveal-from-left">
              <div className="space-y-2">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#d95800] border-b-2 border-amber-500 pb-1 inline-block">
                  ABOUT US
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight pt-1">
                  PIONEER FAB TECH
                </h2>
                <p className="text-base sm:text-lg font-bold text-[#c95100] tracking-tight">
                  Building Possibilities Through Metal &amp; Engineering
                </p>
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Pioneer Fab Tech is a professionally driven enterprise operating across the industrial metal trading and architectural &amp; industrial fabrication sectors.
                </p>
                <p>
                  We bring together material expertise and fabrication solutions to serve the evolving requirements of industries, businesses, architects, contractors and infrastructure developers.
                </p>
                <p>
                  Our business is built around the understanding that every project requires the right materials, dependable sourcing, technical attention and quality workmanship. Whether it involves supplying industrial-grade metal products or developing customized architectural and fabrication solutions, we strive to deliver value at every stage.
                </p>
                <p>
                  Through our metal products division, we offer a wide range of stainless steel, copper, aluminium and titanium products, including sheets, coils, pipes, tubes, flanges, fittings, round bars and structural materials.
                </p>
                <p>
                  Our architectural and industrial fabrication division focuses on transforming metal into practical and aesthetically appealing solutions. Our work includes architectural staircases, CNC laser-cut decorative jali, glass facades, commercial shopfronts, elevator cladding, SS and glass railings, handrails and specialized industrial fabrication.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] cursor-pointer shadow-xs"
                >
                  Explore Our Services
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/80 font-bold text-xs uppercase tracking-wider transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] cursor-pointer"
                >
                  Contact Our Workshop
                </button>
              </div>
            </div>

            {/* Right Column: Industrial Fabrication Photo */}
            <div className="lg:col-span-5 reveal-from-right delay-150">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group bg-slate-100">
                <img
                  src="/assets/images/about_ss_pipe_fittings_1794245348614.jpg"
                  alt="Pioneer Fab Tech Precision Industrial Stainless Steel Pipe Fittings & Fabrication"
                  className="w-full h-[340px] sm:h-[480px] lg:h-[580px] object-cover group-hover:scale-103 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Our Vision & Our Mission */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

            {/* Our Vision */}
            <div className="reveal-on-scroll flex">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#d95800]/40 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 flex flex-col justify-between w-full transform-gpu">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#d95800] flex items-center justify-center">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Our Vision
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    To establish Pioneer Fab Tech as a trusted and recognized business name in metal products trading and architectural &amp; industrial fabrication by continuously improving our capabilities and delivering dependable solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="reveal-on-scroll delay-75 flex">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-7 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-[#d95800]/40 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 flex flex-col justify-between w-full transform-gpu">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    To serve our customers with suitable material solutions, customized fabrication services and professional business support while maintaining a strong focus on quality, reliability and long-term relationships.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Core Values */}
      <section className="py-14 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="text-center reveal-word">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Our Core Values
            </h2>
            <div className="h-1 w-16 bg-[#d95800] rounded-full mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              const colSpan = idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';
              const delayClasses = ['', 'delay-75', 'delay-150', 'delay-75', 'delay-150'];
              return (
                <div
                  key={val.title}
                  className={`${colSpan} reveal-on-scroll ${delayClasses[idx] || ''} flex`}
                >
                  <div className="group w-full rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/90 hover:border-[#d95800]/50 p-6 sm:p-7 shadow-2xs hover:shadow-md transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 flex flex-col gap-3 transform-gpu">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 group-hover:bg-[#d95800] group-hover:border-[#d95800] text-[#d95800] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-250">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                        {val.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Our Approach */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white rounded-2xl sm:rounded-3xl p-7 sm:p-11 border border-slate-200/90 shadow-sm reveal-on-scroll">
            <div className="flex flex-col md:flex-row md:items-start gap-5 sm:gap-7">
              <div className="w-13 h-13 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#d95800] flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Our Approach
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
                  At Pioneer Fab Tech, we believe that strong business relationships are built through trust, transparency and consistent performance. We work towards understanding our customers&apos; expectations and providing solutions aligned with their material and project requirements.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Our Client Section */}
      <div className="reveal-on-scroll">
        <OurClientsSlider />
      </div>

    </div>
  );
};
