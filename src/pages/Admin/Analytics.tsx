import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { BookingsLineChart } from '../../components/admin/BookingsLineChart';
import { KPIMetricCard } from '../../components/admin/KPIMetricCard';
import { ActivityFeed } from '../../components/admin/ActivityFeed';
import { Calendar, DollarSign, Bed, Users } from 'lucide-react';
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

export function AdminAnalytics() {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [chart, setChart] = useState<ChartData | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const [kpiRes, chartRes, activityRes] = await Promise.all([
        api.get<AnalyticsData>('/analytics/kpi'),
        api.get<ChartData>('/analytics/bookings-chart'),
        api.get<any[]>('/analytics/activity'),
      ]);
      
      setStats(kpiRes.data);
      setChart(chartRes.data);
      
      // Transform backend activity logs for frontend ActivityFeed
      const mappedActivities = activityRes.data.map(log => ({
        id: log.id,
        type: log.action.toLowerCase().includes('login') ? 'user' : 'booking',
        description: `${log.user ? `${log.user.firstName} ${log.user.lastName}` : 'System'}: ${log.action} - ${log.details || ''}`,
        createdAt: new Date(log.createdAt).toLocaleTimeString(),
      }));
      setActivities(mappedActivities);
    } catch (error) {
      console.error('Failed to load analytics dashboard', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const kpiData = stats ? [
    { title: 'Total Bookings', value: stats.totalBookings.toString(), change: stats.bookingsChange, icon: <Calendar className="w-5 h-5" /> },
    { title: 'Gross Revenue', value: `$${(stats.totalRevenue).toLocaleString()}`, change: stats.revenueChange, icon: <DollarSign className="w-5 h-5" /> },
    { title: 'Active Listings', value: stats.activeRooms.toString(), change: stats.roomsChange, icon: <Bed className="w-5 h-5" /> },
    { title: 'Registered Users', value: stats.totalUsers.toString(), change: stats.usersChange, icon: <Users className="w-5 h-5" /> },
  ] : [];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="System Analytics & Reporting" />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#191c1e]">Platform Diagnostics</h2>
              <p className="text-sm text-[#464555] mt-0.5 font-medium">Real-time occupancy rates, metrics, and traffic insights</p>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading diagnostics metrics...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {kpiData.map((kpi, index) => (
                  <KPIMetricCard key={index} {...kpi} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {chart && (
                    <BookingsLineChart data={chart.data} labels={chart.labels} />
                  )}
                </div>

                <div>
                  <ActivityFeed
                    activities={activities.map(act => ({
                      id: act.id,
                      type: act.type,
                      description: act.description,
                      timestamp: act.createdAt,
                    }))}
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
