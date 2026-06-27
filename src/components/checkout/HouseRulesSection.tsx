import React from 'react';
import { Clock, User, CigaretteOff, PartyPopper } from 'lucide-react';

export function HouseRulesSection() {
  const rules = [
    { icon: Clock, title: 'Check-in', description: '3:00 PM - 11:00 PM' },
    { icon: Clock, title: 'Check-out', description: '11:00 AM' },
    { icon: User, title: 'Guests', description: 'Maximum 4 guests allowed' },
    { icon: CigaretteOff, title: 'No smoking', description: 'Smoking is not permitted inside' },
    { icon: PartyPopper, title: 'No parties', description: 'No parties or events allowed' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl">House rules</h2>
      
      <div className="space-y-3">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg">
            <rule.icon className="w-5 h-5 text-on_surface_variant" />
            <div>
              <p className="font-medium text-sm">{rule.title}</p>
              <p className="text-sm text-on_surface_variant">{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}