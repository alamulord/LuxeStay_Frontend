import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface KPIMetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

export function KPIMetricCard({ title, value, change, icon }: KPIMetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-ambient border border-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#464555] font-semibold mb-1 uppercase tracking-wider text-[10px]">{title}</p>
          <p className="text-2xl font-bold text-[#191c1e]">{value}</p>
          {change !== undefined && (
            <div className={cn(
              "flex items-center gap-1 mt-2 text-xs font-semibold",
              change >= 0 ? "text-emerald-600" : "text-red-600"
            )}>
              {change >= 0 ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              <span>{Math.abs(change)}% from last month</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-admin-primary/10 rounded-xl text-admin-primary flex-shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}