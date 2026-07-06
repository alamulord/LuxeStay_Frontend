import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay slightly for premium appearance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 max-w-sm bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-5 border border-outline-variant/15 shadow-2xl space-y-4 select-none no-print"
        >
          <div className="space-y-1">
            <h4 className="font-headline text-sm font-bold text-on-surface">
              Cookie Confidentiality
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-body">
              We honor your digital privacy. We use cookies to curate your experience, personalize AI search, and ensure secure payments.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAccept}
              className="flex-grow py-2.5 bg-on-surface hover:bg-black text-white rounded-full font-headline font-bold text-[10px] uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              Accept All
            </button>
            <button
              onClick={handleReject}
              className="flex-grow py-2.5 bg-transparent hover:bg-surface-container-high text-on-surface-variant rounded-full font-headline font-bold text-[10px] uppercase tracking-wider border border-outline-variant/25 transition-all duration-300"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
