import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/shared/Navbar';
import { Footer } from '../../components/shared/Footer';
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar';
import { Bell, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import api from '../../lib/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const timeAgo = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    const diffMs = new Date().getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch (e) {
    return 'Recently';
  }
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await api.get<Notification[]>('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to load notifications', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error('Failed to mark read', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/mark-all-read');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all read', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-plus text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-on_surface_variant">{unreadCount} unread</p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Check className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <DashboardSidebar />
            </div>

            <div className="lg:col-span-3">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-6 bg-surface-container-lowest rounded-lg cursor-pointer transition-colors",
                        !notification.isRead && "border-l-4 border-primary"
                      )}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-2 rounded-full",
                          notification.isRead ? "bg-surface-container-low" : "bg-primary/10 text-primary"
                        )}>
                          <Bell className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <span className="text-sm text-on_surface_variant">{timeAgo(notification.createdAt)}</span>
                          </div>
                          <p className="text-on_surface_variant mt-1">{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-surface-container-lowest rounded-lg">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-on_surface_variant" />
                  <p className="text-on_surface_variant">No notifications</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}