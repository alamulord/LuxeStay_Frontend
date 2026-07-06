import React from 'react';
import { ArrowLeft, Compass, Eye, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';

export function ImmersiveExperiences() {
  const experiences = [
    { title: 'Blue Horizon Caldera', category: 'Seclusion', cost: '$1,800', desc: 'A private cliffside dinner overlooking the Santorini sunset, accompanied by live acoustics and a personal sommelier.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEI6DYctwTRhMVnR_imexfVEdhqrPISXji-ONXQ5jb552N37bfpEyLp5EFvgD5SHR6Bu6ruvOF5tjwXdRk0iMA6bT0I_QFwOH7Qv9bUdsM_Fq2Golj7436SXXjpAhHw5avwq3TIhT55DreMgml8XQnRCpxt8o4j02ZqeWe_YTKyiboOHdgPWlFBu0wK5Nh_vOBmbhsRxc8x4AGjJfnKQVNfQNzWSkispS-LUcCjRroOX06Uj_DVNM43-yp0PUjV68p6Oeq-isblwyy' },
    { title: 'Private Sunset Yacht Sail', category: 'Adventure', cost: '$1,200', desc: 'Sail the Amalfi coast on a vintage 50ft yacht stocked with champagne and managed by an elite local crew.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkUQMtk39chFeuX779SkxAnZnR7Ct3Q3kZL6X4tE1v8jBEtAu6aRRxDIvIZIXjDZh4H8GDVsD1CJlXaB8Ko4qLjiFXzKtVYSrSzCzYlS4RPdj5uSZX8OFmg8gFfHIQ5p33S6QxbhpW874j4IdIIUNOZYCTjCv8RVurllCxwzi3JAxbcBaL24_jS3ck1e6Z8w2HhaAl6mVoEyV0vz2lT_XgFKSPiRn9jjQwYaI7dTTWzn-wJ8HFP28rMn20aewXbSfGrHUklMJKunq7' },
    { title: 'After-Hours Gallery Tour', category: 'Art & Culture', cost: '$600', desc: 'Step inside the city’s most exclusive private collection after midnight, led by the curator.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCNMDvSODC6mJ3ht9AzpBwQJarKKWK3yrE9EZR6-GUe7btRmEyrAoWE87v3Rz6YKZSyNXUqVg1Y7e6q_lGlqwp7nZWNbQ1i7KxR2KLOpm3JkVIz-IL-Qs_SI9SZGYTyTajT8BFqjm8qJANk5AvmAfXg2kg808C5_oQLC5Q2GlfQE-PolBMm_GWNm3xh6TwHPWOH9yP3L_tYqYVkGof4xCjTup7Wz-8LYyRfEyG6Im8EIGyspgKq4M3xyMI3-lUw51WpnEZbWIeEh9m' }
  ];

  return (
    <div className='min-h-screen bg-surface flex flex-col justify-between text-on-surface font-body'>
      <Navbar />

      <main className='pt-[72px] flex-grow'>
        {/* Experience Hero */}
        <section className='relative h-[70vh] flex items-center overflow-hidden px-6 lg:px-16'>
          <div className='absolute inset-0 z-0'>
            <img
              alt='Terrace dinner'
              className='w-full h-full object-cover'
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuCRILQtDhSg4EENMXsxVzl9BXj2JYL8F3V1GrU3zg4G2rPxzqIN5sFhMvUpQu49S8BhnNIktJoqseBv7gs-flh3qjRN9ZcWiTLUOKEdYF0x61S0TxXgjrz96CDdw0giggDqY82eHz3CwF6lCoDGws5032o62ue-LDVfZf3zZhWX-i4zrpyKThe-v9H3c6upeK4dydwgxgun9AgUHuv09U0tNu4HP_a9jOgS-u4cUi_kUcy5IcArAN-r1_YibgxhGwgdY_8B0dMd3-7j'
            />
            <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/20' />
          </div>
          <div className='relative z-10 max-w-4xl space-y-6 text-white'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-fixed-dim hover:underline mb-4 text-white'
            >
              <ArrowLeft className='w-3.5 h-3.5' /> Back to Home
            </Link>
            <span className='inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-widest border border-white/20 backdrop-blur-sm'>
              Immersive Experiences
            </span>
            <h1 className='font-display text-5xl md:text-7xl font-extrabold tracking-tight leading-none'>
              Enrich Your Narrative
            </h1>
            <p className='text-lg text-white/80 max-w-xl leading-relaxed'>
              Your next great story begins with a single conversation. Connect with our concierge to book bespoke excursions and events.
            </p>
          </div>
        </section>

        {/* Experience List */}
        <section className='py-24 px-6 max-w-6xl mx-auto'>
          <h2 className='font-display text-3xl md:text-4xl font-bold mb-16 text-center'>Curated Excursions</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {experiences.map((exp, idx) => (
              <div key={idx} className='bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between'>
                <div className='aspect-[4/3] w-full overflow-hidden'>
                  <img className='w-full h-full object-cover hover:scale-105 transition-transform duration-700' src={exp.image} alt={exp.title} />
                </div>
                <div className='p-6 flex-grow flex flex-col justify-between space-y-6'>
                  <div className='space-y-3'>
                    <div className='flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary'>
                      <span>{exp.category}</span>
                      <span className='text-on-surface font-black'>{exp.cost}</span>
                    </div>
                    <h3 className='font-headline font-bold text-xl'>{exp.title}</h3>
                    <p className='text-on-surface-variant text-xs leading-relaxed'>{exp.desc}</p>
                  </div>
                  <button className='w-full py-3 bg-on-surface text-surface rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-colors'>
                    Reserve Experience
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
