import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { Bed, Calendar, DollarSign, Users, TrendingUp, TrendingDown, ArrowRight, FileDown, Plus, ClipboardList, Download, Headphones, Tag } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../lib/api';

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  activeRooms: number;
  totalUsers: number;
  bookingsChange: number;
  revenueChange: number;
  roomsChange: number;
  usersChange: number;
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

const quickActions = [
  { title: 'View Reservations', description: 'Check all upcoming bookings', icon: ClipboardList, to: '/admin/bookings' },
  { title: 'Export Data', description: 'Download reports & analytics', icon: Download, to: '/admin/analytics' },
  { title: 'Contact Support', description: 'Get help from our team', icon: Headphones, to: '/admin/settings' },
  { title: 'Create Promotion', description: 'Set up deals & discounts', icon: Tag, to: '/admin/cms' },
];

export function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [chart, setChart] = useState<ChartData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartRange, setChartRange] = useState<'7d' | '30d'>('7d');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [kpiRes, chartRes, activityRes] = await Promise.all([
          api.get<AnalyticsData>('/analytics/kpi'),
          api.get<ChartData>('/analytics/bookings-chart'),
          api.get<any[]>('/analytics/activity'),
        ]);

        setStats(kpiRes.data);
        setChart(chartRes.data);

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
    fetchDashboardData();
  }, []);

  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.firstName || 'Admin';

  const kpiCards = stats ? [
    { title: 'Total Bookings', value: stats.totalBookings.toLocaleString(), change: stats.bookingsChange, icon: Calendar, color: 'bg-admin-primary/10 text-admin-primary' },
    { title: 'Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, change: stats.revenueChange, icon: DollarSign, color: 'bg-tertiary/10 text-tertiary' },
    { title: 'Active Rooms', value: stats.activeRooms.toLocaleString(), change: stats.roomsChange, icon: Bed, color: 'bg-secondary/10 text-secondary' },
    { title: 'Total Users', value: stats.totalUsers.toLocaleString(), change: stats.usersChange, icon: Users, color: 'bg-primary/10 text-primary' },
  ] : [];

  // Render a simple SVG chart from data
  const renderChart = () => {
    if (!chart || chart.data.length === 0) return null;

    const maxVal = Math.max(...chart.data, 1);
    const width = 680;
    const height = 200;
    const padding = 20;
    const chartW = width - padding * 2;
    const chartH = height - padding * 2;
    const stepX = chartW / (chart.data.length - 1 || 1);

    const points = chart.data.map((val, i) => {
      const x = padding + i * stepX;
      const y = height - padding - (val / maxVal) * chartH;
      return `${x},${y}`;
    });

    const linePath = `M${points.join(' L')}`;
    const areaPath = `${linePath} L${padding + (chart.data.length - 1) * stepX},${height - padding} L${padding},${height - padding} Z`;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3525cd" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3525cd" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#chartGradient)" />
        <path d={linePath} fill="none" stroke="#3525cd" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {chart.data.map((val, i) => {
          const x = padding + i * stepX;
          const y = height - padding - (val / maxVal) * chartH;
          return <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#3525cd" strokeWidth="2" />;
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Dashboard" />

        <main className="p-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-admin-primary/20 border-t-admin-primary rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* ── Header ── */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-[#191c1e]">
                    {greeting}, {firstName}
                  </h2>
                  <p className="text-sm text-[#464555] mt-0.5">
                    Here's an overview of your hotel performance.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#cbd5e1] text-sm font-medium text-[#191c1e] hover:bg-[#f2f4f6] transition-colors">
                    <FileDown className="w-4 h-4" />
                    Export Report
                  </button>
                  <Link
                    to="/admin/rooms"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-admin-primary to-admin-primary-container text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-4 h-4" />
                    Add Room
                  </Link>
                </div>
              </div>

              {/* ── KPI Cards ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {kpiCards.map((kpi) => (
                  <div key={kpi.title} className="bg-white rounded-xl p-5 shadow-ambient">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${kpi.color}`}>
                        <kpi.icon className="w-5 h-5" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.change >= 0 ? 'text-tertiary' : 'text-error'}`}>
                        {kpi.change >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {Math.abs(kpi.change)}%
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-[#191c1e]">{kpi.value}</p>
                    <p className="text-xs text-[#464555] mt-1">{kpi.title}</p>
                  </div>
                ))}
              </div>

              {/* ── Chart + Activity ── */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Bookings Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-ambient p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-headline font-bold text-[#191c1e]">Bookings Over Time</h3>
                    <div className="flex rounded-lg overflow-hidden border border-[#cbd5e1]">
                      <button
                        onClick={() => setChartRange('7d')}
                        className={`px-4 py-1.5 text-xs font-semibold transition-colors ${chartRange === '7d' ? 'bg-admin-primary text-white' : 'bg-white text-[#464555] hover:bg-[#f2f4f6]'}`}
                      >
                        7 Days
                      </button>
                      <button
                        onClick={() => setChartRange('30d')}
                        className={`px-4 py-1.5 text-xs font-semibold transition-colors ${chartRange === '30d' ? 'bg-admin-primary text-white' : 'bg-white text-[#464555] hover:bg-[#f2f4f6]'}`}
                      >
                        30 Days
                      </button>
                    </div>
                  </div>
                  <div className="h-52">
                    {renderChart()}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-ambient p-6">
                  <h3 className="font-headline font-bold text-[#191c1e] mb-5">Recent Activity</h3>
                  <div className="space-y-4">
                    {activities.length === 0 ? (
                      <p className="text-sm text-[#464555]">No recent activity</p>
                    ) : (
                      activities.map((act) => (
                        <div key={act.id} className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            act.type === 'booking' ? 'bg-admin-primary' : act.type === 'user' ? 'bg-tertiary' : 'bg-[#464555]'
                          }`} />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-[#191c1e] truncate">{act.description}</p>
                            <p className="text-xs text-[#464555] mt-0.5">{act.createdAt}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* ── Quick Actions ── */}
              <div>
                <h3 className="font-headline font-bold text-[#191c1e] mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {quickActions.map((action) => (
                    <Link
                      key={action.title}
                      to={action.to}
                      className="bg-white rounded-xl shadow-ambient p-5 flex items-start gap-4 group hover:shadow-ambient-md transition-shadow duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-admin-primary/10 flex items-center justify-center flex-shrink-0">
                        <action.icon className="w-5 h-5 text-admin-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#191c1e]">{action.title}</p>
                        <p className="text-xs text-[#464555] mt-0.5">{action.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#464555] group-hover:text-admin-primary transition-colors mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}