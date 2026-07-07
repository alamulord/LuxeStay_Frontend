import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, User, Users, ShieldAlert, LifeBuoy, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

interface SitemapItem {
  label: string;
  path: string;
  screen?: string;
  subItems?: string[];
}

interface SitemapSection {
  title: string;
  icon: React.ComponentType<any>;
  items: SitemapItem[];
}

const sections: SitemapSection[] = [
  {
    title: "1. Guest Experience (Discovery & Brand)",
    icon: Compass,
    items: [
      { 
        label: "Homepage (Editorial v2)", 
        path: "/", 
        screen: "SCREEN_19",
        subItems: [
          "AI Search / Conversational Concierge",
          "Curated Collections (Architectural Icons, Ocean Sanctuaries)",
          "Featured Residences",
          "Spatial Exploration (3D Preview)",
          "Inner Circle Invitation"
        ]
      },
      { 
        label: "The Collection (Portfolio)", 
        path: "/curated-portfolio", 
        screen: "SCREEN_37",
        subItems: ["Curated Archetypes", "LuxeSelect Mandate (Inspection Standards)"]
      },
      { 
        label: "Immersive Experiences", 
        path: "/immersive-experiences", 
        screen: "SCREEN_60",
        subItems: ["Bespoke Itineraries", "Local Artisan Features"]
      },
      { 
        label: "LuxeStay Aether (Futuristic Flow)", 
        path: "/", 
        screen: "SCREEN_54",
        subItems: ["Aether Homepage", "Discovery Engine (SCREEN_71)", "Virtual Tour Interface (SCREEN_39)"]
      },
      { 
        label: "Stories (Journal)", 
        path: "/stories", 
        screen: "SCREEN_63",
        subItems: ["Editorial Features", "The Sunday Dispatch (Newsletter)"]
      }
    ]
  },
  {
    title: "2. Booking & Stay Journey",
    icon: Calendar,
    items: [
      { 
        label: "Discovery / Search Results", 
        path: "/search", 
        screen: "SCREEN_15",
        subItems: ["Map Discovery", "AI Match Scoring"]
      },
      { 
        label: "Room / Property Details", 
        path: "/search", 
        screen: "SCREEN_11",
        subItems: ["Editorial Gallery", "Sticky Booking Widget", "3D Virtual Tour Launcher (SCREEN_66)"]
      },
      { 
        label: "Checkout Flow", 
        path: "/search", 
        screen: "SCREEN_27",
        subItems: ["Review & Payment", "Confirmation (SCREEN_43)"]
      }
    ]
  },
  {
    title: "3. User & Member Portal",
    icon: User,
    items: [
      { 
        label: "Member Dashboard", 
        path: "/dashboard/trips", 
        screen: "SCREEN_61",
        subItems: ["Active Trips", "Saved Collections", "Member Profile"]
      },
      { 
        label: "Inner Circle Membership", 
        path: "/inner-circle", 
        screen: "SCREEN_6",
        subItems: ["Exclusive Benefits", "Membership Application"]
      },
      { 
        label: "Concierge Services", 
        path: "/concierge", 
        screen: "SCREEN_32",
        subItems: ["Private Architect Request", "Bespoke Itinerary Planning"]
      }
    ]
  },
  {
    title: "4. Hosting & Community",
    icon: Users,
    items: [
      { 
        label: "Hosting at LuxeStay", 
        path: "/collective", 
        screen: "SCREEN_70",
        subItems: ["Host Toolkit", "Host Responsibility & Standards"]
      },
      { 
        label: "Join the Collective (Careers)", 
        path: "/careers", 
        screen: "SCREEN_48",
        subItems: ["Openings", "Culture & Vision"]
      }
    ]
  },
  {
    title: "5. Admin & Management (Enterprise SaaS)",
    icon: ShieldAlert,
    items: [
      { 
        label: "Admin Dashboard Overview", 
        path: "/admin/dashboard", 
        screen: "SCREEN_23",
        subItems: ["Analytics & Reporting (SCREEN_25)"]
      },
      { 
        label: "Inventory & CMS", 
        path: "/admin/rooms", 
        screen: "SCREEN_49",
        subItems: ["Room Management Table", "Add/Edit Room Form (SCREEN_46)", "CMS Management Hub (SCREEN_41)"]
      },
      { 
        label: "Operations", 
        path: "/admin/bookings", 
        screen: "SCREEN_44",
        subItems: ["Reservation Management", "Bookings Management (SCREEN_33)", "Payment Management (SCREEN_51)"]
      },
      { 
        label: "Platform Governance", 
        path: "/admin/users", 
        screen: "SCREEN_21",
        subItems: ["User Management", "Platform Settings (SCREEN_17)"]
      }
    ]
  },
  {
    title: "6. Support & Corporate",
    icon: LifeBuoy,
    items: [
      { 
        label: "Support Center", 
        path: "/safety", 
        screen: "SCREEN_72",
        subItems: ["Safety & Security", "Cancellation Policies"]
      },
      { 
        label: "News & Corporate", 
        path: "/press", 
        screen: "SCREEN_65",
        subItems: ["Newsroom", "Investor Relations", "LuxeStay.org (Relief Housing)"]
      },
      { 
        label: "Legal & Privacy", 
        path: "/privacy", 
        screen: "SCREEN_73",
        subItems: ["Terms of Service", "Privacy Policy", "Cookie Policy"]
      }
    ]
  }
];

