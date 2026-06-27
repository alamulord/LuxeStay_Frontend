import React from 'react';
import { Calendar, CreditCard, User as UserIcon, AlertCircle } from 'lucide-react';

interface ActivityFeedProps {
  activities: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return Calendar;
      case 'payment':
        return CreditCard;
      case 'user':
        return UserIcon;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-ambient border border-slate-100">
      <h3 className="font-headline font-bold text-[#191c1e] mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = getIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="p-2 bg-[#f2f4f6] rounded-lg">
                <Icon className="w-4 h-4 text-[#464555]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#191c1e] leading-snug">{activity.description}</p>
                <p className="text-[10px] text-[#464555]/70 font-semibold mt-0.5">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}