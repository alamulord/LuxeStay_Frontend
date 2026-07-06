import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroBackgroundProps {
  imageSrc?: string;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  imageSrc = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1800&h=1000&fit=crop"
}) => {
  const { scrollY } = useScroll();
  
  // Apple-like slow scroll parallax
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      <motion.div 
        style={{ y, opacity }}
        className="w-full h-[120%] absolute -top-[10%]"
      >
        <motion.img
          src={imageSrc}
          alt="LuxeStay Panoramic Destination"
          initial={{ scale: 1.07 }}
          animate={{ scale: 1.01 }}
          transition={{
            duration: 25,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
        />
      </motion.div>
    </div>
  );
};
