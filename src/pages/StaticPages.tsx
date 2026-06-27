import React from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Shield, Info, FileText } from 'lucide-react';
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
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar />
      <main className="pt-16 flex-grow">
        <PageHeader 
          title="About LuxeStay" 
          subtitle="Redefining luxury accommodations and curated stay experiences globally."
          icon={<Info className="w-8 h-8" />}
        />
        <div className="max-w-3xl mx-auto px-4 py-8 prose text-on_surface_variant">
          <motion.div initial={fadeIn.hidden} animate="visible" transition={transitionDefault}>
            <h2 className="text-xl font-bold text-on_surface mb-4">Our Vision</h2>
            <p className="mb-6 leading-relaxed">
              At LuxeStay, we believe a trip is only as good as where you rest your head. We curate the world's most unique, premium, and design-forward properties, ensuring every booking provides comfort, luxury, and an unforgettable memory.
            </p>
            <h2 className="text-xl font-bold text-on_surface mb-4">Handpicked Perfection</h2>
            <p className="mb-6 leading-relaxed">
              Every single listing on LuxeStay goes through a strict 100-point verification checklist. We inspect amenities, connectivity, structural integrity, and local host services to guarantee that what you see online matches exactly what you get when you unlock the front door.
            </p>
          </motion.div>
        </div>
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
