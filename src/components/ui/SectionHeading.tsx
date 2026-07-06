import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  return (
    <div
      className={`mb-12 ${
        align === 'center' ? 'text-center' : 'text-left'
      } ${className}`}
    >
      <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-on-surface-variant mt-3 text-sm md:text-base max-w-2xl mx-auto font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
