import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Info, FileText, Compass, UserCheck, Star, Heart } from 'lucide-react';
import { fadeIn, transitionDefault } from '../lib/animations';

function PageHeader({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className="bg-surface-container-low py-12 border-b border-outline_variant/10 mb-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
          {icon}
        </div>
        <h1 className="font-plus text-3xl md:text-4xl font-bold mb-2 text-on_surface">{title}</h1>
        <p className="text-on_surface_variant max-w-lg mx-auto text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <Navbar />

      <main className="pt-[72px] flex-grow overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-[480px] flex items-center px-6 lg:px-12 py-20 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                About Our Essence
              </span>
              <h1 className="font-headline font-extrabold text-4xl md:text-6xl leading-[1.1] tracking-tight text-[#1a1c1c]">
                The Art of <br/>
                <span className="text-[#ba0036]">Hospitality,</span> <br/>
                Reimagined.
              </h1>
              <p className="text-base text-[#5c3f41] leading-relaxed max-w-xl">
                In an era of mass-market accommodation, LuxeStay exists as a curated sanctuary. We reject the "grid of thousands" in favor of the "hand-picked dozen," prioritizing individual soul and architectural integrity over algorithmic volume.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-ambient relative group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
                  alt="Mediterranean villa at golden hour"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy: The Digital Concierge */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 rounded-2xl overflow-hidden shadow-sm">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80" 
                  alt="App interface" 
                />
              </div>
              <div className="h-64 rounded-2xl overflow-hidden shadow-sm bg-primary/5 flex items-center justify-center p-6 text-center border border-primary/10">
                <p className="font-headline font-bold text-primary text-base">Tech that empowers, never replaces.</p>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="font-headline font-bold text-3xl md:text-4xl text-[#1a1c1c] leading-tight">The Digital Concierge</h2>
              <p className="text-base text-[#5c3f41] leading-relaxed">
                Our philosophy bridges the gap between high-touch human service and invisible technology. We believe true luxury isn't a robot delivering towels; it's an app that knows you prefer your espresso at 7:15 AM and a host who has already stocked your favorite vintage.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1c1c] text-sm">Invisible Efficiency</h4>
                    <p className="text-xs text-[#5c3f41] mt-1">Check-in, climate control, and special requests handled through a singular, elegant interface.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1a1c1c] text-sm">Local Alchemists</h4>
                    <p className="text-xs text-[#5c3f41] mt-1">Our on-site hosts are curators of their cities, providing access to experiences not found on any map.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento standard grid */}
        <section className="py-24 px-6 lg:px-12 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#1a1c1c]">The Vetting Standard</h2>
              <p className="text-sm text-[#5c3f41]">Each LuxeStay home survives a 150-point inspection. We select only 3% of applicants to ensure absolute excellence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border rounded-2xl p-8 space-y-4">
                <Shield className="w-8 h-8 text-primary animate-pulse" />
                <h3 className="font-headline font-bold text-xl text-[#1a1c1c]">Integrity</h3>
                <p className="text-xs text-[#5c3f41] leading-relaxed">Structural perfection and ethical sourcing. We ensure every property is safe, sustainable, and maintained to museum standards.</p>
              </div>
              <div className="bg-white border rounded-2xl p-8 space-y-4">
                <Star className="w-8 h-8 text-primary animate-pulse" />
                <h3 className="font-headline font-bold text-xl text-[#1a1c1c]">Design</h3>
                <p className="text-xs text-[#5c3f41] leading-relaxed">Visual harmony and functional beauty. We look for homes that tell a story through architecture and curated furniture selections.</p>
              </div>
              <div className="bg-white border rounded-2xl p-8 space-y-4">
                <Heart className="w-8 h-8 text-primary animate-pulse" />
                <h3 className="font-headline font-bold text-xl text-[#1a1c1c]">Soul</h3>
                <p className="text-xs text-[#5c3f41] leading-relaxed">The indefinable 'Je ne sais quoi'. A home must have a unique personality and a deep connection to its surroundings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visionaries ( Elena & Julian ) */}
        <section className="py-24 px-6 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#1a1c1c]">The Visionaries</h2>
              <p className="text-sm text-[#5c3f41] italic">"We aren't just selling a place to sleep; we are architecting memories that linger long after the suitcase is unpacked."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="space-y-4 text-center md:text-left">
                <img 
                  className="w-full aspect-square rounded-2xl object-cover shadow-sm" 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" 
                  alt="Elena Vance CEO" 
                />
                <h4 className="font-headline font-bold text-xl text-[#1a1c1c]">Elena Vance</h4>
                <p className="text-xs font-bold text-primary uppercase">CEO & Creative Director</p>
                <p className="text-xs text-[#5c3f41] leading-relaxed">A former architectural critic with a passion for heritage restoration, Elena founded LuxeStay to champion properties that possess a distinct sense of place.</p>
              </div>
              <div className="space-y-4 text-center md:text-left">
                <img 
                  className="w-full aspect-square rounded-2xl object-cover shadow-sm" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" 
                  alt="Julian Thorne COO" 
                />
                <h4 className="font-headline font-bold text-xl text-[#1a1c1c]">Julian Thorne</h4>
                <p className="text-xs font-bold text-primary uppercase">Chief Operations Officer</p>
                <p className="text-xs text-[#5c3f41] leading-relaxed">With a decade in luxury hospitality operations, Julian ensures the seamless execution of our Digital Concierge vision across four continents.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 text-center bg-surface-container-lowest">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            <h2 className="font-display font-extrabold text-4xl md:text-6xl text-[#1a1c1c]">Experience the Collection.</h2>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/search')}
                className="btn-primary-gradient px-8 py-4 rounded-xl text-white font-bold text-sm"
              >
                Search Destinations
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! A LuxeStay support representative will contact you shortly.');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="pt-16 flex-grow">
        <PageHeader 
          title="Contact LuxeStay Help Center" 
          subtitle="Have questions or need assistance with your booking? We are here for you 24/7."
          icon={<Mail className="w-8 h-8" />}
        />
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6 md:col-span-1">
            <div className="flex gap-3 items-start">
              <Mail className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-sm text-on_surface_variant">support@luxestay.com</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Phone className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Call Anytime</h3>
                <p className="text-sm text-on_surface_variant">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Headquarters</h3>
                <p className="text-sm text-on_surface_variant">123 Luxury Lane, Beverly Hills, CA</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-surface-container-lowest p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4 text-on_surface">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-on_surface_variant">Name</label>
                  <input type="text" required className="w-full rounded-md border-slate-200 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-on_surface_variant">Email</label>
                  <input type="email" required className="w-full rounded-md border-slate-200 text-sm focus:ring-1 focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-on_surface_variant">Message</label>
                <textarea rows={4} required className="w-full rounded-md border-slate-200 text-sm focus:ring-1 focus:ring-primary focus:border-primary"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">Send Message</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Terms() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="pt-16 flex-grow">
        <PageHeader 
          title="Terms of Service" 
          subtitle="Last updated: June 2026. Please read these terms carefully before booking."
          icon={<FileText className="w-8 h-8" />}
        />
        <div className="max-w-3xl mx-auto px-4 py-8 prose text-on_surface_variant">
          <h2 className="text-lg font-bold text-on_surface mb-2">1. Booking Agreements</h2>
          <p className="mb-4">By booking a room on LuxeStay, you enter into a direct contract with the property host. LuxeStay acts as the marketplace and facilitator.</p>
          <h2 className="text-lg font-bold text-on_surface mb-2">2. Cancellation Policy</h2>
          <p className="mb-4">Cancellations are subject to the property-specific policy selected at checkout. Refunds are processed dynamically to the original payment method.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Privacy() {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="pt-16 flex-grow">
        <PageHeader 
          title="Privacy Policy" 
          subtitle="Your privacy is extremely important. We protect your personal data with bank-level encryption."
          icon={<Shield className="w-8 h-8" />}
        />
        <div className="max-w-3xl mx-auto px-4 py-8 prose text-on_surface_variant">
          <h2 className="text-lg font-bold text-on_surface mb-2">Data Protection</h2>
          <p className="mb-4">We collect details necessary to process bookings, verify guest identity, and secure payments. We never sell your personal information to third-party advertisers.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
