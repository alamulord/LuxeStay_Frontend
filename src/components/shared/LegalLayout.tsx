import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Lock, AlertTriangle, RefreshCw } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LegalLayoutProps {
  children: React.ReactNode;
  activeTab: 'privacy' | 'terms' | 'safety' | 'cancellation' | 'legal';
  title: string;
  subtitle: string;
}

export function LegalLayout({ children, activeTab, title, subtitle }: LegalLayoutProps) {
  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', path: '/privacy', icon: Lock },
    { id: 'terms', label: 'Terms of Service', path: '/terms', icon: FileText },
    { id: 'safety', label: 'Safety Information', path: '/safety', icon: Shield },
    { id: 'cancellation', label: 'Cancellation Options', path: '/cancellation', icon: RefreshCw },
    { id: 'legal', label: 'Legal Disclosures', path: '/legal', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between text-on-surface">
      <Navbar />

      <main className="pt-[72px] flex-grow">
        {/* Banner */}
        <div className="bg-surface-container-low py-12 border-b border-outline-variant/10">
          <div className="max-w-page mx-auto px-6">
            <h1 className="font-display font-extrabold text-3xl md:text-5xl text-on-surface mb-2">
              Legal & Privacy
            </h1>
            <p className="text-on-surface-variant text-sm">
              Explore LuxeStay standards, terms, policies, and disclosures.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-page mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sub-Navigation Tabs */}
            <aside className="w-full lg:w-1/4 flex-shrink-0">
              <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 border-b lg:border-b-0 border-outline-variant/10 pb-4 lg:pb-0 hide-scrollbar">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <Link
                      key={tab.id}
                      to={tab.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            {/* Document Content */}
            <section className="flex-grow bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-ambient">
              <div className="mb-6 border-b border-outline-variant/10 pb-4">
                <h2 className="font-headline text-2xl font-bold text-on-surface">{title}</h2>
                <p className="text-on-surface-variant text-xs mt-1 font-medium">{subtitle}</p>
              </div>
              <div className="prose prose-sm prose-slate max-w-none text-on-surface-variant leading-relaxed space-y-6">
                {children}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
