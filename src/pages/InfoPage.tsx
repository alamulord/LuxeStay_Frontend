import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Shield, Star, Compass, UserCheck, Heart } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';
import { fadeIn, staggerContainer } from '../lib/animations';

interface InfoPageData {
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  image: string;
  bullets: Array<{ title: string; desc: string; icon: any }>;
  highlights: Array<{ label: string; value: string }>;
}

const infoPages: Record<string, InfoPageData> = {
  'about-our-vision': {
    title: 'The Art of Hospitality, Reimagined.',
    tag: 'Our Essence',
    subtitle: 'In an era of mass-market accommodation, LuxeStay exists as a curated sanctuary.',
    description: 'We reject the "grid of thousands" in favor of the "hand-picked dozen," prioritizing individual soul and architectural integrity over algorithmic volume. Our spaces are design-led and edited for the discerning traveler.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    bullets: [
      { title: 'Invisible Efficiency', desc: 'Check-in, climate control, and requests handled through a singular, elegant interface.', icon: Compass },
      { title: 'Local Alchemists', desc: 'Our on-site hosts are curators of their cities, providing access to experiences not found on any map.', icon: UserCheck }
    ],
    highlights: [
      { label: 'Standard', value: '150-Point Inspection' },
      { label: 'Acceptance Rate', value: 'Only 3% Verified Stays' }
    ]
  },
  'hosting-community': {
    title: 'Elevate Your Space. Inspire the World.',
    tag: 'Hosting Collective',
    subtitle: 'Join a selective circle of global property owners who define modern hospitality.',
    description: 'We partner with visionaries who transform spaces into lived art. Our hosting collective enjoys high-touch support, custom pricing engines, and access to premium global travelers.',
    image: 'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?w=800&q=80',
    bullets: [
      { title: 'Styling & Vetting Assistance', desc: 'Work with our design curators to refine and style your property to meet our editorial standard.', icon: Star },
      { title: 'Dynamic Yield Optimization', desc: 'Our custom engines analyze local market velocity to optimize occupancy and value.', icon: Clock }
    ],
    highlights: [
      { label: 'Hosts Network', value: '250+ Members' },
      { label: 'Average Occupancy', value: '78% Year Round' }
    ]
  },
  'immersive-experiences': {
    title: 'Curated Journeys Beyond Stays.',
    tag: 'Experiences',
    subtitle: 'Exclusive private chef dining, curated expeditions, and localized art walk-throughs.',
    description: 'LuxeStay offers more than rooms. We coordinate custom experiences with local artisans, Michelin-rated chefs, and private tour guides to immerse you in local culture.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    bullets: [
      { title: 'Bespoke Culinary Nights', desc: 'Dine privately inside your suite with dishes prepared live by leading local chefs.', icon: Heart },
      { title: 'Tailored Expeditions', desc: 'Private guides arrange sunrise boat charters, exclusive archaeological tours, and gallery openings.', icon: Compass }
    ],
    highlights: [
      { label: 'Vetted Partners', value: '120+ Curators' },
      { label: 'Rating', value: '4.98 average score' }
    ]
  },
  'inner-circle-membership': {
    title: 'Priority Access to Unlisted Sanctuaries.',
    tag: 'Membership Club',
    subtitle: 'The LuxeStay Inner Circle offers premium booking privileges and late checkouts.',
    description: 'An invitation-only program for travel connoisseurs. Members receive first-look access to newly listed architectural creations, late checkout waivers, and bespoke concierge chat.',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    bullets: [
      { title: 'Concierge Desk Priority', desc: 'Direct, instantaneous connection to a dedicated travel partner available 24/7.', icon: Shield },
      { title: 'Flexible Extensions', desc: 'Enjoy guaranteed late check-outs and early check-ins without extra fees.', icon: Clock }
    ],
    highlights: [
      { label: 'Exclusive Slots', value: '1,000 Global Members' },
      { label: 'Reservations', value: 'Priority booking' }
    ]
  },
  'careers': {
    title: 'Shape the Future of Living.',
    tag: 'LuxeStay Careers',
    subtitle: 'We are a remote-first, design-led collective of concierges, designers, and developers.',
    description: 'We believe that great software and great hospitality are built by passionate individuals who care about the small details. Join our mission to redefine global travel.',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&q=80',
    bullets: [
      { title: 'Remote-First Culture', desc: 'Work from anywhere in the world, with paid annual retreats and co-working allowances.', icon: Compass },
      { title: 'Wellness & Design Days', desc: 'Regular educational training in interior design, luxury services, and architectural history.', icon: Heart }
    ],
    highlights: [
      { label: 'Team size', value: '45 Global Curators' },
      { label: 'Benefits', value: 'Annual Stays Credit' }
    ]
  },
  'news-corporate': {
    title: 'Defining the Future of Global Hospitality.',
    tag: 'Corporate & Newsroom',
    subtitle: 'Latest updates, press statements, and financial growth charts.',
    description: 'LuxeStay reports record Q3 expansion in membership tiers. Learn about our expansion plans into Central Asia, our operational models, and investor announcements.',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d955f8ee1?w=800&q=80',
    bullets: [
      { title: 'Quarterly Growth Reports', desc: 'Track LuxeStay growth rates, luxury inventory counts, and financial summaries.', icon: Clock },
      { title: 'Press Archives', desc: 'Access high-resolution branding kits and official corporate media statements.', icon: Compass }
    ],
    highlights: [
      { label: 'Q3 Year-over-Year', value: '+42% Booking Revenue' },
      { label: 'Expansion Targets', value: '10 new cities in 2026' }
    ]
  },
  'privacy-legal-information': {
    title: 'Transparency and Data Dignity.',
    tag: 'Legal Policy',
    subtitle: 'We secure your payments, protect your identity, and safeguard your details.',
    description: 'Our digital agreements protect both guests and hosts. Read our full data collection disclosures, PCI compliance declarations, and booking terms.',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    bullets: [
      { title: 'Bank-level Security', desc: 'Payments are fully processed using Stripe and encrypted gateways with zero stored card details.', icon: Shield },
      { title: 'GDPR & CCPA Compliant', desc: 'Manage your data preferences or request data deletion with a single click.', icon: UserCheck }
    ],
    highlights: [
      { label: 'Security Standard', value: 'PCI-DSS Compliant' },
      { label: 'Verification', value: 'Norton Secured' }
    ]
  },
  'editorial-journal': {
    title: 'Stories of Space, Architecture, and Shelter.',
    tag: 'Editorial Journal',
    subtitle: 'Explore the history of architectural movements and curated living essays.',
    description: 'Our writers examine the shifting landscape of high-end travel, the origins of minimalist furniture, and the local stories behind our destination suites.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    bullets: [
      { title: 'Monthly Journal Issues', desc: 'Sign up to receive printed coffee-table editions of our design critiques.', icon: Star },
      { title: 'Local Culture Spotlights', desc: 'Read interviews with neighborhood glassblowers, guides, and vineyard owners.', icon: Compass }
    ],
    highlights: [
      { label: 'Subscriber Base', value: '25,000+ Readers' },
      { label: 'Contributors', value: '15 Award-winning writers' }
    ]
  },
  'sustainability-commitment': {
    title: 'Luxury that Cares for the Earth.',
    tag: 'Sustainability',
    subtitle: 'Carbon-offset stay packages, zero single-use plastic, and local wildlife support.',
    description: 'We believe that travel shouldn\'t cost the planet. Every LuxeStay booking funds local conservation projects and carbon offsets to balance out travel emissions.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    bullets: [
      { title: 'Carbon Neutrality Goals', desc: '100% of carbon emitted during guest stays is calculated and offset by our verified programs.', icon: Heart },
      { title: 'Eco-Certified Properties', desc: 'Our homes prioritize renewable energy, waste composting, and rainwater collection systems.', icon: Compass }
    ],
    highlights: [
      { label: 'Offset to date', value: '1,200 Tons CO2' },
      { label: 'Waste Reduction', value: '98% Plastic-Free' }
    ]
  },
  'curated-portfolio': {
    title: 'A Curated Anthology of Exceptional Living.',
    tag: 'Curated Portfolio',
    subtitle: 'Step into architectural masterworks and high-design sanctuaries.',
    description: 'We catalog penthouses, beach villas, and cabins that inspire. Each room has been selected for its unique story, bespoke furnishing, and location.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80',
    bullets: [
      { title: 'Architectural Significance', desc: 'Vetted properties feature designs from award-winning modernist and organic architects.', icon: Star },
      { title: 'Signature Interiors', desc: 'Interiors curated with authentic mid-century modern furniture and original art pieces.', icon: Heart }
    ],
    highlights: [
      { label: 'Vetted suites', value: '18 Active Properties' },
      { label: 'Locations', value: 'Worldwide destinations' }
    ]
  },
  'obsidian-rose': {
    title: 'The Signature Design Series.',
    tag: 'Design Showcase',
    subtitle: 'A closer look at our flagship properties: Obsidian Forest Lodge and Rose Quartz Penthouse.',
    description: 'These suites represent the peak of LuxeStay design philosophy: contrasting charred dark timbers with soft rose quartz stone, blending nature with high-key comfort.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    bullets: [
      { title: 'Obsidian Forest Lodge', desc: 'Charred cedar structure nestled in Bend, Oregon, USA, featuring wood-fired outdoor spas.', icon: Compass },
      { title: 'Rose Quartz Penthouse', desc: 'Bespoke high-rise apartment on Fifth Ave, NYC, utilizing rose-tinted marble slabs and skyline vistas.', icon: Star }
    ],
    highlights: [
      { label: 'Materials', value: 'Raw Marbles & Charred Cedar' },
      { label: 'Style', value: 'Editorial Luxury Minimalism' }
    ]
  },
  'support-safety': {
    title: 'Trust, Safety, and 24/7 Care.',
    tag: 'Safety & Trust',
    subtitle: 'Bank-level secure payments, 150-point safety checklists, and absolute peace of mind.',
    description: 'We ensure a secure marketplace. From keyless entries and verified host checklists to emergency support, LuxeStay stands behind every booking.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    bullets: [
      { title: 'Host Identity Screening', desc: 'All hosts are background-checked and meet strict service-level agreements.', icon: UserCheck },
      { title: 'Smart Locks & Keyless Entry', desc: 'Every stay features automated smart locks with unique codes rotating for each check-in.', icon: Shield }
    ],
    highlights: [
      { label: 'Security Rating', value: '100% Secure Checkout' },
      { label: 'Support Response', value: '<5 Minute Average Chat Response' }
    ]
  }
};

