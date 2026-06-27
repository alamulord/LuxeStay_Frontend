import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Home } from 'lucide-react';
import { Navbar } from '../components/shared/Navbar';
import { Footer } from '../components/shared/Footer';

export function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Decorative background blur blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-md w-full text-center space-y-8 bg-white/40 backdrop-blur-md border border-outline-variant/10 p-8 rounded-2xl shadow-ambient">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10 text-primary">
              <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-headline text-5xl font-extrabold text-[#1a1c1c] tracking-tight"
            >
              404
            </motion.h1>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-headline text-xl font-bold text-[#1a1c1c] italic"
              style={{ fontStyle: 'italic' }}
            >
              Lost in Luxury
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs text-[#5c3f41] leading-relaxed max-w-sm mx-auto"
            >
              The exclusive suite, destination, or path you are looking for cannot be found. It may have been renamed or relocated.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
          >
            <Link
              to="/dashboard/trips"
              className="flex items-center justify-center gap-2 bg-[#ba0036] hover:bg-[#ba0036]/90 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors shadow-lg shadow-[#ba0036]/20"
            >
              Go to Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-white border border-outline-variant/30 hover:border-[#1a1c1c] text-[#1a1c1c] text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-200"
            >
              <Home className="w-3.5 h-3.5" />
              LuxeStay Home
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