const steps = [
  {
    phase: "Phase 1",
    title: "Editorial Discovery",
    desc: "Guests explore the luxury landing experience and query rooms using conversational AI or visual map filters.",
    screens: ["Homepage (SCREEN-19)", "Search & Map (SCREEN-15)"]
  },
  {
    phase: "Phase 2",
    title: "Curation & Vetting",
    desc: "Guests inspect photogrammetric 3D spatial twins, standard amenities, and select booking stay dates.",
    screens: ["Room Details (SCREEN-11)", "3D Spatial (SCREEN-66)"]
  },
  {
    phase: "Phase 3",
    title: "Secure Transaction",
    desc: "Guests review rates, select preferred billing method, and secure stay allocations.",
    screens: ["Secure Checkout (SCREEN-27)", "Confirmation (SCREEN-43)"]
  },
  {
    phase: "Phase 4",
    title: "Member Portals",
    desc: "Registered guests access active trip details, manage saved properties, and request bespoke services.",
    screens: ["Dashboard (SCREEN-61)", "Concierge Request (SCREEN-32)"]
  },
  {
    phase: "Phase 5",
    title: "Enterprise SaaS",
    desc: "Administrative staff handle live inventory updates, monitor revenue analytics, and manage site pages.",
    screens: ["Overview (SCREEN-23)", "CMS Manager (SCREEN-41)"]
  }
];

export function Sitemap() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none">
      <Navbar />

      <main className="pt-24 pb-20 px-6 lg:px-16 flex-grow max-w-7xl mx-auto w-full text-left">
        {/* Page Header */}
        <header className="py-12 border-b border-outline-variant/10 mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-primary/5 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/10">
            System Map
          </span>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-on-background tracking-tighter leading-none">
            Application Sitemap
          </h1>
          <p className="text-base text-on-surface-variant max-w-xl font-light leading-relaxed">
            A comprehensive mapping of LuxeStay guest discoveries, checkout pipelines, member portals, and SaaS administrative controls.
          </p>
        </header>

        {/* Visual Flow Map */}
        <section className="mb-20 bg-surface-container-low p-8 lg:p-12 rounded-3xl border border-outline-variant/10 relative overflow-hidden">
          <div className="relative z-10 space-y-2 mb-10">
            <h2 className="font-display text-2xl font-bold text-on-surface">Visual User Journey & Flow</h2>
            <p className="text-xs text-on-surface-variant max-w-xl font-light leading-relaxed">
              Explore the sequential stages of the application. The system connects public brand discoveries directly into transactions, membership hubs, and administrative governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/5 shadow-sm hover:shadow-ambient hover:border-primary/20 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-bold">
                      {step.phase}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors"></span>
                  </div>
                  <h4 className="font-headline font-bold text-sm text-on-surface">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 space-y-1.5">
                  <div className="text-[9px] uppercase tracking-widest text-on-surface-variant/40 font-bold">
                    Key Modules
                  </div>
                  <div className="text-[10px] font-mono bg-surface-container-low/50 p-2.5 rounded-lg text-on-surface-variant flex flex-col gap-1">
                    {step.screens.map((scr, sIdx) => (
                      <span key={sIdx}>• {scr}</span>
                    ))}
                  </div>
                </div>

                {/* Arrow connector for next step (desktop only) */}
                {idx !== steps.length - 1 && (
                  <div className="absolute top-[40%] right-[-15px] translate-x-1/2 z-20 hidden lg:flex w-6 h-6 items-center justify-center bg-surface-container-low border border-outline-variant/10 rounded-full text-on-surface-variant/80 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div 
                key={idx} 
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 hover:shadow-ambient transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Section Title */}
                  <div className="flex items-center gap-3 border-b border-outline-variant/5 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-headline font-bold text-sm text-on-surface tracking-tight">
                      {section.title}
                    </h3>
                  </div>

                  {/* List of Pages */}
                  <ul className="space-y-6">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <Link 
                            to={item.path} 
                            className="font-headline font-semibold text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 group"
                          >
                            {item.label}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </Link>
                          {item.screen && (
                            <span className="px-1.5 py-0.5 bg-surface-container-high text-[8px] font-mono text-on-surface-variant/80 rounded uppercase tracking-wider">
                              {item.screen.replace('_', '-')}
                            </span>
                          )}
                        </div>

                        {/* Nested Sub-items */}
                        {item.subItems && item.subItems.length > 0 && (
                          <ul className="pl-3 border-l border-outline-variant/15 space-y-1 mt-1">
                            {item.subItems.map((sub, subIdx) => (
                              <li key={subIdx} className="text-[10px] text-on-surface-variant/70 font-light font-body list-none">
                                • {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
