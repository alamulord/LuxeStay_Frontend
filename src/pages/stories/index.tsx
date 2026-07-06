import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Compass, ArrowRight, User, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

interface StoryContent {
  intro: string;
  section1Title: string;
  section1Body: string;
  quote: string;
  quoteAuthor: string;
  section2Title: string;
  section2Body: string;
  conclusion: string;
}

export function Stories() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  const posts = [
    { 
      title: 'Local Artisans of Amalfi: A Heritage Preserved', 
      category: 'Craftsmanship', 
      desc: 'Beyond the glamorous beach clubs lies a world of tactile tradition. We spend a week with the families keeping the spirit of the coast alive.', 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnj7yPIFWxDj67O5upZ1RhhRi8WRI1ZtF3ccgKWMsNFPpPvzmvzRaIrzkwCIFrognMkZIKVyLFAlC-6RKP6JcI2RGIKyFPIg4AMcl5HvMSsIkCYxin882eZjXIxIn23y8HiJlfjvCMnM-IIIgRBD5N-FvmIQqMP_w_P7rRtNLulGwgWzrGcgiA5PpPhbBVP2-9cLVvOfOFiOCQ5swebIVzj3PSqANlS6SuVUpJXv3AjR1lg6t4w8WdpHe3J9mjetgqLouA0FvtRPRc',
      readTime: '6 min read',
      author: 'Matteo Rossi',
      date: 'June 18, 2024',
      essay: {
        intro: 'Beyond the glamorous beach clubs and crowded cliffside piazzas of Positano lies a quieter, more tactile world. High above the shoreline, local artisans have spent generations perfecting their crafts, weaving the history of the Amalfi coast into physical form.',
        section1Title: 'The Clay of Vietri sul Mare',
        section1Body: 'For seven generations, the Solimene family has worked the local red clay. Inside their towering, brutalist factory designed by Paolo Soleri, potters mold pitchers, bowls, and tiles by hand. The colors are inspired directly by the landscape: the deep cobalt of the Mediterranean Sea, the rich yellow of the sfusato lemons, and the muted green of the mountain pines.',
        quote: 'Every plate tells the story of the hand that shaped it, the sun that dried it, and the sea that inspired it.',
        quoteAuthor: 'Vincenzo Solimene',
        section2Title: 'The Looms of Praiano',
        section2Body: 'Higher up the mountainside, down a quiet lane lined with wild rosemary, Isabella Cuomo operates one of the last traditional wooden looms on the coast. She uses organic linen and wool to create custom blankets and tapestries that reflect the natural light patterns of the cliffs. The process is slow, deliberate, and entirely meditative.',
        conclusion: 'By integrating these artisanal goods directly into our Amalfi homes, we hope to support the preservation of these ancient trades, keeping the real Amalfi alive.'
      } as StoryContent
    },
    { 
      title: 'The Future is Green: Sustainable Luxury Redefined', 
      category: 'Sustainability', 
      desc: 'How contemporary architects are integrating high-end stays into fragile ecosystems with minimal footprint.', 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC9x0UqIrZQKO9Prd4qTaimveAoH8suznbr89uiBwc2QGpMYhxFtkhAiwztH8Lb95hn2gQpfz-UMvkgGOIjBnVzMcW6Qd-foM_ns00SF7mwuyQv5gRy-1si7iqfLFBcp0HDFqlAJzf-6FBGJ88crvgD7AcL-TpHFHoCBmIzgMtpzMC_4kPKv5LaOFSOTdm2Vyifq5RBu9EfYtOJ8rVuWbrdge9aIU-stz0oVOcI9_Ygjdk8_7M6B8bfpsLQayUrtlS3elAQ5-q5kMg',
      readTime: '8 min read',
      author: 'Elena Vance',
      date: 'May 12, 2024',
      essay: {
        intro: 'Travel changes us, but it also changes the places we visit. The challenge of contemporary architecture is to design sanctuaries that elevate the human spirit while preserving the ground beneath our feet.',
        section1Title: 'Low-Impact Foundations',
        section1Body: 'In the pine forests of Oregon, our cabins sit on steel pilotis, hovering inches above the root systems of ancient trees. By avoiding massive concrete slabs, we allow rain and local fauna to traverse the landscape unimpeded. The buildings match the vertical rhythm of the forest, constructed from charred cedar that naturally resists bugs and weather.',
        quote: 'We do not build on the land; we live with it.',
        quoteAuthor: 'Elena Vance, Chief Sustainability Officer',
        section2Title: 'Zero-Water Systems',
        section2Body: 'In our desert estates, greywater recycling loops nourish olive groves and native cacti, turning dry landscapes into thriving oases. Solar arrays capture the high-desert sun, feeding clean energy back into the local grid while powering advanced atmospheric water generators that provide drinking water directly from the air.',
        conclusion: 'True luxury is the ability to enjoy the wild without leaving a trace of our presence, creating a blueprint for the future of travel.'
      } as StoryContent
    },
    { 
      title: 'The Private Library: Boutique Sanctuaries for the Soul', 
      category: 'Curated Living', 
      desc: 'Discover the intimate, dark-wood libraries hidden within our city center penthouses, designed for slow afternoons.', 
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaa7xA1hZ2x6kFs_YS1j5aDdpZ7CuwwFtFnvaHMZXcDCvrHPYssljfDYDzkQ6uj-qDdvgvjmof-y34fQbKq7woZfy0xMw-F80pUCj248Xx-jJx_5nFD0SKMkuL6wJXyJj2W2dik6gpFgn2YrW5r-kqlqKDrC6c0nvQQTVG-cqCUp36dJ18wCDjcr-HXYHDiW1ZqDIJPz59jw2njwzzJTf_Xs1o2SqixOm1TEn68zzmGbp36dnBWfubGv5PtVb2JJh-9fQjmAskpCzR',
      readTime: '5 min read',
      author: 'Alistair Cooke',
      date: 'April 05, 2024',
      essay: {
        intro: 'In the heart of the world’s busiest cities, the greatest luxury is silence. Within our penthouses, we have dedicated a sanctuary to the written word—a private library designed for long, slow afternoons.',
        section1Title: 'The Architecture of Reading',
        section1Body: 'Crafted from reclaimed walnut and local slate, our private libraries are oriented to capture the softest north light. Low-slung leather armchairs, custom ambient lamps, and sound-absorbing felt wall coverings create an acoustically perfect room where the city noise melts away entirely.',
        quote: 'A room without books is like a body without a soul.',
        quoteAuthor: 'Marcus Tullius Cicero',
        section2Title: 'A Curated Collection',
        section2Body: 'Each library is stocked by local historians and antique collectors. You will find first editions, regional poetry, and detailed historical maps of the surrounding city. We invite guests to unplug their devices, pour a glass of local vintage, and spend a slow afternoon in conversation with the minds of the past.',
        conclusion: 'Unplugging from the digital world allows us to reconnect with our thoughts, making the private library a core pillar of our urban stays.'
      } as StoryContent
    }
  ];

  const handleBackToJournal = () => {
    setActiveStoryIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStory = (index: number) => {
    setActiveStoryIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body select-none'>
      <Navbar />

      <main className='pt-[72px] flex-grow text-left'>
        {activeStoryIndex !== null ? (
          /* ── ESSAY DETAILS PAGE VIEW ── */
          <article className='py-16 max-w-4xl mx-auto px-6'>
            {/* Back to Journal Link */}
            <button
              onClick={handleBackToJournal}
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-8'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Journal
            </button>

            {/* Header Metadata */}
            <div className='space-y-4 mb-8'>
              <span className='inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-headline text-[10px] font-bold uppercase tracking-widest border border-primary/20'>
                {posts[activeStoryIndex].category}
              </span>
              <h1 className='font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#1a1c1c] leading-tight'>
                {posts[activeStoryIndex].title}
              </h1>
              
              <div className='flex items-center gap-6 text-xs text-on-surface-variant pt-2'>
                <div className='flex items-center gap-1.5'>
                  <User className='w-4 h-4 text-primary' />
                  <span>{posts[activeStoryIndex].author}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Calendar className='w-4 h-4 text-primary' />
                  <span>{posts[activeStoryIndex].date}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                  <Clock className='w-4 h-4 text-primary' />
                  <span>{posts[activeStoryIndex].readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className='aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-outline-variant/10 mb-12'>
              <img 
                className='w-full h-full object-cover' 
                src={posts[activeStoryIndex].image} 
                alt={posts[activeStoryIndex].title} 
              />
            </div>

            {/* Essay Content */}
            <div className='space-y-8 max-w-3xl mx-auto text-base text-on-surface-variant leading-relaxed font-light'>
              <p className='text-lg font-normal text-on-surface'>
                {posts[activeStoryIndex].essay.intro}
              </p>

              <div className='space-y-4 pt-4'>
                <h3 className='font-headline text-2xl font-bold text-on-surface'>
                  {posts[activeStoryIndex].essay.section1Title}
                </h3>
                <p>{posts[activeStoryIndex].essay.section1Body}</p>
              </div>

              {/* Blockquote section */}
              <div className='my-10 pl-6 border-l-4 border-primary py-2'>
                <p className='font-display text-xl md:text-2xl italic text-on-surface font-light leading-relaxed'>
                  “{posts[activeStoryIndex].essay.quote}”
                </p>
                <p className='text-xs font-bold uppercase tracking-wider text-primary mt-2 font-headline'>
                  — {posts[activeStoryIndex].essay.quoteAuthor}
                </p>
              </div>

              <div className='space-y-4'>
                <h3 className='font-headline text-2xl font-bold text-on-surface'>
                  {posts[activeStoryIndex].essay.section2Title}
                </h3>
                <p>{posts[activeStoryIndex].essay.section2Body}</p>
              </div>

              <p className='pt-4 border-t border-outline-variant/10 text-sm'>
                {posts[activeStoryIndex].essay.conclusion}
              </p>
            </div>

            {/* Post footer CTA */}
            <div className='max-w-3xl mx-auto pt-16 border-t border-outline-variant/10 mt-16 flex justify-between items-center'>
              <button 
                onClick={handleBackToJournal}
                className='text-xs font-bold uppercase tracking-wider text-primary hover:text-on-surface transition-colors'
              >
                ← Back to all essays
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
          /* ── STORIES JOURNAL LIST VIEW ── */
          <>
            {/* Editorial Journal Hero */}
            <section className='mb-20 py-16 bg-surface-container-low border-b border-outline-variant/15 px-6 lg:px-16'>
              <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end'>
                <div className='lg:col-span-7 space-y-8'>
                  <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest border border-primary/10'>
                    <BookOpen className='w-3 h-3' /> The Editorial Journal
                  </div>
                  <h1 className='font-display text-5xl md:text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.05] tracking-tighter text-on-surface'>
                    The Art of <br />
                    <span className='italic text-primary'>Slow Travel</span>
                  </h1>
                  <p className='font-body text-xl text-on-surface-variant max-w-xl leading-relaxed'>
                    In an era defined by velocity, we explore the quiet luxury of lingering. Discover the profound beauty of being exactly where you are.
                  </p>
                </div>
                <div className='lg:col-span-5'>
                  <div className='aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10'>
                    <img
                      className='w-full h-full object-cover'
                      src='https://lh3.googleusercontent.com/aida-public/AB6AXuBdy1eS1ZNOZr6zZs0tJNqgDvMy33wtP0o2Sk3T4hLB4xQHTIRz-7cCjEPEfqpvRXqZKBZzn9YMk03yNKG8u3JQCeIivHvUyEGM6lNtI9jDVB_zdZnvGBsywYMIydC2hrJ_nRBST3pwjOWyT0zPNtowrUiFsNLV45eFvHtBkiGi_rN7N8aK8HLOGkwIWMvSk6Lys1BpfPBfLGRl0fXZqtdkjl8EyXRhnmgwHZ_RP_Q5wbD02EtbiQ5w2__VinlCoWWO3g-IR4hH0pAa'
                      alt='Slow Travel Mountain View'
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Stories list */}
            <section className='py-20 px-6 max-w-6xl mx-auto space-y-24'>
              {posts.map((post, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col lg:flex-row gap-12 items-center cursor-pointer group ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                  onClick={() => handleSelectStory(idx)}
                >
                  <div className='w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/10'>
                    <img 
                      className='w-full h-full object-cover group-hover:scale-103 transition-transform duration-700' 
                      src={post.image} 
                      alt={post.title} 
                    />
                  </div>
                  <div className='w-full lg:w-1/2 space-y-4'>
                    <span className='text-xs font-bold uppercase tracking-widest text-primary'>{post.category}</span>
                    <h3 className='font-display text-3xl font-bold leading-tight group-hover:text-primary transition-colors'>{post.title}</h3>
                    <p className='text-on-surface-variant text-sm leading-relaxed'>{post.desc}</p>
                    <div className='pt-2'>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleSelectStory(idx); }}
                        className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary hover:gap-3 transition-all pb-1'
                      >
                        Read Essay <ArrowRight className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Sunday Dispatch newsletter */}
            <section className='relative py-24 bg-surface-container-low px-6 border-t border-outline-variant/15'>
              <div className='max-w-2xl mx-auto text-center space-y-6'>
                <h2 className='font-display text-4xl font-extrabold tracking-tight'>The Sunday Dispatch</h2>
                <p className='text-on-surface-variant leading-relaxed text-sm'>
                  Join our inner circle for a weekly curation of travel narratives, architectural inspiration, and hidden gems delivered to your inbox every Sunday morning.
                </p>
                <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Sunday Dispatch.'); }} className='flex flex-col sm:flex-row gap-4 pt-4'>
                  <input
                    className='flex-1 px-5 py-3.5 bg-surface-container-lowest border-0 rounded-xl focus:ring-2 focus:ring-primary font-body text-on-surface shadow-sm outline-none'
                    placeholder='Your email address'
                    type='email'
                    required
                  />
                  <button
                    className='px-8 py-3.5 bg-on-surface text-surface rounded-xl font-headline font-bold hover:bg-primary hover:text-white transition-colors'
                    type='submit'
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
