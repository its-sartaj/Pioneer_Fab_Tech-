import React from 'react';

export const PageSkeleton: React.FC = () => {
  return (
    <div className="min-h-[70vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-10">
      {/* Top Banner / Heading Shimmer */}
      <div className="space-y-3 max-w-3xl">
        <div className="h-6 w-44 rounded-full bg-slate-200" />
        <div className="h-10 w-3/4 max-w-lg rounded-xl bg-slate-200" />
        <div className="h-4 w-full max-w-xl rounded bg-slate-200/80" />
        <div className="h-4 w-2/3 max-w-md rounded bg-slate-200/70" />
      </div>

      {/* Grid of Skeleton Cards (Line-wise / Grid shimmer) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs space-y-3 overflow-hidden"
          >
            {/* Image Placeholder */}
            <div className="aspect-4/3 w-full rounded-xl bg-slate-200" />
            {/* Title & Badge Placeholder */}
            <div className="space-y-2 pt-1">
              <div className="h-3.5 w-20 rounded bg-amber-500/20" />
              <div className="h-4 w-5/6 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-200/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
