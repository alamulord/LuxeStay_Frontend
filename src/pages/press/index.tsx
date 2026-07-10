import React, { useState } from 'react';
import { ArrowLeft, Newspaper, Download, Calendar, User, Clock, ArrowRight, CheckCircle, X, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { OptimizedImage } from '../../components/ui/OptimizedImage';

interface ArticleEssay {
  intro: string;
  section1Title: string;
  section1Body: string;
  quote: string;
  quoteAuthor: string;
  section2Title: string;
  section2Body: string;
  conclusion: string;
}

interface Article {
  title: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  author: string;
  desc: string;
  essay: ArticleEssay;
}

export function Press() {
  const [activeArticleIndex, setActiveArticleIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Technology', 'Expansion', 'Awards', 'Operations', 'Sustainability', 'Community'];

  const articles: Article[] = [
    {
      title: 'LuxeStay Announces AI-Powered Concierge Ecosystem Powered by NVIDIA NIM',
      date: 'June 18, 2026',
      category: 'Technology',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxONadlg2SBo8slDCW7djaD8nFWSv4ypXSbEueozMVlnHLlwJUVJ3sRc0dXiSwOLnSL5W41YUNAn2fRm0WawDKUHHgP0xOyxo8VrwbT-o2I5bRaGVrh8-C-YGIjFlXZ9mTyufaO6WCdPYBTUwdwk6aaTow9QQLC9fW1WjE2T0rtplYWD_O2Uchv7dEapp2nX-_HYxAas-tAFm9eQprRLuey2ov1dCzqWKorZkMPpjhW6E-bYsY7aIh7KoM8xzg1Say2Z0rvWvrGOjo',
      readTime: '4 min read',
      author: 'Marcus Vance',
      desc: 'Redefining guest service with ultra-low latency intelligent search and automated reservations powered by generative AI.',
      essay: {
        intro: 'LuxeStay Inc. today announced the deployment of a new generative AI concierge ecosystem built using NVIDIA NIM microservices. This integration aims to provide guests with immediate, context-aware property curation and instant booking support.',
        section1Title: 'Powered by NVIDIA NIM',
        section1Body: 'NVIDIA NIM allows our proprietary models to respond in milliseconds. Guests can chat naturally, describe their ideal travel itineraries, and receive personalized recommendations ranked by our match score algorithms. The technology processes complex preferences instantly.',
        quote: 'By harnessing NVIDIA NIM, we are creating a seamless concierge experience that bridges the gap between high-touch human hospitality and state-of-the-art computation.',
        quoteAuthor: 'Sarah Jenkins, Chief Technology Officer',
        section2Title: 'Ecosystem Deployment & Rollout',
        section2Body: 'The rollout is active immediately for all registered users, with further expansions planned to include local culinary and transportation bookings. Guests can resume search histories and resolve checkout flows using unified concierge memory.',
        conclusion: 'This integration establishes a new industry benchmark for real-time personalization in high-end travel platforms.'
      }
    },
    {
      title: 'LuxeStay Collective Expands to Coastal Estates in Southern Europe',
      date: 'May 04, 2026',
      category: 'Expansion',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_17xsZEPj4tKd2cuPA7TvfvZ3BtsoKJAvO2mv_KyeUUINEvTNH7S68bblqviOES-iuQul-hZn3ZlLf46jXcI1A_pHnnhTTYnu0vXHHgyO0loJK4x6MKYodNtnrsvyO2PMuGHHbODR2Ub9hlULvlPyUFQha-k8mxoFnsC1MWZIFsF-tYaiU_Gri5ibnCAw5EE4mmT8fuZXIGyiQ4aSI7kweXjBD8sDMuNFfIt08EbIR-H_El5ebG65-P7zxrNnxT1Bgxz_NI-XP2cI',
      readTime: '5 min read',
      author: 'Chloe Dupont',
      desc: 'Adding 30 new cliffside and beachfront villas in Greece, Italy, and Spain to our curated portfolio.',
      essay: {
        intro: 'Responding to unprecedented summer demand, LuxeStay has officially onboarded 30 new coastal sanctuaries across the Mediterranean basin.',
        section1Title: 'Vetting Seaside Masterpieces',
        section1Body: 'Each property has passed our rigorous 150-point LuxeSelect inspection, ensuring structural safety, premium amenities, and dedicated local guest support. The additions feature clifftop pools, natural marble terraces, and private beach pathways.',
        quote: 'These new additions in Amalfi, Santorini, and Mallorca represent the absolute peak of seaside minimalist architecture.',
        quoteAuthor: 'Roberto Cavalli, Head of Global Curation',
        section2Title: 'Onboarding & Booking Logistics',
        section2Body: 'Guests can begin booking these locations immediately through our concierge web portal. Curation managers have coordinated welcome rituals with local studios, offering bespoke culinary assets and hand-woven linens.',
        conclusion: 'LuxeStay continues to expand its physical footprint selectively, maintaining uncompromised quality standards.'
      }
    },
    {
      title: 'LuxeStay Awarded "Best Luxury Lodging Platform" at 2025 Hospitality Awards',
      date: 'Dec 12, 2025',
      category: 'Awards',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9gEh1VTjzfAmICGUOW8YSDjxkPFTlw87gmLeLISMRT-5H6oVrGVYsOovT2Mm0RQU7DxloTT3N9J_GJLDTdXE6coS2Nw8n9CiOguL_phWQlO8kZ8fLe1EKlop6hkaiIc0ec6EU7qcRVhqex0-rJQOsXoLleQv38ptzPX673X4EdGK3NF2rALoA-mXR9AZQeFlS6bSRNzVpvGV0a945pg8knKdMIfj-9iBkx3_ive-fRzr-l10-gBsz41Pu5aFBKFfTdcaIXuEM2LPO',
      readTime: '3 min read',
      author: 'David Sterling',
      desc: 'Industry experts recognize LuxeStay for outstanding digital curation, safety verification, and customer service.',
      essay: {
        intro: 'The Global Hospitality Association has named LuxeStay the Best Luxury Lodging Platform of 2025.',
        section1Title: 'Unanimous Recognition',
        section1Body: 'The award highlights our unique combination of verified properties and 24/7 priority concierge service, separating us from traditional booking portals. Judges cited our safety verification framework and zero-tolerance policies.',
        quote: 'This recognition belongs to our dedicated hosts and concierge teams who make every check-in memorable.',
        quoteAuthor: 'Elena Rossi, Chief Operating Officer',
        section2Title: 'Elevating Standards',
        section2Body: 'We remain committed to elevating standards of safety, accessibility, and luxury in 2026. The platform plans to introduce further accessibility audit badges and local community impact metrics.',
        conclusion: 'Our team thanks the Global Hospitality Association and our community of members for their trust.'
      }
    },
    {
      title: 'Introducing LuxeSelect Mandate: Vetting to the 150th Degree',
      date: 'March 10, 2026',
      category: 'Operations',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQFoHvZk3-lAi4rfAo_RAf3Q_7QX87e_eXs_5e2EiKVo3ZsCGcaHzUnhge9psTlVEbo4DvDAfvT8BHHGIdbyxqpKaU2p-hdkMkh3BEUtRYjs32AXQMnuPNCF4fv5Z9xJRNVOHmCAtYkRMWrDOj81lew9Rcm10lebZsWyFKnt1iK7gczqxI6671jtQ96ekCJQDdkfPx3bM23UnOw2L7X2TC9BT_zJdEheIc_JTRbsWei6aTpYVRf5447ciJ0ujTuVEBFJNO6xI-_WMc',
      readTime: '6 min read',
      author: 'Samantha Cruz',
      desc: 'Launching our new comprehensive quality assurance audit process for all global residences.',
      essay: {
        intro: 'LuxeStay has officially rolled out the LuxeSelect Mandate, a standardized quality audit designed to evaluate every estate\'s physical and service standards.',
        section1Title: 'Rigorous 150-Point Audit',
        section1Body: 'Covering structural integrity, acoustic levels, fabric thread counts, and local culinary certifications, the audit ensures absolute quality parity across continents. A certified representative visits each home quarterly.',
        quote: 'We are raising the baseline of what travelers expect when renting a private home.',
        quoteAuthor: 'Arthur Pendelton, Director of Curation Audits',
        section2Title: 'Compliance & Curation Accountability',
        section2Body: 'Residences failing to maintain a 100% audit score will be temporarily de-listed until corrections are verified. This ensures our guests experience uncompromised premium hospitality at every destination.',
        conclusion: 'The LuxeSelect Mandate represents our unwavering commitment to quality assurance.'
      }
    },
    {
      title: 'Reforestation Initiative Reaches 1.2 Million Trees Milestone',
      date: 'Feb 22, 2026',
      category: 'Sustainability',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH81wIsC8zGpBBlaLA4xeRPvKOB_GrdQ5TzS4hfQZ2CQ15lhXZxSOi_z49N3w84seuH4etzfg_zXjYPNbPj6jgWqScErvURy8mr430-pMYvvxWUuk3wD46W0hSmxU6uMHKsEyrFd487zHCwygkYmSd9_iq3G3EP0UELYirF6SBeCuHHFWOwDvWRPNeagMRvQ6xpWJ7Jc51DQoWLxK5x86ltj_2p8Fle9jPnHnvB31iHwVl5cWJSfZMquOmbyHwJX-RNzNRq5rmZMZg',
      readTime: '5 min read',
      author: 'Elena Vance',
      desc: 'Our Conscious Hospitality framework offsets travel footprints with 1.2M trees planted worldwide.',
      essay: {
        intro: 'LuxeStay, in partnership with Eden Projects, has successfully planted 1.2 million native trees in ecological restoration zones.',
        section1Title: 'Integrating Regeneration',
        section1Body: 'A portion of every booking fee is automatically allocated to regional tree planting, offsetting carbon from travel transit. By involving local communities, we ensure sustainable growth and reforestation survival rates.',
        quote: 'Luxury travel can—and must—act as a force for global reforestation and environmental healing.',
        quoteAuthor: 'Elena Vance, Chief Sustainability Officer',
        section2Title: 'Targeting 3 Million Trees',
        section2Body: 'Our goal remains to hit 3 million trees by the end of 2028. We are also auditing properties for zero-plastic amenities and 100% renewable energy sourcing.',
        conclusion: 'Conscious hospitality is not just about doing less harm, but actively restoring the earth.'
      }
    },
    {
      title: 'LuxeStay Host Forum "The Inner Circle" Welcomes 4,000th Member',
      date: 'April 15, 2026',
      category: 'Community',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDQyfjKnhzOQgjT749ddS0FtXaDDqn7BvPBu0q6LwXewfmBE-z6mNUpnzlJHT4w0DzbJrTI0h31DkCRWqC7OH2epPwMoo8S80ObS1Tfl3gAZmn73TfyOeDEUpPBRdCVB16_AD9Wm7ZJkCy3yIqC_e2e71PL3xMyT-ZgDBgeEqKKqohdOHF7d_w0raC7h34UBo0ayBGpeXTzlKhbE5kSc94nLcAkaAbqfDOUC5Y7B_BbKzUi7aoZg9VgOYSmyIAw4YQ8FJVH2slZSL0',
      readTime: '4 min read',
      author: 'Julian Vieri',
      desc: 'Connecting luxury property owners worldwide to share local hospitality insights and design standards.',
      essay: {
        intro: 'The private LuxeStay Host Forum, known as The Inner Circle, has crossed a membership milestone of 4,000 certified hosts.',
        section1Title: 'A Fraternity of Luxury Hosts',
        section1Body: 'The forum connects owners to share sourcing lists, design blueprints, local cleaning squads, and legal checklists. It enables Superhosts to elevate their welcome rituals cooperatively.',
        quote: 'We are not just a listing portal; we are a global fraternity of luxury hosts.',
        quoteAuthor: 'Julian Vieri, Platinum Host in Tuscany',
        section2Title: 'Global Curation Meetups',
        section2Body: 'New hosting panels and regional meetups are scheduled to start in London, Tokyo, and Rome. Members will receive priority access to LuxeStay design series and smart pricing blueprints.',
        conclusion: 'Strong community engagement helps maintain the high standards of hospitality LuxeStay is famous for.'
      }
    }
  ];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(art => art.category === activeCategory);

  const handleSelectArticle = (index: number) => {
    setActiveArticleIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseArticle = () => {
    setActiveArticleIndex(null);
    document.body.style.overflow = 'unset';
  };

  const triggerDownload = (filename: string, content: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadBrandKit = () => {
    const content = `LuxeStay Brand Kit & Curation Guidelines 2026\n\nIncluded Assets:\n- Primary Logos (SVG)\n- Style Guide (PDF)\n- Curation Mandate (PDF)\n- Curation Photography Rules`;
    triggerDownload('LuxeStay_BrandKit_2026.txt', content, 'text/plain');
  };

  const downloadPressArchives = () => {
    const content = `LuxeStay Press Release Archives 2025-2026\n\nContents:\n- NVIDIA NIM Concierge Launch (June 2026)\n- European Expansion Announcement (May 2026)\n- GHA Best Platform Award (Dec 2025)`;
    triggerDownload('LuxeStay_Press_Archives.txt', content, 'text/plain');
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none overflow-x-hidden'>
      <Navbar />

      <main className='pt-[72px] flex-grow text-left'>
        {/* Editorial Magazine Hero */}
        <section className="relative bg-gradient-to-br from-surface-container-lowest via-surface to-surface-container-low border-b border-outline-variant/10 py-24 md:py-32 px-6 lg:px-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/5 text-primary rounded-full text-[10px] font-bold tracking-widest uppercase border border-primary/10">
                <Sparkles className="w-3.5 h-3.5" /> Corporate Newsroom
              </span>
              <h1 className="font-display font-black text-5xl md:text-7xl text-on-surface tracking-tighter leading-[1.05]">
                Inside the <br />
                <span className="text-primary italic">LuxeStay</span> Vision.
              </h1>
              <p className="text-base md:text-lg text-on-surface-variant font-light leading-relaxed max-w-xl">
                Exploring global expansion milestones, technological integrations, sustainability mandates, and the shift toward fully curated experiential hospitality.
              </p>
            </div>
            
            <div className="hidden md:block w-96 h-96 shrink-0 relative group">
              <div className="absolute inset-0 bg-[#ba0036]/5 rounded-3xl -rotate-6 scale-95 group-hover:rotate-0 transition-transform duration-500" />
              <div className="w-full h-full rounded-3xl overflow-hidden border border-outline-variant/15 shadow-2xl relative z-10">
                <OptimizedImage
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxONadlg2SBo8slDCW7djaD8nFWSv4ypXSbEueozMVlnHLlwJUVJ3sRc0dXiSwOLnSL5W41YUNAn2fRm0WawDKUHHgP0xOyxo8VrwbT-o2I5bRaGVrh8-C-YGIjFlXZ9mTyufaO6WCdPYBTUwdwk6aaTow9QQLC9fW1WjE2T0rtplYWD_O2Uchv7dEapp2nX-_HYxAas-tAFm9eQprRLuey2ov1dCzqWKorZkMPpjhW6E-bYsY7aIh7KoM8xzg1Say2Z0rvWvrGOjo"
                  alt="LuxeStay Concept Design"
                  width={600}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Tags filter bar */}
        <section className="bg-surface-container-lowest border-b border-outline-variant/10 py-6 px-6 lg:px-16 sticky top-[72px] z-30 shadow-sm backdrop-blur-md bg-opacity-95">
          <div className="max-w-6xl mx-auto flex items-center gap-3 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-rose-100'
                    : 'bg-surface border border-outline-variant/10 text-on-surface-variant hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Newsroom Bento Grid section */}
        <section className="py-20 px-6 lg:px-16 max-w-6xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant text-sm font-semibold">
              No announcements match this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              {/* Feature Article (Large Bento Item) */}
              {filteredArticles[0] && (
                <div 
                  onClick={() => handleSelectArticle(articles.indexOf(filteredArticles[0]))}
                  className="md:col-span-12 lg:col-span-8 group cursor-pointer border border-outline-variant/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white flex flex-col justify-between"
                >
                  <div className="aspect-[16/9] h-full w-full overflow-hidden relative">
                    <OptimizedImage
                      src={filteredArticles[0].image}
                      alt={filteredArticles[0].title}
                      width={1200}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8 text-left text-white">
                      <span className="bg-primary px-3 py-1 text-[9px] font-bold uppercase tracking-wider mb-3.5 inline-block rounded">
                        {filteredArticles[0].category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight font-display mb-2 group-hover:text-rose-200 transition-colors">
                        {filteredArticles[0].title}
                      </h3>
                      <p className="text-xs opacity-75 font-light">
                        {filteredArticles[0].date} • {filteredArticles[0].readTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Side Stories (Medium Bento Items) */}
              <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-8">
                {filteredArticles.slice(1, 3).map((art) => (
                  <div
                    key={art.title}
                    onClick={() => handleSelectArticle(articles.indexOf(art))}
                    className="group cursor-pointer border border-outline-variant/10 rounded-3xl p-6 bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between flex-grow"
                  >
                    <div className="space-y-4">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                        <OptimizedImage
                          src={art.image}
                          alt={art.title}
                          width={600}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                        />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary block">
                        {art.category}
                      </span>
                      <h4 className="font-bold text-base leading-snug group-hover:text-primary transition-colors font-headline">
                        {art.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-on-surface-variant font-light mt-4">
                      {art.date} • {art.readTime}
                    </p>
                  </div>
                ))}
              </div>

              {/* Archive grid */}
              {filteredArticles.length > 3 && (
                <div className="md:col-span-12 mt-12 border-t border-outline-variant/10 pt-16">
                  <h3 className="font-display text-2xl font-bold mb-10 italic">Editorial Archives</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredArticles.slice(3).map((art) => (
                      <div
                        key={art.title}
                        onClick={() => handleSelectArticle(articles.indexOf(art))}
                        className="group cursor-pointer border border-outline-variant/10 rounded-3xl p-5 bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                            <OptimizedImage
                              src={art.image}
                              alt={art.title}
                              width={400}
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                            />
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-primary block">
                            {art.category}
                          </span>
                          <h4 className="font-bold text-base leading-snug group-hover:text-primary transition-colors font-headline">
                            {art.title}
                          </h4>
                          <p className="text-[11px] text-on-surface-variant/80 font-light line-clamp-2 leading-relaxed">
                            {art.desc}
                          </p>
                        </div>
                        <p className="text-[11px] text-on-surface-variant font-light mt-6">
                          {art.date} • {art.readTime}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Investor Relations section */}
        <section className="py-24 px-6 lg:px-16 bg-surface-container-low border-b border-outline-variant/10" id="investors">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">Investor Relations</h2>
                <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                  LuxeStay builds sustainable global value through our proprietary matching algorithms and uncompromised quality controls. Explore our financial indicators and brand kits.
                </p>
                
                <div className="space-y-4">
                  <div 
                    onClick={downloadPressArchives} 
                    className="bg-white p-5 rounded-2xl flex items-center justify-between border border-outline-variant/10 group hover:shadow-md cursor-pointer transition-all active:scale-99"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs">Annual Impact Report 2024</h5>
                        <p className="text-[10px] text-on-surface-variant">PDF • 14.2 MB</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </div>

                  <div 
                    onClick={downloadBrandKit} 
                    className="bg-white p-5 rounded-2xl flex items-center justify-between border border-outline-variant/10 group hover:shadow-md cursor-pointer transition-all active:scale-99"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#375ca8]/5 text-[#375ca8] rounded-xl flex items-center justify-center">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs">LuxeStay Brand Assets & Guide</h5>
                        <p className="text-[10px] text-on-surface-variant">ZIP • 25.8 MB</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>

              <div className="bg-on-surface text-surface p-10 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                  <TrendingUp className="w-36 h-36" />
                </div>
                <h4 className="text-xl font-bold font-headline mb-4 text-white">Platform Resilience</h4>
                <p className="text-xs text-white/70 mb-8 leading-relaxed font-light">
                  Demonstrating industry-leading margins through organic user retention and a highly scalable digital footprint.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-3xl font-display font-black text-primary">+24%</span>
                    <p className="text-[9px] uppercase tracking-wider text-white/50 font-bold mt-1">Revenue Growth YoY</p>
                  </div>
                  <div>
                    <span className="text-3xl font-display font-black text-emerald-400">94%</span>
                    <p className="text-[9px] uppercase tracking-wider text-white/50 font-bold mt-1">Suite Occupancy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Detail Overlay Page (Slide-Over Drawer) */}
        <AnimatePresence>
          {activeArticleIndex !== null && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseArticle}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-3xl h-full bg-white shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
              >
                {/* Close Button Header */}
                <div className="sticky top-0 bg-white/90 backdrop-blur-md px-8 py-5 border-b border-outline-variant/10 flex items-center justify-between z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    Announcements Detail
                  </span>
                  <button
                    onClick={handleCloseArticle}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-8 space-y-8 flex-grow">
                  {/* Category & Metas */}
                  <div className="space-y-4">
                    <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-bold uppercase tracking-widest border border-primary/20">
                      {articles[activeArticleIndex].category}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface leading-tight">
                      {articles[activeArticleIndex].title}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-6 text-[11px] text-on-surface-variant pt-2 border-b border-outline-variant/5 pb-4">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span className="font-semibold">{articles[activeArticleIndex].author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{articles[activeArticleIndex].date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{articles[activeArticleIndex].readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-outline-variant/10 shadow-md">
                    <OptimizedImage
                      src={articles[activeArticleIndex].image}
                      alt={articles[activeArticleIndex].title}
                      width={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Essay Content */}
                  <div className="space-y-6 text-sm text-on-surface-variant leading-relaxed font-light font-body max-w-none">
                    <p className="text-base font-normal text-on-surface leading-relaxed">
                      {articles[activeArticleIndex].essay.intro}
                    </p>

                    <div className="space-y-3 pt-2">
                      <h4 className="font-headline text-lg font-bold text-on-surface">
                        {articles[activeArticleIndex].essay.section1Title}
                      </h4>
                      <p>{articles[activeArticleIndex].essay.section1Body}</p>
                    </div>

                    <div className="my-8 pl-5 border-l-4 border-primary py-1">
                      <p className="font-display text-lg italic text-on-surface leading-relaxed">
                        “{articles[activeArticleIndex].essay.quote}”
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-1.5">
                        — {articles[activeArticleIndex].essay.quoteAuthor}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-headline text-lg font-bold text-on-surface">
                        {articles[activeArticleIndex].essay.section2Title}
                      </h4>
                      <p>{articles[activeArticleIndex].essay.section2Body}</p>
                    </div>

                    <p className="pt-4 border-t border-outline-variant/10 text-xs italic">
                      {articles[activeArticleIndex].essay.conclusion}
                    </p>
                  </div>
                </div>

                {/* Footer Sharing */}
                <div className="bg-slate-50 px-8 py-5 border-t border-outline-variant/10 flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Share This announcement</span>
                  <div className="flex items-center gap-4 text-xs font-bold text-primary">
                    <span className="cursor-pointer hover:underline">Twitter</span>
                    <span className="cursor-pointer hover:underline">LinkedIn</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
