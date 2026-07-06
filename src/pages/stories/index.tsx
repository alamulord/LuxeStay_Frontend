import React from 'react';
import { ArrowLeft, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function Stories() {
  const posts = [
    { title: 'Local Artisans of Amalfi: A Heritage Preserved', category: 'Craftsmanship', desc: 'Beyond the glamorous beach clubs lies a world of tactile tradition. We spend a week with the families keeping the spirit of the coast alive.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnj7yPIFWxDj67O5upZ1RhhRi8WRI1ZtF3ccgKWMsNFPpPvzmvzRaIrzkwCIFrognMkZIKVyLFAlC-6RKP6JcI2RGIKyFPIg4AMcl5HvMSsIkCYxin882eZjXIxIn23y8HiJlfjvCMnM-IIIgRBD5N-FvmIQqMP_w_P7rRtNLulGwgWzrGcgiA5PpPhbBVP2-9cLVvOfOFiOCQ5swebIVzj3PSqANlS6SuVUpJXv3AjR1lg6t4w8WdpHe3J9mjetgqLouA0FvtRPRc' },
    { title: 'The Future is Green: Sustainable Luxury Redefined', category: 'Sustainability', desc: 'How contemporary architects are integrating high-end stays into fragile ecosystems with minimal footprint.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC9x0UqIrZQKO9Prd4qTaimveAoH8suznbr89uiBwc2QGpMYhxFtkhAiwztH8Lb95hn2gQpfz-UMvkgGOIjBnVzMcW6Qd-foM_ns00SF7mwuyQv5gRy-1si7iqfLFBcp0HDFqlAJzf-6FBGJ88crvgD7AcL-TpHFHoCBmIzgMtpzMC_4kPKv5LaOFSOTdm2Vyifq5RBu9EfYtOJ8rVuWbrdge9aIU-stz0oVOcI9_Ygjdk8_7M6B8bfpsLQayUrtlS3elAQ5-q5kMg' },
    { title: 'The Private Library: Boutique Sanctuaries for the Soul', category: 'Curated Living', desc: 'Discover the intimate, dark-wood libraries hidden within our city center penthouses, designed for slow afternoons.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaa7xA1hZ2x6kFs_YS1j5aDdpZ7CuwwFtFnvaHMZXcDCvrHPYssljfDYDzkQ6uj-qDdvgvjmof-y34fQbKq7woZfy0xMw-F80pUCj248Xx-jJx_5nFD0SKMkuL6wJXyJj2W2dik6gpFgn2YrW5r-kqlqKDrC6c0nvQQTVG-cqCUp36dJ18wCDjcr-HXYHDiW1ZqDIJPz59jw2njwzzJTf_Xs1o2SqixOm1TEn68zzmGbp36dnBWfubGv5PtVb2JJh-9fQjmAskpCzR' }
  ];

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Editorial Journal Hero */}
        <section className='mb-20 py-16 bg-surface-container-low border-b border-outline-variant/15 px-6 lg:px-16'>
          <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end'>
            <div className='lg:col-span-7 space-y-8'>
              <Link
                to='/'
                className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline mb-4'
              >
                <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
              </Link>
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
            <div key={idx} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className='w-full lg:w-1/2 aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-outline-variant/10'>
                <img className='w-full h-full object-cover' src={post.image} alt={post.title} />
              </div>
              <div className='w-full lg:w-1/2 space-y-4'>
                <span className='text-xs font-bold uppercase tracking-widest text-primary'>{post.category}</span>
                <h3 className='font-display text-3xl font-bold leading-tight'>{post.title}</h3>
                <p className='text-on-surface-variant text-sm leading-relaxed'>{post.desc}</p>
                <div className='pt-2'>
                  <a href="javascript:void(0)" className='inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary border-b border-primary hover:gap-3 transition-all pb-1'>
                    Read Essay <ArrowRight className='w-4 h-4' />
                  </a>
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
      </main>

      <Footer />
    </div>
  );
}
