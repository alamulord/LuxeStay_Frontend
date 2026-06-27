import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const footerLinks = {
  Support: [
    { label: 'Help Center', to: '/contact' },
    { label: 'Safety Information', to: '/info/support-safety' },
    { label: 'Cancellation Options', to: '/info/privacy-legal-information' },
    { label: 'Legal Disclosures', to: '/info/privacy-legal-information' },
  ],
  Community: [
    { label: 'LuxeStay Collective', to: '/info/hosting-community' },
    { label: 'Sustainability Commitment', to: '/info/sustainability-commitment' },
    { label: 'LuxeStay Stories', to: '/info/editorial-journal' },
  ],
  Hosting: [
    { label: 'LuxeStay Your Home', to: '/info/hosting-community' },
    { label: 'Immersive Experiences', to: '/info/immersive-experiences' },
    { label: 'Inner Circle Club', to: '/info/inner-circle-membership' },
    { label: 'Curated Portfolio', to: '/info/curated-portfolio' },
  ],
  LuxeStay: [
    { label: 'Our Vision', to: '/info/about-our-vision' },
    { label: 'Newsroom & Corporate', to: '/info/news-corporate' },
    { label: 'Careers', to: '/info/careers' },
    { label: 'Signature Design Series', to: '/info/obsidian-rose' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-container-low mt-auto">
      <div className="max-w-page mx-auto px-6 lg:px-10 py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <span className="font-headline text-lg font-bold tracking-tight">LuxeStay</span>
            </Link>
            <p className="text-sm text-[#5c3f41] leading-relaxed max-w-xs">
              Curating exceptional living experiences across the globe. From architectural marvels to hidden beachfront gems.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white text-[#5c3f41] transition-all duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white text-[#5c3f41] transition-all duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center hover:bg-primary hover:text-white text-[#5c3f41] transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-headline text-sm font-bold text-[#1a1c1c] mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-[#5c3f41] hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/15">
        <div className="max-w-page mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#5c3f41]">© {new Date().getFullYear()} LuxeStay Inc.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-[#5c3f41] hover:text-[#1a1c1c] transition-colors underline">Privacy</Link>
            <Link to="/terms" className="text-xs text-[#5c3f41] hover:text-[#1a1c1c] transition-colors underline">Terms</Link>
            <Link to="/about" className="text-xs text-[#5c3f41] hover:text-[#1a1c1c] transition-colors underline">Sitemap</Link>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#5c3f41]">
            <button className="flex items-center gap-1.5 hover:text-[#1a1c1c] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              English (GB)
            </button>
            <span>£ GBP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}