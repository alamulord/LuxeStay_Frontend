import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';

export const InnerCircleSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Urban Retreats & Culture');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 mb-24 no-print select-none">
      {/* Outer Floating Card Container */}
      <div className="bg-[#f5f5f5] rounded-[2.5rem] shadow-ambient overflow-hidden border border-outline-variant/10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Title & Social Proof (Light Gray) */}
          <div className="lg:col-span-5 p-8 md:p-16 flex flex-col justify-between text-left space-y-8 bg-[#f1f1f1]">
            <div className="space-y-6">
              <span className="text-[10px] font-headline font-bold text-on-surface-variant/40 uppercase tracking-[0.3em] block">
                Invitation Only
              </span>
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-[#1a1c1c] tracking-tight leading-tight">
                Apply for <br />
                <span className="text-primary">Membership</span>
              </h2>
              <p className="text-on-surface-variant text-xs md:text-sm font-body leading-relaxed font-light">
                The Inner Circle is currently by invitation or application. Please provide your details, and our membership concierge will contact you within 48 hours to discuss your preferences.
              </p>
            </div>

            {/* Social Proof Badge */}
            <div className="flex items-center gap-3 pt-6 lg:pt-0">
              <div className="flex -space-x-3">
                <div 
                  className="w-10 h-10 rounded-full border-2 border-[#f1f1f1] overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBpiyikPLYDatQG-ybMrmRF-uAhznspqeytpKWxixDx_uGJdMpiIfx75x5GEKz1_JoO7BB8wig-aLz64BA_f02DTXs2NoAb9FVgBr6PG-y7CqFwVY20taMo14FpHVVDz3UvbpVmV0c_fsQzL1-FqS0NkwXiSBH7m8mf7Z-TLYQqgqcj2GRAuMsj02bSF6ji_d7dnddTN8ii-ZAE83kPo5CVbS0HFvLwbA5MyZyuC2qk1J_t5Bv5AQMAV6bjDCPLzVO9M5cblH5czNl2')` }}
                />
                <div 
                  className="w-10 h-10 rounded-full border-2 border-[#f1f1f1] overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAm60xo1IyDYcKgIo6jvHKuNuF_oipqZcQt0KJ_YfdowRHq0yX5BdYTaC-RQdSntTAluqWmYw9i_LZU7kwAasP357tSRRbup1T1H0bQUAUHNe1_jBE-pFItU4D-XNZebC_qizOHhyFZCch9hIxiFgyXKuJ9xF0DJPLCMhnj3dkK9nymYC2hjn346OA-sML_lCmzVLGWt6gNQjBbtkBJQMwZQbeYkZkz7VsLvQxm6mT3S3Va6Q92BnIiZw1Iq04qdMdygfzDrVUoon5D')` }}
                />
                <div 
                  className="w-10 h-10 rounded-full border-2 border-[#f1f1f1] overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGBlDhYAqQ4Daa9xRFrje2smdAH8oLg4CJpDVMNxo5C7Q3HK4arLv_uLpuECV5zfVklprcQfx6RZJ-3DqqNlWePhrZyPH3jfnXlbXtdSfctkXh6GmzclVm9_t_YLgMbWv45UgTZ1gdIRLZUTFnKXhv6fSUeU7kTrkkdjX12N_Xg3x6huC-mSKbo05_UT6pJG9yRbohoyVsVL2a7PnA28phv267rczQGK-Dah-AQWw2hKbryUrIKGg7dZTJPH6ZAhjJVitaDXW5lp0C')` }}
                />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5c3f41] font-headline">
                4,000+ MEMBERS WORLDWIDE
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Application Form (Clean White) */}
          <div className="lg:col-span-7 bg-white p-8 md:p-16 flex flex-col justify-between text-left relative">
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12"
                >
                  <CheckCircle className="w-14 h-14 text-[#ba0036] mx-auto" />
                  <h4 className="font-headline text-2xl font-bold text-on-surface">Application Received</h4>
                  <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed font-light">
                    Our membership committee is reviewing your credentials. A concierge representative will reach out to you shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Sterling"
                        className="w-full rounded-xl py-3.5 px-4 bg-[#f3f3f3] text-on-surface border-0 focus:ring-2 focus:ring-primary/45 focus:outline-none transition-all placeholder:text-on-surface-variant/30 text-sm font-body"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@sterling.com"
                        className="w-full rounded-xl py-3.5 px-4 bg-[#f3f3f3] text-on-surface border-0 focus:ring-2 focus:ring-primary/45 focus:outline-none transition-all placeholder:text-on-surface-variant/30 text-sm font-body"
                      />
                    </div>
                  </div>

                  {/* Styled Travel Interest Dropdown */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">
                      Primary Travel Interest
                    </label>
                    <div className="relative">
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full appearance-none rounded-xl py-3.5 pl-4 pr-12 bg-[#f3f3f3] text-on-surface border-0 focus:ring-2 focus:ring-primary/45 focus:outline-none transition-all text-sm font-body cursor-pointer"
                      >
                        <option value="Urban Retreats & Culture">Urban Retreats & Culture</option>
                        <option value="Coastal Sanctuaries">Coastal Sanctuaries</option>
                        <option value="Mountain Escapes">Mountain Escapes</option>
                        <option value="Historical Estates">Historical Estates</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/60">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your travel philosophy..."
                      className="w-full rounded-xl py-3.5 px-4 bg-[#f3f3f3] text-on-surface border-0 focus:ring-2 focus:ring-primary/45 focus:outline-none transition-all placeholder:text-on-surface-variant/30 text-sm font-body"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#ba0036] hover:bg-[#9c002c] text-white py-4 rounded-xl font-headline font-bold text-xs uppercase tracking-wider transition-all btn-primary-gradient shadow-md hover:shadow-lg active:scale-[0.99]"
                  >
                    Submit Application
                  </button>

                  {/* Footer rolling basis warning */}
                  <p className="text-[9px] text-[#5c3f41]/60 uppercase tracking-widest text-center mt-4 block">
                    APPLICATIONS ARE REVIEWED ON A ROLLING BASIS
                  </p>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
