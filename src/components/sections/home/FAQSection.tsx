import React, { useState } from 'react';
import { FAQItem } from './FAQItem';
import { SectionHeading } from '../../ui/SectionHeading';

interface FAQ {
  q: string;
  a: string;
}

export const FAQSection: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs: FAQ[] = [
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
    <section className="max-w-[720px] mx-auto px-6 lg:px-10 py-12 mb-20 no-print select-none">
      <SectionHeading
        title="Common Inquiries"
        subtitle="Everything you need to know about the LuxeStay experience."
        className="mb-10"
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            q={faq.q}
            a={faq.a}
            isOpen={activeFaq === index}
            onToggle={() => setActiveFaq(activeFaq === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
};
