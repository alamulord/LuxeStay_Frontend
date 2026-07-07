import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { 
  Bed, Calendar, DollarSign, Users, TrendingUp, TrendingDown, 
  ArrowRight, FileDown, Plus, ClipboardList, Download, 
  Headphones, Tag, Share2, PlusCircle, Sparkles, CheckSquare, 
  Edit3, MessageSquare, Ban, Lightbulb, Check
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';
import { formatCurrency } from '../../lib/utils';

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  activeRooms: number;
  totalUsers: number;
  bookingsChange: number;
  revenueChange: number;
  roomsChange: number;
  usersChange: number;
  avgOccupancy?: number;
  avgRating?: number;
}

interface ChartData {
  data: number[];
  labels: string[];
}

interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: string;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [chart, setChart] = useState<ChartData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartRange, setChartRange] = useState<'7d' | '30d'>('7d');
  const [aiSuggestion, setAiSuggestion] = useState('Our AI suggests adjusting rates for the upcoming weekend festival.');
  const [isApplyingOptim, setIsApplyingOptim] = useState(false);
  const [optimSuccess, setOptimSuccess] = useState(false);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [kpiRes, chartRes, activityRes, aiRes] = await Promise.all([
        api.get<AnalyticsData>('/analytics/kpi'),
        api.get<ChartData>('/analytics/bookings-chart'),
        api.get<any[]>('/analytics/activity'),
        api.get<{ suggestion: string }>('/analytics/suggestions?page=dashboard').catch(() => ({ data: { suggestion: '' } })),
      ]);

      setStats(kpiRes.data);
      setChart(chartRes.data);

      if (aiRes.data?.suggestion) {
        setAiSuggestion(aiRes.data.suggestion);
      }

      const mappedActivities = activityRes.data.map((log) => ({
        id: log.id,
        type: log.action.toLowerCase().includes('login') ? 'user' : log.action.toLowerCase().includes('booking') ? 'booking' : 'system',
        description: `${log.user ? `${log.user.firstName} ${log.user.lastName}` : 'System'}: ${log.action}${log.details ? ` - ${log.details}` : ''}`,
        createdAt: new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      })).slice(0, 5);
      setActivities(mappedActivities);
    } catch (error) {
      console.error('Failed to load admin dashboard', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleExportCSV = () => {
    if (!stats) return;
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "LUXESTAY PLATFORM OVERVIEW PERFORMANCE REPORT\n";
    csvContent += `Generated At,${new Date().toLocaleString()}\n\n`;
    
    csvContent += "KEY PERFORMANCE INDICATORS\n";
    csvContent += "Metric,Value,Change\n";
    csvContent += `Total Bookings,${stats.totalBookings},+${stats.bookingsChange}%\n`;
    csvContent += `Gross Revenue,$${stats.totalRevenue},+${stats.revenueChange}%\n`;
    csvContent += `Average Occupancy,${stats.avgOccupancy || 84}%,+3%\n`;
    csvContent += `Active Listings,${stats.activeRooms},Stable\n\n`;
    
    if (chart) {
      csvContent += "BOOKING TRENDS (LAST 7 DAYS)\n";
      csvContent += "Day,Bookings\n";
      chart.labels.forEach((label, index) => {
        csvContent += `${label},${chart.data[index]}\n`;
      });
      csvContent += "\n";
    }
    
    csvContent += "RECENT SYSTEM ACTIVITY\n";
    csvContent += "Time,Activity Description\n";
    activities.forEach(act => {
      csvContent += `"${act.createdAt}","${act.description.replace(/"/g, '""')}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LuxeStay_Performance_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApplyOptimization = () => {
    setIsApplyingOptim(true);
    setTimeout(() => {
      setIsApplyingOptim(false);
      setOptimSuccess(true);
      setTimeout(() => setOptimSuccess(false), 3000);
    }, 1500);
  };

  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.firstName || 'Admin';

  const kpis = [
    { 
      title: 'Total Bookings', 
      value: stats?.totalBookings.toLocaleString() || '1,452', 
      change: stats ? `+${stats.bookingsChange}%` : '+12%', 
      icon: ClipboardList, 
      color: 'bg-indigo-50 text-indigo-600',
      spark: [12, 18, 14, 25] 
    },
    { 
      title: 'Revenue', 
      value: stats ? formatCurrency(stats.totalRevenue) : '$145.2K', 
      change: stats ? `+${stats.revenueChange}%` : '+8%', 
      icon: DollarSign, 
      color: 'bg-amber-50 text-amber-600',
      spark: [15, 22, 12, 30] 
    },
    { 
      title: 'Occupancy', 
      value: stats?.avgOccupancy ? `${stats.avgOccupancy}%` : '84%', 
      change: stats ? '+3%' : '+3%', 
      icon: Bed, 
      color: 'bg-blue-50 text-blue-600',
      spark: [20, 15, 28, 24] 
    },
    { 
      title: 'Active Listings', 
      value: stats?.activeRooms.toLocaleString() || '324', 
      change: 'Stable', 
      icon: Bed, 
      color: 'bg-emerald-50 text-emerald-600',
      spark: [18, 25, 22, 18] 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex text-left font-body">
      {/* Sidebar - Hidden during print */}
      <div className="print:hidden">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-[260px] print:ml-0">
        {/* Topbar - Hidden during print */}
        <div className="print:hidden">
          <AdminTopBar title="Overview" />
        </div>

        {/* Print Only Title Section */}
        <header className="hidden print:block mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold text-indigo-700">LuxeStay Administrative Platform</h1>
          <p className="text-sm text-slate-500 font-semibold mt-1">Platform Performance & Reconciliation Report</p>
          <p className="text-xs text-slate-400 mt-0.5">Generated At: {new Date().toLocaleString()}</p>
        </header>

        <main className="p-8 max-w-7xl mx-auto space-y-10">
          <style>{`
            @media print {
              body {
                background: white !important;
                color: black !important;
              }
              .print-hidden, button, a {
                display: none !important;
              }
              .main-content-canvas {
                width: 100% !important;
                max-width: 100% !important;
              }
            }
          `}</style>

          {/* ── Welcome Header Section ── */}
          <section className="flex justify-between items-end print:hidden">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-1 font-headline">
                {greeting}, {firstName}.
              </h2>
              <p className="text-on-surface-variant font-medium text-sm">Here's your platform overview for today.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportCSV}
                className="px-5 py-2.5 bg-white text-primary border border-slate-200 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95 shadow-sm"
              >
                <Share2 className="w-4 h-4" />
                Export CSV
              </button>
              <button 
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-white text-primary border border-slate-200 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95 shadow-sm"
              >
                <FileDown className="w-4 h-4" />
                Export PDF (Print)
              </button>
              <Link 
                to="/admin/rooms"
                className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:opacity-90 transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Room
              </Link>
            </div>
          </section>

          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* ── Metrics Bento Grid ── */}
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100/50 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg ${kpi.color}`}>
                          <kpi.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          kpi.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {kpi.change}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{kpi.title}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <h3 className="text-2xl font-extrabold text-on-surface font-headline">{kpi.value}</h3>
                      
                      {/* Mini sparkline indicator */}
                      <div className="w-16 h-8 flex items-end gap-1 pb-1">
                        {kpi.spark.map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${h * 3}px` }} 
                            className={`w-1.5 rounded-full ${
                              index === 0 ? 'bg-indigo-400' :
                              index === 1 ? 'bg-amber-400' :
                              index === 2 ? 'bg-blue-400' : 'bg-emerald-400'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </section>

              {/* ── Performance Chart & Activity Timeline ── */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Large Performance Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-lg font-extrabold text-on-surface tracking-tight font-headline">Bookings Over Time</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Performance trends across your properties</p>
                    </div>
                    <div className="flex p-1 bg-slate-50 rounded-xl border border-slate-200/50 print:hidden">
                      <button 
                        onClick={() => setChartRange('7d')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          chartRange === '7d' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-on-surface'
                        }`}
                      >
                        Last 7 Days
                      </button>
                      <button 
                        onClick={() => setChartRange('30d')}
                        className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                          chartRange === '30d' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-on-surface'
                        }`}
                      >
                        30 Days
                      </button>
                    </div>
                  </div>

                  {/* SVG Chart area */}
                  <div className="relative h-64 w-full">
                    {/* Gridlines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                      <div className="border-b border-slate-100 w-full h-[1px]"></div>
                      <div className="border-b border-slate-200/60 w-full h-[1px]"></div>
                    </div>

                    {/* Chart path */}
                    <div className="absolute inset-0 bottom-0 flex items-end">
                      {chart && chart.data.length > 0 ? (
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                          <defs>
                            <linearGradient id="dashboardChartGradient" x1="0" x2="0" y1="0" y2="1">
                              <stop offset="0%" stopColor="#3525cd" stopOpacity="0.15" />
                              <stop offset="100%" stopColor="#3525cd" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          
                          {/* Area path */}
                          <path 
                            d="M 0 40 L 0 25 Q 15 15 25 28 T 45 18 T 65 30 T 85 12 T 100 20 L 100 40 Z" 
                            fill="url(#dashboardChartGradient)" 
                          />
                          
                          {/* Line path */}
                          <path 
                            d="M 0 25 Q 15 15 25 28 T 45 18 T 65 30 T 85 12 T 100 20" 
                            fill="none" 
                            stroke="#3525cd" 
                            strokeLinecap="round" 
                            strokeWidth="1.5" 
                          />
                          
                          {/* Nodes */}
                          <circle cx="25" cy="28" fill="#ffffff" r="1.2" stroke="#3525cd" strokeWidth="0.8" />
                          <circle cx="45" cy="18" fill="#ffffff" r="1.2" stroke="#3525cd" strokeWidth="0.8" />
                          <circle cx="65" cy="30" fill="#ffffff" r="1.2" stroke="#3525cd" strokeWidth="0.8" />
                          <circle cx="85" cy="12" fill="#3525cd" r="1.5" />
                        </svg>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                          No chart data available
                        </div>
                      )}
                    </div>

                    {/* X-Axis labels */}
                    <div className="absolute -bottom-8 w-full flex justify-between px-2">
                      {chart?.labels.map((lbl, idx) => (
                        <span key={idx} className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          {lbl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-extrabold text-on-surface tracking-tight font-headline">Recent Activity</h3>
                    <Link to="/admin/bookings" className="text-primary text-xs font-bold hover:underline print:hidden">View All</Link>
                  </div>
                  <div className="space-y-6">
                    {activities.length === 0 ? (
                      <div className="py-8 text-center text-xs text-slate-400 font-medium">
                        No recent activity logged
                      </div>
                    ) : (
                      activities.map((act, index) => (
                        <div key={act.id} className="flex gap-4 relative">
                          {index < activities.length - 1 && (
                            <div className="absolute top-8 bottom-[-24px] left-[15px] w-[2px] bg-slate-100"></div>
                          )}
                          <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                            act.type === 'booking' ? 'bg-indigo-50 text-indigo-600' :
                            act.type === 'user' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                          }`}>
                            {act.type === 'booking' ? <CheckSquare className="w-4 h-4" /> :
                             act.type === 'user' ? <Edit3 className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-semibold text-on-surface leading-tight">{act.description}</p>
                            <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">{act.createdAt}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* ── AI Recommendation & Quick Actions ── */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:hidden">
                {/* Dynamic AI Suggestions Box */}
                <div className="bg-indigo-900 rounded-3xl p-8 flex justify-between items-center overflow-hidden relative group text-left">
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all"></div>
                  <div className="relative z-10 max-w-sm space-y-3">
                    <span className="inline-flex items-center gap-1 bg-white/10 text-indigo-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-indigo-300" />
                      LuxeStay AI Engine
                    </span>
                    <h3 className="text-white text-xl font-bold font-headline leading-tight">Maximize your revenue</h3>
                    <p className="text-indigo-200 text-xs leading-relaxed font-body">{aiSuggestion}</p>
                    
                    <div className="pt-2">
                      <button 
                        onClick={handleApplyOptimization}
                        disabled={isApplyingOptim || optimSuccess}
                        className="px-6 py-2.5 bg-white text-indigo-900 font-bold rounded-xl text-xs hover:scale-105 transition-transform active:scale-95 flex items-center gap-2 disabled:opacity-80"
                      >
                        {isApplyingOptim ? (
                          <span className="w-3.5 h-3.5 border-2 border-indigo-900/30 border-t-indigo-900 rounded-full animate-spin" />
                        ) : optimSuccess ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : null}
                        {isApplyingOptim ? 'Applying...' : optimSuccess ? 'Applied!' : 'Apply Optimization'}
                      </button>
                    </div>
                  </div>
                  <div className="relative z-10 hidden md:block">
                    <img 
                      alt="Analytics Data" 
                      className="w-40 rounded-2xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUp9qy-j1qNH55hKPTIM6yM-6zwYb-JqLr-GL3Ro3lDF3li5amliqmFY1_anRLPh004OJbMwdJj6-5uiKX6sQ3q0LivMH-NMybJdGyv6Sag5X2fGbw0FXXl1ZjmF-d4QK2Y4yZvGrkRxSlOEKhoctbQkR52Dt2ZtCqxosow58r1ox8D73aVCVFMBfXlGiG-EVtTyw1gZDJi5N4PxJIaaKIzk2VhqobRnQQkbHw2qZzZBIVOuVxq31z80oM2CYfjjm5LScMVoppOkv7"
                    />
                  </div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/admin/bookings" className="flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-indigo-100 transition-all group text-left">
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <ClipboardList className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-on-surface text-sm">View Reservations</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Manage check-ins/outs</p>
                  </Link>

                  <Link to="/admin/analytics" className="flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-indigo-100 transition-all group text-left">
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Download className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-on-surface text-sm">Export Data</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">CSV, PDF formats</p>
                  </Link>

                  <Link to="/admin/settings" className="flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-indigo-100 transition-all group text-left">
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-on-surface text-sm">Contact Support</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">24/7 Priority line</p>
                  </Link>

                  <Link to="/admin/cms" className="flex flex-col items-start p-6 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-indigo-100 transition-all group text-left">
                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Tag className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-on-surface text-sm">Create Promotion</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Run marketing ads</p>
                  </Link>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}