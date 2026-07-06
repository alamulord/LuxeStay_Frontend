import React, { useState } from 'react';
import { Mail, Phone, MapPin, Search, ShieldCheck, HeartHandshake, CheckCircle, Flame, Waves, HelpCircle, User, Check, X, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Contact() {
  const [searchQuery, setSearchQuery] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching help guides for: "${searchQuery}"`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow text-left'>
        
        {/* ── HERO SECTION ── */}
        <section className='relative bg-surface-container-low py-20 px-6 lg:px-16 border-b border-outline-variant/10'>
          <div className='max-w-4xl mx-auto text-center space-y-6 relative z-10'>
            <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-headline text-[10px] font-bold tracking-widest uppercase'>
              Concierge Support
            </span>
            <h1 className='font-display text-4xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-[0.95]'>
              How can we assist <br /> your journey?
            </h1>
            
            <form onSubmit={handleSearch} className='max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 pt-4'>
              <div className='relative flex-1'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60' />
                <input 
                  type='text' 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search for safety, cancellations, or hosting guides...'
                  className='w-full pl-11 pr-4 py-4 rounded-full border border-outline-variant/25 focus:ring-2 focus:ring-primary/45 focus:outline-none bg-white text-sm'
                />
              </div>
              <button 
                type='submit' 
                className='bg-primary text-white px-8 py-4 rounded-full font-headline font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all btn-primary-gradient shadow-md shadow-primary/10'
              >
                Search
              </button>
            </form>

            <div className='flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-on-surface-variant font-light'>
              <span className='font-bold uppercase tracking-wider text-[10px] text-on-surface-variant/40'>Popular:</span>
              <button onClick={() => setSearchQuery('Cancellation Policy')} className='hover:text-primary hover:underline font-semibold'>Cancellation Policy</button>
              <span className='opacity-30'>•</span>
              <button onClick={() => setSearchQuery('Safety Protocols')} className='hover:text-primary hover:underline font-semibold'>Safety Protocols</button>
              <span className='opacity-30'>•</span>
              <button onClick={() => setSearchQuery('Insurance')} className='hover:text-primary hover:underline font-semibold'>Insurance</button>
            </div>
          </div>
        </section>

        {/* ── THREE CATEGORIES GRID ── */}
        <section className='py-20 max-w-page mx-auto px-6 lg:px-10'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Guest Support */}
            <div className='bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between min-h-[300px] hover:shadow-md transition-all duration-300'>
              <div className='space-y-4'>
                <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/10'>
                  <User className='w-5 h-5' />
                </div>
                <h3 className='font-headline text-xl font-bold text-[#1a1c1c]'>Guest Support</h3>
                <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                  Manage bookings, communicate with hosts, and explore our premium concierge services.
                </p>
              </div>
              <div className='pt-6 border-t border-outline-variant/5 space-y-3'>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Booking assistance</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Refund status</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Check-in help</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
              </div>
            </div>

            {/* Host Support */}
            <div className='bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between min-h-[300px] hover:shadow-md transition-all duration-300'>
              <div className='space-y-4'>
                <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/10'>
                  <HeartHandshake className='w-5 h-5' />
                </div>
                <h3 className='font-headline text-xl font-bold text-[#1a1c1c]'>Host Support</h3>
                <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                  Resources for managing your estate, optimizing listings, and LuxeStay host standards.
                </p>
              </div>
              <div className='pt-6 border-t border-outline-variant/5 space-y-3'>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Hosting standards</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Payment schedule</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Property protection</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
              </div>
            </div>

            {/* Safety & Security */}
            <div className='bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between min-h-[300px] hover:shadow-md transition-all duration-300'>
              <div className='space-y-4'>
                <div className='w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/10'>
                  <ShieldCheck className='w-5 h-5' />
                </div>
                <h3 className='font-headline text-xl font-bold text-[#1a1c1c]'>Safety & Security</h3>
                <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                  Our commitment to your security, from background checks to 24/7 on-call assistance.
                </p>
              </div>
              <div className='pt-6 border-t border-outline-variant/5 space-y-3'>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Trust & Safety</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Emergency contact</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
                <a href='#' className='flex items-center justify-between text-xs text-[#1a1c1c] hover:text-primary transition-colors font-bold'>
                  <span>Reporting issues</span>
                  <span className='material-symbols-outlined text-sm font-bold'>chevron_right</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SAFETY MID SECTION ── */}
        <section className='py-24 bg-surface-container-lowest border-t border-b border-outline-variant/10'>
          <div className='max-w-page mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-16'>
            <div className='flex-1 relative w-full'>
              <div className='relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-outline-variant/10 max-w-xl mx-auto'>
                <img 
                  className='w-full h-full object-cover' 
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuC9gEh1VTjzfAmICGUOW8YSDjxkPFTlw87gmLeLISMRT-5H6oVrGVYsOovT2Mm0RQU7DxloTT3N9J_GJLDTdXE6coS2Nw8n9CiOguL_phWQlO8kZ8fLe1EKlop6hkaiIc0ec6EU7qcRVhqex0-rJQOsXoLleQv38ptzPX673X4EdGK3NF2rALoA-mXR9AZQeFlS6bSRNzVpvGV0a945pg8knKdMIfj-9iBkx3_ive-fRzr-l10-gBsz41Pu5aFBKFfTdcaIXuEM2LPO' 
                  alt='Concierge butler elite hospitality service lobby'
                />
              </div>
              {/* Overlay Badge */}
              <div className='absolute -bottom-6 right-6 bg-white p-5 rounded-2xl shadow-xl border border-outline-variant/15 max-w-[240px] text-left'>
                <div className='flex items-center gap-2 mb-1.5'>
                  <ShieldCheck className='w-5 h-5 text-primary shrink-0' />
                  <span className='font-headline font-bold text-xs text-[#1a1c1c] uppercase tracking-wider'>Elite Assurance</span>
                </div>
                <p className='text-[10px] text-on-surface-variant font-light leading-relaxed'>
                  Every property undergoes a 200-point safety inspection before every arrival.
                </p>
              </div>
            </div>

            <div className='flex-1 space-y-8 text-left lg:pl-6'>
              <h2 className='font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface leading-tight'>
                Safety is our primary luxury.
              </h2>
              <p className='text-sm text-on-surface-variant font-light leading-relaxed'>
                At LuxeStay, we believe peace of mind is the ultimate amenity. Our multi-layered safety framework ensures that your only focus is the experience.
              </p>
              
              <div className='space-y-6 pt-2'>
                <div className='flex gap-4 items-start'>
                  <CheckCircle className='w-5 h-5 text-[#ba0036] shrink-0 mt-0.5' />
                  <div>
                    <h4 className='font-headline font-bold text-sm text-on-surface'>Rigorous Verification</h4>
                    <p className='text-xs text-on-surface-variant mt-1 leading-relaxed font-light'>
                      Both hosts and guests undergo comprehensive identity verification and background screening to maintain our community's integrity.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <CheckCircle className='w-5 h-5 text-[#ba0036] shrink-0 mt-0.5' />
                  <div>
                    <h4 className='font-headline font-bold text-sm text-on-surface'>24/7 Global Response</h4>
                    <p className='text-xs text-on-surface-variant mt-1 leading-relaxed font-light'>
                      Our specialized Trust & Safety team is on call worldwide, ready to provide immediate assistance via secure video or priority phone.
                    </p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <CheckCircle className='w-5 h-5 text-[#ba0036] shrink-0 mt-0.5' />
                  <div>
                    <h4 className='font-headline font-bold text-sm text-on-surface'>Secure Transactions</h4>
                    <p className='text-xs text-on-surface-variant mt-1 leading-relaxed font-light'>
                      End-to-end encrypted payments and a robust cancellation protection plan keep your investments safe from unexpected changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CANCELLATION POLICIES ── */}
        <section className='py-24 bg-surface'>
          <div className='max-w-page mx-auto px-6 lg:px-10 text-center space-y-20'>
            <div className='max-w-2xl mx-auto space-y-4'>
              <h2 className='font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface'>
                Flexibility built for you.
              </h2>
              <p className='text-sm text-on-surface-variant leading-relaxed font-light'>
                Life is unpredictable. We've designed our cancellation policies to balance the needs of our guests and the commitments of our hosts.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
              {/* Flexible */}
              <div className='bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between min-h-[320px] hover:shadow-md transition-all duration-300'>
                <div className='space-y-4'>
                  <div>
                    <span className='text-[10px] font-bold uppercase tracking-wider text-primary'>Maximum Freedom</span>
                    <h3 className='font-headline text-2xl font-bold text-[#1a1c1c] mt-1'>Flexible</h3>
                  </div>
                  <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                    Cancel up to 24 hours before check-in for a full refund. Ideal for dynamic travel schedules.
                  </p>
                </div>
                <div className='pt-6 border-t border-outline-variant/5 space-y-3'>
                  <div className='flex items-center gap-2 text-xs text-on-surface-variant font-light'>
                    <Check className='w-4 h-4 text-green-600 shrink-0' />
                    <span>100% Refund: 24h prior</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-on-surface-variant font-light'>
                    <Check className='w-4 h-4 text-green-600 shrink-0' />
                    <span>Standard LuxeStay fee applies</span>
                  </div>
                </div>
              </div>

              {/* Firm */}
              <div className='bg-white p-8 rounded-2xl border-2 border-primary shadow-md flex flex-col justify-between min-h-[320px] relative hover:shadow-lg transition-all duration-300'>
                <span className='absolute -top-3.5 left-6 bg-primary text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-primary-container'>
                  Most Popular
                </span>
                
                <div className='space-y-4'>
                  <div>
                    <span className='text-[10px] font-bold uppercase tracking-wider text-primary'>Balanced Security</span>
                    <h3 className='font-headline text-2xl font-bold text-[#1a1c1c] mt-1'>Firm</h3>
                  </div>
                  <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                    Full refund for cancellations made within 48 hours of booking, if the check-in is at least 14 days away.
                  </p>
                </div>
                <div className='pt-6 border-t border-outline-variant/5 space-y-3'>
                  <div className='flex items-center gap-2 text-xs text-on-surface-variant font-light'>
                    <Check className='w-4 h-4 text-green-600 shrink-0' />
                    <span>100% Refund: 14 days prior</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-on-surface-variant font-light'>
                    <Check className='w-4 h-4 text-green-600 shrink-0' />
                    <span>50% Refund: 7 days prior</span>
                  </div>
                </div>
              </div>

              {/* Strict */}
              <div className='bg-white p-8 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col justify-between min-h-[320px] hover:shadow-md transition-all duration-300'>
                <div className='space-y-4'>
                  <div>
                    <span className='text-[10px] font-bold uppercase tracking-wider text-primary'>Highest Assurance</span>
                    <h3 className='font-headline text-2xl font-bold text-[#1a1c1c] mt-1'>Strict</h3>
                  </div>
                  <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                    Designed for exclusive estates and high-demand seasons. Cancellations must be made 30 days in advance.
                  </p>
                </div>
                <div className='pt-6 border-t border-outline-variant/5 space-y-3'>
                  <div className='flex items-center gap-2 text-xs text-on-surface-variant font-light'>
                    <Check className='w-4 h-4 text-green-600 shrink-0' />
                    <span>100% Refund: 30 days prior</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-on-surface-variant font-light'>
                    <X className='w-4 h-4 text-red-600 shrink-0' />
                    <span>No refund after 14 days prior</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STILL HAVE QUESTIONS CTA BOX ── */}
        <section className='py-12 max-w-page mx-auto px-6 lg:px-10 mb-8'>
          <div className='bg-surface-container-low rounded-3xl p-10 text-center border border-outline-variant/10 shadow-sm space-y-6'>
            <h3 className='font-headline text-2xl font-bold text-[#1a1c1c]'>Still have questions?</h3>
            <p className='text-sm text-on-surface-variant max-w-lg mx-auto font-light leading-relaxed'>
              Our 24/7 Concierge team is standing by to assist with your specific needs.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-4 pt-2'>
              <button className='bg-primary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform btn-primary-gradient'>
                Chat with Concierge
              </button>
              {/* <button className='bg-white text-on-surface border border-outline-variant/20 px-8 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:bg-surface-container-high transition-colors'>
                Call Priority Support
              </button> */}
            </div>
          </div>
        </section>

        {/* ── APPENDED FORM & ADDRESS CONTACT SECTION ── */}
        <section className='py-24 border-t border-outline-variant/10 bg-surface-container-lowest' id='contact-form'>
          <div className='max-w-page mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16'>
            
            {/* Contact details */}
            <div className='lg:col-span-4 space-y-8'>
              <div className='space-y-2'>
                <span className='text-xs font-bold uppercase tracking-widest text-[#ba0036]'>Reach Out</span>
                <h3 className='font-headline text-2xl font-extrabold text-on-surface'>Contact Help Center</h3>
                <p className='text-xs text-on-surface-variant font-light leading-relaxed max-w-xs'>
                  Submit an inquiry and our support concierge staff will coordinate assistance.
                </p>
              </div>

              <div className='space-y-6 pt-4'>
                <div className='flex gap-4 items-start'>
                  <div className='p-2 bg-surface-container rounded-xl border border-outline-variant/15 text-primary'>
                    <Mail className='w-5 h-5' />
                  </div>
                  <div>
                    <h3 className='font-headline font-bold text-sm text-on-surface'>Email Us</h3>
                    <p className='text-xs text-on-surface-variant mt-1'>support@luxestay.com</p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <div className='p-2 bg-surface-container rounded-xl border border-outline-variant/15 text-primary'>
                    <Phone className='w-5 h-5' />
                  </div>
                  <div>
                    <h3 className='font-headline font-bold text-sm text-on-surface'>Call Anytime</h3>
                    <p className='text-xs text-on-surface-variant mt-1'>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <div className='p-2 bg-surface-container rounded-xl border border-outline-variant/15 text-primary'>
                    <MapPin className='w-5 h-5' />
                  </div>
                  <div>
                    <h3 className='font-headline font-bold text-sm text-on-surface'>Headquarters</h3>
                    <p className='text-xs text-on-surface-variant mt-1 leading-relaxed font-light'>
                      123 Luxury Lane, Beverly Hills, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Message Form */}
            <div className='lg:col-span-8 bg-surface-container-low p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-sm'>
              <h3 className='font-headline font-bold text-xl mb-6 text-on-surface'>
                Send us a message
              </h3>
              
              <AnimatePresence mode='wait'>
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className='bg-primary/5 p-8 rounded-2xl text-center space-y-4 border border-primary/20 py-12'
                  >
                    <CheckCircle className='w-12 h-12 text-primary mx-auto' />
                    <h4 className='font-headline font-bold text-xl'>Message Dispatched</h4>
                    <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                      Thank you for reaching out! A LuxeStay support representative will contact you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className='space-y-6'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                      <div className='space-y-2'>
                        <label className='block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant'>
                          Name
                        </label>
                        <input
                          type='text'
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className='w-full rounded-xl py-3.5 px-4 bg-white text-on-surface border border-outline-variant/25 focus:ring-2 focus:ring-primary/45 focus:outline-none transition-all text-sm font-body'
                          placeholder='Your Name'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label className='block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant'>
                          Email
                        </label>
                        <input
                          type='email'
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className='w-full rounded-xl py-3.5 px-4 bg-white text-on-surface border border-outline-variant/25 focus:ring-2 focus:ring-primary/45 focus:outline-none transition-all text-sm font-body'
                          placeholder='your@email.com'
                        />
                      </div>
                    </div>
                    
                    <div className='space-y-2'>
                      <label className='block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant'>
                        Message
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className='w-full rounded-xl py-3.5 px-4 bg-white text-on-surface border border-outline-variant/25 focus:ring-2 focus:ring-primary/45 focus:outline-none transition-all text-sm font-body'
                        placeholder='How can our concierge assist you?'
                      />
                    </div>
                    
                    <button type='submit' className='bg-primary text-white px-8 py-3.5 rounded-xl font-headline font-bold text-xs uppercase tracking-wider hover:scale-[1.01] active:scale-[0.99] transition-transform btn-primary-gradient shadow-md w-full sm:w-auto'>
                      Send Message
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
