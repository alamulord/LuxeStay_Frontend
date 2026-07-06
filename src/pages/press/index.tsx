import React, { useState } from 'react';
import { ArrowLeft, Newspaper, Download, Calendar, User, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

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

export function Press() {
  const [activeArticleIndex, setActiveArticleIndex] = useState<number | null>(null);

  const articles = [
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
      } as ArticleEssay
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
      } as ArticleEssay
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
      } as ArticleEssay
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
      } as ArticleEssay
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
      } as ArticleEssay
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
      } as ArticleEssay
    }
  ];

  const handleBackToNewsroom = () => {
    setActiveArticleIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (index: number) => {
    setActiveArticleIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow text-left'>
        {activeArticleIndex !== null ? (
          /* ── ESSAY DETAILS PAGE VIEW ── */
          <article className='py-16 max-w-4xl mx-auto px-6'>
            {/* Back to Newsroom Link */}
            <button
              onClick={handleBackToNewsroom}
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-8'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Newsroom
            </button>

            {/* Header Metadata */}
            <div className='space-y-4 mb-8'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-headline text-[10px] font-bold uppercase tracking-widest border border-primary/20'>
                {articles[activeArticleIndex].category}
              </span>
              <h1 className='font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#1a1c1c] leading-tight'>
                {articles[activeArticleIndex].title}
              </h1>
              
              <div className='flex items-center gap-6 text-xs text-on-surface-variant pt-2'>
                <div className='flex items-center gap-1.5'>
                  <User className='w-4 h-4 text-primary' />
                  <span>{articles[activeArticleIndex].author}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Calendar className='w-4 h-4 text-primary' />
                  <span>{articles[activeArticleIndex].date}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Clock className='w-4 h-4 text-primary' />
                  <span>{articles[activeArticleIndex].readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className='aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-outline-variant/10 mb-12'>
              <img 
                className='w-full h-full object-cover' 
                src={articles[activeArticleIndex].image} 
                alt={articles[activeArticleIndex].title} 
              />
            </div>

            {/* Essay Content */}
            <div className='space-y-8 max-w-3xl mx-auto text-base text-on-surface-variant leading-relaxed font-light'>
              <p className='text-lg font-normal text-on-surface'>
                {articles[activeArticleIndex].essay.intro}
              </p>

              <div className='space-y-4 pt-4'>
                <h3 className='font-headline text-2xl font-bold text-on-surface'>
                  {articles[activeArticleIndex].essay.section1Title}
                </h3>
                <p>{articles[activeArticleIndex].essay.section1Body}</p>
              </div>

              {/* Blockquote section */}
              <div className='my-10 pl-6 border-l-4 border-primary py-2'>
                <p className='font-display text-xl md:text-2xl italic text-on-surface font-light leading-relaxed'>
                  “{articles[activeArticleIndex].essay.quote}”
                </p>
                <p className='text-xs font-bold uppercase tracking-wider text-primary mt-2 font-headline'>
                  — {articles[activeArticleIndex].essay.quoteAuthor}
                </p>
              </div>

              <div className='space-y-4'>
                <h3 className='font-headline text-2xl font-bold text-on-surface'>
                  {articles[activeArticleIndex].essay.section2Title}
                </h3>
                <p>{articles[activeArticleIndex].essay.section2Body}</p>
              </div>

              <p className='pt-4 border-t border-outline-variant/10 text-sm'>
                {articles[activeArticleIndex].essay.conclusion}
              </p>
            </div>

            {/* Post footer CTA */}
            <div className='max-w-3xl mx-auto pt-16 border-t border-outline-variant/10 mt-16 flex justify-between items-center'>
              <button 
                onClick={handleBackToNewsroom}
                className='text-xs font-bold uppercase tracking-wider text-primary hover:text-on-surface transition-colors'
              >
                ← Back to all announcements
              </button>
              
              <div className='flex items-center gap-3'>
                <span className='text-[10px] text-on-surface-variant font-light uppercase tracking-widest'>Share</span>
                <span className='text-xs cursor-pointer hover:underline text-primary font-bold'>Twitter</span>
                <span className='opacity-30'>•</span>
                <span className='text-xs cursor-pointer hover:underline text-primary font-bold'>Instagram</span>
              </div>
            </div>
          </article>
        ) : (
          /* ── ANNOUNCEMENTS LIST VIEW ── */
          <>
            {/* Press Header */}
            <section className='relative py-16 px-6 lg:px-16 overflow-hidden bg-surface-container-low border-b border-outline-variant/15'>
              <div className='max-w-4xl mx-auto text-center space-y-6 relative z-10'>
                <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/10'>
                  <Newspaper className='w-3 h-3' /> Press & Newsroom
                </div>
                <h1 className='font-display font-extrabold text-4xl md:text-6xl text-on-surface leading-tight tracking-tight'>
                  Newsroom & Corporate
                </h1>
                <p className='text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed font-light'>
                  Latest updates, announcements, and media kits from the LuxeStay team.
                </p>
              </div>
            </section>

            {/* Press Body */}
            <section className='py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12'>
              {/* Main news column */}
              <div className='lg:col-span-8 space-y-12'>
                <h3 className='font-headline text-2xl font-bold border-b border-outline-variant/10 pb-4 text-[#1a1c1c]'>
                  Recent Announcements
                </h3>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {articles.map((art, idx) => (
                    <article 
                      key={idx} 
                      onClick={() => handleSelectArticle(idx)}
                      className='group flex flex-col gap-4 bg-white border border-outline-variant/10 hover:border-primary/20 rounded-2xl p-4 transition-all duration-300 hover:shadow-ambient hover:-translate-y-1 cursor-pointer text-left'
                    >
                      <div className='relative w-full aspect-[16/10] rounded-xl overflow-hidden'>
                        <img 
                          alt={art.title} 
                          className='w-full h-full object-cover group-hover:scale-103 transition-transform duration-700' 
                          src={art.image}
                        />
                      </div>
                      <div className='flex flex-col flex-grow justify-between px-1 space-y-3'>
                        <div className='space-y-2'>
                          <div className='flex gap-2 items-center text-[10px] font-bold uppercase tracking-widest text-primary'>
                            <span>{art.category}</span>
                            <span className='w-1 h-1 rounded-full bg-outline-variant/40' />
                            <span className='font-light text-on-surface-variant lowercase flex items-center gap-1'>
                              <Calendar className='w-3 h-3 text-primary' /> {art.date}
                            </span>
                          </div>
                          
                          <h4 className='font-headline font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-snug'>
                            {art.title}
                          </h4>
                          
                          <p className='text-xs text-on-surface-variant leading-relaxed font-light line-clamp-3'>
                            {art.desc}
                          </p>
                        </div>

                        <div className='pt-2'>
                          <span className='inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary border-b border-primary hover:gap-2 transition-all pb-0.5'>
                            Read Release <ArrowRight className='w-3.5 h-3.5' />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Media Kit Sidebar */}
              <div className='lg:col-span-4 space-y-6'>
                <div className='bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 shadow-sm space-y-6 h-fit text-left'>
                  <h4 className='font-headline font-bold text-lg border-b border-outline-variant/10 pb-3 text-[#1a1c1c]'>
                    Media Resources
                  </h4>
                  <p className='text-xs text-on-surface-variant leading-relaxed font-light'>
                    Download official brand assets, logos, and executive bios.
                  </p>
                  
                  <div className='space-y-3 pt-2'>
                    <button 
                      onClick={downloadBrandKit}
                      className='w-full flex items-center justify-between p-4 bg-white hover:bg-surface-container rounded-xl border border-outline-variant/10 transition-colors text-xs font-semibold text-on-surface active:scale-[0.98]'
                    >
                      <span>LuxeStay Brand Kit (ZIP)</span>
                      <Download className='w-4 h-4 text-primary' />
                    </button>
                    
                    <button 
                      onClick={downloadPressArchives}
                      className='w-full flex items-center justify-between p-4 bg-white hover:bg-surface-container rounded-xl border border-outline-variant/10 transition-colors text-xs font-semibold text-on-surface active:scale-[0.98]'
                    >
                      <span>Press Release Archives (PDF)</span>
                      <Download className='w-4 h-4 text-primary' />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
