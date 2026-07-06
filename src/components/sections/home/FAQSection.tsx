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
    },
    {
      q: "What amenities are included as standard?",
      a: "All LuxeStay residences include premium high-speed Wi-Fi, organic cotton linens, signature bath amenities, a fully-stocked espresso bar, and 24/7 priority concierge support."
    },
    {
      q: "What is your cancellation and modification policy?",
      a: "We offer flexible reservation modifications up to 14 days prior to arrival. Cancellations made within 30 days are eligible for credit towards future stays, while members of the Inner Circle enjoy fee-free cancellations up to 72 hours in advance."
    },
    {
      q: "Do you accommodate private flights and custom arrivals?",
      a: "Yes, our elite concierge team regularly coordinates with private aviation terminals, superyacht docks, and local luxury transport providers to ensure seamless, private transit directly to your villa doorstep."
    },
    {
      q: "How does the AI Concierge work during my stay?",
      a: "The AI Concierge provides real-time curated recommendations for dining, custom itineraries, and home automation control, backed by local hosts who can fulfill physical requests instantly."
    }
  ];

  const midPoint = 4;
  const leftFaqs = faqs.slice(0, midPoint);
  const rightFaqs = faqs.slice(midPoint);

  return (
    <section className="max-w-page mx-auto px-6 lg:px-10 py-12 mb-20 no-print select-none">
      <SectionHeading
        title="Common Inquiries"
        subtitle="Everything you need to know about the LuxeStay experience."
        className="mb-10"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          {leftFaqs.map((faq, index) => {
            const actualIndex = index;
            return (
              <FAQItem
                key={actualIndex}
                q={faq.q}
                a={faq.a}
                isOpen={activeFaq === actualIndex}
                onToggle={() => setActiveFaq(activeFaq === actualIndex ? null : actualIndex)}
              />
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {rightFaqs.map((faq, index) => {
            const actualIndex = midPoint + index;
            return (
              <FAQItem
                key={actualIndex}
                q={faq.q}
                a={faq.a}
                isOpen={activeFaq === actualIndex}
                onToggle={() => setActiveFaq(activeFaq === actualIndex ? null : actualIndex)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
