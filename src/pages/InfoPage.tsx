import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Clock, Shield, Star, Compass, UserCheck, Heart, 
  MapPin, CheckCircle, HelpCircle, FileText, Trees, Waves, 
  Sparkles, Coffee, DollarSign, Calendar, ChevronRight, Play, Eye
} from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

const slugsList = [
  'about-our-vision',
  'hosting-community',
  'immersive-experiences',
  'inner-circle-membership',
  'careers',
  'news-corporate',
  'privacy-legal-information',
  'editorial-journal',
  'sustainability-commitment',
  'curated-portfolio',
  'obsidian-rose',
  'support-safety'
];

export function InfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Redirect if slug is invalid
  React.useEffect(() => {
    if (slug && !slugsList.includes(slug)) {
      navigate('/');
    }
  }, [slug, navigate]);

  if (!slug) return null;

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <Navbar />
      <main className="pt-[72px] flex-grow">
        {renderPageContent(slug)}
      </main>
      <Footer />
    </div>
  );
}

function renderPageContent(slug: string) {
  switch (slug) {
    case 'about-our-vision':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-24">
          {/* Back button */}
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                Our Essence & Philosophy
              </span>
              <h1 className="font-headline font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-[#1a1c1c]">
                The Art of <br/>
                <span className="text-gradient-primary">Hospitality,</span> <br/>
                Reimagined.
              </h1>
              <p className="text-lg text-[#5c3f41] leading-relaxed max-w-xl">
                In an era of mass-market accommodation, LuxeStay exists as a curated sanctuary. We reject the "grid of thousands" in favor of the "hand-picked dozen," prioritizing individual soul and architectural integrity over algorithmic volume.
              </p>
            </div>
            <div className="lg:col-span-6">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-ambient relative group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" 
                  alt="Minimalist luxury villa" 
                />
              </div>
            </div>
          </div>

          {/* Bento Vetting Standard Grid */}
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-[#1a1c1c]">The LuxeStay Standard</h2>
              <p className="text-sm text-[#5c3f41]">We inspect amenities, connectivity, structural integrity, and host services to guarantee absolute excellence.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-white border border-outline-variant/10 space-y-4 shadow-sm hover:shadow-ambient transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-lg text-[#1a1c1c]">Design Integrity</h3>
                <p className="text-xs text-[#5c3f41] leading-relaxed">
                  We look for architectural character and intentional decor. From mid-century gems to sleek Scandinavian cabins, each property has a story.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white border border-outline-variant/10 space-y-4 shadow-sm hover:shadow-ambient transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-lg text-[#1a1c1c]">150-Point Audit</h3>
                <p className="text-xs text-[#5c3f41] leading-relaxed">
                  Before a home is listed, it undergoes a rigid 150-point inspection covering sound dampening, smart-lock reliability, water pressure, and mattress density.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-white border border-outline-variant/10 space-y-4 shadow-sm hover:shadow-ambient transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-lg text-[#1a1c1c]">Verified Hosts</h3>
                <p className="text-xs text-[#5c3f41] leading-relaxed">
                  Our hosts are hospitality alchemists who are checked for responsive support, local insight, and consistency in 5-star service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'hosting-community':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-24">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                Hosting Collective
              </span>
              <h1 className="font-headline font-extrabold text-4xl md:text-6xl leading-[1.1] tracking-tight text-[#1a1c1c]">
                Elevate Your Space. <br/>
                Host the Discerning.
              </h1>
              <p className="text-base text-[#5c3f41] leading-relaxed">
                Join a selective circle of global property owners who define modern hospitality. We partner with visionaries who transform spaces into lived art. Become a host and tap into a high-yielding, premium demographic of global travelers.
              </p>
              <div className="flex gap-4">
                <button className="btn-primary-gradient px-8 py-4 rounded-xl text-white font-bold text-sm">
                  Apply to Host
                </button>
                <button className="px-8 py-4 rounded-xl border border-outline-variant/20 hover:bg-surface-container-low transition-colors font-bold text-sm text-[#1a1c1c]">
                  Read Guidelines
                </button>
              </div>
            </div>
            <div>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-ambient relative group">
                <img 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                  src="https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=800&q=80" 
                  alt="Cozy lodge fireplace interior" 
                />
              </div>
            </div>
          </div>

          {/* Hosting Perks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl border border-outline-variant/10 space-y-3">
              <DollarSign className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-[#1a1c1c] text-sm">Premium Returns</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">LuxeStay properties command an average of 42% higher nightly rates compared to generic booking apps.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-outline-variant/10 space-y-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-[#1a1c1c] text-sm">Styling Assistance</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Our editorial styling curators help photograph, dress, and list your room to optimize booking rates.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-outline-variant/10 space-y-3">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-[#1a1c1c] text-sm">Full Asset Protection</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Host peacefully with our $2,000,000 global property damage and liability insurance coverage built into bookings.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-outline-variant/10 space-y-3">
              <UserCheck className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-[#1a1c1c] text-sm">Screened Travelers</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Every guest undergoes identity verification and history reviews before a reservation can be confirmed.</p>
            </div>
          </div>
        </div>
      );

    case 'immersive-experiences':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Hero */}
          <div className="space-y-4 max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
              Private Expeditions
            </span>
            <h1 className="font-headline font-extrabold text-4xl md:text-6xl text-[#1a1c1c] tracking-tight leading-[1.1]">
              Bespoke Narratives: <br/>Journeys Beyond Stays.
            </h1>
            <p className="text-base text-[#5c3f41] leading-relaxed">
              True luxury is not just where you rest; it is the collection of unique memories that define your travels. Explore experiences curated by local alchemists exclusively for LuxeStay residents.
            </p>
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group space-y-4">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm relative">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s]" src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600" alt="Cooking over coastal fires" />
                <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#1a1c1c] uppercase tracking-wider">Gastronomy</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#1a1c1c] group-hover:text-primary transition-colors">Tuscan Truffle Hunt</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">4 Hours • Up to 4 Guests</p>
                </div>
                <span className="font-headline font-bold text-sm text-primary">£450</span>
              </div>
            </div>
            <div className="group space-y-4">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm relative">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s]" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600" alt="Yacht sail sunset" />
                <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#1a1c1c] uppercase tracking-wider">Adventure</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#1a1c1c] group-hover:text-primary transition-colors">Private Sunset Sail</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">3 Hours • Champagne Service</p>
                </div>
                <span className="font-headline font-bold text-sm text-primary">£1,200</span>
              </div>
            </div>
            <div className="group space-y-4">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm relative">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1s]" src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600" alt="Balinese ritual" />
                <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold text-[#1a1c1c] uppercase tracking-wider">Wellness</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline font-bold text-lg text-[#1a1c1c] group-hover:text-primary transition-colors">Ubud Cleansing Ritual</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">5 Hours • Private Temple Tour</p>
                </div>
                <span className="font-headline font-bold text-sm text-primary">£320</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'inner-circle-membership':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-24">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Hero Banner Overlay */}
          <div className="relative rounded-2xl overflow-hidden h-[450px]">
            <img className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200" alt="Exclusive club lounge" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-10 left-10 max-w-xl text-white space-y-4">
              <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-xs uppercase tracking-widest">Sovereign Experience</span>
              <h1 className="font-headline font-extrabold text-4xl md:text-5xl lg:text-6xl leading-none">Welcome to the <br/><span className="text-primary-fixed-dim text-[#ffb2b6]">Inner Circle.</span></h1>
              <p className="text-sm text-white/80">A limited invitation-only tier of service. Members receive priority bookings, early suite launch previews, and dedicated concierge access.</p>
            </div>
          </div>

          {/* Privileges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-white border border-outline-variant/15 space-y-3">
              <Star className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-[#1a1c1c]">Secret Suites</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Book architectural creations that are not listed on the public catalog directory.</p>
            </div>
            <div className="p-8 rounded-xl bg-white border border-outline-variant/15 space-y-3">
              <Clock className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-[#1a1c1c]">Priority Check-out</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Guaranteed late 2:00 PM check-out and early 10:00 AM check-ins at zero added fees.</p>
            </div>
            <div className="p-8 rounded-xl bg-white border border-outline-variant/15 space-y-3">
              <UserCheck className="w-6 h-6 text-primary" />
              <h3 className="font-bold text-[#1a1c1c]">Personal Curator</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Dedicated chat partner to coordinate helicopter transfers, chefs, and custom bookings.</p>
            </div>
          </div>
        </div>
      );

    case 'careers':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-20">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Join the Collective</span>
              <h1 className="font-headline font-extrabold text-4xl md:text-6xl text-[#1a1c1c] tracking-tight leading-[1.1]">Shape the Future <br/>of Stays.</h1>
              <p className="text-base text-[#5c3f41] leading-relaxed">We are a remote-first, design-led group of builders, concierges, and developers. Join our mission to redefine global hospitality and software.</p>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden shadow-sm">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800" alt="Office designers" />
            </div>
          </div>

          {/* Openings */}
          <div className="space-y-6">
            <h2 className="font-headline text-2xl font-bold text-[#1a1c1c]">Open Opportunities</h2>
            <div className="divide-y divide-outline-variant/10 border-t border-b border-outline-variant/10">
              <div className="py-4 flex justify-between items-center hover:bg-primary/5 px-4 transition-colors">
                <div>
                  <h3 className="font-bold text-sm text-[#1a1c1c]">Global Stays Curator</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">Hybrid • Europe/Paris</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#5c3f41]" />
              </div>
              <div className="py-4 flex justify-between items-center hover:bg-primary/5 px-4 transition-colors">
                <div>
                  <h3 className="font-bold text-sm text-[#1a1c1c]">Senior Fullstack Engineer</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">Remote • GMT -5 to +3</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#5c3f41]" />
              </div>
              <div className="py-4 flex justify-between items-center hover:bg-primary/5 px-4 transition-colors">
                <div>
                  <h3 className="font-bold text-sm text-[#1a1c1c]">Interiors Art Director</h3>
                  <p className="text-xs text-[#5c3f41] mt-1">On-Site • Beverly Hills, CA</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#5c3f41]" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'news-corporate':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-24">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* News Bento */}
          <div className="space-y-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Corporate Hub</span>
              <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-[#1a1c1c] mt-4">Corporate Newsroom & Investors</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 group cursor-pointer space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden shadow-sm relative">
                  <img className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" src="https://images.unsplash.com/photo-1590490360182-c33d955f8ee1?w=800" alt="Resort rendering" />
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Press Release</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-[#1a1c1c] group-hover:text-primary transition-colors">LuxeStay Expands Signature Collection in Central Asian Markets</h3>
                <p className="text-xs text-[#5c3f41] leading-relaxed">Secured ten new properties along historical Silk Road locations, highlighting local ancient stone architecture combined with luxury modern layouts.</p>
              </div>

              <div className="space-y-6">
                <h3 className="font-headline font-bold text-lg text-[#1a1c1c] border-b pb-2">Recent Announcements</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase">Oct 12, 2026</span>
                    <h4 className="font-bold text-sm text-[#1a1c1c] hover:underline cursor-pointer">Strategic Q3 Financial Update: Record Growth in Membership Tiers</h4>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-primary uppercase">Sep 28, 2026</span>
                    <h4 className="font-bold text-sm text-[#1a1c1c] hover:underline cursor-pointer">Launch of the Digital Concierge 2.0: Integrating Local Hosts</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'privacy-legal-information':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Legal Portal</span>
              <h1 className="font-headline font-extrabold text-3xl md:text-5xl text-[#1a1c1c]">Privacy Policy & Terms of Service</h1>
              <p className="text-xs text-[#5c3f41]">Last Updated: June 2026. Please read these terms carefully before making a reservation.</p>
            </div>

            <div className="prose max-w-none text-[#5c3f41] space-y-8 text-sm leading-relaxed">
              <section className="space-y-3">
                <h2 className="font-headline font-bold text-lg text-[#1a1c1c]">1. Data Collection & Dignity</h2>
                <p>We process details necessary to complete reservations, confirm identities, and facilitate secure Stripe checkouts. We utilize standard JWT tokens and encrypt stored customer credentials.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline font-bold text-lg text-[#1a1c1c]">2. Cancellations & Nightly Fees</h2>
                <p>Cancellations are subject to the specific room guidelines selected during checkout. Refunds are calculated dynamically and processed directly back to the active card or wallet used during confirmation.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-headline font-bold text-lg text-[#1a1c1c]">3. Safety & Host Agreement</h2>
                <p>LuxeStay operates as a curated portal connecting guests with vetted third-party property owners. The guest agrees to respect local house rules (no smoking, occupancy limits) during their stay duration.</p>
              </section>
            </div>
          </div>
        </div>
      );

    case 'editorial-journal':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Header */}
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Stories & Spaces</span>
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-[#1a1c1c]">The Editorial Journal</h1>
            <p className="text-sm text-[#5c3f41]">Deep dives into architecture, design histories, and neighborhood guides curated by our editors.</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 cursor-pointer group">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                <img className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" alt="Lodge design" />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase">Architecture</span>
              <h3 className="font-headline text-2xl font-bold text-[#1a1c1c] group-hover:text-primary transition-colors">The Shou Sugi Ban Woodcraft in Oregon</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Understanding the Japanese technique of preserving cedar siding by charring, as rendered in the Obsidian Forest Lodge architecture.</p>
            </div>

            <div className="space-y-4 cursor-pointer group">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                <img className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800" alt="Villa design" />
              </div>
              <span className="text-[10px] font-bold text-primary uppercase">Interiors</span>
              <h3 className="font-headline text-2xl font-bold text-[#1a1c1c] group-hover:text-primary transition-colors">Mid-Century Curation in Santorini</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">How white-washed Cycladic curves harmonize with raw wood tables and authentic lounge furniture inside the Azure Suite.</p>
            </div>
          </div>
        </div>
      );

    case 'sustainability-commitment':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Hero */}
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Green Stays</span>
            <h1 className="font-headline font-extrabold text-4xl md:text-6xl text-[#1a1c1c] leading-tight">Luxury Curation That Respects the Earth.</h1>
            <p className="text-base text-[#5c3f41] leading-relaxed">We calculate and offset 100% of carbon emitted during our guests stays. From energy-efficient structural glass to locally sourced wood craft, our properties prioritize ecological integrity.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-outline-variant/10">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#5c3f41]/60 uppercase">Carbon Offset</span>
              <p className="font-headline text-3xl font-bold text-primary">1,200 Tons CO2</p>
              <p className="text-xs text-[#5c3f41]">Offset since inception through verified ocean kelp reforestation partners.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#5c3f41]/60 uppercase">Waste Control</span>
              <p className="font-headline text-3xl font-bold text-primary">98% Plastic-Free</p>
              <p className="text-xs text-[#5c3f41]">Amenities, packaging, and cleaning supplies are certified zero single-use plastic.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#5c3f41]/60 uppercase">Local Materials</span>
              <p className="font-headline text-3xl font-bold text-primary">100% Reclaimed Wood</p>
              <p className="text-xs text-[#5c3f41]">Furniture and framing sourced from certified local mills using reclaimed timbers.</p>
            </div>
          </div>
        </div>
      );

    case 'curated-portfolio':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Title */}
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Curated Collection</span>
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-[#1a1c1c]">Curated Portfolio Anthologies</h1>
            <p className="text-sm text-[#5c3f41]">An editorial directory of our flagship architectural stay creations globally.</p>
          </div>

          {/* Showcase grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" alt="Santorini villa" />
              </div>
              <h3 className="font-bold text-base text-[#1a1c1c]">Azure Panoramic Suite (Greece)</h3>
              <p className="text-xs text-[#5c3f41]">Cliffside minimalism with private infinity pools overlooking the volcanic Caldera path.</p>
            </div>
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800" alt="Oregon Lodge" />
              </div>
              <h3 className="font-bold text-base text-[#1a1c1c]">Obsidian Forest Lodge (Oregon)</h3>
              <p className="text-xs text-[#5c3f41]">Charred cedar glass cabins nestled in PNW pine forests featuring suspended steel fireplaces.</p>
            </div>
          </div>
        </div>
      );

    case 'obsidian-rose':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Hero */}
          <div className="max-w-3xl space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Signature Showcase</span>
            <h1 className="font-headline font-extrabold text-4xl md:text-6xl text-[#1a1c1c]">The Obsidian & Rose Design Series</h1>
            <p className="text-base text-[#5c3f41]">Our flagship architectural Stay products. We contrast dark charred timber hulls with soft rose quartz marble interiors to craft ultimate sensory balance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 bg-white p-6 rounded-xl border">
              <h3 className="font-headline font-bold text-xl text-[#1a1c1c]">Obsidian Cabin (Oregon)</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Built from Shou Sugi Ban charred wood, this structure sinks into the forest. Floor-to-ceiling glass panel walls make the towering pines part of the bedroom interior.</p>
            </div>
            <div className="space-y-4 bg-white p-6 rounded-xl border">
              <h3 className="font-headline font-bold text-xl text-[#1a1c1c]">Rose Quartz Penthouse (NYC)</h3>
              <p className="text-xs text-[#5c3f41] leading-relaxed">Perched on Fifth Avenue, this suite utilizes premium rose pink onyx slabs and brushed brass details to frame cinematic skyline sunsets.</p>
            </div>
          </div>
        </div>
      );

    case 'support-safety':
      return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 space-y-16">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          {/* Title */}
          <div className="space-y-4 max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">Peace of Mind</span>
            <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-[#1a1c1c]">Safety, Verification & 24/7 Concierge</h1>
            <p className="text-sm text-[#5c3f41]">How we verify properties, screen guests, and support your stays round-the-clock.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white border rounded-xl space-y-3">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-sm text-[#1a1c1c]">Smart Keyless Entry</h3>
              <p className="text-xs text-[#5c3f41]">Every room features rotated keyless locks. Access codes activate exactly at check-in time and clear at check-out.</p>
            </div>
            <div className="p-6 bg-white border rounded-xl space-y-3">
              <CheckCircle className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-sm text-[#1a1c1c]">150-Point Audit</h3>
              <p className="text-xs text-[#5c3f41]">Properties undergo strict safety audits covering fire alarms, backup power, water purification, and structural integrity.</p>
            </div>
            <div className="p-6 bg-white border rounded-xl space-y-3">
              <Clock className="w-8 h-8 text-primary" />
              <h3 className="font-bold text-sm text-[#1a1c1c]">24/7 Concierge Help</h3>
              <p className="text-xs text-[#5c3f41]">Have a question or request? Connect to our live concierge desk via your app dashboard at any hour.</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
