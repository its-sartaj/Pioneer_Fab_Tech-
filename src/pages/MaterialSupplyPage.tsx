import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  ChevronRight,
  ChevronLeft,
  Eye
} from 'lucide-react';
import { MATERIAL_SUPPLY_ITEMS, MaterialSupplyItem, COMPANY_INFO } from '../data/siteData';
import { PageId } from '../components/Navbar';
import { smoothScrollIntoView } from '../utils/smoothScroll';

interface MaterialSupplyPageProps {
  onNavigate: (page: PageId, itemId?: string) => void;
  selectedItemId?: string | null;
}

export const MaterialSupplyPage: React.FC<MaterialSupplyPageProps> = ({ onNavigate, selectedItemId }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    if (selectedItemId && MATERIAL_SUPPLY_ITEMS.some(m => m.id === selectedItemId)) {
      return selectedItemId;
    }
    return 'all';
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (selectedItemId && MATERIAL_SUPPLY_ITEMS.some(m => m.id === selectedItemId)) {
      setSelectedProductId(selectedItemId);
      const timer = setTimeout(() => {
        const el = document.getElementById('material-view-container');
        if (el) {
          smoothScrollIntoView(el);
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (!selectedItemId) {
      setSelectedProductId('all');
    }
  }, [selectedItemId]);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    onNavigate('materials', productId);
    const el = document.getElementById('material-view-container');
    if (el) smoothScrollIntoView(el);
  };

  const handleShowAllProducts = () => {
    setSelectedProductId('all');
    onNavigate('materials');
  };

  const categories = [
    { id: 'all', label: 'All Materials', count: MATERIAL_SUPPLY_ITEMS.length },
    { id: 'stainless-steel', label: 'Stainless Steel', count: MATERIAL_SUPPLY_ITEMS.filter(m => m.category === 'stainless-steel').length },
    { id: 'copper', label: 'Copper', count: MATERIAL_SUPPLY_ITEMS.filter(m => m.category === 'copper').length },
    { id: 'aluminium', label: 'Aluminium', count: MATERIAL_SUPPLY_ITEMS.filter(m => m.category === 'aluminium').length },
    { id: 'titanium', label: 'Titanium', count: MATERIAL_SUPPLY_ITEMS.filter(m => m.category === 'titanium').length },
    { id: 'structural', label: 'Structural Steel', count: MATERIAL_SUPPLY_ITEMS.filter(m => m.category === 'structural').length },
  ];

  const filteredGridItems = selectedCategory === 'all' 
    ? MATERIAL_SUPPLY_ITEMS 
    : MATERIAL_SUPPLY_ITEMS.filter(item => item.category === selectedCategory);

  const currentProduct = MATERIAL_SUPPLY_ITEMS.find(m => m.id === selectedProductId);
  const currentIndex = currentProduct ? MATERIAL_SUPPLY_ITEMS.findIndex(m => m.id === currentProduct.id) : -1;
  const prevProduct = currentIndex > 0 ? MATERIAL_SUPPLY_ITEMS[currentIndex - 1] : null;
  const nextProduct = currentIndex >= 0 && currentIndex < MATERIAL_SUPPLY_ITEMS.length - 1 ? MATERIAL_SUPPLY_ITEMS[currentIndex + 1] : null;

  const handleWhatsAppEnquiry = (itemName: string) => {
    const text = encodeURIComponent(`Hi Pioneer Fab Tech, I would like to inquire about pricing, stock availability, and Mill Test Certificates for ${itemName}.`);
    window.open(`https://wa.me/919029555233?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* =====================================================================
          1. Hero Header Banner matching Site Theme
         ===================================================================== */}
      <section className="relative bg-slate-950 text-white py-14 sm:py-20 overflow-hidden border-b border-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
          style={{ backgroundImage: "url('/assets/images/achievements_bg_1793880633351.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950" />
        
        {/* Subtle orange accent glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff7a00] to-transparent shadow-[0_0_12px_#ff7a00]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 reveal-word">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
            Material Supply
          </h1>
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button 
              onClick={handleShowAllProducts}
              className="text-white font-bold select-none hover:text-amber-400 transition-colors cursor-pointer"
            >
              Material Supply
            </button>
            {currentProduct && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-white font-bold select-none">{currentProduct.name}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. Main Material Catalog Section with Interactive Selection
         ===================================================================== */}
      <section id="material-view-container" className="scroll-mt-24 lg:scroll-mt-32 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-200 w-full" />
            <div className="absolute bg-slate-50 px-6 flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-[#d95800] uppercase tracking-wider">
                {currentProduct ? currentProduct.name : 'Explore Our Material Supply'}
              </span>
            </div>
          </div>

          {/* =================================================================
              CONTENT: SINGLE SELECTED PRODUCT VIEW OR ALL MATERIALS GRID
             ================================================================= */}
          {currentProduct ? (
            <div key={currentProduct.id} className="max-w-5xl mx-auto space-y-6 mt-8 animate-in fade-in">
              
              {/* Main Single Product Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                    
                    {/* Top Hero Image with Badges */}
                    <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-100 overflow-hidden">
                      <img 
                        src={currentProduct.image} 
                        alt={currentProduct.name}
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="bg-slate-900/95 md:backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                          Item #{currentProduct.itemNumber}
                        </span>
                        <span className="bg-emerald-600/95 md:backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                          Ready Stock Available
                        </span>
                      </div>

                      {/* Bottom Image Overlay Title */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                          {currentProduct.categoryLabel}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-0.5">
                          {currentProduct.name}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1">
                          {currentProduct.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Specifications Body */}
                    <div className="p-6 sm:p-8 space-y-6">
                      
                      {/* Description */}
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Product Overview
                        </h3>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                          {currentProduct.description}
                        </p>
                      </div>

                      {/* Technical Specs 4-Box Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Grades */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <span className="text-xs font-black uppercase text-slate-900 tracking-wide block">
                            Material Grades Available:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {currentProduct.grades.map((grade, idx) => (
                              <span 
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                              >
                                {grade}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Dimensions */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <span className="text-xs font-black uppercase text-slate-900 tracking-wide block">
                            Dimensions & Sizes:
                          </span>
                          <p className="text-xs font-medium text-slate-700 leading-relaxed">
                            {currentProduct.dimensions}
                          </p>
                        </div>

                        {/* Standards */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <span className="text-xs font-black uppercase text-slate-900 tracking-wide block">
                            Compliance Standards:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {currentProduct.standards.map((std, idx) => (
                              <span 
                                key={idx}
                                className="px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200 text-xs font-bold text-[#c95100]"
                              >
                                {std}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Finishes */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                          <span className="text-xs font-black uppercase text-slate-900 tracking-wide block">
                            Surface Finishes:
                          </span>
                          <p className="text-xs font-medium text-slate-700 leading-relaxed">
                            {currentProduct.finishes.join(', ')}
                          </p>
                        </div>

                      </div>

                      {/* Typical Applications */}
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                        <span className="text-xs font-black uppercase text-slate-900 tracking-wide block">
                          Key Industry Applications:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {currentProduct.applications.map((app, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{app}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quality & Mill Certificate Guarantee Strip */}
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold">
                          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>EN 10204 3.1 Mill Test Certificate (MTC) Guaranteed with Every Dispatch</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-semibold bg-white/80 px-2.5 py-1 rounded-md border border-emerald-200">
                          100% Genuine Tested
                        </span>
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => handleWhatsAppEnquiry(currentProduct.name)}
                          className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Request {currentProduct.name} Quote via WhatsApp</span>
                        </button>
                        
                        <a
                          href={`tel:${COMPANY_INFO.phoneRaw}`}
                          className="py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          <Phone className="w-4 h-4 text-amber-400" />
                          <span>Call Sales: {COMPANY_INFO.phone}</span>
                        </a>
                      </div>

                    </div>

                    {/* Bottom Navigation: Previous & Next Product */}
                    <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                      {prevProduct ? (
                        <button
                          onClick={() => handleSelectProduct(prevProduct.id)}
                          className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#d95800] transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="hidden sm:inline">Previous:</span>
                          <span>{prevProduct.name}</span>
                        </button>
                      ) : <div />}

                      {nextProduct ? (
                        <button
                          onClick={() => handleSelectProduct(nextProduct.id)}
                          className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#d95800] transition-colors cursor-pointer"
                        >
                          <span className="hidden sm:inline">Next:</span>
                          <span>{nextProduct.name}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : <div />}
                    </div>

                  </div>

                </div>
              ) : (
                /* =============================================================
                    SCENARIO 2: ALL MATERIALS GRID VIEW
                   ============================================================= */
                <div className="space-y-6">
                  
                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                          selectedCategory === cat.id
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                          selectedCategory === cat.id ? 'bg-[#ff7a00] text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredGridItems.map((item: MaterialSupplyItem, idx: number) => (
                      <div key={item.id} className={`reveal-on-scroll ${idx % 2 === 1 ? 'delay-75' : ''} flex`}>
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden group hover:border-[#ff7a00]/40 w-full transform-gpu">
                        <div>
                          {/* Image */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 transform-gpu"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute top-3 right-3 bg-emerald-600/95 md:backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                              Ready Stock
                            </div>
                            <div className="absolute bottom-3 left-3 bg-slate-900/90 md:backdrop-blur-xs text-slate-200 px-2 py-0.5 rounded text-[11px] font-medium">
                              {item.categoryLabel}
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-5 space-y-3">
                            <div>
                              <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-[#d95800] transition-colors">
                                {item.name}
                              </h3>
                              <p className="text-xs font-semibold text-[#c95100] mt-0.5">
                                {item.subtitle}
                              </p>
                            </div>

                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                              {item.description}
                            </p>

                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
                              <div>
                                <span className="font-bold text-slate-800">Grades: </span>
                                <span className="text-slate-600">{item.grades.slice(0, 4).join(', ')}</span>
                              </div>
                              <div>
                                <span className="font-bold text-slate-800">Standards: </span>
                                <span className="text-slate-600">{item.standards.join(' • ')}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="p-5 pt-0 space-y-2">
                          <button
                            onClick={() => handleSelectProduct(item.id)}
                            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#ff7a00] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group/btn"
                          >
                            <Eye className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-white" />
                            <span>View Only {item.name}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>

                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

        </div>
      </section>

    </div>
  );
};
