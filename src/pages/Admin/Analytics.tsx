import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { BookingsLineChart } from '../../components/admin/BookingsLineChart';
import { 
  Calendar as CalendarIcon, FileDown, TrendingUp, TrendingDown, 
  Minus, Star, Eye, LayoutGrid, Lightbulb, Sparkles 
} from 'lucide-react';
import api from '../../lib/api';
import { formatCurrency } from '../../lib/utils';

interface TopProperty {
  id: string;
  title: string;
  city: string;
  country: string;
  images: string[];
  views: number;
  pricePerNight: number;
  bookingCount: number;
  conversionRate: number;
  revenueContrib: number;
}

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  activeRooms: number;
  totalUsers: number;
  avgOccupancy: number;
  avgRating: number;
  topProperties: TopProperty[];
  bookingsChange: number;
  revenueChange: number;
  roomsChange: number;
  usersChange: number;
}

interface ChartData {
  data: number[];
  labels: string[];
}

export function AdminAnalytics() {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [chart, setChart] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiSuggestion, setAiSuggestion] = useState('Properties listing Matterport 3D digital walkthroughs report a 45% uplift in guest checkout conversions. Review top-performing properties above and replicate description structures for lower-performing listings.');

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const [kpiRes, chartRes, aiRes] = await Promise.all([
        api.get<AnalyticsData>('/analytics/kpi'),
        api.get<ChartData>('/analytics/bookings-chart'),
        api.get<{ suggestion: string }>('/analytics/suggestions?page=analytics').catch(() => ({ data: { suggestion: '' } })),
      ]);
      setStats(kpiRes.data);
      setChart(chartRes.data);
      if (aiRes.data?.suggestion) {
        setAiSuggestion(aiRes.data.suggestion);
      }
    } catch (error) {
      console.error('Failed to load analytics dashboard', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-left">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Analytics" />

        <main className="p-12 max-w-7xl mx-auto space-y-12">
          {/* Page Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Management Overview</p>
              <h2 className="text-[2rem] font-extrabold text-[#191c1e] leading-tight tracking-tight font-headline">Performance Analytics</h2>
            </div>
            
            {/* Controls: Date Picker & Exports */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white px-4 py-2.5 rounded-lg shadow-sm border border-slate-100">
                <CalendarIcon className="text-slate-400 mr-2 w-4 h-4" />
                <span className="text-xs font-semibold text-on-surface">Last 30 Days</span>
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-white text-on-surface shadow-sm rounded-md transition-all hover:bg-slate-50"
                >
                  <FileDown className="w-3.5 h-3.5" /> PDF
                </button>
              </div>
            </div>
          </header>

          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Key Metrics Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Metric Card 1: Total Revenue */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-36">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Total Revenue</p>
                    <h3 className="text-2xl font-bold font-headline text-on-surface">
                      {formatCurrency(stats?.totalRevenue || 142384.50, 'GBP')}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center text-emerald-600 gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] font-bold">+12.4% vs last month</span>
                  </div>
                </div>

                {/* Metric Card 2: Booking Volume */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-36">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Booking Volume</p>
                    <h3 className="text-2xl font-bold font-headline text-on-surface">
                      {stats?.totalBookings || 1842}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center text-emerald-600 gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] font-bold">+8.2% vs last month</span>
                  </div>
                </div>

                {/* Metric Card 3: Avg. Occupancy */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-36">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Avg. Occupancy</p>
                    <h3 className="text-2xl font-bold font-headline text-on-surface">
                      {stats?.avgOccupancy ? `${stats.avgOccupancy}%` : '88.5%'}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center text-amber-600 gap-1">
                    <Minus className="w-4 h-4" />
                    <span className="text-[10px] font-bold">Stable occupancy</span>
                  </div>
                </div>

                {/* Metric Card 4: Guest Rating */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between h-36">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Guest Rating</p>
                    <h3 className="text-2xl font-bold font-headline text-on-surface">
                      {stats?.avgRating ? `${stats.avgRating} / 5.0` : '4.92 / 5.0'}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center text-indigo-600 gap-1">
                    <Star className="w-4 h-4 fill-indigo-600 stroke-indigo-600" />
                    <span className="text-[10px] font-bold">98% positive sentiment</span>
                  </div>
                </div>
              </section>

              {/* Charts Section: Revenue Trends & Booking Sources */}
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bookings Line Chart */}
                <div className="lg:col-span-2">
                  {chart && (
                    <BookingsLineChart 
                      data={chart.data} 
                      labels={chart.labels} 
                      title="Revenue & Booking Growth"
                    />
                  )}
                </div>

                {/* Booking Sources Breakdown */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold font-headline text-on-surface uppercase tracking-wider mb-6">Booking Sources</h4>
                    <div className="flex flex-col items-center justify-center space-y-6">
                      
                      {/* Circular visual graph */}
                      <div className="relative h-36 w-36 rounded-full border-[12px] border-slate-100 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-[12px] border-indigo-600 border-t-transparent border-r-transparent transform rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-[12px] border-amber-500 border-l-transparent border-b-transparent transform -rotate-12"></div>
                        <div className="text-center">
                          <p className="text-xl font-bold font-headline">72%</p>
                          <p className="text-[8px] text-on-surface-variant font-bold uppercase tracking-widest">Direct</p>
                        </div>
                      </div>

                      <div className="w-full space-y-3 pt-2">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                            <span className="text-on-surface-variant">Direct Website</span>
                          </div>
                          <span className="text-on-surface">72%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span className="text-on-surface-variant">OTA Partners</span>
                          </div>
                          <span className="text-on-surface">18%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                            <span className="text-on-surface-variant">Phone/Walk-in</span>
                          </div>
                          <span className="text-on-surface">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Property Performance Table */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold font-headline text-[#191c1e] uppercase tracking-wider">Property Performance</h4>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sort: Highest Traffic</div>
                </div>
                <div className="overflow-hidden bg-white rounded-xl border border-slate-100 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f8f9fa] border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Property Name</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">General Location</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Base Rate</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Total Bookings</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Conv. Rate</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Revenue Contrib.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {stats?.topProperties && stats.topProperties.length > 0 ? (
                        stats.topProperties.map((prop) => (
                          <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-14 rounded-md bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                                  <img 
                                    src={prop.images[0] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=80&q=80'} 
                                    className="w-full h-full object-cover" 
                                    alt="" 
                                  />
                                </div>
                                <span className="text-sm font-bold text-on-surface leading-snug">{prop.title}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-xs font-semibold text-slate-500">
                              {prop.city}, {prop.country}
                            </td>
                            <td className="px-8 py-5 text-sm font-semibold text-on-surface">
                              ${prop.pricePerNight.toLocaleString()}
                            </td>
                            <td className="px-8 py-5 text-sm font-medium text-on-surface">
                              {prop.bookingCount}
                            </td>
                            <td className="px-8 py-5 text-sm font-medium text-emerald-600">
                              {prop.conversionRate}%
                            </td>
                            <td className="px-8 py-5 text-sm font-bold text-right text-indigo-700">
                              {formatCurrency(prop.revenueContrib, 'GBP')}
                            </td>
                          </tr>
                        ))
                      ) : (
                        /* Fallback elements from code.html template */
                        <>
                          <tr className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-14 rounded-md bg-slate-100 overflow-hidden shrink-0">
                                  <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=100&h=80&fit=crop" className="w-full h-full object-cover" alt="" />
                                </div>
                                <span className="text-sm font-bold text-on-surface">The Glass Pavilion</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-xs font-semibold text-slate-500">Aspen, Colorado</td>
                            <td className="px-8 py-5 text-sm font-semibold text-on-surface">$850</td>
                            <td className="px-8 py-5 text-sm font-medium text-on-surface">32</td>
                            <td className="px-8 py-5 text-sm font-medium text-emerald-600">3.8%</td>
                            <td className="px-8 py-5 text-sm font-bold text-right text-indigo-700">£27,200</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="h-10 w-14 rounded-md bg-slate-100 overflow-hidden shrink-0">
                                  <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=100&h=80&fit=crop" className="w-full h-full object-cover" alt="" />
                                </div>
                                <span className="text-sm font-bold text-on-surface">Azure Water Villa</span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-xs font-semibold text-slate-500">Male, Maldives</td>
                            <td className="px-8 py-5 text-sm font-semibold text-on-surface">$1,200</td>
                            <td className="px-8 py-5 text-sm font-medium text-on-surface">16</td>
                            <td className="px-8 py-5 text-sm font-medium text-emerald-600">4.2%</td>
                            <td className="px-8 py-5 text-sm font-bold text-right text-indigo-700">£19,200</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Tips & Guidance Section */}
              <div className="bg-indigo-900 text-white p-6 rounded-xl space-y-3 flex items-start gap-4">
                <Lightbulb className="w-8 h-8 text-indigo-300 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm font-headline">Performance Optimization Insights</h4>
                  <p className="text-xs text-indigo-100/80 leading-relaxed mt-1">
                    {aiSuggestion}
                  </p>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
