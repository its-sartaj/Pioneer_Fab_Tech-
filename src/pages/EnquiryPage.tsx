import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Upload, 
  MessageCircle, 
  CheckCircle2, 
  Copy, 
  Sparkles, 
  Phone, 
  MapPin, 
  FileText, 
  Image as ImageIcon,
  HelpCircle,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

const REQUIREMENT_OPTIONS = [
  'Spiral / Helical Staircase',
  'SS 304 / Glass Balcony Railing',
  'CNC Laser Cut Partition (Jali)',
  'Commercial Glass Facade / Shopfront',
  'Elevator Portal & Jamb Cladding',
  'Industrial Platform & Mezzanine',
  'Custom Architectural Gate / Canopy',
  'PVD Titanium Gold Coating',
];

const CATEGORIES = [
  { id: 'staircase', label: 'Architectural Staircases', rateDesc: 'Custom spiral, helical or straight stringer' },
  { id: 'railing', label: 'SS & Glass Balustrades', rateDesc: 'Spigot, base-shoe channel or post system' },
  { id: 'laser-screen', label: 'CNC Laser Cut Jali & Screens', rateDesc: 'SS 304 / Brass PVD coated partition panels' },
  { id: 'facade-doors', label: 'Commercial Facades & Doors', rateDesc: 'Toughened glass storefronts, arched steel doors' },
  { id: 'elevator-cladding', label: 'Elevator Portal Cladding', rateDesc: 'Transom & jamb stainless steel wrapping' },
  { id: 'industrial', label: 'Industrial Heavy Metalwork', rateDesc: 'Plant platforms, stairs & security barrier cages' },
  { id: 'other', label: 'Other Custom Metal Fabrication', rateDesc: 'Specialized bespoke fabrication engineering' },
];

