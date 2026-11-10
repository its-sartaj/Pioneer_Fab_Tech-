import React from 'react';

/**
 * Renders a rising Dark Orange wavy liquid-fill background layer for `.group` cards.
 * Requires the parent card to have `group relative overflow-hidden`.
 */
export const DarkOrangeLiquidFill: React.FC = () => (
  <div className="liquid-fill-dark-orange" aria-hidden="true">
    <svg
      className="liquid-wave-dark-orange"
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
    >
      <path
        d="M0,30 Q150,0 300,30 T600,30 Q750,0 900,30 T1200,30 L1200,60 L0,60 Z"
        fill="#ea6800"
      />
    </svg>
  </div>
);
