import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

interface FAQItem {
  q: string;
  a: string;
}

export const CommonInquiries: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: "How do you select your properties?",
      a: "Our 'LuxeSelect' process involves a 150-point inspection covering architectural integrity, interior design quality, and host reliability. We only approve properties that offer a distinct sense of place and superior luxury."
    },
    {
      q: "What is the Celestial Concierge?",
      a: "The Celestial Concierge is our proprietary hybrid AI and human service. It uses data to predict your needs while ensuring a local human expert oversees every physical arrangement for absolute perfection."
    },
    {
      q: "Can I book private experiences only?",
      a: "While our experiences are primarily designed for our staying guests, members of the 'Inner Circle' can access our curated experience catalog independently."
    }
  ];

  return (
    <section className="max-w-[800px] mx-auto px-6 lg:px-10 mb-20">
      <SectionHeading
        title="Common Inquiries"
        subtitle="Everything you need to know about the LuxeStay experience."
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeFaq === index;
          return (
            <div
              key={index}
              className="border border-outline-variant/20 rounded-2xl overflow-hidden transition-all duration-300 bg-surface-container-lowest shadow-ambient"
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-surface-container-low transition-colors text-left focus:outline-none"
              >
                <span className="font-headline font-bold text-on-surface text-base md:text-lg">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-350 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden ${
                  isOpen ? 'max-h-40 border-t border-outline-variant/10' : 'max-h-0'
                }`}
              >
                <p className="px-6 py-4 text-on-surface-variant text-sm leading-relaxed bg-surface-container-lowest font-body">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