export function InfoPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const pageData = slug ? infoPages[slug] : null;

  // Fallback if page slug doesn't exist
  React.useEffect(() => {
    if (slug && !infoPages[slug]) {
      navigate('/about');
    }
  }, [slug, navigate]);

  if (!pageData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <Navbar />

      <main className="pt-24 flex-grow max-w-7xl mx-auto w-full px-6 lg:px-10 py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </Link>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Title & Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                {pageData.tag}
              </span>
              <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1a1c1c] tracking-tight leading-[1.1] mb-6">
                {pageData.title}
              </h1>
              <p className="text-base md:text-lg text-[#5c3f41] leading-relaxed max-w-xl font-medium">
                {pageData.subtitle}
              </p>
            </div>

            <div className="text-sm text-[#5c3f41]/80 leading-relaxed max-w-xl space-y-4">
              <p>{pageData.description}</p>
            </div>

            {/* Highlights Box */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-outline-variant/15 max-w-md">
              {pageData.highlights.map((hl, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#5c3f41]/60">{hl.label}</p>
                  <p className="text-lg font-bold text-[#ba0036] font-headline">{hl.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Image & Bullets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-10"
          >
            {/* Editorial Image Panel */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-ambient relative group">
              <img
                src={pageData.image}
                alt={pageData.title}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bullet Points */}
            <div className="space-y-6">
              {pageData.bullets.map((bullet, index) => {
                const IconComponent = bullet.icon;
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="p-2.5 rounded-full bg-primary/5 text-primary shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a1c1c] text-sm mb-1">{bullet.title}</h4>
                      <p className="text-xs text-[#5c3f41] leading-relaxed max-w-sm">{bullet.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
