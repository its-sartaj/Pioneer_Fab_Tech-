import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

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
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900">
                    Quote Request Received!
                  </h3>
                  <p className="text-xs text-slate-600">
                    Thank you, <span className="font-semibold">{formData.name}</span>. Our fabrication team will contact you shortly on{' '}
                    <span className="font-semibold">{formData.phone}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '', captcha: '' });
                    }}
                    className="text-xs font-bold text-[#c95100] hover:text-[#ea6800] hover:underline pt-2 cursor-pointer transition-colors"
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400"
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400"
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400"
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-none focus:outline-hidden focus:border-[#db5d00] text-slate-800 placeholder-slate-400 resize-y"
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

          {/* Right: Interactive Google Map with reference styling */}
          <div className="w-full min-h-[480px] lg:min-h-full border border-slate-300 overflow-hidden relative shadow-xs bg-slate-100 flex flex-col reveal-from-right delay-150">
            <iframe
              title="Pioneer Fab Tech Location Map"
              src="https://maps.google.com/maps?q=Vasai+Virar+Palghar+Maharashtra+401208&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[480px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
