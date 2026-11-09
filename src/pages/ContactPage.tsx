import React, { useState } from 'react';
import { 
  MapPin,
  Mail, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Send
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { PageId } from '../components/Navbar';

interface ContactPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    captcha: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  // Security Question: 4 + 2 = 6
  const num1 = 4;
  const num2 = 2;
  const expectedAnswer = num1 + num2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formData.captcha.trim(), 10) !== expectedAnswer) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Top Industrial Banner matching image_eba6d34a.png */}
      <div className="relative h-44 sm:h-52 lg:h-56 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-center px-4">
        {/* Background industrial workshop image with overlay */}
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.03_PM_2f9ff5e2.jpeg"
          alt="Contact Industrial Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        {/* Blue/black gradient overlay matching reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

        {/* Content */}
        <div className="relative z-10 space-y-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Contact
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button
              onClick={() => onNavigate?.('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400 select-none">&gt;</span>
            <span className="text-white font-bold select-none">Contact Us</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* 2. Contact Cards Row (Address, Email & Phone) */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-6 sm:gap-8 mb-14">

          {/* Card 1: Address */}
          <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center justify-start shadow-xs hover:shadow-md transition-shadow">
            <div className="mb-3 text-[#d95c18]">
              <MapPin className="w-10 h-10 stroke-[1.7]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#d95c18] mb-2 tracking-wide">
              Address
            </h3>

            <p className="text-xs font-medium text-slate-700 leading-relaxed max-w-[260px]">
              {COMPANY_INFO.address}
            </p>
          </div>

          {/* Card 2: Email */}
          <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center justify-start shadow-xs hover:shadow-md transition-shadow">
            <div className="mb-3 text-[#d95c18]">
              <Mail className="w-10 h-10 stroke-[1.7]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#d95c18] mb-2 tracking-wide">
              Email
            </h3>

            <div className="space-y-1.5 pt-1">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="block text-xs font-medium text-[#d95c18] hover:underline break-all"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          {/* Card 3: Phone No */}
          <div className="bg-white border border-slate-200/90 rounded-none p-6 sm:p-8 text-center flex flex-col items-center justify-start shadow-xs hover:shadow-md transition-shadow">
            <div className="mb-3 text-[#d95c18]">
              <Smartphone className="w-10 h-10 stroke-[1.7]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#d95c18] mb-2 tracking-wide">
              Phone No
            </h3>

            <div className="space-y-1 pt-1 text-xs">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="block font-medium text-[#d95c18] hover:underline"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>

            <h4 className="text-xs font-bold text-[#d95c18] mt-4 mb-1">
              WhatsApp & Mobile
            </h4>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#d95c18] hover:underline"
            >
              +91 90295 55233
            </a>
          </div>

        </div>

        {/* 3. Horizontal Divider with "Reach Out Now!" */}
        <div className="flex items-center justify-center my-10 sm:my-12">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-5 sm:px-8 text-xl sm:text-2xl font-bold text-[#d95c18] tracking-wide whitespace-nowrap">
            Reach Out Now!
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* 4. Split 2-Column Section: GET A QUOTE Form (Left) + Google Maps (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: GET A QUOTE Card */}
          <div className="border-2 border-[#8c360a] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#d95c18] tracking-wide mb-6 uppercase">
                GET A QUOTE
              </h2>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    Quote Request Received!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Our fabrication team will contact you shortly on <span className="font-semibold">{formData.phone}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '', captcha: '' });
                    }}
                    className="text-xs font-bold text-[#8c360a] hover:underline pt-2 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Your Name */}
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#d95c18] text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Your Email */}
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#d95c18] text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Your Number */}
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Your Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#d95c18] text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Your Message... */}
                  <div>
                    <textarea
                      rows={4}
                      required
                      placeholder="Your Message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#d95c18] text-slate-800 placeholder-slate-400 resize-y"
                    />
                  </div>

                  {/* Security Question */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs text-slate-600 block font-medium">
                      Security Question -
                    </span>
                    <span className="text-sm font-bold text-slate-900 block">
                      What is {num1} + {num2} ?
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Your Answer"
                      value={formData.captcha}
                      onChange={(e) => {
                        setFormData({ ...formData, captcha: e.target.value });
                        setCaptchaError(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#d95c18] text-slate-800 placeholder-slate-400"
                    />
                    {captchaError && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">
                        Incorrect answer. Please solve 4 + 2 = 6.
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-[#8c360a] hover:bg-[#a23d08] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Interactive Google Map with reference styling */}
          <div className="w-full min-h-[480px] lg:min-h-full border border-slate-300 overflow-hidden relative shadow-xs bg-slate-100 flex flex-col">
            {/* Google Map iFrame Embed for Vasai Virar, Palghar & Mumbai */}
            <iframe
              title="Pioneer Fab Tech Location Map"
              src="https://maps.google.com/maps?q=Vasai+Virar+Palghar+Maharashtra+401208&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[480px] border-0"
              loading="lazy"
            />
          </div>

        </div>

        {/* 5. Why Choose Us Section (Matching Reference Design) */}
        <section className="pt-16 sm:pt-20 border-t border-slate-200 mt-16 sm:mt-20">
          <div className="space-y-10 sm:space-y-12">
            
            {/* Header - ONLY "Why Choose Us" */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d95c18] tracking-normal">
                Why Choose Us
              </h2>
            </div>

            {/* 3 Clean Elevated White Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Card 1: 01 Timely Delivery */}
              <div className="bg-white rounded-none sm:rounded-sm p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="text-[#d95c18]">
                      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 6h10v6H19z" />
                        <path d="M22 12v3c-6.5 1.5-12 7-12 15h28c0-8-5.5-13.5-12-15v-3" />
                        <path d="M8 30v4h32v-4" />
                        <path d="M6 34h36" />
                        <circle cx="24" cy="23" r="3" />
                        <path d="M13 18h-4v6h4" />
                        <circle cx="9" cy="16" r="2" />
                      </svg>
                    </div>
                    <span className="text-6xl sm:text-7xl font-bold text-slate-100/90 select-none leading-none tracking-tighter">
                      01
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#9e3f14] mt-7 mb-3.5 tracking-tight">
                    Timely Delivery
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Count on Pioneer Fab Tech for punctual delivery, ensuring your projects stay on schedule.
                  </p>
                </div>
              </div>

              {/* Card 2: 02 Wide Range of Products */}
              <div className="bg-white rounded-none sm:rounded-sm p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="text-[#d95c18]">
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
                    </div>
                    <span className="text-6xl sm:text-7xl font-bold text-slate-100/90 select-none leading-none tracking-tighter">
                      02
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#9e3f14] mt-7 mb-3.5 tracking-tight">
                    Wide Range of Products
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Explore a diverse spectrum of stainless steel solutions at Pioneer Fab Tech, catering to all your needs.
                  </p>
                </div>
              </div>

              {/* Card 3: 03 Quality Assurance */}
              <div className="bg-white rounded-none sm:rounded-sm p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="text-[#d95c18]">
                      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 10h6l4 18h20l4-14H14" />
                        <path d="M18 17h18" />
                        <path d="M19 22h16" />
                        <circle cx="19" cy="35" r="3" />
                        <circle cx="33" cy="35" r="3" />
                      </svg>
                    </div>
                    <span className="text-6xl sm:text-7xl font-bold text-slate-100/90 select-none leading-none tracking-tighter">
                      03
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#9e3f14] mt-7 mb-3.5 tracking-tight">
                    Quality Assurance
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    Trust in the quality benchmarks set by Pioneer Fab Tech, ensuring precision and excellence in every product.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

      </div>

    </div>
  );
};
