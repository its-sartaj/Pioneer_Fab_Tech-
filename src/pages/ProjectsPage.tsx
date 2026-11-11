import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Filter,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Grid,
  Calendar,
  ShieldCheck,
  Phone,
  Eye
} from 'lucide-react';
import { PROJECTS, ProjectItem, COMPANY_INFO } from '../data/siteData';
import { PageId } from '../components/Navbar';
import { smoothScrollIntoView } from '../utils/smoothScroll';

interface ProjectsPageProps {
  onNavigate: (page: PageId, itemId?: string) => void;
  selectedItemId?: string | null;
}

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Projects' },
  { id: 'hyatt-delhi', label: 'Hyatt Hotels Delhi' },
  { id: 'hyatt-pune', label: 'Hyatt Hotels Pune' },
  { id: 'nexus-hyderabad', label: 'Nexus Mall Hyderabad' },
  { id: 'westend-pune', label: 'Westend Mall Pune' },
  { id: 'nexus-mumbai', label: 'Nexus Mumbai' },
  { id: 'nexus-pune', label: 'Nexus Mall Pune' },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, selectedItemId }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => {
    if (selectedItemId && PROJECTS.some(p => p.id === selectedItemId)) {
      return selectedItemId;
    }
    return 'all';
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchLocation, setSearchLocation] = useState<string>('');

  useEffect(() => {
    if (selectedItemId && PROJECTS.some(p => p.id === selectedItemId)) {
      setSelectedProjectId(selectedItemId);
      const timer = setTimeout(() => {
        const el = document.getElementById('project-view-container');
        if (el) smoothScrollIntoView(el);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!selectedItemId) {
      setSelectedProjectId('all');
    }
  }, [selectedItemId]);

  const currentProject = PROJECTS.find(p => p.id === selectedProjectId);
  const currentIndex = currentProject ? PROJECTS.findIndex(p => p.id === currentProject.id) : -1;
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    onNavigate('projects', projectId);
    const el = document.getElementById('project-view-container');
    if (el) smoothScrollIntoView(el);
  };

  const handleShowAll = () => {
    setSelectedProjectId('all');
    onNavigate('projects');
  };

  const handleWhatsAppEnquiry = (projectTitle: string) => {
    const text = encodeURIComponent(`Hi Pioneer Fab Tech, I am interested in your project: "${projectTitle}". I would like to discuss engineering specifications and get a quotation for a similar requirement.`);
    window.open(`https://wa.me/919029555233?text=${text}`, '_blank');
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    const matchCategory = activeCategory === 'all' || proj.category === activeCategory;
    const matchLocation = !searchLocation || 
      proj.location.toLowerCase().includes(searchLocation.toLowerCase()) || 
      proj.clientType.toLowerCase().includes(searchLocation.toLowerCase()) ||
      proj.title.toLowerCase().includes(searchLocation.toLowerCase());
    return matchCategory && matchLocation;
  });

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* 1. Header Banner matching About Us */}
      <div className="relative py-14 sm:py-18 bg-slate-900 overflow-hidden text-center">
        <img
          src="/assets/achievements_bg.jpg"
          alt="Our Projects Header"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

        <div className="relative z-10 space-y-1 px-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Our Projects
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400 select-none">•</span>
            <button
              onClick={handleShowAll}
              className={`hover:text-amber-400 transition-colors cursor-pointer ${
                selectedProjectId === 'all' ? 'text-white font-bold' : 'text-slate-200'
              }`}
            >
              Our Projects
            </button>
            {currentProject && (
              <>
                <span className="text-slate-400 select-none">•</span>
                <span className="text-amber-400 font-bold truncate max-w-[260px] sm:max-w-md select-none">
                  {currentProject.title}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">

        {/* Section Intro */}
        <div className="max-w-3xl reveal-word">
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore authentic fabrications engineered at our Vasai-Virar facility and installed on site across Mumbai, Thane, Pune, and regional architectural landmarks.
          </p>
        </div>

        {/* =====================================================================
            2. Main Content (Single Project View OR Overview Grid)
           ===================================================================== */}
        <div id="project-view-container" className="scroll-mt-24 lg:scroll-mt-32">
          
          {/* ===================================================================
              SCENARIO 1: SINGLE SELECTED PROJECT (BASS WAHI PROJECT KHULEGA)
             =================================================================== */}
          {currentProject ? (
            <div key={currentProject.id} className="max-w-5xl mx-auto space-y-6 animate-in fade-in">
              
              {/* Main Single Project Card */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
                
                {/* Photo Banner with Badges */}
                <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full bg-slate-900 overflow-hidden">
                  <img 
                    src={currentProject.image} 
                    alt={currentProject.title}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-slate-900/95 md:backdrop-blur-md text-amber-400 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                      {currentProject.categoryLabel}
                    </span>
                    <span className="bg-emerald-600/95 md:backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                      Completed: {currentProject.completionYear}
                    </span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{currentProject.location}</span>
                      <span>•</span>
                      <span>{currentProject.clientType}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-snug">
                      {currentProject.title}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Project Scope Description */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Project Scope & Architecture
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Materials & Metal Specifications */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <span className="text-xs font-black uppercase text-slate-900 tracking-wide block">
                      Materials & Metal Specifications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.materials.map((mat, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engineering & Installation Features */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <span className="text-xs font-black uppercase text-slate-900 tracking-wide block">
                      Key Engineering & Execution Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                      {currentProject.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fabrication & Quality Assurance Box */}
                  <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#c95100] font-bold">
                      <ShieldCheck className="w-5 h-5 text-[#db5d00] shrink-0" />
                      <span>Fabricated at Vasai-Virar Workshop with Full On-Site Turnkey Erection</span>
                    </div>
                    <span className="text-[11px] text-[#c95100] font-bold bg-white px-2.5 py-1 rounded-md border border-orange-300">
                      100% Quality Inspected
                    </span>
                  </div>

                  {/* Call to Action Buttons */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handleWhatsAppEnquiry(currentProject.title)}
                      className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Inquire This Project via WhatsApp</span>
                    </button>
                    
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>Call Engineering: {COMPANY_INFO.phone}</span>
                    </a>
                  </div>

                </div>

                {/* Bottom Navigation: Previous & Next Project */}
                <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  {prevProject ? (
                    <button
                      onClick={() => handleSelectProject(prevProject.id)}
                      className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#d95800] transition-colors cursor-pointer max-w-[45%]"
                    >
                      <ChevronLeft className="w-4 h-4 shrink-0" />
                      <span className="truncate">Previous: {prevProject.title.split('-')[0].trim()}</span>
                    </button>
                  ) : <div />}

                  {nextProject ? (
                    <button
                      onClick={() => handleSelectProject(nextProject.id)}
                      className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#d95800] transition-colors cursor-pointer max-w-[45%] text-right"
                    >
                      <span className="truncate">Next: {nextProject.title.split('-')[0].trim()}</span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  ) : <div />}
                </div>

              </div>

            </div>
          ) : (
            /* =================================================================
                SCENARIO 2: ALL PROJECTS OVERVIEW GRID VIEW
               ================================================================= */
            <div className="space-y-6">
              
              {/* Filter Controls (Segmented Buttons + Location Filter) */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 reveal-on-scroll">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  
                  {/* Category Segmented Control */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                    {CATEGORY_FILTERS.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                            isActive
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick search by location/client */}
                  <div className="w-full md:w-64">
                    <input
                      type="text"
                      placeholder="Search by city or project..."
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Showing <strong className="text-slate-900 font-semibold">{filteredProjects.length}</strong> authenticated project case studies</span>
                  {searchLocation && (
                    <button 
                      onClick={() => setSearchLocation('')}
                      className="text-[#c95100] font-semibold hover:underline cursor-pointer"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>

              {/* Project Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => {
                  const delayClasses = ['', 'delay-75', 'delay-150'];
                  return (
                    <div key={project.id} className={`reveal-on-scroll ${delayClasses[idx % 3]} flex`}>
                      <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 flex flex-col justify-between group hover:border-[#d95800]/40 w-full transform-gpu">
                    <div>
                      {/* Real Photo */}
                      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute top-3 left-3 bg-slate-950/90 md:backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                          {project.categoryLabel}
                        </div>
                        <div className="absolute bottom-3 right-3 bg-white/95 md:backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xs">
                          {project.completionYear}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#d95800]">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{project.location}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500 truncate">{project.clientType}</span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#d95800] transition-colors line-clamp-2">
                          {project.title}
                        </h3>

                        <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        {/* Materials Tags */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100">
                          <div className="flex flex-wrap gap-1">
                            {project.materials.slice(0, 3).map((mat, i) => (
                              <span 
                                key={i} 
                                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                              >
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Card Footer: View This Project Button (Opens only this project with separate link) */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => handleSelectProject(project.id)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#d95800] text-white text-xs font-bold transition-all cursor-pointer group/btn shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400 group-hover/btn:text-white" />
                        <span>View Only This Project</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                  <p className="text-base text-slate-600">No project case studies matched your current filter.</p>
                  <button
                    onClick={() => { setActiveCategory('all'); setSearchLocation(''); }}
                    className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
