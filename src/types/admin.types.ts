export interface AdminStats {
  totalBookings: number;
  totalRevenue: number;
  activeRooms: number;
  totalUsers: number;
  bookingsChange: number;
  revenueChange: number;
  roomsChange: number;
  usersChange: number;
}

export interface DashboardData {
  stats: AdminStats;
  chartData: number[];
  chartLabels: string[];
  activities: Activity[];
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}