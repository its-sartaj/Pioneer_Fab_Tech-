import React, { useId, useState } from 'react';
import { CheckCircle2, Mail, MessageCircle, Send } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

interface ReachOutSectionProps {
  /** Optional wrapper classes (used to adapt outer padding/background on Home vs Contact page) */
  className?: string;
  /** Optional max-width container classes */
  containerClassName?: string;
}

/**
 * Shared "Reach Out Now!" section with interactive Get A Quote form and Workshop Google Map.
 */
export const ReachOutSection: React.FC<ReachOutSectionProps> = ({
  className = '',
  containerClassName = '',
}) => {
  const formIdPrefix = useId();
  const nameId = `${formIdPrefix}-name`;
  const emailId = `${formIdPrefix}-email`;
  const phoneId = `${formIdPrefix}-phone`;
  const messageId = `${formIdPrefix}-message`;
  const captchaId = `${formIdPrefix}-captcha`;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    captcha: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const [mapInteractive, setMapInteractive] = useState(false);

  // Security Question: 4 + 2 = 6
  const num1 = 4;
  const num2 = 2;
  const expectedAnswer = num1 + num2;

  const buildInquiryText = () =>
    [
      '*NEW QUOTE REQUEST - PIONEER FAB TECH*',
      `Name: ${formData.name.trim()}`,
      `Email: ${formData.email.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Message: ${formData.message.trim()}`,
      'Source: https://www.pioneerfabtech.com/',
    ].join('\n');

  const openWhatsAppInquiry = () => {
    const text = encodeURIComponent(buildInquiryText());
    window.open(`${COMPANY_INFO.whatsappUrl}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(formData.captcha.trim(), 10) !== expectedAnswer) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    openWhatsAppInquiry();
    setSubmitted(true);
  };

  const mailtoHref = `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
    `Quote Request from ${formData.name.trim() || 'Website Visitor'}`
  )}&body=${encodeURIComponent(buildInquiryText().replace(/\*/g, ''))}`;

  return (
    <div className={className}>
      <div className={containerClassName}>
        {/* Horizontal Divider with "Reach Out Now!" */}
        <div className="flex items-center justify-center mb-10 sm:mb-12 reveal-word">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-5 sm:px-8 text-xl sm:text-2xl lg:text-3xl font-bold text-[#d95800] tracking-wide whitespace-nowrap">
            Reach Out Now!
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Split 2-Column Section: GET A QUOTE Form (Left) + Google Maps (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: GET A QUOTE Card */}
          <div className="border-2 border-[#db5d00] bg-white p-6 sm:p-8 shadow-xs flex flex-col justify-between reveal-from-left">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#d95800] tracking-wide mb-6 uppercase">
                GET A QUOTE
              </h2>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    Quote Request Ready!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Your message for{' '}
                    <span className="font-semibold">{formData.phone}</span> has been prepared in WhatsApp. You can also send directly by email below.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={openWhatsAppInquiry}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Open WhatsApp</span>
                    </button>
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send via Email</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '', captcha: '' });
                    }}
                    className="text-xs font-bold text-[#c95100] hover:text-[#ea6800] hover:underline pt-1 cursor-pointer transition-colors block mx-auto"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Your Name */}
                  <div>
                    <label htmlFor={nameId} className="sr-only">
                      Your Name
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Your Email */}
                  <div>
                    <label htmlFor={emailId} className="sr-only">
                      Your Email
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      required
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Your Number */}
                  <div>
                    <label htmlFor={phoneId} className="sr-only">
                      Your Phone Number
                    </label>
                    <input
                      id={phoneId}
                      type="tel"
                      required
                      placeholder="Your Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Your Message... */}
                  <div>
                    <label htmlFor={messageId} className="sr-only">
                      Your Message
                    </label>
                    <textarea
                      id={messageId}
                      rows={4}
                      required
                      placeholder="Your Message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400 resize-y"
                    />
                  </div>

                  {/* Security Question */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs text-slate-600 block font-medium">
                      Security Question -
                    </span>
                    <label htmlFor={captchaId} className="text-sm font-bold text-slate-900 block">
                      What is {num1} + {num2} ?
                    </label>
                    <input
                      id={captchaId}
                      type="text"
                      required
                      placeholder="Your Answer"
                      value={formData.captcha}
                      onChange={(e) => {
                        setFormData({ ...formData, captcha: e.target.value });
                        setCaptchaError(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400"
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
                      className="w-full sm:w-auto px-8 py-3 bg-[#d95800] hover:bg-[#ea6800] text-white font-bold text-xs uppercase tracking-wider rounded-none transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Interactive Google Map with mobile scroll-trap protection */}
          <div
            onClick={() => setMapInteractive(true)}
            onMouseLeave={() => setMapInteractive(false)}
            className="w-full min-h-[340px] sm:min-h-[420px] lg:min-h-full border border-slate-300 overflow-hidden relative shadow-xs bg-slate-100 flex flex-col reveal-from-right delay-150"
          >
            <iframe
              title="Pioneer Fab Tech Location Map"
              src="https://maps.google.com/maps?q=Vasai+Virar+Palghar+Maharashtra+401208&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className={`w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-full border-0 ${
                mapInteractive ? 'pointer-events-auto' : 'pointer-events-none lg:pointer-events-auto'
              }`}
              loading="lazy"
            />
            {!mapInteractive && (
              <div className="lg:hidden absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-slate-900/85 text-white text-[11px] font-semibold tracking-wide shadow-md pointer-events-none">
                Tap map to explore
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
