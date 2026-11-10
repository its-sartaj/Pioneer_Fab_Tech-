import React from 'react';
import { 
  Building2, 
  Cpu, 
  Hammer, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { INFRASTRUCTURE_SPECS, COMPANY_INFO } from '../data/siteData';
import { PageId } from '../components/Navbar';

interface InfrastructurePageProps {
  onNavigate: (page: PageId) => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Page Header */}
        <div className="max-w-3xl reveal-word">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Vasai-Virar Manufacturing Facility</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Factory Infrastructure & Machinery
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            Our fully equipped fabrication floor at Jay Ambe Chawl Lake, Vasai Virar houses modern CNC fiber lasers, hydraulic press brakes, argon TIG welding bays, and trial pre-assembly jigs.
          </p>
        </div>

        {/* Facility Highlights Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 reveal-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Workshop Floor</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono">6,500+ Sq.Ft.</div>
              <p className="text-xs text-slate-400">Covered fabrication & assembly bays</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Lifting Capacity</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono">5-Ton Overhead</div>
              <p className="text-xs text-slate-400">EOT crane for structural steel maneuver</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">CNC Precision</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono">±0.05 mm</div>
              <p className="text-xs text-slate-400">Fiber laser positioning accuracy</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Trial Staging</span>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono">100% Pre-Fit</div>
              <p className="text-xs text-slate-400">Zero site cutting or grinding delays</p>
            </div>
          </div>
        </div>

        {/* Machinery Breakdown Cards */}
        <div className="space-y-6">
          <div className="reveal-word">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Advanced Tooling Equipment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Plant Machinery & Engineering Capabilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INFRASTRUCTURE_SPECS.map((spec, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between reveal-on-scroll ${
                  i % 3 === 1 ? 'delay-150' : i % 3 === 2 ? 'delay-300' : ''
                }`}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-bold mb-4">
                    0{i + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {spec.machine}
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600 mt-3">
                    <p>
                      <strong className="text-slate-800">Working Capacity:</strong> {spec.capacity}
                    </p>
                    <p>
                      <strong className="text-slate-800">Bed / Spec:</strong> {spec.bedSize}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    "{spec.benefit}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Site & Fabrication Team Photos */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 reveal-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Certified Riggers & Technicians
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                In-House Master Fabricators & Site Fitting Teams
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Machinery is only as good as the craftsmen operating it. Our technicians have over 14 years of hands-on experience handling architectural stainless steel, PVD coated mirror panels, and heavy structural assemblies.
              </p>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Certified Argon TIG & MIG specialized welders</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>On-site laser-levelers and structural anchors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Strict personal protective equipment (PPE) compliance</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-amber-600 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Schedule a Workshop Visit in Vasai</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl overflow-hidden aspect-4/3 shadow-xs">
                <img 
                  src="/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.03_PM_2f9ff5e2.jpeg" 
                  alt="Industrial Workshop Fabrication" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-4/3 shadow-xs">
                <img 
                  src="/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.02_PM__1__b8d93cd1.jpeg" 
                  alt="Fitting Portal On Site" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
