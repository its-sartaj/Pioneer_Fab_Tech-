import React from 'react';
import { 
  MessageSquare, 
  Compass, 
  Hammer, 
  CheckCircle2, 
  Truck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { WORK_PROCESS } from '../data/siteData';
import { AutoSliderRow } from './AutoSliderRow';

const stepIcons: Record<string, React.ElementType> = {
  MessageSquare,
  Compass,
  Hammer,
  CheckCircle2,
  Truck,
};

interface WorkProcessSectionProps {
  onOpenEnquiry?: () => void;
}

export const WorkProcessSection: React.FC<WorkProcessSectionProps> = ({ onOpenEnquiry }) => {
  return (
    <section className="py-14 sm:py-18 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle grid pattern backdrop */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Centered as requested */}
        <div className="text-center max-w-2xl mx-auto mb-10 reveal-word">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Our Work Process
          </h2>
        </div>

        {/* 5-Step Process in Compact Line-wise Auto-Slider without arrows */}
        <div className="reveal-on-scroll delay-150">
          <AutoSliderRow intervalMs={3600}>
          {WORK_PROCESS.map((step) => {
            const Icon = stepIcons[step.iconName] || Hammer;
            return (
              <div
                key={step.id}
                onClick={onOpenEnquiry}
                className="group relative w-[230px] sm:w-[260px] h-[190px] sm:h-[210px] shrink-0 rounded-2xl p-5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400/80 transition-[background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 flex flex-col justify-between cursor-pointer select-none shadow-md hover:shadow-xl transform-gpu"
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-mono font-black text-amber-400">
                    {step.stepNumber}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-700/80 group-hover:bg-amber-500 group-hover:text-slate-950 text-amber-400 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Step Title & Short Hindi Tagline (Descriptions removed as requested) */}
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {step.title}
                  </h3>
                  <div className="inline-block text-xs font-medium text-amber-400/90 mt-1.5">
                    "{step.hindiDescription}"
                  </div>
                </div>
              </div>
            );
          })}
        </AutoSliderRow>
        </div>

        {/* Process Action CTA */}
        {onOpenEnquiry && (
          <div className="mt-12 text-center">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <span>Discuss Your Project Requirements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