const SAMPLE_REFERENCE_DRAWINGS = [
  { id: 'sample-spiral', name: 'Spiral Stair CAD Layout', thumb: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.05_PM_0a02320f.jpeg' },
  { id: 'sample-jali', name: 'Geometric Jali Screen 3D', thumb: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.05_PM__2__0873d20e.jpeg' },
  { id: 'sample-facade', name: 'Storefront Elevation', thumb: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.04_PM__1__313234b2.jpeg' },
  { id: 'sample-lift', name: 'Elevator Cladding Detail', thumb: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.03_PM__2__e0b466fd.jpeg' },
];

export const EnquiryPage: React.FC = () => {
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    'Spiral / Helical Staircase'
  ]);
  const [category, setCategory] = useState<string>('staircase');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [selectedReference, setSelectedReference] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Clean up object URL when replaced or component unmounts
  useEffect(() => {
    return () => {
      if (uploadedPreview) {
        URL.revokeObjectURL(uploadedPreview);
      }
    };
  }, [uploadedPreview]);

  const toggleRequirement = (req: string) => {
    setSelectedRequirements((prev) => 
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setUploadedPreview(url);
      } else {
        setUploadedPreview(null);
      }
      setSelectedReference(null);
    }
  };

  // Compile full quote summary for WhatsApp & preview
  const generateSummaryText = () => {
    return `*NEW PROJECT QUOTE ENQUIRY - PIONEER FAB TECH*
---------------------------------------
👤 *Client Name:* ${name.trim() || 'Valued Client'}
📞 *Phone Number:* ${phone.trim() || 'Not provided'}
📧 *Email:* ${email.trim() || 'Not provided'}
📍 *Project Location:* ${location.trim() || 'Not specified'}

🛠️ *Category:* ${CATEGORIES.find(c => c.id === category)?.label || category}
📋 *Selected Requirements:*
${selectedRequirements.map(r => `• ${r}`).join('\n') || 'General Fabrication'}

📝 *Work Description & Dimensions:*
${description.trim() || 'Standard site inspection requested'}

📎 *Drawing / Reference:* ${uploadedFileName || (selectedReference ? `Sample design preset: ${selectedReference}` : 'Will share over WhatsApp / site visit')}
---------------------------------------
Sent via Pioneer Fab Tech Official Web Portal
Website: vasai-virar, Maharashtra`;
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(generateSummaryText());
    window.open(`https://wa.me/919029555233?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide your name and phone number to request a quote.');
      return;
    }
    setSubmitted(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSummaryText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-10 reveal-word">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Fast Turnaround • Free Initial CAD Guidance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Request a Project Quote
          </h1>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Fill in your project specifications below. Our senior fabrication engineers in Vasai-Virar will review your dimensions, material grades, and provide an accurate itemized estimate.
          </p>
        </div>

        {/* 2-Column Layout: Form on Left, Example Enquiry Form Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 reveal-from-left">
            
            <form onSubmit={handleSubmit} className="space-y-7">
              
              {/* 1. Select Your Requirement */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  1. Select Your Requirement <span className="text-amber-600">*</span>
                </label>
                <p className="text-xs text-slate-500 mb-3">
                  Click all that apply for your commercial or residential project.
                </p>
                <div className="flex flex-wrap gap-2">
                  {REQUIREMENT_OPTIONS.map((req) => {
                    const isSelected = selectedRequirements.includes(req);
                    return (
                      <button
                        type="button"
                        key={req}
                        onClick={() => toggleRequirement(req)}
                        className={`text-xs font-semibold px-3 py-2 rounded-lg transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {req}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Project Category */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  2. Project Category <span className="text-amber-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CATEGORIES.map((cat) => {
                    const isCurrent = category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold text-xs">{cat.label}</div>
                        <div className={`text-[11px] mt-0.5 line-clamp-1 ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                          {cat.rateDesc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Project Location */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  3. Project Location <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bandra West, Mumbai / Vasai / Thane / Pune / Vapi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {['Vasai-Virar', 'Mumbai Suburbs', 'South Mumbai', 'Thane', 'Pune'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setLocation(loc)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      +{loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Work Description & Dimensions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-slate-900">
                    4. Work Description & Dimensions
                  </label>
                  <span className="text-xs text-slate-400">Approximate is fine</span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Describe your design concept, height, linear footage, preferred metal (SS 304, Mild Steel, Brass), finish (Gold PVD, Matt Black, Mirror), or glass specs..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[11px] text-slate-400">Quick inserts:</span>
                  {[
                    'Height: 10 ft floor-to-floor',
                    'SS 304 Grade',
                    'Titanium Gold PVD finish',
                    '12mm Toughened Glass',
                    'Need site visit for measurements'
                  ].map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => setDescription(prev => prev ? `${prev}, ${phrase}` : phrase)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-600 transition-colors"
                    >
                      +{phrase}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Drawing / Reference Image Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">
                  5. Drawing / Reference Image Upload
                </label>
                <div className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl p-5 text-center bg-slate-50/50 transition-colors">
                  <input
                    type="file"
                    id="drawing-file-upload"
                    accept="image/*,.pdf,.dwg,.dxf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="drawing-file-upload" className="cursor-pointer block">
                    <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <span className="text-xs font-semibold text-slate-800 hover:text-amber-600">
                      Click to upload CAD, PDF, or Photo drawing
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Supports JPG, PNG, PDF, DWG (Max 25MB)
                    </p>
                  </label>

                  {uploadedFileName && (
                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span className="font-medium truncate max-w-xs">{uploadedFileName}</span>
                      <button 
                        type="button"
                        onClick={() => { setUploadedFileName(null); setUploadedPreview(null); }}
                        className="text-slate-400 hover:text-rose-600 ml-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {uploadedPreview && (
                    <div className="mt-3 flex justify-center">
                      <img 
                        src={uploadedPreview} 
                        alt="Uploaded preview" 
                        className="h-24 w-auto rounded-lg object-cover border border-slate-200 shadow-xs" 
                      />
                    </div>
                  )}
                </div>

                {/* Or Select from sample Pioneer Fab Tech portfolio reference */}
                <div className="mt-3">
                  <p className="text-[11px] text-slate-500 mb-2 font-medium">
                    Or select a reference style from our workshop portfolio:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SAMPLE_REFERENCE_DRAWINGS.map((sample) => (
                      <button
                        type="button"
                        key={sample.id}
                        onClick={() => {
                          setSelectedReference(sample.name);
                          setUploadedFileName(null);
                          setUploadedPreview(null);
                        }}
                        className={`p-1.5 rounded-lg border text-left transition-all ${
                          selectedReference === sample.name
                            ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <img 
                          src={sample.thumb} 
                          alt={sample.name} 
                          className="w-full h-14 object-cover rounded-md mb-1" 
                        />
                        <span className="text-[10px] font-semibold text-slate-700 block truncate">
                          {sample.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Name and Phone Number */}
              <div className="pt-2 border-t border-slate-200">
                <label className="block text-sm font-bold text-slate-900 mb-3">
                  6. Contact Details <span className="text-amber-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma / Ar. Sneha Patel"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Project Quote Request</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Dispatch</span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                🔒 Your specifications will be kept confidential. We provide site inspections across Mumbai & Palghar.
              </p>

            </form>
          </div>

          {/* Right Column: "Example Enquiry Form Preview" as explicitly requested by user */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Enquiry Preview Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-28 reveal-from-right delay-150">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    Live Form Preview
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Example Enquiry Form Preview
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Copy enquiry text"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Preview Body */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-xs text-slate-700 space-y-2.5 overflow-x-auto leading-relaxed">
                <div className="text-slate-900 font-bold border-b border-slate-200 pb-2">
                  TO: PIONEER FAB TECH (VASAI-VIRAR)
                </div>
                <div>
                  <span className="text-slate-400">Client: </span>
                  <span className="font-semibold text-slate-900">{name || '[Your Name]'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Phone: </span>
                  <span className="font-semibold text-slate-900">{phone || '[Your Phone]'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Location: </span>
                  <span className="font-semibold text-slate-900">{location || '[Site Location]'}</span>
                </div>
                <div>
                  <span className="text-slate-400">Category: </span>
                  <span className="font-semibold text-slate-900">
                    {CATEGORIES.find(c => c.id === category)?.label}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Requirements:</span>
                  <ul className="pl-3 mt-1 list-disc list-inside text-slate-800">
                    {selectedRequirements.map(r => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-slate-400">Work Scope: </span>
                  <div className="text-slate-800 bg-white p-2 rounded border border-slate-200 mt-1">
                    {description || 'Pending architectural details / on-site discussion.'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400">Attached Drawing: </span>
                  <span className="text-slate-900 font-semibold">
                    {uploadedFileName || selectedReference || 'Will furnish upon site survey'}
                  </span>
                </div>
              </div>

              {/* Action within preview */}
              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send This Enquiry Directly via WhatsApp</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-5 border-t border-slate-200 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct workshop pricing with no middleman markup</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Site visit & measurement team in Vasai, Mumbai & Thane</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Detailed CAD drawings provided before fabrication begins</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Confirmation Modal */}
      {submitted && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center shadow-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Quote Request Received!
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Thank you, <span className="font-semibold">{name}</span>. Our engineering team at Pioneer Fab Tech has received your project requirement for <span className="font-semibold">{location}</span>.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              We will contact you on <span className="font-semibold text-slate-900">{phone}</span> within 2 business hours.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Also Notify Us on WhatsApp for Priority</span>
              </button>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
