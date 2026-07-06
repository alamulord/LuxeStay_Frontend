import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const suggestionsList = [
  "I need somewhere quiet by the sea...",
  "Show me villas perfect for a honeymoon...",
  "I want modern architecture in Japan...",
  "Find a mountain retreat with a fireplace...",
];

export const SuggestionCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % suggestionsList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-5 overflow-hidden flex items-center justify-center text-xs font-body text-white/50 select-none pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="italic"
        >
          e.g. "{suggestionsList[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
};
